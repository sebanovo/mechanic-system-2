from __future__ import annotations

from decimal import Decimal
from uuid import UUID

from sqlalchemy import Boolean, CheckConstraint, ForeignKey, Numeric, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class ProviderService(BaseModel):
    __tablename__ = "provider_service"
    __table_args__ = (
        UniqueConstraint(
            "provider_profile_id",
            "service_catalog_id",
            name="provider_service_unique",
        ),
        CheckConstraint(
            """
            (custom_min_price IS NULL OR custom_min_price >= 0)
            AND (custom_max_price IS NULL OR custom_max_price >= 0)
            AND (
                custom_min_price IS NULL
                OR custom_max_price IS NULL
                OR custom_max_price >= custom_min_price
            )
            """,
            name="provider_service_custom_price_range_valid",
        ),
    )

    provider_profile_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("provider_profile.id", ondelete="CASCADE"),
        nullable=False,
    )

    service_catalog_id: Mapped[UUID] = mapped_column(
        PGUUID(as_uuid=True),
        ForeignKey("service_catalog.id", ondelete="CASCADE"),
        nullable=False,
    )

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    custom_min_price: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    custom_max_price: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )