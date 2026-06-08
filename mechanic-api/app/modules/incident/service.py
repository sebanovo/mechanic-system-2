from __future__ import annotations

import logging
from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import select

from app.common.exceptions import (
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ValidationException,
)
from app.common.uuid import to_uuid
from app.core.ai.media import AIMediaInput
from app.core.audit.constants import IncidentAuditEvent
from app.core.config import settings
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.identity.customer.models import Customer
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.provider.models import ProviderProfile
from app.modules.incident.models import Incident
from app.modules.incident.repository import IncidentRepository
from app.modules.incident.schemas import (
    IncidentCancelRequest,
    IncidentCreateRequest,
    IncidentStatusChangeRequest,
    IncidentUpdateRequest,
)
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_ai_analysis.service import IncidentAiAnalysisService
from app.modules.service_catalog.repository import ServiceCatalogRepository
from app.modules.vehicle.repository import VehicleRepository

logger = logging.getLogger(__name__)

FINAL_STATUSES = {"COMPLETED", "CANCELLED"}

ALLOWED_INCIDENT_TRANSITIONS: dict[str, set[str]] = {
    "REPORTED": {"ANALYZING", "SEARCHING_PROVIDER", "CANCELLED"},
    "ANALYZING": {"SEARCHING_PROVIDER", "CANCELLED"},
    "SEARCHING_PROVIDER": {"WAITING_PROVIDER_RESPONSE", "CANCELLED"},
    "WAITING_PROVIDER_RESPONSE": {"PROVIDER_ACCEPTED", "SEARCHING_PROVIDER", "CANCELLED"},
    "PROVIDER_ACCEPTED": {"TECHNICIAN_ASSIGNED", "SEARCHING_PROVIDER", "CANCELLED"},
    "ASSIGNING_TECHNICIAN": {"TECHNICIAN_ASSIGNED", "PROVIDER_ACCEPTED", "CANCELLED"},
    "TECHNICIAN_ASSIGNED": {"EN_ROUTE", "PROVIDER_ACCEPTED", "CANCELLED"},
    "EN_ROUTE": {"ARRIVED", "CANCELLED"},
    "ARRIVED": {"IN_SERVICE", "CANCELLED"},
    "IN_SERVICE": {"COMPLETED", "CANCELLED"},
    "COMPLETED": set(),
    "CANCELLED": set(),
}


class IncidentService(BaseService):
    def __init__(
        self,
        repository: IncidentRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.customer_repository = CustomerRepository(self.db)
        self.vehicle_repository = VehicleRepository(self.db)
        self.service_catalog_repository = ServiceCatalogRepository(self.db)

    def list(
        self,
        *,
        customer_id: str | None = None,
        vehicle_id: str | None = None,
        service_catalog_id: str | None = None,
        status: str | None = None,
        priority: str | None = None,
        search: str | None = None,
        reported_from=None,
        reported_to=None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Incident], int]:
        return self.repository.list(
            customer_id=customer_id,
            vehicle_id=vehicle_id,
            service_catalog_id=service_catalog_id,
            status=self._normalize_upper(status),
            priority=self._normalize_upper(priority),
            search=self._normalize_text(search),
            reported_from=reported_from,
            reported_to=reported_to,
            limit=limit,
            offset=offset,
        )

    def list_current_customer(
        self,
        *,
        status: str | None = None,
        priority: str | None = None,
        service_catalog_id: str | None = None,
        search: str | None = None,
        reported_from=None,
        reported_to=None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Incident], int]:
        customer = self._get_current_customer_or_fail()

        return self.repository.list_by_customer(
            str(customer.id),
            status=self._normalize_upper(status),
            priority=self._normalize_upper(priority),
            service_catalog_id=service_catalog_id,
            search=self._normalize_text(search),
            reported_from=reported_from,
            reported_to=reported_to,
            limit=limit,
            offset=offset,
        )

    def list_for_current_provider(
        self,
        *,
        status: str | None = None,
        priority: str | None = None,
        service_catalog_id: str | None = None,
        search: str | None = None,
        reported_from=None,
        reported_to=None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Incident], int]:
        provider_profile = self._get_current_provider_or_fail()

        return self.repository.list_by_related_provider(
            str(provider_profile.id),
            status=self._normalize_upper(status),
            priority=self._normalize_upper(priority),
            service_catalog_id=service_catalog_id,
            search=self._normalize_text(search),
            reported_from=reported_from,
            reported_to=reported_to,
            limit=limit,
            offset=offset,
        )

    def get_or_fail(self, incident_id: str) -> Incident:
        incident = self.repository.get_by_id(incident_id)

        if incident is None or incident.deleted_at is not None:
            raise NotFoundException("Incidente no encontrado.")

        return incident

    def get_current_customer_incident_or_fail(self, incident_id: str) -> Incident:
        customer = self._get_current_customer_or_fail()
        incident = self.get_or_fail(incident_id)

        if str(incident.customer_id) != str(customer.id):
            raise NotFoundException("Incidente no encontrado.")

        return incident

    def get_for_current_provider_or_fail(self, incident_id: str) -> Incident:
        provider_profile = self._get_current_provider_or_fail()
        incident = self.repository.get_by_related_provider(
            incident_id,
            str(provider_profile.id),
        )

        if incident is None:
            raise NotFoundException("Incidente no encontrado.")

        return incident

    def create_current_customer_incident(
        self,
        payload: IncidentCreateRequest,
        *,
        ai_media: list[AIMediaInput] | None = None,
    ) -> Incident:
        return self.create_for_current_customer(payload, ai_media=ai_media)

    def create_for_current_customer(
        self,
        payload: IncidentCreateRequest,
        *,
        ai_media: list[AIMediaInput] | None = None,
    ) -> Incident:
        customer = self._get_current_customer_or_fail()
        vehicle = self.vehicle_repository.get_by_id(payload.vehicle_id)

        if vehicle is None or vehicle.deleted_at is not None:
            raise NotFoundException("Vehículo no encontrado.")

        if str(vehicle.customer_id) != str(customer.id):
            raise ForbiddenException("El vehículo no pertenece al cliente actual.")

        incident = Incident(
            customer_id=customer.id,
            vehicle_id=vehicle.id,
            service_catalog_id=None,
            incident_code=self._generate_incident_code(),
            title=(self._normalize_text(payload.description) or "Incidente reportado")[:150],
            description=self._normalize_text(payload.description),
            latitude=payload.latitude,
            longitude=payload.longitude,
            address_text=None,
            priority=payload.priority or "MEDIUM",
            status="REPORTED",
            reported_at=datetime.now(timezone.utc),
        )

        incident = self.repository.add(incident)

        self.audit.created(
            incident,
            IncidentAuditEvent.INCIDENT_CREATED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "customer_id": str(customer.id),
                "vehicle_id": str(vehicle.id),
                "service_catalog_id": None,
                "priority": incident.priority,
                "status": incident.status,
            },
        )

        self.db.commit()
        self.db.refresh(incident)

        self._run_incident_ai_analysis_if_enabled(
            incident,
            media=ai_media,
        )

        return incident

    def update_current_customer_incident(
        self,
        incident_id: str,
        payload: IncidentUpdateRequest,
    ) -> Incident:
        incident = self.get_current_customer_incident_or_fail(incident_id)
        return self._update(incident, payload)

    def update_any(
        self,
        incident_id: str,
        payload: IncidentUpdateRequest,
    ) -> Incident:
        incident = self.get_or_fail(incident_id)
        return self._update(incident, payload)

    def change_status(
        self,
        incident_id: str,
        payload: IncidentStatusChangeRequest,
    ) -> Incident:
        incident = self.get_or_fail(incident_id)
        
        status = self._normalize_upper(payload.status)

        if status is None:
            raise ValidationException("Estado requerido")
        return self._change_status(incident, status)

    def cancel_current_customer_incident(
        self,
        incident_id: str,
        payload: IncidentCancelRequest,
    ) -> Incident:
        incident = self.get_current_customer_incident_or_fail(incident_id)
        return self._cancel(incident, payload)

    def cancel_any(
        self,
        incident_id: str,
        payload: IncidentCancelRequest,
    ) -> Incident:
        incident = self.get_or_fail(incident_id)
        return self._cancel(incident, payload)

    def complete_any(self, incident_id: str) -> Incident:
        incident = self.get_or_fail(incident_id)
        return self._complete(incident)

    def soft_delete_any(self, incident_id: str) -> Incident:
        incident = self.get_or_fail(incident_id)

        incident.deleted_at = datetime.now(timezone.utc)

        self.db.flush()

        self.audit.deleted(
            incident,
            IncidentAuditEvent.INCIDENT_DELETED,
            resource_type="incident",
            event_data={"incident_code": incident.incident_code},
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def restore_any(self, incident_id: str) -> Incident:
        incident = self.repository.get_by_id(incident_id)

        if incident is None:
            raise NotFoundException("Incidente no encontrado.")

        incident.deleted_at = None

        self.db.flush()

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_RESTORED,
            resource_type="incident",
            event_data={"incident_code": incident.incident_code},
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def _update(
        self,
        incident: Incident,
        payload: IncidentUpdateRequest,
    ) -> Incident:
        self._ensure_not_final(incident)
        changed_fields: list[str] = []

        if payload.service_catalog_id is not None:
            service_catalog = self.service_catalog_repository.get_by_id(
                payload.service_catalog_id
            )

            if service_catalog is None or not service_catalog.is_active:
                raise NotFoundException("Servicio de catálogo no disponible.")

            incident.service_catalog_id = service_catalog.id
            changed_fields.append("service_catalog_id")

        if payload.title is not None:
            incident.title = payload.title.strip()
            changed_fields.append("title")

        if payload.description is not None:
            incident.description = self._normalize_text(payload.description)
            changed_fields.append("description")

        if payload.latitude is not None:
            incident.latitude = payload.latitude
            changed_fields.append("latitude")

        if payload.longitude is not None:
            incident.longitude = payload.longitude
            changed_fields.append("longitude")

        if payload.address_text is not None:
            incident.address_text = self._normalize_text(payload.address_text)
            changed_fields.append("address_text")

        if payload.priority is not None:
            incident.priority = payload.priority
            changed_fields.append("priority")

        self.db.flush()

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_UPDATED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "changed_fields": changed_fields,
            },
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def _change_status(self, incident: Incident, status: str) -> Incident:
        previous_status = incident.status

        self._ensure_valid_transition(previous_status, status)

        incident.status = status

        if status == "COMPLETED":
            incident.completed_at = datetime.now(timezone.utc)

        if status == "CANCELLED":
            incident.cancelled_at = datetime.now(timezone.utc)

        self.db.flush()

        event_type = (
            IncidentAuditEvent.INCIDENT_COMPLETED
            if status == "COMPLETED"
            else IncidentAuditEvent.INCIDENT_STATUS_CHANGED
        )

        self.audit.updated(
            incident,
            event_type,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "previous_status": previous_status,
                "status": status,
            },
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def _cancel(
        self,
        incident: Incident,
        payload: IncidentCancelRequest,
    ) -> Incident:
        self._ensure_valid_transition(incident.status, "CANCELLED")

        previous_status = incident.status
        incident.status = "CANCELLED"
        incident.cancelled_at = datetime.now(timezone.utc)

        self.db.flush()

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_CANCELLED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "previous_status": previous_status,
                "status": incident.status,
                "cancellation_reason": payload.cancellation_reason,
            },
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def _complete(self, incident: Incident) -> Incident:
        self._ensure_valid_transition(incident.status, "COMPLETED")

        previous_status = incident.status
        incident.status = "COMPLETED"
        incident.completed_at = datetime.now(timezone.utc)

        self.db.flush()

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_COMPLETED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "previous_status": previous_status,
                "status": incident.status,
            },
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def _get_current_customer_or_fail(self) -> Customer:
        if self.context.user_id is None:
            raise NotFoundException("Cliente no encontrado.")

        customer = self.customer_repository.get_by_user_id(self.context.user_id)

        if customer is None or customer.deleted_at is not None:
            raise NotFoundException("Cliente no encontrado.")

        return customer

    def _get_current_provider_or_fail(self):
        if self.context.tenant_id is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        provider_profile = self.db.scalar(
            select(ProviderProfile).where(
                ProviderProfile.tenant_id == to_uuid(self.context.tenant_id, "tenant_id")
            )
        )

        if provider_profile is None:
            raise NotFoundException("Perfil de proveedor no encontrado.")

        return provider_profile

    def _ensure_not_final(self, incident: Incident) -> None:
        if incident.status in FINAL_STATUSES:
            raise ConflictException("No se puede modificar un incidente finalizado.")

    def _ensure_valid_transition(self, current_status: str, next_status: str) -> None:
        allowed_next_statuses = ALLOWED_INCIDENT_TRANSITIONS.get(current_status, set())

        if next_status not in allowed_next_statuses:
            raise ConflictException("Transición de estado no permitida.")

    def _generate_incident_code(self) -> str:
        while True:
            code = f"INC-{uuid4().hex[:12].upper()}"
            if self.repository.get_by_code(code) is None:
                return code

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None

    def _run_incident_ai_analysis_if_enabled(
        self,
        incident: Incident,
        *,
        media: list[AIMediaInput] | None = None,
    ) -> None:
        if not settings.ai_enabled:
            return

        try:
            analysis_service = IncidentAiAnalysisService(
                IncidentAiAnalysisRepository(self.db),
                self.context,
            )
            analysis_service.run_for_incident(
                incident_id=str(incident.id),
                analysis_input=self._build_analysis_input(incident, media),
            )
        except Exception:
            logger.exception(
                "No se pudo generar el análisis IA del incidente %s",
                incident.id,
            )

    def _build_analysis_input(
        self,
        incident: Incident,
        media: list[AIMediaInput] | None,
    ):
        from app.modules.incident_ai_analysis.inputs import IncidentAIMultimodalInput

        return IncidentAIMultimodalInput(
            text=incident.description,
            media=media or [],
        )
