from __future__ import annotations

from datetime import datetime
from datetime import timedelta
from datetime import timezone
from typing import Any

from app.common.exceptions import BusinessException


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def start_of_day(value: datetime) -> datetime:
    return value.replace(
        hour=0,
        minute=0,
        second=0,
        microsecond=0,
    )


def start_of_month(value: datetime) -> datetime:
    return value.replace(
        day=1,
        hour=0,
        minute=0,
        second=0,
        microsecond=0,
    )


def start_of_year(value: datetime) -> datetime:
    return value.replace(
        month=1,
        day=1,
        hour=0,
        minute=0,
        second=0,
        microsecond=0,
    )


def parse_datetime_filter(
    value: Any,
    field_name: str,
) -> datetime:
    if isinstance(value, datetime):
        return value.astimezone(timezone.utc)

    if not isinstance(value, str):
        raise BusinessException(f"Invalid date filter: {field_name}.")

    normalized = value.strip()

    try:
        parsed = datetime.fromisoformat(
            normalized.replace("Z", "+00:00")
        )
    except ValueError as exc:
        raise BusinessException(
            f"Invalid date format for {field_name}."
        ) from exc

    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)

    return parsed.astimezone(timezone.utc)


def resolve_date_range(
    date_range: str,
) -> tuple[datetime, datetime]:
    now = utc_now()
    normalized = date_range.strip().upper()

    if normalized == "TODAY":
        return start_of_day(now), now

    if normalized == "YESTERDAY":
        today = start_of_day(now)
        return today - timedelta(days=1), today

    if normalized == "LAST_3_DAYS":
        return now - timedelta(days=3), now

    if normalized == "LAST_7_DAYS":
        return now - timedelta(days=7), now

    if normalized == "LAST_15_DAYS":
        return now - timedelta(days=15), now

    if normalized == "LAST_30_DAYS":
        return now - timedelta(days=30), now

    if normalized == "CURRENT_MONTH":
        return start_of_month(now), now

    if normalized == "CURRENT_YEAR":
        return start_of_year(now), now

    raise BusinessException(f"Unsupported date_range: {date_range}.")


def resolve_date_filters(
    filters: dict[str, Any],
) -> tuple[datetime | None, datetime | None]:
    date_from: datetime | None = None
    date_to: datetime | None = None

    date_range = filters.get("date_range")

    if date_range:
        if not isinstance(date_range, str):
            raise BusinessException("date_range must be a string.")

        date_from, date_to = resolve_date_range(date_range)

    if filters.get("date_from") is not None:
        date_from = parse_datetime_filter(
            filters["date_from"],
            "date_from",
        )

    if filters.get("date_to") is not None:
        date_to = parse_datetime_filter(
            filters["date_to"],
            "date_to",
        )

    return date_from, date_to
