from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta

IncidentPriority = Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]

IncidentStatus = Literal[
    "REPORTED",
    "ANALYZING",
    "SEARCHING_PROVIDER",
    "WAITING_PROVIDER_RESPONSE",
    "PROVIDER_ACCEPTED",
    "ASSIGNING_TECHNICIAN",
    "TECHNICIAN_ASSIGNED",
    "EN_ROUTE",
    "ARRIVED",
    "IN_SERVICE",
    "COMPLETED",
    "CANCELLED",
    "UNATTENDED",
]


class IncidentCreateRequest(BaseModel):
    vehicle_id: str
    description: str | None = None
    latitude: Decimal = Field(
        ge=-90,
        le=90,
        examples=[-16.5291234],
        description="Latitud geográfica del incidente.",
    )
    longitude: Decimal = Field(
        ge=-180,
        le=180,
        examples=[-68.1456789],
        description="Longitud geográfica del incidente.",
    )
    priority: IncidentPriority = "MEDIUM"

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "vehicle_id": "uuid-del-vehiculo",
                "description": "El auto no arranca y parece problema de batería.",
                "latitude": -16.5291234,
                "longitude": -68.1456789,
                "priority": "MEDIUM",
            }
        }
    )


class IncidentUpdateRequest(BaseModel):
    service_catalog_id: str | None = None
    title: str | None = Field(default=None, min_length=1, max_length=150)
    description: str | None = None
    latitude: Decimal | None = Field(
        default=None,
        ge=-90,
        le=90,
        examples=[-16.5291234],
        description="Latitud geográfica del incidente.",
    )
    longitude: Decimal | None = Field(
        default=None,
        ge=-180,
        le=180,
        examples=[-68.1456789],
        description="Longitud geográfica del incidente.",
    )
    address_text: str | None = None
    priority: IncidentPriority | None = None


class IncidentStatusChangeRequest(BaseModel):
    status: IncidentStatus


class IncidentCancelRequest(BaseModel):
    cancellation_reason: str | None = Field(
        default=None,
        max_length=500,
        description="Motivo opcional de cancelación.",
        examples=["CUSTOMER_NO_LONGER_NEEDS_SERVICE"],
    )
    cancellation_notes: str | None = Field(
        default=None,
        max_length=1000,
        description="Nota opcional del cliente.",
        examples=["Ya no necesito el servicio."],
    )


class IncidentPublic(BaseModel):
    id: str
    customer_id: str
    vehicle_id: str
    service_catalog_id: str | None = None
    incident_code: str
    title: str
    description: str | None = None
    latitude: Decimal = Field(
        examples=[-16.5291234],
        description="Latitud geográfica del incidente.",
    )
    longitude: Decimal = Field(
        examples=[-68.1456789],
        description="Longitud geográfica del incidente.",
    )
    address_text: str | None = None
    priority: IncidentPriority
    status: IncidentStatus
    reported_at: datetime
    cancelled_at: datetime | None = None
    completed_at: datetime | None = None
    unattended_reason: str | None = None
    unattended_at: datetime | None = None
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class IncidentListData(BaseModel):
    items: list[IncidentPublic]
    pagination: PaginationMeta


class IncidentResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentPublic


class IncidentsResponse(BaseModel):
    success: bool = True
    message: str
    data: IncidentListData
