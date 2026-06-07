from __future__ import annotations

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.common.pagination import PaginationParams, build_pagination_meta
from app.common.responses import success_response
from app.core.context import RequestContext
from app.core.database import get_db
from app.core.request_context import get_request_context
from app.modules.identity.auth.authorization import CurrentIdentity, require_user_types
from app.modules.incident_offer.mappers import incident_offer_detail_public
from app.modules.incident_offer.repository import IncidentOfferRepository
from app.modules.incident_offer.schemas import (
    IncidentOfferCreateRequest,
    IncidentOfferListData,
    IncidentOfferResponse,
    IncidentOffersResponse,
    IncidentOfferResponseRequest,
)
from app.modules.incident_offer.service import IncidentOfferService

router = APIRouter(prefix="/platform/incident-offers", tags=["Platform Incident Offers"])


def _offer_service(
    db: Session = Depends(get_db),
    context: RequestContext = Depends(get_request_context),
) -> IncidentOfferService:
    return IncidentOfferService(
        repository=IncidentOfferRepository(db),
        context=context,
    )


@router.get("", response_model=IncidentOffersResponse)
def list_platform_incident_offers(
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
    pagination: PaginationParams = Depends(),
    incident_id: str | None = Query(default=None),
    candidate_provider_id: str | None = Query(default=None),
    provider_profile_id: str | None = Query(default=None),
    offer_status: str | None = Query(default=None),
) -> dict:
    items, total = service.list(
        incident_id=incident_id,
        candidate_provider_id=candidate_provider_id,
        provider_profile_id=provider_profile_id,
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


@router.post("/incidents/{incident_id}", response_model=IncidentOfferResponse)
def create_platform_incident_offer(
    incident_id: str,
    payload: IncidentOfferCreateRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    offer = service.create_for_candidate(
        incident_id=incident_id,
        payload=payload,
    )

    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta creada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.get("/{offer_id}", response_model=IncidentOfferResponse)
def get_platform_incident_offer(
    offer_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    detail = service.get_detail_or_fail(offer_id)

    return success_response(
        message="Oferta obtenida correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{offer_id}/accept", response_model=IncidentOfferResponse)
def accept_platform_incident_offer(
    offer_id: str,
    payload: IncidentOfferResponseRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    offer, _, _, provider = service.get_detail_or_fail(offer_id)

    offer = service.accept_owned(
        provider_profile_id=str(provider.id),
        offer_id=offer_id,
        payload=payload,
    )
    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta aceptada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{offer_id}/reject", response_model=IncidentOfferResponse)
def reject_platform_incident_offer(
    offer_id: str,
    payload: IncidentOfferResponseRequest,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    offer, _, _, provider = service.get_detail_or_fail(offer_id)

    offer = service.reject_owned(
        provider_profile_id=str(provider.id),
        offer_id=offer_id,
        payload=payload,
    )
    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta rechazada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{offer_id}/cancel", response_model=IncidentOfferResponse)
def cancel_platform_incident_offer(
    offer_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    offer = service.cancel(offer_id)
    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta cancelada correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )


@router.patch("/{offer_id}/expire", response_model=IncidentOfferResponse)
def expire_platform_incident_offer(
    offer_id: str,
    identity: CurrentIdentity = Depends(require_user_types("SUPERADMIN")),
    service: IncidentOfferService = Depends(_offer_service),
) -> dict:
    offer = service.expire(offer_id)
    detail = service.get_detail_or_fail(str(offer.id))

    return success_response(
        message="Oferta vencida correctamente.",
        data=incident_offer_detail_public(*detail).model_dump(mode="json"),
    )
