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
from app.core.ai.exceptions import AIResponseError
from app.core.audit.constants import (
    AssignmentAuditEvent,
    AssignmentTrackingEventAuditEvent,
    IncidentAuditEvent,
    IncidentCandidateProviderAuditEvent,
    IncidentOfferAuditEvent,
    TechnicianAvailabilityAuditEvent,
)
from app.core.config import settings
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.incident.constants import IncidentUnattendedReason
from app.modules.assignment.models import Assignment
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.assignment_tracking_event.repository import (
    AssignmentTrackingEventRepository,
)
from app.modules.identity.customer.models import Customer
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician_availability.repository import (
    TechnicianAvailabilityRepository,
)
from app.modules.incident_candidate_provider.repository import (
    IncidentCandidateProviderRepository,
)
from app.modules.incident.models import Incident
from app.modules.incident.repository import IncidentRepository
from app.modules.incident.schemas import (
    IncidentCancelRequest,
    IncidentCreateRequest,
    IncidentStatusChangeRequest,
    IncidentUpdateRequest,
)
from app.modules.incident.utils import mark_incident_cancelled
from app.modules.incident_ai_analysis.repository import IncidentAiAnalysisRepository
from app.modules.incident_ai_analysis.service import IncidentAiAnalysisService
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.notification.business_notifications import BusinessNotificationService
from app.modules.service_catalog.repository import ServiceCatalogRepository
from app.modules.realtime_tracking.connection_manager import realtime_tracking_manager
from app.modules.realtime_tracking.events import assignment_status_changed_event
from app.modules.vehicle.repository import VehicleRepository

logger = logging.getLogger(__name__)

FINAL_STATUSES = {"COMPLETED", "CANCELLED"}

ALLOWED_INCIDENT_TRANSITIONS: dict[str, set[str]] = {
    "REPORTED": {"ANALYZING", "SEARCHING_PROVIDER", "UNATTENDED", "CANCELLED"},
    "ANALYZING": {"SEARCHING_PROVIDER", "UNATTENDED", "CANCELLED"},
    "SEARCHING_PROVIDER": {"WAITING_PROVIDER_RESPONSE", "UNATTENDED", "CANCELLED"},
    "WAITING_PROVIDER_RESPONSE": {"PROVIDER_ACCEPTED", "SEARCHING_PROVIDER", "UNATTENDED", "CANCELLED"},
    "PROVIDER_ACCEPTED": {"TECHNICIAN_ASSIGNED", "SEARCHING_PROVIDER", "UNATTENDED", "CANCELLED"},
    "ASSIGNING_TECHNICIAN": {"TECHNICIAN_ASSIGNED", "PROVIDER_ACCEPTED", "UNATTENDED", "CANCELLED"},
    "TECHNICIAN_ASSIGNED": {"EN_ROUTE", "PROVIDER_ACCEPTED", "UNATTENDED", "CANCELLED"},
    "EN_ROUTE": {"ARRIVED", "CANCELLED"},
    "ARRIVED": {"IN_SERVICE", "CANCELLED"},
    "IN_SERVICE": {"COMPLETED", "CANCELLED"},
    "COMPLETED": set(),
    "CANCELLED": set(),
    "UNATTENDED": set(),
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
        self.offer_repository = IncidentOfferRepository(self.db)
        self.candidate_provider_repository = IncidentCandidateProviderRepository(
            self.db
        )
        self.assignment_repository = AssignmentRepository(self.db)
        self.assignment_tracking_event_repository = AssignmentTrackingEventRepository(
            self.db
        )
        self.technician_availability_repository = TechnicianAvailabilityRepository(
            self.db
        )
        self.business_notifications = BusinessNotificationService(self.db, context)

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
        logger.info(
            "Incident create requested. customer_id=%s vehicle_id=%s has_media=%s",
            customer.id,
            payload.vehicle_id,
            bool(ai_media),
        )
        active_incident = self.repository.get_active_by_customer(str(customer.id))

        if active_incident is not None:
            raise ConflictException(
                "Ya tienes un incidente activo. Debes finalizarlo o cancelarlo antes de crear otro."
            )

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
        logger.info(
            "Incident persisted. incident_id=%s incident_code=%s status=%s priority=%s",
            incident.id,
            incident.incident_code,
            incident.status,
            incident.priority,
        )

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
        logger.info(
            "Incident committed. incident_id=%s incident_code=%s",
            incident.id,
            incident.incident_code,
        )

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
        return self._cancel_incident_flow(
            incident=incident,
            cancelled_by="CLIENT",
            cancellation_reason=payload.cancellation_reason,
            cancellation_notes=payload.cancellation_notes,
        )

    def cancel_any(
        self,
        incident_id: str,
        payload: IncidentCancelRequest,
    ) -> Incident:
        incident = self.get_or_fail(incident_id)
        return self._cancel_incident_flow(
            incident=incident,
            cancelled_by=self.context.actor_type or "SYSTEM",
            cancellation_reason=payload.cancellation_reason,
            cancellation_notes=payload.cancellation_notes,
        )

    def complete_any(self, incident_id: str) -> Incident:
        incident = self.get_or_fail(incident_id)
        return self._complete(incident)

    def mark_as_unattended(
        self,
        incident: Incident,
        *,
        reason: str,
    ) -> Incident:
        if incident.status in FINAL_STATUSES or incident.status == "UNATTENDED":
            return incident

        previous_status = incident.status
        incident.status = "UNATTENDED"
        incident.unattended_reason = reason
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
                "unattended_reason": reason,
            },
        )

        return incident

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

    def _cancel_incident_flow(
        self,
        *,
        incident: Incident,
        cancelled_by: str,
        cancellation_reason: str | None = None,
        cancellation_notes: str | None = None,
    ) -> Incident:
        if incident.status in {"COMPLETED", "CANCELLED", "UNATTENDED"}:
            raise ConflictException("No se puede cancelar un incidente finalizado.")

        self._ensure_valid_transition(incident.status, "CANCELLED")

        previous_status = incident.status
        now = datetime.now(timezone.utc)

        mark_incident_cancelled(
            incident,
            actor_type=cancelled_by,
            actor_user_id=self.context.user_id,
            reason=cancellation_reason,
        )

        impacted_tenant_ids = self._cancel_related_offers_and_candidates(
            incident=incident,
            now=now,
        )
        assignment = self._cancel_related_assignment_if_exists(
            incident=incident,
            now=now,
        )

        if assignment is not None:
            detail = self.assignment_repository.get_detail_by_id(str(assignment.id))
            if detail is not None:
                _, _, _, provider_profile, _ = detail
                impacted_tenant_ids.add(str(provider_profile.tenant_id))

        self._notify_customer_cancellation(
            incident=incident,
            assignment=assignment,
            impacted_tenant_ids=impacted_tenant_ids,
            cancellation_reason=cancellation_reason,
            cancellation_notes=cancellation_notes,
        )
        self._broadcast_customer_cancellation(
            incident=incident,
            assignment=assignment,
        )

        self.db.flush()

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_CANCELLED,
            resource_type="incident",
            event_data={
                "incident_code": incident.incident_code,
                "previous_status": previous_status,
                "status": incident.status,
                "cancelled_by": cancelled_by,
                "cancellation_reason": cancellation_reason,
                "cancellation_notes": cancellation_notes,
            },
        )

        self.db.commit()
        self.db.refresh(incident)

        return incident

    def _cancel_related_offers_and_candidates(
        self,
        *,
        incident: Incident,
        now: datetime,
    ) -> set[str]:
        offers, _ = self.offer_repository.list_by_incident(str(incident.id))
        impacted_tenant_ids: set[str] = set()

        for offer, _, candidate, provider_profile in offers:
            if offer.offer_status in {"PENDING", "ACCEPTED"}:
                previous_status = offer.offer_status
                offer.offer_status = "CANCELLED"
                offer.responded_at = now
                offer.response_message = "El cliente canceló la solicitud."
                impacted_tenant_ids.add(str(provider_profile.tenant_id))

                self.audit.updated(
                    offer,
                    IncidentOfferAuditEvent.INCIDENT_OFFER_CANCELLED,
                    resource_type="incident_offer",
                    tenant_id=str(provider_profile.tenant_id),
                    event_data={
                        "incident_id": str(incident.id),
                        "incident_code": incident.incident_code,
                        "offer_id": str(offer.id),
                        "previous_status": previous_status,
                        "offer_status": offer.offer_status,
                        "cancelled_by": "CLIENT",
                    },
                )

            if candidate is not None and candidate.candidate_status not in {
                "DISCARDED",
                "EXPIRED",
            }:
                previous_candidate_status = candidate.candidate_status
                candidate.candidate_status = "DISCARDED"

                self.audit.updated(
                    candidate,
                    IncidentCandidateProviderAuditEvent.INCIDENT_CANDIDATE_PROVIDER_STATUS_CHANGED,
                    resource_type="incident_candidate_provider",
                    tenant_id=str(provider_profile.tenant_id),
                    event_data={
                        "incident_id": str(incident.id),
                        "incident_code": incident.incident_code,
                        "provider_profile_id": str(provider_profile.id),
                        "previous_status": previous_candidate_status,
                        "candidate_status": candidate.candidate_status,
                        "reason": "incident_cancelled_by_customer",
                    },
                )

        return impacted_tenant_ids

    def _cancel_related_assignment_if_exists(
        self,
        *,
        incident: Incident,
        now: datetime,
    ) -> Assignment | None:
        assignment = self.assignment_repository.get_active_by_incident(str(incident.id))

        if assignment is None:
            return None

        detail = self.assignment_repository.get_detail_by_id(str(assignment.id))
        if detail is None:
            return None

        assignment, incident_detail, offer, provider_profile, technician = detail

        assignment.assignment_status = "CANCELLED"
        assignment.cancelled_at = now

        if offer.offer_status != "CANCELLED":
            offer.offer_status = "CANCELLED"
            offer.responded_at = now
            offer.response_message = "La solicitud fue cancelada por el cliente."

        tracking_event = AssignmentTrackingEvent(
            assignment_id=assignment.id,
            event_type="CANCELLED",
            latitude=None,
            longitude=None,
            notes="La solicitud fue cancelada por el cliente.",
            occurred_at=now,
        )
        self.db.add(tracking_event)

        availability = self.technician_availability_repository.get_current_by_technician(
            technician.id
        )
        if availability is not None:
            previous_availability_status = availability.availability_status
            availability.availability_status = "AVAILABLE"
            self.audit.updated(
                availability,
                TechnicianAvailabilityAuditEvent.TECHNICIAN_AVAILABILITY_UPDATED,
                resource_type="technician_availability",
                tenant_id=str(provider_profile.tenant_id),
                event_data={
                    "technician_id": str(technician.id),
                    "previous_status": previous_availability_status,
                    "availability_status": availability.availability_status,
                    "reason": "ASSIGNMENT_CANCELLED_BY_CUSTOMER",
                },
            )

        self.db.flush()

        self.audit.updated(
            assignment,
            AssignmentAuditEvent.ASSIGNMENT_CANCELLED,
            resource_type="assignment",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "assignment_id": str(assignment.id),
                "incident_id": str(incident_detail.id),
                "offer_id": str(offer.id),
                "assignment_status": assignment.assignment_status,
                "incident_status": "CANCELLED",
            },
        )

        self.audit.updated(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_CANCELLED,
            resource_type="incident_offer",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "incident_id": str(incident_detail.id),
                "offer_id": str(offer.id),
                "offer_status": offer.offer_status,
                "cancelled_by": "CLIENT",
            },
        )

        self.audit.created(
            tracking_event,
            AssignmentTrackingEventAuditEvent.ASSIGNMENT_TRACKING_EVENT_CREATED,
            resource_type="assignment_tracking_event",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "assignment_id": str(assignment.id),
                "event_type": tracking_event.event_type,
                "notes": tracking_event.notes,
            },
        )

        return assignment

    def _notify_customer_cancellation(
        self,
        *,
        incident: Incident,
        assignment: Assignment | None,
        impacted_tenant_ids: set[str],
        cancellation_reason: str | None,
        cancellation_notes: str | None,
    ) -> None:
        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )

        customer_user = (
            customer_detail[1] if customer_detail is not None else None
        )

        try:
            if customer_user is not None:
                self.business_notifications.send_incident_cancelled_by_customer(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=None,
                    incident_id=str(incident.id),
                    assignment_id=str(assignment.id) if assignment is not None else None,
                    audience="CLIENT",
                    cancellation_reason=cancellation_reason,
                    cancellation_notes=cancellation_notes,
                )

            for tenant_id in impacted_tenant_ids:
                self.business_notifications.send_incident_cancelled_by_customer_to_tenant_owners(
                    tenant_id=tenant_id,
                    incident_id=str(incident.id),
                    assignment_id=str(assignment.id) if assignment is not None else None,
                    cancellation_reason=cancellation_reason,
                    cancellation_notes=cancellation_notes,
                )

            if assignment is not None:
                detail = self.assignment_repository.get_detail_by_id(str(assignment.id))
                if detail is not None:
                    _, _, _, provider_profile, technician = detail
                    self.business_notifications.send_assignment_cancelled_for_technician_by_customer(
                        recipient_user_id=str(technician.user_id),
                        tenant_id=str(provider_profile.tenant_id),
                        assignment_id=str(assignment.id),
                        incident_id=str(incident.id),
                    )
        except Exception:
            return

    def _broadcast_customer_cancellation(
        self,
        *,
        incident: Incident,
        assignment: Assignment | None,
    ) -> None:
        if assignment is None:
            return

        message = assignment_status_changed_event(
            assignment_id=str(assignment.id),
            incident_id=str(incident.id),
            assignment_status="CANCELLED",
            incident_status="CANCELLED",
            event_type="CANCELLED",
        )

        try:
            loop = asyncio.get_running_loop()
            loop.create_task(
                realtime_tracking_manager.broadcast(
                    assignment_id=str(assignment.id),
                    payload=message,
                )
            )
        except RuntimeError:
            asyncio.run(
                realtime_tracking_manager.broadcast(
                    assignment_id=str(assignment.id),
                    payload=message,
                )
            )

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
            logger.info(
                "Incident AI analysis skipped. incident_id=%s reason=AI_DISABLED",
                incident.id,
            )
            return

        logger.info(
            "Incident AI analysis triggered. incident_id=%s media_count=%s",
            incident.id,
            len(media or []),
        )

        try:
            analysis_service = IncidentAiAnalysisService(
                IncidentAiAnalysisRepository(self.db),
                self.context,
            )
            analysis_service.run_for_incident(
                incident_id=str(incident.id),
                analysis_input=self._build_analysis_input(incident, media),
            )
        except Exception as exc:
            logger.warning(
                "No se pudo generar el análisis IA del incidente %s: %s",
                incident.id,
                exc,
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
