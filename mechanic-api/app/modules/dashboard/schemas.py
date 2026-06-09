from __future__ import annotations

from pydantic import BaseModel

from app.common.contracts import ApiResponse


class CancelledCasesByActor(BaseModel):
    client: int
    owner: int
    technician: int


class CancelledCasesKpi(BaseModel):
    total: int
    by_actor: CancelledCasesByActor


class TopIncidentTypeItem(BaseModel):
    name: str
    total: int


class TopTechnicianItem(BaseModel):
    name: str
    completed_services: int


class TopZoneItem(BaseModel):
    name: str
    total: int


class ServicesWithinEstimatedTimeKpi(BaseModel):
    percentage: float
    completed: int
    out_of_time: int


class OwnerDashboardKpis(BaseModel):
    average_arrival_time_minutes: float
    average_resolution_time_minutes: float
    completed_cases: int
    cancelled_cases: CancelledCasesKpi
    top_incident_types: list[TopIncidentTypeItem]
    top_technicians: list[TopTechnicianItem]
    top_zones: list[TopZoneItem]
    services_completed_within_estimated_time: ServicesWithinEstimatedTimeKpi


class ChartServiceItem(BaseModel):
    name: str
    value: int


class OperationalTrendItem(BaseModel):
    date: str
    completed: int
    cancelled: int
    unattended: int


class TechnicianPerformanceChartItem(BaseModel):
    name: str
    completed_services: int


class ZoneChartItem(BaseModel):
    zone: str
    incidents: int


class ServiceComplianceChartItem(BaseModel):
    service_name: str
    percentage: float


class OwnerDashboardCharts(BaseModel):
    incidents_by_service: list[ChartServiceItem]
    operational_trend: list[OperationalTrendItem]
    technician_performance: list[TechnicianPerformanceChartItem]
    top_zones: list[ZoneChartItem]
    service_compliance: list[ServiceComplianceChartItem]


class OwnerOperationalDashboardData(BaseModel):
    kpis: OwnerDashboardKpis
    charts: OwnerDashboardCharts


class OwnerOperationalDashboardResponse(ApiResponse[OwnerOperationalDashboardData]):

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Dashboard operativo obtenido correctamente.",
                "data": {
                    "kpis": {
                        "average_arrival_time_minutes": 18.2,
                        "average_resolution_time_minutes": 42.7,
                        "completed_cases": 186,
                        "cancelled_cases": {
                            "total": 24,
                            "by_actor": {
                                "client": 10,
                                "owner": 8,
                                "technician": 6,
                            },
                        },
                        "top_incident_types": [
                            {
                                "name": "Paso de corriente",
                                "total": 44,
                            }
                        ],
                        "top_technicians": [
                            {
                                "name": "Juan Pérez",
                                "completed_services": 42,
                            }
                        ],
                        "top_zones": [
                            {
                                "name": "Zona Sur",
                                "total": 120,
                            }
                        ],
                        "services_completed_within_estimated_time": {
                            "percentage": 91.4,
                            "completed": 170,
                            "out_of_time": 16,
                        },
                    },
                    "charts": {
                        "incidents_by_service": [
                            {
                                "name": "Paso de corriente",
                                "value": 44,
                            }
                        ],
                        "operational_trend": [
                            {
                                "date": "2026-06-01",
                                "completed": 20,
                                "cancelled": 4,
                                "unattended": 1,
                            }
                        ],
                        "technician_performance": [
                            {
                                "name": "Juan Pérez",
                                "completed_services": 42,
                            }
                        ],
                        "top_zones": [
                            {
                                "zone": "Zona Sur",
                                "incidents": 120,
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


class CurrentIncidentKpi(BaseModel):
    has_active_incident: bool
    incident_status: str | None = None
    incident_code: str | None = None
    service_name: str | None = None


class TopWorkshopKpiItem(BaseModel):
    name: str
    efficiency: float


class ClientDashboardKpis(BaseModel):
    current_incident: CurrentIncidentKpi
    top_workshops: list[TopWorkshopKpiItem]
    completed_cases: int
    cancelled_cases: int
    unattended_cases: int
    total_requested_services: int


class RequestedServicesTrendChartItem(BaseModel):
    date: str
    requested: int


class CasesByStatusChartItem(BaseModel):
    status: str
    value: int


class TopWorkshopChartItem(BaseModel):
    name: str
    efficiency: float


class ClientDashboardCharts(BaseModel):
    services_by_type: list[ServicesByTypeChartItem]
    requested_services_trend: list[RequestedServicesTrendChartItem]
    cases_by_status: list[CasesByStatusChartItem]
    top_workshops: list[TopWorkshopChartItem]


class ClientOperationalDashboardData(BaseModel):
    kpis: ClientDashboardKpis
    charts: ClientDashboardCharts


class ClientOperationalDashboardResponse(ApiResponse[ClientOperationalDashboardData]):

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Dashboard operativo del cliente obtenido correctamente.",
                "data": {
                    "kpis": {
                        "current_incident": {
                            "has_active_incident": True,
                            "incident_status": "EN_ROUTE",
                            "incident_code": "INC-2026-00041",
                            "service_name": "Cambio de llanta",
                        },
                        "top_workshops": [
                            {
                                "name": "Speed Motors",
                                "efficiency": 96.0,
                            },
                            {
                                "name": "AutoFix Center",
                                "efficiency": 93.0,
                            },
                            {
                                "name": "Mecánica Norte",
                                "efficiency": 91.0,
                            },
                        ],
                        "completed_cases": 12,
                        "cancelled_cases": 3,
                        "unattended_cases": 2,
                        "total_requested_services": 17,
                    },
                    "charts": {
                        "services_by_type": [
                            {
                                "name": "Paso de corriente",
                                "value": 6,
                            }
                        ],
                        "requested_services_trend": [
                            {
                                "date": "2026-06-01",
                                "requested": 1,
                            }
                        ],
                        "cases_by_status": [
                            {
                                "status": "COMPLETED",
                                "value": 12,
                            }
                        ],
                        "top_workshops": [
                            {
                                "name": "Speed Motors",
                                "efficiency": 96.0,
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


class CurrentAssignmentKpi(BaseModel):
    has_active_assignment: bool
    assignment_status: str | None = None
    incident_code: str | None = None
    service_name: str | None = None


class ServicesByTypeChartItem(BaseModel):
    name: str
    value: int


class CompletedServicesTrendChartItem(BaseModel):
    date: str
    completed: int


class TechnicianZoneChartItem(BaseModel):
    zone: str
    incidents: int


class TechnicianDashboardKpis(BaseModel):
    current_assignment: CurrentAssignmentKpi
    services_completed_within_estimated_time: ServicesWithinEstimatedTimeKpi
    completed_cases: int
    cancelled_cases: int
    average_arrival_time_minutes: float
    average_resolution_time_minutes: float


class TechnicianDashboardCharts(BaseModel):
    services_by_type: list[ServicesByTypeChartItem]
    completed_services_trend: list[CompletedServicesTrendChartItem]
    service_compliance: list[ServiceComplianceChartItem]
    top_zones: list[TechnicianZoneChartItem]


class TechnicianOperationalDashboardData(BaseModel):
    kpis: TechnicianDashboardKpis
    charts: TechnicianDashboardCharts


class TechnicianOperationalDashboardResponse(
    ApiResponse[TechnicianOperationalDashboardData]
):

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Dashboard operativo obtenido correctamente.",
                "data": {
                    "kpis": {
                        "current_assignment": {
                            "has_active_assignment": True,
                            "assignment_status": "EN_ROUTE",
                            "incident_code": "INC-2026-00041",
                            "service_name": "Cambio de llanta",
                        },
                        "services_completed_within_estimated_time": {
                            "percentage": 92.4,
                            "completed": 39,
                            "out_of_time": 3,
                        },
                        "completed_cases": 42,
                        "cancelled_cases": 4,
                        "average_arrival_time_minutes": 16.8,
                        "average_resolution_time_minutes": 38.5,
                    },
                    "charts": {
                        "services_by_type": [
                            {
                                "name": "Paso de corriente",
                                "value": 14,
                            }
                        ],
                        "completed_services_trend": [
                            {
                                "date": "2026-06-01",
                                "completed": 4,
                            }
                        ],
                        "service_compliance": [
                            {
                                "service_name": "Paso de corriente",
                                "percentage": 94.0,
                            }
                        ],
                        "top_zones": [
                            {
                                "zone": "Zona Sur",
                                "incidents": 18,
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
