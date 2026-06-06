from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

from app.common.pagination import PaginationMeta

TenantKind = Literal["WORKSHOP", "WORKSHOP_NETWORK", "INDEPENDENT_TECHNICIAN"]
TenantStatus = Literal["ACTIVE", "INACTIVE", "BLOCKED"]


class TenantCreateRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    commercial_name: str = Field(min_length=1, max_length=150)
    tenant_kind: TenantKind


class TenantNetworkCreateRequest(BaseModel):
    commercial_name: str = Field(min_length=1, max_length=150)


class TenantUpdateRequest(BaseModel):
    commercial_name: str | None = Field(default=None, min_length=1, max_length=150)
    slug: str | None = Field(default=None, min_length=1, max_length=120)
    tenant_kind: TenantKind | None = None


class TenantStatusChangeRequest(BaseModel):
    status: TenantStatus


class TenantProfileUpsertRequest(BaseModel):
    legal_name: str | None = Field(default=None, max_length=180)
    tax_identifier: str | None = Field(default=None, max_length=80)
    business_email: EmailStr | None = None
    business_phone: str | None = Field(default=None, max_length=30)
    website_url: str | None = None
    address_line: str | None = Field(default=None, max_length=255)
    city: str | None = Field(default=None, max_length=120)
    state: str | None = Field(default=None, max_length=120)
    country: str | None = Field(default=None, max_length=120)
    latitude: float | None = None
    longitude: float | None = None


class TenantSettingsUpsertRequest(BaseModel):
    default_currency: str = Field(default="BOB", max_length=10)
    default_timezone: str = Field(default="America/La_Paz", max_length=80)
    default_language: str = Field(default="es", max_length=10)


class TenantPublic(BaseModel):
    id: str
    commercial_name: str
    slug: str
    tenant_kind: TenantKind
    status: TenantStatus
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class TenantProfilePublic(BaseModel):
    id: str
    tenant_id: str
    legal_name: str | None = None
    tax_identifier: str | None = None
    business_email: str | None = None
    business_phone: str | None = None
    website_url: str | None = None
    address_line: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = None
    latitude: float | None = None
    longitude: float | None = None
    created_at: datetime
    updated_at: datetime


class TenantSettingsPublic(BaseModel):
    id: str
    tenant_id: str
    default_currency: str
    default_timezone: str
    default_language: str
    created_at: datetime
    updated_at: datetime


class TenantDetailPublic(BaseModel):
    tenant: TenantPublic
    profile: TenantProfilePublic | None = None
    settings: TenantSettingsPublic | None = None


class TenantListData(BaseModel):
    items: list[TenantPublic]
    pagination: PaginationMeta


class TenantResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantPublic


class TenantDetailResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantDetailPublic


class TenantsResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantListData


class TenantProfileResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantProfilePublic


class TenantSettingsResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantSettingsPublic


class CurrentTenantListResponse(BaseModel):
    success: bool = True
    message: str
    data: list[TenantPublic]
