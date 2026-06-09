from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import ConflictException, NotFoundException
from app.core.audit.constants import (
    AssignmentAuditEvent,
    AssignmentTrackingEventAuditEvent,
    IncidentAuditEvent,
    IncidentOfferAuditEvent,
    TechnicianAvailabilityAuditEvent,
)
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.assignment.models import Assignment
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment.schemas import (
    AssignmentCreateRequest,
    AssignmentStatusChangeRequest,
    AssignmentUpdateRequest,
)
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.technician.models import Technician
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.technician_availability.models import TechnicianAvailability
from app.modules.identity.technician_availability.repository import (
    TechnicianAvailabilityRepository,
)
from app.modules.identity.technician_availability.utils import (
    is_technician_available_now,
)
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.notification.business_notifications import BusinessNotificationService
from app.modules.technician_service.repository import TechnicianServiceRepository

FINAL_ASSIGNMENT_STATUSES = {"COMPLETED", "CANCELLED"}

ALLOWED_ASSIGNMENT_TRANSITIONS: dict[str, set[str]] = {
    "ASSIGNED": {"EN_ROUTE", "CANCELLED"},
    "EN_ROUTE": {"ARRIVED", "CANCELLED"},
    "ARRIVED": {"IN_SERVICE", "CANCELLED"},
    "IN_SERVICE": {"COMPLETED", "CANCELLED"},
    "COMPLETED": set(),
    "CANCELLED": set(),
}


class AssignmentService(BaseService):
    def __init__(
        self,
        repository: AssignmentRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.offer_repository = IncidentOfferRepository(self.db)
        self.customer_repository = CustomerRepository(self.db)
        self.technician_repository = TechnicianRepository(self.db)
        self.technician_availability_repository = TechnicianAvailabilityRepository(
            self.db
        )
        self.technician_service_repository = TechnicianServiceRepository(self.db)
        self.business_notifications = BusinessNotificationService(self.db, context)

    def list(
        self,
        *,
        incident_id: str | None = None,
        offer_id: str | None = None,
        provider_profile_id: str | None = None,
        technician_id: str | None = None,
        assignment_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ):
        return self.repository.list(
            incident_id=incident_id,
            offer_id=offer_id,
            provider_profile_id=provider_profile_id,
            technician_id=technician_id,
            assignment_status=self._normalize_upper(assignment_status),
            limit=limit,
            offset=offset,
        )

    def list_by_provider(
        self,
        provider_profile_id: str,
        *,
        assignment_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ):
        return self.repository.list_by_provider(
            provider_profile_id,
            assignment_status=self._normalize_upper(assignment_status),
            limit=limit,
            offset=offset,
        )

    def list_by_current_technician(
        self,
        *,
        assignment_status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ):
        technician = self._get_current_technician_or_fail()

        if assignment_status is None:
            return self.repository.list_by_technician(
                technician.id,
                exclude_assignment_statuses=["COMPLETED", "CANCELLED"],
                limit=limit,
                offset=offset,
            )

        return self.repository.list_by_technician(
            technician.id,
            assignment_status=self._normalize_upper(assignment_status),
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(self, assignment_id: str):
        detail = self.repository.get_detail_by_id(assignment_id)

        if detail is None:
            raise NotFoundException("Asignación no encontrada.")

        return detail

    def get_current_technician_detail_or_fail(self, assignment_id: str):
        technician = self._get_current_technician_or_fail()
        detail = self.repository.get_detail_by_id(assignment_id)

        if detail is None:
            raise NotFoundException("Asignación no encontrada.")

        assignment, incident, offer, provider_profile, assignment_technician = detail

        if str(assignment.provider_profile_id) != str(provider_profile.id):
            raise NotFoundException("Asignación no encontrada.")

        if str(assignment_technician.id) != str(technician.id):
            raise NotFoundException("Asignación no encontrada.")

        return detail

    def create_for_offer(
        self,
        payload: AssignmentCreateRequest,
    ) -> Assignment:
        offer, incident, _, provider_profile = self._get_offer_detail_or_fail(
            payload.offer_id
        )

        if offer.offer_status != "ACCEPTED":
            raise ConflictException("Solo se puede asignar una oferta aceptada.")

        if incident.status in {"COMPLETED", "CANCELLED"}:
            raise ConflictException("No se puede asignar un incidente finalizado.")

        existing_assignment = self.repository.get_active_by_incident(str(incident.id))
        if existing_assignment is not None:
            raise ConflictException("El incidente ya tiene una asignación activa.")

        technician, availability = self._ensure_technician_can_be_assigned(
            technician_id=payload.technician_id,
            provider_profile_id=str(provider_profile.id),
            service_catalog_id=(
                str(incident.service_catalog_id)
                if incident.service_catalog_id is not None
                else None
            ),
        )

        assignment = Assignment(
            incident_id=incident.id,
            offer_id=offer.id,
            provider_profile_id=provider_profile.id,
            technician_id=technician.id,
            assignment_status="ASSIGNED",
            notes=self._normalize_text(payload.notes),
            assigned_at=datetime.now(timezone.utc),
            started_at=None,
            arrived_at=None,
            completed_at=None,
            cancelled_at=None,
        )

        assignment = self.repository.add(assignment)

        incident.status = "TECHNICIAN_ASSIGNED"
        self._set_technician_availability_status(
            technician=technician,
            availability=availability,
            availability_status="BUSY",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "assignment_id": str(assignment.id),
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "reason": "ASSIGNMENT_CREATED",
            },
        )

        self.db.flush()

        self.audit.created(
            assignment,
            AssignmentAuditEvent.ASSIGNMENT_CREATED,
            resource_type="assignment",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "incident_id": str(incident.id),
                "incident_code": incident.incident_code,
                "offer_id": str(offer.id),
                "technician_id": str(technician.id),
                "assignment_status": assignment.assignment_status,
            },
        )

        self._notify_assignment_created(
            incident=incident,
            technician=technician,
            assignment_id=str(assignment.id),
            tenant_id=str(provider_profile.tenant_id),
        )

        self.db.commit()
        self.db.refresh(assignment)

        return assignment

    def create_owned(
        self,
        *,
        provider_profile_id: str,
        payload: AssignmentCreateRequest,
    ) -> Assignment:
        offer, _, _, _ = self._get_offer_detail_or_fail(payload.offer_id)

        if str(offer.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Oferta no encontrada.")

        return self.create_for_offer(payload)

    def update(
        self,
        assignment_id: str,
        payload: AssignmentUpdateRequest,
    ) -> Assignment:
        assignment, incident, _, provider_profile, _ = self.get_detail_or_fail(
            assignment_id
        )

        return self._update(
            assignment=assignment,
            incident=incident,
            provider_profile_id=str(provider_profile.id),
            tenant_id=str(provider_profile.tenant_id),
            payload=payload,
        )

    def update_owned(
        self,
        *,
        provider_profile_id: str,
        assignment_id: str,
        payload: AssignmentUpdateRequest,
    ) -> Assignment:
        assignment, incident, _, provider_profile, _ = self.get_detail_or_fail(
            assignment_id
        )

        if str(assignment.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Asignación no encontrada.")

        return self._update(
            assignment=assignment,
            incident=incident,
            provider_profile_id=str(provider_profile.id),
            tenant_id=str(provider_profile.tenant_id),
            payload=payload,
        )

    def change_status(
        self,
        assignment_id: str,
        payload: AssignmentStatusChangeRequest,
    ) -> Assignment:
        assignment, incident, offer, provider_profile, technician = self.get_detail_or_fail(
            assignment_id
        )

        return self._change_status(
            assignment=assignment,
            incident=incident,
            offer=offer,
            provider_profile=provider_profile,
            technician=technician,
            status=payload.assignment_status,
            tenant_id=str(provider_profile.tenant_id),
        )

    def change_owned_status(
        self,
        *,
        provider_profile_id: str,
        assignment_id: str,
        payload: AssignmentStatusChangeRequest,
    ) -> Assignment:
        if payload.assignment_status != "CANCELLED":
            raise ConflictException(
                "El owner solo puede cancelar la asignación. El avance operativo lo registra el técnico."
            )

        assignment, incident, offer, provider_profile, technician = self.get_detail_or_fail(
            assignment_id
        )

        if str(assignment.provider_profile_id) != provider_profile_id:
            raise NotFoundException("Asignación no encontrada.")

        return self._change_status(
            assignment=assignment,
            incident=incident,
            offer=offer,
            provider_profile=provider_profile,
            technician=technician,
            status=payload.assignment_status,
            tenant_id=str(provider_profile.tenant_id),
        )

    def change_current_technician_status(
        self,
        assignment_id: str,
        payload: AssignmentStatusChangeRequest,
    ) -> Assignment:
        technician = self._get_current_technician_or_fail()
        detail = self.repository.get_detail_by_id(assignment_id)

        if detail is None:
            raise NotFoundException("Asignación no encontrada.")

        assignment, incident, offer, provider_profile, assignment_technician = detail

        if str(assignment.provider_profile_id) != str(provider_profile.id):
            raise NotFoundException("Asignación no encontrada.")

        if str(assignment_technician.id) != str(technician.id):
            raise NotFoundException("Asignación no encontrada.")

        return self._change_status(
            assignment=assignment,
            incident=incident,
            offer=offer,
            provider_profile=provider_profile,
            technician=assignment_technician,
            status=payload.assignment_status,
            tenant_id=str(provider_profile.tenant_id),
        )

    def _update(
        self,
        *,
        assignment: Assignment,
        incident,
        provider_profile_id: str,
        tenant_id: str | None,
        payload: AssignmentUpdateRequest,
    ) -> Assignment:
        self._ensure_not_final(assignment)
        changed_fields: list[str] = []

        if payload.technician_id is not None:
            if str(assignment.technician_id) != payload.technician_id:
                previous_technician_id = str(assignment.technician_id)
                previous_technician = self._get_technician_or_fail(
                    previous_technician_id
                )
                previous_availability = (
                    self.technician_availability_repository.get_current_by_technician(
                        previous_technician_id
                    )
                )

                if previous_availability is None:
                    raise ConflictException(
                        "No se puede reasignar porque el técnico actual no tiene disponibilidad configurada."
                    )

                technician, availability = self._ensure_technician_can_be_assigned(
                    technician_id=payload.technician_id,
                    provider_profile_id=provider_profile_id,
                    service_catalog_id=(
                        str(incident.service_catalog_id)
                        if incident.service_catalog_id is not None
                        else None
                    ),
                    exclude_assignment_id=str(assignment.id),
                )

                assignment.technician_id = technician.id
                changed_fields.append("technician_id")

                self._set_technician_availability_status(
                    technician=technician,
                    availability=availability,
                    availability_status="BUSY",
                    tenant_id=tenant_id,
                    event_data={
                        "assignment_id": str(assignment.id),
                        "incident_id": str(incident.id),
                        "reason": "ASSIGNMENT_TECHNICIAN_CHANGED",
                    },
                )

                self._set_technician_availability_status(
                    technician=previous_technician,
                    availability=previous_availability,
                    availability_status="AVAILABLE",
                    tenant_id=tenant_id,
                    event_data={
                        "assignment_id": str(assignment.id),
                        "incident_id": str(incident.id),
                        "reason": "ASSIGNMENT_TECHNICIAN_RELEASED",
                    },
                )

        if payload.notes is not None:
            assignment.notes = self._normalize_text(payload.notes)
            changed_fields.append("notes")

        self.db.flush()

        self.audit.updated(
            assignment,
            AssignmentAuditEvent.ASSIGNMENT_UPDATED,
            resource_type="assignment",
            tenant_id=tenant_id,
            event_data={"changed_fields": changed_fields},
        )

        self.db.commit()
        self.db.refresh(assignment)

        return assignment

    def _notify_assignment_created(
        self,
        *,
        incident,
        technician: Technician,
        assignment_id: str,
        tenant_id: str,
    ) -> None:
        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )

        customer_user_id = (
            str(customer_detail[1].id) if customer_detail is not None else None
        )
        try:
            self.business_notifications.send_assignment_created(
                customer_user_id=customer_user_id,
                technician_user_id=str(technician.user_id),
                tenant_id=tenant_id,
                assignment_id=assignment_id,
                incident_id=str(incident.id),
            )
        except Exception:
            return

    def _change_status(
        self,
        *,
        assignment: Assignment,
        incident,
        offer,
        provider_profile,
        technician,
        status: str,
        tenant_id: str | None,
    ) -> Assignment:
        previous_status = assignment.assignment_status

        self._ensure_valid_transition(previous_status, status)

        if status == "CANCELLED":
            self._cancel_assignment_flow(
                assignment=assignment,
                incident=incident,
                offer=offer,
                provider_profile=provider_profile,
                technician=technician,
                tenant_id=tenant_id,
            )
            self.db.commit()
            self.db.refresh(assignment)
            return assignment

        assignment.assignment_status = status

        if status == "EN_ROUTE":
            assignment.started_at = datetime.now(timezone.utc)
            incident.status = "EN_ROUTE"

        elif status == "ARRIVED":
            assignment.arrived_at = datetime.now(timezone.utc)
            incident.status = "ARRIVED"

        elif status == "IN_SERVICE":
            incident.status = "IN_SERVICE"

        elif status == "COMPLETED":
            assignment.completed_at = datetime.now(timezone.utc)
            incident.status = "COMPLETED"
            incident.completed_at = datetime.now(timezone.utc)

        if status == "COMPLETED":
            availability = self.technician_availability_repository.get_current_by_technician(
                assignment.technician_id
            )
            if availability is not None:
                technician = self._get_technician_or_fail(str(assignment.technician_id))
                self._set_technician_availability_status(
                    technician=technician,
                    availability=availability,
                    availability_status="AVAILABLE",
                    tenant_id=tenant_id,
                    event_data={
                        "assignment_id": str(assignment.id),
                        "incident_id": str(incident.id),
                        "reason": f"ASSIGNMENT_{status}",
                    },
                )

        self.db.flush()

        if status == "COMPLETED":
            event_type = AssignmentAuditEvent.ASSIGNMENT_COMPLETED
        elif status == "CANCELLED":
            event_type = AssignmentAuditEvent.ASSIGNMENT_CANCELLED
        else:
            event_type = AssignmentAuditEvent.ASSIGNMENT_STATUS_CHANGED

        self.audit.updated(
            assignment,
            event_type,
            resource_type="assignment",
            tenant_id=tenant_id,
            event_data={
                "previous_status": previous_status,
                "assignment_status": status,
                "incident_status": incident.status,
            },
        )

        self.db.commit()
        self.db.refresh(assignment)

        return assignment

    def _cancel_assignment_flow(
        self,
        *,
        assignment: Assignment,
        incident,
        offer,
        provider_profile,
        technician: Technician,
        tenant_id: str | None,
    ) -> None:
        now = datetime.now(timezone.utc)

        assignment.assignment_status = "CANCELLED"
        assignment.cancelled_at = now

        incident.status = "CANCELLED"
        incident.cancelled_at = now

        offer.offer_status = "CANCELLED"
        offer.responded_at = now
        offer.response_message = "La asignación fue cancelada por el taller."

        tracking_event = AssignmentTrackingEvent(
            assignment_id=assignment.id,
            event_type="CANCELLED",
            latitude=None,
            longitude=None,
            notes="La asignación fue cancelada por el taller.",
            occurred_at=now,
        )
        self.db.add(tracking_event)

        availability = self.technician_availability_repository.get_current_by_technician(
            technician.id
        )
        if availability is not None:
            self._set_technician_availability_status(
                technician=technician,
                availability=availability,
                availability_status="AVAILABLE",
                tenant_id=tenant_id,
                event_data={
                    "assignment_id": str(assignment.id),
                    "incident_id": str(incident.id),
                    "reason": "ASSIGNMENT_CANCELLED_BY_OWNER",
                },
            )

        self.db.flush()

        self.audit.updated(
            assignment,
            AssignmentAuditEvent.ASSIGNMENT_CANCELLED,
            resource_type="assignment",
            tenant_id=tenant_id,
            event_data={
                "assignment_id": str(assignment.id),
                "incident_id": str(incident.id),
                "offer_id": str(offer.id),
                "assignment_status": "CANCELLED",
                "incident_status": "CANCELLED",
                "offer_status": "CANCELLED",
            },
        )

        self.audit.updated(
            incident,
            IncidentAuditEvent.INCIDENT_CANCELLED,
            resource_type="incident",
            tenant_id=tenant_id,
            event_data={
                "incident_code": incident.incident_code,
                "assignment_id": str(assignment.id),
                "offer_id": str(offer.id),
                "status": "CANCELLED",
            },
        )

        self.audit.updated(
            offer,
            IncidentOfferAuditEvent.INCIDENT_OFFER_CANCELLED,
            resource_type="incident_offer",
            tenant_id=tenant_id,
            event_data={
                "assignment_id": str(assignment.id),
                "incident_id": str(incident.id),
                "offer_id": str(offer.id),
                "offer_status": "CANCELLED",
            },
        )

        self.audit.created(
            tracking_event,
            AssignmentTrackingEventAuditEvent.ASSIGNMENT_TRACKING_EVENT_CREATED,
            resource_type="assignment_tracking_event",
            tenant_id=tenant_id,
            event_data={
                "assignment_id": str(assignment.id),
                "event_type": tracking_event.event_type,
                "notes": tracking_event.notes,
            },
        )

        self._notify_assignment_cancelled_by_owner(
            incident=incident,
            assignment=assignment,
            technician=technician,
            tenant_id=tenant_id,
        )

    def _notify_assignment_cancelled_by_owner(
        self,
        *,
        incident,
        assignment: Assignment,
        technician: Technician,
        tenant_id: str | None,
    ) -> None:
        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )
        customer_user = (
            customer_detail[1] if customer_detail is not None else None
        )

        technician_detail = self.technician_repository.get_detail_by_id(
            technician.id
        )
        technician_user = (
            technician_detail[1] if technician_detail is not None else None
        )

        try:
            if customer_user is not None:
                self.business_notifications.send_service_cancelled(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )

            if technician_user is not None:
                self.business_notifications.send_assignment_cancelled_for_technician(
                    recipient_user_id=str(technician_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )
        except Exception:
            return

    def _ensure_technician_can_be_assigned(
        self,
        *,
        technician_id: str,
        provider_profile_id: str,
        service_catalog_id: str | None,
        exclude_assignment_id: str | None = None,
    ) -> tuple[Technician, TechnicianAvailability]:
        technician = self.technician_repository.get_by_id(technician_id)

        if technician is None or technician.deleted_at is not None:
            raise NotFoundException("Técnico no encontrado.")

        if str(technician.provider_profile_id) != provider_profile_id:
            raise ConflictException("El técnico no pertenece al proveedor.")

        if technician.status != "ACTIVE":
            raise ConflictException("El técnico no está activo.")

        if service_catalog_id is not None:
            _technician_services, total = self.technician_service_repository.list(
                technician_id=technician_id,
                provider_profile_id=provider_profile_id,
                service_catalog_id=service_catalog_id,
                is_enabled=True,
                limit=1,
                offset=0,
            )

            if total == 0:
                raise ConflictException(
                    "El técnico no está habilitado para atender el servicio solicitado."
                )

        availability = self.technician_availability_repository.get_current_by_technician(
            technician.id
        )

        if availability is None:
            raise ConflictException("El técnico no tiene disponibilidad configurada.")

        if not is_technician_available_now(availability):
            raise ConflictException("El técnico no está disponible.")

        active_assignment = self.repository.get_active_by_technician(
            technician.id,
            exclude_assignment_id=exclude_assignment_id,
        )

        if active_assignment is not None:
            raise ConflictException("El técnico ya tiene una asignación activa.")

        return technician, availability

    def _set_technician_availability_status(
        self,
        *,
        technician,
        availability,
        availability_status: str,
        tenant_id: str | None,
        event_data: dict[str, str],
    ) -> None:
        previous_status = availability.availability_status

        if previous_status == availability_status:
            return

        availability.availability_status = availability_status
        self.db.flush()

        self.audit.updated(
            availability,
            TechnicianAvailabilityAuditEvent.TECHNICIAN_AVAILABILITY_UPDATED,
            resource_type="technician_availability",
            tenant_id=tenant_id,
            event_data={
                "technician_id": str(technician.id),
                "previous_status": previous_status,
                "availability_status": availability_status,
                **event_data,
            },
        )

    def _get_offer_detail_or_fail(self, offer_id: str):
        detail = self.offer_repository.get_detail_by_id(offer_id)

        if detail is None:
            raise NotFoundException("Oferta no encontrada.")

        return detail

    def _ensure_not_final(self, assignment: Assignment) -> None:
        if assignment.assignment_status in FINAL_ASSIGNMENT_STATUSES:
            raise ConflictException("No se puede modificar una asignación finalizada.")

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None

    def _ensure_valid_transition(self, current_status: str, next_status: str) -> None:
        allowed_next_statuses = ALLOWED_ASSIGNMENT_TRANSITIONS.get(current_status, set())

        if next_status not in allowed_next_statuses:
            raise ConflictException("Transición de estado no permitida.")

    def _get_current_technician_or_fail(self) -> Technician:
        if self.context.actor_type != "TECHNICIAN" or self.context.user_id is None:
            raise NotFoundException("Técnico no encontrado.")

        if self.context.tenant_id is None:
            raise NotFoundException("Técnico no encontrado.")

        technician = self.technician_repository.get_by_tenant_and_user(
            self.context.tenant_id,
            self.context.user_id,
        )

        if technician is None or technician.status != "ACTIVE":
            raise NotFoundException("Técnico no encontrado.")

        return technician

    def _get_technician_or_fail(self, technician_id: str) -> Technician:
        technician = self.technician_repository.get_by_id(technician_id)

        if technician is None or technician.deleted_at is not None:
            raise NotFoundException("Técnico no encontrado.")

        return technician
