from __future__ import annotations

from app.core.config import settings
from app.core.notifications.firebase_client import FirebasePushClient
from app.core.notifications.schemas import PushNotificationPayload


class NotificationDispatcher:
    def __init__(self) -> None:
        self.firebase_client = (
            FirebasePushClient() if settings.notifications_push_enabled else None
        )

    def send_push(self, payload: PushNotificationPayload) -> str | None:
        if not settings.notifications_push_enabled:
            return None

        if settings.notifications_provider != "FIREBASE":
            raise RuntimeError("Proveedor de notificaciones no soportado.")

        if self.firebase_client is None:
            self.firebase_client = FirebasePushClient()

        return self.firebase_client.send(payload)
