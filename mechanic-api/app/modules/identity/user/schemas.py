from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field

from app.common.pagination import PaginationMeta

UserType = Literal["SUPERADMIN", "TENANT_OWNER", "TECHNICIAN", "CLIENT"]
UserStatus = Literal["ACTIVE", "INACTIVE", "BLOCKED", "PENDING_VERIFICATION"]


class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    user_type: UserType = "CLIENT"


class UserUpdateRequest(BaseModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=100)
    last_name: str | None = Field(default=None, min_length=1, max_length=100)
    phone: str | None = Field(default=None, max_length=30)
    avatar_url: str | None = None


class UserTypeChangeRequest(BaseModel):
    user_type: UserType


class UserStatusChangeRequest(BaseModel):
    status: UserStatus


class UserPasswordChangeRequest(BaseModel):
    new_password: str = Field(min_length=8, max_length=128)


class UserPublic(BaseModel):
    id: str
    email: EmailStr
    first_name: str
    last_name: str
    phone: str | None = None
    avatar_url: str | None = None
    user_type: UserType
    status: UserStatus
    email_verified: bool
    email_verified_at: datetime | None = None
    last_login_at: datetime | None = None
    password_changed_at: datetime | None = None
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None = None


class UserListData(BaseModel):
    items: list[UserPublic]
    pagination: PaginationMeta


class UserResponse(BaseModel):
    success: bool = True
    message: str
    data: UserPublic


class UsersResponse(BaseModel):
    success: bool = True
    message: str
    data: UserListData
