from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel

from app.common.pagination import PaginationMeta

AuditScope = Literal["PLATFORM", "TENANT"]
AuditActorType = Literal["USER", "SYSTEM", "SUPERADMIN", "TENANT_OWNER", "TECHNICIAN", "CLIENT"]


class AuditEventPublic(BaseModel):
    id: str
    tenant_id: str | None = None
    user_id: str | None = None
    scope: AuditScope
    actor_type: AuditActorType
    event_type: str
    resource_type: str
    resource_id: str | None = None
    event_data: dict | None = None
    ip_address: str | None = None
    user_agent: str | None = None
    created_at: datetime
    updated_at: datetime


class AuditEventListData(BaseModel):
    items: list[AuditEventPublic]
    pagination: PaginationMeta


class AuditEventResponse(BaseModel):
    success: bool = True
    message: str
    data: AuditEventPublic


class AuditEventsResponse(BaseModel):
    success: bool = True
    message: str
    data: AuditEventListData
