from __future__ import annotations

from uuid import UUID

from sqlalchemy import CheckConstraint, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.audit.constants import AuditActorType
from app.core.database import BaseModel


class AuditEvent(BaseModel):
    __tablename__ = "audit_event"
    __table_args__ = (
        CheckConstraint("scope IN ('PLATFORM', 'TENANT')", name="audit_scope_valid"),
        CheckConstraint(
            f"actor_type IN ({', '.join(repr(value) for value in AuditActorType.ALL)})",
            name="audit_actor_type_valid",
        ),
    )

    tenant_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("tenant.id", ondelete="SET NULL"),
        nullable=True,
    )

    user_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("app_user.id", ondelete="SET NULL"),
        nullable=True,
    )

    scope: Mapped[str] = mapped_column(String(30), nullable=False)
    actor_type: Mapped[str] = mapped_column(String(30), nullable=False)
    event_type: Mapped[str] = mapped_column(String(100), nullable=False)
    resource_type: Mapped[str] = mapped_column(String(100), nullable=False)

    resource_id: Mapped[UUID | None] = mapped_column(
        PGUUID(as_uuid=True),
        nullable=True,
    )

    event_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String(80), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)
