from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.common.pagination import PaginationMeta
from app.modules.identity.user.schemas import UserPublic

TechnicianStatus = Literal["ACTIVE", "INACTIVE", "BLOCKED"]


class TechnicianCreateRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "email": "tech@example.com",
                "password": "Secret1234",
                "first_name": "Ada",
                "last_name": "Lovelace",
            }
        }
    )


class TechnicianStatusChangeRequest(BaseModel):
    status: TechnicianStatus


class TechnicianPublic(BaseModel):
    id: str
    provider_profile_id: str
    user_id: str
    technician_code: str
    status: TechnicianStatus
    average_rating: float
    total_reviews: int
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class TechnicianDetailPublic(BaseModel):
    technician: TechnicianPublic
    user: UserPublic

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "technician": {
                    "id": "6b2d2c2d-2f2c-4d0b-a1c2-8d3f9f3d2a11",
                    "provider_profile_id": "0f1b8e7f-8cc4-4bdb-8f57-1c2d6fd3bb11",
                    "user_id": "91ac4d6f-7db1-4e42-8fd1-7f1f0a7b3a22",
                    "technician_code": "TECH-ABCDEF123456",
                    "status": "ACTIVE",
                    "average_rating": 0.0,
                    "total_reviews": 0,
                    "created_at": "2026-06-06T12:00:00Z",
                    "updated_at": "2026-06-06T12:00:00Z",
                    "deleted_at": None,
                },
                "user": {
                    "id": "91ac4d6f-7db1-4e42-8fd1-7f1f0a7b3a22",
                    "email": "tech@example.com",
                    "first_name": "Ada",
                    "last_name": "Lovelace",
                    "phone": None,
                    "avatar_url": None,
                    "user_type": "TECHNICIAN",
                    "status": "ACTIVE",
                    "email_verified": False,
                    "email_verified_at": None,
                    "last_login_at": None,
                    "password_changed_at": "2026-06-06T12:00:00Z",
                    "created_at": "2026-06-06T12:00:00Z",
                    "updated_at": "2026-06-06T12:00:00Z",
                    "deleted_at": None,
                },
            }
        }
    )


class TechnicianListData(BaseModel):
    items: list[TechnicianDetailPublic]
    pagination: PaginationMeta


class TechnicianResponse(BaseModel):
    success: bool = True
    message: str
    data: TechnicianDetailPublic

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Técnico creado correctamente.",
                "data": TechnicianDetailPublic.model_config["json_schema_extra"]["example"],
            }
        }
    )


class TechniciansResponse(BaseModel):
    success: bool = True
    message: str
    data: TechnicianListData
