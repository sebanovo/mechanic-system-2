from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

from app.common.pagination import PaginationMeta

NotificationDeviceStatus = Literal["ACTIVE", "INACTIVE", "REVOKED", "EXPIRED"]
NotificationDevicePlatform = Literal["ANDROID", "IOS", "WEB"]


class NotificationDeviceCreateRequest(BaseModel):
    device_token: str = Field(min_length=1, max_length=2048)
    platform: NotificationDevicePlatform
    device_name: str | None = Field(default=None, max_length=150)
    app_version: str | None = Field(default=None, max_length=40)
    os_version: str | None = Field(default=None, max_length=40)


class NotificationDevicePublic(BaseModel):
    id: str
    user_id: str
    device_token: str
    platform: NotificationDevicePlatform
    device_name: str | None = None
    app_version: str | None = None
    os_version: str | None = None
    status: NotificationDeviceStatus
    last_seen_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class NotificationDeviceListData(BaseModel):
    items: list[NotificationDevicePublic]
    pagination: PaginationMeta


class NotificationDeviceResponse(BaseModel):
    success: bool = True
    message: str
    data: NotificationDevicePublic


class NotificationDevicesResponse(BaseModel):
    success: bool = True
    message: str
    data: NotificationDeviceListData
