from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class TechnicianAvailability(BaseModel):
    __tablename__ = "technician_availability"
    __table_args__ = (
        CheckConstraint(
            "availability_status IN ('AVAILABLE', 'BUSY', 'OFFLINE', 'ON_BREAK')",
            name="technician_availability_status_valid",
        ),
    )

    technician_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("technician.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    availability_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="OFFLINE",
    )

    available_from: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    available_until: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )