from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.membership.models import TenantMembership
from app.modules.identity.user.models import User


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class TenantMembershipRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, membership_id: str | UUID) -> TenantMembership | None:
        return self.db.get(TenantMembership, _to_uuid(membership_id, "membership_id"))

    def get_by_tenant_and_user(
        self,
        *,
        tenant_id: str | UUID,
        user_id: str | UUID,
        include_deleted: bool = False,
    ) -> TenantMembership | None:
        query = select(TenantMembership).where(
            TenantMembership.tenant_id == _to_uuid(tenant_id),
            TenantMembership.user_id == _to_uuid(user_id),
        )

        if not include_deleted:
            query = query.where(TenantMembership.deleted_at.is_(None))

        return self.db.scalar(query)

    def list_by_tenant(
        self,
        tenant_id: str | UUID,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[TenantMembership], int]:
        query = select(TenantMembership).where(
            TenantMembership.tenant_id == _to_uuid(tenant_id),
            TenantMembership.deleted_at.is_(None),
        )

        if status is not None:
            query = query.where(TenantMembership.status == status)

        return self._paginate(
            query.order_by(TenantMembership.created_at.desc()),
            limit,
            offset,
        )

    def list_by_tenant_with_users(
        self,
        tenant_id: str | UUID,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[TenantMembership, User]], int]:
        query = (
            select(TenantMembership, User)
            .join(User, User.id == TenantMembership.user_id)
            .where(
                TenantMembership.tenant_id == _to_uuid(tenant_id),
                TenantMembership.deleted_at.is_(None),
                User.deleted_at.is_(None),
            )
        )

        if status is not None:
            query = query.where(TenantMembership.status == status)

        return self._paginate_with_users(
            query.order_by(TenantMembership.created_at.desc()),
            limit,
            offset,
        )

    def list_by_user(
        self,
        user_id: str | UUID,
        *,
        status: str | None = None,
    ) -> list[TenantMembership]:
        query = select(TenantMembership).where(
            TenantMembership.user_id == _to_uuid(user_id),
            TenantMembership.deleted_at.is_(None),
        )

        if status is not None:
            query = query.where(TenantMembership.status == status)

        return list(self.db.scalars(query.order_by(TenantMembership.created_at.desc())))

    def add(self, membership: TenantMembership) -> TenantMembership:
        self.db.add(membership)
        self.db.flush()
        return membership

    def _paginate(
        self,
        query: Select[tuple[TenantMembership]],
        limit: int,
        offset: int,
    ) -> tuple[list[TenantMembership], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)

    def _paginate_with_users(
        self,
        query: Select[tuple[TenantMembership, User]],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[TenantMembership, User]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1]) for row in rows], int(total or 0)
