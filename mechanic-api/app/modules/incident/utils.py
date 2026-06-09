from __future__ import annotations

from datetime import datetime, timezone


def mark_incident_cancelled(
    incident,
    *,
    actor_type: str,
    actor_user_id: str | None,
    reason: str | None = None,
) -> None:
    incident.status = "CANCELLED"
    incident.cancelled_at = datetime.now(timezone.utc)
    incident.cancelled_by_user_type = actor_type
    incident.cancelled_by_user_id = actor_user_id
    incident.cancellation_reason = reason
