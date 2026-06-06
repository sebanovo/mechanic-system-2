from __future__ import annotations

from app.modules.identity.technician_availability.models import TechnicianAvailability
from app.modules.identity.technician_availability.schemas import (
    TechnicianAvailabilityPublic,
)


def technician_availability_public(
    availability: TechnicianAvailability,
) -> TechnicianAvailabilityPublic:
    return TechnicianAvailabilityPublic(
        id=str(availability.id),
        technician_id=str(availability.technician_id),
        availability_status=availability.availability_status,  # type: ignore[arg-type]
        available_from=availability.available_from,
        available_until=availability.available_until,
        created_at=availability.created_at,
        updated_at=availability.updated_at,
    )