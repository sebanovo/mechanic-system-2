export type ProviderMeType = "WORKSHOP" | "INDEPENDENT_MECHANIC";

export type ProviderMeOwnerUserDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
	is_active: boolean;
};

export type ProviderMeActiveServiceDto = {
	id: string;
	service_catalog_item_id: string;
	code: string;
	category: string;
	title: string;
	price_estimate_min: number | null;
	price_estimate_max: number | null;
	estimated_duration_minutes: number | null;
	is_mobile_service_enabled: boolean;
	is_emergency_service_enabled: boolean;
	is_active: boolean;
};

export type ProviderMeDto = {
	id: string;
	owner_user_id: string;
	provider_type: ProviderMeType;
	business_name: string;
	legal_name: string | null;
	description: string | null;
	contact_email: string | null;
	contact_phone: string | null;
	city: string | null;
	address: string | null;
	base_latitude: number | null;
	base_longitude: number | null;
	is_active: boolean;
	is_available: boolean;
	max_concurrent_services: number;
	current_active_services: number;
	available_capacity: number;
	average_rating: number;
	owner_user: ProviderMeOwnerUserDto;
	technicians_count: number;
	available_technicians_count: number;
	configured_services_count: number;
	active_services_count: number;
	active_services: ProviderMeActiveServiceDto[];
	created_at: string;
	updated_at: string;
};

export type ProviderMeOwnerUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	isActive: boolean;
};

export type ProviderMeActiveService = {
	id: string;
	serviceCatalogItemId: string;
	code: string;
	category: string;
	title: string;
	priceEstimateMin: number | null;
	priceEstimateMax: number | null;
	estimatedDurationMinutes: number | null;
	isMobileServiceEnabled: boolean;
	isEmergencyServiceEnabled: boolean;
	isActive: boolean;
};

export type ProviderMe = {
	id: string;
	ownerUserId: string;
	providerType: ProviderMeType;
	businessName: string;
	legalName: string;
	description: string | null;
	contactEmail: string;
	contactPhone: string | null;
	city: string;
	address: string;
	baseLatitude: number;
	baseLongitude: number;
	isActive: boolean;
	isAvailable: boolean;
	maxConcurrentServices: number;
	currentActiveServices: number;
	availableCapacity: number;
	averageRating: number;
	ownerUser: ProviderMeOwnerUser;
	techniciansCount: number;
	availableTechniciansCount: number;
	configuredServicesCount: number;
	activeServicesCount: number;
	activeServices: ProviderMeActiveService[];
	createdAt: string;
	updatedAt: string;
};

export type UpdateProviderMeProfileRequest = {
	business_name: string;
	legal_name: string | null;
	description: string | null;
	contact_email: string | null;
	contact_phone: string | null;
	city: string | null;
	address: string | null;
	base_latitude: number | null;
	base_longitude: number | null;
	is_available: boolean;
	max_concurrent_services: number;
};

export type UpdateProviderMeProfileFormValue = {
	businessName: string;
	legalName: string;
	description: string | null;
	contactEmail: string;
	contactPhone: string | null;
	city: string;
	address: string;
	baseLatitude: number;
	baseLongitude: number;
	isAvailable: boolean;
	maxConcurrentServices: number;
};

export type ProviderMeTechnicianDto = {
	id: string;
	provider_id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
	specialty: string | null;
	is_active: boolean;
	is_available: boolean;
	current_latitude: number | null;
	current_longitude: number | null;
	created_at: string;
	updated_at: string;
};

export type ProviderMeTechnician = {
	id: string;
	providerId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	specialty: string;
	isActive: boolean;
	isAvailable: boolean;
	currentLatitude: number;
	currentLongitude: number;
	createdAt: string;
	updatedAt: string;
};

export type CreateProviderMeTechnicianRequest = {
	first_name: string;
	last_name: string;
	phone_number: string | null;
	specialty: string | null;
	is_available: boolean;
	current_latitude: number | null;
	current_longitude: number | null;
};

export type CreateProviderMeTechnicianFormValue = {
	firstName: string;
	lastName: string;
	phoneNumber: string | null;
	specialty: string;
	isAvailable: boolean;
	currentLatitude: number;
	currentLongitude: number;
};

export type UpdateProviderMeTechnicianRequest = {
	first_name: string | null;
	last_name: string | null;
	phone_number: string | null;
	specialty: string | null;
	is_active: boolean | null;
	is_available: boolean | null;
	current_latitude: number | null;
	current_longitude: number | null;
};

export type UpdateProviderMeTechnicianFormValue = {
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	specialty: string;
	isActive: boolean;
	isAvailable: boolean;
	currentLatitude: number;
	currentLongitude: number;
};

export type ProviderMeTechniciansMetaDto = {
	count: number;
};

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};
