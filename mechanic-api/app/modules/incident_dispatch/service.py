from __future__ import annotations

import math
import logging
from decimal import Decimal, ROUND_HALF_UP
from datetime import datetime, timedelta, timezone

from app.common.uuid import to_uuid
from app.core.audit.constants import IncidentAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.incident.constants import IncidentUnattendedReason
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
from app.modules.incident_offer.constants import DEFAULT_OFFER_EXPIRATION_MINUTES
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_dispatch.schemas import IncidentDispatchResult
from app.modules.identity.tenant.repository import TenantRepository

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
        self.tenant_repository = TenantRepository(self.db)
        self.business_notifications = BusinessNotificationService(self.db, context)

    def run_after_ai_analysis(
        self,
        *,
        incident_id: str,
        analysis_id: str,
    ) -> IncidentDispatchResult:
        logger.info(
            "Incident dispatch started. incident_id=%s analysis_id=%s",
            incident_id,
            analysis_id,
        )

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
            return self._mark_as_unattended_and_stop(
                incident=incident,
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=None,
                unattended_reason=IncidentUnattendedReason.UNKNOWN_SERVICE,
                reason=IncidentUnattendedReason.UNKNOWN_SERVICE,
            )

        if incident.service_catalog_id is None:
            return self._mark_as_unattended_and_stop(
                incident=incident,
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=None,
                unattended_reason=IncidentUnattendedReason.UNKNOWN_SERVICE,
                reason=IncidentUnattendedReason.UNKNOWN_SERVICE,
            )

        eligible_providers = self.find_eligible_providers(
            service_catalog_id=str(incident.service_catalog_id),
            incident_latitude=incident.latitude,
            incident_longitude=incident.longitude,
        )

        logger.info(
            "Incident eligible providers search finished. incident_id=%s service_catalog_id=%s eligible_count=%s",
            incident.id,
            incident.service_catalog_id,
            len(eligible_providers),
        )

        if not eligible_providers:
            unattended_reason = self._resolve_unattended_reason(
                service_catalog_id=str(incident.service_catalog_id),
            )
            self._mark_incident_unattended(
                incident,
                reason=unattended_reason,
            )
            self.business_notifications.send_incident_unattended(
                incident_id=str(incident.id),
                unattended_reason=unattended_reason,
            )
            logger.info(
                "No eligible providers found. incident_id=%s analysis_id=%s service_catalog_id=%s",
                incident.id,
                analysis.id,
                incident.service_catalog_id,
            )

            return IncidentDispatchResult(
                should_continue=False,
                reason=unattended_reason,
                incident_id=str(incident.id),
                analysis_id=str(analysis.id),
                probable_service_code=probable_service_code,
                service_catalog_id=str(incident.service_catalog_id),
                unattended_reason=unattended_reason,
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

        logger.info(
            "Incident candidate providers created. incident_id=%s total=%s",
            incident.id,
            len(candidate_providers),
        )

        offers = self.create_incident_offers(
            incident_id=str(incident.id),
            candidate_providers=candidate_providers,
        )

        logger.info(
            "Incident offers generated. incident_id=%s total=%s",
            incident.id,
            len(offers),
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
            self.evaluate_incident_offer_outcome(str(incident.id))

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
        incident_latitude,
        incident_longitude,
    ) -> list[EligibleProviderCandidate]:
        rows = self.dispatch_repository.find_eligible_providers(
            service_catalog_id=service_catalog_id,
        )

        logger.info(
            "Incident provider eligibility query returned. service_catalog_id=%s rows=%s",
            service_catalog_id,
            len(rows),
        )

        candidates: list[EligibleProviderCandidate] = []

        for provider_profile, provider_service, enabled_count, available_count in rows:
            tenant_profile = self.tenant_repository.get_profile(
                str(provider_profile.tenant_id)
            )
            distance_km = self._calculate_distance_km(
                incident_latitude=incident_latitude,
                incident_longitude=incident_longitude,
                provider_latitude=(
                    tenant_profile.latitude if tenant_profile is not None else None
                ),
                provider_longitude=(
                    tenant_profile.longitude if tenant_profile is not None else None
                ),
            )

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
                    distance_km=distance_km,
                )
            )

        logger.info(
            "Incident eligible providers normalized. service_catalog_id=%s candidates=%s",
            service_catalog_id,
            len(candidates),
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
                candidate_status="REQUESTED",
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

        logger.info(
            "Incident candidate provider batch finished. incident_id=%s total=%s",
            incident_id,
            len(created_candidates),
        )

        return created_candidates

    def create_incident_offers(
        self,
        *,
        incident_id: str,
        candidate_providers: list[IncidentCandidateProvider],
        expires_in_minutes: int = DEFAULT_OFFER_EXPIRATION_MINUTES,
    ) -> list[IncidentOffer]:
        created_offers: list[IncidentOffer] = []
        expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=expires_in_minutes,
        )

        for candidate in candidate_providers:
            if candidate.candidate_status not in {"REQUESTED", "SUGGESTED"}:
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

            logger.info(
                "Incident offer created. incident_id=%s candidate_provider_id=%s provider_profile_id=%s expires_at=%s",
                incident_id,
                candidate.id,
                candidate.provider_profile_id,
                expires_at.isoformat(),
            )

        self.db.flush()

        logger.info(
            "Incident offer batch finished. incident_id=%s total=%s",
            incident_id,
            len(created_offers),
        )

        return created_offers

    def notify_incident_offers(
        self,
        *,
        offers: list[IncidentOffer],
        tenant_by_provider_id: dict[str, str],
    ) -> None:
        logger.info(
            "Incident offer notifications started. total_offers=%s",
            len(offers),
        )

        for offer in offers:
            tenant_id = tenant_by_provider_id.get(str(offer.provider_profile_id))

            if tenant_id is None:
                logger.info(
                    "Incident offer notification skipped. offer_id=%s reason=tenant_not_found",
                    offer.id,
                )
                continue

            try:
                logger.info(
                    "Incident offer notification sending. offer_id=%s tenant_id=%s provider_profile_id=%s",
                    offer.id,
                    tenant_id,
                    offer.provider_profile_id,
                )
                self.business_notifications.send_incident_offer_created(
                    tenant_id=tenant_id,
                    incident_id=str(offer.incident_id),
                    offer_id=str(offer.id),
                    provider_profile_id=str(offer.provider_profile_id),
                )
                logger.info(
                    "Incident offer notification sent. offer_id=%s tenant_id=%s",
                    offer.id,
                    tenant_id,
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
        unattended_reason: str | None = None,
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
            unattended_reason=unattended_reason,
        )

    def _mark_as_unattended_and_stop(
        self,
        *,
        incident,
        analysis_id: str,
        probable_service_code: str | None,
        service_catalog_id: str | None,
        unattended_reason: str,
        reason: str,
    ) -> IncidentDispatchResult:
        self._mark_incident_unattended(
            incident,
            reason=unattended_reason,
        )
        self.business_notifications.send_incident_unattended(
            incident_id=str(incident.id),
            unattended_reason=unattended_reason,
        )
        return self._stop(
            incident_id=str(incident.id),
            analysis_id=analysis_id,
            probable_service_code=probable_service_code,
            service_catalog_id=service_catalog_id,
            reason=reason,
            unattended_reason=unattended_reason,
        )

    def _mark_incident_unattended(self, incident, *, reason: str) -> None:
        if incident.status in FINAL_INCIDENT_STATUSES or incident.status == "UNATTENDED":
            logger.info(
                "Incident unattended skipped. incident_id=%s status=%s reason=%s",
                incident.id,
                incident.status,
                reason,
            )
            return

        previous_status = incident.status
        incident.status = "UNATTENDED"
        incident.unattended_reason = reason
        incident.unattended_at = datetime.now(timezone.utc)

        logger.info(
            "Incident marked as unattended. incident_id=%s previous_status=%s reason=%s",
            incident.id,
            previous_status,
            reason,
        )

        self.db.flush()

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_STATUS_CHANGED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "previous_status": previous_status,
                "status": incident.status,
                "unattended_reason": reason,
            },
        )

    def _resolve_unattended_reason(self, *, service_catalog_id: str) -> str:
        if not self.dispatch_repository.has_provider_services_for_catalog(
            service_catalog_id=service_catalog_id,
        ):
            return IncidentUnattendedReason.NO_PROVIDER_SERVICE_FOUND

        if not self.dispatch_repository.has_available_technicians_for_catalog(
            service_catalog_id=service_catalog_id,
        ):
            return IncidentUnattendedReason.NO_AVAILABLE_TECHNICIAN_FOUND

        return IncidentUnattendedReason.NO_ELIGIBLE_PROVIDERS_FOUND

    def evaluate_incident_offer_outcome(self, incident_id: str) -> None:
        incident = self.incident_repository.get_by_id(incident_id)

        if incident is None or incident.deleted_at is not None:
            return

        if incident.status in FINAL_INCIDENT_STATUSES or incident.status == "UNATTENDED":
            return

        accepted = self.offer_repository.get_accepted_by_incident(incident_id)
        if accepted is not None:
            incident.status = "PROVIDER_ACCEPTED"
            self.db.flush()
            logger.info(
                "Incident offer outcome resolved. incident_id=%s result=ACCEPTED",
                incident_id,
            )
            return

        pending_offers, _ = self.offer_repository.list_pending_by_incident(
            incident_id,
            limit=1,
            offset=0,
        )

        if pending_offers:
            incident.status = "WAITING_PROVIDER_RESPONSE"
            self.db.flush()
            logger.info(
                "Incident offer outcome resolved. incident_id=%s result=WAITING_PROVIDER_RESPONSE pending_count=%s",
                incident_id,
                len(pending_offers),
            )
            return

        previous_status = incident.status
        incident.status = "UNATTENDED"
        incident.unattended_reason = IncidentUnattendedReason.NO_PROVIDER_ACCEPTED
        incident.unattended_at = datetime.now(timezone.utc)
        self.db.flush()
        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_STATUS_CHANGED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "previous_status": previous_status,
                "status": incident.status,
                "unattended_reason": incident.unattended_reason,
            },
        )
        self.business_notifications.send_incident_unattended(
            incident_id=str(incident.id),
            unattended_reason=IncidentUnattendedReason.NO_PROVIDER_ACCEPTED,
        )
        logger.info(
            "Incident offer outcome resolved. incident_id=%s result=UNATTENDED reason=%s",
            incident_id,
            IncidentUnattendedReason.NO_PROVIDER_ACCEPTED,
        )

    def _normalize_upper(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip().upper()
        return normalized or None

    def _calculate_distance_km(
        self,
        *,
        incident_latitude,
        incident_longitude,
        provider_latitude,
        provider_longitude,
    ) -> Decimal | None:
        if (
            incident_latitude is None
            or incident_longitude is None
            or provider_latitude is None
            or provider_longitude is None
        ):
            return None

        earth_radius_km = 6371.0

        lat1 = math.radians(float(incident_latitude))
        lon1 = math.radians(float(incident_longitude))
        lat2 = math.radians(float(provider_latitude))
        lon2 = math.radians(float(provider_longitude))

        delta_lat = lat2 - lat1
        delta_lon = lon2 - lon1

        a = (
            math.sin(delta_lat / 2) ** 2
            + math.cos(lat1) * math.cos(lat2) * math.sin(delta_lon / 2) ** 2
        )
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance = earth_radius_km * c

        return Decimal(str(distance)).quantize(
            Decimal("0.01"),
            rounding=ROUND_HALF_UP,
        )
