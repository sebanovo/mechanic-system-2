import { ListQuery } from "../../../shared/api";
import { StatusConfig } from "../../../shared/types";
import { IncidentPriority } from "../../incident/model";

export type IncidentAiAnalysisPriority = IncidentPriority;

export type IncidentAiAnalysis = {
	id: string;
	incident_id: string;
	analysis_version: string;
	probable_service_code: string | null;
	probable_problem: string | null;
	confidence_score: number | null;
	estimated_min_price: number | string | null;
	estimated_max_price: number | string | null;
	estimated_min_duration_minutes: number | null;
	estimated_max_duration_minutes: number | null;
	recommended_priority: IncidentAiAnalysisPriority | null;
	analysis_result: Record<string, unknown> | null;
	created_at: string;
	updated_at: string;
};

export type IncidentAiAnalysisPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type IncidentAiAnalysisListData = {
	items: IncidentAiAnalysis[];
	pagination: IncidentAiAnalysisPagination;
};

export type IncidentAiAnalysisListQuery = ListQuery<{
	incident_id?: string;
	analysis_version?: string;
	probable_service_code?: string;
	recommended_priority?: IncidentAiAnalysisPriority | "";
}>;

export type IncidentAiAnalysisCreatePayload = {
	analysis_version: string;
	probable_service_code?: string | null;
	probable_problem?: string | null;
	confidence_score?: number | null;
	estimated_min_price?: number | null;
	estimated_max_price?: number | null;
	estimated_min_duration_minutes?: number | null;
	estimated_max_duration_minutes?: number | null;
	recommended_priority?: IncidentAiAnalysisPriority | null;
	analysis_result?: Record<string, unknown> | null;
};

export const INCIDENT_AI_ANALYSIS_PRIORITY_OPTIONS: {
	value: IncidentAiAnalysisPriority | "";
	label: string;
}[] = [
	{ value: "", label: "Todas las prioridades" },
	{ value: "LOW", label: "Baja" },
	{ value: "MEDIUM", label: "Media" },
	{ value: "HIGH", label: "Alta" },
	{ value: "CRITICAL", label: "Crítica" },
];

export const INCIDENT_AI_ANALYSIS_PRIORITY_CONFIG: Record<
	IncidentAiAnalysisPriority,
	StatusConfig<IncidentAiAnalysisPriority>
> = {
	LOW: {
		value: "LOW",
		label: "Baja",
		description: "La IA considera que el incidente es de prioridad baja.",
		tone: "muted",
		order: 1,
	},
	MEDIUM: {
		value: "MEDIUM",
		label: "Media",
		description: "La IA considera que el incidente es de prioridad media.",
		tone: "info",
		order: 2,
	},
	HIGH: {
		value: "HIGH",
		label: "Alta",
		description: "La IA considera que el incidente es de prioridad alta.",
		tone: "warning",
		order: 3,
	},
	CRITICAL: {
		value: "CRITICAL",
		label: "Crítica",
		description: "La IA considera que el incidente es crítico.",
		tone: "destructive",
		order: 4,
	},
};

export function createEmptyIncidentAiAnalysisPagination(): IncidentAiAnalysisPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getIncidentAiAnalysisPriorityConfig(
	priority: IncidentAiAnalysisPriority | string | null
): StatusConfig<IncidentAiAnalysisPriority> | undefined {
	if (!priority) {
		return undefined;
	}

	return INCIDENT_AI_ANALYSIS_PRIORITY_CONFIG[priority as IncidentAiAnalysisPriority];
}

export function getIncidentAiAnalysisPriorityLabel(
	priority: IncidentAiAnalysisPriority | string | null
): string {
	if (!priority) {
		return "Sin prioridad";
	}

	return getIncidentAiAnalysisPriorityConfig(priority)?.label ?? priority;
}

export function formatIncidentAiAnalysisDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

export function formatIncidentAiAnalysisScore(value: number | null): string {
	if (value === null || value === undefined) {
		return "Sin score";
	}

	return `${value}%`;
}

export function formatIncidentAiAnalysisResult(
	value: Record<string, unknown> | null
): string {
	if (!value) {
		return "Sin resultado";
	}

	return JSON.stringify(value, null, 2);
}
