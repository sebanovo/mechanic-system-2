from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.provider_service.mappers import provider_service_detail_public
from app.modules.provider_service.repository import ProviderServiceRepository
from app.modules.provider_service.schemas import (
    ProviderServiceListData,
    ProviderServiceResponse,
    ProviderServicesResponse,
    ProviderServiceStatusChangeRequest,
    ProviderServiceUpdateRequest,
)
from app.modules.provider_service.service import ProviderServiceService

router = APIRouter(prefix="/platform/provider-services", tags=["Platform Provider Services"])


def _provider_service_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderServiceService:
    return ProviderServiceService(
        repository=ProviderServiceRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=ProviderServicesResponse,
    summary="Listar servicios de proveedores",
    description="Lista los servicios publicados por todos los proveedores.",
)
def list_platform_provider_services(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderServiceService = Depends(_provider_service_service),
    pagination: PaginationParams = Depends(),
    provider_profile_id: str | None = Query(default=None),
    service_catalog_id: str | None = Query(default=None),
    is_available: bool | None = Query(default=None),
    category: str | None = Query(default=None),
    search: str | None = Query(default=None),
) -> dict:
    items, total = service.list(
        provider_profile_id=provider_profile_id,
        service_catalog_id=service_catalog_id,
        is_available=is_available,
        category=category,
        search=search,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = ProviderServiceListData(
        items=[
            provider_service_detail_public(provider_service, service_catalog)
            for provider_service, service_catalog in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Servicios de proveedores obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get(
    "/{provider_service_id}",
    response_model=ProviderServiceResponse,
    summary="Obtener servicio de proveedor",
    description="Devuelve el detalle de un servicio de proveedor.",
)
def get_platform_provider_service(
    provider_service_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    detail = service.get_detail_or_fail(provider_service_id)

    return success_response(
        message="Servicio del proveedor obtenido correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.put(
    "/{provider_service_id}",
    response_model=ProviderServiceResponse,
    summary="Actualizar servicio de proveedor",
    description="Actualiza un servicio de proveedor desde plataforma.",
)
def update_platform_provider_service(
    provider_service_id: str,
    payload: ProviderServiceUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_service = service.update_any(provider_service_id, payload)
    detail = service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Servicio del proveedor actualizado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch(
    "/{provider_service_id}/status",
    response_model=ProviderServiceResponse,
    summary="Cambiar estado del servicio de proveedor",
    description="Activa o desactiva un servicio de proveedor desde plataforma.",
)
def change_platform_provider_service_status(
    provider_service_id: str,
    payload: ProviderServiceStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_service = service.change_any_status(provider_service_id, payload)
    detail = service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Estado del servicio del proveedor actualizado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.delete(
    "/{provider_service_id}",
    response_model=ProviderServiceResponse,
    summary="Deshabilitar servicio de proveedor",
    description="Deshabilita lógicamente un servicio de proveedor.",
)
def delete_platform_provider_service(
    provider_service_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_service = service.delete_any(provider_service_id)
    detail = service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Servicio del proveedor deshabilitado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )
