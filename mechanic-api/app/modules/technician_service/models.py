from __future__ import annotations

from uuid import UUID

from sqlalchemy import Boolean, CheckConstraint, ForeignKey, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class TechnicianService(BaseModel):
    __tablename__ = "technician_service"
    __table_args__ = (
        UniqueConstraint(
            "technician_id",
            "provider_service_id",
            name="technician_service_unique",
        ),
        CheckConstraint(
            "skill_level IN ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'EXPERT')",
            name="technician_service_skill_level_valid",
        ),
    )

    technician_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("technician.id", ondelete="CASCADE"),
        nullable=False,
    )

    provider_service_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("provider_service.id", ondelete="CASCADE"),
        nullable=False,
    )

    skill_level: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="INTERMEDIATE",
    )

    is_enabled: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )