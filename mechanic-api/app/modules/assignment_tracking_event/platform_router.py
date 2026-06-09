from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
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
    AssignmentTrackingEventType,
)
from app.modules.assignment_tracking_event.service import (
    AssignmentTrackingEventService,
)
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types

router = APIRouter(
    prefix="/platform/assignment-tracking-events",
    tags=["Platform Assignment Tracking Events"],
)


def _tracking_event_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> AssignmentTrackingEventService:
    return AssignmentTrackingEventService(
        repository=AssignmentTrackingEventRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=AssignmentTrackingEventsResponse,
    summary="Listar tracking-events",
    description="Lista los eventos de seguimiento registrados para asignaciones.",
)
def list_platform_assignment_tracking_events(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentTrackingEventService = Depends(_tracking_event_service),
    pagination: PaginationParams = Depends(),
    assignment_id: str | None = Query(default=None),
    event_type: AssignmentTrackingEventType | None = Query(default=None),
    occurred_from: datetime | None = Query(default=None),
    occurred_to: datetime | None = Query(default=None),
) -> dict:
    items, total = service.list(
        assignment_id=assignment_id,
        event_type=event_type,
        occurred_from=occurred_from,
        occurred_to=occurred_to,
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
    "/assignments/{assignment_id}",
    response_model=AssignmentTrackingEventResponse,
    summary="Registrar tracking-event de asignación",
    description=(
        "Registra un avance operativo en la asignación. "
        "Usado por plataforma para auditoría o carga manual."
    ),
)
def create_platform_assignment_tracking_event(
    assignment_id: str,
    payload: AssignmentTrackingEventCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentTrackingEventService = Depends(_tracking_event_service),
) -> dict:
    tracking_event = service.create_for_assignment(
        assignment_id=assignment_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(tracking_event.id))

    return success_response(
        message="Evento de seguimiento creado correctamente.",
        data=assignment_tracking_event_detail_public(*detail).model_dump(mode="json"),
    )


@router.get(
    "/{tracking_event_id}",
    response_model=AssignmentTrackingEventResponse,
    summary="Obtener tracking-event",
    description="Devuelve el detalle de un evento de seguimiento de asignación.",
)
def get_platform_assignment_tracking_event(
    tracking_event_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentTrackingEventService = Depends(_tracking_event_service),
) -> dict:
    detail = service.get_detail_or_fail(tracking_event_id)

    return success_response(
        message="Evento de seguimiento obtenido correctamente.",
        data=assignment_tracking_event_detail_public(*detail).model_dump(mode="json"),
    )
