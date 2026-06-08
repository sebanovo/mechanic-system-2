from __future__ import annotations

from datetime import datetime, timezone

from app.core.config import settings
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.assignment_tracking_event.repository import (
    AssignmentTrackingEventRepository,
)
from app.modules.realtime_tracking.persistence_policy import (
    RealtimeTrackingPersistencePolicy,
)


class RealtimeTrackingPersistenceService:
    def __init__(
        self,
        tracking_repository: AssignmentTrackingEventRepository,
    ) -> None:
        self.tracking_repository = tracking_repository
        self.policy = RealtimeTrackingPersistencePolicy(
            interval_seconds=settings.realtime_tracking_persist_interval_seconds,
            min_distance_meters=settings.realtime_tracking_min_distance_meters,
        )

    def persist_if_needed(
        self,
        *,
        assignment_id: str,
        latitude,
        longitude,
    ) -> AssignmentTrackingEvent | None:
        occurred_at = datetime.now(timezone.utc)

        last_location = self.tracking_repository.get_latest_location_by_assignment(
            assignment_id
        )

        should_persist = self.policy.should_persist(
            last_location=last_location,
            latitude=latitude,
            longitude=longitude,
            occurred_at=occurred_at,
        )

        if not should_persist:
            return None

        tracking_event = AssignmentTrackingEvent(
            assignment_id=assignment_id,
            event_type="LOCATION_UPDATED",
            latitude=latitude,
            longitude=longitude,
            notes="Ubicación actualizada automáticamente por la app.",
            occurred_at=occurred_at,
        )

        return self.tracking_repository.add(tracking_event)
