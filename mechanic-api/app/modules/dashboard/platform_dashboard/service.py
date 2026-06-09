from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.dashboard.platform_dashboard.repository import (
    PlatformDashboardRepository,
)
from app.modules.dashboard.platform_dashboard.schemas import (
    InProcessIncidentsKpi,
    PlatformDashboardCharts,
    PlatformDashboardKpis,
    PlatformOperationalDashboardData,
    ProviderAcceptanceKpi,
    ServicesWithinEstimatedTimeKpi,
    TopIncidentTypeItem,
    TopWorkshopItem,
    UnattendedCasesKpi,
    WorkshopChartItem,
    ZoneChartItem,
    OperationalTrendItem,
    ChartServiceItem,
    ServiceComplianceChartItem,
)
from app.modules.dashboard.schemas import CancelledCasesKpi, TopZoneItem


class PlatformDashboardService(BaseService):
    def __init__(
        self,
        repository: PlatformDashboardRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository

    def get_platform_operational_dashboard(
        self,
        *,
        date_from: datetime | None = None,
        date_to: datetime | None = None,
    ) -> PlatformOperationalDashboardData:
        date_to = date_to or datetime.now(timezone.utc)
        date_from = date_from or date_to - timedelta(days=30)

        total_incidents = self.repository.get_total_incidents(
            date_from=date_from,
            date_to=date_to,
        )
        in_process_cases = self.repository.get_in_process_incidents(
            date_from=date_from,
            date_to=date_to,
        )
        completed_cases = self.repository.get_completed_cases_global(
            date_from=date_from,
            date_to=date_to,
        )
        cancelled_cases = CancelledCasesKpi.model_validate(
            self.repository.get_cancelled_cases_by_actor_global(
                date_from=date_from,
                date_to=date_to,
            )
        )
        unattended_cases = UnattendedCasesKpi.model_validate(
            self.repository.get_unattended_cases(
                date_from=date_from,
                date_to=date_to,
            )
        )
        provider_acceptance = ProviderAcceptanceKpi.model_validate(
            self.repository.get_provider_acceptance(
                date_from=date_from,
                date_to=date_to,
            )
        )
        top_incident_types = [
            TopIncidentTypeItem.model_validate(item)
            for item in self.repository.get_top_incident_types_global(
                date_from=date_from,
                date_to=date_to,
                limit=3,
            )
        ]
        top_workshops = [
            TopWorkshopItem.model_validate(item)
            for item in self.repository.get_top_workshops(
                date_from=date_from,
                date_to=date_to,
                limit=3,
            )
        ]
        top_zones = [
            TopZoneItem.model_validate(item)
            for item in self.repository.get_top_zones_global(
                date_from=date_from,
                date_to=date_to,
                limit=3,
            )
        ]
        services_completed_within_estimated_time = (
            ServicesWithinEstimatedTimeKpi.model_validate(
                self.repository.get_services_within_estimated_time_global(
                    date_from=date_from,
                    date_to=date_to,
                )
            )
        )

        kpis = PlatformDashboardKpis(
            total_incidents=total_incidents,
            in_process_incidents=InProcessIncidentsKpi.model_validate(
                in_process_cases
            ),
            completed_cases=completed_cases,
            cancelled_cases=cancelled_cases,
            unattended_cases=unattended_cases,
            provider_acceptance=provider_acceptance,
            top_incident_types=top_incident_types,
            top_workshops=top_workshops,
            top_zones=top_zones,
            services_completed_within_estimated_time=services_completed_within_estimated_time,
        )

        incidents_by_service = [
            ChartServiceItem.model_validate(item)
            for item in self.repository.get_incidents_by_service_global(
                date_from=date_from,
                date_to=date_to,
                limit=5,
            )
        ]
        operational_trend = [
            OperationalTrendItem.model_validate(item)
            for item in self.repository.get_operational_trend_global(
                date_from=date_from,
                date_to=date_to,
            )
        ]
        top_workshops_chart = [
            WorkshopChartItem.model_validate(item)
            for item in self.repository.get_top_workshops_chart(
                date_from=date_from,
                date_to=date_to,
                limit=5,
            )
        ]
        top_zones_chart = [
            ZoneChartItem.model_validate(item)
            for item in self.repository.get_top_zones_chart_global(
                date_from=date_from,
                date_to=date_to,
                limit=5,
            )
        ]
        service_compliance = [
            ServiceComplianceChartItem.model_validate(item)
            for item in self.repository.get_service_compliance_global(
                date_from=date_from,
                date_to=date_to,
                limit=5,
            )
        ]

        charts = PlatformDashboardCharts(
            incidents_by_service=incidents_by_service,
            operational_trend=operational_trend,
            top_workshops=top_workshops_chart,
            top_zones=top_zones_chart,
            service_compliance=service_compliance,
        )

        return PlatformOperationalDashboardData(
            kpis=kpis,
            charts=charts,
        )
