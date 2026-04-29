import {
	CatalogService,
	CatalogServiceDto,
	CreateCatalogServiceFormValue,
	CreateCatalogServiceRequest,
	UpdateCatalogServiceFormValue,
	UpdateCatalogServiceRequest,
} from "../models/catalog-service.types";

export function toCatalogService(dto: CatalogServiceDto): CatalogService {
	return {
		id: dto.id,
		code: dto.code,
		category: dto.category,
		title: dto.title,
		description: dto.description,
		supportsMobileService: dto.supports_mobile_service,
		supportsEmergencyService: dto.supports_emergency_service,
		isActive: dto.is_active,
		sortOrder: dto.sort_order,
		createdAt: formatDate(dto.created_at),
		updatedAt: formatDate(dto.updated_at),
	};
}

export function toCatalogServices(dtos: CatalogServiceDto[]): CatalogService[] {
	return dtos.map(toCatalogService);
}

export function toCreateCatalogServiceRequest(
	formValue: CreateCatalogServiceFormValue
): CreateCatalogServiceRequest {
	return {
		code: normalizeCode(formValue.code),
		category: normalizeCode(formValue.category),
		title: formValue.title.trim(),
		description: cleanOptional(formValue.description),
		supports_mobile_service: formValue.supportsMobileService,
		supports_emergency_service: formValue.supportsEmergencyService,
		is_active: formValue.isActive,
		sort_order: Number(formValue.sortOrder),
	};
}

export function toUpdateCatalogServiceRequest(
	formValue: UpdateCatalogServiceFormValue
): UpdateCatalogServiceRequest {
	return {
		category: normalizeCode(formValue.category),
		title: formValue.title.trim(),
		description: cleanOptional(formValue.description),
		supports_mobile_service: formValue.supportsMobileService,
		supports_emergency_service: formValue.supportsEmergencyService,
		is_active: formValue.isActive,
		sort_order: Number(formValue.sortOrder),
	};
}

function normalizeCode(value: string): string {
	return value.trim().toUpperCase().replace(/\s+/g, "_");
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
}

function formatDate(value: string): string {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return date.toLocaleDateString("es-BO", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}
