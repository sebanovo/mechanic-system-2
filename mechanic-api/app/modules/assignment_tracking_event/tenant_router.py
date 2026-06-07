from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.exceptions import ForbiddenException, NotFoundException
from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment_tracking_event.mappers import (
    assignment_tracking_event_detail_public,
)
from app.modules.assignment_tracking_event.repository import (
    AssignmentTrackingEventRepository,
)
from app.modules.assignment_tracking_event.schemas import (
    AssignmentTrackingEventCreateRequest,
    AssignmentTrackingEventListData,
    AssignmentTrackingEventResponse,
    AssignmentTrackingEventsResponse,
)
from app.modules.assignment_tracking_event.service import (
    AssignmentTrackingEventService,
)
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService

router = APIRouter(
    prefix="/tenants/current/assignments/{assignment_id}/tracking-events",
    tags=["Tenant Assignment Tracking Events"],
)


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _tracking_event_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> AssignmentTrackingEventService:
    return AssignmentTrackingEventService(
        repository=AssignmentTrackingEventRepository(db),
        context=context,
    )


def _assert_assignment_belongs_to_provider(
    *,
    assignment_id: str,
    provider_profile_id: str,
    db: Session,
    identity: CurrentIdentity | None = None,
) -> None:
    detail = AssignmentRepository(db).get_detail_by_id(assignment_id)
    assignment = detail[0] if detail is not None else None

    if assignment is None or str(assignment.provider_profile_id) != provider_profile_id:
        raise NotFoundException("Asignación no encontrada.")

    if identity is not None and identity.user.user_type == "TECHNICIAN":
        technician = detail[4] if detail is not None else None
        if technician is None or str(technician.user_id) != str(identity.user.id):
            raise ForbiddenException("El técnico no está asignado a esta orden.")


@router.get(
    "",
    response_model=AssignmentTrackingEventsResponse,
    summary="Listar tracking-events de una asignación",
    description=(
        "Devuelve la bitácora de seguimiento de una asignación. "
        "El técnico y el owner pueden consultar el historial operativo."
    ),
)
def list_current_tenant_assignment_tracking_events(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentTrackingEventService = Depends(_tracking_event_service),
    db: Session = Depends(get_db),
    pagination: PaginationParams = Depends(),
    event_type: str | None = Query(default=None),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    _assert_assignment_belongs_to_provider(
        assignment_id=assignment_id,
        provider_profile_id=str(provider_profile.id),
        db=db,
        identity=identity,
    )

    items, total = service.list_by_assignment(
        assignment_id,
        event_type=event_type,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = AssignmentTrackingEventListData(
        items=[
            assignment_tracking_event_detail_public(tracking_event, assignment)
            for tracking_event, assignment in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Eventos de seguimiento obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post(
    "",
    response_model=AssignmentTrackingEventResponse,
    summary="Registrar avance operativo del técnico",
    description=(
        "Registra un evento operativo de la asignación. Todos los eventos requieren "
        "latitude y longitude. La nota es opcional; si no se envía, el backend "
        "genera una nota automática. occurred_at lo genera el backend. EN_ROUTE, "
        "ARRIVED, SERVICE_STARTED, SERVICE_COMPLETED y CANCELLED actualizan "
        "automáticamente assignment_status e incident.status. LOCATION_UPDATED "
        "solo registra ubicación."
    ),
)
def create_current_tenant_assignment_tracking_event(
    assignment_id: str,
    payload: AssignmentTrackingEventCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentTrackingEventService = Depends(_tracking_event_service),
    db: Session = Depends(get_db),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    _assert_assignment_belongs_to_provider(
        assignment_id=assignment_id,
        provider_profile_id=str(provider_profile.id),
        db=db,
        identity=identity,
    )

    tracking_event = service.create_for_assignment(
        assignment_id=assignment_id,
        payload=payload,
        actor_user_type=identity.user.user_type,
        actor_user_id=str(identity.user.id),
    )

    detail = service.get_detail_or_fail(str(tracking_event.id))

    return success_response(
        message="Evento de seguimiento creado correctamente.",
        data=assignment_tracking_event_detail_public(*detail).model_dump(mode="json"),
    )
