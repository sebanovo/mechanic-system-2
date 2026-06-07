from __future__ import annotations

from datetime import datetime, timezone

from app.modules.identity.technician_availability.models import TechnicianAvailability


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def is_technician_available_now(
    availability: TechnicianAvailability,
    *,
    now: datetime | None = None,
) -> bool:
    current_time = now or utc_now()

    if availability.availability_status != "AVAILABLE":
        return False

    if availability.available_from is not None:
        if availability.available_from > current_time:
            return False

    if availability.available_until is not None:
        if availability.available_until < current_time:
            return False

    return True
