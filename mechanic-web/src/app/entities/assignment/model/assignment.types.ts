import { IncidentOffer } from "../../../entities/incident-offer/model";
import { Incident } from "../../../entities/incident/model";
import { ProviderProfile } from "../../../entities/provider/model";
import { TechnicianRecord } from "../../../entities/technician/model";
import { StatusConfig } from "../../../shared/types";

export type AssignmentStatus =
	| "PENDING"
	| "ASSIGNED"
	| "EN_ROUTE"
	| "ARRIVED"
	| "IN_SERVICE"
	| "COMPLETED"
	| "CANCELLED";

export type Assignment = {
	id: string;
	incident_id: string;
	offer_id: string;
	provider_profile_id: string;
	technician_id: string;
	assignment_status: AssignmentStatus;
	notes: string | null;
	assigned_at: string;
	en_route_at: string | null;
	arrived_at: string | null;
	started_at: string | null;
	completed_at: string | null;
	cancelled_at: string | null;
	created_at: string;
	updated_at: string;
};

export type AssignmentDetail = {
	assignment: Assignment;
	incident: Incident;
	offer: IncidentOffer;
	provider_profile: ProviderProfile;
	technician: TechnicianRecord;
};

export type AssignmentPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type AssignmentListData = {
	items: AssignmentDetail[];
	pagination: AssignmentPagination;
};

export type AssignmentListQuery = {
	page?: number;
	page_size?: number;
	assignment_status?: AssignmentStatus | "";
};

export type CreateAssignmentPayload = {
	offer_id: string;
	technician_id: string;
	notes?: string | null;
};

export type UpdateAssignmentPayload = {
	technician_id?: string | null;
	notes?: string | null;
};

export type ChangeAssignmentStatusPayload = {
	assignment_status: AssignmentStatus;
};

export const ASSIGNMENT_STATUS_OPTIONS: {
	value: AssignmentStatus | "";
	label: string;
}[] = [
	{
		value: "",
		label: "Todas",
	},
	{
		value: "PENDING",
		label: "Pendientes",
	},
	{
		value: "ASSIGNED",
		label: "Asignadas",
	},
	{
		value: "EN_ROUTE",
		label: "En camino",
	},
	{
		value: "ARRIVED",
		label: "Llegó",
	},
	{
		value: "IN_SERVICE",
		label: "En servicio",
	},
	{
		value: "COMPLETED",
		label: "Completadas",
	},
	{
		value: "CANCELLED",
		label: "Canceladas",
	},
];

export const ASSIGNMENT_STATUS_CONFIG: Record<
	AssignmentStatus,
	StatusConfig<AssignmentStatus>
> = {
	PENDING: {
		value: "PENDING",
		label: "Pendiente",
		description: "La asignación aún no está activa.",
		tone: "warning",
		order: 1,
	},
	ASSIGNED: {
		value: "ASSIGNED",
		label: "Asignada",
		description: "El técnico ya fue asignado.",
		tone: "info",
		order: 2,
	},
	EN_ROUTE: {
		value: "EN_ROUTE",
		label: "En camino",
		description: "El técnico inició ruta hacia el incidente.",
		tone: "info",
		order: 3,
	},
	ARRIVED: {
		value: "ARRIVED",
		label: "Llegó",
		description: "El técnico llegó al punto del incidente.",
		tone: "info",
		order: 4,
	},
	IN_SERVICE: {
		value: "IN_SERVICE",
		label: "En servicio",
		description: "El técnico está atendiendo el incidente.",
		tone: "warning",
		order: 5,
	},
	COMPLETED: {
		value: "COMPLETED",
		label: "Completada",
		description: "El servicio fue finalizado correctamente.",
		tone: "success",
		order: 6,
	},
	CANCELLED: {
		value: "CANCELLED",
		label: "Cancelada",
		description: "La asignación fue cancelada.",
		tone: "destructive",
		order: 7,
	},
};

export function createEmptyAssignmentPagination(): AssignmentPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getAssignmentStatusConfig(status: AssignmentStatus) {
	return ASSIGNMENT_STATUS_CONFIG[status];
}

export function getAssignmentStatusLabel(status: AssignmentStatus): string {
	return ASSIGNMENT_STATUS_CONFIG[status].label;
}

export function getAssignmentOperationalText(item: AssignmentDetail): string {
	return (
		ASSIGNMENT_STATUS_CONFIG[item.assignment.assignment_status].description ??
		""
	);
}

export function isAssignmentFinal(status: AssignmentStatus): boolean {
	return status === "COMPLETED" || status === "CANCELLED";
}

export function canCancelAssignment(item: AssignmentDetail): boolean {
	return !isAssignmentFinal(item.assignment.assignment_status);
}

export function formatAssignmentDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getAssignmentIncidentCode(item: AssignmentDetail): string {
	return item.incident.incident_code || item.incident.id;
}

export function getAssignmentIncidentDescription(
	item: AssignmentDetail
): string {
	return item.incident.description || "Sin descripción registrada";
}

export function getAssignmentIncidentLocation(item: AssignmentDetail): string {
	return item.incident.address_text || "Sin dirección registrada";
}

export function getAssignmentTechnicianLabel(item: AssignmentDetail): string {
	return item.technician.technician_code || item.technician.id;
}

export function getAssignmentTechnicianStatusLabel(
	item: AssignmentDetail
): string {
	return item.technician.status;
}

export function getAssignmentTimelineLabel(item: AssignmentDetail): string {
	const status = item.assignment.assignment_status;

	if (status === "COMPLETED") {
		return `Completada: ${formatAssignmentDate(item.assignment.completed_at)}`;
	}

	if (status === "CANCELLED") {
		return `Cancelada: ${formatAssignmentDate(item.assignment.cancelled_at)}`;
	}

	if (status === "IN_SERVICE") {
		return `Servicio iniciado: ${formatAssignmentDate(item.assignment.started_at)}`;
	}

	if (status === "ARRIVED") {
		return `Llegó: ${formatAssignmentDate(item.assignment.arrived_at)}`;
	}

	if (status === "EN_ROUTE") {
		return `En camino: ${formatAssignmentDate(item.assignment.en_route_at)}`;
	}

	return `Asignada: ${formatAssignmentDate(item.assignment.assigned_at)}`;
}

export function formatAssignmentResponseTime(item: AssignmentDetail): string {
	if (!item.offer.sent_at || !item.offer.responded_at) {
		return "Sin respuesta";
	}

	const sentAt = new Date(item.offer.sent_at);
	const respondedAt = new Date(item.offer.responded_at);

	if (Number.isNaN(sentAt.getTime()) || Number.isNaN(respondedAt.getTime())) {
		return "Tiempo inválido";
	}

	const minutes = Math.max(
		0,
		Math.round((respondedAt.getTime() - sentAt.getTime()) / 60000)
	);

	return `${minutes} min`;
}
