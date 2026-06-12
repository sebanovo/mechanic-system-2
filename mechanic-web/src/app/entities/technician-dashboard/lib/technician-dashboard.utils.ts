import {
	DashboardKpiView,
} from "../../owner-dashboard/model";
import {
	formatInteger,
	formatMinutes,
	formatPercentage,
} from "../../owner-dashboard/lib/owner-dashboard.utils";
import {
	TechnicianDashboardKpis,
	TechnicianComplianceKpiView,
} from "../model";

export function buildTechnicianMetricKpis(
	kpis: TechnicianDashboardKpis,
): DashboardKpiView[] {
	return [
		{
			type: "metric",
			id: "completed-cases",
			title: "Servicios completados",
			value: formatInteger(
				kpis.completed_cases,
			),
			description:
				"Servicios finalizados en el periodo.",
			icon: "lucideCircleCheckBig",
			tone: "green",
		},
		{
			type: "metric",
			id: "cancelled-cases",
			title: "Servicios cancelados",
			value: formatInteger(
				kpis.cancelled_cases,
			),
			description:
				"Asignaciones canceladas en el periodo.",
			icon: "lucideCircleX",
			tone: "red",
		},
		{
			type: "metric",
			id: "average-arrival-time",
			title:
				"Tiempo promedio de llegada",
			value: formatMinutes(
				kpis.average_arrival_time_minutes,
			),
			description:
				"Desde la asignación hasta la llegada.",
			icon: "lucideClock3",
			tone: "amber",
		},
		{
			type: "metric",
			id: "average-resolution-time",
			title:
				"Tiempo promedio de resolución",
			value: formatMinutes(
				kpis.average_resolution_time_minutes,
			),
			description:
				"Desde la asignación hasta completar el servicio.",
			icon: "lucideTimer",
			tone: "amber",
		},
	];
}

export function buildTechnicianComplianceKpi(
	kpis: TechnicianDashboardKpis,
): TechnicianComplianceKpiView {
	const compliance =
		kpis.services_completed_within_estimated_time;

	return {
		id: "service-compliance",
		title:
			"Servicios dentro del tiempo esperado",
		description:
			"Cumplimiento respecto al tiempo estimado del catálogo.",
		icon: "lucideShieldCheck",
		tone: "green",
		percentage:
			formatPercentage(
				compliance.percentage,
			),
		completed:
			formatInteger(
				compliance.completed,
			),
		outOfTime:
			formatInteger(
				compliance.out_of_time,
			),
	};
}

export function formatAssignmentStatus(
	status: string | null,
): string {
	if (!status) {
		return "Sin estado";
	}

	const labels: Record<string, string> = {
		ASSIGNED: "Asignado",
		EN_ROUTE: "En ruta",
		ARRIVED: "Llegó al destino",
		IN_SERVICE: "En servicio",
		COMPLETED: "Completado",
		CANCELLED: "Cancelado",
	};

	return (
		labels[status] ??
		status
			.replaceAll("_", " ")
			.toLowerCase()
			.replace(
				/\b\w/g,
				character =>
					character.toUpperCase(),
			)
	);
}

export function getAssignmentStatusTone(
	status: string | null,
):
	| "info"
	| "warning"
	| "success"
	| "destructive"
	| "muted" {
	if (!status) {
		return "muted";
	}

	if (status === "ASSIGNED") {
		return "info";
	}

	if (
		status === "EN_ROUTE" ||
		status === "ARRIVED"
	) {
		return "warning";
	}

	if (
		status === "IN_SERVICE" ||
		status === "COMPLETED"
	) {
		return "success";
	}

	if (status === "CANCELLED") {
		return "destructive";
	}

	return "muted";
}
