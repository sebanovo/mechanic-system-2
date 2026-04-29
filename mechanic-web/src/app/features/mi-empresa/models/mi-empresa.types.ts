export type MiEmpresaType = "WORKSHOP" | "INDEPENDENT_MECHANIC";

export type MiEmpresaOwnerUserDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
	is_active: boolean;
};

export type MiEmpresaActiveServiceDto = {
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

export type MiEmpresaDto = {
	id: string;
	owner_user_id: string;
	provider_type: MiEmpresaType;
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
	owner_user: MiEmpresaOwnerUserDto;
	technicians_count: number;
	available_technicians_count: number;
	configured_services_count: number;
	active_services_count: number;
	active_services: MiEmpresaActiveServiceDto[];
	created_at: string;
	updated_at: string;
};

export type MiEmpresaOwnerUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	isActive: boolean;
};

export type MiEmpresaActiveService = {
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

export type MiEmpresa = {
	id: string;
	ownerUserId: string;
	providerType: MiEmpresaType;
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
	ownerUser: MiEmpresaOwnerUser;
	techniciansCount: number;
	availableTechniciansCount: number;
	configuredServicesCount: number;
	activeServicesCount: number;
	activeServices: MiEmpresaActiveService[];
	createdAt: string;
	updatedAt: string;
};

export type UpdateMiEmpresaRequest = {
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

export type UpdateMiEmpresaFormValue = {
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

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};
