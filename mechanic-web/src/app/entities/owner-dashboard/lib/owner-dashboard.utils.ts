import {
	DashboardKpiView,
	OperationalTrendItem,
	OwnerDashboardDateFilters,
	OwnerDashboardKpis,
} from "../model";

export function buildOwnerDashboardKpis(
	kpis: OwnerDashboardKpis
): DashboardKpiView[] {
	return [
		{
			type: "metric",
			id: "average-arrival-time",
			title: "Tiempo promedio de llegada",
			value: formatMinutes(kpis.average_arrival_time_minutes),
			description: "Desde la asignación hasta la llegada.",
			icon: "lucideClock3",
			tone: "amber",
		},
		{
			type: "metric",
			id: "average-resolution-time",
			title: "Tiempo promedio de resolución",
			value: formatMinutes(kpis.average_resolution_time_minutes),
			description: "Desde la asignación hasta la finalización.",
			icon: "lucideTimer",
			tone: "amber",
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
			id: "completed-cases",
			title: "Casos completados",
			value: formatInteger(kpis.completed_cases),
			description: "Incidentes finalizados dentro del rango.",
			icon: "lucideCircleCheckBig",
			tone: "green",
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
			id: "top-technicians",
			title: "Técnicos con más servicios",
			description: "Top 3 por servicios completados.",
			icon: "lucideUsersRound",
			tone: "emerald",
			items: kpis.top_technicians.map(item => ({
				label: item.name,
				value: formatInteger(item.completed_services),
			})),
			emptyLabel: "Sin técnicos con servicios completados.",
		},
		{
			type: "list",
			id: "top-zones",
			title: "Zonas con más incidentes",
			description: "Top 3 zonas con mayor demanda.",
			icon: "lucideMapPinned",
			tone: "amber",
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
			tone: "green",
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

export function formatInteger(value: number | null | undefined): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "0";
	}

	return new Intl.NumberFormat("es-BO", {
		maximumFractionDigits: 0,
	}).format(value);
}

export function formatPercentage(value: number | null | undefined): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "0%";
	}

	return `${formatDecimal(value)}%`;
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

export function formatDashboardRange(filters: OwnerDashboardDateFilters): string {
	if (!filters.date_from || !filters.date_to) {
		return "Últimos 30 días";
	}

	return `${formatLongDate(filters.date_from)} — ${formatLongDate(filters.date_to)}`;
}

export function createDefaultDashboardFilters(): OwnerDashboardDateFilters {
	const dateTo = new Date();
	const dateFrom = new Date();

	dateFrom.setDate(dateTo.getDate() - 30);

	return {
		date_from: toDateInputValue(dateFrom),
		date_to: toDateInputValue(dateTo),
	};
}

export function normalizeTrendItems(items: OperationalTrendItem[]): OperationalTrendItem[] {
	return [...items].sort(
		(first, second) => new Date(first.date).getTime() - new Date(second.date).getTime()
	);
}

export function toDashboardApiDate(value: string, endOfDay = false): string | undefined {
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

export function validateDashboardDateRange(filters: OwnerDashboardDateFilters): string | null {
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

function buildCancellationDescription(
	client: number,
	owner: number,
	technician: number
): string {
	return [
		`Cliente: ${formatInteger(client)}`,
		`Owner: ${formatInteger(owner)}`,
		`Técnico: ${formatInteger(technician)}`,
	].join(" · ");
}
