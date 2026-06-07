from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.service import ProviderProfileService
from app.modules.technician_service.mappers import technician_service_detail_public
from app.modules.technician_service.repository import TechnicianServiceRepository
from app.modules.technician_service.schemas import (
    TechnicianServiceCreateRequest,
    TechnicianServiceListData,
    TechnicianServiceResponse,
    TechnicianServicesResponse,
    TechnicianServiceStatusChangeRequest,
    TechnicianServiceUpdateRequest,
)
from app.modules.technician_service.service import TechnicianServiceService

router = APIRouter(
    prefix="/tenants/current/technician-services",
    tags=["Tenant Technician Services"],
)


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _technician_service_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TechnicianServiceService:
    return TechnicianServiceService(
        repository=TechnicianServiceRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=TechnicianServicesResponse,
    summary="Listar servicios habilitados de técnicos del taller",
    description=(
        "Lista los servicios técnicos habilitados dentro del taller actual. "
        "Sirve para saber qué técnicos pueden atender cada catálogo."
    ),
)
def list_current_tenant_technician_services(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: TechnicianServiceService = Depends(_technician_service_service),
    pagination: PaginationParams = Depends(),
    service_catalog_id: str | None = Query(default=None),
    is_enabled: bool | None = Query(default=None),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    items, total = service.list_by_provider(
        str(provider_profile.id),
        service_catalog_id=service_catalog_id,
        is_enabled=is_enabled,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = TechnicianServiceListData(
        items=[
            technician_service_detail_public(
                technician_service,
                technician,
                provider_service,
                service_catalog,
            )
            for technician_service, technician, provider_service, service_catalog in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Servicios de técnicos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post(
    "",
    response_model=TechnicianServiceResponse,
    summary="Crear servicio habilitado para técnico",
    description=(
        "Vincula un técnico con un servicio del catálogo de su taller, "
        "permitiendo que pueda atender ese servicio."
    ),
)
def create_current_tenant_technician_service(
    payload: TechnicianServiceCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    technician_service = service.create_for_current_provider(
        str(provider_profile.id),
        payload,
    )

    detail = service.get_detail_or_fail(str(technician_service.id))

    return success_response(
        message="Servicio del técnico creado correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.get(
    "/{technician_service_id}",
    response_model=TechnicianServiceResponse,
    summary="Obtener servicio habilitado de técnico",
    description="Devuelve el detalle de la relación entre técnico y servicio.",
)
def get_current_tenant_technician_service(
    technician_service_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    detail = service.get_detail_or_fail(technician_service_id)
    _, technician, provider_service, _ = detail

    service._ensure_owned_by_provider(
        provider_profile_id=str(provider_profile.id),
        technician=technician,
        provider_service=provider_service,
    )

    return success_response(
        message="Servicio del técnico obtenido correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.put(
    "/{technician_service_id}",
    response_model=TechnicianServiceResponse,
    summary="Actualizar servicio habilitado de técnico",
    description="Actualiza el nivel de habilidad u otros datos del servicio del técnico.",
)
def update_current_tenant_technician_service(
    technician_service_id: str,
    payload: TechnicianServiceUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    technician_service = service.update_owned(
        provider_profile_id=str(provider_profile.id),
        technician_service_id=technician_service_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(technician_service.id))

    return success_response(
        message="Servicio del técnico actualizado correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch(
    "/{technician_service_id}/status",
    response_model=TechnicianServiceResponse,
    summary="Cambiar estado del servicio del técnico",
    description="Habilita o deshabilita un servicio técnico sin borrarlo.",
)
def change_current_tenant_technician_service_status(
    technician_service_id: str,
    payload: TechnicianServiceStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: TechnicianServiceService = Depends(_technician_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    technician_service = service.change_owned_status(
        provider_profile_id=str(provider_profile.id),
        technician_service_id=technician_service_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(technician_service.id))

    return success_response(
        message="Estado del servicio del técnico actualizado correctamente.",
        data=technician_service_detail_public(*detail).model_dump(mode="json"),
    )
