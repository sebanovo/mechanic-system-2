from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field


RealtimeTrackingMessageType = Literal[
    "LOCATION_UPDATED",
    "TECHNICIAN_LOCATION_UPDATED",
    "CONNECTED",
    "ERROR",
]


class RealtimeLocationInput(BaseModel):
    type: Literal["LOCATION_UPDATED"] = "LOCATION_UPDATED"

    latitude: Decimal = Field(ge=-90, le=90)
    longitude: Decimal = Field(ge=-180, le=180)

    heading: Decimal | None = Field(default=None, ge=0, le=360)
    speed_kmh: Decimal | None = Field(default=None, ge=0)


class RealtimeTrackingOutput(BaseModel):
    type: RealtimeTrackingMessageType
    assignment_id: str
    latitude: Decimal | None = None
    longitude: Decimal | None = None
    heading: Decimal | None = None
    speed_kmh: Decimal | None = None
    occurred_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    message: str | None = None
