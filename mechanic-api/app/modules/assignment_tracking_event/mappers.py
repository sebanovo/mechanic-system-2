from __future__ import annotations

from app.modules.assignment.mappers import assignment_public
from app.modules.assignment.models import Assignment
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.assignment_tracking_event.schemas import (
    AssignmentTrackingEventDetailPublic,
    AssignmentTrackingEventPublic,
)


def assignment_tracking_event_public(
    tracking_event: AssignmentTrackingEvent,
) -> AssignmentTrackingEventPublic:
    return AssignmentTrackingEventPublic(
        id=str(tracking_event.id),
        assignment_id=str(tracking_event.assignment_id),
        event_type=tracking_event.event_type,  # type: ignore[arg-type]
        latitude=tracking_event.latitude,
        longitude=tracking_event.longitude,
        notes=tracking_event.notes,
        occurred_at=tracking_event.occurred_at,
        created_at=tracking_event.created_at,
        updated_at=tracking_event.updated_at,
    )


def assignment_tracking_event_detail_public(
    tracking_event: AssignmentTrackingEvent,
    assignment: Assignment,
) -> AssignmentTrackingEventDetailPublic:
    return AssignmentTrackingEventDetailPublic(
        tracking_event=assignment_tracking_event_public(tracking_event),
        assignment=assignment_public(assignment),
    )