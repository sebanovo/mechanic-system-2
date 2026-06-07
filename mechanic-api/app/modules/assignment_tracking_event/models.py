from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class AssignmentTrackingEvent(BaseModel):
    __tablename__ = "assignment_tracking_event"
    __table_args__ = (
        CheckConstraint(
            """
            event_type IN (
                'ASSIGNED',
                'EN_ROUTE',
                'LOCATION_UPDATED',
                'ARRIVED',
                'SERVICE_STARTED',
                'SERVICE_COMPLETED',
                'CANCELLED',
                'NOTE'
            )
            """,
            name="assignment_tracking_event_type_valid",
        ),
        CheckConstraint(
            """
            latitude IS NULL
            OR latitude BETWEEN -90 AND 90
            """,
            name="assignment_tracking_event_latitude_valid",
        ),
        CheckConstraint(
            """
            longitude IS NULL
            OR longitude BETWEEN -180 AND 180
            """,
            name="assignment_tracking_event_longitude_valid",
        ),
    )

    assignment_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("assignment.id", ondelete="CASCADE"),
        nullable=False,
    )

    event_type: Mapped[str] = mapped_column(String(40), nullable=False)

    latitude: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 7),
        nullable=True,
    )

    longitude: Mapped[Decimal | None] = mapped_column(
        Numeric(10, 7),
        nullable=True,
    )

    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    occurred_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )