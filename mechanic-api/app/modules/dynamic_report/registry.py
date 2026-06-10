from __future__ import annotations

from dataclasses import dataclass
from dataclasses import field

from app.common.exceptions import BusinessException
from app.modules.dynamic_report.schemas import DynamicReportIntent


@dataclass(frozen=True)
class ReportDefinition:
    report_type: str
    allowed_roles: tuple[str, ...]
    allowed_metrics: tuple[str, ...]
    allowed_dimensions: tuple[str, ...]
    allowed_filters: tuple[str, ...]
    allowed_sort_fields: tuple[str, ...]
    default_metrics: tuple[str, ...] = field(default_factory=tuple)
    default_dimensions: tuple[str, ...] = field(default_factory=tuple)
    default_limit: int | None = None


REPORT_REGISTRY: dict[str, ReportDefinition] = {
    "INCIDENTS": ReportDefinition(
        report_type="INCIDENTS",
        allowed_roles=(
            "SUPERADMIN",
            "TENANT_OWNER",
        ),
        allowed_metrics=(
            "incident_count",
            "completed_incidents",
            "cancelled_incidents",
            "rejected_incidents",
            "average_response_time",
            "average_completion_time",
        ),
        allowed_dimensions=(
            "provider",
            "service",
            "status",
            "day",
            "month",
            "year",
        ),
        allowed_filters=(
            "status",
            "provider_id",
            "provider_name",
            "service_catalog_id",
            "service_name",
            "date_from",
            "date_to",
            "date_range",
        ),
        allowed_sort_fields=(
            "created_at",
            "provider",
            "service",
            "status",
            "day",
            "month",
            "year",
            "incident_count",
            "completed_incidents",
            "cancelled_incidents",
            "rejected_incidents",
            "average_response_time",
            "average_completion_time",
        ),
        default_metrics=("incident_count",),
        default_dimensions=(),
        default_limit=100,
    ),
}


class DynamicReportRegistry:
    def get_definition(self, report_type: str) -> ReportDefinition:
        normalized_report_type = report_type.strip().upper()
        definition = REPORT_REGISTRY.get(normalized_report_type)

        if definition is None:
            raise BusinessException("Unsupported report type.")

        return definition

    def validate_intent(
        self,
        *,
        intent: DynamicReportIntent,
        user_type: str,
    ) -> ReportDefinition:
        intent.report_type = intent.report_type.strip().upper()

        definition = self.get_definition(intent.report_type)

        if user_type not in definition.allowed_roles:
            raise BusinessException(
                "You do not have permission to run this report."
            )

        self._normalize_intent(intent)
        self._validate_metrics(intent, definition)
        self._validate_dimensions(intent, definition)
        self._validate_filters(intent, definition)
        self._validate_sort(intent, definition)
        self._apply_defaults(intent, definition)

        return definition

    def _normalize_intent(
        self,
        intent: DynamicReportIntent,
    ) -> None:
        intent.metrics = [
            metric.strip()
            for metric in intent.metrics
            if metric and metric.strip()
        ]

        intent.dimensions = [
            dimension.strip()
            for dimension in intent.dimensions
            if dimension and dimension.strip()
        ]

        intent.filters = {
            str(key).strip(): value
            for key, value in intent.filters.items()
            if str(key).strip()
            and value is not None
            and value != ""
        }

    def _validate_metrics(
        self,
        intent: DynamicReportIntent,
        definition: ReportDefinition,
    ) -> None:
        invalid_metrics = [
            metric
            for metric in intent.metrics
            if metric not in definition.allowed_metrics
        ]

        if invalid_metrics:
            raise BusinessException(f"Invalid metrics: {invalid_metrics}")

    def _validate_dimensions(
        self,
        intent: DynamicReportIntent,
        definition: ReportDefinition,
    ) -> None:
        invalid_dimensions = [
            dimension
            for dimension in intent.dimensions
            if dimension not in definition.allowed_dimensions
        ]

        if invalid_dimensions:
            raise BusinessException(f"Invalid dimensions: {invalid_dimensions}")

    def _validate_filters(
        self,
        intent: DynamicReportIntent,
        definition: ReportDefinition,
    ) -> None:
        invalid_filters = [
            filter_name
            for filter_name in intent.filters.keys()
            if filter_name not in definition.allowed_filters
        ]

        if invalid_filters:
            raise BusinessException(f"Invalid filters: {invalid_filters}")

    def _validate_sort(
        self,
        intent: DynamicReportIntent,
        definition: ReportDefinition,
    ) -> None:
        invalid_sort_fields = [
            sort.field
            for sort in intent.sort
            if sort.field not in definition.allowed_sort_fields
        ]

        if invalid_sort_fields:
            raise BusinessException(
                f"Invalid sort fields: {invalid_sort_fields}"
            )

    def _apply_defaults(
        self,
        intent: DynamicReportIntent,
        definition: ReportDefinition,
    ) -> None:
        if not intent.metrics:
            intent.metrics = list(definition.default_metrics)

        if not intent.dimensions:
            intent.dimensions = list(definition.default_dimensions)

        if intent.limit is None:
            intent.limit = definition.default_limit
