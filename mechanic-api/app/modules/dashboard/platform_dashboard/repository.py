from __future__ import annotations

from collections import defaultdict
from datetime import datetime
from typing import Any, DefaultDict

from sqlalchemy import func, select

from app.modules.audit.models import AuditEvent
from app.modules.assignment.models import Assignment
from app.modules.incident.models import Incident
from app.modules.incident_offer.models import IncidentOffer
from app.modules.service_catalog.models import ServiceCatalog
from app.modules.dashboard.repository import DashboardRepository


class PlatformDashboardRepository(DashboardRepository):
    def get_top_workshops(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        return self.get_top_workshops_global(
            date_from=date_from,
            date_to=date_to,
            limit=limit,
        )

    def get_total_incidents(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        value = self.db.scalar(
            select(func.count()).select_from(Incident).where(
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
                Incident.deleted_at.is_(None),
            )
        )

        return int(value or 0)

    def get_in_process_incidents(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, int]:
        statuses = [
            "WAITING_PROVIDER_RESPONSE",
            "PROVIDER_ACCEPTED",
            "TECHNICIAN_ASSIGNED",
            "EN_ROUTE",
            "ARRIVED",
            "IN_SERVICE",
        ]

        rows = self.db.execute(
            select(Incident.status, func.count(Incident.id))
            .where(
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
                Incident.deleted_at.is_(None),
                Incident.status.in_(statuses),
            )
            .group_by(Incident.status)
        ).all()

        counts = {status: 0 for status in statuses}
        total = 0

        for status, count in rows:
            normalized = str(status or "").upper()
            if normalized in counts:
                value = int(count or 0)
                counts[normalized] = value
                total += value

        return {
            "total": total,
            "waiting_provider_response": counts["WAITING_PROVIDER_RESPONSE"],
            "provider_accepted": counts["PROVIDER_ACCEPTED"],
            "technician_assigned": counts["TECHNICIAN_ASSIGNED"],
            "en_route": counts["EN_ROUTE"],
            "arrived": counts["ARRIVED"],
            "in_service": counts["IN_SERVICE"],
        }

    def get_completed_cases_global(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> int:
        value = self.db.scalar(
            select(func.count()).select_from(Incident).where(
                Incident.status == "COMPLETED",
                Incident.completed_at.is_not(None),
                Incident.completed_at >= date_from,
                Incident.completed_at <= date_to,
                Incident.deleted_at.is_(None),
            )
        )

        return int(value or 0)

    def get_cancelled_cases_by_actor_global(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, Any]:
        rows = self.db.execute(
            select(
                AuditEvent.actor_type,
                func.count(AuditEvent.id).label("total"),
            )
            .where(
                AuditEvent.scope.in_(["PLATFORM", "TENANT"]),
                AuditEvent.resource_type == "incident",
                AuditEvent.event_type == "INCIDENT_CANCELLED",
                AuditEvent.created_at >= date_from,
                AuditEvent.created_at <= date_to,
            )
            .group_by(AuditEvent.actor_type)
        ).all()

        by_actor = {"CLIENT": 0, "TENANT_OWNER": 0, "TECHNICIAN": 0}
        total = 0

        for actor_type, count in rows:
            actor = (actor_type or "").upper()
            if actor in by_actor:
                value = int(count or 0)
                by_actor[actor] = value
                total += value

        return {
            "total": total,
            "by_actor": {
                "client": by_actor["CLIENT"],
                "owner": by_actor["TENANT_OWNER"],
                "technician": by_actor["TECHNICIAN"],
            },
        }

    def get_unattended_cases(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, int]:
        rows = self.db.execute(
            select(
                Incident.unattended_reason,
                func.count(Incident.id).label("total"),
            )
            .where(
                Incident.status == "UNATTENDED",
                Incident.unattended_at.is_not(None),
                Incident.unattended_at >= date_from,
                Incident.unattended_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(Incident.unattended_reason)
        ).all()

        total = 0
        no_candidates_found = 0
        no_provider_accepted = 0

        for reason, count in rows:
            value = int(count or 0)
            total += value
            normalized = str(reason or "").upper()
            if normalized == "NO_CANDIDATES_FOUND":
                no_candidates_found += value
            elif normalized == "NO_PROVIDER_ACCEPTED":
                no_provider_accepted += value

        return {
            "total": total,
            "no_candidates_found": no_candidates_found,
            "no_provider_accepted": no_provider_accepted,
        }

    def get_provider_acceptance(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, float]:
        accepted = self.db.scalar(
            select(func.count()).select_from(IncidentOffer).where(
                IncidentOffer.sent_at >= date_from,
                IncidentOffer.sent_at <= date_to,
                IncidentOffer.offer_status == "ACCEPTED",
            )
        )
        rejected = self.db.scalar(
            select(func.count()).select_from(IncidentOffer).where(
                IncidentOffer.sent_at >= date_from,
                IncidentOffer.sent_at <= date_to,
                IncidentOffer.offer_status == "REJECTED",
            )
        )
        expired = self.db.scalar(
            select(func.count()).select_from(IncidentOffer).where(
                IncidentOffer.sent_at >= date_from,
                IncidentOffer.sent_at <= date_to,
                IncidentOffer.offer_status == "EXPIRED",
            )
        )

        avg_acceptance = self.db.scalar(
            select(
                func.avg(
                    func.extract(
                        "epoch",
                        IncidentOffer.responded_at - IncidentOffer.sent_at,
                    )
                    / 60.0
                )
            )
            .select_from(IncidentOffer)
            .where(
                IncidentOffer.sent_at >= date_from,
                IncidentOffer.sent_at <= date_to,
                IncidentOffer.offer_status == "ACCEPTED",
                IncidentOffer.responded_at.is_not(None),
            )
        )

        accepted_value = int(accepted or 0)
        rejected_value = int(rejected or 0)
        expired_value = int(expired or 0)

        denominator = float(accepted_value + rejected_value + expired_value)
        if denominator <= 0:
            return {
                "average_acceptance_time_minutes": 0.0,
                "acceptance_rate_percentage": 0.0,
                "rejection_rate_percentage": 0.0,
                "expiration_rate_percentage": 0.0,
            }

        return {
            "average_acceptance_time_minutes": float(avg_acceptance or 0),
            "acceptance_rate_percentage": round(accepted_value / denominator * 100.0, 1),
            "rejection_rate_percentage": round(rejected_value / denominator * 100.0, 1),
            "expiration_rate_percentage": round(expired_value / denominator * 100.0, 1),
        }

    def get_top_incident_types_global(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                ServiceCatalog.service_name,
                func.count(Incident.id).label("total"),
            )
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(ServiceCatalog.service_name)
            .order_by(func.count(Incident.id).desc())
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

    def get_top_zones_global(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                Incident.address_text.label("name"),
                func.count(Incident.id).label("total"),
            )
            .where(
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(Incident.address_text)
            .order_by(func.count(Incident.id).desc())
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

    def get_services_within_estimated_time_global(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> dict[str, Any]:
        completed_rows = self._completed_assignment_rows_global(
            date_from=date_from,
            date_to=date_to,
        )

        completed = 0
        out_of_time = 0

        for _, _, duration_minutes, max_duration_minutes in completed_rows:
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

    def get_incidents_by_service_global(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        query = (
            select(
                ServiceCatalog.service_name,
                func.count(Incident.id).label("value"),
            )
            .join(
                ServiceCatalog,
                ServiceCatalog.id == Incident.service_catalog_id,
                isouter=True,
            )
            .where(
                Incident.reported_at >= date_from,
                Incident.reported_at <= date_to,
                Incident.deleted_at.is_(None),
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

    def get_operational_trend_global(
        self,
        date_from: datetime,
        date_to: datetime,
    ) -> list[dict[str, Any]]:
        completed_query = (
            select(
                func.date(Incident.completed_at).label("day"),
                func.count(Incident.id).label("completed"),
            )
            .where(
                Incident.status == "COMPLETED",
                Incident.completed_at.is_not(None),
                Incident.completed_at >= date_from,
                Incident.completed_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(func.date(Incident.completed_at))
        )

        cancelled_query = (
            select(
                func.date(Incident.cancelled_at).label("day"),
                func.count(Incident.id).label("cancelled"),
            )
            .where(
                Incident.status == "CANCELLED",
                Incident.cancelled_at.is_not(None),
                Incident.cancelled_at >= date_from,
                Incident.cancelled_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(func.date(Incident.cancelled_at))
        )

        unattended_query = (
            select(
                func.date(Incident.unattended_at).label("day"),
                func.count(Incident.id).label("unattended"),
            )
            .where(
                Incident.status == "UNATTENDED",
                Incident.unattended_at.is_not(None),
                Incident.unattended_at >= date_from,
                Incident.unattended_at <= date_to,
                Incident.deleted_at.is_(None),
            )
            .group_by(func.date(Incident.unattended_at))
        )

        trend: DefaultDict[str, dict[str, int]] = defaultdict(
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

    def get_top_workshops_chart(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self.get_top_workshops(
            date_from=date_from,
            date_to=date_to,
            limit=limit,
        )

        return [
            {
                "name": row["name"],
                "completed_services": row["completed_services"],
                "efficiency": row["efficiency"],
            }
            for row in rows
        ]

    def get_top_zones_chart_global(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self.get_top_zones_global(
            date_from=date_from,
            date_to=date_to,
            limit=limit,
        )

        return [
            {
                "zone": row["name"],
                "incidents": row["total"],
            }
            for row in rows
        ]

    def get_service_compliance_global(
        self,
        date_from: datetime,
        date_to: datetime,
        limit: int,
    ) -> list[dict[str, Any]]:
        rows = self._completed_assignment_rows_global(
            date_from=date_from,
            date_to=date_to,
        )

        stats: DefaultDict[str, dict[str, int]] = defaultdict(
            lambda: {"completed": 0, "within": 0}
        )

        for _, service_name, duration_minutes, max_duration_minutes in rows:
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
