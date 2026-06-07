from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.notification.models import Notification


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class NotificationRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, notification_id: str | UUID) -> Notification | None:
        return self.db.get(Notification, _to_uuid(notification_id, "notification_id"))

    def list_by_user(
        self,
        user_id: str | UUID,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Notification], int]:
        query = select(Notification).where(
            Notification.recipient_user_id == _to_uuid(user_id, "user_id")
        )

        if status is not None:
            query = query.where(Notification.notification_status == status)

        return self._paginate(
            query.order_by(Notification.created_at.desc()),
            limit,
            offset,
        )

    def add(self, notification: Notification) -> Notification:
        self.db.add(notification)
        self.db.flush()
        return notification

    def _paginate(
        self,
        query: Select[tuple[Notification]],
        limit: int,
        offset: int,
    ) -> tuple[list[Notification], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)
