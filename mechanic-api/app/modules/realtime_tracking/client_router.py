from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.exceptions import NotFoundException
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment_tracking_event.repository import (
    AssignmentTrackingEventRepository,
)
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.repository import CustomerRepository
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.realtime_tracking.schemas import TrackingSessionResponse
from app.modules.realtime_tracking.session_service import (
    RealtimeTrackingSessionService,
)

router = APIRouter(
    prefix="/clients/me/assignments/{assignment_id}/tracking-session",
    tags=["Client Realtime Tracking"],
)


def _tracking_session_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> RealtimeTrackingSessionService:
    return RealtimeTrackingSessionService(
        assignment_repository=AssignmentRepository(db),
        tracking_repository=AssignmentTrackingEventRepository(db),
        customer_repository=CustomerRepository(db),
        technician_repository=TechnicianRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=TrackingSessionResponse,
    summary="Obtener sesión de tracking del cliente",
    description=(
        "Devuelve destino, última ubicación del técnico y contrato WebSocket "
        "para que el cliente vea el mapa en tiempo real."
    ),
)
def get_client_tracking_session(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: RealtimeTrackingSessionService = Depends(_tracking_session_service),
    db: Session = Depends(get_db),
) -> dict:
    customer = CustomerRepository(db).get_by_user_id(str(identity.user.id))

    if customer is None or customer.deleted_at is not None:
        raise NotFoundException("Cliente no encontrado.")

    detail = AssignmentRepository(db).get_detail_by_id(assignment_id)

    if detail is None:
        raise NotFoundException("Asignación no encontrada.")

    _assignment, incident, *_ = detail

    if str(incident.customer_id) != str(customer.id):
        raise NotFoundException("Asignación no encontrada.")

    tracking_session = service.build_session(assignment_id)

    return success_response(
        message="Sesión de tracking obtenida correctamente.",
        data=tracking_session.model_dump(mode="json"),
    )
