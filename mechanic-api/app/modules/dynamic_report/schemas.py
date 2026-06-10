from __future__ import annotations

from typing import Any
from datetime import datetime
from typing import Literal

from pydantic import BaseModel
from pydantic import Field

from app.common.contracts import ApiResponse
from app.common.pagination import PaginationMeta


DynamicReportOutput = Literal[
    "TABLE",
    "CHART",
    "SUMMARY",
    "EXPORT_EXCEL",
    "EXPORT_PDF",
]

DynamicReportScope = Literal[
    "PLATFORM",
    "TENANT",
]

DynamicReportSortDirection = Literal[
    "ASC",
    "DESC",
]


class DynamicReportPromptRequest(BaseModel):
    prompt: str = Field(
        min_length=3,
        max_length=4000,
    )


class DynamicReportSort(BaseModel):
    field: str
    direction: DynamicReportSortDirection = "DESC"


class DynamicReportIntent(BaseModel):
    report_type: str
    title: str
    description: str | None = None

    metrics: list[str] = Field(default_factory=list)
    dimensions: list[str] = Field(default_factory=list)
    filters: dict[str, Any] = Field(default_factory=dict)
    sort: list[DynamicReportSort] = Field(default_factory=list)
    limit: int | None = Field(default=None, ge=1, le=500)

    output: DynamicReportOutput = "TABLE"


class DynamicReportColumn(BaseModel):
    key: str
    label: str
    type: str = "text"


class DynamicReportResult(BaseModel):
    title: str
    description: str | None = None

    report_type: str
    scope: DynamicReportScope

    columns: list[DynamicReportColumn]
    rows: list[dict[str, Any]]

    metadata: dict[str, Any] = Field(default_factory=dict)


DynamicReportExecutionStatus = Literal[
    "SUCCESS",
    "FAILED",
]


class DynamicReportExecutionPublic(BaseModel):
    id: str
    requested_by_user_id: str
    tenant_id: str | None = None

    report_type: str
    title: str
    scope: DynamicReportScope

    prompt: str
    intent: dict[str, Any]

    result_metadata: dict[str, Any] | None = None
    row_count: int

    status: DynamicReportExecutionStatus
    error_message: str | None = None

    executed_at: datetime
    created_at: datetime
    updated_at: datetime


class DynamicReportExecutionListData(BaseModel):
    items: list[DynamicReportExecutionPublic]
    pagination: PaginationMeta


class DynamicReportRunData(BaseModel):
    execution: DynamicReportExecutionPublic
    intent: DynamicReportIntent
    result: DynamicReportResult


class DynamicReportRunResponse(ApiResponse[DynamicReportRunData]):
    pass


class DynamicReportExecutionResponse(ApiResponse[DynamicReportExecutionPublic]):
    pass


class DynamicReportExecutionsResponse(ApiResponse[DynamicReportExecutionListData]):
    pass
