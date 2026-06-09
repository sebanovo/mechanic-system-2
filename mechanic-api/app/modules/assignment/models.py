from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class Assignment(BaseModel):
    __tablename__ = "assignment"
    __table_args__ = (
        CheckConstraint(
            """
            assignment_status IN (
                'PENDING',
                'ASSIGNED',
                'EN_ROUTE',
                'ARRIVED',
                'IN_SERVICE',
                'COMPLETED',
                'CANCELLED'
            )
            """,
            name="assignment_status_valid",
        ),
    )

    incident_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("incident.id", ondelete="CASCADE"),
        nullable=False,
    )

    offer_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("incident_offer.id", ondelete="RESTRICT"),
        nullable=False,
    )

    provider_profile_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("provider_profile.id", ondelete="RESTRICT"),
        nullable=False,
    )

    technician_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("technician.id", ondelete="RESTRICT"),
        nullable=False,
    )

    assignment_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="ASSIGNED",
    )

    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    assigned_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    en_route_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    started_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    arrived_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    cancelled_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
