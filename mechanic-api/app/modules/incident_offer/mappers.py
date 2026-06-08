from __future__ import annotations

from app.modules.identity.customer.models import Customer
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.user.models import User
from app.modules.incident.models import Incident
from app.modules.incident_ai_analysis.models import IncidentAiAnalysis
from app.modules.incident_offer.models import IncidentOffer
from app.modules.incident_offer.routes import (
    tenant_offer_accept_url,
    tenant_offer_reject_url,
    tenant_offer_url,
)
from app.modules.incident_offer.schemas import (
    CustomerSummaryPublic,
    IncidentAiAnalysisSummaryPublic,
    IncidentOfferDetailPublic,
    IncidentOfferListItemPublic,
    IncidentOfferPublic,
    IncidentSummaryPublic,
    ProviderProfileSummaryPublic,
    ServiceCatalogSummaryPublic,
    VehicleSummaryPublic,
)
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.vehicle.models import Vehicle


def incident_offer_public(offer: IncidentOffer) -> IncidentOfferPublic:
    return IncidentOfferPublic(
        id=str(offer.id),
        incident_id=str(offer.incident_id),
        candidate_provider_id=str(offer.candidate_provider_id),
        provider_profile_id=str(offer.provider_profile_id),
        offer_status=offer.offer_status,  # type: ignore[arg-type]
        message=offer.message,
        response_message=offer.response_message,
        sent_at=offer.sent_at,
        responded_at=offer.responded_at,
        expires_at=offer.expires_at,
        created_at=offer.created_at,
        updated_at=offer.updated_at,
    )


def incident_offer_list_item_public(
    offer: IncidentOffer,
    incident: Incident,
    service_catalog: ServiceCatalog | None,
    vehicle: Vehicle | None,
    ai_analysis: IncidentAiAnalysis | None,
) -> IncidentOfferListItemPublic:
    return IncidentOfferListItemPublic(
        id=str(offer.id),
        offer_status=offer.offer_status,  # type: ignore[arg-type]
        expires_at=offer.expires_at,
        responded_at=offer.responded_at,
        created_at=offer.created_at,
        incident_id=str(incident.id),
        incident_code=incident.incident_code,
        incident_title=incident.title,
        incident_priority=incident.priority,  # type: ignore[arg-type]
        incident_status=incident.status,  # type: ignore[arg-type]
        service_name=(
            service_catalog.service_name if service_catalog is not None else None
        ),
        service_code=(
            service_catalog.service_code if service_catalog is not None else None
        ),
        vehicle_label=_build_vehicle_label(vehicle),
        address_text=incident.address_text,
        estimated_min_price=(
            ai_analysis.estimated_min_price if ai_analysis is not None else None
        ),
        estimated_max_price=(
            ai_analysis.estimated_max_price if ai_analysis is not None else None
        ),
        estimated_min_duration_minutes=(
            ai_analysis.estimated_min_duration_minutes
            if ai_analysis is not None
            else None
        ),
        estimated_max_duration_minutes=(
            ai_analysis.estimated_max_duration_minutes
            if ai_analysis is not None
            else None
        ),
    )


def incident_offer_detail_public(
    offer: IncidentOffer,
    incident: Incident,
    service_catalog: ServiceCatalog | None,
    ai_analysis: IncidentAiAnalysis | None,
    customer: Customer | None,
    customer_user: User | None,
    vehicle: Vehicle | None,
    provider_profile: ProviderProfile,
) -> IncidentOfferDetailPublic:
    return IncidentOfferDetailPublic(
        offer=incident_offer_public(offer),
        incident=IncidentSummaryPublic(
            id=str(incident.id),
            incident_code=incident.incident_code,
            title=incident.title,
            description=incident.description,
            priority=incident.priority,  # type: ignore[arg-type]
            status=incident.status,  # type: ignore[arg-type]
            address_text=incident.address_text,
            latitude=incident.latitude,
            longitude=incident.longitude,
            reported_at=incident.reported_at,
        ),
        service=(
            ServiceCatalogSummaryPublic(
                id=str(service_catalog.id),
                service_code=service_catalog.service_code,
                service_name=service_catalog.service_name,
                category=service_catalog.category,
            )
            if service_catalog is not None
            else None
        ),
        ai_analysis=(
            IncidentAiAnalysisSummaryPublic(
                probable_service_code=ai_analysis.probable_service_code,
                probable_problem=ai_analysis.probable_problem,
                confidence_score=ai_analysis.confidence_score,
                recommended_priority=ai_analysis.recommended_priority,
                estimated_min_price=ai_analysis.estimated_min_price,
                estimated_max_price=ai_analysis.estimated_max_price,
                estimated_min_duration_minutes=(
                    ai_analysis.estimated_min_duration_minutes
                ),
                estimated_max_duration_minutes=(
                    ai_analysis.estimated_max_duration_minutes
                ),
            )
            if ai_analysis is not None
            else None
        ),
        customer=(
            CustomerSummaryPublic(
                id=str(customer.id),
                full_name=_build_full_name(customer_user),
                phone=customer_user.phone if customer_user is not None else None,
            )
            if customer is not None
            else None
        ),
        vehicle=(
            VehicleSummaryPublic(
                id=str(vehicle.id),
                label=_build_vehicle_label(vehicle),
                plate_number=vehicle.plate_number,
            )
            if vehicle is not None
            else None
        ),
        provider_profile=ProviderProfileSummaryPublic(
            id=str(provider_profile.id),
            provider_type=provider_profile.provider_type,  # type: ignore[arg-type]
            operational_status=provider_profile.operational_status,  # type: ignore[arg-type]
            accepts_emergency_requests=provider_profile.accepts_emergency_requests,
            average_rating=float(provider_profile.average_rating),
            total_reviews=provider_profile.total_reviews,
        ),
        actions={
            "view": {
                "method": "GET",
                "url": tenant_offer_url(str(offer.id)),
            },
            "accept": {
                "method": "PATCH",
                "url": tenant_offer_accept_url(str(offer.id)),
            },
            "reject": {
                "method": "PATCH",
                "url": tenant_offer_reject_url(str(offer.id)),
            },
        },
    )


def _build_full_name(user: User | None) -> str | None:
    if user is None:
        return None

    parts = [user.first_name, user.last_name]
    name = " ".join(
        part.strip()
        for part in parts
        if isinstance(part, str) and part.strip()
    )

    return name or None


def _build_vehicle_label(vehicle: Vehicle | None) -> str | None:
    if vehicle is None:
        return None

    parts = [vehicle.brand, vehicle.model, vehicle.year]
    label = " ".join(
        str(part).strip()
        for part in parts
        if part is not None and str(part).strip()
    )

    return label or None
