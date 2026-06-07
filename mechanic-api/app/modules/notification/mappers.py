from __future__ import annotations

from app.modules.notification.models import Notification
from app.modules.notification.schemas import NotificationPublic


def notification_public(notification: Notification) -> NotificationPublic:
    return NotificationPublic(
        id=str(notification.id),
        recipient_user_id=str(notification.recipient_user_id),
        tenant_id=str(notification.tenant_id) if notification.tenant_id is not None else None,
        notification_type=notification.notification_type,
        title=notification.title,
        body=notification.body,
        data=notification.data,
        notification_status=notification.notification_status,  # type: ignore[arg-type]
        provider_message_id=notification.provider_message_id,
        error_message=notification.error_message,
        sent_at=notification.sent_at,
        read_at=notification.read_at,
        created_at=notification.created_at,
        updated_at=notification.updated_at,
    )
