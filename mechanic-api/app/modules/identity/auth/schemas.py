from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

from app.modules.identity.session.schemas import SessionPublic
from app.modules.identity.user.schemas import UserPublic

TenantKind = Literal["WORKSHOP", "WORKSHOP_NETWORK", "INDEPENDENT_TECHNICIAN"]


class RegisterClientRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)


class RegisterTenantRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    commercial_name: str = Field(min_length=1, max_length=150)
    tenant_kind: TenantKind = "WORKSHOP"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SelectTenantRequest(BaseModel):
    tenant_id: str


class RefreshRequest(BaseModel):
    refresh_token: str | None = None


class TokenPair(BaseModel):
    access_token: str
    access_expires_at: datetime
    refresh_token: str
    refresh_expires_at: datetime
    token_type: str = "bearer"


class AuthTenantPublic(BaseModel):
    id: str
    slug: str
    commercial_name: str
    tenant_kind: str
    status: str


class AuthContext(BaseModel):
    user: UserPublic
    user_type: str
    tenant_id: str | None = None
    current_tenant: AuthTenantPublic | None = None
    available_tenants: list[AuthTenantPublic] = Field(default_factory=list)
    requires_tenant_selection: bool = False
    session: SessionPublic
    tokens: TokenPair | None = None


class AuthResponse(BaseModel):
    success: bool = True
    message: str
    data: AuthContext


class MeResponse(BaseModel):
    success: bool = True
    message: str
    data: AuthContext


class LogoutResponse(BaseModel):
    success: bool = True
    message: str
    data: dict[str, object] = Field(default_factory=dict)
