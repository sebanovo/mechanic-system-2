from __future__ import annotations

from datetime import datetime, timezone

from app.common.exceptions import NotFoundException
from app.common.uuid import to_uuid
from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.notification_device.models import NotificationDevice
from app.modules.notification_device.repository import NotificationDeviceRepository
from app.modules.notification_device.schemas import (
    NotificationDeviceCreateRequest,
)


class NotificationDeviceService(BaseService):
    def __init__(
        self,
        repository: NotificationDeviceRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository

    def list_current_user_devices(
        self,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[NotificationDevice], int]:
        self._ensure_user_context()

        return self.repository.list_by_user(
            self.context.user_id,
            status=self._normalize_status(status),
            limit=limit,
            offset=offset,
        )

    def list_all_devices(
        self,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[NotificationDevice], int]:
        return self.repository.list_all(
            status=self._normalize_status(status),
            limit=limit,
            offset=offset,
        )

    def register_current_user_device(
        self,
        payload: NotificationDeviceCreateRequest,
    ) -> NotificationDevice:
        self._ensure_user_context()
        user_id = to_uuid(self.context.user_id, "user_id")
        device_token = payload.device_token.strip()
        now = datetime.now(timezone.utc)

        device = self.repository.get_by_token(device_token)

        if device is None:
            device = NotificationDevice(
                user_id=user_id,
                device_token=device_token,
                platform=payload.platform.strip().upper(),
                device_name=payload.device_name.strip() if payload.device_name else None,
                app_version=payload.app_version.strip() if payload.app_version else None,
                os_version=payload.os_version.strip() if payload.os_version else None,
                status="ACTIVE",
                last_seen_at=now,
            )
            device = self.repository.add(device)
        else:
            device.user_id = user_id
            device.platform = payload.platform.strip().upper()
            device.device_name = (
                payload.device_name.strip() if payload.device_name else None
            )
            device.app_version = (
                payload.app_version.strip() if payload.app_version else None
            )
            device.os_version = payload.os_version.strip() if payload.os_version else None
            device.status = "ACTIVE"
            device.last_seen_at = now
            self.db.flush()

        self.db.commit()
        self.db.refresh(device)
        return device

    def revoke_current_user_device(self, device_id: str) -> NotificationDevice:
        self._ensure_user_context()
        device = self.repository.get_by_id(device_id)

        if device is None:
            raise NotFoundException("Dispositivo no encontrado.")

        if str(device.user_id) != self.context.user_id:
            raise NotFoundException("Dispositivo no encontrado.")

        device.status = "REVOKED"
        device.last_seen_at = datetime.now(timezone.utc)

        self.db.flush()
        self.db.commit()
        self.db.refresh(device)
        return device

    def revoke_device(self, device_id: str) -> NotificationDevice:
        device = self.repository.get_by_id(device_id)

        if device is None:
            raise NotFoundException("Dispositivo no encontrado.")

        device.status = "REVOKED"
        device.last_seen_at = datetime.now(timezone.utc)

        self.db.flush()
        self.db.commit()
        self.db.refresh(device)
        return device

    def _ensure_user_context(self) -> None:
        if self.context.user_id is None:
            raise NotFoundException("Usuario no encontrado.")

    def _normalize_status(self, status: str | None) -> str | None:
        if status is None:
            return None

        normalized = status.strip().upper()
        return normalized or None
