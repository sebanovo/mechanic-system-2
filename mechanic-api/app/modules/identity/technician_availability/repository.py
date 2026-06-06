from __future__ import annotations

from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.identity.technician_availability.models import TechnicianAvailability


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class TechnicianAvailabilityRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(
        self,
        availability_id: str | UUID,
    ) -> TechnicianAvailability | None:
        return self.db.get(TechnicianAvailability, _to_uuid(availability_id, "availability_id"))

    def get_by_technician_id(
        self,
        technician_id: str | UUID,
    ) -> TechnicianAvailability | None:
        return self.db.scalar(
            select(TechnicianAvailability).where(
                TechnicianAvailability.technician_id == _to_uuid(technician_id)
            )
        )

    def add(self, availability: TechnicianAvailability) -> TechnicianAvailability:
        self.db.add(availability)
        self.db.flush()
        return availability