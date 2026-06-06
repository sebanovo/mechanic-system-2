from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel

AvailabilityStatus = Literal["AVAILABLE", "BUSY", "OFFLINE", "ON_BREAK"]


class TechnicianAvailabilityUpsertRequest(BaseModel):
    availability_status: AvailabilityStatus
    available_from: datetime | None = None
    available_until: datetime | None = None


class TechnicianAvailabilityPublic(BaseModel):
    id: str
    technician_id: str
    availability_status: AvailabilityStatus
    available_from: datetime | None = None
    available_until: datetime | None = None
    created_at: datetime
    updated_at: datetime


class TechnicianAvailabilityResponse(BaseModel):
    success: bool = True
    message: str
    data: TechnicianAvailabilityPublic