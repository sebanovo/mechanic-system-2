from __future__ import annotations

from decimal import Decimal
from uuid import UUID

from sqlalchemy import CheckConstraint, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class IncidentAiAnalysis(BaseModel):
    __tablename__ = "incident_ai_analysis"
    __table_args__ = (
        CheckConstraint(
            "recommended_priority IS NULL OR recommended_priority IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')",
            name="incident_ai_analysis_priority_valid",
        ),
        CheckConstraint(
            """
            (confidence_score IS NULL OR confidence_score BETWEEN 0 AND 100)
            AND (estimated_min_price IS NULL OR estimated_min_price >= 0)
            AND (estimated_max_price IS NULL OR estimated_max_price >= 0)
            AND (
                estimated_min_price IS NULL
                OR estimated_max_price IS NULL
                OR estimated_max_price >= estimated_min_price
            )
            AND (estimated_min_duration_minutes IS NULL OR estimated_min_duration_minutes > 0)
            AND (estimated_max_duration_minutes IS NULL OR estimated_max_duration_minutes > 0)
            AND (
                estimated_min_duration_minutes IS NULL
                OR estimated_max_duration_minutes IS NULL
                OR estimated_max_duration_minutes >= estimated_min_duration_minutes
            )
            """,
            name="incident_ai_analysis_values_valid",
        ),
    )

    incident_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("incident.id", ondelete="CASCADE"),
        nullable=False,
    )

    analysis_version: Mapped[str] = mapped_column(String(50), nullable=False)

    probable_service_code: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    probable_problem: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    confidence_score: Mapped[Decimal | None] = mapped_column(
        Numeric(5, 2),
        nullable=True,
    )

    estimated_min_price: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    estimated_max_price: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    estimated_min_duration_minutes: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    estimated_max_duration_minutes: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    recommended_priority: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    analysis_result: Mapped[dict | None] = mapped_column(
        JSONB,
        nullable=True,
    )