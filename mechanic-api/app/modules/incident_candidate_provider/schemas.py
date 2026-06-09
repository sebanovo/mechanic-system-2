from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta
from app.modules.identity.provider.schemas import ProviderProfilePublic
from app.modules.incident.schemas import IncidentPublic

CandidateProviderStatus = Literal[
    "REQUESTED",
    "SUGGESTED",
    "SELECTED",
    "DISCARDED",
    "EXPIRED",
]


class IncidentCandidateProviderCreateRequest(BaseModel):
    provider_profile_id: str
    distance_km: Decimal | None = Field(default=None, ge=0)
    estimated_arrival_minutes: int | None = Field(default=None, ge=0)
    rating_score: Decimal | None = Field(default=None, ge=0)
    capacity_score: Decimal | None = Field(default=None, ge=0)
    response_score: Decimal | None = Field(default=None, ge=0)
    match_score: Decimal | None = Field(default=None, ge=0)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "provider_profile_id": "uuid-del-provider",
                "distance_km": 2.4,
                "estimated_arrival_minutes": 15,
                "rating_score": 4.7,
                "capacity_score": 80,
                "response_score": 90,
                "match_score": 87.5,
            }
        }
    )


class IncidentCandidateProviderUpdateRequest(BaseModel):
    distance_km: Decimal | None = Field(default=None, ge=0)
    estimated_arrival_minutes: int | None = Field(default=None, ge=0)
    rating_score: Decimal | None = Field(default=None, ge=0)
    capacity_score: Decimal | None = Field(default=None, ge=0)
    response_score: Decimal | None = Field(default=None, ge=0)
    match_score: Decimal | None = Field(default=None, ge=0)


class IncidentCandidateProviderStatusChangeRequest(BaseModel):
    candidate_status: CandidateProviderStatus


class IncidentCandidateProviderPublic(BaseModel):
    id: str
    incident_id: str
    provider_profile_id: str
    distance_km: Decimal | None = None
    estimated_arrival_minutes: int | None = None
    rating_score: Decimal | None = None
    capacity_score: Decimal | None = None
    response_score: Decimal | None = None
    match_score: Decimal | None = None
    candidate_status: CandidateProviderStatus
    created_at: datetime
    updated_at: datetime


class IncidentCandidateProviderDetailPublic(BaseModel):
    candidate: IncidentCandidateProviderPublic
    incident: IncidentPublic
    provider_profile: ProviderProfilePublic


class IncidentCandidateProviderListData(BaseModel):
    items: list[IncidentCandidateProviderDetailPublic]
    pagination: PaginationMeta


class IncidentCandidateProviderResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentCandidateProviderDetailPublic


class IncidentCandidateProvidersResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentCandidateProviderListData
