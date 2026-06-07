from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

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
    event_type: AssignmentTrackingEventType
    latitude: Decimal | None = Field(default=None, ge=-90, le=90)
    longitude: Decimal | None = Field(default=None, ge=-180, le=180)
    notes: str | None = Field(default=None, max_length=1000)
    occurred_at: datetime | None = None

    @model_validator(mode="after")
    def validate_coordinates(self) -> "AssignmentTrackingEventCreateRequest":
        has_latitude = self.latitude is not None
        has_longitude = self.longitude is not None

        if has_latitude != has_longitude:
            raise ValueError("La latitud y longitud deben enviarse juntas.")

        if self.event_type == "LOCATION_UPDATED" and not has_latitude:
            raise ValueError("Un evento de ubicación requiere latitud y longitud.")

        return self

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "event_type": "LOCATION_UPDATED",
                "latitude": -16.5001,
                "longitude": -68.1193,
                "notes": "Técnico avanzando hacia el punto del incidente.",
                "occurred_at": "2026-06-06T20:30:00Z",
            }
        }
    )


class AssignmentTrackingEventPublic(BaseModel):
    id: str
    assignment_id: str
    event_type: AssignmentTrackingEventType
    latitude: Decimal | None = None
    longitude: Decimal | None = None
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