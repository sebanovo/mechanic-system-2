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
from app.modules.incident_candidate_provider.mappers import (
    incident_candidate_provider_detail_public,
)
from app.modules.incident_candidate_provider.repository import (
    IncidentCandidateProviderRepository,
)
from app.modules.incident_candidate_provider.schemas import (
    IncidentCandidateProviderListData,
    IncidentCandidateProviderResponse,
    IncidentCandidateProvidersResponse,
    IncidentCandidateProviderStatusChangeRequest,
)
from app.modules.incident_candidate_provider.service import (
    IncidentCandidateProviderService,
)

router = APIRouter(
    prefix="/tenants/current/candidate-providers",
    tags=["Tenant Candidate Providers"],
)


def _provider_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _candidate_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentCandidateProviderService:
    return IncidentCandidateProviderService(
        repository=IncidentCandidateProviderRepository(db),
        context=context,
    )


@router.get("", response_model=IncidentCandidateProvidersResponse)
def list_current_tenant_candidate_providers(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    candidate_service: IncidentCandidateProviderService = Depends(_candidate_service),
    pagination: PaginationParams = Depends(),
    candidate_status: str | None = Query(default=None),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()

    items, total = candidate_service.list_by_provider(
        str(provider_profile.id),
        candidate_status=candidate_status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = IncidentCandidateProviderListData(
        items=[
            incident_candidate_provider_detail_public(candidate, incident, provider)
            for candidate, incident, provider in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Proveedores candidatos obtenidos correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{candidate_id}", response_model=IncidentCandidateProviderResponse)
def get_current_tenant_candidate_provider(
    candidate_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    candidate_service: IncidentCandidateProviderService = Depends(_candidate_service),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()

    detail = candidate_service.get_owned_by_provider_or_fail(
        provider_profile_id=str(provider_profile.id),
        candidate_id=candidate_id,
    )

    return success_response(
        message="Proveedor candidato obtenido correctamente.",
        data=incident_candidate_provider_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{candidate_id}/status", response_model=IncidentCandidateProviderResponse)
def change_current_tenant_candidate_provider_status(
    candidate_id: str,
    payload: IncidentCandidateProviderStatusChangeRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_service: ProviderProfileService = Depends(_provider_service),
    candidate_service: IncidentCandidateProviderService = Depends(_candidate_service),
) -> dict:
    provider_profile = provider_service.get_current_or_fail()

    candidate = candidate_service.change_owned_status(
        provider_profile_id=str(provider_profile.id),
        candidate_id=candidate_id,
        payload=payload,
    )
    detail = candidate_service.get_detail_or_fail(str(candidate.id))

    return success_response(
        message="Estado de proveedor candidato actualizado correctamente.",
        data=incident_candidate_provider_detail_public(*detail).model_dump(mode="json"),
    )