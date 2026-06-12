import { Assignment } from "../../../entities/assignment/model";
import { StatusConfig } from "../../../shared/types";

export type AssignmentTrackingEventType =
	| "ASSIGNED"
	| "EN_ROUTE"
	| "LOCATION_UPDATED"
	| "ARRIVED"
	| "SERVICE_STARTED"
	| "SERVICE_COMPLETED"
	| "CANCELLED"
	| "NOTE";

export type AssignmentTrackingEvent = {
	id: string;
	assignment_id: string;
	event_type: AssignmentTrackingEventType;
	latitude: number | string | null;
	longitude: number | string | null;
	notes: string | null;
	occurred_at: string;
	created_at: string;
	updated_at: string;
};

export type AssignmentTrackingEventDetail = {
	tracking_event: AssignmentTrackingEvent;
	assignment: Assignment;
};

export type AssignmentTrackingEventPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type AssignmentTrackingEventListData = {
	items: AssignmentTrackingEventDetail[];
	pagination: AssignmentTrackingEventPagination;
};

export type AssignmentTrackingEventListQuery = {
	page?: number;
	page_size?: number;
	event_type?: AssignmentTrackingEventType | "";
};

export type CreateAssignmentTrackingEventPayload = {
	event_type: AssignmentTrackingEventType;
	latitude: number;
	longitude: number;
	notes?: string | null;
};

export const ASSIGNMENT_TRACKING_EVENT_TYPE_OPTIONS: {
	value: AssignmentTrackingEventType | "";
	label: string;
}[] = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "ASSIGNED",
		label: "Asignado",
	},
	{
		value: "EN_ROUTE",
		label: "En camino",
	},
	{
		value: "LOCATION_UPDATED",
		label: "Ubicación actualizada",
	},
	{
		value: "ARRIVED",
		label: "Llegó",
	},
	{
		value: "SERVICE_STARTED",
		label: "Servicio iniciado",
	},
	{
		value: "SERVICE_COMPLETED",
		label: "Servicio completado",
	},
	{
		value: "CANCELLED",
		label: "Cancelado",
	},
	{
		value: "NOTE",
		label: "Nota",
	},
];

export const ASSIGNMENT_TRACKING_EVENT_CREATE_OPTIONS: {
	value: AssignmentTrackingEventType;
	label: string;
	description: string;
}[] = [
	{
		value: "EN_ROUTE",
		label: "En camino",
		description: "El técnico inició ruta hacia el incidente.",
	},
	{
		value: "LOCATION_UPDATED",
		label: "Actualizar ubicación",
		description: "Registra una nueva ubicación del técnico.",
	},
	{
		value: "ARRIVED",
		label: "Llegó",
		description: "El técnico llegó al punto del incidente.",
	},
	{
		value: "SERVICE_STARTED",
		label: "Iniciar servicio",
		description: "El técnico inició la atención.",
	},
	{
		value: "SERVICE_COMPLETED",
		label: "Completar servicio",
		description: "El técnico finalizó correctamente el servicio.",
	},
	{
		value: "CANCELLED",
		label: "Cancelar servicio",
		description: "El servicio fue cancelado desde la operación.",
	},
	{
		value: "NOTE",
		label: "Nota",
		description: "Registra una observación operativa.",
	},
];

export const ASSIGNMENT_TRACKING_EVENT_TYPE_CONFIG: Record<
	AssignmentTrackingEventType,
	StatusConfig<AssignmentTrackingEventType>
> = {
	ASSIGNED: {
		value: "ASSIGNED",
		label: "Asignado",
		description: "La asignación fue creada.",
		tone: "info",
		order: 1,
	},
	EN_ROUTE: {
		value: "EN_ROUTE",
		label: "En camino",
		description: "El técnico inició ruta.",
		tone: "info",
		order: 2,
	},
	LOCATION_UPDATED: {
		value: "LOCATION_UPDATED",
		label: "Ubicación",
		description: "Se registró una ubicación del técnico.",
		tone: "muted",
		order: 3,
	},
	ARRIVED: {
		value: "ARRIVED",
		label: "Llegó",
		description: "El técnico llegó al punto del incidente.",
		tone: "info",
		order: 4,
	},
	SERVICE_STARTED: {
		value: "SERVICE_STARTED",
		label: "Iniciado",
		description: "El servicio inició.",
		tone: "warning",
		order: 5,
	},
	SERVICE_COMPLETED: {
		value: "SERVICE_COMPLETED",
		label: "Completado",
		description: "El servicio fue completado.",
		tone: "success",
		order: 6,
	},
	CANCELLED: {
		value: "CANCELLED",
		label: "Cancelado",
		description: "El servicio fue cancelado.",
		tone: "destructive",
		order: 7,
	},
	NOTE: {
		value: "NOTE",
		label: "Nota",
		description: "Observación registrada.",
		tone: "muted",
		order: 8,
	},
};

export function createEmptyAssignmentTrackingEventPagination(): AssignmentTrackingEventPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getAssignmentTrackingEventTypeConfig(
	eventType: AssignmentTrackingEventType
) {
	return ASSIGNMENT_TRACKING_EVENT_TYPE_CONFIG[eventType];
}

export function getAssignmentTrackingEventLabel(
	eventType: AssignmentTrackingEventType
): string {
	return ASSIGNMENT_TRACKING_EVENT_TYPE_CONFIG[eventType].label;
}

export function getAssignmentTrackingEventDescription(
	eventType: AssignmentTrackingEventType
): string {
	return ASSIGNMENT_TRACKING_EVENT_TYPE_CONFIG[eventType].description ?? "";
}

export function formatAssignmentTrackingEventDate(
	value: string | null
): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function formatAssignmentTrackingEventCoordinate(
	value: number | string | null
): string {
	if (value === null || value === undefined || value === "") {
		return "Sin coordenada";
	}

	const parsed = Number(value);

	if (Number.isNaN(parsed)) {
		return String(value);
	}

	return parsed.toFixed(7);
}

export function formatAssignmentTrackingEventLocation(
	item: AssignmentTrackingEventDetail
): string {
	const latitude = formatAssignmentTrackingEventCoordinate(
		item.tracking_event.latitude
	);
	const longitude = formatAssignmentTrackingEventCoordinate(
		item.tracking_event.longitude
	);

	if (latitude === "Sin coordenada" || longitude === "Sin coordenada") {
		return "Sin ubicación registrada";
	}

	return `${latitude}, ${longitude}`;
}

export function trackingEventCanMoveAssignment(
	eventType: AssignmentTrackingEventType
): boolean {
	return [
		"EN_ROUTE",
		"ARRIVED",
		"SERVICE_STARTED",
		"SERVICE_COMPLETED",
		"CANCELLED",
	].includes(eventType);
}

export function getTrackingEventImpactText(
	eventType: AssignmentTrackingEventType
): string {
	if (eventType === "LOCATION_UPDATED") {
		return "Solo registra ubicación. No cambia el estado de la asignación.";
	}

	if (eventType === "NOTE") {
		return "Solo registra una observación. No cambia el estado de la asignación.";
	}

	if (eventType === "EN_ROUTE") {
		return "Actualiza la asignación a EN_ROUTE.";
	}

	if (eventType === "ARRIVED") {
		return "Actualiza la asignación a ARRIVED.";
	}

	if (eventType === "SERVICE_STARTED") {
		return "Actualiza la asignación a IN_SERVICE.";
	}

	if (eventType === "SERVICE_COMPLETED") {
		return "Actualiza la asignación a COMPLETED.";
	}

	if (eventType === "CANCELLED") {
		return "Actualiza la asignación a CANCELLED.";
	}

	return "Evento operativo registrado.";
}

export function isTrackingEventFinal(
	eventType: AssignmentTrackingEventType
): boolean {
	return eventType === "SERVICE_COMPLETED" || eventType === "CANCELLED";
}
