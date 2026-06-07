from __future__ import annotations

from decimal import Decimal
from uuid import UUID

from sqlalchemy import CheckConstraint, ForeignKey, Numeric, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class IncidentCandidateProvider(BaseModel):
    __tablename__ = "incident_candidate_provider"
    __table_args__ = (
        UniqueConstraint(
            "incident_id",
            "provider_profile_id",
            name="incident_candidate_provider_unique",
        ),
        CheckConstraint(
            "candidate_status IN ('SUGGESTED', 'SELECTED', 'DISCARDED', 'EXPIRED')",
            name="incident_candidate_provider_status_valid",
        ),
        CheckConstraint(
            """
            (distance_km IS NULL OR distance_km >= 0)
            AND (estimated_arrival_minutes IS NULL OR estimated_arrival_minutes >= 0)
            AND (rating_score IS NULL OR rating_score >= 0)
            AND (capacity_score IS NULL OR capacity_score >= 0)
            AND (response_score IS NULL OR response_score >= 0)
            AND (match_score IS NULL OR match_score >= 0)
            """,
            name="incident_candidate_provider_scores_valid",
        ),
    )

    incident_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("incident.id", ondelete="CASCADE"),
        nullable=False,
    )

    provider_profile_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("provider_profile.id", ondelete="CASCADE"),
        nullable=False,
    )

    distance_km: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    estimated_arrival_minutes: Mapped[int | None] = mapped_column(nullable=True)

    rating_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 2), nullable=True)
    capacity_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 2), nullable=True)
    response_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 2), nullable=True)
    match_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 2), nullable=True)

    candidate_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="SUGGESTED",
    )