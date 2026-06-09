from __future__ import annotations

from decimal import Decimal

from pydantic import BaseModel


class IncidentDispatchResult(BaseModel):
    should_continue: bool
    reason: str
    incident_id: str
    analysis_id: str | None = None
    probable_service_code: str | None = None
    service_catalog_id: str | None = None
    unattended_reason: str | None = None


class EligibleProviderCandidate(BaseModel):
    provider_profile_id: str
    tenant_id: str
    provider_service_id: str
    service_catalog_id: str
    available_technicians_count: int
    enabled_technicians_count: int
    average_rating: Decimal | None = None
    response_score: Decimal | None = None
    total_reviews: int | None = None
    distance_km: Decimal | None = None


class ScoredProviderCandidate(EligibleProviderCandidate):
    score: Decimal
