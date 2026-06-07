from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta
from app.modules.identity.provider.schemas import ProviderProfilePublic
from app.modules.identity.technician.schemas import TechnicianPublic
from app.modules.incident.schemas import IncidentPublic
from app.modules.incident_offer.schemas import IncidentOfferPublic

AssignmentStatus = Literal[
    "PENDING",
    "ASSIGNED",
    "EN_ROUTE",
    "ARRIVED",
    "IN_SERVICE",
    "COMPLETED",
    "CANCELLED",
]


class AssignmentCreateRequest(BaseModel):
    offer_id: str
    technician_id: str
    notes: str | None = Field(default=None, max_length=1000)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "offer_id": "uuid-de-oferta-aceptada",
                "technician_id": "uuid-del-tecnico",
                "notes": "Asignación inicial del técnico.",
            }
        }
    )


class AssignmentUpdateRequest(BaseModel):
    technician_id: str | None = None
    notes: str | None = Field(default=None, max_length=1000)


class AssignmentStatusChangeRequest(BaseModel):
    assignment_status: AssignmentStatus


class AssignmentPublic(BaseModel):
    id: str
    incident_id: str
    offer_id: str
    provider_profile_id: str
    technician_id: str
    assignment_status: AssignmentStatus
    notes: str | None = None
    assigned_at: datetime
    started_at: datetime | None = None
    arrived_at: datetime | None = None
    completed_at: datetime | None = None
    cancelled_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class AssignmentDetailPublic(BaseModel):
    assignment: AssignmentPublic
    incident: IncidentPublic
    offer: IncidentOfferPublic
    provider_profile: ProviderProfilePublic
    technician: TechnicianPublic


class AssignmentListData(BaseModel):
    items: list[AssignmentDetailPublic]
    pagination: PaginationMeta


class AssignmentResponse(BaseModel):
    success: bool = True
    message: str
    data: AssignmentDetailPublic


class AssignmentsResponse(BaseModel):
    success: bool = True
    message: str
    data: AssignmentListData