import {
	formatMoney,
	formatServiceCatalogDurationRange,
	formatServiceCatalogPriceRange,
	ServiceCatalog,
	toNumberOrNull,
} from "../../../entities/service-catalog/model";
import { StatusConfig } from "../../../shared/types";

export type ProviderServiceStatus = "AVAILABLE" | "UNAVAILABLE";

export type ProviderServiceAvailabilityFilter =
	| ""
	| "AVAILABLE"
	| "UNAVAILABLE";

export type ProviderService = {
	id: string;
	provider_profile_id: string;
	service_catalog_id: string;
	is_available: boolean;
	custom_min_price: number | string | null;
	custom_max_price: number | string | null;
	created_at: string;
	updated_at: string;
};

export type ProviderServiceDetail = {
	provider_service: ProviderService;
	service_catalog: ServiceCatalog;
};

export type ProviderServicePagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type ProviderServiceListData = {
	items: ProviderServiceDetail[];
	pagination: ProviderServicePagination;
};

export type ProviderServiceListQuery = {
	page?: number;
	page_size?: number;
	search?: string;
	category?: string;
	is_available?: boolean | null;
};

export type CreateProviderServicePayload = {
	service_catalog_id: string;
	custom_min_price?: number | null;
	custom_max_price?: number | null;
};

export type UpdateProviderServicePayload = {
	is_available?: boolean | null;
	custom_min_price?: number | null;
	custom_max_price?: number | null;
};

export type ChangeProviderServiceStatusPayload = {
	is_available: boolean;
};

export const PROVIDER_SERVICE_STATUS_OPTIONS: {
	value: ProviderServiceAvailabilityFilter;
	label: string;
}[] = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "AVAILABLE",
		label: "Disponibles",
	},
	{
		value: "UNAVAILABLE",
		label: "No disponibles",
	},
];

export const PROVIDER_SERVICE_STATUS_CONFIG: Record<
	ProviderServiceStatus,
	StatusConfig<ProviderServiceStatus>
> = {
	AVAILABLE: {
		value: "AVAILABLE",
		label: "Disponible",
		description: "El taller puede ofrecer este servicio.",
		tone: "success",
		order: 1,
	},
	UNAVAILABLE: {
		value: "UNAVAILABLE",
		label: "No disponible",
		description: "El servicio está deshabilitado para el taller.",
		tone: "muted",
		order: 2,
	},
};

export function createEmptyProviderServicePagination(): ProviderServicePagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function getProviderServiceStatus(
	item: ProviderServiceDetail
): ProviderServiceStatus {
	return item.provider_service.is_available ? "AVAILABLE" : "UNAVAILABLE";
}

export function getProviderServiceStatusConfig(status: ProviderServiceStatus) {
	return PROVIDER_SERVICE_STATUS_CONFIG[status];
}

export function providerServiceFilterToBoolean(
	filter: ProviderServiceAvailabilityFilter
): boolean | null {
	if (filter === "AVAILABLE") {
		return true;
	}

	if (filter === "UNAVAILABLE") {
		return false;
	}

	return null;
}

export function getProviderServiceOperationalText(
	item: ProviderServiceDetail
): string {
	const status = getProviderServiceStatus(item);

	return PROVIDER_SERVICE_STATUS_CONFIG[status].description ?? "";
}

export function formatProviderServiceCustomPriceRange(
	item: ProviderServiceDetail
): string {
	const min = toNumberOrNull(item.provider_service.custom_min_price);
	const max = toNumberOrNull(item.provider_service.custom_max_price);

	if (min === null && max === null) {
		return "Usa precio del catálogo";
	}

	if (min !== null && max !== null) {
		return `${formatMoney(min)} - ${formatMoney(max)}`;
	}

	if (min !== null) {
		return `Desde ${formatMoney(min)}`;
	}

	return `Hasta ${formatMoney(max!)}`;
}

export function formatProviderServiceEffectivePriceRange(
	item: ProviderServiceDetail
): string {
	const customMin = toNumberOrNull(item.provider_service.custom_min_price);
	const customMax = toNumberOrNull(item.provider_service.custom_max_price);

	if (customMin !== null || customMax !== null) {
		return formatProviderServiceCustomPriceRange(item);
	}

	return formatServiceCatalogPriceRange(item.service_catalog);
}

export function formatProviderServiceCatalogPriceRange(
	item: ProviderServiceDetail
): string {
	return formatServiceCatalogPriceRange(item.service_catalog);
}

export function formatProviderServiceDurationRange(
	item: ProviderServiceDetail
): string {
	return formatServiceCatalogDurationRange(item.service_catalog);
}

export function formatProviderServiceDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getUniqueProviderServiceCategories(
	items: ProviderServiceDetail[]
): string[] {
	const categories = new Set<string>();

	for (const item of items) {
		if (item.service_catalog.category.trim()) {
			categories.add(item.service_catalog.category.trim());
		}
	}

	return Array.from(categories).sort((a, b) => a.localeCompare(b));
}
