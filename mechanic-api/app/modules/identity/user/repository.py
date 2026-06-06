from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.user.models import User


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class UserRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, user_id: str | UUID) -> User | None:
        return self.db.get(User, _to_uuid(user_id, "user_id"))

    def get_by_email(self, email: str) -> User | None:
        return self.db.scalar(
            select(User).where(User.email == email.strip().lower())
        )

    def exists_by_email(self, email: str) -> bool:
        return self.get_by_email(email) is not None

    def list(
        self,
        *,
        email: str | None = None,
        user_type: str | None = None,
        status: str | None = None,
        created_from: datetime | None = None,
        created_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[User], int]:
        query = select(User)

        if email is not None:
            query = query.where(User.email.ilike(f"%{email.strip()}%"))

        if user_type is not None:
            query = query.where(User.user_type == user_type)

        if status is not None:
            query = query.where(User.status == status)

        if created_from is not None:
            query = query.where(User.created_at >= created_from)

        if created_to is not None:
            query = query.where(User.created_at <= created_to)

        return self._paginate(query.order_by(User.created_at.desc()), limit, offset)

    def add(self, user: User) -> User:
        self.db.add(user)
        self.db.flush()
        return user

    def _paginate(
        self,
        query: Select[tuple[User]],
        limit: int,
        offset: int,
    ) -> tuple[list[User], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)