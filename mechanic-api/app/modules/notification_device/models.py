from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class NotificationDevice(BaseModel):
    __tablename__ = "notification_device"
    __table_args__ = (
        CheckConstraint(
            "platform IN ('ANDROID', 'IOS', 'WEB')",
            name="notification_device_platform_valid",
        ),
        CheckConstraint(
            "status IN ('ACTIVE', 'INACTIVE', 'REVOKED', 'EXPIRED')",
            name="notification_device_status_valid",
        ),
    )

    user_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("app_user.id", ondelete="CASCADE"),
        nullable=False,
    )
    device_token: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    platform: Mapped[str] = mapped_column(String(30), nullable=False)
    device_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    app_version: Mapped[str | None] = mapped_column(String(40), nullable=True)
    os_version: Mapped[str | None] = mapped_column(String(40), nullable=True)
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="ACTIVE",
    )
    last_seen_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
