from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.models import Technician
from app.modules.identity.user.models import User


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class TechnicianRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, technician_id: str | UUID) -> Technician | None:
        return self.db.get(Technician, _to_uuid(technician_id, "technician_id"))

    def get_by_user_id(self, user_id: str | UUID) -> Technician | None:
        return self.db.scalar(
            select(Technician).where(Technician.user_id == _to_uuid(user_id))
        )

    def get_by_provider_and_user(
        self,
        provider_profile_id: str | UUID,
        user_id: str | UUID,
    ) -> Technician | None:
        return self.db.scalar(
            select(Technician).where(
                Technician.provider_profile_id == _to_uuid(provider_profile_id),
                Technician.user_id == _to_uuid(user_id),
                Technician.deleted_at.is_(None),
            )
        )

    def get_by_tenant_and_user(
        self,
        tenant_id: str | UUID,
        user_id: str | UUID,
    ) -> Technician | None:
        return self.db.scalar(
            select(Technician)
            .join(
                ProviderProfile,
                ProviderProfile.id == Technician.provider_profile_id,
            )
            .where(
                ProviderProfile.tenant_id == _to_uuid(tenant_id, "tenant_id"),
                Technician.user_id == _to_uuid(user_id, "user_id"),
                Technician.deleted_at.is_(None),
            )
        )

    def get_detail_by_id(
        self,
        technician_id: str | UUID,
    ) -> tuple[Technician, User] | None:
        row = self.db.execute(
            select(Technician, User)
            .join(User, User.id == Technician.user_id)
            .where(Technician.id == _to_uuid(technician_id))
        ).first()

        if row is None:
            return None

        return row[0], row[1]

    def list_by_provider(
        self,
        provider_profile_id: str | UUID,
        *,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[Technician, User]], int]:
        query = (
            select(Technician, User)
            .join(User, User.id == Technician.user_id)
            .where(
                Technician.provider_profile_id == _to_uuid(provider_profile_id),
                Technician.deleted_at.is_(None),
                User.deleted_at.is_(None),
                User.user_type == "TECHNICIAN",
            )
        )

        if status is not None:
            query = query.where(Technician.status == status)

        return self._paginate(query.order_by(Technician.created_at.desc()), limit, offset)

    def list(
        self,
        *,
        status: str | None = None,
        provider_profile_id: str | UUID | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[Technician, User]], int]:
        query = select(Technician, User).join(User, User.id == Technician.user_id)

        if status is not None:
            query = query.where(Technician.status == status)

        if provider_profile_id is not None:
            query = query.where(
                Technician.provider_profile_id == _to_uuid(provider_profile_id)
            )

        query = query.where(
            Technician.deleted_at.is_(None),
            User.deleted_at.is_(None),
            User.user_type == "TECHNICIAN",
        )

        return self._paginate(query.order_by(Technician.created_at.desc()), limit, offset)

    def add(self, technician: Technician) -> Technician:
        self.db.add(technician)
        self.db.flush()
        return technician

    def _paginate(
        self,
        query: Select[tuple[Technician, User]],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[Technician, User]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1]) for row in rows], int(total or 0)
