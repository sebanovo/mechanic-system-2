from __future__ import annotations

from datetime import datetime
from typing import Any
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from app.common.pagination import PaginationMeta

NotificationStatus = Literal["PENDING", "SENT", "FAILED", "READ"]


class NotificationCreateRequest(BaseModel):
    recipient_user_id: str
    tenant_id: str | None = None
    notification_type: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=160)
    body: str = Field(min_length=1, max_length=500)
    data: dict[str, Any] = Field(default_factory=dict)


class NotificationSendRequest(BaseModel):
    recipient_user_id: str
    tenant_id: str | None = None
    notification_type: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=160)
    body: str = Field(min_length=1, max_length=500)
    data: dict[str, Any] = Field(default_factory=dict)
    push_data: dict[str, str] | None = None


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

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "id": "7d65e41f-8c6c-4f46-9d2f-2df2a1f8d111",
                "recipient_user_id": "2d0a1f91-7a6b-4b6e-8e62-1b1f4dfc9c02",
                "tenant_id": "5c64d8db-9a73-4c1a-bc45-5f2d0f5f2a11",
                "notification_type": "INCIDENT_OFFER_CREATED",
                "title": "Nueva solicitud urgente",
                "body": "Servicio: Cambio de pastillas de freno. Prioridad: Alta. Cliente a 3.2 km de tu taller.",
                "data": {
                    "type": "INCIDENT_OFFER_CREATED",
                    "action_context": "INCIDENT_OFFER",
                    "incident_code": "INC-20260607-0001",
                    "incident_title": "Cambio de pastillas de freno",
                    "incident_priority": "HIGH",
                    "service_name": "Cambio de pastillas de freno",
                    "customer_name": "Juan Pérez",
                    "vehicle_label": "Toyota Corolla 2018",
                    "vehicle_plate": "ABC-1234",
                    "address_text": "Av. Busch, La Paz",
                    "probable_problem": "Frenos con desgaste avanzado",
                    "estimated_min_price": "250.00",
                    "estimated_max_price": "420.00",
                    "estimated_min_duration_minutes": 40,
                    "estimated_max_duration_minutes": 90,
                    "actions": {
                        "view": {
                            "method": "GET",
                            "url": "/api/tenants/current/offers/offer-uuid",
                        },
                        "accept": {
                            "method": "PATCH",
                            "url": "/api/tenants/current/offers/offer-uuid/accept",
                        },
                        "reject": {
                            "method": "PATCH",
                            "url": "/api/tenants/current/offers/offer-uuid/reject",
                        },
                    },
                },
                "notification_status": "SENT",
                "provider_message_id": "msg-123",
                "error_message": None,
                "sent_at": "2026-06-07T10:15:00Z",
                "read_at": None,
                "created_at": "2026-06-07T10:14:58Z",
                "updated_at": "2026-06-07T10:15:00Z",
            }
        }
    )


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
