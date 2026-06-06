from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.common.validators import escape_like, normalize_slug
from app.modules.identity.tenant.models import Tenant, TenantProfile, TenantSettings


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class TenantRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, tenant_id: str | UUID) -> Tenant | None:
        return self.db.get(Tenant, _to_uuid(tenant_id, "tenant_id"))

    def get_by_slug(self, slug: str) -> Tenant | None:
        return self.db.scalar(
            select(Tenant).where(Tenant.slug == normalize_slug(slug))
        )

    def get_profile(self, tenant_id: str | UUID) -> TenantProfile | None:
        return self.db.scalar(
            select(TenantProfile).where(TenantProfile.tenant_id == _to_uuid(tenant_id))
        )

    def get_settings(self, tenant_id: str | UUID) -> TenantSettings | None:
        return self.db.scalar(
            select(TenantSettings).where(TenantSettings.tenant_id == _to_uuid(tenant_id))
        )

    def list(
        self,
        *,
        slug: str | None = None,
        status: str | None = None,
        tenant_kind: str | None = None,
        created_from: datetime | None = None,
        created_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Tenant], int]:
        query = select(Tenant)

        if slug is not None:
            query = query.where(
                Tenant.slug.ilike(f"%{escape_like(normalize_slug(slug))}%", escape="\\")
            )

        if status is not None:
            query = query.where(Tenant.status == status)

        if tenant_kind is not None:
            query = query.where(Tenant.tenant_kind == tenant_kind)

        if created_from is not None:
            query = query.where(Tenant.created_at >= created_from)

        if created_to is not None:
            query = query.where(Tenant.created_at <= created_to)

        return self._paginate(query.order_by(Tenant.created_at.desc()), limit, offset)

    def add(self, tenant: Tenant) -> Tenant:
        self.db.add(tenant)
        self.db.flush()
        return tenant

    def add_profile(self, profile: TenantProfile) -> TenantProfile:
        self.db.add(profile)
        self.db.flush()
        return profile

    def add_settings(self, settings: TenantSettings) -> TenantSettings:
        self.db.add(settings)
        self.db.flush()
        return settings

    def _paginate(
        self,
        query: Select[tuple[Tenant]],
        limit: int,
        offset: int,
    ) -> tuple[list[Tenant], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)
