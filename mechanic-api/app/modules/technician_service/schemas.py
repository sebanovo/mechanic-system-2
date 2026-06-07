from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict

from app.common.pagination import PaginationMeta
from app.modules.identity.technician.schemas import TechnicianPublic
from app.modules.provider_service.schemas import ProviderServiceDetailPublic

TechnicianSkillLevel = Literal["BASIC", "INTERMEDIATE", "ADVANCED", "EXPERT"]


class TechnicianServiceCreateRequest(BaseModel):
    technician_id: str
    provider_service_id: str
    skill_level: TechnicianSkillLevel = "INTERMEDIATE"
    is_enabled: bool = True

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "technician_id": "uuid-del-tecnico",
                "provider_service_id": "uuid-del-servicio-del-proveedor",
                "skill_level": "ADVANCED",
                "is_enabled": True,
            }
        }
    )


class TechnicianServiceUpdateRequest(BaseModel):
    skill_level: TechnicianSkillLevel | None = None
    is_enabled: bool | None = None


class TechnicianServiceStatusChangeRequest(BaseModel):
    is_enabled: bool


class TechnicianServicePublic(BaseModel):
    id: str
    technician_id: str
    provider_service_id: str
    skill_level: TechnicianSkillLevel
    is_enabled: bool
    created_at: datetime
    updated_at: datetime


class TechnicianServiceDetailPublic(BaseModel):
    technician_service: TechnicianServicePublic
    technician: TechnicianPublic
    provider_service: ProviderServiceDetailPublic


class TechnicianServiceListData(BaseModel):
    items: list[TechnicianServiceDetailPublic]
    pagination: PaginationMeta


class TechnicianServiceResponse(BaseModel):
    success: bool = True
    message: str
    data: TechnicianServiceDetailPublic


class TechnicianServicesResponse(BaseModel):
    success: bool = True
    message: str
    data: TechnicianServiceListData