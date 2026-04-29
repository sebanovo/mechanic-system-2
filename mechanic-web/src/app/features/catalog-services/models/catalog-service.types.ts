export type CatalogServiceDto = {
	id: string;
	code: string;
	category: string;
	title: string;
	description: string | null;
	supports_mobile_service: boolean;
	supports_emergency_service: boolean;
	is_active: boolean;
	sort_order: number;
	created_at: string;
	updated_at: string;
};

export type CatalogService = {
	id: string;
	code: string;
	category: string;
	title: string;
	description: string | null;
	supportsMobileService: boolean;
	supportsEmergencyService: boolean;
	isActive: boolean;
	sortOrder: number;
	createdAt: string;
	updatedAt: string;
};

export type CatalogServicesMetaDto = {
	count: number;
	include_inactive?: boolean;
};

export type CreateCatalogServiceRequest = {
	code: string;
	category: string;
	title: string;
	description: string | null;
	supports_mobile_service: boolean;
	supports_emergency_service: boolean;
	is_active: boolean;
	sort_order: number;
};

export type CreateCatalogServiceFormValue = {
	code: string;
	category: string;
	title: string;
	description: string | null;
	supportsMobileService: boolean;
	supportsEmergencyService: boolean;
	isActive: boolean;
	sortOrder: number;
};

export type UpdateCatalogServiceRequest = {
	category: string | null;
	title: string | null;
	description: string | null;
	supports_mobile_service: boolean | null;
	supports_emergency_service: boolean | null;
	is_active: boolean | null;
	sort_order: number | null;
};

export type UpdateCatalogServiceFormValue = {
	category: string;
	title: string;
	description: string | null;
	supportsMobileService: boolean;
	supportsEmergencyService: boolean;
	isActive: boolean;
	sortOrder: number;
};

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};
