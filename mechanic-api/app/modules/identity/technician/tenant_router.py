from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.exceptions import ForbiddenException
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService
from app.modules.identity.technician.mappers import technician_detail_public
from app.modules.identity.technician.repository import TechnicianRepository
from app.modules.identity.technician.schemas import (
    TechnicianCreateRequest,
    TechnicianListData,
    TechnicianResponse,
    TechniciansResponse,
    TechnicianStatusChangeRequest,
)
from app.modules.identity.technician.service import TechnicianService

router = APIRouter(prefix="/tenants/current/technicians", tags=["Tenant Technicians"])


def _provider_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _technician_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TechnicianService:
    return TechnicianService(
        repository=TechnicianRepository(db),
        context=context,
    )


@router.get("", response_model=TechniciansResponse)
def list_current_tenant_technicians(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    technician_service: TechnicianService = Depends(_technician_service),
    pagination: PaginationParams = Depends(),
    status: str | None = Query(default=None),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()

    items, total = technician_service.list_by_provider(
        str(provider_profile.id),
        status=status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = TechnicianListData(
        items=[technician_detail_public(technician, user) for technician, user in items],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Técnicos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post("", response_model=TechnicianResponse)
def create_current_tenant_technician(
    payload: TechnicianCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    technician_service: TechnicianService = Depends(_technician_service),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()

    technician = technician_service.create_for_provider(provider_profile, payload)
    detail = technician_service.get_detail_or_fail(str(technician.id))

    return success_response(
        message="Técnico creado correctamente.",
        data=technician_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{technician_id}/status", response_model=TechnicianResponse)
def change_current_tenant_technician_status(
    technician_id: str,
    payload: TechnicianStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    technician_service: TechnicianService = Depends(_technician_service),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()
    detail = technician_service.get_detail_or_fail(technician_id)

    if str(detail[0].provider_profile_id) != str(provider_profile.id):
        raise ForbiddenException("El técnico no pertenece al tenant actual.")

    technician = technician_service.change_status(technician_id, payload)
    detail = technician_service.get_detail_or_fail(str(technician.id))

    return success_response(
        message="Estado de técnico actualizado correctamente.",
        data=technician_detail_public(*detail).model_dump(mode="json"),
    )


@router.delete("/{technician_id}", response_model=TechnicianResponse)
def delete_current_tenant_technician(
    technician_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    technician_service: TechnicianService = Depends(_technician_service),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()
    detail = technician_service.get_detail_or_fail(technician_id)

    if str(detail[0].provider_profile_id) != str(provider_profile.id):
        raise ForbiddenException("El técnico no pertenece al tenant actual.")

    technician = technician_service.soft_delete(technician_id)
    detail = technician_service.get_detail_or_fail(str(technician.id))

    return success_response(
        message="Técnico eliminado correctamente.",
        data=technician_detail_public(*detail).model_dump(mode="json"),
    )
