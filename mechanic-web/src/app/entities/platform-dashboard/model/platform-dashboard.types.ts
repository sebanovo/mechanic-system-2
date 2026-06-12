import { DashboardKpiIcon, DashboardKpiTone } from "../../owner-dashboard/model";

export interface CancelledCasesByActor {
	client: number;
	owner: number;
	technician: number;
}

export interface CancelledCasesKpi {
	total: number;
	by_actor: CancelledCasesByActor;
}

export interface InProcessIncidentsKpi {
	total: number;
	waiting_provider_response: number;
	provider_accepted: number;
	technician_assigned: number;
	en_route: number;
	arrived: number;
	in_service: number;
}

export interface UnattendedCasesKpi {
	total: number;
	no_candidates_found: number;
	no_provider_accepted: number;
}

export interface ProviderAcceptanceKpi {
	average_acceptance_time_minutes: number;
	acceptance_rate_percentage: number;
	rejection_rate_percentage: number;
	expiration_rate_percentage: number;
}

export interface TopIncidentTypeItem {
	name: string;
	total: number;
}

export interface TopWorkshopItem {
	name: string;
	completed_services: number;
	efficiency: number;
}

export interface TopZoneItem {
	name: string;
	total: number;
}

export interface ServicesWithinEstimatedTimeKpi {
	percentage: number;
	completed: number;
	out_of_time: number;
}

export interface PlatformDashboardKpis {
	total_incidents: number;
	in_process_incidents: InProcessIncidentsKpi;
	completed_cases: number;
	cancelled_cases: CancelledCasesKpi;
	unattended_cases: UnattendedCasesKpi;
	provider_acceptance: ProviderAcceptanceKpi;
	top_incident_types: TopIncidentTypeItem[];
	top_workshops: TopWorkshopItem[];
	top_zones: TopZoneItem[];
	services_completed_within_estimated_time: ServicesWithinEstimatedTimeKpi;
}

export interface ChartServiceItem {
	name: string;
	value: number;
}

export interface OperationalTrendItem {
	date: string;
	completed: number;
	cancelled: number;
	unattended: number;
}

export interface WorkshopChartItem {
	name: string;
	completed_services: number;
	efficiency: number;
}

export interface ZoneChartItem {
	zone: string;
	incidents: number;
}

export interface ServiceComplianceChartItem {
	service_name: string;
	percentage: number;
}

export interface PlatformDashboardCharts {
	incidents_by_service: ChartServiceItem[];
	operational_trend: OperationalTrendItem[];
	top_workshops: WorkshopChartItem[];
	top_zones: ZoneChartItem[];
	service_compliance: ServiceComplianceChartItem[];
}

export interface PlatformOperationalDashboard {
	kpis: PlatformDashboardKpis;
	charts: PlatformDashboardCharts;
}

export interface PlatformDashboardQuery {
	date_from?: string;
	date_to?: string;
}

export interface PlatformDashboardDateFilters {
	date_from: string;
	date_to: string;
}

export type PlatformDashboardKpiIcon = DashboardKpiIcon;
export type PlatformDashboardKpiTone = DashboardKpiTone;
