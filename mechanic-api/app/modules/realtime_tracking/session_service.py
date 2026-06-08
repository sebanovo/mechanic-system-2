from __future__ import annotations

from app.common.exceptions import NotFoundException
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.assignment.repository import AssignmentRepository
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.user.models import User
from app.modules.realtime_tracking.schemas import (
    RealtimeTrackingActorPublic,
    RealtimeTrackingDestinationPublic,
    RealtimeTrackingMapsPublic,
    RealtimeTrackingOriginPublic,
    RealtimeTrackingSessionPublic,
    RealtimeTrackingWebSocketPublic,
)


class RealtimeTrackingSessionService(BaseService):
    def __init__(
        self,
        *,
        assignment_repository: AssignmentRepository,
        tracking_repository,
        customer_repository: CustomerRepository,
        technician_repository: TechnicianRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=assignment_repository.db, context=context)
        self.assignment_repository = assignment_repository
        self.tracking_repository = tracking_repository
        self.customer_repository = customer_repository
        self.technician_repository = technician_repository

    def build_session(self, assignment_id: str) -> RealtimeTrackingSessionPublic:
        detail = self.assignment_repository.get_detail_by_id(assignment_id)

        if detail is None:
            raise NotFoundException("Asignación no encontrada.")

        assignment, incident, _offer, _provider_profile, technician = detail
        technician_detail = self.technician_repository.get_detail_by_id(technician.id)
        customer_detail = self.customer_repository.get_detail_by_customer_id(
            incident.customer_id
        )

        if technician_detail is None:
            raise NotFoundException("Técnico no encontrado.")

        if customer_detail is None:
            raise NotFoundException("Cliente no encontrado.")

        technician_user = technician_detail[1]
        customer_user = customer_detail[1]
        latest_location = self.tracking_repository.get_latest_location_by_assignment(
            assignment_id
        )

        return RealtimeTrackingSessionPublic(
            assignment_id=str(assignment.id),
            incident_id=str(incident.id),
            assignment_status=assignment.assignment_status,
            incident_status=incident.status,
            technician=self._build_actor_public(technician_user),
            customer=self._build_actor_public(customer_user),
            origin=RealtimeTrackingOriginPublic(
                type="TECHNICIAN_CURRENT_LOCATION",
                latitude=(
                    latest_location.latitude if latest_location is not None else None
                ),
                longitude=(
                    latest_location.longitude if latest_location is not None else None
                ),
                address_text=None,
                occurred_at=(
                    latest_location.occurred_at
                    if latest_location is not None
                    else None
                ),
            ),
            destination=RealtimeTrackingDestinationPublic(
                type="INCIDENT_LOCATION",
                latitude=incident.latitude,
                longitude=incident.longitude,
                address_text=incident.address_text,
                occurred_at=None,
            ),
            websocket=RealtimeTrackingWebSocketPublic(
                url=f"/ws/assignments/{assignment_id}/tracking",
                events=[
                    "TECHNICIAN_LOCATION_UPDATED",
                    "ASSIGNMENT_STATUS_CHANGED",
                    "TECHNICIAN_CONNECTED",
                    "TECHNICIAN_DISCONNECTED",
                ],
            ),
            maps=RealtimeTrackingMapsPublic(
                provider="GOOGLE_MAPS",
                travel_mode="DRIVING",
                frontend_calculates_eta=True,
            ),
        )

    def _build_actor_public(
        self,
        user: User,
    ) -> RealtimeTrackingActorPublic:
        return RealtimeTrackingActorPublic(
            id=str(user.id),
            name=f"{user.first_name} {user.last_name}".strip(),
            phone=user.phone,
        )
