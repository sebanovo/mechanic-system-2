from __future__ import annotations

from uuid import UUID

from app.common.exceptions import ValidationException


def to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    if isinstance(value, UUID):
        return value

    try:
        return UUID(value)
    except ValueError as exc:
        raise ValidationException(f"El campo '{field_name}' no es un UUID válido.") from exc


def optional_uuid(
    value: str | UUID | None,
    field_name: str = "id",
) -> UUID | None:
    if value is None:
        return None

    return to_uuid(value, field_name)