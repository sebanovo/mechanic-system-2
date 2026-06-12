import { ChartData, ChartOptions } from "chart.js";

import { formatDashboardDate } from "../../owner-dashboard/lib/owner-dashboard.utils";
import { TechnicianDashboardCharts } from "../model";

const YELLOW = "#ffc107";
const AMBER = "#ffb300";
const GREEN = "#2e7d32";
const RED = "#c62828";
const BLACK = "#111111";
const GRID = "rgba(17, 17, 17, 0.18)";
const TICK = "#111111";

export interface TechnicianDashboardChartView {
	servicesByType: ChartData<"bar", number[], string>;
	completedTrend: ChartData<"line", number[], string>;
	serviceCompliance: ChartData<"bar", number[], string>;
	topZones: ChartData<"bar", number[], string>;
}

export const TECHNICIAN_VERTICAL_BAR_OPTIONS: ChartOptions<"bar"> = {
	responsive: true,
	maintainAspectRatio: false,
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

export const TECHNICIAN_HORIZONTAL_BAR_OPTIONS: ChartOptions<"bar"> = {
	responsive: true,
	maintainAspectRatio: false,
	indexAxis: "y",
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
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

export const TECHNICIAN_PERCENTAGE_OPTIONS: ChartOptions<"bar"> = {
	...TECHNICIAN_HORIZONTAL_BAR_OPTIONS,
	scales: {
		x: {
			beginAtZero: true,
			min: 0,
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

export const TECHNICIAN_LINE_OPTIONS: ChartOptions<"line"> = {
	responsive: true,
	maintainAspectRatio: false,
	interaction: {
		mode: "index",
		intersect: false,
	},
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: context => `Completados: ${context.parsed.y ?? 0}`,
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

export function buildTechnicianCharts(
	charts: TechnicianDashboardCharts
): TechnicianDashboardChartView {
	const trend = [...charts.completed_services_trend].sort(
		(first, second) =>
			new Date(`${first.date}T00:00:00`).getTime() -
			new Date(`${second.date}T00:00:00`).getTime()
	);

	return {
		servicesByType: {
			labels: charts.services_by_type.map(item => item.name),
			datasets: [
				{
					label: "Servicios",
					data: charts.services_by_type.map(item => item.value),
					backgroundColor: YELLOW,
					borderColor: BLACK,
					borderRadius: 6,
					maxBarThickness: 48,
				},
			],
		},
		completedTrend: {
			labels: trend.map(item => formatDashboardDate(item.date)),
			datasets: [
				{
					label: "Servicios completados",
					data: trend.map(item => item.completed),
					borderColor: GREEN,
					backgroundColor: GREEN,
					pointBackgroundColor: "#fffbeb",
					pointBorderColor: GREEN,
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
					fill: false,
				},
			],
		},
		serviceCompliance: {
			labels: charts.service_compliance.map(item => item.service_name),
			datasets: [
				{
					label: "Cumplimiento",
					data: charts.service_compliance.map(item => item.percentage),
					backgroundColor: AMBER,
					borderColor: BLACK,
					borderRadius: 6,
					maxBarThickness: 34,
				},
			],
		},
		topZones: {
			labels: charts.top_zones.map(item => item.zone),
			datasets: [
				{
					label: "Servicios",
					data: charts.top_zones.map(item => item.incidents),
					backgroundColor: YELLOW,
					borderColor: BLACK,
					borderRadius: 6,
					maxBarThickness: 34,
				},
			],
		},
	};
}
