from __future__ import annotations

from app.modules.identity.provider.mappers import provider_profile_public
from app.modules.identity.provider.models import ProviderProfile
from app.modules.incident.mappers import incident_public
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.mappers import (
    incident_candidate_provider_public,
)
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_offer.models import IncidentOffer
from app.modules.incident_offer.schemas import (
    IncidentOfferDetailPublic,
    IncidentOfferPublic,
)


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


def incident_offer_detail_public(
    offer: IncidentOffer,
    incident: Incident,
    candidate_provider: IncidentCandidateProvider,
    provider_profile: ProviderProfile,
) -> IncidentOfferDetailPublic:
    return IncidentOfferDetailPublic(
        offer=incident_offer_public(offer),
        incident=incident_public(incident),
        candidate_provider=incident_candidate_provider_public(candidate_provider),
        provider_profile=provider_profile_public(provider_profile),
    )