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
from app.modules.incident_offer.mappers import (
    incident_offer_detail_public,
    incident_offer_list_item_public,
)
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_offer.schemas import (
    IncidentOfferListData,
    IncidentOfferResponse,
    IncidentOfferResponseRequest,
    IncidentOffersResponse,
)
from app.modules.incident_offer.service import IncidentOfferService

router = APIRouter(prefix="/tenants/current/offers", tags=["Tenant Incident Offers"])
legacy_router = APIRouter(
    prefix="/tenants/current/incident-offers",
    tags=["Tenant Incident Offers"],
    include_in_schema=False,
)


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


@router.get(
    "",
    response_model=IncidentOffersResponse,
    summary="Listar ofertas del taller",
    description=(
        "Lista las ofertas recibidas por el taller actual. "
        "Si no se envía estado, devuelve las ofertas visibles para responder."
    ),
)
@legacy_router.get("", response_model=IncidentOffersResponse)
def list_current_tenant_offers(
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
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
            incident_offer_list_item_public(offer, incident, service_catalog, vehicle, ai_analysis)
            for offer, incident, service_catalog, vehicle, ai_analysis in items
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


@router.get(
    "/{offer_id}",
    response_model=IncidentOfferResponse,
    summary="Obtener oferta del taller",
    description="Devuelve el detalle completo de una oferta visible para el taller actual.",
)
@legacy_router.get("/{offer_id}", response_model=IncidentOfferResponse)
def get_current_tenant_offer(
    offer_id: str,
    identity: CurrentIdentity = Depends(require_user_types("TENANT_OWNER")),
    provider_profile_service: ProviderProfileService = Depends(_provider_profile_service),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    provider_profile = provider_profile_service.get_current_or_fail()
    offer, incident, service_catalog, ai_analysis, customer, customer_user, vehicle, provider = service.get_public_detail_or_fail(offer_id)

    if str(offer.provider_profile_id) != str(provider_profile.id):
        from app.common.exceptions import NotFoundException

        raise NotFoundException("Oferta de incidente no encontrada.")

    return success_response(
        message="Oferta obtenida correctamente.",
        data=incident_offer_detail_public(offer, incident, service_catalog, ai_analysis, customer, customer_user, vehicle, provider).model_dump(mode="json"),
    )


@router.patch(
    "/{offer_id}/accept",
    response_model=IncidentOfferResponse,
    summary="Aceptar oferta de incidente",
    description=(
        "Marca la oferta como aceptada. El taller usa esta acción para confirmar "
        "que atenderá el incidente."
    ),
)
@legacy_router.patch("/{offer_id}/accept", response_model=IncidentOfferResponse)
def accept_current_tenant_offer(
    offer_id: str,
    payload: IncidentOfferResponseRequest | None = None,
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

    detail = service.get_public_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta aceptada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch(
    "/{offer_id}/reject",
    response_model=IncidentOfferResponse,
    summary="Rechazar oferta de incidente",
    description="Rechaza una oferta de incidente desde el taller actual.",
)
@legacy_router.patch("/{offer_id}/reject", response_model=IncidentOfferResponse)
def reject_current_tenant_offer(
    offer_id: str,
    payload: IncidentOfferResponseRequest | None = None,
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

    detail = service.get_public_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta rechazada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )
