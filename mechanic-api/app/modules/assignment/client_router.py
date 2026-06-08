from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.exceptions import NotFoundException
from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.assignment.mappers import assignment_detail_public
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment.schemas import AssignmentListData, AssignmentResponse, AssignmentsResponse
from app.modules.assignment.service import AssignmentService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.customer.repository import CustomerRepository

router = APIRouter(prefix="/clients/me/assignments", tags=["Client Assignments"])


def _assignment_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> AssignmentService:
    return AssignmentService(
        repository=AssignmentRepository(db),
        context=context,
    )


@router.get("", response_model=AssignmentsResponse)
def list_my_assignments(
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    db: Session = Depends(get_db),
    pagination: PaginationParams = Depends(),
    assignment_status: str | None = Query(default=None),
) -> dict:
    customer = CustomerRepository(db).get_by_user_id(str(identity.user.id))

    if customer is None or customer.deleted_at is not None:
        raise NotFoundException("Cliente no encontrado.")

    repository = AssignmentRepository(db)

    if assignment_status is None:
        items, total = repository.list_by_customer(
            customer.id,
            exclude_assignment_statuses=["COMPLETED", "CANCELLED"],
            limit=pagination.limit,
            offset=pagination.offset,
        )
    else:
        items, total = repository.list_by_customer(
            customer.id,
            assignment_status=assignment_status.upper(),
            limit=pagination.limit,
            offset=pagination.offset,
        )

    data = AssignmentListData(
        items=[
            assignment_detail_public(
                assignment,
                incident,
                offer,
                provider_profile,
                technician,
            )
            for assignment, incident, offer, provider_profile, technician in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Asignaciones obtenidas correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{assignment_id}", response_model=AssignmentResponse)
def get_my_assignment(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("CLIENT")),
    service: AssignmentService = Depends(_assignment_service),
    db: Session = Depends(get_db),
) -> dict:
    customer = CustomerRepository(db).get_by_user_id(str(identity.user.id))

    if customer is None or customer.deleted_at is not None:
        raise NotFoundException("Cliente no encontrado.")

    detail = service.get_detail_or_fail(assignment_id)
    assignment, incident, *_ = detail

    if str(incident.customer_id) != str(customer.id):
        raise NotFoundException("Asignación no encontrada.")

    return success_response(
        message="Asignación obtenida correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )
