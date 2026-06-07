from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.user.models import User
from app.modules.notification_device.models import NotificationDevice


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class NotificationDeviceRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, device_id: str | UUID) -> NotificationDevice | None:
        return self.db.get(NotificationDevice, _to_uuid(device_id, "device_id"))

    def get_by_token(self, device_token: str) -> NotificationDevice | None:
        return self.db.scalar(
            select(NotificationDevice).where(NotificationDevice.device_token == device_token)
        )

    def list_active_by_user(self, user_id: str | UUID) -> list[NotificationDevice]:
        return list(
            self.db.scalars(
                select(NotificationDevice).where(
                    NotificationDevice.user_id == _to_uuid(user_id, "user_id"),
                    NotificationDevice.status == "ACTIVE",
                )
            )
        )

    def list_by_user(
        self,
        user_id: str | UUID,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[NotificationDevice], int]:
        query = select(NotificationDevice).where(
            NotificationDevice.user_id == _to_uuid(user_id, "user_id"),
        )

        if status is not None:
            query = query.where(NotificationDevice.status == status)

        return self._paginate(
            query.order_by(NotificationDevice.created_at.desc()),
            limit,
            offset,
        )

    def list_all(
        self,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[NotificationDevice], int]:
        query = select(NotificationDevice)

        if status is not None:
            query = query.where(NotificationDevice.status == status)

        return self._paginate(
            query.order_by(NotificationDevice.created_at.desc()),
            limit,
            offset,
        )

    def list_active_by_tenant(self, *, tenant_id: str | UUID) -> list[NotificationDevice]:
        tenant_uuid = _to_uuid(tenant_id, "tenant_id")

        query = (
            select(NotificationDevice)
            .join(User, User.id == NotificationDevice.user_id)
            .join(TenantMembership, TenantMembership.user_id == User.id)
            .where(
                TenantMembership.tenant_id == tenant_uuid,
                TenantMembership.deleted_at.is_(None),
                TenantMembership.status == "ACTIVE",
                User.deleted_at.is_(None),
                NotificationDevice.status == "ACTIVE",
            )
        )

        return list(self.db.scalars(query))

    def add(self, device: NotificationDevice) -> NotificationDevice:
        self.db.add(device)
        self.db.flush()
        return device

    def _paginate(
        self,
        query: Select[tuple[NotificationDevice]],
        limit: int,
        offset: int,
    ) -> tuple[list[NotificationDevice], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)
