from __future__ import annotations

from pydantic import BaseModel

from app.common.contracts import ApiResponse
from app.modules.dashboard.schemas import (
    CancelledCasesKpi,
    ChartServiceItem,
    OperationalTrendItem,
    ServiceComplianceChartItem,
    ServicesWithinEstimatedTimeKpi,
    TopIncidentTypeItem,
    TopZoneItem,
)


class InProcessIncidentsKpi(BaseModel):
    total: int
    waiting_provider_response: int
    provider_accepted: int
    technician_assigned: int
    en_route: int
    arrived: int
    in_service: int


class UnattendedCasesKpi(BaseModel):
    total: int
    no_candidates_found: int
    no_provider_accepted: int


class ProviderAcceptanceKpi(BaseModel):
    average_acceptance_time_minutes: float
    acceptance_rate_percentage: float
    rejection_rate_percentage: float
    expiration_rate_percentage: float


class TopWorkshopItem(BaseModel):
    name: str
    completed_services: int
    efficiency: float


class WorkshopChartItem(BaseModel):
    name: str
    completed_services: int
    efficiency: float


class ZoneChartItem(BaseModel):
    zone: str
    incidents: int


class PlatformDashboardKpis(BaseModel):
    total_incidents: int
    in_process_incidents: InProcessIncidentsKpi
    completed_cases: int
    cancelled_cases: CancelledCasesKpi
    unattended_cases: UnattendedCasesKpi
    provider_acceptance: ProviderAcceptanceKpi
    top_incident_types: list[TopIncidentTypeItem]
    top_workshops: list[TopWorkshopItem]
    top_zones: list[TopZoneItem]
    services_completed_within_estimated_time: ServicesWithinEstimatedTimeKpi


class PlatformDashboardCharts(BaseModel):
    incidents_by_service: list[ChartServiceItem]
    operational_trend: list[OperationalTrendItem]
    top_workshops: list[WorkshopChartItem]
    top_zones: list[ZoneChartItem]
    service_compliance: list[ServiceComplianceChartItem]


class PlatformOperationalDashboardData(BaseModel):
    kpis: PlatformDashboardKpis
    charts: PlatformDashboardCharts


class PlatformOperationalDashboardResponse(ApiResponse[PlatformOperationalDashboardData]):
    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Dashboard operativo global obtenido correctamente.",
                "data": {
                    "kpis": {
                        "total_incidents": 1240,
                        "in_process_incidents": {
                            "total": 86,
                            "waiting_provider_response": 24,
                            "provider_accepted": 12,
                            "technician_assigned": 18,
                            "en_route": 14,
                            "arrived": 8,
                            "in_service": 10,
                        },
                        "completed_cases": 940,
                        "cancelled_cases": {
                            "total": 120,
                            "by_actor": {
                                "client": 52,
                                "owner": 41,
                                "technician": 27,
                            },
                        },
                        "unattended_cases": {
                            "total": 44,
                            "no_candidates_found": 18,
                            "no_provider_accepted": 26,
                        },
                        "provider_acceptance": {
                            "average_acceptance_time_minutes": 3.4,
                            "acceptance_rate_percentage": 78.6,
                            "rejection_rate_percentage": 14.2,
                            "expiration_rate_percentage": 7.2,
                        },
                        "top_incident_types": [
                            {
                                "name": "Paso de corriente",
                                "total": 220,
                            }
                        ],
                        "top_workshops": [
                            {
                                "name": "Speed Motors",
                                "completed_services": 186,
                                "efficiency": 96.0,
                            }
                        ],
                        "top_zones": [
                            {
                                "name": "Zona Sur",
                                "total": 320,
                            }
                        ],
                        "services_completed_within_estimated_time": {
                            "percentage": 89.6,
                            "completed": 842,
                            "out_of_time": 98,
                        },
                    },
                    "charts": {
                        "incidents_by_service": [
                            {
                                "name": "Paso de corriente",
                                "value": 220,
                            }
                        ],
                        "operational_trend": [
                            {
                                "date": "2026-06-01",
                                "completed": 80,
                                "cancelled": 12,
                                "unattended": 4,
                            }
                        ],
                        "top_workshops": [
                            {
                                "name": "Speed Motors",
                                "completed_services": 186,
                                "efficiency": 96.0,
                            }
                        ],
                        "top_zones": [
                            {
                                "zone": "Zona Sur",
                                "incidents": 320,
                            }
                        ],
                        "service_compliance": [
                            {
                                "service_name": "Paso de corriente",
                                "percentage": 94.0,
                            }
                        ],
                    },
                    "meta": {
                        "request_id": "req_01HZX9Y9K2",
                    },
                },
            }
        }
    }
