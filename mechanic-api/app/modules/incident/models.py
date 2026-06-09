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


class Incident(BaseModel):
    __tablename__ = "incident"
    __table_args__ = (
        CheckConstraint(
            "priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')",
            name="incident_priority_valid",
        ),
        CheckConstraint(
            """
            status IN (
                'REPORTED',
                'ANALYZING',
                'SEARCHING_PROVIDER',
                'WAITING_PROVIDER_RESPONSE',
                'PROVIDER_ACCEPTED',
                'ASSIGNING_TECHNICIAN',
                'TECHNICIAN_ASSIGNED',
                'EN_ROUTE',
                'ARRIVED',
                'IN_SERVICE',
                'COMPLETED',
                'CANCELLED',
                'UNATTENDED'
            )
            """,
            name="incident_status_valid",
        ),
        CheckConstraint(
            "latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180",
            name="incident_coordinates_valid",
        ),
    )

    customer_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("customer.id", ondelete="RESTRICT"),
        nullable=False,
    )

    vehicle_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("vehicle.id", ondelete="RESTRICT"),
        nullable=False,
    )

    service_catalog_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("service_catalog.id", ondelete="SET NULL"),
        nullable=True,
    )

    incident_code: Mapped[str] = mapped_column(
        String(80),
        unique=True,
        nullable=False,
    )

    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    latitude: Mapped[Decimal] = mapped_column(Numeric(10, 7), nullable=False)
    longitude: Mapped[Decimal] = mapped_column(Numeric(10, 7), nullable=False)
    address_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    priority: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="MEDIUM",
    )

    unattended_reason: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    unattended_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="REPORTED",
    )

    reported_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    cancelled_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    completed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
