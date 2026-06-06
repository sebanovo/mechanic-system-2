from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.common.pagination import PaginationMeta


class ServiceCatalogCreateRequest(BaseModel):
    service_code: str = Field(min_length=1, max_length=100)
    service_name: str = Field(min_length=1, max_length=150)
    description: str | None = None
    category: str = Field(min_length=1, max_length=80)
    min_price: Decimal | None = Field(default=None, ge=0)
    max_price: Decimal | None = Field(default=None, ge=0)
    min_duration_minutes: int | None = Field(default=None, gt=0)
    max_duration_minutes: int | None = Field(default=None, gt=0)
    is_active: bool = True

    @model_validator(mode="after")
    def validate_ranges(self) -> "ServiceCatalogCreateRequest":
        if (
            self.min_price is not None
            and self.max_price is not None
            and self.max_price < self.min_price
        ):
            raise ValueError("El precio máximo no puede ser menor al precio mínimo.")

        if (
            self.min_duration_minutes is not None
            and self.max_duration_minutes is not None
            and self.max_duration_minutes < self.min_duration_minutes
        ):
            raise ValueError("La duración máxima no puede ser menor a la duración mínima.")

        return self

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "service_code": "OIL_CHANGE",
                "service_name": "Cambio de aceite",
                "description": "Cambio de aceite de motor y revisión básica.",
                "category": "Mantenimiento",
                "min_price": 80,
                "max_price": 180,
                "min_duration_minutes": 30,
                "max_duration_minutes": 60,
                "is_active": True,
            }
        }
    )


class ServiceCatalogUpdateRequest(BaseModel):
    service_name: str | None = Field(default=None, min_length=1, max_length=150)
    description: str | None = None
    category: str | None = Field(default=None, min_length=1, max_length=80)
    min_price: Decimal | None = Field(default=None, ge=0)
    max_price: Decimal | None = Field(default=None, ge=0)
    min_duration_minutes: int | None = Field(default=None, gt=0)
    max_duration_minutes: int | None = Field(default=None, gt=0)
    is_active: bool | None = None

    @model_validator(mode="after")
    def validate_ranges(self) -> "ServiceCatalogUpdateRequest":
        if (
            self.min_price is not None
            and self.max_price is not None
            and self.max_price < self.min_price
        ):
            raise ValueError("El precio máximo no puede ser menor al precio mínimo.")

        if (
            self.min_duration_minutes is not None
            and self.max_duration_minutes is not None
            and self.max_duration_minutes < self.min_duration_minutes
        ):
            raise ValueError("La duración máxima no puede ser menor a la duración mínima.")

        return self


class ServiceCatalogStatusChangeRequest(BaseModel):
    is_active: bool


class ServiceCatalogPublic(BaseModel):
    id: str
    service_code: str
    service_name: str
    description: str | None = None
    category: str
    min_price: Decimal | None = None
    max_price: Decimal | None = None
    min_duration_minutes: int | None = None
    max_duration_minutes: int | None = None
    is_active: bool
    created_at: datetime
    updated_at: datetime


class ServiceCatalogListData(BaseModel):
    items: list[ServiceCatalogPublic]
    pagination: PaginationMeta


class ServiceCatalogResponse(BaseModel):
    success: bool = True
    message: str
    data: ServiceCatalogPublic


class ServiceCatalogsResponse(BaseModel):
    success: bool = True
    message: str
    data: ServiceCatalogListData