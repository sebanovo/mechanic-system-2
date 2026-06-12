import { ChartData, ChartOptions, TooltipItem } from "chart.js";

import { OwnerDashboardCharts } from "../model";
import { formatDashboardDate, normalizeTrendItems } from "./owner-dashboard.utils";

const BLUE = "#2563eb";
const GREEN = "#16a34a";
const RED = "#dc2626";
const VIOLET = "#7c3aed";
const ROSE = "#e11d48";
const GRID = "rgba(148, 163, 184, 0.28)";
const TICK = "#64748b";

export interface OwnerDashboardChartView {
	incidentsByService: ChartData<"bar", number[], string>;
	operationalTrend: ChartData<"line", number[], string>;
	technicianPerformance: ChartData<"bar", number[], string>;
	topZones: ChartData<"bar", number[], string>;
	serviceCompliance: ChartData<"bar", number[], string>;
}

export const DASHBOARD_BAR_OPTIONS: ChartOptions<"bar"> = {
	responsive: true,
	maintainAspectRatio: false,
	indexAxis: "x",
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			mode: "index",
			intersect: false,
		},
	},
	scales: {
		x: {
			grid: {
				display: false,
			},
			ticks: {
				color: TICK,
				maxRotation: 35,
				minRotation: 0,
				autoSkip: false,
			},
		},
		y: {
			beginAtZero: true,
			grid: {
				color: GRID,
			},
			ticks: {
				color: TICK,
				precision: 0,
			},
		},
	},
};

export const DASHBOARD_HORIZONTAL_BAR_OPTIONS: ChartOptions<"bar"> = {
	responsive: true,
	maintainAspectRatio: false,
	indexAxis: "y",
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			mode: "nearest",
			intersect: false,
		},
	},
	scales: {
		x: {
			beginAtZero: true,
			grid: {
				color: GRID,
			},
			ticks: {
				color: TICK,
				precision: 0,
			},
		},
		y: {
			grid: {
				display: false,
			},
			ticks: {
				color: TICK,
			},
		},
	},
};

export const DASHBOARD_PERCENTAGE_OPTIONS: ChartOptions<"bar"> = {
	...DASHBOARD_HORIZONTAL_BAR_OPTIONS,
	scales: {
		x: {
			beginAtZero: true,
			suggestedMax: 100,
			max: 100,
			grid: {
				color: GRID,
			},
			ticks: {
				color: TICK,
				callback: value => `${value}%`,
			},
		},
		y: {
			grid: {
				display: false,
			},
			ticks: {
				color: TICK,
			},
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: context => `${context.parsed.x}%`,
			},
		},
	},
};

export const DASHBOARD_LINE_OPTIONS: ChartOptions<"line"> = {
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: "index",
		intersect: false,
	},
	plugins: {
		legend: {
			position: "bottom",
			labels: {
				usePointStyle: true,
				boxWidth: 8,
				color: TICK,
			},
		},
		tooltip: {
			callbacks: {
				label: context => formatTrendTooltip(context),
			},
		},
	},
	scales: {
		x: {
			grid: {
				color: GRID,
			},
			ticks: {
				color: TICK,
				maxRotation: 0,
			},
		},
		y: {
			beginAtZero: true,
			grid: {
				color: GRID,
			},
			ticks: {
				color: TICK,
				precision: 0,
			},
		},
	},
};

export function buildOwnerDashboardCharts(
	charts: OwnerDashboardCharts
): OwnerDashboardChartView {
	const trend = normalizeTrendItems(charts.operational_trend);

	return {
		incidentsByService: {
			labels: charts.incidents_by_service.map(item => item.name),
			datasets: [
				{
					label: "Incidentes",
					data: charts.incidents_by_service.map(item => item.value),
					backgroundColor: BLUE,
					borderColor: BLUE,
					borderRadius: 6,
					maxBarThickness: 48,
				},
			],
		},
		operationalTrend: {
			labels: trend.map(item => formatDashboardDate(item.date)),
			datasets: [
				{
					label: "Completados",
					data: trend.map(item => item.completed),
					borderColor: GREEN,
					backgroundColor: GREEN,
					pointBackgroundColor: "#ffffff",
					pointBorderColor: GREEN,
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
				},
				{
					label: "Cancelados",
					data: trend.map(item => item.cancelled),
					borderColor: RED,
					backgroundColor: RED,
					pointBackgroundColor: "#ffffff",
					pointBorderColor: RED,
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
				},
				{
					label: "No atendidos",
					data: trend.map(item => item.unattended),
					borderColor: VIOLET,
					backgroundColor: VIOLET,
					pointBackgroundColor: "#ffffff",
					pointBorderColor: VIOLET,
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
				},
			],
		},
		technicianPerformance: {
			labels: charts.technician_performance.map(item => item.name),
			datasets: [
				{
					label: "Servicios completados",
					data: charts.technician_performance.map(item => item.completed_services),
					backgroundColor: GREEN,
					borderColor: GREEN,
					borderRadius: 6,
					maxBarThickness: 34,
				},
			],
		},
		topZones: {
			labels: charts.top_zones.map(item => item.zone),
			datasets: [
				{
					label: "Incidentes",
					data: charts.top_zones.map(item => item.incidents),
					backgroundColor: ROSE,
					borderColor: ROSE,
					borderRadius: 6,
					maxBarThickness: 34,
				},
			],
		},
		serviceCompliance: {
			labels: charts.service_compliance.map(item => item.service_name),
			datasets: [
				{
					label: "Cumplimiento",
					data: charts.service_compliance.map(item => item.percentage),
					backgroundColor: VIOLET,
					borderColor: VIOLET,
					borderRadius: 6,
					maxBarThickness: 34,
				},
			],
		},
	};
}

function formatTrendTooltip(context: TooltipItem<"line">): string {
	const value = context.parsed.y ?? 0;
	return `${context.dataset.label}: ${value}`;
}
