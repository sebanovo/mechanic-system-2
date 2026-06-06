from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.tenant.mappers import (
    tenant_detail_public,
    tenant_profile_public,
    tenant_public,
    tenant_settings_public,
)
from app.modules.identity.tenant.repository import TenantRepository
from app.modules.identity.tenant.schemas import (
    TenantCreateRequest,
    TenantDetailResponse,
    TenantListData,
    TenantProfileResponse,
    TenantProfileUpsertRequest,
    TenantResponse,
    TenantSettingsResponse,
    TenantSettingsUpsertRequest,
    TenantsResponse,
    TenantStatusChangeRequest,
    TenantUpdateRequest,
)
from app.modules.identity.tenant.service import TenantService

router = APIRouter(prefix="/platform/tenants", tags=["Platform Tenants"])


def _tenant_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TenantService:
    return TenantService(
        repository=TenantRepository(db),
        context=context,
    )


@router.get("", response_model=TenantsResponse)
def list_tenants(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
    pagination: PaginationParams = Depends(),
    slug: str | None = Query(default=None),
    status: str | None = Query(default=None),
    tenant_kind: str | None = Query(default=None),
    created_from: datetime | None = Query(default=None),
    created_to: datetime | None = Query(default=None),
) -> dict:
    tenants, total = service.list(
        slug=slug,
        status=status,
        tenant_kind=tenant_kind,
        created_from=created_from,
        created_to=created_to,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = TenantListData(
        items=[tenant_public(tenant) for tenant in tenants],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Tenants obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{tenant_id}", response_model=TenantDetailResponse)
def get_tenant(
    tenant_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant, profile, settings = service.get_detail(tenant_id)

    return success_response(
        message="Tenant obtenido correctamente.",
        data=tenant_detail_public(tenant, profile, settings).model_dump(mode="json"),
    )


@router.post("", response_model=TenantResponse)
def create_tenant(
    payload: TenantCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.create(payload)

    return success_response(
        message="Tenant creado correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )


@router.put("/{tenant_id}", response_model=TenantResponse)
def update_tenant(
    tenant_id: str,
    payload: TenantUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.update(tenant_id, payload)

    return success_response(
        message="Tenant actualizado correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )


@router.patch("/{tenant_id}/status", response_model=TenantResponse)
def change_tenant_status(
    tenant_id: str,
    payload: TenantStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.change_status(tenant_id, payload)

    return success_response(
        message="Estado de tenant actualizado correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )


@router.delete("/{tenant_id}", response_model=TenantResponse)
def delete_tenant(
    tenant_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.soft_delete(tenant_id)

    return success_response(
        message="Tenant eliminado correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )


@router.patch("/{tenant_id}/restore", response_model=TenantResponse)
def restore_tenant(
    tenant_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.restore(tenant_id)

    return success_response(
        message="Tenant restaurado correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )


@router.get("/{tenant_id}/profile", response_model=TenantProfileResponse)
def get_tenant_profile(
    tenant_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    profile = service.get_profile_or_fail(tenant_id)

    return success_response(
        message="Perfil de tenant obtenido correctamente.",
        data=tenant_profile_public(profile).model_dump(mode="json"),
    )


@router.put("/{tenant_id}/profile", response_model=TenantProfileResponse)
def update_tenant_profile(
    tenant_id: str,
    payload: TenantProfileUpsertRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    profile = service.upsert_profile(tenant_id, payload)

    return success_response(
        message="Perfil de tenant actualizado correctamente.",
        data=tenant_profile_public(profile).model_dump(mode="json"),
    )


@router.get("/{tenant_id}/settings", response_model=TenantSettingsResponse)
def get_tenant_settings(
    tenant_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    settings = service.get_settings_or_fail(tenant_id)

    return success_response(
        message="Configuración de tenant obtenida correctamente.",
        data=tenant_settings_public(settings).model_dump(mode="json"),
    )


@router.put("/{tenant_id}/settings", response_model=TenantSettingsResponse)
def update_tenant_settings(
    tenant_id: str,
    payload: TenantSettingsUpsertRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    settings = service.upsert_settings(tenant_id, payload)

    return success_response(
        message="Configuración de tenant actualizada correctamente.",
        data=tenant_settings_public(settings).model_dump(mode="json"),
    )
