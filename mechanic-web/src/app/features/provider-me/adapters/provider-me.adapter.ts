import {
	CreateProviderMeTechnicianFormValue,
	CreateProviderMeTechnicianRequest,
	ProviderMe,
	ProviderMeActiveService,
	ProviderMeActiveServiceDto,
	ProviderMeDto,
	ProviderMeOwnerUser,
	ProviderMeOwnerUserDto,
	ProviderMeTechnician,
	ProviderMeTechnicianDto,
	UpdateProviderMeProfileFormValue,
	UpdateProviderMeProfileRequest,
	UpdateProviderMeTechnicianFormValue,
	UpdateProviderMeTechnicianRequest,
} from "../models/provider-me.types";

export function toProviderMeOwnerUser(
	dto: ProviderMeOwnerUserDto
): ProviderMeOwnerUser {
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

export function toProviderMeActiveService(
	dto: ProviderMeActiveServiceDto
): ProviderMeActiveService {
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

export function toProviderMe(dto: ProviderMeDto): ProviderMe {
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
		ownerUser: toProviderMeOwnerUser(dto.owner_user),
		techniciansCount: dto.technicians_count,
		availableTechniciansCount: dto.available_technicians_count,
		configuredServicesCount: dto.configured_services_count,
		activeServicesCount: dto.active_services_count,
		activeServices: (dto.active_services ?? []).map(toProviderMeActiveService),
		createdAt: formatDate(dto.created_at),
		updatedAt: formatDate(dto.updated_at),
	};
}

export function toProviderMeTechnician(
	dto: ProviderMeTechnicianDto
): ProviderMeTechnician {
	return {
		id: dto.id,
		providerId: dto.provider_id,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
		phoneNumber: dto.phone_number,
		specialty: dto.specialty ?? "",
		isActive: dto.is_active,
		isAvailable: dto.is_available,
		currentLatitude: dto.current_latitude ?? 0,
		currentLongitude: dto.current_longitude ?? 0,
		createdAt: formatDate(dto.created_at),
		updatedAt: formatDate(dto.updated_at),
	};
}

export function toProviderMeTechnicians(
	dtos: ProviderMeTechnicianDto[]
): ProviderMeTechnician[] {
	return dtos.map(toProviderMeTechnician);
}

export function toUpdateProviderMeProfileRequest(
	formValue: UpdateProviderMeProfileFormValue
): UpdateProviderMeProfileRequest {
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

export function toCreateProviderMeTechnicianRequest(
	formValue: CreateProviderMeTechnicianFormValue
): CreateProviderMeTechnicianRequest {
	return {
		first_name: formValue.firstName.trim(),
		last_name: formValue.lastName.trim(),
		phone_number: cleanOptional(formValue.phoneNumber),
		specialty: cleanOptional(formValue.specialty),
		is_available: formValue.isAvailable,
		current_latitude: Number.isFinite(formValue.currentLatitude)
			? formValue.currentLatitude
			: null,
		current_longitude: Number.isFinite(formValue.currentLongitude)
			? formValue.currentLongitude
			: null,
	};
}

export function toUpdateProviderMeTechnicianRequest(
	formValue: UpdateProviderMeTechnicianFormValue
): UpdateProviderMeTechnicianRequest {
	return {
		first_name: cleanOptional(formValue.firstName),
		last_name: cleanOptional(formValue.lastName),
		phone_number: cleanOptional(formValue.phoneNumber),
		specialty: cleanOptional(formValue.specialty),
		is_active: formValue.isActive,
		is_available: formValue.isAvailable,
		current_latitude: Number.isFinite(formValue.currentLatitude)
			? formValue.currentLatitude
			: null,
		current_longitude: Number.isFinite(formValue.currentLongitude)
			? formValue.currentLongitude
			: null,
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
