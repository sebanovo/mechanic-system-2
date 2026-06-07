from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from app.common.exceptions import NotFoundException
from app.common.uuid import optional_uuid, to_uuid
from app.core.context import RequestContext
from app.core.notifications.dispatcher import NotificationDispatcher
from app.core.notifications.schemas import PushNotificationPayload
from app.core.services.base import BaseService
from app.modules.identity.user.repository import UserRepository
from app.modules.notification.models import Notification
from app.modules.notification.repository import NotificationRepository
from app.modules.notification.schemas import (
    NotificationCreateRequest,
    NotificationSendRequest,
)
from app.modules.notification_device.repository import NotificationDeviceRepository


class NotificationService(BaseService):
    def __init__(
        self,
        repository: NotificationRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository
        self.user_repository = UserRepository(self.db)
        self.device_repository = NotificationDeviceRepository(self.db)

    def list_current_user(
        self,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Notification], int]:
        if self.context.user_id is None:
            raise NotFoundException("Usuario no encontrado.")

        return self.repository.list_by_user(
            self.context.user_id,
            status=self._normalize_upper(status),
            audience=self._normalize_upper(self.context.actor_type),
            limit=limit,
            offset=offset,
        )

    def create_and_send(self, payload: NotificationCreateRequest) -> Notification:
        return self._create_and_send_internal(
            recipient_user_id=payload.recipient_user_id,
            tenant_id=payload.tenant_id,
            notification_type=payload.notification_type,
            title=payload.title,
            body=payload.body,
            data=payload.data,
        )

    def send(
        self,
        payload: NotificationSendRequest,
    ) -> Notification:
        return self._create_and_send_internal(
            recipient_user_id=payload.recipient_user_id,
            tenant_id=payload.tenant_id,
            notification_type=payload.notification_type,
            title=payload.title,
            body=payload.body,
            data=payload.data,
            push_data=payload.push_data,
        )

    def _create_and_send_internal(
        self,
        *,
        recipient_user_id: str,
        tenant_id: str | None,
        notification_type: str,
        title: str,
        body: str,
        data: dict[str, Any],
        push_data: dict[str, str] | None = None,
    ) -> Notification:
        user = self.user_repository.get_by_id(recipient_user_id)

        if user is None or user.deleted_at is not None:
            raise NotFoundException("Usuario destinatario no encontrado.")

        notification = Notification(
            recipient_user_id=to_uuid(recipient_user_id, "recipient_user_id"),
            tenant_id=optional_uuid(tenant_id, "tenant_id"),
            notification_type=notification_type.strip().upper(),
            title=title.strip(),
            body=body.strip(),
            data=data,
            notification_status="PENDING",
            provider_message_id=None,
            error_message=None,
            sent_at=None,
            read_at=None,
        )

        notification = self.repository.add(notification)
        self.db.commit()
        self.db.refresh(notification)

        devices = self.device_repository.list_active_by_user(recipient_user_id)

        try:
            message_ids: list[str] = []

            if devices:
                push_payload_data = push_data or self._stringify_push_data(data)

                for device in devices:
                    message_id = NotificationDispatcher().send_push(
                        PushNotificationPayload(
                            token=device.device_token,
                            title=notification.title,
                            body=notification.body,
                            data={
                                **push_payload_data,
                                "notification_id": str(notification.id),
                                "notification_type": notification.notification_type,
                            },
                        )
                    )

                    if message_id is not None:
                        message_ids.append(message_id)

            notification.notification_status = "SENT"
            notification.provider_message_id = (
                ",".join(message_ids) if message_ids else None
            )
            notification.sent_at = datetime.now(timezone.utc)

        except Exception as exc:
            notification.notification_status = "FAILED"
            notification.error_message = str(exc)

        self.db.commit()
        self.db.refresh(notification)

        return notification

    def mark_as_read(self, notification_id: str) -> Notification:
        if self.context.user_id is None:
            raise NotFoundException("Notificación no encontrada.")

        notification = self.repository.get_by_id(notification_id)

        if notification is None:
            raise NotFoundException("Notificación no encontrada.")

        if str(notification.recipient_user_id) != self.context.user_id:
            raise NotFoundException("Notificación no encontrada.")

        if not self._is_visible_to_current_user(notification):
            raise NotFoundException("Notificación no encontrada.")

        notification.notification_status = "READ"
        notification.read_at = datetime.now(timezone.utc)

        self.db.flush()
        self.db.commit()
        self.db.refresh(notification)

        return notification

    def mark_all_as_read(self) -> int:
        if self.context.user_id is None:
            raise NotFoundException("Notificación no encontrada.")

        notifications = self.repository.list_unread_by_user_and_audience(
            self.context.user_id,
            audience=self._normalize_upper(self.context.actor_type),
        )

        updated_count = 0
        now = datetime.now(timezone.utc)

        for notification in notifications:
            notification.notification_status = "READ"
            notification.read_at = now
            updated_count += 1

        self.db.flush()
        self.db.commit()

        return updated_count

    def _normalize_upper(self, value: str | None) -> str | None:
        if value is None:
            return None

        normalized = value.strip().upper()
        return normalized or None

    def _stringify_push_data(self, data: dict[str, Any]) -> dict[str, str]:
        push_data: dict[str, str] = {}

        for key, value in data.items():
            if value is None:
                continue

            if isinstance(value, (dict, list)):
                continue

            push_data[str(key)] = str(value)

        return push_data

    def _is_visible_to_current_user(self, notification: Notification) -> bool:
        if self.context.actor_type is None:
            return True

        data = notification.data or {}
        audience = data.get("audience")

        if audience is None:
            return True

        normalized_audience = self._normalize_upper(str(audience))
        current_audience = self._normalize_upper(self.context.actor_type)

        return normalized_audience in {current_audience, "ALL"}
