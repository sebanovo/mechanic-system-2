import { Incident, IncidentStatus } from "../../../entities/incident/model";
import { ServiceCatalog } from "../../../entities/service-catalog/model";
import { StatusConfig } from "../../../shared/types";

export type IncidentOfferStatus =
	| "PENDING"
	| "ACCEPTED"
	| "REJECTED"
	| "EXPIRED"
	| "CANCELLED";

export type IncidentOfferResponseMode = "ACCEPT" | "REJECT";

export type IncidentOffer = {
	id: string;
	incident_id: string;
	candidate_provider_id: string;
	provider_profile_id: string;
	offer_status: IncidentOfferStatus;
	message: string | null;
	response_message: string | null;
	sent_at: string | null;
	responded_at: string | null;
	expires_at: string | null;
	created_at: string;
	updated_at: string;
};

export type IncidentOfferVehicleSummary = {
	id: string;
	label: string | null;
	plate_number: string | null;
};

export type IncidentOfferAiAnalysisSummary = {
	probable_service_code: string | null;
	probable_problem: string | null;
	confidence_score: number | string | null;
	recommended_priority: string | null;
	estimated_min_price: number | string | null;
	estimated_max_price: number | string | null;
	estimated_min_duration_minutes: number | null;
	estimated_max_duration_minutes: number | null;
};

export type IncidentOfferListItem = {
	id: string;
	offer_status: IncidentOfferStatus;
	expires_at: string | null;
	responded_at: string | null;
	created_at: string;
	incident_id: string;
	incident_code: string;
	incident_title: string;
	incident_priority: string;
	incident_status: IncidentStatus;
	service_name: string | null;
	service_code: string | null;
	vehicle_label: string | null;
	address_text: string | null;
	estimated_min_price: number | string | null;
	estimated_max_price: number | string | null;
	estimated_min_duration_minutes: number | null;
	estimated_max_duration_minutes: number | null;
};

export type IncidentOfferCustomerSummary = {
	id: string;
	full_name: string | null;
	phone: string | null;
};

export type IncidentOfferProviderProfileSummary = {
	id: string;
	provider_type: string;
	operational_status: string;
	accepts_emergency_requests: boolean;
	average_rating: number;
	total_reviews: number;
};

export type IncidentOfferActionLink = {
	method: string;
	url: string;
};

export type IncidentOfferEntry = IncidentOfferListItem | IncidentOfferDetail;

export type IncidentOfferDetail = {
	offer: IncidentOffer;
	incident: Incident;
	service: ServiceCatalog | null;
	vehicle: IncidentOfferVehicleSummary | null;
	ai_analysis: IncidentOfferAiAnalysisSummary | null;
	customer?: IncidentOfferCustomerSummary | null;
	provider_profile?: IncidentOfferProviderProfileSummary;
	actions?: Record<string, IncidentOfferActionLink>;
};

export type IncidentOfferPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type IncidentOfferListData = {
	items: IncidentOfferListItem[];
	pagination: IncidentOfferPagination;
};

export type IncidentOfferListQuery = {
	page?: number;
	page_size?: number;
	incident_id?: string;
	candidate_provider_id?: string;
	provider_profile_id?: string;
	offer_status?: IncidentOfferStatus | "";
};

export type IncidentOfferResponsePayload = {
	response_message?: string | null;
};

export const INCIDENT_OFFER_STATUS_OPTIONS: {
	value: IncidentOfferStatus | "";
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
		value: "ACCEPTED",
		label: "Aceptadas",
	},
	{
		value: "REJECTED",
		label: "Rechazadas",
	},
	{
		value: "EXPIRED",
		label: "Expiradas",
	},
	{
		value: "CANCELLED",
		label: "Canceladas",
	},
];

export const INCIDENT_OFFER_STATUS_CONFIG: Record<
	IncidentOfferStatus,
	StatusConfig<IncidentOfferStatus>
> = {
	PENDING: {
		value: "PENDING",
		label: "Pendiente",
		description: "La oferta está esperando respuesta del taller.",
		tone: "warning",
		order: 1,
	},
	ACCEPTED: {
		value: "ACCEPTED",
		label: "Aceptada",
		description: "El taller aceptó atender el incidente.",
		tone: "success",
		order: 2,
	},
	REJECTED: {
		value: "REJECTED",
		label: "Rechazada",
		description: "El taller rechazó atender el incidente.",
		tone: "destructive",
		order: 3,
	},
	EXPIRED: {
		value: "EXPIRED",
		label: "Expirada",
		description: "La oferta expiró sin respuesta.",
		tone: "muted",
		order: 4,
	},
	CANCELLED: {
		value: "CANCELLED",
		label: "Cancelada",
		description: "La oferta fue cancelada.",
		tone: "muted",
		order: 5,
	},
};

export function createEmptyIncidentOfferPagination(): IncidentOfferPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getIncidentOfferStatusConfig(
	status: IncidentOfferStatus | "" | null | undefined
) {
	return INCIDENT_OFFER_STATUS_CONFIG[status || "PENDING"];
}

export function getIncidentOfferStatusLabel(
	status: IncidentOfferStatus | "" | null | undefined
): string {
	return getIncidentOfferStatusConfig(status).label;
}

export function getIncidentOfferOperationalText(
	item: IncidentOfferEntry
): string {
	if ("offer_status" in item) {
		return getIncidentOfferStatusConfig(item.offer_status).description ?? "";
	}

	return getIncidentOfferStatusConfig(item.offer.offer_status).description ?? "";
}

export function isIncidentOfferPending(item: IncidentOfferEntry): boolean {
	if ("offer_status" in item) {
		return item.offer_status === "PENDING";
	}

	return item.offer.offer_status === "PENDING";
}

export function isIncidentOfferFinal(status: IncidentOfferStatus): boolean {
	return status !== "PENDING";
}

export function formatIncidentOfferDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function formatIncidentOfferExpiration(
	item: IncidentOfferEntry
): string {
	const expiresAtValue = "offer_status" in item
		? item.expires_at
		: item.offer.expires_at;

	if (!expiresAtValue) {
		return "Sin vencimiento";
	}

	const expiresAt = new Date(expiresAtValue);

	if (Number.isNaN(expiresAt.getTime())) {
		return "Vencimiento inválido";
	}

	const now = new Date();

	if (getIncidentOfferStatusFromEntry(item) === "PENDING" && expiresAt < now) {
		return `Venció: ${formatIncidentOfferDate(expiresAtValue)}`;
	}

	return formatIncidentOfferDate(expiresAtValue);
}

export function isIncidentOfferExpiredLocally(
	item: IncidentOfferEntry
): boolean {
	const expiresAtValue = "expires_at" in item ? item.expires_at : item.offer?.expires_at;

	if (getIncidentOfferStatusFromEntry(item) !== "PENDING" || !expiresAtValue) {
		return false;
	}

	const expiresAt = new Date(expiresAtValue);

	if (Number.isNaN(expiresAt.getTime())) {
		return false;
	}

	return expiresAt < new Date();
}

export function getIncidentOfferIncidentCode(item: IncidentOfferEntry): string {
	if ("incident_code" in item) {
		return item.incident_code || item.incident_id || "Sin incidente";
	}

	return item.incident.incident_code || item.incident.id || "Sin incidente";
}

export function getIncidentOfferDescription(item: IncidentOfferEntry): string {
	if ("incident_title" in item) {
		return item.incident_title || "Sin descripción registrada";
	}

	return item.incident.description || "Sin descripción registrada";
}

export function getIncidentOfferLocation(item: IncidentOfferEntry): string {
	if ("address_text" in item) {
		return item.address_text || "Sin dirección registrada";
	}

	return item.incident.address_text || "Sin dirección registrada";
}

export function getIncidentOfferServiceName(item: IncidentOfferEntry): string {
	if ("service_name" in item) {
		return item.service_name || "Servicio no definido";
	}

	return item.service?.service_name || "Servicio no definido";
}

export function getIncidentOfferServiceCategory(
	item: IncidentOfferEntry
): string {
	if ("service_code" in item) {
		return "Sin categoría";
	}

	return item.service?.category || "Sin categoría";
}

export function getIncidentOfferVehicleLabel(item: IncidentOfferEntry): string {
	if ("vehicle_label" in item) {
		return item.vehicle_label || "Sin vehículo registrado";
	}

	const vehicle = item.vehicle;

	if (!vehicle) {
		return "Sin vehículo registrado";
	}

	return vehicle.label || vehicle.plate_number || "Sin vehículo registrado";
}

export function getIncidentOfferAiSummary(
	item: IncidentOfferDetail
): string {
	if (!item.ai_analysis) {
		return "Sin análisis IA registrado";
	}

	const parts = [
		item.ai_analysis.probable_service_code,
		item.ai_analysis.probable_problem,
		item.ai_analysis.recommended_priority,
	].filter(Boolean);

	return parts.length ? parts.join(" · ") : "Análisis IA sin resumen";
}

export function formatIncidentOfferResponseTime(
	item: IncidentOfferEntry
): string {
	let sentAtValue: string | null;
	let respondedAtValue: string | null;

	if ("offer_status" in item) {
		sentAtValue = item.created_at;
		respondedAtValue = item.responded_at;
	} else {
		sentAtValue = item.offer.sent_at;
		respondedAtValue = item.offer.responded_at;
	}

	if (!sentAtValue || !respondedAtValue) {
		return "Sin respuesta";
	}

	const sentAt = new Date(sentAtValue);
	const respondedAt = new Date(respondedAtValue);

	if (Number.isNaN(sentAt.getTime()) || Number.isNaN(respondedAt.getTime())) {
		return "Tiempo inválido";
	}

	const minutes = Math.max(
		0,
		Math.round((respondedAt.getTime() - sentAt.getTime()) / 60000)
	);

	return `${minutes} min`;
}

export function getIncidentOfferCreatedAtLabel(item: IncidentOfferEntry): string {
	if ("offer_status" in item) {
		return formatIncidentOfferDate(item.created_at);
	}

	return formatIncidentOfferDate(item.offer.created_at);
}

export function getIncidentOfferStatusFromEntry(
	item: IncidentOfferEntry
): IncidentOfferStatus {
	if ("offer_status" in item) {
		return item.offer_status;
	}

	return item.offer.offer_status;
}

export function getIncidentOfferSentAtLabel(item: IncidentOfferEntry): string {
	if ("offer_status" in item) {
		return formatIncidentOfferDate(item.created_at);
	}

	return formatIncidentOfferDate(item.offer.sent_at);
}

export function getIncidentOfferRespondedAtLabel(
	item: IncidentOfferEntry
): string {
	if ("offer_status" in item) {
		return formatIncidentOfferDate(item.responded_at);
	}

	return formatIncidentOfferDate(item.offer.responded_at);
}

export function getIncidentOfferId(item: IncidentOfferEntry | null): string | null {
	if (!item) {
		return null;
	}

	if ("offer_status" in item) {
		return item.id;
	}

	return item.offer.id;
}

export function toIncidentOfferListItem(
	item: IncidentOfferEntry
): IncidentOfferListItem {
	if ("offer_status" in item) {
		return item;
	}

	return buildIncidentOfferListItemFromDetail(item);
}

function buildIncidentOfferListItemFromDetail(
	item: IncidentOfferDetail
): IncidentOfferListItem {
	return {
		...buildIncidentOfferBaseListItem(item),
		...buildIncidentOfferEstimatesListItem(item.ai_analysis),
	};
}

function buildIncidentOfferBaseListItem(
	item: IncidentOfferDetail
): Omit<
	IncidentOfferListItem,
	"estimated_min_price" | "estimated_max_price" | "estimated_min_duration_minutes" | "estimated_max_duration_minutes"
> {
	return {
		id: item.offer.id,
		offer_status: item.offer.offer_status,
		expires_at: item.offer.expires_at,
		responded_at: item.offer.responded_at,
		created_at: item.offer.created_at,
		incident_id: item.incident.id,
		incident_code: item.incident.incident_code,
		incident_title: item.incident.title ?? "Sin título registrado",
		incident_priority: item.incident.priority ?? "Sin prioridad",
		incident_status: item.incident.status,
		service_name: item.service?.service_name ?? null,
		service_code: item.service?.service_code ?? null,
		vehicle_label: item.vehicle?.label ?? null,
		address_text: item.incident.address_text,
	};
}

function buildIncidentOfferEstimatesListItem(
	aiAnalysis: IncidentOfferAiAnalysisSummary | null
): Pick<
	IncidentOfferListItem,
	"estimated_min_price" | "estimated_max_price" | "estimated_min_duration_minutes" | "estimated_max_duration_minutes"
> {
	return {
		estimated_min_price: aiAnalysis?.estimated_min_price ?? null,
		estimated_max_price: aiAnalysis?.estimated_max_price ?? null,
		estimated_min_duration_minutes:
			aiAnalysis?.estimated_min_duration_minutes ?? null,
		estimated_max_duration_minutes:
			aiAnalysis?.estimated_max_duration_minutes ?? null,
	};
}
