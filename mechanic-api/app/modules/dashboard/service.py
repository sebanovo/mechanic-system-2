from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app.core.context import RequestContext
from app.core.services.base import BaseService
from app.modules.dashboard.repository import DashboardRepository
from app.modules.dashboard.schemas import (
    CompletedServicesTrendChartItem,
    CancelledCasesByActor,
    CancelledCasesKpi,
    CasesByStatusChartItem,
    ChartServiceItem,
    CurrentAssignmentKpi,
    CurrentIncidentKpi,
    ClientDashboardCharts,
    ClientDashboardKpis,
    ClientOperationalDashboardData,
    OwnerDashboardCharts,
    OwnerDashboardKpis,
    OwnerOperationalDashboardData,
    OperationalTrendItem,
    ServiceComplianceChartItem,
    ServicesByTypeChartItem,
    RequestedServicesTrendChartItem,
    TechnicianPerformanceChartItem,
    TechnicianDashboardCharts,
    TechnicianDashboardKpis,
    TechnicianOperationalDashboardData,
    TechnicianZoneChartItem,
    TopIncidentTypeItem,
    TopWorkshopChartItem,
    TopWorkshopKpiItem,
    TopTechnicianItem,
    TopZoneItem,
    ZoneChartItem,
    ServicesWithinEstimatedTimeKpi,
)


class DashboardService(BaseService):
    def __init__(
        self,
        repository: DashboardRepository,
        context: RequestContext,
    ) -> None:
        super().__init__(db=repository.db, context=context)
        self.repository = repository

    def get_owner_operational_dashboard(
        self,
        *,
        provider_profile_id: str,
        tenant_id: str,
        date_from: datetime | None = None,
        date_to: datetime | None = None,
    ) -> OwnerOperationalDashboardData:
        date_to = date_to or datetime.now(timezone.utc)
        date_from = date_from or date_to - timedelta(days=30)

        cancelled_cases = self.repository.get_owner_cancelled_cases_by_actor(
            provider_profile_id=provider_profile_id,
            date_from=date_from,
            date_to=date_to,
        )

        top_incident_types = [
            TopIncidentTypeItem.model_validate(item)
            for item in self.repository.get_top_incident_types(
                provider_profile_id,
                date_from,
                date_to,
                limit=3,
            )
        ]
        top_technicians = [
            TopTechnicianItem.model_validate(item)
            for item in self.repository.get_top_technicians(
                provider_profile_id,
                date_from,
                date_to,
                limit=3,
            )
        ]
        top_zones = [
            TopZoneItem.model_validate(item)
            for item in self.repository.get_top_zones(
                provider_profile_id,
                date_from,
                date_to,
                limit=3,
            )
        ]
        services_completed_within_estimated_time = (
            ServicesWithinEstimatedTimeKpi.model_validate(
                self.repository.get_services_within_estimated_time(
                    provider_profile_id,
                    date_from,
                    date_to,
                )
            )
        )

        kpis = OwnerDashboardKpis(
            average_arrival_time_minutes=self.repository.get_owner_average_arrival_time(
                provider_profile_id,
                date_from,
                date_to,
            ),
            average_resolution_time_minutes=self.repository.get_average_resolution_time(
                provider_profile_id,
                date_from,
                date_to,
            ),
            completed_cases=self.repository.get_completed_cases(
                provider_profile_id,
                date_from,
                date_to,
            ),
            cancelled_cases=cancelled_cases,
            top_incident_types=top_incident_types,
            top_technicians=top_technicians,
            top_zones=top_zones,
            services_completed_within_estimated_time=services_completed_within_estimated_time,
        )

        incidents_by_service = [
            ChartServiceItem.model_validate(item)
            for item in self.repository.get_incidents_by_service(
                provider_profile_id,
                date_from,
                date_to,
                limit=5,
            )
        ]
        operational_trend = [
            OperationalTrendItem.model_validate(item)
            for item in self.repository.get_operational_trend(
                provider_profile_id,
                date_from,
                date_to,
            )
        ]
        technician_performance = [
            TechnicianPerformanceChartItem.model_validate(item)
            for item in self.repository.get_technician_performance(
                provider_profile_id,
                date_from,
                date_to,
                limit=5,
            )
        ]
        top_zones_chart = [
            ZoneChartItem.model_validate(item)
            for item in self.repository.get_top_zones_chart(
                provider_profile_id,
                date_from,
                date_to,
                limit=5,
            )
        ]
        service_compliance = [
            ServiceComplianceChartItem.model_validate(item)
            for item in self.repository.get_service_compliance(
                provider_profile_id,
                date_from,
                date_to,
                limit=5,
            )
        ]

        charts = OwnerDashboardCharts(
            incidents_by_service=incidents_by_service,
            operational_trend=operational_trend,
            technician_performance=technician_performance,
            top_zones=top_zones_chart,
            service_compliance=service_compliance,
        )

        return OwnerOperationalDashboardData(
            kpis=kpis,
            charts=charts,
        )

    def get_technician_operational_dashboard(
        self,
        *,
        technician_id: str,
        date_from: datetime | None = None,
        date_to: datetime | None = None,
    ) -> TechnicianOperationalDashboardData:
        date_to = date_to or datetime.now(timezone.utc)
        date_from = date_from or date_to - timedelta(days=30)

        current_assignment = CurrentAssignmentKpi.model_validate(
            self.repository.get_current_assignment(technician_id)
        )
        services_completed_within_estimated_time = (
            ServicesWithinEstimatedTimeKpi.model_validate(
                self.repository.get_services_within_estimated_time_for_technician(
                    technician_id,
                    date_from,
                    date_to,
                )
            )
        )
        completed_cases = self.repository.get_completed_cases_for_technician(
            technician_id,
            date_from,
            date_to,
        )
        cancelled_cases = self.repository.get_cancelled_cases_for_technician(
            technician_id,
            date_from,
            date_to,
        )
        average_arrival_time_minutes = self.repository.get_average_arrival_time_for_technician(
            technician_id,
            date_from,
            date_to,
        )
        average_resolution_time_minutes = (
            self.repository.get_average_resolution_time_for_technician(
                technician_id,
                date_from,
                date_to,
            )
        )

        kpis = TechnicianDashboardKpis(
            current_assignment=current_assignment,
            services_completed_within_estimated_time=services_completed_within_estimated_time,
            completed_cases=completed_cases,
            cancelled_cases=cancelled_cases,
            average_arrival_time_minutes=average_arrival_time_minutes,
            average_resolution_time_minutes=average_resolution_time_minutes,
        )

        services_by_type = [
            ServicesByTypeChartItem.model_validate(item)
            for item in self.repository.get_services_by_type_for_technician(
                technician_id,
                date_from,
                date_to,
                limit=5,
            )
        ]
        completed_services_trend = [
            CompletedServicesTrendChartItem.model_validate(item)
            for item in self.repository.get_completed_services_trend_for_technician(
                technician_id,
                date_from,
                date_to,
            )
        ]
        service_compliance = [
            ServiceComplianceChartItem.model_validate(item)
            for item in self.repository.get_service_compliance_for_technician(
                technician_id,
                date_from,
                date_to,
                limit=5,
            )
        ]
        top_zones = [
            TechnicianZoneChartItem.model_validate(item)
            for item in self.repository.get_top_zones_for_technician(
                technician_id,
                date_from,
                date_to,
                limit=5,
            )
        ]

        charts = TechnicianDashboardCharts(
            services_by_type=services_by_type,
            completed_services_trend=completed_services_trend,
            service_compliance=service_compliance,
            top_zones=top_zones,
        )

        return TechnicianOperationalDashboardData(
            kpis=kpis,
            charts=charts,
        )

    def get_client_operational_dashboard(
        self,
        *,
        customer_id: str,
        date_from: datetime | None = None,
        date_to: datetime | None = None,
    ) -> ClientOperationalDashboardData:
        date_to = date_to or datetime.now(timezone.utc)
        date_from = date_from or date_to - timedelta(days=30)

        current_incident = CurrentIncidentKpi.model_validate(
            self.repository.get_current_incident(customer_id)
        )
        top_workshops = [
            TopWorkshopKpiItem(
                name=item["name"],
                efficiency=float(item["efficiency"]),
            )
            for item in self.repository.get_client_top_workshops(
                customer_id=customer_id,
                date_from=date_from,
                date_to=date_to,
                limit=3,
            )
        ]

        kpis = ClientDashboardKpis(
            current_incident=current_incident,
            top_workshops=top_workshops,
            completed_cases=self.repository.get_completed_cases_for_customer(
                customer_id,
                date_from,
                date_to,
            ),
            cancelled_cases=self.repository.get_cancelled_cases_for_customer(
                customer_id,
                date_from,
                date_to,
            ),
            unattended_cases=self.repository.get_unattended_cases_for_customer(
                customer_id,
                date_from,
                date_to,
            ),
            total_requested_services=self.repository.get_total_requested_services_for_customer(
                customer_id,
                date_from,
                date_to,
            ),
        )

        services_by_type = [
            ServicesByTypeChartItem.model_validate(item)
            for item in self.repository.get_services_by_type_for_customer(
                customer_id,
                date_from,
                date_to,
                limit=5,
            )
        ]
        requested_services_trend = [
            RequestedServicesTrendChartItem.model_validate(item)
            for item in self.repository.get_requested_services_trend_for_customer(
                customer_id,
                date_from,
                date_to,
            )
        ]
        cases_by_status = [
            CasesByStatusChartItem.model_validate(item)
            for item in self.repository.get_cases_by_status_for_customer(
                customer_id,
                date_from,
                date_to,
            )
        ]
        top_workshops_chart = [
            TopWorkshopChartItem(
                name=item["name"],
                efficiency=float(item["efficiency"]),
            )
            for item in self.repository.get_client_top_workshops(
                customer_id=customer_id,
                date_from=date_from,
                date_to=date_to,
                limit=5,
            )
        ]

        charts = ClientDashboardCharts(
            services_by_type=services_by_type,
            requested_services_trend=requested_services_trend,
            cases_by_status=cases_by_status,
            top_workshops=top_workshops_chart,
        )

        return ClientOperationalDashboardData(
            kpis=kpis,
            charts=charts,
        )
