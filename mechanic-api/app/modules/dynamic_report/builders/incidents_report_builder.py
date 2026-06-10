from __future__ import annotations

from typing import Any

from sqlalchemy import Select
from sqlalchemy import case
from sqlalchemy import distinct
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.sql.elements import ColumnElement

from app.common.exceptions import BusinessException
from app.modules.assignment.models import Assignment
from app.modules.dynamic_report.builders.base import DynamicReportBuilder
from app.modules.dynamic_report.date_ranges import resolve_date_filters
from app.modules.dynamic_report.schemas import (
    DynamicReportColumn,
    DynamicReportIntent,
    DynamicReportResult,
    DynamicReportScope,
)
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.tenant.models import Tenant
from app.modules.identity.tenant.models import TenantProfile
from app.modules.incident.models import Incident
from app.modules.incident_offer.models import IncidentOffer
from app.modules.service_catalog.models import ServiceCatalog


class IncidentsReportBuilder(DynamicReportBuilder):
    def build(
        self,
        *,
        intent: DynamicReportIntent,
        scope: DynamicReportScope,
    ) -> DynamicReportResult:
        dimension_expressions = self._build_dimension_expressions(intent)
        metric_expressions = self._build_metric_expressions(intent)

        query = self._base_query(
            dimension_expressions=dimension_expressions,
            metric_expressions=metric_expressions,
        )
        query = self._apply_scope(query=query, scope=scope)
        query = self._apply_filters(query=query, intent=intent)
        query = self._apply_group_by(
            query=query,
            dimension_expressions=dimension_expressions,
        )
        query = self._apply_sort(
            query=query,
            intent=intent,
            dimension_expressions=dimension_expressions,
            metric_expressions=metric_expressions,
        )
        query = self._apply_limit(query=query, intent=intent)

        rows = self.db.execute(query).mappings().all()
        columns = self._build_columns(intent)

        return DynamicReportResult(
            title=intent.title,
            description=intent.description,
            report_type="INCIDENTS",
            scope=scope,
            columns=columns,
            rows=[dict(row) for row in rows],
            metadata={
                "metrics": intent.metrics,
                "dimensions": intent.dimensions,
                "filters": intent.filters,
                "sort": [
                    sort.model_dump(mode="json")
                    for sort in intent.sort
                ],
                "limit": intent.limit,
            },
        )

    def _base_query(
        self,
        *,
        dimension_expressions: dict[str, ColumnElement[Any]],
        metric_expressions: dict[str, ColumnElement[Any]],
    ) -> Select:
        selected_columns = [
            expression.label(alias)
            for alias, expression in dimension_expressions.items()
        ]
        selected_columns.extend(
            expression.label(alias)
            for alias, expression in metric_expressions.items()
        )

        return (
            select(*selected_columns)
            .select_from(Incident)
            .outerjoin(
                Assignment,
                Assignment.incident_id == Incident.id,
            )
            .outerjoin(
                IncidentOffer,
                IncidentOffer.incident_id == Incident.id,
            )
            .outerjoin(
                ProviderProfile,
                ProviderProfile.id == func.coalesce(
                    Assignment.provider_profile_id,
                    IncidentOffer.provider_profile_id,
                ),
            )
            .outerjoin(
                Tenant,
                Tenant.id == ProviderProfile.tenant_id,
            )
            .outerjoin(
                TenantProfile,
                TenantProfile.tenant_id == Tenant.id,
            )
            .outerjoin(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
            )
            .where(
                Incident.deleted_at.is_(None),
            )
        )

    def _build_dimension_expressions(
        self,
        intent: DynamicReportIntent,
    ) -> dict[str, ColumnElement[Any]]:
        expressions: dict[str, ColumnElement[Any]] = {}

        for dimension in intent.dimensions:
            if dimension == "provider":
                expressions["provider"] = func.coalesce(
                    Tenant.commercial_name,
                    TenantProfile.legal_name,
                    "Sin taller",
                )
            elif dimension == "service":
                expressions["service"] = func.coalesce(
                    ServiceCatalog.service_name,
                    "Sin servicio",
                )
            elif dimension == "status":
                expressions["status"] = getattr(Incident, "status")
            elif dimension == "day":
                expressions["day"] = func.to_char(
                    Incident.created_at,
                    "YYYY-MM-DD",
                )
            elif dimension == "month":
                expressions["month"] = func.to_char(
                    Incident.created_at,
                    "YYYY-MM",
                )
            elif dimension == "year":
                expressions["year"] = func.to_char(
                    Incident.created_at,
                    "YYYY",
                )
            else:
                raise BusinessException(
                    f"Unsupported INCIDENTS dimension: {dimension}."
                )

        return expressions

    def _build_metric_expressions(
        self,
        intent: DynamicReportIntent,
    ) -> dict[str, ColumnElement[Any]]:
        expressions: dict[str, ColumnElement[Any]] = {}

        for metric in intent.metrics:
            if metric == "incident_count":
                expressions["incident_count"] = func.count(distinct(Incident.id))
            elif metric == "completed_incidents":
                expressions["completed_incidents"] = func.count(
                    distinct(
                        case(
                            (
                                Incident.status == "COMPLETED",
                                Incident.id,
                            ),
                            else_=None,
                        )
                    )
                )
            elif metric == "cancelled_incidents":
                expressions["cancelled_incidents"] = func.count(
                    distinct(
                        case(
                            (
                                Incident.status == "CANCELLED",
                                Incident.id,
                            ),
                            else_=None,
                        )
                    )
                )
            elif metric == "rejected_incidents":
                expressions["rejected_incidents"] = func.count(
                    distinct(
                        case(
                            (
                                IncidentOffer.offer_status == "REJECTED",
                                IncidentOffer.id,
                            ),
                            else_=None,
                        )
                    )
                )
            elif metric == "average_response_time":
                expressions["average_response_time"] = func.round(
                    func.avg(
                        case(
                            (
                                IncidentOffer.responded_at.is_not(None),
                                func.extract(
                                    "epoch",
                                    IncidentOffer.responded_at - IncidentOffer.created_at,
                                )
                                / 60,
                            ),
                            else_=None,
                        )
                    ),
                    2,
                )
            elif metric == "average_completion_time":
                expressions["average_completion_time"] = func.round(
                    func.avg(
                        case(
                            (
                                Incident.completed_at.is_not(None),
                                func.extract(
                                    "epoch",
                                    Incident.completed_at - Incident.created_at,
                                )
                                / 60,
                            ),
                            else_=None,
                        )
                    ),
                    2,
                )
            else:
                raise BusinessException(
                    f"Unsupported INCIDENTS metric: {metric}."
                )

        return expressions

    def _apply_scope(
        self,
        *,
        query: Select,
        scope: DynamicReportScope,
    ) -> Select:
        if scope == "PLATFORM":
            return query

        if scope == "TENANT":
            if self.context.tenant_id is None:
                raise BusinessException("Tenant scope requires tenant_id.")

            return query.where(
                ProviderProfile.tenant_id == self.context.tenant_id,
            )

        raise BusinessException(f"Unsupported scope: {scope}.")

    def _apply_filters(
        self,
        *,
        query: Select,
        intent: DynamicReportIntent,
    ) -> Select:
        filters = intent.filters

        status = filters.get("status")
        if status is not None:
            query = query.where(
                Incident.status == str(status).strip().upper()
            )

        provider_id = filters.get("provider_id")
        if provider_id is not None:
            query = query.where(
                ProviderProfile.id == provider_id
            )

        provider_name = filters.get("provider_name")
        if provider_name is not None:
            normalized_provider_name = f"%{str(provider_name).strip()}%"
            query = query.where(
                func.concat(
                    func.coalesce(Tenant.commercial_name, ""),
                    " ",
                    func.coalesce(TenantProfile.legal_name, ""),
                ).ilike(normalized_provider_name)
            )

        service_catalog_id = filters.get("service_catalog_id")
        if service_catalog_id is not None:
            query = query.where(
                Incident.service_catalog_id == service_catalog_id
            )

        service_name = filters.get("service_name")
        if service_name is not None:
            query = query.where(
                ServiceCatalog.service_name.ilike(
                    f"%{str(service_name).strip()}%"
                )
            )

        date_from, date_to = resolve_date_filters(filters)

        if date_from is not None:
            query = query.where(
                Incident.created_at >= date_from,
            )

        if date_to is not None:
            query = query.where(
                Incident.created_at <= date_to,
            )

        return query

    def _apply_group_by(
        self,
        *,
        query: Select,
        dimension_expressions: dict[str, ColumnElement[Any]],
    ) -> Select:
        if not dimension_expressions:
            return query

        return query.group_by(
            *dimension_expressions.values(),
        )

    def _apply_sort(
        self,
        *,
        query: Select,
        intent: DynamicReportIntent,
        dimension_expressions: dict[str, ColumnElement[Any]],
        metric_expressions: dict[str, ColumnElement[Any]],
    ) -> Select:
        expressions: dict[str, ColumnElement[Any]] = {
            **dimension_expressions,
            **metric_expressions,
        }
        expressions.setdefault("created_at", func.max(Incident.created_at))

        if not intent.sort:
            first_metric = intent.metrics[0] if intent.metrics else None

            if first_metric and first_metric in expressions:
                return query.order_by(expressions[first_metric].desc())

            return query

        order_by_clauses = []

        for sort in intent.sort:
            expression = expressions.get(sort.field)

            if expression is None:
                raise BusinessException(
                    f"Unsupported sort field: {sort.field}."
                )

            if sort.direction == "ASC":
                order_by_clauses.append(expression.asc())
            else:
                order_by_clauses.append(expression.desc())

        return query.order_by(*order_by_clauses)

    def _apply_limit(
        self,
        *,
        query: Select,
        intent: DynamicReportIntent,
    ) -> Select:
        if intent.limit is None:
            return query

        return query.limit(intent.limit)

    def _build_columns(
        self,
        intent: DynamicReportIntent,
    ) -> list[DynamicReportColumn]:
        columns: list[DynamicReportColumn] = []

        for dimension in intent.dimensions:
            columns.append(
                DynamicReportColumn(
                    key=dimension,
                    label=self._label_for(dimension),
                    type="text",
                )
            )

        for metric in intent.metrics:
            columns.append(
                DynamicReportColumn(
                    key=metric,
                    label=self._label_for(metric),
                    type="number",
                )
            )

        return columns

    def _label_for(self, key: str) -> str:
        labels = {
            "provider": "Taller",
            "service": "Servicio",
            "status": "Estado",
            "day": "Día",
            "month": "Mes",
            "year": "Año",
            "incident_count": "Total de incidentes",
            "completed_incidents": "Incidentes completados",
            "cancelled_incidents": "Incidentes cancelados",
            "rejected_incidents": "Incidentes rechazados",
            "average_response_time": "Tiempo promedio de respuesta (min)",
            "average_completion_time": "Tiempo promedio de finalización (min)",
        }

        return labels.get(
            key,
            key.replace("_", " ").title(),
        )
