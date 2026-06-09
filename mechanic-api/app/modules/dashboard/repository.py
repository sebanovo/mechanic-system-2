from __future__ import annotations

from collections import defaultdict
from datetime import datetime
from typing import Any
from uuid import UUID

from sqlalchemy import and_, exists, func, or_, select
from sqlalchemy.orm import Session, aliased

from app.common.uuid import to_uuid
from app.modules.assignment.models import Assignment
from app.modules.assignment_tracking_event.models import AssignmentTrackingEvent
from app.modules.audit.models import AuditEvent
from app.modules.identity.provider.models import ProviderProfile
from app.modules.identity.technician.models import Technician
from app.modules.identity.tenant.models import Tenant
from app.modules.identity.user.models import User
from app.modules.incident.models import Incident
from app.modules.incident_candidate_provider.models import IncidentCandidateProvider
from app.modules.incident_offer.models import IncidentOffer
from app.modules.service_catalog.models import ServiceCatalog


def _to_uuid(value: str | UUID, field_name: str = "id") -> UUID:
    return to_uuid(value, field_name)


class DashboardRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_average_arrival_time(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> float:
        expr = func.avg(
            func.extract(
                "epoch",
                Assignment.arrived_at - Assignment.assigned_at,
            )
            / 60.0
        )

        value = self._scalar_assignment_metric(
            expr,
            provider_profile_id=provider_profile_id,
            date_from=date_from,
            date_to=date_to,
            status_filter="COMPLETED",
            date_column=Assignment.arrived_at,
        )

        return float(value or 0)

    def get_average_resolution_time(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> float:
        value = self._average_resolution_time_from_tracking(
            assignment_filter=Assignment.provider_profile_id == _to_uuid(
                provider_profile_id,
                "provider_profile_id",
            ),
            date_from=date_from,
            date_to=date_to,
        )

        return float(value or 0)

    def _average_resolution_time_from_tracking(
        self,
        *,
        assignment_filter: Any | None,
        date_from: datetime,
        date_to: datetime,
    ) -> float:
        completed_assignments = (
            self._completed_assignments_with_resolution_minutes_query(
                assignment_filter=assignment_filter,
                date_from=date_from,
                date_to=date_to,
            ).subquery()
        )

        value = self.db.scalar(
            select(func.avg(completed_assignments.c.resolution_minutes))
        )
        return round(float(value or 0), 2)

    def _completed_assignments_with_resolution_minutes_query(
        self,
        *,
        assignment_filter: Any | None = None,
        date_from: datetime,
        date_to: datetime,
    ):
        started_events = aliased(AssignmentTrackingEvent)
        completed_events = aliased(AssignmentTrackingEvent)

        resolution_minutes = (
            func.extract(
                "epoch",
                completed_events.occurred_at - started_events.occurred_at,
            )
            / 60.0
        ).label("resolution_minutes")

        query = (
            select(
                Assignment.id.label("assignment_id"),
                Assignment.provider_profile_id.label("provider_profile_id"),
                Assignment.technician_id.label("technician_id"),
                Assignment.incident_id.label("incident_id"),
                resolution_minutes,
            )
            .select_from(Assignment)
            .join(
                started_events,
                and_(
                    started_events.assignment_id == Assignment.id,
                    started_events.event_type == "SERVICE_STARTED",
                ),
            )
            .join(
                completed_events,
                and_(
                    completed_events.assignment_id == Assignment.id,
                    completed_events.event_type == "SERVICE_COMPLETED",
                ),
            )
            .where(
                Assignment.assignment_status == "COMPLETED",
                completed_events.occurred_at >= date_from,
                completed_events.occurred_at <= date_to,
            )
        )

        if assignment_filter is not None:
            query = query.where(assignment_filter)

        return query

    def get_completed_cases(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        return self._count_assignments(
            provider_profile_id=provider_profile_id,
            date_from=date_from,
            date_to=date_to,
            status="COMPLETED",
            date_column=Assignment.completed_at,
        )

    def get_cancelled_cases_by_actor(
        self,
        *,
        tenant_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, Any]:
        rows = self.db.execute(
            self._tenant_related_cancelled_incidents_query(
                tenant_id=_to_uuid(tenant_id, "tenant_id"),
                date_from=date_from,
                date_to=date_to,
            )
        ).all()

        by_actor = {"CLIENT": 0, "TENANT_OWNER": 0, "TECHNICIAN": 0}
        total = 0

        for actor_type, count in rows:
            actor = (actor_type or "").upper()
            value = int(count or 0)
            total += value
            if actor in by_actor:
                by_actor[actor] += value

        return {
            "total": total,
            "by_actor": {
                "client": by_actor["CLIENT"],
                "owner": by_actor["TENANT_OWNER"],
                "technician": by_actor["TECHNICIAN"],
            },
        }

    def _tenant_related_cancelled_incidents_query(
        self,
        *,
        tenant_id: UUID,
        date_from: datetime,
        date_to: datetime,
    ):
        related_incidents = (
            select(Incident.id.label("incident_id"))
            .select_from(Incident)
            .where(
                Incident.deleted_at.is_(None),
                Incident.status == "CANCELLED",
                Incident.cancelled_at.is_not(None),
                Incident.cancelled_at >= date_from,
                Incident.cancelled_at <= date_to,
                or_(
                    exists(
                        select(IncidentCandidateProvider.id)
                        .select_from(IncidentCandidateProvider)
                        .join(
                            ProviderProfile,
                            ProviderProfile.id
                            == IncidentCandidateProvider.provider_profile_id,
                        )
                        .where(
                            IncidentCandidateProvider.incident_id == Incident.id,
                            ProviderProfile.tenant_id == tenant_id,
                        )
                    ),
                    exists(
                        select(IncidentOffer.id)
                        .select_from(IncidentOffer)
                        .join(
                            ProviderProfile,
                            ProviderProfile.id == IncidentOffer.provider_profile_id,
                        )
                        .where(
                            IncidentOffer.incident_id == Incident.id,
                            ProviderProfile.tenant_id == tenant_id,
                        )
                    ),
                    exists(
                        select(Assignment.id)
                        .select_from(Assignment)
                        .join(
                            ProviderProfile,
                            ProviderProfile.id == Assignment.provider_profile_id,
                        )
                        .where(
                            Assignment.incident_id == Incident.id,
                            ProviderProfile.tenant_id == tenant_id,
                        )
                    ),
                ),
            )
            .subquery()
        )
        return (
            select(
                AuditEvent.actor_type,
                func.count(AuditEvent.id).label("total"),
            )
            .select_from(AuditEvent)
            .join(related_incidents, related_incidents.c.incident_id == AuditEvent.resource_id)
            .where(
                AuditEvent.scope == "TENANT",
                AuditEvent.resource_type == "incident",
                AuditEvent.event_type == "INCIDENT_CANCELLED",
                AuditEvent.created_at >= date_from,
                AuditEvent.created_at <= date_to,
            )
            .group_by(AuditEvent.actor_type)
        )

    def get_top_incident_types(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                ServiceCatalog.service_name.label("service_name"),
                func.count(Assignment.id).label("total"),
            )
            .join(Incident, Incident.id == Assignment.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Assignment.assigned_at >= date_from,
                Assignment.assigned_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(ServiceCatalog.service_name)
            .order_by(func.count(Assignment.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [
            {
                "name": row[0] if row[0] is not None else "Sin servicio",
                "total": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_top_technicians(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                func.trim(
                    func.concat(
                        func.coalesce(User.first_name, ""),
                        " ",
                        func.coalesce(User.last_name, ""),
                    )
                ).label("name"),
                func.count(Assignment.id).label("completed_services"),
            )
            .join(Technician, Technician.id == Assignment.technician_id)
            .join(User, User.id == Technician.user_id)
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Assignment.assignment_status == "COMPLETED",
                Assignment.completed_at.is_not(None),
                Assignment.completed_at >= date_from,
                Assignment.completed_at <= date_to,
                Technician.deleted_at.is_(None),
                User.deleted_at.is_(None),
            )
            .group_by(
                User.first_name,
                User.last_name,
            )
            .order_by(func.count(Assignment.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [{"name": row[0], "completed_services": int(row[1] or 0)} for row in rows]

    def get_top_zones(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                Incident.address_text.label("name"),
                func.count(Assignment.id).label("total"),
            )
            .join(Incident, Incident.id == Assignment.incident_id)
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Assignment.assigned_at >= date_from,
                Assignment.assigned_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(Incident.address_text)
            .order_by(func.count(Assignment.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [
            {
                "name": row[0] if row[0] is not None else "Sin zona",
                "total": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_top_workshops(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self._completed_assignment_rows_global(
            date_from=date_from,
            date_to=date_to,
        )

        stats: dict[str, dict[str, int]] = defaultdict(
            lambda: {"completed_services": 0, "within": 0}
        )

        for tenant_name, _, duration_minutes, max_duration_minutes in rows:
            name = tenant_name or "Sin taller"
            stats[name]["completed_services"] += 1
            if (
                max_duration_minutes is not None
                and duration_minutes is not None
                and duration_minutes <= max_duration_minutes
            ):
                stats[name]["within"] += 1

        workshops: list[dict[str, Any]] = []
        for name, values in stats.items():
            completed_services = values["completed_services"]
            if completed_services <= 0:
                continue
            efficiency = (
                values["within"] / completed_services * 100.0
                if completed_services
                else 0.0
            )
            workshops.append(
                {
                    "name": name,
                    "completed_services": completed_services,
                    "efficiency": round(efficiency, 1),
                }
            )

        workshops.sort(
            key=lambda item: (
                item["completed_services"],
                item["efficiency"],
            ),
            reverse=True,
        )
        return workshops[:limit]

    def get_services_within_estimated_time(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, Any]:
        completed_rows = self._completed_service_rows(
            provider_profile_id=provider_profile_id,
            date_from=date_from,
            date_to=date_to,
        )

        completed = 0
        out_of_time = 0

        for _, duration_minutes, max_duration_minutes in completed_rows:
            completed += 1
            if max_duration_minutes is None:
                continue
            if duration_minutes is None or duration_minutes > max_duration_minutes:
                out_of_time += 1

        within_time = completed - out_of_time
        percentage = (within_time / completed * 100.0) if completed else 0.0

        return {
            "percentage": round(percentage, 1),
            "completed": completed,
            "out_of_time": out_of_time,
        }

    def get_current_assignment(
        self,
        technician_id: str | UUID,
    ) -> dict[str, Any]:
        row = self.db.execute(
            select(
                Assignment.assignment_status,
                Incident.incident_code,
                ServiceCatalog.service_name,
            )
            .select_from(Assignment)
            .join(Incident, Incident.id == Assignment.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Assignment.technician_id == _to_uuid(technician_id, "technician_id"),
                Assignment.assignment_status.in_(
                    ["ASSIGNED", "EN_ROUTE", "ARRIVED", "IN_SERVICE"]
                ),
                Incident.deleted_at.is_(None),
            )
            .order_by(Assignment.created_at.desc())
            .limit(1)
        ).first()

        if row is None:
            return {
                "has_active_assignment": False,
                "assignment_status": None,
                "incident_code": None,
                "service_name": None,
            }

        return {
            "has_active_assignment": True,
            "assignment_status": row[0],
            "incident_code": row[1],
            "service_name": row[2],
        }

    def get_average_arrival_time_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> float:
        expr = func.avg(
            func.extract(
                "epoch",
                Assignment.arrived_at - Assignment.assigned_at,
            )
            / 60.0
        )

        value = self._scalar_assignment_metric_for_technician(
            expr,
            technician_id=technician_id,
            date_from=date_from,
            date_to=date_to,
            status_filter="COMPLETED",
            date_column=Assignment.arrived_at,
        )

        return float(value or 0)

    def get_average_resolution_time_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> float:
        value = self._average_resolution_time_from_tracking(
            assignment_filter=Assignment.technician_id == _to_uuid(
                technician_id,
                "technician_id",
            ),
            date_from=date_from,
            date_to=date_to,
        )

        return float(value or 0)

    def _scalar_assignment_metric_for_technician(
        self,
        expr,
        *,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        status_filter: str | None = None,
        date_column,
    ) -> float | None:
        query = select(expr).select_from(Assignment).where(
            Assignment.technician_id == _to_uuid(
                technician_id,
                "technician_id",
            ),
            date_column.is_not(None),
            date_column >= date_from,
            date_column <= date_to,
        )

        if status_filter is not None:
            query = query.where(Assignment.assignment_status == status_filter)

        value = self.db.scalar(query)
        return float(value) if value is not None else None

    def _count_assignments_for_technician(
        self,
        *,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        status: str | None = None,
        date_column,
    ) -> int:
        query = select(func.count()).select_from(Assignment).where(
            Assignment.technician_id == _to_uuid(
                technician_id,
                "technician_id",
            ),
            date_column.is_not(None),
            date_column >= date_from,
            date_column <= date_to,
        )

        if status is not None:
            query = query.where(Assignment.assignment_status == status)

        value = self.db.scalar(query)
        return int(value or 0)

    def get_completed_cases_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        return self._count_assignments_for_technician(
            technician_id=technician_id,
            date_from=date_from,
            date_to=date_to,
            status="COMPLETED",
            date_column=Assignment.completed_at,
        )

    def get_cancelled_cases_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        return self._count_assignments_for_technician(
            technician_id=technician_id,
            date_from=date_from,
            date_to=date_to,
            status="CANCELLED",
            date_column=Assignment.cancelled_at,
        )

    def get_services_by_type_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                ServiceCatalog.service_name.label("name"),
                func.count(Assignment.id).label("value"),
            )
            .select_from(Assignment)
            .join(Incident, Incident.id == Assignment.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Assignment.technician_id == _to_uuid(technician_id, "technician_id"),
                Assignment.completed_at.is_not(None),
                Assignment.completed_at >= date_from,
                Assignment.completed_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(ServiceCatalog.service_name)
            .order_by(func.count(Assignment.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [
            {
                "name": row[0] if row[0] is not None else "Sin servicio",
                "value": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_completed_services_trend_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                func.date(Assignment.completed_at).label("day"),
                func.count(Assignment.id).label("completed"),
            )
            .select_from(Assignment)
            .where(
                Assignment.technician_id == _to_uuid(technician_id, "technician_id"),
                Assignment.assignment_status == "COMPLETED",
                Assignment.completed_at.is_not(None),
                Assignment.completed_at >= date_from,
                Assignment.completed_at <= date_to,
            )
            .group_by(func.date(Assignment.completed_at))
        )

        trend: dict[str, dict[str, int]] = defaultdict(
            lambda: {"completed": 0}
        )

        for day, completed in self.db.execute(query).all():
            trend[str(day)]["completed"] = int(completed or 0)

        return [
            {
                "date": day,
                "completed": values["completed"],
            }
            for day, values in sorted(trend.items())
        ]

    def get_service_compliance_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self._completed_assignment_rows_for_technician(
            technician_id=technician_id,
            date_from=date_from,
            date_to=date_to,
        )

        stats: dict[str, dict[str, int]] = defaultdict(
            lambda: {"completed": 0, "within": 0}
        )

        for service_name, duration_minutes, max_duration_minutes in rows:
            name = service_name or "Sin servicio"
            stats[name]["completed"] += 1
            if (
                max_duration_minutes is not None
                and duration_minutes is not None
                and duration_minutes <= max_duration_minutes
            ):
                stats[name]["within"] += 1

        compliance: list[dict[str, Any]] = []
        for service_name, values in stats.items():
            if values["completed"] == 0:
                continue
            percentage = (values["within"] / values["completed"]) * 100.0
            compliance.append(
                {
                    "service_name": service_name,
                    "percentage": round(percentage, 1),
                }
            )

        compliance.sort(key=lambda item: item["percentage"], reverse=True)
        return compliance[:limit]

    def get_top_zones_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                Incident.address_text.label("zone"),
                func.count(Assignment.id).label("incidents"),
            )
            .select_from(Assignment)
            .join(Incident, Incident.id == Assignment.incident_id)
            .where(
                Assignment.technician_id == _to_uuid(technician_id, "technician_id"),
                Assignment.completed_at.is_not(None),
                Assignment.completed_at >= date_from,
                Assignment.completed_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(Incident.address_text)
            .order_by(func.count(Assignment.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [
            {
                "zone": row[0] if row[0] is not None else "Sin zona",
                "incidents": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_current_incident(
        self,
        customer_id: str | UUID,
    ) -> dict[str, Any]:
        active_statuses = [
            "REPORTED",
            "WAITING_PROVIDER_RESPONSE",
            "PROVIDER_ACCEPTED",
            "TECHNICIAN_ASSIGNED",
            "EN_ROUTE",
            "ARRIVED",
            "IN_SERVICE",
        ]

        row = self.db.execute(
            select(
                Incident.status,
                Incident.incident_code,
                ServiceCatalog.service_name,
            )
            .select_from(Incident)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Incident.customer_id == _to_uuid(customer_id, "customer_id"),
                Incident.deleted_at.is_(None),
                Incident.status.in_(active_statuses),
            )
            .order_by(Incident.reported_at.desc())
            .limit(1)
        ).first()

        if row is None:
            return {
                "has_active_incident": False,
                "incident_status": None,
                "incident_code": None,
                "service_name": None,
            }

        return {
            "has_active_incident": True,
            "incident_status": row[0],
            "incident_code": row[1],
            "service_name": row[2],
        }

    def get_completed_cases_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        return self._count_incidents_for_customer(
            customer_id=customer_id,
            date_from=date_from,
            date_to=date_to,
            status="COMPLETED",
        )

    def get_cancelled_cases_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        return self._count_incidents_for_customer(
            customer_id=customer_id,
            date_from=date_from,
            date_to=date_to,
            status="CANCELLED",
        )

    def get_unattended_cases_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        return self._count_incidents_for_customer(
            customer_id=customer_id,
            date_from=date_from,
            date_to=date_to,
            status="UNATTENDED",
        )

    def get_total_requested_services_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        value = self.db.scalar(
            select(func.count()).select_from(Incident).where(
                Incident.customer_id == _to_uuid(customer_id, "customer_id"),
                Incident.deleted_at.is_(None),
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
            )
        )

        return int(value or 0)

    def get_services_by_type_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                ServiceCatalog.service_name.label("name"),
                func.count(Incident.id).label("value"),
            )
            .select_from(Incident)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Incident.customer_id == _to_uuid(customer_id, "customer_id"),
                Incident.deleted_at.is_(None),
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
            )
            .group_by(ServiceCatalog.service_name)
            .order_by(func.count(Incident.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [
            {
                "name": row[0] if row[0] is not None else "Sin servicio",
                "value": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_requested_services_trend_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                func.date(Incident.reported_at).label("day"),
                func.count(Incident.id).label("requested"),
            )
            .select_from(Incident)
            .where(
                Incident.customer_id == _to_uuid(customer_id, "customer_id"),
                Incident.deleted_at.is_(None),
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
            )
            .group_by(func.date(Incident.reported_at))
        )

        trend: dict[str, dict[str, int]] = defaultdict(
            lambda: {"requested": 0}
        )

        for day, requested in self.db.execute(query).all():
            trend[str(day)]["requested"] = int(requested or 0)

        return [
            {
                "date": day,
                "requested": values["requested"],
            }
            for day, values in sorted(trend.items())
        ]

    def get_cases_by_status_for_customer(
        self,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                Incident.status.label("status"),
                func.count(Incident.id).label("value"),
            )
            .select_from(Incident)
            .where(
                Incident.customer_id == _to_uuid(customer_id, "customer_id"),
                Incident.deleted_at.is_(None),
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
            )
            .group_by(Incident.status)
            .order_by(func.count(Incident.id).desc())
        )

        rows = self.db.execute(query).all()
        return [
            {
                "status": row[0],
                "value": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_incidents_by_service(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                ServiceCatalog.service_name.label("service_name"),
                func.count(Assignment.id).label("value"),
            )
            .join(Incident, Incident.id == Assignment.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Assignment.assigned_at >= date_from,
                Assignment.assigned_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(ServiceCatalog.service_name)
            .order_by(func.count(Assignment.id).desc())
            .limit(limit)
        )

        rows = self.db.execute(query).all()
        return [
            {
                "name": row[0] if row[0] is not None else "Sin servicio",
                "value": int(row[1] or 0),
            }
            for row in rows
        ]

    def get_operational_trend(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[dict[str, Any]]:
        completed_query = (
            select(
                func.date(Assignment.completed_at).label("day"),
                func.count(Assignment.id).label("completed"),
            )
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Assignment.assignment_status == "COMPLETED",
                Assignment.completed_at.is_not(None),
                Assignment.completed_at >= date_from,
                Assignment.completed_at <= date_to,
            )
            .group_by(func.date(Assignment.completed_at))
        )

        cancelled_query = (
            select(
                func.date(Assignment.cancelled_at).label("day"),
                func.count(Assignment.id).label("cancelled"),
            )
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Assignment.assignment_status == "CANCELLED",
                Assignment.cancelled_at.is_not(None),
                Assignment.cancelled_at >= date_from,
                Assignment.cancelled_at <= date_to,
            )
            .group_by(func.date(Assignment.cancelled_at))
        )

        unattended_query = (
            select(
                func.date(Incident.unattended_at).label("day"),
                func.count(Incident.id).label("unattended"),
            )
            .join(Assignment, Assignment.incident_id == Incident.id)
            .where(
                Assignment.provider_profile_id == _to_uuid(
                    provider_profile_id,
                    "provider_profile_id",
                ),
                Incident.unattended_at.is_not(None),
                Incident.unattended_at >= date_from,
                Incident.unattended_at <= date_to,
            )
            .group_by(func.date(Incident.unattended_at))
        )

        trend: dict[str, dict[str, int]] = defaultdict(
            lambda: {"completed": 0, "cancelled": 0, "unattended": 0}
        )

        for day, completed in self.db.execute(completed_query).all():
            trend[str(day)]["completed"] = int(completed or 0)

        for day, cancelled in self.db.execute(cancelled_query).all():
            trend[str(day)]["cancelled"] = int(cancelled or 0)

        for day, unattended in self.db.execute(unattended_query).all():
            trend[str(day)]["unattended"] = int(unattended or 0)

        return [
            {
                "date": day,
                "completed": values["completed"],
                "cancelled": values["cancelled"],
                "unattended": values["unattended"],
            }
            for day, values in sorted(trend.items())
        ]

    def get_technician_performance(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        return self.get_top_technicians(
            provider_profile_id,
            date_from,
            date_to,
            limit,
        )

    def get_service_compliance(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self._completed_service_rows(
            provider_profile_id=provider_profile_id,
            date_from=date_from,
            date_to=date_to,
        )

        stats: dict[str, dict[str, int]] = defaultdict(
            lambda: {"completed": 0, "within": 0}
        )

        for service_name, duration_minutes, max_duration_minutes in rows:
            name = service_name or "Sin servicio"
            stats[name]["completed"] += 1
            if (
                max_duration_minutes is not None
                and duration_minutes is not None
                and duration_minutes <= max_duration_minutes
            ):
                stats[name]["within"] += 1

        compliance: list[dict[str, Any]] = []
        for service_name, values in stats.items():
            if values["completed"] == 0:
                continue
            percentage = (values["within"] / values["completed"]) * 100.0
            compliance.append(
                {
                    "service_name": service_name,
                    "percentage": round(percentage, 1),
                }
            )

        compliance.sort(key=lambda item: item["percentage"], reverse=True)
        return compliance[:limit]

    def get_top_zones_chart(
        self,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self.get_top_zones(
            provider_profile_id,
            date_from,
            date_to,
            limit,
        )

        return [
            {
                "zone": row["name"],
                "incidents": row["total"],
            }
            for row in rows
        ]

    def _scalar_assignment_metric(
        self,
        expr,
        *,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        status_filter: str | None = None,
        date_column,
    ) -> float | None:
        query = select(expr).select_from(Assignment).where(
            Assignment.provider_profile_id == _to_uuid(
                provider_profile_id,
                "provider_profile_id",
            ),
            date_column.is_not(None),
            date_column >= date_from,
            date_column <= date_to,
        )

        if status_filter is not None:
            query = query.where(Assignment.assignment_status == status_filter)

        value = self.db.scalar(query)
        return float(value) if value is not None else None

    def _count_assignments(
        self,
        *,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        status: str | None = None,
        date_column,
    ) -> int:
        query = select(func.count()).select_from(Assignment).where(
            Assignment.provider_profile_id == _to_uuid(
                provider_profile_id,
                "provider_profile_id",
            ),
            date_column.is_not(None),
            date_column >= date_from,
            date_column <= date_to,
        )

        if status is not None:
            query = query.where(Assignment.assignment_status == status)

        value = self.db.scalar(query)
        return int(value or 0)

    def get_services_within_estimated_time_for_technician(
        self,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, Any]:
        rows = self._completed_assignment_rows_for_technician(
            technician_id=technician_id,
            date_from=date_from,
            date_to=date_to,
        )

        completed = 0
        out_of_time = 0

        for _, duration_minutes, max_duration_minutes in rows:
            completed += 1
            if max_duration_minutes is None:
                continue
            if duration_minutes is None or duration_minutes > max_duration_minutes:
                out_of_time += 1

        within_time = completed - out_of_time
        percentage = (within_time / completed * 100.0) if completed else 0.0

        return {
            "percentage": round(percentage, 1),
            "completed": completed,
            "out_of_time": out_of_time,
        }

    def _cancelled_assignment_audit_rows(
        self,
        *,
        tenant_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[tuple[str | None, int]]:
        query = (
            select(
                AuditEvent.actor_type,
                func.count(AuditEvent.id).label("total"),
            )
            .join(
                Assignment,
                Assignment.id == AuditEvent.resource_id,
            )
            .where(
                AuditEvent.scope == "TENANT",
                AuditEvent.tenant_id == _to_uuid(tenant_id, "tenant_id"),
                AuditEvent.resource_type == "assignment",
                AuditEvent.event_type == "ASSIGNMENT_CANCELLED",
                AuditEvent.created_at >= date_from,
                AuditEvent.created_at <= date_to,
            )
            .group_by(AuditEvent.actor_type)
        )

        rows = self.db.execute(query).all()
        return [(row[0], int(row[1] or 0)) for row in rows]

    def _completed_service_rows(
        self,
        *,
        provider_profile_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[tuple[str | None, float | None, int | None]]:
        completed_assignments = (
            self._completed_assignments_with_resolution_minutes_query(
                assignment_filter=Assignment.provider_profile_id
                == _to_uuid(provider_profile_id, "provider_profile_id"),
                date_from=date_from,
                date_to=date_to,
            ).subquery()
        )

        max_duration_minutes = func.coalesce(
            ServiceCatalog.max_duration_minutes,
            ServiceCatalog.min_duration_minutes,
        )

        query = (
            select(
                ServiceCatalog.service_name,
                completed_assignments.c.resolution_minutes,
                max_duration_minutes.label("max_duration_minutes"),
            )
            .select_from(completed_assignments)
            .join(Incident, Incident.id == completed_assignments.c.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(Incident.deleted_at.is_(None))
        )

        rows = self.db.execute(query).all()
        return [
            (
                row[0],
                float(row[1]) if row[1] is not None else None,
                int(row[2]) if row[2] is not None else None,
            )
            for row in rows
        ]

    def _completed_assignment_rows_global(
        self,
        *,
        date_from: datetime,
        date_to: datetime,
    ) -> list[tuple[str | None, str | None, float | None, int | None]]:
        completed_assignments = (
            self._completed_assignments_with_resolution_minutes_query(
                date_from=date_from,
                date_to=date_to,
            ).subquery()
        )

        max_duration_minutes = func.coalesce(
            ServiceCatalog.max_duration_minutes,
            ServiceCatalog.min_duration_minutes,
        )

        query = (
            select(
                Tenant.commercial_name,
                ServiceCatalog.service_name,
                completed_assignments.c.resolution_minutes,
                max_duration_minutes.label("max_duration_minutes"),
            )
            .select_from(completed_assignments)
            .join(
                ProviderProfile,
                ProviderProfile.id == completed_assignments.c.provider_profile_id,
            )
            .join(Tenant, Tenant.id == ProviderProfile.tenant_id)
            .join(Incident, Incident.id == completed_assignments.c.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(Tenant.deleted_at.is_(None), Incident.deleted_at.is_(None))
        )

        rows = self.db.execute(query).all()
        return [
            (
                row[0],
                row[1],
                float(row[2]) if row[2] is not None else None,
                int(row[3]) if row[3] is not None else None,
            )
            for row in rows
        ]

    def _completed_assignment_rows_for_technician(
        self,
        *,
        technician_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
    ) -> list[tuple[str | None, float | None, int | None]]:
        completed_assignments = (
            self._completed_assignments_with_resolution_minutes_query(
                assignment_filter=Assignment.technician_id
                == _to_uuid(technician_id, "technician_id"),
                date_from=date_from,
                date_to=date_to,
            ).subquery()
        )

        max_duration_minutes = func.coalesce(
            ServiceCatalog.max_duration_minutes,
            ServiceCatalog.min_duration_minutes,
        )

        query = (
            select(
                ServiceCatalog.service_name,
                completed_assignments.c.resolution_minutes,
                max_duration_minutes.label("max_duration_minutes"),
            )
            .select_from(completed_assignments)
            .join(Incident, Incident.id == completed_assignments.c.incident_id)
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(Incident.deleted_at.is_(None))
        )

        rows = self.db.execute(query).all()
        return [
            (
                row[0],
                float(row[1]) if row[1] is not None else None,
                int(row[2]) if row[2] is not None else None,
            )
            for row in rows
        ]

    def _count_incidents_for_customer(
        self,
        *,
        customer_id: str | UUID,
        date_from: datetime,
        date_to: datetime,
        status: str | None = None,
    ) -> int:
        query = select(func.count()).select_from(Incident).where(
            Incident.customer_id == _to_uuid(customer_id, "customer_id"),
            Incident.deleted_at.is_(None),
            Incident.reported_at >= date_from,
            Incident.reported_at <= date_to,
        )

        if status is not None:
            query = query.where(Incident.status == status)

        value = self.db.scalar(query)
        return int(value or 0)
