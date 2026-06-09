from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


RealtimeTrackingMessageType = Literal[
    "LOCATION_UPDATED",
    "TECHNICIAN_LOCATION_UPDATED",
    "CONNECTED",
    "ERROR",
]


class RealtimeLocationInput(BaseModel):
    type: Literal["LOCATION_UPDATED"] = "LOCATION_UPDATED"

    latitude: Decimal = Field(
        ge=-90,
        le=90,
        examples=[-16.5291234],
        description="Latitud actual del técnico.",
    )
    longitude: Decimal = Field(
        ge=-180,
        le=180,
        examples=[-68.1456789],
        description="Longitud actual del técnico.",
    )

    heading: Decimal | None = Field(default=None, ge=0, le=360)
    speed_kmh: Decimal | None = Field(default=None, ge=0)


class RealtimeTrackingOutput(BaseModel):
    type: RealtimeTrackingMessageType
    assignment_id: str
    latitude: Decimal | None = Field(
        default=None,
        examples=[-16.5291234],
        description="Latitud del evento en tiempo real.",
    )
    longitude: Decimal | None = Field(
        default=None,
        examples=[-68.1456789],
        description="Longitud del evento en tiempo real.",
    )
    heading: Decimal | None = None
    speed_kmh: Decimal | None = None
    occurred_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    message: str | None = None


class RealtimeTrackingOriginPublic(BaseModel):
    type: str
    latitude: Decimal | None = Field(
        default=None,
        examples=[-16.5291234],
        description="Latitud del punto de origen.",
    )
    longitude: Decimal | None = Field(
        default=None,
        examples=[-68.1456789],
        description="Longitud del punto de origen.",
    )
    address_text: str | None = None
    occurred_at: datetime | None = None


class RealtimeTrackingDestinationPublic(BaseModel):
    type: str
    latitude: Decimal | None = Field(
        default=None,
        examples=[-16.5345678],
        description="Latitud del punto de destino.",
    )
    longitude: Decimal | None = Field(
        default=None,
        examples=[-68.1389012],
        description="Longitud del punto de destino.",
    )
    address_text: str | None = None
    occurred_at: datetime | None = None


class RealtimeTrackingWebSocketPublic(BaseModel):
    url: str
    events: list[str]


class RealtimeTrackingMapsPublic(BaseModel):
    provider: str
    travel_mode: str
    frontend_calculates_eta: bool


class RealtimeTrackingActorPublic(BaseModel):
    id: str
    name: str
    phone: str | None = None


class RealtimeTrackingSessionPublic(BaseModel):
    assignment_id: str
    incident_id: str
    assignment_status: str
    incident_status: str
    technician: RealtimeTrackingActorPublic | None = None
    customer: RealtimeTrackingActorPublic | None = None
    origin: RealtimeTrackingOriginPublic
    destination: RealtimeTrackingDestinationPublic
    websocket: RealtimeTrackingWebSocketPublic
    maps: RealtimeTrackingMapsPublic


class TrackingSessionResponse(BaseModel):
    success: bool = True
    message: str
    data: RealtimeTrackingSessionPublic

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Sesión de tracking obtenida correctamente.",
                "data": {
                    "assignment_id": "assignment-uuid",
                    "incident_id": "incident-uuid",
                    "assignment_status": "EN_ROUTE",
                    "incident_status": "EN_ROUTE",
                    "technician": {
                        "id": "user-id",
                        "name": "Carlos Rojas",
                        "phone": "76543210",
                    },
                    "customer": {
                        "id": "user-id",
                        "name": "Juan Pérez",
                        "phone": "71234567",
                    },
                    "origin": {
                        "type": "TECHNICIAN_CURRENT_LOCATION",
                        "latitude": -16.5291234,
                        "longitude": -68.1456789,
                        "address_text": None,
                        "occurred_at": "2026-06-07T23:00:00Z",
                    },
                    "destination": {
                        "type": "INCIDENT_LOCATION",
                        "latitude": -16.5345678,
                        "longitude": -68.1389012,
                        "address_text": "Av. Busch, La Paz",
                        "occurred_at": None,
                    },
                    "websocket": {
                        "url": "/ws/assignments/assignment-uuid/tracking",
                        "events": [
                            "TECHNICIAN_LOCATION_UPDATED",
                            "ASSIGNMENT_STATUS_CHANGED",
                            "TECHNICIAN_CONNECTED",
                            "TECHNICIAN_DISCONNECTED",
                        ],
                    },
                    "maps": {
                        "provider": "GOOGLE_MAPS",
                        "travel_mode": "DRIVING",
                        "frontend_calculates_eta": True,
                    },
                },
            }
        }
    )
