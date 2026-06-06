from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class Vehicle(BaseModel):
    __tablename__ = "vehicle"
    __table_args__ = (
        UniqueConstraint(
            "customer_id",
            "plate_number",
            name="vehicle_customer_plate_unique",
        ),
        CheckConstraint(
            "vehicle_type IN ('CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'SUV', 'OTHER')",
            name="vehicle_type_valid",
        ),
        CheckConstraint(
            "status IN ('ACTIVE', 'INACTIVE')",
            name="vehicle_status_valid",
        ),
        CheckConstraint(
            "year IS NULL OR year BETWEEN 1900 AND EXTRACT(YEAR FROM NOW())::INT + 1",
            name="vehicle_year_valid",
        ),
    )

    customer_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("customer.id", ondelete="CASCADE"),
        nullable=False,
    )

    plate_number: Mapped[str] = mapped_column(String(30), nullable=False)
    brand: Mapped[str | None] = mapped_column(String(80), nullable=True)
    model: Mapped[str | None] = mapped_column(String(80), nullable=True)
    year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    color: Mapped[str | None] = mapped_column(String(50), nullable=True)
    vehicle_type: Mapped[str] = mapped_column(String(40), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="ACTIVE")

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )