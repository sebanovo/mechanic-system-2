from __future__ import annotations

import logging
from decimal import ROUND_HALF_UP, Decimal

from app.common.exceptions import NotFoundException
from app.core.ai.dispatcher import AIDispatcher
from app.core.ai.media import AIMediaPart
from app.core.audit.constants import (
    IncidentAiAnalysisAuditEvent,
    IncidentAuditEvent,
)
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.incident.models import Incident
from app.modules.incident.repository import IncidentRepository
from app.modules.incident_ai_analysis.ai_schemas import (
    IncidentAIAnalysisResult,
)
from app.modules.incident_ai_analysis.catalog_adapter import (
    service_catalog_list_to_ai_options,
)
from app.modules.incident_ai_analysis.inputs import IncidentAIMultimodalInput
from app.modules.incident_ai_analysis.models import IncidentAiAnalysis
from app.modules.incident_ai_analysis.prompt_builder import (
    build_incident_analysis_prompt,
)
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_ai_analysis.schemas import IncidentAiAnalysisCreateRequest
from app.modules.incident_candidate_provider.repository import (
    IncidentCandidateProviderRepository,
)
from app.modules.incident_dispatch.repository import IncidentDispatchRepository
from app.modules.incident_dispatch.service import IncidentDispatchService
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.service_catalog.repository import ServiceCatalogRepository

logger = logging.getLogger(__name__)


class IncidentAiAnalysisService(BaseService):
    def __init__(
        self,
        repository: IncidentAiAnalysisRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.incident_repository = IncidentRepository(self.db)
        self.service_catalog_repository = ServiceCatalogRepository(self.db)

    def list(
        self,
        *,
        incident_id: str | None = None,
        analysis_version: str | None = None,
        probable_service_code: str | None = None,
        recommended_priority: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[IncidentAiAnalysis], int]:
        return self.repository.list(
            incident_id=incident_id,
            analysis_version=analysis_version,
            probable_service_code=self._normalize_upper(probable_service_code),
            recommended_priority=self._normalize_upper(recommended_priority),
            limit=limit,
            offset=offset,
        )

    def list_by_incident(
        self,
        incident_id: str,
        *,
        analysis_version: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[IncidentAiAnalysis], int]:
        self._get_incident_or_fail(incident_id)

        return self.repository.list_by_incident(
            incident_id,
            analysis_version=analysis_version,
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, analysis_id: str) -> IncidentAiAnalysis:
        analysis = self.repository.get_by_id(analysis_id)

        if analysis is None:
            raise NotFoundException("Análisis IA de incidente no encontrado.")

        return analysis

    def get_for_incident_or_fail(
        self,
        *,
        incident_id: str,
        analysis_id: str,
    ) -> IncidentAiAnalysis:
        self._get_incident_or_fail(incident_id)

        analysis = self.get_or_fail(analysis_id)

        if str(analysis.incident_id) != incident_id:
            raise NotFoundException("Análisis IA de incidente no encontrado.")

        return analysis

    def create_for_incident(
        self,
        *,
        incident_id: str,
        payload: IncidentAiAnalysisCreateRequest,
    ) -> IncidentAiAnalysis:
        incident = self._get_incident_or_fail(incident_id)

        analysis = IncidentAiAnalysis(
            incident_id=incident.id,
            analysis_version=payload.analysis_version.strip(),
            probable_service_code=self._normalize_upper(payload.probable_service_code),
            probable_problem=self._normalize_text(payload.probable_problem),
            confidence_score=payload.confidence_score,
            estimated_min_price=payload.estimated_min_price,
            estimated_max_price=payload.estimated_max_price,
            estimated_min_duration_minutes=payload.estimated_min_duration_minutes,
            estimated_max_duration_minutes=payload.estimated_max_duration_minutes,
            recommended_priority=payload.recommended_priority,
            analysis_result=payload.analysis_result,
        )

        analysis = self.repository.add(analysis)
        self.db.flush()
        self._run_dispatch_safely(
            incident_id=str(incident.id),
            analysis_id=str(analysis.id),
        )

        self.audit.created(
            analysis,
            IncidentAiAnalysisAuditEvent.INCIDENT_AI_ANALYSIS_CREATED,
            resource_type="incident_ai_analysis",
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "analysis_version": analysis.analysis_version,
                "probable_service_code": analysis.probable_service_code,
                "recommended_priority": analysis.recommended_priority,
                "confidence_score": (
                    str(analysis.confidence_score)
                    if analysis.confidence_score is not None
                    else None
                ),
            },
        )

        self.db.commit()
        self.db.refresh(analysis)

        return analysis

    def run_for_incident(
        self,
        *,
        incident_id: str,
        analysis_version: str = "v1",
        analysis_input: IncidentAIMultimodalInput | None = None,
        commit: bool = True,
    ) -> IncidentAiAnalysis:
        incident = self._get_incident_or_fail(incident_id)
        normalized_version = self._normalize_text(analysis_version) or "v1"

        services = self._list_active_service_catalogs()
        service_options = service_catalog_list_to_ai_options(services)

        prompt = build_incident_analysis_prompt(
            incident=incident,
            service_options=service_options,
            extra_prompt=(
                self._normalize_text(analysis_input.text)
                if analysis_input is not None
                else None
            ),
        )

        ai_result = AIDispatcher().generate_json(
            prompt,
            media=self._to_core_media_parts(
                analysis_input.media if analysis_input is not None else None
            ),
        )

        parsed_result = IncidentAIAnalysisResult.model_validate(ai_result.content)

        service_catalog = self._resolve_service_catalog(parsed_result)
        probable_service_code = parsed_result.probable_service_code

        if service_catalog is None:
            probable_service_code = "UNKNOWN"
            parsed_result.confidence = min(parsed_result.confidence, 0.40)
        else:
            incident.service_catalog_id = service_catalog.id

        self._apply_ai_fields_to_incident(
            incident=incident,
            result=parsed_result,
        )

        payload = IncidentAiAnalysisCreateRequest(
            analysis_version=normalized_version,
            probable_service_code=probable_service_code,
            probable_problem=parsed_result.detected_problem,
            confidence_score=self._confidence_to_score(parsed_result.confidence),
            estimated_min_price=parsed_result.estimated_min_price,
            estimated_max_price=parsed_result.estimated_max_price,
            estimated_min_duration_minutes=parsed_result.estimated_min_duration_minutes,
            estimated_max_duration_minutes=parsed_result.estimated_max_duration_minutes,
            recommended_priority=parsed_result.priority,
            analysis_result={
                "provider": ai_result.provider,
                "model": ai_result.model,
                "prompt_version": normalized_version,
                "analysis": parsed_result.model_dump(mode="json"),
            },
        )

        analysis = IncidentAiAnalysis(
            incident_id=incident.id,
            analysis_version=payload.analysis_version.strip(),
            probable_service_code=self._normalize_upper(payload.probable_service_code),
            probable_problem=self._normalize_text(payload.probable_problem),
            confidence_score=payload.confidence_score,
            estimated_min_price=payload.estimated_min_price,
            estimated_max_price=payload.estimated_max_price,
            estimated_min_duration_minutes=payload.estimated_min_duration_minutes,
            estimated_max_duration_minutes=payload.estimated_max_duration_minutes,
            recommended_priority=payload.recommended_priority,
            analysis_result=payload.analysis_result,
        )

        analysis = self.repository.add(analysis)
        self.db.flush()

        self.audit.created(
            analysis,
            IncidentAiAnalysisAuditEvent.INCIDENT_AI_ANALYSIS_CREATED,
            resource_type="incident_ai_analysis",
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "analysis_version": analysis.analysis_version,
                "probable_service_code": analysis.probable_service_code,
                "recommended_priority": analysis.recommended_priority,
                "confidence_score": (
                    str(analysis.confidence_score)
                    if analysis.confidence_score is not None
                    else None
                ),
            },
        )

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_UPDATED,
            resource_type="incident",
            event_data={
                "reason": "AI_ANALYSIS_APPLIED",
                "analysis_id": str(analysis.id),
                "probable_service_code": analysis.probable_service_code,
                "service_catalog_id": (
                    str(incident.service_catalog_id)
                    if incident.service_catalog_id is not None
                    else None
                ),
                "priority": incident.priority,
                "title": incident.title,
                "address_text": incident.address_text,
            },
        )

        self.db.flush()
        self._run_dispatch_safely(
            incident_id=str(incident.id),
            analysis_id=str(analysis.id),
        )

        if commit:
            self.db.commit()
            self.db.refresh(analysis)

        return analysis

    def _get_incident_or_fail(self, incident_id: str) -> Incident:
        incident = self.incident_repository.get_by_id(incident_id)

        if incident is None or incident.deleted_at is not None:
            raise NotFoundException("Incidente no encontrado.")

        return incident

    def _list_active_service_catalogs(self) -> list[ServiceCatalog]:
        services, _ = self.service_catalog_repository.list(
            is_active=True,
            limit=500,
            offset=0,
        )

        return services

    def _resolve_service_catalog(
        self,
        result: IncidentAIAnalysisResult,
    ) -> ServiceCatalog | None:
        service_code = self._normalize_upper(result.probable_service_code)

        if service_code is None or service_code == "UNKNOWN":
            return None

        service_catalog = self.service_catalog_repository.get_by_code(service_code)

        if service_catalog is None or not service_catalog.is_active:
            return None

        return service_catalog

    def _apply_ai_fields_to_incident(
        self,
        *,
        incident: Incident,
        result: IncidentAIAnalysisResult,
    ) -> None:
        suggested_title = self._normalize_text(result.suggested_title)

        if suggested_title:
            current_title = self._normalize_text(incident.title)

            if (
                current_title is None
                or current_title == "Incidente reportado"
                or current_title == self._normalize_text(incident.description)
            ):
                incident.title = suggested_title[:150]

        suggested_address_text = self._normalize_text(result.suggested_address_text)

        if suggested_address_text and not self._normalize_text(incident.address_text):
            incident.address_text = suggested_address_text

        incident.priority = result.priority

    def _confidence_to_score(self, confidence: float) -> Decimal:
        score = Decimal(str(confidence * 100))
        return score.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

    def _run_dispatch_safely(
        self,
        *,
        incident_id: str,
        analysis_id: str,
    ) -> None:
        try:
            result = IncidentDispatchService(
                incident_repository=IncidentRepository(self.db),
                ai_analysis_repository=IncidentAiAnalysisRepository(self.db),
                dispatch_repository=IncidentDispatchRepository(self.db),
                candidate_provider_repository=IncidentCandidateProviderRepository(
                    self.db
                ),
                offer_repository=IncidentOfferRepository(self.db),
                context=self.context,
            ).run_after_ai_analysis(
                incident_id=incident_id,
                analysis_id=analysis_id,
            )

            logger.info(
                "Incident dispatch result. incident_id=%s analysis_id=%s result=%s",
                incident_id,
                analysis_id,
                result.model_dump(mode="json"),
            )

        except Exception:
            logger.exception(
                "No se pudo ejecutar dispatch automático. incident_id=%s analysis_id=%s",
                incident_id,
                analysis_id,
            )

    def _to_core_media_parts(
        self,
        media_parts,
    ) -> list[AIMediaPart] | None:
        if not media_parts:
            return None

        return [
            AIMediaPart(
                kind=part.kind,
                filename=part.filename,
                mime_type=part.mime_type,
                size_bytes=part.size_bytes,
                content=part.content,
                url=part.url,
                data_url=part.data_url,
            )
            for part in media_parts
        ]

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None
