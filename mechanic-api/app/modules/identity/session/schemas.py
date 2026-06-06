from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel

from app.common.pagination import PaginationMeta

SessionStatus = Literal["ACTIVE", "EXPIRED", "REVOKED"]
RefreshTokenStatus = Literal["ACTIVE", "USED", "REVOKED", "EXPIRED"]


class SessionPublic(BaseModel):
    id: str
    user_id: str
    tenant_id: str | None = None
    session_status: SessionStatus
    device_type: str | None = None
    device_name: str | None = None
    ip_address: str | None = None
    user_agent: str | None = None
    login_at: datetime
    last_activity_at: datetime | None = None
    expires_at: datetime
    revoked_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class RefreshTokenPublic(BaseModel):
    id: str
    session_id: str
    token_family: str
    status: RefreshTokenStatus
    issued_at: datetime
    expires_at: datetime
    used_at: datetime | None = None
    revoked_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class SessionListData(BaseModel):
    items: list[SessionPublic]
    pagination: PaginationMeta


class SessionResponse(BaseModel):
    success: bool = True
    message: str
    data: SessionPublic


class SessionsResponse(BaseModel):
    success: bool = True
    message: str
    data: SessionListData
