from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.exceptions import NotFoundException
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
    AssignmentTrackingEventListData,
    AssignmentTrackingEventsResponse,
    AssignmentTrackingEventType,
)
from app.modules.assignment_tracking_event.service import (
    AssignmentTrackingEventService,
)
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.repository import CustomerRepository

router = APIRouter(
    prefix="/clients/me/assignments/{assignment_id}/tracking-events",
    tags=["Client Assignment Tracking Events"],
)


def _tracking_event_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> AssignmentTrackingEventService:
    return AssignmentTrackingEventService(
        repository=AssignmentTrackingEventRepository(db),
        context=context,
    )


def _assert_assignment_belongs_to_current_customer(
    *,
    assignment_id: str,
    identity: CurrentIdentity,
    db: Session,
) -> None:
    customer = CustomerRepository(db).get_by_user_id(str(identity.user.id))

    if customer is None or customer.deleted_at is not None:
        raise NotFoundException("Cliente no encontrado.")

    detail = AssignmentRepository(db).get_detail_by_id(assignment_id)

    if detail is None:
        raise NotFoundException("Asignación no encontrada.")

    _, incident, _, _, _ = detail

    if str(incident.customer_id) != str(customer.id):
        raise NotFoundException("Asignación no encontrada.")


@router.get("", response_model=AssignmentTrackingEventsResponse)
def list_my_assignment_tracking_events(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: AssignmentTrackingEventService = Depends(_tracking_event_service),
    db: Session = Depends(get_db),
    pagination: PaginationParams = Depends(),
    event_type: AssignmentTrackingEventType | None = Query(default=None),
) -> dict:
    _assert_assignment_belongs_to_current_customer(
        assignment_id=assignment_id,
        identity=identity,
        db=db,
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
