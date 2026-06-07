from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

from app.common.pagination import PaginationMeta

NotificationStatus = Literal["PENDING", "SENT", "FAILED", "READ"]


class NotificationCreateRequest(BaseModel):
    recipient_user_id: str
    tenant_id: str | None = None
    notification_type: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=160)
    body: str = Field(min_length=1, max_length=500)
    data: dict[str, str] = Field(default_factory=dict)


class NotificationSendRequest(BaseModel):
    recipient_user_id: str
    tenant_id: str | None = None
    notification_type: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=160)
    body: str = Field(min_length=1, max_length=500)
    data: dict[str, str] = Field(default_factory=dict)


class NotificationPublic(BaseModel):
    id: str
    recipient_user_id: str
    tenant_id: str | None = None
    notification_type: str
    title: str
    body: str
    data: dict | None = None
    notification_status: NotificationStatus
    provider_message_id: str | None = None
    error_message: str | None = None
    sent_at: datetime | None = None
    read_at: datetime | None = None
    created_at: datetime
    updated_at: datetime


class NotificationListData(BaseModel):
    items: list[NotificationPublic]
    pagination: PaginationMeta


class NotificationBulkActionData(BaseModel):
    updated_count: int


class NotificationResponse(BaseModel):
    success: bool = True
    message: str
    data: NotificationPublic


class NotificationBulkActionResponse(BaseModel):
    success: bool = True
    message: str
    data: NotificationBulkActionData


class NotificationsResponse(BaseModel):
    success: bool = True
    message: str
    data: NotificationListData
