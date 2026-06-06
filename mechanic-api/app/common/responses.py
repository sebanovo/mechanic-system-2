from __future__ import annotations

from typing import Any

from app.common.contracts import build_paginated_payload, build_success_payload
from app.common.pagination import PaginationMeta


def success_response(
    message: str,
    data: Any | None = None,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return build_success_payload(
        message=message,
        data=data,
        meta=meta,
    )


def paginated_response(
    message: str,
    items: list[Any],
    pagination: PaginationMeta,
    meta: dict[str, Any] | None = None,
) -> dict[str, Any]:
    return build_paginated_payload(
        message=message,
        items=items,
        pagination=pagination,
        meta=meta,
    )
