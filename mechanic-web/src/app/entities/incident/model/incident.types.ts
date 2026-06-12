import { StatusConfig } from "../../../shared/types";

export type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus =
	| "REPORTED"
	| "SEARCHING_PROVIDER"
	| "WAITING_PROVIDER_RESPONSE"
	| "PROVIDER_ACCEPTED"
	| "ASSIGNING_TECHNICIAN"
	| "TECHNICIAN_ASSIGNED"
	| "EN_ROUTE"
	| "ARRIVED"
	| "IN_SERVICE"
	| "COMPLETED"
	| "CANCELLED"
	| "UNATTENDED";

export type Incident = {
	id: string;
	incident_code: string;
	title: string;
	customer_id: string;
	vehicle_id: string;
	service_catalog_id: string | null;
	status: IncidentStatus;
	description: string | null;
	address_text: string | null;
	latitude: number | string | null;
	longitude: number | string | null;
	priority: IncidentPriority;
	reported_at: string;
	completed_at: string | null;
	cancelled_at: string | null;
	unattended_at: string | null;
	unattended_reason: string | null;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
};

export type IncidentPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type IncidentListData = {
	items: Incident[];
	pagination: IncidentPagination;
};

export type IncidentResponse = {
	success: boolean;
	message: string;
	data: Incident;
};

export type IncidentsResponse = {
	success: boolean;
	message: string;
	data: IncidentListData;
};

export type IncidentListQuery = {
	page?: number;
	page_size?: number;
	customer_id?: string;
	vehicle_id?: string;
	service_catalog_id?: string;
	status?: IncidentStatus | "";
	priority?: IncidentPriority | "";
	search?: string;
	reported_from?: string;
	reported_to?: string;
};

export function createEmptyIncidentPagination(): IncidentPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export const INCIDENT_STATUS_OPTIONS: {
	value: IncidentStatus | "";
	label: string;
}[] = [
	{ value: "", label: "Todos los estados" },
	{ value: "REPORTED", label: "Reportado" },
	{ value: "SEARCHING_PROVIDER", label: "Buscando taller" },
	{ value: "WAITING_PROVIDER_RESPONSE", label: "Esperando respuesta" },
	{ value: "PROVIDER_ACCEPTED", label: "Proveedor aceptó" },
	{ value: "ASSIGNING_TECHNICIAN", label: "Asignando técnico" },
	{ value: "TECHNICIAN_ASSIGNED", label: "Técnico asignado" },
	{ value: "EN_ROUTE", label: "En camino" },
	{ value: "ARRIVED", label: "Llegó" },
	{ value: "IN_SERVICE", label: "En servicio" },
	{ value: "COMPLETED", label: "Completado" },
	{ value: "CANCELLED", label: "Cancelado" },
	{ value: "UNATTENDED", label: "Sin atención" },
];

export const INCIDENT_PRIORITY_OPTIONS: {
	value: IncidentPriority | "";
	label: string;
}[] = [
	{ value: "", label: "Todas las prioridades" },
	{ value: "LOW", label: "Baja" },
	{ value: "MEDIUM", label: "Media" },
	{ value: "HIGH", label: "Alta" },
	{ value: "CRITICAL", label: "Crítica" },
];

export const INCIDENT_STATUS_CONFIG: Record<
	IncidentStatus,
	StatusConfig<IncidentStatus>
> = {
	REPORTED: {
		value: "REPORTED",
		label: "Reportado",
		description: "El incidente fue reportado por el cliente.",
		tone: "info",
		order: 1,
	},
	SEARCHING_PROVIDER: {
		value: "SEARCHING_PROVIDER",
		label: "Buscando taller",
		description: "El sistema está buscando proveedores candidatos.",
		tone: "warning",
		order: 2,
	},
	WAITING_PROVIDER_RESPONSE: {
		value: "WAITING_PROVIDER_RESPONSE",
		label: "Esperando respuesta",
		description: "Hay ofertas pendientes de respuesta.",
		tone: "warning",
		order: 3,
	},
	PROVIDER_ACCEPTED: {
		value: "PROVIDER_ACCEPTED",
		label: "Proveedor aceptó",
		description: "Un proveedor aceptó atender el incidente.",
		tone: "success",
		order: 4,
	},
	ASSIGNING_TECHNICIAN: {
		value: "ASSIGNING_TECHNICIAN",
		label: "Asignando técnico",
		description: "Se está asignando un técnico.",
		tone: "info",
		order: 5,
	},
	TECHNICIAN_ASSIGNED: {
		value: "TECHNICIAN_ASSIGNED",
		label: "Técnico asignado",
		description: "El técnico fue asignado.",
		tone: "info",
		order: 6,
	},
	EN_ROUTE: {
		value: "EN_ROUTE",
		label: "En camino",
		description: "El técnico está en camino.",
		tone: "info",
		order: 7,
	},
	ARRIVED: {
		value: "ARRIVED",
		label: "Llegó",
		description: "El técnico llegó al lugar.",
		tone: "info",
		order: 8,
	},
	IN_SERVICE: {
		value: "IN_SERVICE",
		label: "En servicio",
		description: "El servicio está en proceso.",
		tone: "warning",
		order: 9,
	},
	COMPLETED: {
		value: "COMPLETED",
		label: "Completado",
		description: "El incidente fue completado.",
		tone: "success",
		order: 10,
	},
	CANCELLED: {
		value: "CANCELLED",
		label: "Cancelado",
		description: "El incidente fue cancelado.",
		tone: "destructive",
		order: 11,
	},
	UNATTENDED: {
		value: "UNATTENDED",
		label: "Sin atención",
		description: "No se pudo atender el incidente.",
		tone: "destructive",
		order: 12,
	},
};

export function getIncidentStatusConfig(
	status: IncidentStatus | string | null
): StatusConfig<IncidentStatus> | undefined {
	if (!status) {
		return undefined;
	}

	return INCIDENT_STATUS_CONFIG[status as IncidentStatus];
}

export function getIncidentStatusLabel(
	status: IncidentStatus | string | null
): string {
	if (!status) {
		return "Sin estado";
	}

	return getIncidentStatusConfig(status)?.label ?? status;
}

export function formatIncidentDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getIncidentLocationLabel(incident: Incident): string {
	return incident.address_text || "Sin dirección registrada";
}

export function getIncidentPriorityLabel(
	incidentOrPriority: Incident | IncidentPriority | string | null
): string {
	if (!incidentOrPriority) {
		return "Sin prioridad";
	}

	if (typeof incidentOrPriority === "string") {
		switch (incidentOrPriority) {
			case "LOW":
				return "Baja";
			case "MEDIUM":
				return "Media";
			case "HIGH":
				return "Alta";
			case "CRITICAL":
				return "Crítica";
			default:
				return incidentOrPriority;
		}
	}

	return incidentOrPriority.priority || "Sin prioridad";
}
