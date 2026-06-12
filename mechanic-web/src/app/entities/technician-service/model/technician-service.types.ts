import { ProviderServiceDetail } from "../../../entities/provider-service/model";
import { TechnicianRecord } from "../../../entities/technician/model";
import { StatusConfig } from "../../../shared/types";

export type TechnicianSkillLevel =
	| "BASIC"
	| "INTERMEDIATE"
	| "ADVANCED"
	| "EXPERT";

export type TechnicianServiceStatus = "ENABLED" | "DISABLED";

export type TechnicianServiceEnabledFilter = "" | "ENABLED" | "DISABLED";

export type TechnicianService = {
	id: string;
	technician_id: string;
	provider_service_id: string;
	skill_level: TechnicianSkillLevel;
	is_enabled: boolean;
	created_at: string;
	updated_at: string;
};

export type TechnicianServiceDetail = {
	technician_service: TechnicianService;
	technician: TechnicianRecord;
	provider_service: ProviderServiceDetail;
};

export type TechnicianServicePagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type TechnicianServiceListData = {
	items: TechnicianServiceDetail[];
	pagination: TechnicianServicePagination;
};

export type TechnicianServiceListQuery = {
	page?: number;
	page_size?: number;
	service_catalog_id?: string;
	is_enabled?: boolean | null;
};

export type CreateTechnicianServicePayload = {
	technician_id: string;
	provider_service_id: string;
	skill_level?: TechnicianSkillLevel | null;
};

export type UpdateTechnicianServicePayload = {
	skill_level?: TechnicianSkillLevel | null;
	is_enabled?: boolean | null;
};

export type ChangeTechnicianServiceStatusPayload = {
	is_enabled: boolean;
};

export const TECHNICIAN_SERVICE_STATUS_OPTIONS: {
	value: TechnicianServiceEnabledFilter;
	label: string;
}[] = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "ENABLED",
		label: "Habilitados",
	},
	{
		value: "DISABLED",
		label: "Deshabilitados",
	},
];

export const TECHNICIAN_SKILL_LEVEL_OPTIONS: {
	value: TechnicianSkillLevel;
	label: string;
}[] = [
	{
		value: "BASIC",
		label: "Básico",
	},
	{
		value: "INTERMEDIATE",
		label: "Intermedio",
	},
	{
		value: "ADVANCED",
		label: "Avanzado",
	},
	{
		value: "EXPERT",
		label: "Experto",
	},
];

export const TECHNICIAN_SERVICE_STATUS_CONFIG: Record<
	TechnicianServiceStatus,
	StatusConfig<TechnicianServiceStatus>
> = {
	ENABLED: {
		value: "ENABLED",
		label: "Habilitado",
		description: "El técnico puede atender este servicio.",
		tone: "success",
		order: 1,
	},
	DISABLED: {
		value: "DISABLED",
		label: "Deshabilitado",
		description: "El técnico no puede atender este servicio.",
		tone: "muted",
		order: 2,
	},
};

export const TECHNICIAN_SKILL_LEVEL_CONFIG: Record<
	TechnicianSkillLevel,
	StatusConfig<TechnicianSkillLevel>
> = {
	BASIC: {
		value: "BASIC",
		label: "Básico",
		description: "Puede atender servicios simples.",
		tone: "muted",
		order: 1,
	},
	INTERMEDIATE: {
		value: "INTERMEDIATE",
		label: "Intermedio",
		description: "Tiene experiencia operativa estándar.",
		tone: "info",
		order: 2,
	},
	ADVANCED: {
		value: "ADVANCED",
		label: "Avanzado",
		description: "Puede atender servicios más complejos.",
		tone: "warning",
		order: 3,
	},
	EXPERT: {
		value: "EXPERT",
		label: "Experto",
		description: "Especialista para este servicio.",
		tone: "success",
		order: 4,
	},
};

export function createEmptyTechnicianServicePagination(): TechnicianServicePagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getTechnicianServiceStatus(
	item: TechnicianServiceDetail
): TechnicianServiceStatus {
	return item.technician_service.is_enabled ? "ENABLED" : "DISABLED";
}

export function getTechnicianServiceStatusConfig(
	status: TechnicianServiceStatus
) {
	return TECHNICIAN_SERVICE_STATUS_CONFIG[status];
}

export function getTechnicianSkillLevelConfig(level: TechnicianSkillLevel) {
	return TECHNICIAN_SKILL_LEVEL_CONFIG[level];
}

export function technicianServiceEnabledFilterToBoolean(
	filter: TechnicianServiceEnabledFilter
): boolean | null {
	if (filter === "ENABLED") {
		return true;
	}

	if (filter === "DISABLED") {
		return false;
	}

	return null;
}

export function getTechnicianServiceOperationalText(
	item: TechnicianServiceDetail
): string {
	const status = getTechnicianServiceStatus(item);

	return TECHNICIAN_SERVICE_STATUS_CONFIG[status].description ?? "";
}

export function getTechnicianServiceSkillText(
	item: TechnicianServiceDetail
): string {
	const config =
		TECHNICIAN_SKILL_LEVEL_CONFIG[item.technician_service.skill_level];

	return config.description ?? "";
}

export function getTechnicianServiceTechnicianLabel(
	item: TechnicianServiceDetail
): string {
	return item.technician.technician_code;
}

export function getTechnicianServiceName(
	item: TechnicianServiceDetail
): string {
	return item.provider_service.service_catalog.service_name;
}

export function getTechnicianServiceCode(
	item: TechnicianServiceDetail
): string {
	return item.provider_service.service_catalog.service_code;
}

export function getTechnicianServiceCategory(
	item: TechnicianServiceDetail
): string {
	return item.provider_service.service_catalog.category;
}

export function formatTechnicianServiceDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getUniqueTechnicianServiceCatalogOptions(
	items: TechnicianServiceDetail[]
): {
	id: string;
	label: string;
	category: string;
}[] {
	const map = new Map<
		string,
		{
			id: string;
			label: string;
			category: string;
		}
	>();

	for (const item of items) {
		const serviceCatalog = item.provider_service.service_catalog;

		map.set(serviceCatalog.id, {
			id: serviceCatalog.id,
			label: serviceCatalog.service_name,
			category: serviceCatalog.category,
		});
	}

	return Array.from(map.values()).sort((a, b) =>
		a.label.localeCompare(b.label)
	);
}
