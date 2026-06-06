from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.mappers import provider_profile_public
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.schemas import (
    ProviderProfileResponse,
    ProviderProfileUpdateRequest,
)
from app.modules.identity.provider.service import ProviderProfileService

router = APIRouter(prefix="/tenants/current/provider", tags=["Tenant Provider"])


def _provider_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


@router.get("", response_model=ProviderProfileResponse)
def get_current_provider_profile(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    service: ProviderProfileService = Depends(_provider_service),
) -> dict:
    provider_profile = service.get_current_or_fail()

    return success_response(
        message="Perfil de proveedor obtenido correctamente.",
        data=provider_profile_public(provider_profile).model_dump(mode="json"),
    )


@router.put("", response_model=ProviderProfileResponse)
def update_current_provider_profile(
    payload: ProviderProfileUpdateRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    service: ProviderProfileService = Depends(_provider_service),
) -> dict:
    provider_profile = service.update_current(payload)

    return success_response(
        message="Perfil de proveedor actualizado correctamente.",
        data=provider_profile_public(provider_profile).model_dump(mode="json"),
    )