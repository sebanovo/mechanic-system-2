from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.customer.models import Customer
from app.modules.identity.user.models import User


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class CustomerRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, customer_id: str | UUID) -> Customer | None:
        return self.db.get(Customer, _to_uuid(customer_id, "customer_id"))

    def get_by_user_id(self, user_id: str | UUID) -> Customer | None:
        return self.db.scalar(
            select(Customer).where(Customer.user_id == _to_uuid(user_id))
        )

    def get_detail_by_customer_id(self, customer_id: str | UUID) -> tuple[Customer, User] | None:
        row = self.db.execute(
            select(Customer, User)
            .join(User, User.id == Customer.user_id)
            .where(Customer.id == _to_uuid(customer_id))
        ).first()

        if row is None:
            return None

        return row[0], row[1]

    def get_detail_by_user_id(self, user_id: str | UUID) -> tuple[Customer, User] | None:
        row = self.db.execute(
            select(Customer, User)
            .join(User, User.id == Customer.user_id)
            .where(Customer.user_id == _to_uuid(user_id))
        ).first()

        if row is None:
            return None

        return row[0], row[1]

    def list(
        self,
        *,
        email: str | None = None,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[Customer, User]], int]:
        query = (
            select(Customer, User)
            .join(User, User.id == Customer.user_id)
            .where(User.user_type == "CLIENT")
        )

        if email is not None:
            query = query.where(User.email.ilike(f"%{email.strip()}%"))

        if status is not None:
            query = query.where(Customer.status == status)

        return self._paginate(
            query.order_by(Customer.created_at.desc()),
            limit,
            offset,
        )

    def add(self, customer: Customer) -> Customer:
        self.db.add(customer)
        self.db.flush()
        return customer

    def _paginate(
        self,
        query: Select[tuple[Customer, User]],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[Customer, User]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1]) for row in rows], int(total or 0)