from __future__ import annotations

from datetime import datetime
from uuid import UUID

from sqlalchemy import CheckConstraint, DateTime, Float, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class Tenant(BaseModel):
    __tablename__ = "tenant"
    __table_args__ = (
        CheckConstraint(
            "tenant_kind IN ('WORKSHOP', 'WORKSHOP_NETWORK', 'INDEPENDENT_TECHNICIAN')",
            name="tenant_kind_valid",
        ),
        CheckConstraint(
            "status IN ('ACTIVE', 'INACTIVE', 'BLOCKED')",
            name="tenant_status_valid",
        ),
    )

    commercial_name: Mapped[str] = mapped_column(String(150), nullable=False)
    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    tenant_kind: Mapped[str] = mapped_column(String(40), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="ACTIVE")
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class TenantProfile(BaseModel):
    __tablename__ = "tenant_profile"

    tenant_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("tenant.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    legal_name: Mapped[str | None] = mapped_column(String(180), nullable=True)
    tax_identifier: Mapped[str | None] = mapped_column(String(80), nullable=True)
    business_email: Mapped[str | None] = mapped_column(String(150), nullable=True)
    business_phone: Mapped[str | None] = mapped_column(String(30), nullable=True)
    website_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    address_line: Mapped[str | None] = mapped_column(String(255), nullable=True)
    city: Mapped[str | None] = mapped_column(String(120), nullable=True)
    state: Mapped[str | None] = mapped_column(String(120), nullable=True)
    country: Mapped[str | None] = mapped_column(String(120), nullable=True)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)


class TenantSettings(BaseModel):
    __tablename__ = "tenant_settings"

    tenant_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("tenant.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    default_currency: Mapped[str] = mapped_column(String(10), nullable=False, default="BOB")
    default_timezone: Mapped[str] = mapped_column(String(80), nullable=False, default="America/La_Paz")
    default_language: Mapped[str] = mapped_column(String(10), nullable=False, default="es")
