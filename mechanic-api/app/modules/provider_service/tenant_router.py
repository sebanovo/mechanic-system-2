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
from app.modules.provider_service.mappers import provider_service_detail_public
from app.modules.provider_service.repository import ProviderServiceRepository
from app.modules.provider_service.schemas import (
    ProviderServiceCreateRequest,
    ProviderServiceListData,
    ProviderServiceResponse,
    ProviderServicesResponse,
    ProviderServiceStatusChangeRequest,
    ProviderServiceUpdateRequest,
)
from app.modules.provider_service.service import ProviderServiceService

router = APIRouter(prefix="/tenants/current/provider-services", tags=["Tenant Provider Services"])


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _provider_service_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderServiceService:
    return ProviderServiceService(
        repository=ProviderServiceRepository(db),
        context=context,
    )


@router.get("", response_model=ProviderServicesResponse)
def list_current_tenant_provider_services(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    provider_service_service: ProviderServiceService = Depends(_provider_service_service),
    pagination: PaginationParams = Depends(),
    is_available: bool | None = Query(default=None),
    category: str | None = Query(default=None),
    search: str | None = Query(default=None),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    items, total = provider_service_service.list_by_provider(
        str(provider_profile.id),
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
        message="Servicios del proveedor obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.post("", response_model=ProviderServiceResponse)
def create_current_tenant_provider_service(
    payload: ProviderServiceCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    provider_service_service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    provider_service = provider_service_service.create_for_provider(
        provider_profile,
        payload,
    )

    detail = provider_service_service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Servicio del proveedor creado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.get("/{provider_service_id}", response_model=ProviderServiceResponse)
def get_current_tenant_provider_service(
    provider_service_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    provider_service_service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    detail = provider_service_service.get_owned_detail_or_fail(
        provider_profile_id=str(provider_profile.id),
        provider_service_id=provider_service_id,
    )

    return success_response(
        message="Servicio del proveedor obtenido correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.put("/{provider_service_id}", response_model=ProviderServiceResponse)
def update_current_tenant_provider_service(
    provider_service_id: str,
    payload: ProviderServiceUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    provider_service_service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    provider_service = provider_service_service.update_owned(
        provider_profile_id=str(provider_profile.id),
        provider_service_id=provider_service_id,
        payload=payload,
    )

    detail = provider_service_service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Servicio del proveedor actualizado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{provider_service_id}/status", response_model=ProviderServiceResponse)
def change_current_tenant_provider_service_status(
    provider_service_id: str,
    payload: ProviderServiceStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    provider_service_service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    provider_service = provider_service_service.change_owned_status(
        provider_profile_id=str(provider_profile.id),
        provider_service_id=provider_service_id,
        payload=payload,
    )

    detail = provider_service_service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Estado del servicio del proveedor actualizado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )


@router.delete("/{provider_service_id}", response_model=ProviderServiceResponse)
def delete_current_tenant_provider_service(
    provider_service_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    provider_service_service: ProviderServiceService = Depends(_provider_service_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    provider_service = provider_service_service.delete_owned(
        provider_profile_id=str(provider_profile.id),
        provider_service_id=provider_service_id,
    )

    detail = provider_service_service.get_detail_or_fail(str(provider_service.id))

    return success_response(
        message="Servicio del proveedor deshabilitado correctamente.",
        data=provider_service_detail_public(*detail).model_dump(mode="json"),
    )