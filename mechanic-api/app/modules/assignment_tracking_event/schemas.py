from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta
from app.modules.assignment.schemas import AssignmentPublic

AssignmentTrackingEventType = Literal[
    "ASSIGNED",
    "EN_ROUTE",
    "LOCATION_UPDATED",
    "ARRIVED",
    "SERVICE_STARTED",
    "SERVICE_COMPLETED",
    "CANCELLED",
    "NOTE",
]


class AssignmentTrackingEventCreateRequest(BaseModel):
    event_type: AssignmentTrackingEventType = Field(
        description=(
            "Evento operativo de la asignación. "
            "EN_ROUTE, ARRIVED, SERVICE_STARTED, SERVICE_COMPLETED y CANCELLED "
            "actualizan assignment_status e incident.status. "
            "LOCATION_UPDATED solo registra coordenadas. NOTE solo registra una observación."
        )
    )
    latitude: Decimal = Field(
        ge=-90,
        le=90,
        examples=[-16.5291234],
        description="Latitud actual del técnico. Obligatoria para todos los eventos.",
    )
    longitude: Decimal = Field(
        ge=-180,
        le=180,
        examples=[-68.1456789],
        description="Longitud actual del técnico. Obligatoria para todos los eventos.",
    )
    notes: str | None = Field(
        default=None,
        max_length=1000,
        description=(
            "Nota opcional. Si no se envía, el backend genera una nota automática "
            "según el tipo de evento."
        ),
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "event_type": "EN_ROUTE",
                "latitude": -16.5291234,
                "longitude": -68.1456789,
                "notes": "El técnico inició ruta hacia el cliente.",
            },
            "examples": [
                {
                    "event_type": "EN_ROUTE",
                    "latitude": -16.5291234,
                    "longitude": -68.1456789,
                    "notes": "El técnico inició ruta hacia el cliente.",
                },
                {
                    "event_type": "ARRIVED",
                    "latitude": -16.5291234,
                    "longitude": -68.1456789,
                },
                {
                    "event_type": "SERVICE_STARTED",
                    "latitude": -16.5291234,
                    "longitude": -68.1456789,
                },
                {
                    "event_type": "SERVICE_COMPLETED",
                    "latitude": -16.5291234,
                    "longitude": -68.1456789,
                    "notes": "Se realizó el servicio correctamente.",
                },
                {
                    "event_type": "LOCATION_UPDATED",
                    "latitude": -16.5291234,
                    "longitude": -68.1456789,
                },
                {
                    "event_type": "CANCELLED",
                    "latitude": -16.5291234,
                    "longitude": -68.1456789,
                    "notes": "No fue posible continuar con la atención.",
                },
            ]
        }
    )


class AssignmentTrackingEventPublic(BaseModel):
    id: str
    assignment_id: str
    event_type: AssignmentTrackingEventType
    latitude: Decimal | None = Field(
        default=None,
        examples=[-16.5291234],
        description="Latitud capturada para el evento.",
    )
    longitude: Decimal | None = Field(
        default=None,
        examples=[-68.1456789],
        description="Longitud capturada para el evento.",
    )
    notes: str | None = None
    occurred_at: datetime
    created_at: datetime
    updated_at: datetime


class AssignmentTrackingEventDetailPublic(BaseModel):
    tracking_event: AssignmentTrackingEventPublic
    assignment: AssignmentPublic


class AssignmentTrackingEventListData(BaseModel):
    items: list[AssignmentTrackingEventDetailPublic]
    pagination: PaginationMeta


class AssignmentTrackingEventResponse(BaseModel):
    success: bool = True
    message: str
    data: AssignmentTrackingEventDetailPublic


class AssignmentTrackingEventsResponse(BaseModel):
    success: bool = True
    message: str
    data: AssignmentTrackingEventListData
