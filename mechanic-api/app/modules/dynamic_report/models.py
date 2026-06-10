from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import CheckConstraint
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import BaseModel


class DynamicReportExecution(BaseModel):
    __tablename__ = "dynamic_report_execution"

    __table_args__ = (
        CheckConstraint(
            "scope IN ('PLATFORM', 'TENANT')",
            name="dynamic_report_execution_scope_valid",
        ),
        CheckConstraint(
            "status IN ('SUCCESS', 'FAILED')",
            name="dynamic_report_execution_status_valid",
        ),
    )

    requested_by_user_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("app_user.id", ondelete="RESTRICT"),
        nullable=False,
    )

    tenant_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("tenant.id", ondelete="SET NULL"),
        nullable=True,
    )

    report_type: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
    )

    title: Mapped[str] = mapped_column(
        String(180),
        nullable=False,
    )

    scope: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    prompt: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    intent: Mapped[dict] = mapped_column(
        JSONB,
        nullable=False,
    )

    result_metadata: Mapped[dict | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    row_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    error_message: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    executed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )
