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
from app.modules.incident_offer.mappers import incident_offer_detail_public
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_offer.schemas import (
    IncidentOfferListData,
    IncidentOfferResponse,
    IncidentOfferResponseRequest,
    IncidentOffersResponse,
)
from app.modules.incident_offer.service import IncidentOfferService

router = APIRouter(prefix="/tenants/current/offers", tags=["Tenant Incident Offers"])


def _provider_profile_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> ProviderProfileService:
    return ProviderProfileService(
        repository=ProviderProfileRepository(db),
        context=context,
    )


def _offer_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentOfferService:
    return IncidentOfferService(
        repository=IncidentOfferRepository(db),
        context=context,
    )


@router.get("", response_model=IncidentOffersResponse)
def list_current_tenant_offers(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: IncidentOfferService = Depends(_offer_service),
    pagination: PaginationParams = Depends(),
    offer_status: str | None = Query(default=None),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    items, total = service.list_by_provider(
        str(provider_profile.id),
        offer_status=offer_status,
        limit=pagination.limit,
        offset=pagination.offset,
    )

    data = IncidentOfferListData(
        items=[
            incident_offer_detail_public(offer, incident, candidate, provider)
            for offer, incident, candidate, provider in items
        ],
        pagination=build_pagination_meta(
            page=pagination.page,
            page_size=pagination.page_size,
            total=total,
        ),
    )

    return success_response(
        message="Ofertas obtenidas correctamente.",
        data=data.model_dump(mode="json"),
    )


@router.get("/{offer_id}", response_model=IncidentOfferResponse)
def get_current_tenant_offer(
    offer_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER", "TECHNICIAN")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()
    offer, incident, candidate, provider = service.get_detail_or_fail(offer_id)

    if str(offer.provider_profile_id) != str(provider_profile.id):
        from app.common.exceptions import NotFoundException

        raise NotFoundException("Oferta de incidente no encontrada.")

    return success_response(
        message="Oferta obtenida correctamente.",
        data=incident_offer_detail_public(offer, incident, candidate, provider).model_dump(mode="json"),
    )


@router.patch("/{offer_id}/accept", response_model=IncidentOfferResponse)
def accept_current_tenant_offer(
    offer_id: str,
    payload: IncidentOfferResponseRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    offer = service.accept_owned(
        provider_profile_id=str(provider_profile.id),
        offer_id=offer_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta aceptada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{offer_id}/reject", response_model=IncidentOfferResponse)
def reject_current_tenant_offer(
    offer_id: str,
    payload: IncidentOfferResponseRequest,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()

    offer = service.reject_owned(
        provider_profile_id=str(provider_profile.id),
        offer_id=offer_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta rechazada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )