from __future__ import annotations

from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.common.validators import escape_like
from app.modules.identity.customer.models import Customer
from app.modules.identity.user.models import User
from app.modules.vehicle.models import Vehicle


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class VehicleRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(self, vehicle_id: str | UUID) -> Vehicle | None:
        return self.db.get(Vehicle, _to_uuid(vehicle_id, "vehicle_id"))

    def get_detail_by_id(
        self,
        vehicle_id: str | UUID,
    ) -> tuple[Vehicle, Customer, User] | None:
        query = (
            select(Vehicle, Customer, User)
            .join(Customer, Vehicle.customer_id == Customer.id)
            .join(User, Customer.user_id == User.id)
            .where(
                Vehicle.id == _to_uuid(vehicle_id, "vehicle_id"),
                Vehicle.deleted_at.is_(None),
                Customer.deleted_at.is_(None),
                User.deleted_at.is_(None),
            )
        )

        row = self.db.execute(query).one_or_none()

        if row is None:
            return None

        vehicle, customer, user = row
        return vehicle, customer, user

    def get_by_customer_and_plate(
        self,
        *,
        customer_id: str | UUID,
        plate_number: str,
        include_deleted: bool = False,
    ) -> Vehicle | None:
        query = select(Vehicle).where(
            Vehicle.customer_id == _to_uuid(customer_id, "customer_id"),
            Vehicle.plate_number == plate_number.strip().upper(),
        )

        if not include_deleted:
            query = query.where(Vehicle.deleted_at.is_(None))

        return self.db.scalar(query)

    def list_by_customer(
        self,
        customer_id: str | UUID,
        *,
        search: str | None = None,
        vehicle_type: str | None = None,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Vehicle], int]:
        query = select(Vehicle).where(
            Vehicle.customer_id == _to_uuid(customer_id, "customer_id"),
            Vehicle.deleted_at.is_(None),
        )

        if search is not None:
            normalized_search = escape_like(search.strip())
            if normalized_search:
                query = query.where(
                    Vehicle.plate_number.ilike(
                        f"%{normalized_search}%",
                        escape="\\",
                    )
                )

        if vehicle_type is not None:
            query = query.where(Vehicle.vehicle_type == vehicle_type)

        if status is not None:
            query = query.where(Vehicle.status == status)

        return self._paginate(
            query.order_by(Vehicle.created_at.desc()),
            limit,
            offset,
        )

    def list(
        self,
        *,
        customer_id: str | UUID | None = None,
        search: str | None = None,
        vehicle_type: str | None = None,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[Vehicle], int]:
        query = select(Vehicle).where(Vehicle.deleted_at.is_(None))

        if customer_id is not None:
            query = query.where(
                Vehicle.customer_id == _to_uuid(customer_id, "customer_id")
            )

        if search is not None:
            normalized_search = escape_like(search.strip())
            if normalized_search:
                query = query.where(
                    Vehicle.plate_number.ilike(
                        f"%{normalized_search}%",
                        escape="\\",
                    )
                )

        if vehicle_type is not None:
            query = query.where(Vehicle.vehicle_type == vehicle_type)

        if status is not None:
            query = query.where(Vehicle.status == status)

        return self._paginate(
            query.order_by(Vehicle.created_at.desc()),
            limit,
            offset,
        )

    def add(self, vehicle: Vehicle) -> Vehicle:
        self.db.add(vehicle)
        self.db.flush()
        return vehicle

    def _paginate(
        self,
        query: Select[tuple[Vehicle]],
        limit: int,
        offset: int,
    ) -> tuple[list[Vehicle], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        items = list(self.db.scalars(query.offset(offset).limit(limit)))
        return items, int(total or 0)
