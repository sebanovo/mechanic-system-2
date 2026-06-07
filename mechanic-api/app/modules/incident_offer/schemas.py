from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta
from app.modules.identity.provider.schemas import ProviderProfilePublic
from app.modules.incident.schemas import IncidentPublic
from app.modules.incident_candidate_provider.schemas import (
    IncidentCandidateProviderPublic,
)

IncidentOfferStatus = Literal[
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "EXPIRED",
    "CANCELLED",
]


class IncidentOfferCreateRequest(BaseModel):
    candidate_provider_id: str
    message: str | None = Field(default=None, max_length=1000)
    expires_at: datetime | None = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "candidate_provider_id": "uuid-del-candidato",
                "message": "Solicitud para atender incidente cercano.",
                "expires_at": "2026-06-06T20:00:00Z",
            }
        }
    )


class IncidentOfferResponseRequest(BaseModel):
    response_message: str | None = Field(default=None, max_length=1000)


class IncidentOfferPublic(BaseModel):
    id: str
    incident_id: str
    candidate_provider_id: str
    provider_profile_id: str
    offer_status: IncidentOfferStatus
    message: str | None = None
    response_message: str | None = None
    sent_at: datetime
    responded_at: datetime | None = None
    expires_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class IncidentOfferDetailPublic(BaseModel):
    offer: IncidentOfferPublic
    incident: IncidentPublic
    candidate_provider: IncidentCandidateProviderPublic
    provider_profile: ProviderProfilePublic


class IncidentOfferListData(BaseModel):
    items: list[IncidentOfferDetailPublic]
    pagination: PaginationMeta


class IncidentOfferResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentOfferDetailPublic


class IncidentOffersResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentOfferListData
