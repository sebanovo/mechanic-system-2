from __future__ import annotations

from app.common.exceptions import (
    ConflictException,
    NotFoundException,
)
from app.core.audit.constants import IncidentCandidateProviderAuditEvent
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.provider_service.models import ProviderService
from app.modules.provider_service.repository import ProviderServiceRepository
from app.modules.assignment.repository import AssignmentRepository
from app.modules.incident.models import Incident
from app.modules.incident.repository import IncidentRepository
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_candidate_provider.repository import (
    IncidentCandidateProviderRepository,
)
from app.modules.incident_candidate_provider.schemas import (
    IncidentCandidateProviderCreateRequest,
    IncidentCandidateProviderStatusChangeRequest,
    IncidentCandidateProviderUpdateRequest,
)
from app.modules.technician_service.repository import TechnicianServiceRepository


class IncidentCandidateProviderService(BaseService):
    ALLOWED_CANDIDATE_TRANSITIONS: dict[str, set[str]] = {
        "SUGGESTED": {"SELECTED", "DISCARDED", "EXPIRED"},
        "SELECTED": {"DISCARDED", "EXPIRED"},
        "DISCARDED": set(),
        "EXPIRED": set(),
    }

    def __init__(
        self,
        repository: IncidentCandidateProviderRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.incident_repository = IncidentRepository(self.db)
        self.offer_repository = IncidentOfferRepository(self.db)
        self.provider_repository = ProviderProfileRepository(self.db)
        self.provider_service_repository = ProviderServiceRepository(self.db)
        self.assignment_repository = AssignmentRepository(self.db)
        self.technician_service_repository = TechnicianServiceRepository(self.db)

    def list(
        self,
        *,
        incident_id: str | None = None,
        provider_profile_id: str | None = None,
        candidate_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        return self.repository.list(
            incident_id=incident_id,
            provider_profile_id=provider_profile_id,
            candidate_status=self._normalize_upper(candidate_status),
            limit=limit,
            offset=offset,
        )

    def list_by_incident(
        self,
        incident_id: str,
        *,
        candidate_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        self._get_incident_or_fail(incident_id)

        return self.repository.list_by_incident(
            incident_id,
            candidate_status=self._normalize_upper(candidate_status),
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str,
        *,
        candidate_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[IncidentCandidateProvider, Incident, ProviderProfile]], int]:
        self._get_provider_or_fail(provider_profile_id)

        return self.repository.list_by_provider(
            provider_profile_id,
            candidate_status=self._normalize_upper(candidate_status),
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(
        self,
        candidate_id: str,
    ) -> tuple[IncidentCandidateProvider, Incident, ProviderProfile]:
        detail = self.repository.get_detail_by_id(candidate_id)

        if detail is None:
            raise NotFoundException("Proveedor candidato no encontrado.")

        return detail

    def get_owned_by_provider_or_fail(
        self,
        *,
        provider_profile_id: str,
        candidate_id: str,
    ) -> tuple[IncidentCandidateProvider, Incident, ProviderProfile]:
        candidate, incident, provider_profile = self.get_detail_or_fail(candidate_id)

        if str(candidate.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Proveedor candidato no encontrado.")

        return candidate, incident, provider_profile

    def create_for_incident(
        self,
        *,
        incident_id: str,
        payload: IncidentCandidateProviderCreateRequest,
    ) -> IncidentCandidateProvider:
        incident = self._get_incident_or_fail(incident_id)
        provider_profile = self._get_provider_or_fail(payload.provider_profile_id)
        self._ensure_incident_can_receive_candidates(incident)
        provider_service = self._ensure_provider_can_be_candidate(
            incident=incident,
            provider_profile=provider_profile,
        )

        existing = self.repository.get_by_incident_and_provider(
            incident_id=str(incident.id),
            provider_profile_id=str(provider_profile.id),
        )

        if existing is not None:
            raise ConflictException("El proveedor ya está registrado como candidato.")

        candidate = IncidentCandidateProvider(
            incident_id=incident.id,
            provider_profile_id=provider_profile.id,
            distance_km=payload.distance_km,
            estimated_arrival_minutes=payload.estimated_arrival_minutes,
            rating_score=payload.rating_score,
            capacity_score=payload.capacity_score,
            response_score=payload.response_score,
            match_score=payload.match_score,
            candidate_status="SUGGESTED",
        )

        candidate = self.repository.add(candidate)

        self.audit.created(
            candidate,
            IncidentCandidateProviderAuditEvent.INCIDENT_CANDIDATE_PROVIDER_CREATED,
            resource_type="incident_candidate_provider",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "provider_profile_id": str(provider_profile.id),
                "provider_service_id": str(provider_service.id),
                "candidate_status": candidate.candidate_status,
                "match_score": (
                    str(candidate.match_score)
                    if candidate.match_score is not None
                    else None
                ),
            },
        )

        self.db.commit()
        self.db.refresh(candidate)

        return candidate

    def update(
        self,
        candidate_id: str,
        payload: IncidentCandidateProviderUpdateRequest,
    ) -> IncidentCandidateProvider:
        candidate, _, provider_profile = self.get_detail_or_fail(candidate_id)
        return self._update(candidate, payload, tenant_id=str(provider_profile.tenant_id))

    def update_owned(
        self,
        *,
        provider_profile_id: str,
        candidate_id: str,
        payload: IncidentCandidateProviderUpdateRequest,
    ) -> IncidentCandidateProvider:
        candidate, _, provider_profile = self.get_owned_by_provider_or_fail(
            provider_profile_id=provider_profile_id,
            candidate_id=candidate_id,
        )

        return self._update(candidate, payload, tenant_id=str(provider_profile.tenant_id))

    def change_status(
        self,
        candidate_id: str,
        payload: IncidentCandidateProviderStatusChangeRequest,
    ) -> IncidentCandidateProvider:
        candidate, _, provider_profile = self.get_detail_or_fail(candidate_id)
        return self._change_status(
            candidate,
            payload,
            tenant_id=str(provider_profile.tenant_id),
        )

    def change_owned_status(
        self,
        *,
        provider_profile_id: str,
        candidate_id: str,
        payload: IncidentCandidateProviderStatusChangeRequest,
    ) -> IncidentCandidateProvider:
        candidate, _, provider_profile = self.get_owned_by_provider_or_fail(
            provider_profile_id=provider_profile_id,
            candidate_id=candidate_id,
        )

        return self._change_status(
            candidate,
            payload,
            tenant_id=str(provider_profile.tenant_id),
        )

    def _update(
        self,
        candidate: IncidentCandidateProvider,
        payload: IncidentCandidateProviderUpdateRequest,
        *,
        tenant_id: str | None,
    ) -> IncidentCandidateProvider:
        changed_fields: list[str] = []

        if payload.distance_km is not None:
            candidate.distance_km = payload.distance_km
            changed_fields.append("distance_km")

        if payload.estimated_arrival_minutes is not None:
            candidate.estimated_arrival_minutes = payload.estimated_arrival_minutes
            changed_fields.append("estimated_arrival_minutes")

        if payload.rating_score is not None:
            candidate.rating_score = payload.rating_score
            changed_fields.append("rating_score")

        if payload.capacity_score is not None:
            candidate.capacity_score = payload.capacity_score
            changed_fields.append("capacity_score")

        if payload.response_score is not None:
            candidate.response_score = payload.response_score
            changed_fields.append("response_score")

        if payload.match_score is not None:
            candidate.match_score = payload.match_score
            changed_fields.append("match_score")

        self.db.flush()

        self.audit.updated(
            candidate,
            IncidentCandidateProviderAuditEvent.INCIDENT_CANDIDATE_PROVIDER_UPDATED,
            resource_type="incident_candidate_provider",
            tenant_id=tenant_id,
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(candidate)

        return candidate

    def _change_status(
        self,
        candidate: IncidentCandidateProvider,
        payload: IncidentCandidateProviderStatusChangeRequest,
        *,
        tenant_id: str | None,
    ) -> IncidentCandidateProvider:
        previous_status = candidate.candidate_status
        self._ensure_valid_transition(previous_status, payload.candidate_status)
        candidate.candidate_status = payload.candidate_status

        self.db.flush()

        self.audit.updated(
            candidate,
            IncidentCandidateProviderAuditEvent.INCIDENT_CANDIDATE_PROVIDER_STATUS_CHANGED,
            resource_type="incident_candidate_provider",
            tenant_id=tenant_id,
            event_data={
                "previous_status": previous_status,
                "candidate_status": payload.candidate_status,
            },
        )

        self.db.commit()
        self.db.refresh(candidate)

        return candidate

    def _ensure_provider_can_be_candidate(
        self,
        *,
        incident: Incident,
        provider_profile: ProviderProfile,
    ) -> ProviderService:
        if provider_profile.operational_status != "ACTIVE":
            raise ConflictException("El taller no está activo.")

        if not provider_profile.accepts_emergency_requests:
            raise ConflictException("El taller no acepta nuevas solicitudes.")

        if incident.service_catalog_id is None:
            raise ConflictException("El incidente no tiene un servicio solicitado.")

        provider_service = self.provider_service_repository.get_by_provider_and_catalog(
            provider_profile_id=str(provider_profile.id),
            service_catalog_id=str(incident.service_catalog_id),
        )

        if provider_service is None:
            raise ConflictException("El taller no ofrece el servicio solicitado.")

        if not provider_service.is_available:
            raise ConflictException(
                "El servicio solicitado no está disponible actualmente."
            )

        has_enabled_technician = (
            self.technician_service_repository.has_enabled_technician_for_provider_and_catalog(
                provider_profile_id=str(provider_profile.id),
                service_catalog_id=str(incident.service_catalog_id),
            )
        )

        if not has_enabled_technician:
            raise ConflictException(
                "El taller no tiene ningún técnico habilitado para ese servicio."
            )

        return provider_service

    def _get_incident_or_fail(self, incident_id: str) -> Incident:
        incident = self.incident_repository.get_by_id(incident_id)

        if incident is None or incident.deleted_at is not None:
            raise NotFoundException("Incidente no encontrado.")

        return incident

    def _ensure_incident_can_receive_candidates(
        self,
        incident: Incident,
    ) -> None:
        blocked_statuses = {
            "PROVIDER_ACCEPTED",
            "ASSIGNING_TECHNICIAN",
            "TECHNICIAN_ASSIGNED",
            "EN_ROUTE",
            "ARRIVED",
            "IN_SERVICE",
            "COMPLETED",
            "CANCELLED",
        }

        if incident.status in blocked_statuses:
            raise ConflictException("El incidente ya no acepta nuevos candidatos.")

        if self.offer_repository.get_accepted_by_incident(str(incident.id)) is not None:
            raise ConflictException("El incidente ya tiene un proveedor aceptado.")

        if self.assignment_repository.get_active_by_incident(str(incident.id)) is not None:
            raise ConflictException("El incidente ya tiene una asignación activa.")

    def _get_provider_or_fail(self, provider_profile_id: str) -> ProviderProfile:
        provider_profile = self.provider_repository.get_by_id(provider_profile_id)

        if provider_profile is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        return provider_profile

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None

    def _ensure_valid_transition(self, current_status: str, next_status: str) -> None:
        allowed_next_statuses = self.ALLOWED_CANDIDATE_TRANSITIONS.get(
            current_status,
            set(),
        )

        if next_status not in allowed_next_statuses:
            raise ConflictException("Transición de estado no permitida.")
