from __future__ import annotations

from math import ceil
from typing import Generic, TypeVar

from fastapi import Query
from pydantic import BaseModel

from app.common.enums import SortDirection

DataT = TypeVar("DataT")


class PaginationParams:
    def __init__(
        self,
        page: int = Query(default=1, ge=1),
        page_size: int = Query(default=20, ge=1, le=200),
    ) -> None:
        self.page = page
        self.page_size = page_size

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size

    @property
    def limit(self) -> int:
        return self.page_size


class SortParams:
    def __init__(
        self,
        sort_by: str | None = Query(default=None),
        sort_direction: SortDirection = Query(default=SortDirection.DESC),
    ) -> None:
        self.sort_by = sort_by
        self.sort_direction = sort_direction


class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total: int
    total_pages: int
    has_next: bool
    has_previous: bool


class PaginatedData(BaseModel, Generic[DataT]):
    items: list[DataT]
    pagination: PaginationMeta


def build_pagination_meta(
    *,
    page: int,
    page_size: int,
    total: int,
) -> PaginationMeta:
    total_pages = ceil(total / page_size) if total > 0 else 0

    return PaginationMeta(
        page=page,
        page_size=page_size,
        total=total,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_previous=page > 1,
    )


def build_paginated_data(
    *,
    items: list[DataT],
    total: int,
    page: int,
    page_size: int,
) -> PaginatedData[DataT]:
    return PaginatedData(
        items=items,
        pagination=build_pagination_meta(
            page=page,
            page_size=page_size,
            total=total,
        ),
    )
