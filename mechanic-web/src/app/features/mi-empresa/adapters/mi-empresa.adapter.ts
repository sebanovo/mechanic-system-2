import {
	MiEmpresa,
	MiEmpresaActiveService,
	MiEmpresaActiveServiceDto,
	MiEmpresaDto,
	MiEmpresaOwnerUser,
	MiEmpresaOwnerUserDto,
	UpdateMiEmpresaFormValue,
	UpdateMiEmpresaRequest,
} from "../models/mi-empresa.types";

export function toMiEmpresaOwnerUser(
	dto: MiEmpresaOwnerUserDto
): MiEmpresaOwnerUser {
	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
		isActive: dto.is_active,
	};
}

export function toMiEmpresaActiveService(
	dto: MiEmpresaActiveServiceDto
): MiEmpresaActiveService {
	return {
		id: dto.id,
		serviceCatalogItemId: dto.service_catalog_item_id,
		code: dto.code,
		category: dto.category,
		title: dto.title,
		priceEstimateMin: dto.price_estimate_min,
		priceEstimateMax: dto.price_estimate_max,
		estimatedDurationMinutes: dto.estimated_duration_minutes,
		isMobileServiceEnabled: dto.is_mobile_service_enabled,
		isEmergencyServiceEnabled: dto.is_emergency_service_enabled,
		isActive: dto.is_active,
	};
}

export function toMiEmpresa(dto: MiEmpresaDto): MiEmpresa {
	return {
		id: dto.id,
		ownerUserId: dto.owner_user_id,
		providerType: dto.provider_type,
		businessName: dto.business_name,
		legalName: dto.legal_name ?? "",
		description: dto.description,
		contactEmail: dto.contact_email ?? "",
		contactPhone: dto.contact_phone,
		city: dto.city ?? "",
		address: dto.address ?? "",
		baseLatitude: dto.base_latitude ?? 0,
		baseLongitude: dto.base_longitude ?? 0,
		isActive: dto.is_active,
		isAvailable: dto.is_available,
		maxConcurrentServices: dto.max_concurrent_services,
		currentActiveServices: dto.current_active_services,
		availableCapacity: dto.available_capacity,
		averageRating: dto.average_rating,
		ownerUser: toMiEmpresaOwnerUser(dto.owner_user),
		techniciansCount: dto.technicians_count,
		availableTechniciansCount: dto.available_technicians_count,
		configuredServicesCount: dto.configured_services_count,
		activeServicesCount: dto.active_services_count,
		activeServices: (dto.active_services ?? []).map(toMiEmpresaActiveService),
		createdAt: formatDate(dto.created_at),
		updatedAt: formatDate(dto.updated_at),
	};
}

export function toUpdateMiEmpresaRequest(
	formValue: UpdateMiEmpresaFormValue
): UpdateMiEmpresaRequest {
	return {
		business_name: formValue.businessName.trim(),
		legal_name: cleanOptional(formValue.legalName),
		description: cleanOptional(formValue.description),
		contact_email: cleanOptional(formValue.contactEmail),
		contact_phone: cleanOptional(formValue.contactPhone),
		city: cleanOptional(formValue.city),
		address: cleanOptional(formValue.address),
		base_latitude: Number.isFinite(formValue.baseLatitude)
			? formValue.baseLatitude
			: null,
		base_longitude: Number.isFinite(formValue.baseLongitude)
			? formValue.baseLongitude
			: null,
		is_available: formValue.isAvailable,
		max_concurrent_services: Math.max(1, formValue.maxConcurrentServices),
	};
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
