from __future__ import annotations

from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.provider.schemas import ProviderProfilePublic


def provider_profile_public(provider_profile: ProviderProfile) -> ProviderProfilePublic:
    return ProviderProfilePublic(
        id=str(provider_profile.id),
        tenant_id=str(provider_profile.tenant_id),
        provider_type=provider_profile.provider_type,  # type: ignore[arg-type]
        operational_status=provider_profile.operational_status,  # type: ignore[arg-type]
        accepts_emergency_requests=provider_profile.accepts_emergency_requests,
        average_rating=float(provider_profile.average_rating),
        total_reviews=provider_profile.total_reviews,
        response_score=float(provider_profile.response_score),
        created_at=provider_profile.created_at,
        updated_at=provider_profile.updated_at,
    )
