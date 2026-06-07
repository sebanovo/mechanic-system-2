from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone

from app.common.uuid import to_uuid
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.notification.business_notifications import (
    BusinessNotificationService,
)
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_candidate_provider.repository import (
    IncidentCandidateProviderRepository,
)
from app.modules.incident_dispatch.repository import IncidentDispatchRepository
from app.modules.incident_dispatch.schemas import EligibleProviderCandidate
from app.modules.incident_dispatch.schemas import ScoredProviderCandidate
from app.modules.incident_dispatch.scoring import score_provider_candidates
from app.modules.incident.repository import IncidentRepository
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_offer.models import IncidentOffer
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_dispatch.schemas import IncidentDispatchResult

logger = logging.getLogger(__name__)

FINAL_INCIDENT_STATUSES = {"COMPLETED", "CANCELLED"}


class IncidentDispatchService(BaseService):
    def __init__(
        self,
        *,
        incident_repository: IncidentRepository,
        ai_analysis_repository: IncidentAiAnalysisRepository,
        dispatch_repository: IncidentDispatchRepository,
        candidate_provider_repository: IncidentCandidateProviderRepository,
        offer_repository: IncidentOfferRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=incident_repository.db, context=context)
        self.incident_repository = incident_repository
        self.ai_analysis_repository = ai_analysis_repository
        self.dispatch_repository = dispatch_repository
        self.candidate_provider_repository = candidate_provider_repository
        self.offer_repository = offer_repository
        self.business_notifications = BusinessNotificationService(self.db, context)

    def run_after_ai_analysis(
        self,
        *,
        incident_id: str,
        analysis_id: str,
    ) -> IncidentDispatchResult:
        incident = self.incident_repository.get_by_id(incident_id)

        if incident is None or incident.deleted_at is not None:
            return IncidentDispatchResult(
                should_continue=False,
                reason="INCIDENT_NOT_FOUND",
                incident_id=incident_id,
                analysis_id=analysis_id,
            )

        analysis = self.ai_analysis_repository.get_by_id(analysis_id)

        if analysis is None:
            return IncidentDispatchResult(
                should_continue=False,
                reason="AI_ANALYSIS_NOT_FOUND",
                incident_id=str(incident.id),
                analysis_id=analysis_id,
            )

        probable_service_code = self._normalize_upper(
            analysis.probable_service_code
        )

        if incident.status in FINAL_INCIDENT_STATUSES:
            return self._stop(
                incident_id=str(incident.id),
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=(
                    str(incident.service_catalog_id)
                    if incident.service_catalog_id is not None
                    else None
                ),
                reason="INCIDENT_ALREADY_FINALIZED",
            )

        if probable_service_code is None or probable_service_code == "UNKNOWN":
            return self._stop(
                incident_id=str(incident.id),
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=None,
                reason="UNKNOWN_SERVICE_CODE",
            )

        if incident.service_catalog_id is None:
            return self._stop(
                incident_id=str(incident.id),
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=None,
                reason="INCIDENT_WITHOUT_SERVICE_CATALOG",
            )

        eligible_providers = self.find_eligible_providers(
            service_catalog_id=str(incident.service_catalog_id),
        )

        if not eligible_providers:
            incident.status = "SEARCHING_PROVIDER"
            self.db.flush()
            logger.info(
                "No eligible providers found. incident_id=%s analysis_id=%s service_catalog_id=%s",
                incident.id,
                analysis.id,
                incident.service_catalog_id,
            )

            return IncidentDispatchResult(
                should_continue=False,
                reason="NO_ELIGIBLE_PROVIDERS_FOUND",
                incident_id=str(incident.id),
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=str(incident.service_catalog_id),
            )

        scored_candidates = score_provider_candidates(eligible_providers)

        logger.info(
            "Incident providers scored. incident_id=%s total=%s top_score=%s",
            incident.id,
            len(scored_candidates),
            scored_candidates[0].score if scored_candidates else None,
        )

        candidate_providers = self.create_candidate_providers(
            incident_id=str(incident.id),
            candidates=scored_candidates,
        )

        offers = self.create_incident_offers(
            incident_id=str(incident.id),
            candidate_providers=candidate_providers,
        )

        tenant_by_provider_id = {
            candidate.provider_profile_id: candidate.tenant_id
            for candidate in scored_candidates
        }

        self.notify_incident_offers(
            offers=offers,
            tenant_by_provider_id=tenant_by_provider_id,
        )

        if offers:
            incident.status = "WAITING_PROVIDER_RESPONSE"
        else:
            incident.status = "SEARCHING_PROVIDER"

        self.db.flush()

        logger.info(
            "Incident offers created. incident_id=%s total=%s status=%s",
            incident.id,
            len(offers),
            incident.status,
        )

        logger.info(
            "Incident dispatch can continue. incident_id=%s analysis_id=%s service_code=%s service_catalog_id=%s",
            incident.id,
            analysis.id,
            probable_service_code,
            incident.service_catalog_id,
        )

        return IncidentDispatchResult(
            should_continue=True,
            reason=(
                "INCIDENT_OFFERS_CREATED"
                if offers
                else "NO_INCIDENT_OFFERS_CREATED"
            ),
            incident_id=str(incident.id),
            analysis_id=str(analysis.id),
            probable_service_code=probable_service_code,
            service_catalog_id=str(incident.service_catalog_id),
        )

    def find_eligible_providers(
        self,
        *,
        service_catalog_id: str,
    ) -> list[EligibleProviderCandidate]:
        rows = self.dispatch_repository.find_eligible_providers(
            service_catalog_id=service_catalog_id,
        )

        candidates: list[EligibleProviderCandidate] = []

        for provider_profile, provider_service, enabled_count, available_count in rows:
            candidates.append(
                EligibleProviderCandidate(
                    provider_profile_id=str(provider_profile.id),
                    tenant_id=str(provider_profile.tenant_id),
                    provider_service_id=str(provider_service.id),
                    service_catalog_id=str(provider_service.service_catalog_id),
                    enabled_technicians_count=int(enabled_count or 0),
                    available_technicians_count=int(available_count or 0),
                    average_rating=provider_profile.average_rating,
                    response_score=provider_profile.response_score,
                    total_reviews=provider_profile.total_reviews,
                    distance_km=None,
                )
            )

        return candidates

    def create_candidate_providers(
        self,
        *,
        incident_id: str,
        candidates: list[ScoredProviderCandidate],
    ) -> list[IncidentCandidateProvider]:
        created_candidates: list[IncidentCandidateProvider] = []

        for candidate in candidates:
            existing = self.candidate_provider_repository.get_by_incident_and_provider(
                incident_id=incident_id,
                provider_profile_id=candidate.provider_profile_id,
            )

            if existing is not None:
                created_candidates.append(existing)
                continue

            candidate_provider = IncidentCandidateProvider(
                incident_id=to_uuid(incident_id, "incident_id"),
                provider_profile_id=to_uuid(
                    candidate.provider_profile_id,
                    "provider_profile_id",
                ),
                candidate_status="SUGGESTED",
                match_score=candidate.score,
            )

            selection_reason = self._build_selection_reason(candidate)

            candidate_provider = self.candidate_provider_repository.add(
                candidate_provider
            )

            logger.info(
                "Incident candidate provider created. incident_id=%s provider_profile_id=%s score=%s reason=%s",
                incident_id,
                candidate.provider_profile_id,
                candidate.score,
                selection_reason,
            )

            created_candidates.append(candidate_provider)

        self.db.flush()

        return created_candidates

    def create_incident_offers(
        self,
        *,
        incident_id: str,
        candidate_providers: list[IncidentCandidateProvider],
        expires_in_minutes: int = 5,
    ) -> list[IncidentOffer]:
        created_offers: list[IncidentOffer] = []
        expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=expires_in_minutes,
        )

        for candidate in candidate_providers:
            if candidate.candidate_status != "SUGGESTED":
                continue

            existing = self.offer_repository.get_by_incident_and_provider(
                incident_id=incident_id,
                provider_profile_id=str(candidate.provider_profile_id),
            )

            if existing is not None:
                created_offers.append(existing)
                continue

            offer = IncidentOffer(
                incident_id=to_uuid(incident_id, "incident_id"),
                candidate_provider_id=candidate.id,
                provider_profile_id=candidate.provider_profile_id,
                offer_status="PENDING",
                message=None,
                response_message=None,
                sent_at=datetime.now(timezone.utc),
                responded_at=None,
                expires_at=expires_at,
            )

            offer = self.offer_repository.add(offer)
            created_offers.append(offer)

        self.db.flush()

        return created_offers

    def notify_incident_offers(
        self,
        *,
        offers: list[IncidentOffer],
        tenant_by_provider_id: dict[str, str],
    ) -> None:
        for offer in offers:
            tenant_id = tenant_by_provider_id.get(str(offer.provider_profile_id))

            if tenant_id is None:
                continue

            try:
                self.business_notifications.send_incident_offer_created(
                    tenant_id=tenant_id,
                    incident_id=str(offer.incident_id),
                    offer_id=str(offer.id),
                    provider_profile_id=str(offer.provider_profile_id),
                )
            except Exception:
                logger.exception(
                    "No se pudo notificar oferta de incidente. offer_id=%s",
                    offer.id,
                )

    def _build_selection_reason(
        self,
        candidate: ScoredProviderCandidate,
    ) -> str:
        return (
            "Proveedor elegible por servicio requerido, estado operativo activo, "
            "servicio disponible y técnicos habilitados. "
            f"Score calculado: {candidate.score}. "
            f"Técnicos habilitados: {candidate.enabled_technicians_count}. "
            f"Técnicos disponibles: {candidate.available_technicians_count}."
        )

    def _stop(
        self,
        *,
        incident_id: str,
        analysis_id: str,
        probable_service_code: str | None,
        service_catalog_id: str | None,
        reason: str,
    ) -> IncidentDispatchResult:
        logger.info(
            "Incident dispatch stopped. reason=%s incident_id=%s analysis_id=%s service_code=%s service_catalog_id=%s",
            reason,
            incident_id,
            analysis_id,
            probable_service_code,
            service_catalog_id,
        )

        return IncidentDispatchResult(
            should_continue=False,
            reason=reason,
            incident_id=incident_id,
            analysis_id=analysis_id,
            probable_service_code=probable_service_code,
            service_catalog_id=service_catalog_id,
        )

    def _normalize_upper(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip().upper()
        return normalized or None
