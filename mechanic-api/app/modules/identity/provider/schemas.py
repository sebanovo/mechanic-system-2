from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel

from app.common.pagination import PaginationMeta

ProviderType = Literal["WORKSHOP", "WORKSHOP_NETWORK", "INDEPENDENT_TECHNICIAN"]


class ProviderProfileUpdateRequest(BaseModel):
    accepts_emergency_requests: bool | None = None


class ProviderProfilePublic(BaseModel):
    id: str
    tenant_id: str
    provider_type: ProviderType
    accepts_emergency_requests: bool
    average_rating: float
    total_reviews: int
    response_score: float
    created_at: datetime
    updated_at: datetime


class ProviderProfileResponse(BaseModel):
    success: bool = True
    message: str
    data: ProviderProfilePublic


class ProviderProfileListData(BaseModel):
    items: list[ProviderProfilePublic]
    pagination: PaginationMeta


class ProviderProfilesResponse(BaseModel):
    success: bool = True
    message: str
    data: ProviderProfileListData
