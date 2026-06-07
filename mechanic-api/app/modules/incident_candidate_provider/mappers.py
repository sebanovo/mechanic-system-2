from __future__ import annotations

from app.modules.identity.provider.mappers import provider_profile_public
from app.modules.identity.provider.models import ProviderProfile
from app.modules.incident.mappers import incident_public
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_candidate_provider.schemas import (
    IncidentCandidateProviderDetailPublic,
    IncidentCandidateProviderPublic,
)


def incident_candidate_provider_public(
    candidate: IncidentCandidateProvider,
) -> IncidentCandidateProviderPublic:
    return IncidentCandidateProviderPublic(
        id=str(candidate.id),
        incident_id=str(candidate.incident_id),
        provider_profile_id=str(candidate.provider_profile_id),
        distance_km=candidate.distance_km,
        estimated_arrival_minutes=candidate.estimated_arrival_minutes,
        rating_score=candidate.rating_score,
        capacity_score=candidate.capacity_score,
        response_score=candidate.response_score,
        match_score=candidate.match_score,
        candidate_status=candidate.candidate_status,  # type: ignore[arg-type]
        created_at=candidate.created_at,
        updated_at=candidate.updated_at,
    )


def incident_candidate_provider_detail_public(
    candidate: IncidentCandidateProvider,
    incident: Incident,
    provider_profile: ProviderProfile,
) -> IncidentCandidateProviderDetailPublic:
    return IncidentCandidateProviderDetailPublic(
        candidate=incident_candidate_provider_public(candidate),
        incident=incident_public(incident),
        provider_profile=provider_profile_public(provider_profile),
    )