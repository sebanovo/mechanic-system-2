import { ChartData } from "chart.js";

import {
	formatDashboardDate,
	formatPercentage,
} from "./platform-dashboard.utils";
import { PlatformDashboardCharts } from "../model";

export interface PlatformDashboardChartView {
	incidentsByService: ChartData<"bar", number[], string>;
	operationalTrend: ChartData<"line", number[], string>;
	topWorkshops: ChartData<"bar", number[], string>;
	topZones: ChartData<"bar", number[], string>;
	serviceCompliance: ChartData<"bar", number[], string>;
}

export function buildPlatformDashboardCharts(
	charts: PlatformDashboardCharts
): PlatformDashboardChartView {
	const trend = [...charts.operational_trend].sort(
		(first, second) =>
			new Date(`${first.date}T00:00:00`).getTime() -
			new Date(`${second.date}T00:00:00`).getTime()
	);

	return {
		incidentsByService: {
			labels: charts.incidents_by_service.map(item => item.name),
			datasets: [
				{
					label: "Incidentes",
					data: charts.incidents_by_service.map(item => item.value),
					backgroundColor: "#2563eb",
					borderColor: "#2563eb",
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
					borderColor: "#16a34a",
					backgroundColor: "#16a34a",
					pointBackgroundColor: "#ffffff",
					pointBorderColor: "#16a34a",
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
				},
				{
					label: "Cancelados",
					data: trend.map(item => item.cancelled),
					borderColor: "#dc2626",
					backgroundColor: "#dc2626",
					pointBackgroundColor: "#ffffff",
					pointBorderColor: "#dc2626",
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
				},
				{
					label: "No atendidos",
					data: trend.map(item => item.unattended),
					borderColor: "#7c3aed",
					backgroundColor: "#7c3aed",
					pointBackgroundColor: "#ffffff",
					pointBorderColor: "#7c3aed",
					pointBorderWidth: 2,
					pointRadius: 3,
					pointHoverRadius: 5,
					tension: 0.32,
				},
			],
		},
		topWorkshops: {
			labels: charts.top_workshops.map(
				item => `${item.name} · ${formatPercentage(item.efficiency)}`
			),
			datasets: [
				{
					label: "Servicios completados",
					data: charts.top_workshops.map(item => item.completed_services),
					backgroundColor: "#16a34a",
					borderColor: "#16a34a",
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
					backgroundColor: "#e11d48",
					borderColor: "#e11d48",
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
					backgroundColor: "#7c3aed",
					borderColor: "#7c3aed",
					borderRadius: 6,
					maxBarThickness: 34,
				},
			],
		},
	};
}
