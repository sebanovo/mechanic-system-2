from __future__ import annotations

from uuid import UUID

from sqlalchemy import Boolean, CheckConstraint, ForeignKey, Integer, Numeric, String
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class ProviderProfile(BaseModel):
    __tablename__ = "provider_profile"
    __table_args__ = (
        CheckConstraint(
            "provider_type IN ('WORKSHOP', 'WORKSHOP_NETWORK', 'INDEPENDENT_TECHNICIAN')",
            name="provider_type_valid",
        ),
        CheckConstraint(
            "operational_status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')",
            name="provider_operational_status_valid",
        ),
        CheckConstraint(
            "average_rating BETWEEN 0 AND 5 "
            "AND total_reviews >= 0 "
            "AND response_score >= 0",
            name="provider_metrics_valid",
        ),
    )

    tenant_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("tenant.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    provider_type: Mapped[str] = mapped_column(String(50), nullable=False)

    operational_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="ACTIVE",
    )

    accepts_emergency_requests: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    average_rating: Mapped[float] = mapped_column(
        Numeric(3, 2),
        nullable=False,
        default=0,
    )

    total_reviews: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    response_score: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False,
        default=0,
    )
