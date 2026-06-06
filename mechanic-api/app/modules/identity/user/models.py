from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, CheckConstraint, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel
from app.modules.identity.user.constants import USER_STATUSES, USER_TYPES


class User(BaseModel):
    __tablename__ = "app_user"
    __table_args__ = (
        CheckConstraint(
            f"user_type IN ({', '.join(repr(value) for value in USER_TYPES)})",
            name="user_type_valid",
        ),
        CheckConstraint(
            f"status IN ({', '.join(repr(value) for value in USER_STATUSES)})",
            name="user_status_valid",
        ),
    )

    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(30), nullable=True)
    avatar_url: Mapped[str | None] = mapped_column(Text, nullable=True)

    user_type: Mapped[str] = mapped_column(String(30), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="ACTIVE")

    email_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    email_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    password_changed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)