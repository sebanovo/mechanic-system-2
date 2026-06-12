import { StatusConfig } from "../../../shared/types";

export interface CancelledCasesByActor {
	client: number;
	owner: number;
	technician: number;
}

export interface CancelledCasesKpi {
	total: number;
	by_actor: CancelledCasesByActor;
}

export interface TopIncidentTypeItem {
	name: string;
	total: number;
}

export interface TopTechnicianItem {
	name: string;
	completed_services: number;
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

export interface OwnerDashboardKpis {
	average_arrival_time_minutes: number;
	average_resolution_time_minutes: number;
	completed_cases: number;
	cancelled_cases: CancelledCasesKpi;
	top_incident_types: TopIncidentTypeItem[];
	top_technicians: TopTechnicianItem[];
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

export interface TechnicianPerformanceChartItem {
	name: string;
	completed_services: number;
}

export interface ZoneChartItem {
	zone: string;
	incidents: number;
}

export interface ServiceComplianceChartItem {
	service_name: string;
	percentage: number;
}

export interface OwnerDashboardCharts {
	incidents_by_service: ChartServiceItem[];
	operational_trend: OperationalTrendItem[];
	technician_performance: TechnicianPerformanceChartItem[];
	top_zones: ZoneChartItem[];
	service_compliance: ServiceComplianceChartItem[];
}

export interface OwnerOperationalDashboard {
	kpis: OwnerDashboardKpis;
	charts: OwnerDashboardCharts;
}

export interface OwnerDashboardQuery {
	date_from?: string;
	date_to?: string;
}

export interface OwnerDashboardDateFilters {
	date_from: string;
	date_to: string;
}

export type DashboardKpiTone =
	| "blue"
	| "indigo"
	| "red"
	| "green"
	| "amber"
	| "emerald"
	| "rose"
	| "violet";

export type DashboardKpiIcon =
	| "lucideClock3"
	| "lucideTimer"
	| "lucideCircleX"
	| "lucideCircleCheckBig"
	| "lucideWrench"
	| "lucideUsersRound"
	| "lucideMapPinned"
	| "lucideShieldCheck";

export interface DashboardKpiListItem {
	label: string;
	value?: string;
}

export interface DashboardMetricKpiView {
	type: "metric";
	id: string;
	title: string;
	value: string;
	description: string;
	icon: DashboardKpiIcon;
	tone: DashboardKpiTone;
}

export interface DashboardListKpiView {
	type: "list";
	id: string;
	title: string;
	description: string;
	icon: DashboardKpiIcon;
	tone: DashboardKpiTone;
	items: DashboardKpiListItem[];
	emptyLabel: string;
}

export type DashboardKpiView = DashboardMetricKpiView | DashboardListKpiView;

export interface DashboardChartSeries {
	label: string;
	data: number[];
	borderColor?: string;
	backgroundColor?: string;
}

export interface DashboardChartView {
	labels: string[];
	datasets: DashboardChartSeries[];
}

export interface DashboardChartPanelView {
	type: "bar" | "line" | "horizontalBar";
	title: string;
	description: string;
	chart: DashboardChartView;
}
