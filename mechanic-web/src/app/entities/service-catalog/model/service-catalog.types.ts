import { ListQuery } from "../../../shared/api";
import { StatusConfig } from "../../../shared/types";

export type ServiceCatalogStatus = "ACTIVE" | "INACTIVE";

export interface ServiceCatalog {
	id: string;
	service_code: string;
	service_name: string;
	description: string | null;
	category: string;
	min_price: number | string | null;
	max_price: number | string | null;
	min_duration_minutes: number | null;
	max_duration_minutes: number | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface ServiceCatalogPagination {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
}

export interface ServiceCatalogListData {
	items: ServiceCatalog[];
	pagination: ServiceCatalogPagination;
}

export type ServiceCatalogListQuery = ListQuery & {
	page?: number;
	page_size?: number;
	search?: string;
	category?: string;
	is_active?: boolean | null;
};

export interface CreateServiceCatalogPayload {
	service_code: string;
	service_name: string;
	description?: string | null;
	category: string;
	min_price?: number | null;
	max_price?: number | null;
	min_duration_minutes?: number | null;
	max_duration_minutes?: number | null;
	is_active: boolean;
}

export interface UpdateServiceCatalogPayload {
	service_name?: string;
	description?: string | null;
	category?: string;
	min_price?: number | null;
	max_price?: number | null;
	min_duration_minutes?: number | null;
	max_duration_minutes?: number | null;
	is_active?: boolean;
}

export interface ChangeServiceCatalogStatusPayload {
	is_active: boolean;
}

export const SERVICE_CATALOG_STATUS_OPTIONS: Array<{
	value: ServiceCatalogStatus | "";
	label: string;
}> = [
	{
		value: "",
		label: "Todos",
	},
	{
		value: "ACTIVE",
		label: "Activos",
	},
	{
		value: "INACTIVE",
		label: "Inactivos",
	},
];

export const SERVICE_CATALOG_STATUS_CONFIG: Record<
	ServiceCatalogStatus,
	StatusConfig<ServiceCatalogStatus>
> = {
	ACTIVE: {
		value: "ACTIVE",
		label: "Activo",
		description: "Servicio disponible para ser usado.",
		tone: "success",
		order: 1,
	},
	INACTIVE: {
		value: "INACTIVE",
		label: "Inactivo",
		description: "Servicio oculto o deshabilitado.",
		tone: "muted",
		order: 2,
	},
};

export function createEmptyServiceCatalogPagination(): ServiceCatalogPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
	};
}

export function getServiceCatalogStatus(
	item: ServiceCatalog
): ServiceCatalogStatus {
	return item.is_active ? "ACTIVE" : "INACTIVE";
}

export function getServiceCatalogStatusConfig(status: ServiceCatalogStatus) {
	return SERVICE_CATALOG_STATUS_CONFIG[status];
}

export function getServiceCatalogOperationalText(item: ServiceCatalog): string {
	return item.is_active
		? "Disponible para talleres y clientes."
		: "Oculto o deshabilitado temporalmente.";
}

export function formatServiceCatalogPriceRange(item: ServiceCatalog): string {
	const min = toNumberOrNull(item.min_price);
	const max = toNumberOrNull(item.max_price);

	if (min === null && max === null) {
		return "Sin precio definido";
	}

	if (min !== null && max !== null) {
		return `${formatMoney(min)} - ${formatMoney(max)}`;
	}

	if (min !== null) {
		return `Desde ${formatMoney(min)}`;
	}

	return `Hasta ${formatMoney(max!)}`;
}

export function formatServiceCatalogDurationRange(
	item: ServiceCatalog
): string {
	const min = item.min_duration_minutes;
	const max = item.max_duration_minutes;

	if (min === null && max === null) {
		return "Sin duración definida";
	}

	if (min !== null && max !== null) {
		return `${min} - ${max} min`;
	}

	if (min !== null) {
		return `Desde ${min} min`;
	}

	return `Hasta ${max} min`;
}

export function toNumberOrNull(
	value: number | string | null | undefined
): number | null {
	if (value === null || value === undefined || value === "") {
		return null;
	}

	const parsed = Number(value);

	return Number.isNaN(parsed) ? null : parsed;
}

export function formatMoney(value: number): string {
	return new Intl.NumberFormat("es-BO", {
		style: "currency",
		currency: "BOB",
		maximumFractionDigits: 2,
	}).format(value);
}

export function formatServiceCatalogDate(value: string | null): string {
	if (!value) {
		return "Sin registro";
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}

export function getUniqueServiceCatalogCategories(
	items: ServiceCatalog[]
): string[] {
	const categories = new Set<string>();

	for (const item of items) {
		if (item.category.trim()) {
			categories.add(item.category.trim());
		}
	}

	return Array.from(categories).sort((a, b) => a.localeCompare(b));
}
