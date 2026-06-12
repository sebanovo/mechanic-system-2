import {
	DashboardKpiIcon,
	DashboardKpiTone,
} from "../../owner-dashboard/model";

export interface TechnicianCurrentAssignmentKpi {
	has_active_assignment: boolean;
	assignment_status: string | null;
	incident_code: string | null;
	service_name: string | null;
}

export interface TechnicianServiceComplianceKpi {
	percentage: number;
	completed: number;
	out_of_time: number;
}

export interface TechnicianDashboardKpis {
	current_assignment: TechnicianCurrentAssignmentKpi;
	services_completed_within_estimated_time: TechnicianServiceComplianceKpi;
	completed_cases: number;
	cancelled_cases: number;
	average_arrival_time_minutes: number;
	average_resolution_time_minutes: number;
}

export interface TechnicianServiceTypeChartItem {
	name: string;
	value: number;
}

export interface TechnicianCompletedTrendChartItem {
	date: string;
	completed: number;
}

export interface TechnicianServiceComplianceChartItem {
	service_name: string;
	percentage: number;
}

export interface TechnicianZoneChartItem {
	zone: string;
	incidents: number;
}

export interface TechnicianDashboardCharts {
	services_by_type: TechnicianServiceTypeChartItem[];
	completed_services_trend: TechnicianCompletedTrendChartItem[];
	service_compliance: TechnicianServiceComplianceChartItem[];
	top_zones: TechnicianZoneChartItem[];
}

export interface TechnicianOperationalDashboard {
	kpis: TechnicianDashboardKpis;
	charts: TechnicianDashboardCharts;
}

export interface TechnicianDashboardQuery {
	date_from?: string;
	date_to?: string;
}

export interface TechnicianDashboardDateFilters {
	date_from: string;
	date_to: string;
}

export type TechnicianMetricTone = DashboardKpiTone;
export type TechnicianMetricIcon = DashboardKpiIcon;

export interface TechnicianMetricKpiView {
	type: "metric";
	id: string;
	title: string;
	value: string;
	description: string;
	icon: TechnicianMetricIcon;
	tone: TechnicianMetricTone;
}

export interface TechnicianComplianceKpiView {
	id: string;
	title: string;
	description: string;
	icon: TechnicianMetricIcon;
	tone: TechnicianMetricTone;
	percentage: string;
	completed: string;
	outOfTime: string;
}
