from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class Technician(BaseModel):
    __tablename__ = "technician"
    __table_args__ = (
        UniqueConstraint("provider_profile_id", "technician_code", name="technician_code_unique"),
        UniqueConstraint("provider_profile_id", "user_id", name="technician_user_unique"),
        CheckConstraint("status IN ('ACTIVE', 'INACTIVE', 'BLOCKED')", name="technician_status_valid"),
        CheckConstraint("average_rating BETWEEN 0 AND 5 AND total_reviews >= 0", name="technician_metrics_valid"),
    )

    provider_profile_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("provider_profile.id", ondelete="CASCADE"),
        nullable=False,
    )

    user_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("app_user.id", ondelete="RESTRICT"),
        nullable=False,
    )

    technician_code: Mapped[str] = mapped_column(String(80), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="ACTIVE")
    average_rating: Mapped[float] = mapped_column(Numeric(3, 2), nullable=False, default=0)
    total_reviews: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)