from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.provider.models import ProviderProfile


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class ProviderProfileRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, provider_profile_id: str | UUID) -> ProviderProfile | None:
        return self.db.get(ProviderProfile, _to_uuid(provider_profile_id, "provider_profile_id"))

    def get_by_tenant_id(self, tenant_id: str | UUID) -> ProviderProfile | None:
        return self.db.scalar(
            select(ProviderProfile).where(
                ProviderProfile.tenant_id == _to_uuid(tenant_id)
            )
        )

    def list(
        self,
        *,
        provider_type: str | None = None,
        accepts_emergency_requests: bool | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[ProviderProfile], int]:
        query = select(ProviderProfile)

        if provider_type is not None:
            query = query.where(ProviderProfile.provider_type == provider_type)

        if accepts_emergency_requests is not None:
            query = query.where(
                ProviderProfile.accepts_emergency_requests == accepts_emergency_requests
            )

        return self._paginate(
            query.order_by(ProviderProfile.created_at.desc()),
            limit,
            offset,
        )

    def add(self, provider_profile: ProviderProfile) -> ProviderProfile:
        self.db.add(provider_profile)
        self.db.flush()
        return provider_profile

    def _paginate(
        self,
        query: Select[tuple[ProviderProfile]],
        limit: int,
        offset: int,
    ) -> tuple[list[ProviderProfile], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)