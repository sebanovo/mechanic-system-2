from __future__ import annotations

import asyncio
from datetime import datetime, timezone

from app.common.exceptions import (
    ConflictException,
    ForbiddenException,
    NotFoundException,
)
from app.core.audit.constants import (
    AssignmentAuditEvent,
    AssignmentTrackingEventAuditEvent,
    IncidentAuditEvent,
    TechnicianAvailabilityAuditEvent,
)
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.assignment_tracking_event.repository import (
    AssignmentTrackingEventRepository,
)
from app.modules.assignment_tracking_event.schemas import (
    AssignmentTrackingEventCreateRequest,
)
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.technician_availability.repository import (
    TechnicianAvailabilityRepository,
)
from app.modules.notification.business_notifications import BusinessNotificationService
from app.modules.realtime_tracking.connection_manager import (
    realtime_tracking_manager,
)
from app.modules.realtime_tracking.events import assignment_status_changed_event


class AssignmentTrackingEventService(BaseService):
    ALLOWED_ASSIGNMENT_TRANSITIONS: dict[str, set[str]] = {
        "ASSIGNED": {"EN_ROUTE", "CANCELLED"},
        "EN_ROUTE": {"ARRIVED", "CANCELLED"},
        "ARRIVED": {"IN_SERVICE", "CANCELLED"},
        "IN_SERVICE": {"COMPLETED", "CANCELLED"},
        "COMPLETED": set(),
        "CANCELLED": set(),
    }

    ALLOWED_INCIDENT_TRANSITIONS: dict[str, set[str]] = {
        "TECHNICIAN_ASSIGNED": {"EN_ROUTE", "CANCELLED"},
        "EN_ROUTE": {"ARRIVED", "CANCELLED"},
        "ARRIVED": {"IN_SERVICE", "CANCELLED"},
        "IN_SERVICE": {"COMPLETED", "CANCELLED"},
        "COMPLETED": set(),
        "CANCELLED": set(),
    }

    def __init__(
        self,
        repository: AssignmentTrackingEventRepository,
        context: RequestContext,
        ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.assignment_repository = AssignmentRepository(self.db)
        self.customer_repository = CustomerRepository(self.db)
        self.technician_availability_repository = TechnicianAvailabilityRepository(
            self.db
        )
        self.business_notifications = BusinessNotificationService(self.db, context)

    def list(
        self,
        *,
        assignment_id: str | None = None,
        event_type: str | None = None,
        occurred_from=None,
        occurred_to=None,
        limit: int = 100,
        offset: int = 0,
    ):
        return self.repository.list(
            assignment_id=assignment_id,
            event_type=self._normalize_upper(event_type),
            occurred_from=occurred_from,
            occurred_to=occurred_to,
            limit=limit,
            offset=offset,
        )

    def list_by_assignment(
        self,
        assignment_id: str,
        *,
        event_type: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ):
        self._get_assignment_detail_or_fail(assignment_id)

        return self.repository.list_by_assignment(
            assignment_id,
            event_type=self._normalize_upper(event_type),
            limit=limit,
            offset=offset,
        )

    def get_detail_or_fail(self, tracking_event_id: str):
        detail = self.repository.get_detail_by_id(tracking_event_id)

        if detail is None:
            raise NotFoundException("Evento de seguimiento no encontrado.")

        return detail

    def create_for_assignment(
        self,
        *,
        assignment_id: str,
        payload: AssignmentTrackingEventCreateRequest,
        actor_user_type: str | None = None,
        actor_user_id: str | None = None,
    ) -> AssignmentTrackingEvent:
        assignment, incident, _, provider_profile, technician = (
            self._get_assignment_detail_or_fail(assignment_id)
        )

        self._ensure_actor_can_track_assignment(
            assignment=assignment,
            technician=technician,
            actor_user_type=actor_user_type,
            actor_user_id=actor_user_id,
        )
        self._ensure_event_allowed(assignment.assignment_status, payload.event_type)

        tracking_event = AssignmentTrackingEvent(
            assignment_id=assignment.id,
            event_type=payload.event_type,
            latitude=payload.latitude,
            longitude=payload.longitude,
            notes=self._build_tracking_note(
                event_type=payload.event_type,
                notes=payload.notes,
            ),
            occurred_at=datetime.now(timezone.utc),
        )

        tracking_event = self.repository.add(tracking_event)
        self._apply_event_effects(
            assignment=assignment,
            incident=incident,
            technician=technician,
            event_type=payload.event_type,
            tenant_id=str(provider_profile.tenant_id),
        )
        self._broadcast_status_change(
            assignment=assignment,
            incident=incident,
            event_type=payload.event_type,
        )
        self._notify_tracking_update(
            assignment=assignment,
            incident=incident,
            technician=technician,
            event_type=payload.event_type,
            tenant_id=str(provider_profile.tenant_id),
        )

        self.audit.created(
            tracking_event,
            AssignmentTrackingEventAuditEvent.ASSIGNMENT_TRACKING_EVENT_CREATED,
            resource_type="assignment_tracking_event",
            tenant_id=str(provider_profile.tenant_id),
            event_data={
                "assignment_id": str(assignment.id),
                "event_type": tracking_event.event_type,
                "latitude": (
                    str(tracking_event.latitude)
                    if tracking_event.latitude is not None
                    else None
                ),
                "longitude": (
                    str(tracking_event.longitude)
                    if tracking_event.longitude is not None
                    else None
                ),
            },
        )

        self.db.commit()
        self.db.refresh(tracking_event)

        return tracking_event

    def _get_assignment_detail_or_fail(
        self,
        assignment_id: str,
    ):
        detail = self.assignment_repository.get_detail_by_id(assignment_id)

        if detail is None:
            raise NotFoundException("Asignación no encontrada.")

        return detail

    def _ensure_actor_can_track_assignment(
        self,
        *,
        assignment,
        technician,
        actor_user_type: str | None,
        actor_user_id: str | None,
    ) -> None:
        if actor_user_type == "TECHNICIAN" and actor_user_id is not None:
            if str(technician.user_id) != actor_user_id:
                raise ForbiddenException("El técnico no está asignado a esta orden.")

        if assignment.assignment_status in {"COMPLETED", "CANCELLED"}:
            raise ConflictException("No se puede agregar tracking a una asignación finalizada.")

    def _ensure_event_allowed(self, assignment_status: str, event_type: str) -> None:
        if assignment_status in {"COMPLETED", "CANCELLED"}:
            raise ConflictException("No se puede agregar tracking a una asignación finalizada.")

        allowed_statuses = {
            "ASSIGNED": {"ASSIGNED", "NOTE", "LOCATION_UPDATED", "EN_ROUTE", "CANCELLED"},
            "EN_ROUTE": {"NOTE", "LOCATION_UPDATED", "ARRIVED", "CANCELLED"},
            "ARRIVED": {"NOTE", "LOCATION_UPDATED", "SERVICE_STARTED", "CANCELLED"},
            "IN_SERVICE": {"NOTE", "LOCATION_UPDATED", "SERVICE_COMPLETED", "CANCELLED"},
        }

        if event_type not in allowed_statuses.get(assignment_status, set()):
            raise ConflictException(
                "El evento no es válido para el estado actual de la asignación."
            )

        if event_type == "ASSIGNED" and assignment_status != "ASSIGNED":
            raise ConflictException(
                "El evento no es válido para el estado actual de la asignación."
            )

    def _apply_event_effects(
        self,
        *,
        assignment,
        incident,
        technician,
        event_type: str,
        tenant_id: str | None,
    ) -> None:
        now = datetime.now(timezone.utc)
        assignment_previous_status = assignment.assignment_status
        incident_previous_status = incident.status
        assignment_event_type = AssignmentAuditEvent.ASSIGNMENT_STATUS_CHANGED
        incident_event_type = IncidentAuditEvent.INCIDENT_STATUS_CHANGED
        assignment_target_status: str | None = None
        incident_target_status: str | None = None
        should_update_assignment = False
        should_update_incident = False
        release_technician = False

        if event_type in {"ASSIGNED", "NOTE", "LOCATION_UPDATED"}:
            return

        if event_type == "EN_ROUTE":
            assignment_target_status = "EN_ROUTE"
            assignment.started_at = now
            incident_target_status = "EN_ROUTE"
            should_update_assignment = True
            should_update_incident = True

        elif event_type == "ARRIVED":
            assignment_target_status = "ARRIVED"
            assignment.arrived_at = now
            incident_target_status = "ARRIVED"
            should_update_assignment = True
            should_update_incident = True

        elif event_type == "SERVICE_STARTED":
            assignment_target_status = "IN_SERVICE"
            incident_target_status = "IN_SERVICE"
            should_update_assignment = True
            should_update_incident = True

        elif event_type == "SERVICE_COMPLETED":
            assignment_target_status = "COMPLETED"
            assignment.completed_at = now
            incident_target_status = "COMPLETED"
            incident.completed_at = now
            should_update_assignment = True
            should_update_incident = True
            assignment_event_type = AssignmentAuditEvent.ASSIGNMENT_COMPLETED
            incident_event_type = IncidentAuditEvent.INCIDENT_COMPLETED
            release_technician = True

        elif event_type == "CANCELLED":
            assignment_target_status = "CANCELLED"
            assignment.cancelled_at = now
            incident_target_status = "CANCELLED"
            incident.cancelled_at = now
            should_update_assignment = True
            should_update_incident = True
            assignment_event_type = AssignmentAuditEvent.ASSIGNMENT_CANCELLED
            incident_event_type = IncidentAuditEvent.INCIDENT_CANCELLED
            release_technician = True

        if assignment_target_status is not None:
            self._ensure_valid_transition(
                assignment_previous_status,
                assignment_target_status,
                self.ALLOWED_ASSIGNMENT_TRANSITIONS,
            )
            assignment.assignment_status = assignment_target_status

        if incident_target_status is not None:
            self._ensure_valid_transition(
                incident_previous_status,
                incident_target_status,
                self.ALLOWED_INCIDENT_TRANSITIONS,
            )
            incident.status = incident_target_status

        if should_update_assignment:
            self.audit.updated(
                assignment,
                assignment_event_type,
                resource_type="assignment",
                tenant_id=tenant_id,
                event_data={
                    "assignment_id": str(assignment.id),
                    "previous_status": assignment_previous_status,
                    "assignment_status": assignment.assignment_status,
                    "tracking_event_type": event_type,
                },
            )

        if should_update_incident:
            self.audit.updated(
                incident,
                incident_event_type,
                resource_type="incident",
                tenant_id=tenant_id,
                event_data={
                    "incident_code": incident.incident_code,
                    "previous_status": incident_previous_status,
                    "status": incident.status,
                    "tracking_event_type": event_type,
                },
            )

        if release_technician:
            availability = self.technician_availability_repository.get_current_by_technician(
                technician.id
            )
            if availability is None:
                raise ConflictException(
                    "El técnico no tiene disponibilidad configurada."
                )

            previous_status = availability.availability_status
            availability.availability_status = "AVAILABLE"
            self.db.flush()

            self.audit.updated(
                availability,
                TechnicianAvailabilityAuditEvent.TECHNICIAN_AVAILABILITY_UPDATED,
                resource_type="technician_availability",
                tenant_id=tenant_id,
                event_data={
                    "technician_id": str(technician.id),
                    "previous_status": previous_status,
                    "availability_status": availability.availability_status,
                    "tracking_event_type": event_type,
                },
            )

    def _broadcast_status_change(
        self,
        *,
        assignment,
        incident,
        event_type: str,
    ) -> None:
        if event_type in {"NOTE", "LOCATION_UPDATED", "ASSIGNED"}:
            return

        message = assignment_status_changed_event(
            assignment_id=str(assignment.id),
            incident_id=str(incident.id),
            assignment_status=assignment.assignment_status,
            incident_status=incident.status,
            event_type=event_type,
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

    def _notify_tracking_update(
        self,
        *,
        assignment,
        incident,
        technician,
        event_type: str,
        tenant_id: str,
    ) -> None:
        if event_type in {"ASSIGNED", "NOTE", "LOCATION_UPDATED"}:
            return

        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )

        if customer_detail is None:
            return

        customer_user = customer_detail[1]

        try:
            if event_type == "EN_ROUTE":
                self.business_notifications.send_technician_en_route(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )
            elif event_type == "ARRIVED":
                self.business_notifications.send_technician_arrived(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )
            elif event_type == "SERVICE_STARTED":
                self.business_notifications.send_service_started(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )
            elif event_type == "SERVICE_COMPLETED":
                self.business_notifications.send_service_completed(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )
            elif event_type == "CANCELLED":
                self.business_notifications.send_service_cancelled(
                    recipient_user_id=str(customer_user.id),
                    tenant_id=tenant_id,
                    assignment_id=str(assignment.id),
                    incident_id=str(incident.id),
                )
        except Exception:
            return

    def _ensure_valid_transition(
        self,
        current_status: str,
        next_status: str,
        allowed_transitions: dict[str, set[str]],
    ) -> None:
        allowed_next_statuses = allowed_transitions.get(current_status, set())

        if next_status not in allowed_next_statuses:
            raise ConflictException("El evento no es válido para el estado actual.")

    def _normalize_text(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip()
        return normalized or None

    def _build_tracking_note(
        self,
        *,
        event_type: str,
        notes: str | None,
    ) -> str:
        custom_note = self._normalize_text(notes)

        if custom_note is not None:
            return custom_note

        default_notes = {
            "EN_ROUTE": "El técnico inició ruta hacia el punto del incidente.",
            "LOCATION_UPDATED": "Ubicación actualizada automáticamente por la app.",
            "ARRIVED": "El técnico llegó al punto del incidente.",
            "SERVICE_STARTED": "El técnico inició la atención del servicio.",
            "SERVICE_COMPLETED": "El servicio fue finalizado correctamente.",
            "CANCELLED": "El servicio fue cancelado por el técnico.",
            "NOTE": "El técnico registró una observación.",
        }

        return default_notes.get(event_type, "Evento registrado por el técnico.")

    def _normalize_upper(self, value: str | None) -> str | None:
        normalized = self._normalize_text(value)
        return normalized.upper() if normalized else None
