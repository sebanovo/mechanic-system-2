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
    AssignmentStatusChangeRequest,
    AssignmentUpdateRequest,
)
from app.modules.assignment.service import AssignmentService
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService

router = APIRouter(prefix="/tenants/current/assignments", tags=["Tenant Assignments"])


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


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
    summary="Listar asignaciones del taller o técnico",
    description=(
        "Devuelve las asignaciones visibles para el owner o el técnico. "
        "Si no se envía estado, para el técnico muestra solo las asignaciones abiertas."
    ),
)
def list_current_tenant_assignments(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentService = Depends(_assignment_service),
    pagination: PaginationParams = Depends(),
    assignment_status: str | None = Query(default=None),
) -> dict:
    if identity.user.user_type == "TECHNICIAN":
        items, total = service.list_by_current_technician(
            assignment_status=assignment_status,
            limit=pagination.limit,
            offset=pagination.offset,
        )
    else:
        provider_profile = provider_profile_service.get_current_or_fail()

        items, total = service.list_by_provider(
            str(provider_profile.id),
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
                provider_profile_item,
                technician,
            )
            for assignment, incident, offer, provider_profile_item, technician in items
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
    summary="Crear asignación del taller",
    description=(
        "Crea una asignación para una oferta aceptada. "
        "El owner selecciona el técnico y el sistema marca la asignación como ASSIGNED."
    ),
)
def create_current_tenant_assignment(
    payload: AssignmentCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    assignment = service.create_owned(
        provider_profile_id=str(provider_profile.id),
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(assignment.id))

    return success_response(
        message="Asignación creada correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )


@router.get(
    "/{assignment_id}",
    response_model=AssignmentResponse,
    summary="Obtener detalle de asignación",
    description=(
        "Devuelve el detalle de la asignación. "
        "El técnico solo puede ver sus propias asignaciones."
    ),
)
def get_current_tenant_assignment(
    assignment_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    if identity.user.user_type == "TECHNICIAN":
        detail = service.get_current_technician_detail_or_fail(assignment_id)
    else:
        provider_profile = provider_profile_service.get_current_or_fail()
        detail = service.get_detail_or_fail(assignment_id)
        assignment, *_ = detail

        if str(assignment.provider_profile_id) != str(provider_profile.id):
            from app.common.exceptions import NotFoundException

            raise NotFoundException("Asignación no encontrada.")

    return success_response(
        message="Asignación obtenida correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )


@router.put(
    "/{assignment_id}",
    response_model=AssignmentResponse,
    summary="Actualizar asignación del taller",
    description="Permite al owner ajustar el técnico o las notas de una asignación activa.",
)
def update_current_tenant_assignment(
    assignment_id: str,
    payload: AssignmentUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    assignment = service.update_owned(
        provider_profile_id=str(provider_profile.id),
        assignment_id=assignment_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(assignment.id))

    return success_response(
        message="Asignación actualizada correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch(
    "/{assignment_id}/status",
    response_model=AssignmentResponse,
    summary="Actualizar estado operativo de asignación",
    description=(
        "Permite al owner del taller modificar al tecnico asignado, avanzar el flujo de la "
        "asignación. El owner usa este endpoint para registrar EN_ROUTE, ARRIVED, "
        "IN_SERVICE, COMPLETED o CANCELLED."
    ),
)
def change_current_tenant_assignment_status(
    assignment_id: str,
    payload: AssignmentStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: AssignmentService = Depends(_assignment_service),
) -> dict:
    if identity.user.user_type == "TECHNICIAN":
        assignment = service.change_current_technician_status(
            assignment_id,
            payload,
        )
    else:
        provider_profile = provider_profile_service.get_current_or_fail()

        assignment = service.change_owned_status(
            provider_profile_id=str(provider_profile.id),
            assignment_id=assignment_id,
            payload=payload,
        )

    detail = service.get_detail_or_fail(str(assignment.id))

    return success_response(
        message="Estado de asignación actualizado correctamente.",
        data=assignment_detail_public(*detail).model_dump(mode="json"),
    )
