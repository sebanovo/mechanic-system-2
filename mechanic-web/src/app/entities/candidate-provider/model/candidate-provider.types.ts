import { Incident } from "../../../entities/incident/model";
import { ProviderProfile } from "../../../entities/provider/model";
import { StatusConfig } from "../../../shared/types";

export type CandidateProviderStatus =
	| "REQUESTED"
	| "SUGGESTED"
	| "SELECTED"
	| "DISCARDED"
	| "EXPIRED";

export type CandidateProvider = {
	id: string;
	incident_id: string;
	provider_profile_id: string;
	distance_km: number | string | null;
	estimated_arrival_minutes: number | null;
	rating_score: number | string | null;
	capacity_score: number | string | null;
	response_score: number | string | null;
	match_score: number | string | null;
	candidate_status: CandidateProviderStatus;
	created_at: string;
	updated_at: string;
};

export type CandidateProviderDetail = {
	candidate: CandidateProvider;
	incident: Incident;
	provider_profile: ProviderProfile;
};

export type CandidateProviderPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type CandidateProviderListData = {
	items: CandidateProviderDetail[];
	pagination: CandidateProviderPagination;
};

export type CandidateProviderListQuery = {
	page?: number;
	page_size?: number;
	candidate_status?: CandidateProviderStatus | "";
};

export type ChangeCandidateProviderStatusPayload = {
	candidate_status: CandidateProviderStatus;
};

export const CANDIDATE_PROVIDER_STATUS_OPTIONS: {
	value: CandidateProviderStatus | "";
	label: string;
}[] = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "REQUESTED",
		label: "Solicitados",
	},
	{
		value: "SUGGESTED",
		label: "Sugeridos",
	},
	{
		value: "SELECTED",
		label: "Seleccionados",
	},
	{
		value: "DISCARDED",
		label: "Descartados",
	},
	{
		value: "EXPIRED",
		label: "Expirados",
	},
];

export const CANDIDATE_PROVIDER_STATUS_CONFIG: Record<
	CandidateProviderStatus,
	StatusConfig<CandidateProviderStatus>
> = {
	REQUESTED: {
		value: "REQUESTED",
		label: "Solicitado",
		description: "El taller fue solicitado como posible proveedor.",
		tone: "warning",
		order: 1,
	},
	SUGGESTED: {
		value: "SUGGESTED",
		label: "Sugerido",
		description: "El taller fue sugerido por el dispatch.",
		tone: "info",
		order: 2,
	},
	SELECTED: {
		value: "SELECTED",
		label: "Seleccionado",
		description: "El taller quedó seleccionado como candidato.",
		tone: "success",
		order: 3,
	},
	DISCARDED: {
		value: "DISCARDED",
		label: "Descartado",
		description: "El taller fue descartado para este incidente.",
		tone: "muted",
		order: 4,
	},
	EXPIRED: {
		value: "EXPIRED",
		label: "Expirado",
		description: "La candidatura expiró.",
		tone: "destructive",
		order: 5,
	},
};

export function createEmptyCandidateProviderPagination(): CandidateProviderPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getCandidateProviderStatusConfig(
	status: CandidateProviderStatus
) {
	return CANDIDATE_PROVIDER_STATUS_CONFIG[status];
}

export function getCandidateProviderOperationalText(
	item: CandidateProviderDetail
): string {
	return (
		CANDIDATE_PROVIDER_STATUS_CONFIG[item.candidate.candidate_status]
			.description ?? ""
	);
}

export function formatCandidateProviderDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function formatCandidateScore(value: number | string | null): string {
	if (value === null || value === undefined || value === "") {
		return "Sin score";
	}

	const parsed = Number(value);

	if (Number.isNaN(parsed)) {
		return String(value);
	}

	return parsed.toFixed(2);
}

export function formatCandidateDistance(value: number | string | null): string {
	if (value === null || value === undefined || value === "") {
		return "Sin distancia";
	}

	const parsed = Number(value);

	if (Number.isNaN(parsed)) {
		return String(value);
	}

	return `${parsed.toFixed(2)} km`;
}

export function formatCandidateEta(value: number | null): string {
	if (value === null || value === undefined) {
		return "Sin ETA";
	}

	return `${value} min`;
}

export function getCandidateIncidentCode(
	item: CandidateProviderDetail
): string {
	return item.incident.incident_code || item.incident.id;
}

export function getCandidateIncidentDescription(
	item: CandidateProviderDetail
): string {
	return item.incident.description || "Sin descripción registrada";
}

export function getCandidateProviderStatusLabel(
	status: CandidateProviderStatus
): string {
	return CANDIDATE_PROVIDER_STATUS_CONFIG[status].label;
}

export function isCandidateFinalStatus(
	status: CandidateProviderStatus
): boolean {
	return status === "DISCARDED" || status === "EXPIRED";
}
