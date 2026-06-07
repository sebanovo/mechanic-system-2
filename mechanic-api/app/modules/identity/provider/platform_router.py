from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.identity.provider.mappers import provider_profile_public
from app.modules.identity.provider.repository import ProviderProfileRepository
from app.modules.identity.provider.schemas import (
    ProviderProfileListData,
    ProviderProfileResponse,
    ProviderProfilesResponse,
)
from app.modules.identity.provider.service import ProviderProfileService

router = APIRouter(prefix="/platform/providers", tags=["Platform Providers"])


def _provider_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


@router.get(
    "",
    response_model=ProviderProfilesResponse,
    summary="Listar perfiles de proveedor",
    description="Lista los perfiles de proveedor registrados en la plataforma.",
)
def list_provider_profiles(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderProfileService = Depends(_provider_service),
    pagination: PaginationParams = Depends(),
    provider_type: str | None = Query(default=None),
    accepts_emergency_requests: bool | None = Query(default=None),
) -> dict:
    items, total = service.list(
        provider_type=provider_type,
        accepts_emergency_requests=accepts_emergency_requests,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = ProviderProfileListData(
        items=[provider_profile_public(item) for item in items],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Perfiles de proveedor obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get(
    "/{provider_profile_id}",
    response_model=ProviderProfileResponse,
    summary="Obtener perfil de proveedor",
    description="Devuelve el detalle completo de un perfil de proveedor.",
)
def get_provider_profile(
    provider_profile_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: ProviderProfileService = Depends(_provider_service),
) -> dict:
    provider_profile = service.get_or_fail(provider_profile_id)

    return success_response(
        message="Perfil de proveedor obtenido correctamente.",
        data=provider_profile_public(provider_profile).model_dump(mode="json"),
    )
