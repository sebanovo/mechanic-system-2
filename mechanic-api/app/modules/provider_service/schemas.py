from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.common.pagination import PaginationMeta
from app.modules.service_catalog.schemas import ServiceCatalogPublic


class ProviderServiceCreateRequest(BaseModel):
    service_catalog_id: str
    custom_min_price: Decimal | None = Field(default=None, ge=0)
    custom_max_price: Decimal | None = Field(default=None, ge=0)

    @model_validator(mode="after")
    def validate_prices(self) -> "ProviderServiceCreateRequest":
        if (
            self.custom_min_price is not None
            and self.custom_max_price is not None
            and self.custom_max_price < self.custom_min_price
        ):
            raise ValueError("El precio máximo no puede ser menor al precio mínimo.")

        return self

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "service_catalog_id": "00000000-0000-0000-0000-000000000000",
                "custom_min_price": 80,
                "custom_max_price": 180,
            }
        }
    )


class ProviderServiceUpdateRequest(BaseModel):
    is_available: bool | None = None
    custom_min_price: Decimal | None = Field(default=None, ge=0)
    custom_max_price: Decimal | None = Field(default=None, ge=0)

    @model_validator(mode="after")
    def validate_prices(self) -> "ProviderServiceUpdateRequest":
        if (
            self.custom_min_price is not None
            and self.custom_max_price is not None
            and self.custom_max_price < self.custom_min_price
        ):
            raise ValueError("El precio máximo no puede ser menor al precio mínimo.")

        return self


class ProviderServiceStatusChangeRequest(BaseModel):
    is_available: bool


class ProviderServicePublic(BaseModel):
    id: str
    provider_profile_id: str
    service_catalog_id: str
    is_available: bool
    custom_min_price: Decimal | None = None
    custom_max_price: Decimal | None = None
    created_at: datetime
    updated_at: datetime


class ProviderServiceDetailPublic(BaseModel):
    provider_service: ProviderServicePublic
    service_catalog: ServiceCatalogPublic


class ProviderServiceListData(BaseModel):
    items: list[ProviderServiceDetailPublic]
    pagination: PaginationMeta


class ProviderServiceResponse(BaseModel):
    success: bool = True
    message: str
    data: ProviderServiceDetailPublic


class ProviderServicesResponse(BaseModel):
    success: bool = True
    message: str
    data: ProviderServiceListData
