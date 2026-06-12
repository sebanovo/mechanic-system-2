import {
	DashboardKpiView,
} from "../../owner-dashboard/model";
import {
	PlatformDashboardKpis,
	PlatformDashboardDateFilters,
} from "../model";

export function buildPlatformDashboardKpis(
	kpis: PlatformDashboardKpis
): DashboardKpiView[] {
	return [
		{
			type: "metric",
			id: "total-incidents",
			title: "Incidentes totales",
			value: formatInteger(kpis.total_incidents),
			description: "Total de incidentes dentro del periodo.",
			icon: "lucideWrench",
			tone: "blue",
		},
		{
			type: "metric",
			id: "completed-cases",
			title: "Casos completados",
			value: formatInteger(kpis.completed_cases),
			description: "Incidentes finalizados correctamente.",
			icon: "lucideCircleCheckBig",
			tone: "green",
		},
		{
			type: "metric",
			id: "cancelled-cases",
			title: "Casos cancelados",
			value: formatInteger(kpis.cancelled_cases.total),
			description: buildCancellationDescription(
				kpis.cancelled_cases.by_actor.client,
				kpis.cancelled_cases.by_actor.owner,
				kpis.cancelled_cases.by_actor.technician
			),
			icon: "lucideCircleX",
			tone: "red",
		},
		{
			type: "metric",
			id: "unattended-cases",
			title: "Casos no atendidos",
			value: formatInteger(kpis.unattended_cases.total),
			description: "Incidentes sin talleres elegibles o sin aceptación.",
			icon: "lucideTimer",
			tone: "amber",
		},
		{
			type: "metric",
			id: "average-acceptance-time",
			title: "Tiempo promedio de aceptación",
			value: formatMinutes(
				kpis.provider_acceptance.average_acceptance_time_minutes
			),
			description: "Desde la oferta hasta la primera aceptación.",
			icon: "lucideClock3",
			tone: "indigo",
		},
		{
			type: "list",
			id: "in-process-incidents",
			title: "Incidentes en proceso",
			description: "Distribución actual del flujo operativo.",
			icon: "lucideUsersRound",
			tone: "violet",
			items: [
				{
					label: "Esperando taller",
					value: formatInteger(
						kpis.in_process_incidents.waiting_provider_response
					),
				},
				{
					label: "Taller aceptó",
					value: formatInteger(kpis.in_process_incidents.provider_accepted),
				},
				{
					label: "Técnico asignado",
					value: formatInteger(kpis.in_process_incidents.technician_assigned),
				},
				{
					label: "En ruta",
					value: formatInteger(kpis.in_process_incidents.en_route),
				},
				{
					label: "Llegó al destino",
					value: formatInteger(kpis.in_process_incidents.arrived),
				},
				{
					label: "En servicio",
					value: formatInteger(kpis.in_process_incidents.in_service),
				},
			],
			emptyLabel: "Sin incidentes en proceso.",
		},
		{
			type: "list",
			id: "provider-acceptance",
			title: "Respuesta de talleres",
			description: "Tasas de aceptación, rechazo y expiración.",
			icon: "lucideShieldCheck",
			tone: "emerald",
			items: [
				{
					label: "Aceptación",
					value: formatPercentage(
						kpis.provider_acceptance.acceptance_rate_percentage
					),
				},
				{
					label: "Rechazo",
					value: formatPercentage(
						kpis.provider_acceptance.rejection_rate_percentage
					),
				},
				{
					label: "Expiración",
					value: formatPercentage(
						kpis.provider_acceptance.expiration_rate_percentage
					),
				},
			],
			emptyLabel: "Sin ofertas evaluadas.",
		},
		{
			type: "list",
			id: "top-incident-types",
			title: "Tipos de incidentes",
			description: "Top 3 incidentes más frecuentes.",
			icon: "lucideWrench",
			tone: "amber",
			items: kpis.top_incident_types.map(item => ({
				label: item.name,
				value: formatInteger(item.total),
			})),
			emptyLabel: "Sin incidentes registrados.",
		},
		{
			type: "list",
			id: "top-workshops",
			title: "Talleres más productivos",
			description: "Top 3 por servicios completados y eficiencia.",
			icon: "lucideUsersRound",
			tone: "emerald",
			items: kpis.top_workshops.map(item => ({
				label: item.name,
				value: `${formatInteger(item.completed_services)} · ${formatPercentage(
					item.efficiency
				)}`,
			})),
			emptyLabel: "Sin talleres con servicios completados.",
		},
		{
			type: "list",
			id: "top-zones",
			title: "Zonas con más incidentes",
			description: "Top 3 zonas con mayor demanda.",
			icon: "lucideMapPinned",
			tone: "rose",
			items: kpis.top_zones.map(item => ({
				label: item.name,
				value: formatInteger(item.total),
			})),
			emptyLabel: "Sin zonas registradas.",
		},
		{
			type: "list",
			id: "service-compliance",
			title: "Servicios dentro del tiempo esperado",
			description: "Cumplimiento del tiempo estimado.",
			icon: "lucideShieldCheck",
			tone: "violet",
			items: [
				{
					label: "Cumplimiento",
					value: formatPercentage(
						kpis.services_completed_within_estimated_time.percentage
					),
				},
				{
					label: "En tiempo",
					value: formatInteger(
						kpis.services_completed_within_estimated_time.completed
					),
				},
				{
					label: "Fuera de tiempo",
					value: formatInteger(
						kpis.services_completed_within_estimated_time.out_of_time
					),
				},
			],
			emptyLabel: "Sin servicios completados.",
		},
	];
}

export function createDefaultDashboardFilters(): PlatformDashboardDateFilters {
	const dateTo = new Date();
	const dateFrom = new Date();

	dateFrom.setDate(dateTo.getDate() - 30);

	return {
		date_from: toDateInputValue(dateFrom),
		date_to: toDateInputValue(dateTo),
	};
}

export function formatDashboardRange(
	filters: PlatformDashboardDateFilters
): string {
	if (!filters.date_from || !filters.date_to) {
		return "Últimos 30 días";
	}

	return `${formatLongDate(filters.date_from)} — ${formatLongDate(filters.date_to)}`;
}

export function formatDashboardDate(value: string): string {
	const date = new Date(`${value}T00:00:00`);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat("es-BO", {
		day: "2-digit",
		month: "short",
	}).format(date);
}

export function toDashboardApiDate(
	value: string,
	endOfDay = false
): string | undefined {
	if (!value) {
		return undefined;
	}

	const suffix = endOfDay ? "T23:59:59.999" : "T00:00:00.000";
	const date = new Date(`${value}${suffix}`);

	if (Number.isNaN(date.getTime())) {
		return undefined;
	}

	return date.toISOString();
}

export function validateDashboardDateRange(
	filters: PlatformDashboardDateFilters
): string | null {
	if (!filters.date_from || !filters.date_to) {
		return "Debes seleccionar ambas fechas.";
	}

	const dateFrom = new Date(`${filters.date_from}T00:00:00`);
	const dateTo = new Date(`${filters.date_to}T00:00:00`);

	if (Number.isNaN(dateFrom.getTime()) || Number.isNaN(dateTo.getTime())) {
		return "El rango de fechas no es válido.";
	}

	if (dateFrom > dateTo) {
		return "La fecha inicial no puede ser posterior a la fecha final.";
	}

	return null;
}

export function formatInteger(value: number | null | undefined): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "0";
	}

	return new Intl.NumberFormat("es-BO", {
		maximumFractionDigits: 0,
	}).format(value);
}

export function formatMinutes(value: number | null | undefined): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "0 min";
	}

	if (value < 60) {
		return `${formatDecimal(value)} min`;
	}

	const totalMinutes = Math.round(value);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	if (minutes === 0) {
		return `${hours} h`;
	}

	return `${hours} h ${minutes} min`;
}

export function formatPercentage(value: number | null | undefined): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "0%";
	}

	return `${formatDecimal(value)}%`;
}

function buildCancellationDescription(
	client: number,
	owner: number,
	technician: number
): string {
	return `Cliente ${formatInteger(client)} · Taller ${formatInteger(owner)} · Técnico ${formatInteger(technician)}`;
}

function formatDecimal(value: number): string {
	return new Intl.NumberFormat("es-BO", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 1,
	}).format(value);
}

function formatLongDate(value: string): string {
	const date = new Date(`${value}T00:00:00`);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat("es-BO", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
}

function toDateInputValue(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}
