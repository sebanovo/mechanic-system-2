from __future__ import annotations

from app.modules.notification_device.models import NotificationDevice
from app.modules.notification_device.schemas import NotificationDevicePublic


def notification_device_public(device: NotificationDevice) -> NotificationDevicePublic:
    return NotificationDevicePublic(
        id=str(device.id),
        user_id=str(device.user_id),
        device_token=device.device_token,
        platform=device.platform,  # type: ignore[arg-type]
        device_name=device.device_name,
        app_version=device.app_version,
        os_version=device.os_version,
        status=device.status,  # type: ignore[arg-type]
        last_seen_at=device.last_seen_at,
        created_at=device.created_at,
        updated_at=device.updated_at,
    )
