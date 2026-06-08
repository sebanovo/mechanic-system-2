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
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.realtime_tracking.schemas import TrackingSessionResponse
from app.modules.realtime_tracking.session_service import (
    RealtimeTrackingSessionService,
)

router = APIRouter(
    prefix="/tenants/current/assignments/{assignment_id}/tracking-session",
    tags=["Tenant Realtime Tracking"],
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


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=TrackingSessionResponse,
    summary="Obtener sesión de tracking del taller",
    description=(
        "Devuelve destino, última ubicación del técnico y contrato WebSocket "
        "para que el owner vea el mapa en tiempo real."
    ),
)
def get_current_tenant_tracking_session(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: RealtimeTrackingSessionService = Depends(_tracking_session_service),
    db: Session = Depends(get_db),
) -> dict:
    detail = AssignmentRepository(db).get_detail_by_id(assignment_id)

    if detail is None:
        raise NotFoundException("Asignación no encontrada.")

    assignment, incident, *_ = detail

    if identity.user.user_type == "TECHNICIAN":
        if identity.tenant_id is None:
            raise NotFoundException("Asignación no encontrada.")
        
        technician = TechnicianRepository(db).get_by_tenant_and_user(
            identity.tenant_id,
            identity.user.id,
        )

        if technician is None or str(assignment.technician_id) != str(technician.id):
            raise NotFoundException("Asignación no encontrada.")
    else:
        provider = provider_profile_service.get_current_or_fail()

        if str(assignment.provider_profile_id) != str(provider.id):
            raise NotFoundException("Asignación no encontrada.")

    tracking_session = service.build_session(assignment_id)

    return success_response(
        message="Sesión de tracking obtenida correctamente.",
        data=tracking_session.model_dump(mode="json"),
    )
