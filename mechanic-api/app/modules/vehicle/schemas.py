from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.contracts import ApiResponse
from app.common.pagination import PaginationMeta
from app.modules.identity.customer.schemas import CustomerDetailPublic

VehicleType = Literal["CAR", "MOTORCYCLE", "TRUCK", "VAN", "SUV", "OTHER"]
VehicleStatus = Literal["ACTIVE", "INACTIVE"]


class VehicleCreateRequest(BaseModel):
    plate_number: str = Field(min_length=1, max_length=30)
    vehicle_type: VehicleType
    brand: str | None = Field(default=None, max_length=80)
    model: str | None = Field(default=None, max_length=80)
    year: int | None = Field(default=None, ge=1900, le=2100)
    color: str | None = Field(default=None, max_length=50)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "plate_number": "ABC123",
                "vehicle_type": "CAR",
                "brand": "Toyota",
                "model": "Corolla",
                "year": 2020,
                "color": "Blanco",
            }
        }
    )


class VehicleUpdateRequest(BaseModel):
    plate_number: str | None = Field(default=None, min_length=1, max_length=30)
    vehicle_type: VehicleType | None = None
    brand: str | None = Field(default=None, max_length=80)
    model: str | None = Field(default=None, max_length=80)
    year: int | None = Field(default=None, ge=1900, le=2100)
    color: str | None = Field(default=None, max_length=50)


class VehicleStatusChangeRequest(BaseModel):
    status: VehicleStatus


class VehiclePublic(BaseModel):
    id: str
    customer_id: str
    plate_number: str
    brand: str | None = None
    model: str | None = None
    year: int | None = None
    color: str | None = None
    vehicle_type: VehicleType
    status: VehicleStatus
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class VehicleListData(BaseModel):
    items: list[VehiclePublic]
    pagination: PaginationMeta


class VehicleResponse(ApiResponse[VehiclePublic]):
    pass


class VehicleDetailPublic(BaseModel):
    vehicle: VehiclePublic
    customer: CustomerDetailPublic

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "vehicle": {
                    "id": "3f7d7d7b-0d10-4a56-8c8d-5eb2c8f2a111",
                    "customer_id": "8e4b7dbf-2c4f-4b1d-9e12-31c6d8a9c222",
                    "plate_number": "ABC123",
                    "brand": "Toyota",
                    "model": "Corolla",
                    "year": 2020,
                    "color": "Blanco",
                    "vehicle_type": "CAR",
                    "status": "ACTIVE",
                    "created_at": "2026-06-06T07:30:00Z",
                    "updated_at": "2026-06-06T07:30:00Z",
                    "deleted_at": None,
                },
                "customer": {
                    "customer": {
                        "id": "8e4b7dbf-2c4f-4b1d-9e12-31c6d8a9c222",
                        "user_id": "91d2f7dd-9aa4-4d9e-9b41-4f7b2f36b333",
                        "customer_code": "CUST-0001",
                        "status": "ACTIVE",
                        "created_at": "2026-06-06T07:20:00Z",
                        "updated_at": "2026-06-06T07:20:00Z",
                        "deleted_at": None,
                    },
                    "user": {
                        "id": "91d2f7dd-9aa4-4d9e-9b41-4f7b2f36b333",
                        "email": "cliente@ejemplo.com",
                        "first_name": "Juan",
                        "last_name": "Perez",
                        "phone": None,
                        "avatar_url": None,
                        "user_type": "CLIENT",
                        "status": "ACTIVE",
                        "email_verified": True,
                        "email_verified_at": "2026-06-06T07:20:00Z",
                        "last_login_at": "2026-06-06T07:25:00Z",
                        "password_changed_at": "2026-06-06T07:20:00Z",
                        "created_at": "2026-06-06T07:20:00Z",
                        "updated_at": "2026-06-06T07:25:00Z",
                        "deleted_at": None,
                    },
                },
            }
        }
    )


class VehicleDetailResponse(ApiResponse[VehicleDetailPublic]):
    pass


class VehiclesResponse(ApiResponse[VehicleListData]):
    pass
