from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.notification_device.models import NotificationDevice


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class NotificationDeviceRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_active_by_user(self, user_id: str | UUID) -> list[NotificationDevice]:
        return list(
            self.db.scalars(
                select(NotificationDevice).where(
                    NotificationDevice.user_id == _to_uuid(user_id, "user_id"),
                    NotificationDevice.status == "ACTIVE",
                )
            )
        )
