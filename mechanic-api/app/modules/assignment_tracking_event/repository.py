from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.common.uuid import to_uuid
from app.modules.assignment.models import Assignment
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.realtime_tracking.persistence_policy import (
    LastPersistedLocation,
)


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class AssignmentTrackingEventRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_id(
        self,
        tracking_event_id: str | UUID,
    ) -> AssignmentTrackingEvent | None:
        return self.db.get(
            AssignmentTrackingEvent,
            _to_uuid(tracking_event_id, "assignment_tracking_event_id"),
        )

    def get_detail_by_id(
        self,
        tracking_event_id: str | UUID,
    ) -> tuple[AssignmentTrackingEvent, Assignment] | None:
        row = self.db.execute(
            select(AssignmentTrackingEvent, Assignment)
            .join(Assignment, Assignment.id == AssignmentTrackingEvent.assignment_id)
            .where(
                AssignmentTrackingEvent.id == _to_uuid(
                    tracking_event_id,
                    "assignment_tracking_event_id",
                )
            )
        ).first()

        if row is None:
            return None

        return row[0], row[1]

    def get_latest_location_by_assignment(
        self,
        assignment_id: str | UUID,
    ) -> LastPersistedLocation | None:
        tracking_event = self.db.scalar(
            select(AssignmentTrackingEvent)
            .where(
                AssignmentTrackingEvent.assignment_id == _to_uuid(
                    assignment_id,
                    "assignment_id",
                ),
                AssignmentTrackingEvent.event_type == "LOCATION_UPDATED",
                AssignmentTrackingEvent.latitude.is_not(None),
                AssignmentTrackingEvent.longitude.is_not(None),
            )
            .order_by(AssignmentTrackingEvent.occurred_at.desc())
            .limit(1)
        )

        if tracking_event is None:
            return None

        return LastPersistedLocation(
            latitude=float(tracking_event.latitude),
            longitude=float(tracking_event.longitude),
            occurred_at=tracking_event.occurred_at,
        )

    def list(
        self,
        *,
        assignment_id: str | UUID | None = None,
        event_type: str | None = None,
        occurred_from: datetime | None = None,
        occurred_to: datetime | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[AssignmentTrackingEvent, Assignment]], int]:
        query = (
            select(AssignmentTrackingEvent, Assignment)
            .join(Assignment, Assignment.id == AssignmentTrackingEvent.assignment_id)
        )

        if assignment_id is not None:
            query = query.where(
                AssignmentTrackingEvent.assignment_id == _to_uuid(
                    assignment_id,
                    "assignment_id",
                )
            )

        if event_type is not None:
            query = query.where(AssignmentTrackingEvent.event_type == event_type)

        if occurred_from is not None:
            query = query.where(AssignmentTrackingEvent.occurred_at >= occurred_from)

        if occurred_to is not None:
            query = query.where(AssignmentTrackingEvent.occurred_at <= occurred_to)

        return self._paginate(
            query.order_by(AssignmentTrackingEvent.occurred_at.desc()),
            limit,
            offset,
        )

    def list_by_assignment(
        self,
        assignment_id: str | UUID,
        *,
        event_type: str | None = None,
        limit: int = 100,
        offset: int = 0,
    ) -> tuple[list[tuple[AssignmentTrackingEvent, Assignment]], int]:
        return self.list(
            assignment_id=assignment_id,
            event_type=event_type,
            limit=limit,
            offset=offset,
        )

    def add(
        self,
        tracking_event: AssignmentTrackingEvent,
    ) -> AssignmentTrackingEvent:
        self.db.add(tracking_event)
        self.db.flush()
        return tracking_event

    def _paginate(
        self,
        query: Select[tuple[AssignmentTrackingEvent, Assignment]],
        limit: int,
        offset: int,
    ) -> tuple[list[tuple[AssignmentTrackingEvent, Assignment]], int]:
        total = self.db.scalar(select(func.count()).select_from(query.subquery()))
        rows = self.db.execute(query.offset(offset).limit(limit)).all()
        return [(row[0], row[1]) for row in rows], int(total or 0)
