from __future__ import annotations

from decimal import Decimal

from sqlalchemy import Boolean, CheckConstraint, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import BaseModel


class ServiceCatalog(BaseModel):
    __tablename__ = "service_catalog"
    __table_args__ = (
        CheckConstraint(
            """
            (min_price IS NULL OR min_price >= 0)
            AND (max_price IS NULL OR max_price >= 0)
            AND (
                min_price IS NULL
                OR max_price IS NULL
                OR max_price >= min_price
            )
            """,
            name="service_catalog_price_range_valid",
        ),
        CheckConstraint(
            """
            (min_duration_minutes IS NULL OR min_duration_minutes > 0)
            AND (max_duration_minutes IS NULL OR max_duration_minutes > 0)
            AND (
                min_duration_minutes IS NULL
                OR max_duration_minutes IS NULL
                OR max_duration_minutes >= min_duration_minutes
            )
            """,
            name="service_catalog_duration_range_valid",
        ),
    )

    service_code: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    service_name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    category: Mapped[str] = mapped_column(String(80), nullable=False)

    min_price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2), nullable=True)
    max_price: Mapped[Decimal | None] = mapped_column(Numeric(12, 2), nullable=True)

    min_duration_minutes: Mapped[int | None] = mapped_column(Integer, nullable=True)
    max_duration_minutes: Mapped[int | None] = mapped_column(Integer, nullable=True)

    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)