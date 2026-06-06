from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel

from app.common.pagination import PaginationMeta
from app.modules.identity.user.schemas import UserPublic

MembershipStatus = Literal["ACTIVE", "INACTIVE", "SUSPENDED"]


class TenantMembershipStatusChangeRequest(BaseModel):
    status: MembershipStatus


class TenantMembershipPublic(BaseModel):
    id: str
    tenant_id: str
    user_id: str
    status: MembershipStatus
    joined_at: datetime
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class TenantMembershipDetailPublic(BaseModel):
    membership: TenantMembershipPublic
    user: UserPublic


class TenantMembershipListData(BaseModel):
    items: list[TenantMembershipDetailPublic]
    pagination: PaginationMeta


class TenantMembershipResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantMembershipPublic


class TenantMembershipsResponse(BaseModel):
    success: bool = True
    message: str
    data: TenantMembershipListData
