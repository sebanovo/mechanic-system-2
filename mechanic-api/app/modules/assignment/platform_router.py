from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.assignment.mappers import assignment_detail_public
from app.modules.assignment.repository import AssignmentRepository
from app.modules.assignment.schemas import (
    AssignmentCreateRequest,
    AssignmentListData,
    AssignmentResponse,
    AssignmentsResponse,
    AssignmentStatus,
    AssignmentStatusChangeRequest,
    AssignmentUpdateRequest,
)
from app.modules.assignment.service import AssignmentService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types

router = APIRouter(prefix="/platform/assignments", tags=["Platform Assignments"])


def _assignment_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> AssignmentService:
    return AssignmentService(
        repository=AssignmentRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=AssignmentsResponse,
    summary="Listar asignaciones",
    description="Lista todas las asignaciones registradas en la plataforma.",
)
def list_platform_assignments(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentService = Depends(_assignment_service),
    pagination: PaginationParams = Depends(),
    incident_id: str | None = Query(default=None),
    offer_id: str | None = Query(default=None),
    provider_profile_id: str | None = Query(default=None),
    technician_id: str | None = Query(default=None),
    assignment_status: AssignmentStatus | None = Query(default=None),
) -> dict:
    items, total = service.list(
        incident_id=incident_id,
        offer_id=offer_id,
        provider_profile_id=provider_profile_id,
        technician_id=technician_id,
        assignment_status=assignment_status,
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


@router.post(
    "",
    response_model=AssignmentResponse,
    summary="Crear asignación",
    description="Crea una asignación global desde plataforma.",
)
def create_platform_assignment(
    payload: AssignmentCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    assignment = service.create_for_offer(payload)
    detail = service.get_detail_or_fail(str(assignment.id))

    return success_response(
        message="Asignación creada correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )


@router.get(
    "/{assignment_id}",
    response_model=AssignmentResponse,
    summary="Obtener asignación",
    description="Devuelve el detalle completo de una asignación.",
)
def get_platform_assignment(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    detail = service.get_detail_or_fail(assignment_id)

    return success_response(
        message="Asignación obtenida correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )


@router.put(
    "/{assignment_id}",
    response_model=AssignmentResponse,
    summary="Actualizar asignación",
    description="Actualiza una asignación desde plataforma.",
)
def update_platform_assignment(
    assignment_id: str,
    payload: AssignmentUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    assignment = service.update(assignment_id, payload)
    detail = service.get_detail_or_fail(str(assignment.id))

    return success_response(
        message="Asignación actualizada correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch(
    "/{assignment_id}/status",
    response_model=AssignmentResponse,
    summary="Cambiar estado de asignación",
    description="Actualiza el estado operativo de una asignación desde plataforma.",
)
def change_platform_assignment_status(
    assignment_id: str,
    payload: AssignmentStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    assignment = service.change_status(assignment_id, payload)
    detail = service.get_detail_or_fail(str(assignment.id))

    return success_response(
        message="Estado de asignación actualizado correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )
