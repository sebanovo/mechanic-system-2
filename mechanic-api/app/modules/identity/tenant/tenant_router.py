from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import (
    CurrentIdentity,
    require_tenant_selected,
    require_user_types,
)
from app.modules.identity.tenant.mappers import (
    tenant_detail_public,
    tenant_profile_public,
    tenant_public,
    tenant_settings_public,
)
from app.modules.identity.tenant.repository import TenantRepository
from app.modules.identity.tenant.schemas import (
    CurrentTenantListResponse,
    TenantDetailResponse,
    TenantProfileResponse,
    TenantProfileUpsertRequest,
    TenantNetworkCreateRequest,
    TenantResponse,
    TenantSettingsResponse,
    TenantSettingsUpsertRequest,
)
from app.modules.identity.tenant.service import TenantService

router = APIRouter(prefix="/tenants", tags=["Tenants"])


def _tenant_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> TenantService:
    return TenantService(
        repository=TenantRepository(db),
        context=context,
    )


@router.get("/me", response_model=CurrentTenantListResponse)
def list_my_tenants(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenants = service.list_current_user_tenants()

    return success_response(
        message="Tenants obtenidos correctamente.",
        data=[tenant_public(tenant).model_dump(mode="json") for tenant in tenants],
    )


@router.get("/current", response_model=TenantResponse)
def get_current_tenant(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.get_current_or_fail()

    return success_response(
        message="Tenant actual obtenido correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )


@router.get("/current/detail", response_model=TenantDetailResponse)
def get_current_tenant_detail(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant, profile, settings = service.get_current_detail()

    return success_response(
        message="Detalle de tenant obtenido correctamente.",
        data=tenant_detail_public(tenant, profile, settings).model_dump(mode="json"),
    )


@router.get("/current/profile", response_model=TenantProfileResponse)
def get_current_profile(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    profile = service.get_current_profile_or_fail()

    return success_response(
        message="Perfil de tenant obtenido correctamente.",
        data=tenant_profile_public(profile).model_dump(mode="json"),
    )


@router.put("/current/profile", response_model=TenantProfileResponse)
def update_current_profile(
    payload: TenantProfileUpsertRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    profile = service.upsert_current_profile(payload)

    return success_response(
        message="Perfil de tenant actualizado correctamente.",
        data=tenant_profile_public(profile).model_dump(mode="json"),
    )


@router.get("/current/settings", response_model=TenantSettingsResponse)
def get_current_settings(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    settings = service.get_current_settings_or_fail()

    return success_response(
        message="Configuración de tenant obtenida correctamente.",
        data=tenant_settings_public(settings).model_dump(mode="json"),
    )


@router.put("/current/settings", response_model=TenantSettingsResponse)
def update_current_settings(
    payload: TenantSettingsUpsertRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    settings = service.upsert_current_settings(payload)

    return success_response(
        message="Configuración de tenant actualizada correctamente.",
        data=tenant_settings_public(settings).model_dump(mode="json"),
    )


@router.post("/current/network", response_model=TenantResponse)
def create_current_tenant_network(
    payload: TenantNetworkCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    _tenant_identity: CurrentIdentity = Depends(require_tenant_selected()),
    service: TenantService = Depends(_tenant_service),
) -> dict:
    tenant = service.create_network(identity.user, payload)

    return success_response(
        message="Red de tenant creada correctamente.",
        data=tenant_public(tenant).model_dump(mode="json"),
    )
