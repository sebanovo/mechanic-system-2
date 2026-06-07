from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Any
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta
from app.modules.identity.provider.schemas import ProviderProfilePublic
from app.modules.incident.schemas import IncidentPriority, IncidentStatus

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


class IncidentSummaryPublic(BaseModel):
    id: str
    incident_code: str
    title: str
    description: str | None
    priority: IncidentPriority
    status: IncidentStatus
    address_text: str | None
    latitude: Decimal
    longitude: Decimal
    reported_at: datetime


class ServiceCatalogSummaryPublic(BaseModel):
    id: str
    service_code: str
    service_name: str
    category: str


class IncidentAiAnalysisSummaryPublic(BaseModel):
    probable_service_code: str | None = None
    probable_problem: str | None = None
    confidence_score: Decimal | None = None
    recommended_priority: str | None = None
    estimated_min_price: Decimal | None = None
    estimated_max_price: Decimal | None = None
    estimated_min_duration_minutes: int | None = None
    estimated_max_duration_minutes: int | None = None


class CustomerSummaryPublic(BaseModel):
    id: str
    full_name: str | None = None
    phone: str | None = None


class VehicleSummaryPublic(BaseModel):
    id: str
    label: str | None = None
    plate_number: str | None = None


class ProviderProfileSummaryPublic(BaseModel):
    id: str
    provider_type: str
    operational_status: str
    accepts_emergency_requests: bool
    average_rating: float
    total_reviews: int


class IncidentOfferListItemPublic(BaseModel):
    id: str
    offer_status: IncidentOfferStatus
    expires_at: datetime | None = None
    responded_at: datetime | None = None
    created_at: datetime

    incident_id: str
    incident_code: str
    incident_title: str
    incident_priority: IncidentPriority
    incident_status: IncidentStatus

    service_name: str | None = None
    service_code: str | None = None
    vehicle_label: str | None = None
    address_text: str | None = None
    estimated_min_price: Decimal | None = None
    estimated_max_price: Decimal | None = None
    estimated_min_duration_minutes: int | None = None
    estimated_max_duration_minutes: int | None = None


class IncidentOfferDetailPublic(BaseModel):
    offer: IncidentOfferPublic
    incident: IncidentSummaryPublic
    service: ServiceCatalogSummaryPublic | None = None
    ai_analysis: IncidentAiAnalysisSummaryPublic | None = None
    customer: CustomerSummaryPublic | None = None
    vehicle: VehicleSummaryPublic | None = None
    provider_profile: ProviderProfileSummaryPublic
    actions: dict[str, Any]


class IncidentOfferListData(BaseModel):
    items: list[IncidentOfferListItemPublic]
    pagination: PaginationMeta


class IncidentOfferResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentOfferDetailPublic


class IncidentOffersResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentOfferListData
