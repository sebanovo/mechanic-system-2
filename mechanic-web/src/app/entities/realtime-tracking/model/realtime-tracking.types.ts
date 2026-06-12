import { AssignmentStatus } from "../../../entities/assignment/model";
import { IncidentStatus } from "../../../entities/incident/model";
import { StatusConfig } from "../../../shared/types";

export type RealtimeTrackingActorType =
	| "TECHNICIAN"
	| "CUSTOMER"
	| "TENANT_OWNER"
	| "CLIENT";

export type RealtimeTrackingPointType =
	| "TECHNICIAN_CURRENT_LOCATION"
	| "INCIDENT_LOCATION";

export type RealtimeTrackingMapProvider = "GOOGLE_MAPS";

export type RealtimeTrackingTravelMode = "DRIVING";

export type RealtimeTrackingConnectionStatus =
	| "IDLE"
	| "CONNECTING"
	| "CONNECTED"
	| "DISCONNECTED"
	| "ERROR";

export type RealtimeTrackingIncomingEventType =
	| "LOCATION_UPDATED"
	| "TECHNICIAN_LOCATION_UPDATED"
	| "CONNECTED"
	| "ERROR"
	| "ASSIGNMENT_STATUS_CHANGED"
	| "TECHNICIAN_CONNECTED"
	| "TECHNICIAN_DISCONNECTED";

export type RealtimeTrackingActor = {
	id: string;
	name: string;
	phone: string | null;
};

export type RealtimeTrackingPoint = {
	type: RealtimeTrackingPointType;
	latitude: number | string | null;
	longitude: number | string | null;
	address_text: string | null;
	occurred_at: string | null;
};

export type RealtimeTrackingWebSocketContract = {
	url: string;
	events: string[];
};

export type RealtimeTrackingMapsContract = {
	provider: RealtimeTrackingMapProvider;
	travel_mode: RealtimeTrackingTravelMode;
	frontend_calculates_eta: boolean;
};

export type RealtimeTrackingSession = {
	assignment_id: string;
	incident_id: string;
	assignment_status: AssignmentStatus;
	incident_status: IncidentStatus;
	technician: RealtimeTrackingActor;
	customer: RealtimeTrackingActor;
	origin: RealtimeTrackingPoint;
	destination: RealtimeTrackingPoint;
	websocket: RealtimeTrackingWebSocketContract;
	maps: RealtimeTrackingMapsContract;
};

export type RealtimeTrackingLocationEvent = {
	type: "LOCATION_UPDATED" | "TECHNICIAN_LOCATION_UPDATED";
	assignment_id: string;
	latitude: number | string | null;
	longitude: number | string | null;
	heading?: number | string | null;
	speed_kmh?: number | string | null;
	occurred_at: string;
	message?: string | null;
};

export type RealtimeTrackingConnectedEvent = {
	type: "CONNECTED" | "TECHNICIAN_CONNECTED" | "TECHNICIAN_DISCONNECTED";
	assignment_id?: string;
	occurred_at?: string;
	message?: string | null;
};

export type RealtimeTrackingAssignmentStatusChangedEvent = {
	type: "ASSIGNMENT_STATUS_CHANGED";
	assignment_id: string;
	incident_id: string;
	assignment_status: AssignmentStatus;
	incident_status: IncidentStatus;
	tracking_event_type: string;
	occurred_at: string;
};

export type RealtimeTrackingErrorEvent = {
	type: "ERROR";
	assignment_id?: string;
	message: string;
	occurred_at?: string;
};

export type RealtimeTrackingIncomingEvent =
	| RealtimeTrackingLocationEvent
	| RealtimeTrackingConnectedEvent
	| RealtimeTrackingAssignmentStatusChangedEvent
	| RealtimeTrackingErrorEvent;

export type RealtimeTrackingLogItem = {
	id: string;
	type: RealtimeTrackingIncomingEventType | "SYSTEM";
	title: string;
	description: string;
	occurred_at: string;
};

export const REALTIME_TRACKING_CONNECTION_STATUS_CONFIG: Record<
	RealtimeTrackingConnectionStatus,
	StatusConfig<RealtimeTrackingConnectionStatus>
> = {
	IDLE: {
		value: "IDLE",
		label: "Sin conectar",
		description: "Aún no hay conexión WebSocket activa.",
		tone: "muted",
		order: 1,
	},
	CONNECTING: {
		value: "CONNECTING",
		label: "Conectando",
		description: "Intentando abrir conexión WebSocket.",
		tone: "warning",
		order: 2,
	},
	CONNECTED: {
		value: "CONNECTED",
		label: "Conectado",
		description: "La conexión WebSocket está activa.",
		tone: "success",
		order: 3,
	},
	DISCONNECTED: {
		value: "DISCONNECTED",
		label: "Desconectado",
		description: "La conexión WebSocket se cerró.",
		tone: "muted",
		order: 4,
	},
	ERROR: {
		value: "ERROR",
		label: "Error",
		description: "No se pudo mantener la conexión WebSocket.",
		tone: "destructive",
		order: 5,
	},
};

export function getRealtimeTrackingConnectionStatusConfig(
	status: RealtimeTrackingConnectionStatus
) {
	return REALTIME_TRACKING_CONNECTION_STATUS_CONFIG[status];
}

export function formatRealtimeTrackingDate(
	value: string | null | undefined
): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function formatRealtimeTrackingCoordinate(
	value: number | string | null | undefined
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

export function formatRealtimeTrackingPoint(
	point: RealtimeTrackingPoint | null
): string {
	if (!point) {
		return "Sin ubicación";
	}

	const latitude = formatRealtimeTrackingCoordinate(point.latitude);
	const longitude = formatRealtimeTrackingCoordinate(point.longitude);

	if (latitude === "Sin coordenada" || longitude === "Sin coordenada") {
		return point.address_text || "Sin ubicación";
	}

	return `${latitude}, ${longitude}`;
}

export function formatRealtimeTrackingSpeed(
	value: number | string | null | undefined
): string {
	if (value === null || value === undefined || value === "") {
		return "Sin velocidad";
	}

	const parsed = Number(value);

	if (Number.isNaN(parsed)) {
		return String(value);
	}

	return `${parsed.toFixed(1)} km/h`;
}

export function formatRealtimeTrackingHeading(
	value: number | string | null | undefined
): string {
	if (value === null || value === undefined || value === "") {
		return "Sin dirección";
	}

	const parsed = Number(value);

	if (Number.isNaN(parsed)) {
		return String(value);
	}

	return `${parsed.toFixed(0)}°`;
}

export function isRealtimeTrackingLocationEvent(
	event: RealtimeTrackingIncomingEvent
): event is RealtimeTrackingLocationEvent {
	return (
		event.type === "LOCATION_UPDATED" ||
		event.type === "TECHNICIAN_LOCATION_UPDATED"
	);
}

export function isRealtimeTrackingAssignmentStatusChangedEvent(
	event: RealtimeTrackingIncomingEvent
): event is RealtimeTrackingAssignmentStatusChangedEvent {
	return event.type === "ASSIGNMENT_STATUS_CHANGED";
}

export function buildRealtimeTrackingLogItem(
	event: RealtimeTrackingIncomingEvent
): RealtimeTrackingLogItem {
	const occurredAt =
		"occurred_at" in event && event.occurred_at
			? event.occurred_at
			: new Date().toISOString();

	if (isRealtimeTrackingLocationEvent(event)) {
		return {
			id: `${event.type}-${occurredAt}-${Math.random()}`,
			type: event.type,
			title: "Ubicación actualizada",
			description: `Lat: ${formatRealtimeTrackingCoordinate(event.latitude)} · Lng: ${formatRealtimeTrackingCoordinate(event.longitude)}`,
			occurred_at: occurredAt,
		};
	}

	if (isRealtimeTrackingAssignmentStatusChangedEvent(event)) {
		return {
			id: `${event.type}-${occurredAt}-${Math.random()}`,
			type: event.type,
			title: "Estado actualizado",
			description: `Asignación: ${event.assignment_status} · Incidente: ${event.incident_status}`,
			occurred_at: occurredAt,
		};
	}

	if (event.type === "TECHNICIAN_CONNECTED") {
		return {
			id: `${event.type}-${occurredAt}-${Math.random()}`,
			type: event.type,
			title: "Técnico conectado",
			description: event.message || "El técnico se conectó al tracking.",
			occurred_at: occurredAt,
		};
	}

	if (event.type === "TECHNICIAN_DISCONNECTED") {
		return {
			id: `${event.type}-${occurredAt}-${Math.random()}`,
			type: event.type,
			title: "Técnico desconectado",
			description: event.message || "El técnico se desconectó del tracking.",
			occurred_at: occurredAt,
		};
	}

	if (event.type === "ERROR") {
		return {
			id: `${event.type}-${occurredAt}-${Math.random()}`,
			type: event.type,
			title: "Error WebSocket",
			description: event.message || "Ocurrió un error en el tracking.",
			occurred_at: occurredAt,
		};
	}

	return {
		id: `${event.type}-${occurredAt}-${Math.random()}`,
		type: event.type,
		title: "Evento recibido",
		description: event.message || "Evento recibido desde WebSocket.",
		occurred_at: occurredAt,
	};
}
