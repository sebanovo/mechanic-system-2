from __future__ import annotations

from datetime import datetime, timezone


def assignment_status_changed_event(
    *,
    assignment_id: str,
    incident_id: str,
    assignment_status: str,
    incident_status: str,
    event_type: str,
) -> dict:
    return {
        "type": "ASSIGNMENT_STATUS_CHANGED",
        "assignment_id": assignment_id,
        "incident_id": incident_id,
        "assignment_status": assignment_status,
        "incident_status": incident_status,
        "tracking_event_type": event_type,
        "occurred_at": datetime.now(timezone.utc).isoformat(),
    }
