export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type PagedMetaDto = {
	limit: number;
	offset: number;
	count: number;
};

export type CountMetaDto = {
	count: number;
};

export type PlatformIncidentStatus =
	| "PENDING"
	| "IN_REVIEW"
	| "PUBLISHED"
	| "ASSIGNED"
	| "EN_ROUTE"
	| "ON_SITE"
	| "ARRIVED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED"
	| string;

export type PlatformIncidentPriority =
	| "LOW"
	| "MEDIUM"
	| "HIGH"
	| "CRITICAL"
	| string;

export type PlatformIncidentCategory =
	| "BATTERY"
	| "TIRE"
	| "ACCIDENT"
	| "ENGINE"
	| "LOCKOUT"
	| "OVERHEATING"
	| "OTHER"
	| "UNCERTAIN"
	| string;

export type PlatformProcessingStatus =
	| "NOT_REQUESTED"
	| "PENDING"
	| "RUNNING"
	| "SUCCEEDED"
	| "FAILED"
	| string;

export type PlatformIncidentVehicleDto = {
	id: string;
	plate_number: string;
	vehicle_type: string;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
};

export type PlatformIncidentClientDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
};

export type PlatformIncidentProviderDto = {
	id: string;
	provider_type: string;
	business_name: string;
	contact_phone: string | null;
	city: string | null;
	is_available?: boolean;
	average_rating: number;
};

export type PlatformIncidentTechnicianDto = {
	id: string;
	provider_id: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
	specialty: string | null;
	is_active: boolean;
	is_available: boolean;
};

export type PlatformIncidentDto = {
	id: string;
	client_user_id: string;
	vehicle_id: string;
	provider_id: string | null;
	assigned_technician_id: string | null;
	dispatch_mode: string | null;

	status: PlatformIncidentStatus;
	priority: PlatformIncidentPriority;
	reported_category: PlatformIncidentCategory;
	title: string;
	description: string;
	client_contact_phone_snapshot: string | null;
	incident_latitude: number | null;
	incident_longitude: number | null;
	address_reference: string | null;
	estimated_price_min: number | null;
	estimated_price_max: number | null;

	ai_summary_status: PlatformProcessingStatus;
	summary_provider_name: string | null;
	structured_summary: string | null;
	suggested_category: PlatformIncidentCategory | null;
	suggested_priority: PlatformIncidentPriority | null;
	requires_more_information: boolean;
	summary_processed_at: string | null;
	summary_error_message: string | null;

	route_distance_km?: number | null;
	route_eta_minutes?: number | null;
	route_error_message?: string | null;

	requested_at: string;
	assigned_at: string | null;
	en_route_at: string | null;
	arrived_at: string | null;
	started_at: string | null;
	completed_at: string | null;
	cancelled_at: string | null;
	created_at: string;
	updated_at: string;

	vehicle: PlatformIncidentVehicleDto;
	client_user: PlatformIncidentClientDto;
	provider: PlatformIncidentProviderDto | null;
	assigned_technician: PlatformIncidentTechnicianDto | null;
};

export type PlatformIncident = {
	id: string;
	clientUserId: string;
	vehicleId: string;
	providerId: string | null;
	assignedTechnicianId: string | null;
	dispatchMode: string | null;

	status: PlatformIncidentStatus;
	priority: PlatformIncidentPriority;
	reportedCategory: PlatformIncidentCategory;
	title: string;
	description: string;
	clientContactPhoneSnapshot: string | null;
	incidentLatitude: number | null;
	incidentLongitude: number | null;
	addressReference: string | null;
	estimatedPriceMin: number | null;
	estimatedPriceMax: number | null;

	aiSummaryStatus: PlatformProcessingStatus;
	summaryProviderName: string | null;
	structuredSummary: string | null;
	suggestedCategory: PlatformIncidentCategory | null;
	suggestedPriority: PlatformIncidentPriority | null;
	requiresMoreInformation: boolean;
	summaryProcessedAt: string | null;
	summaryErrorMessage: string | null;

	routeDistanceKm: number | null;
	routeEtaMinutes: number | null;
	routeErrorMessage: string | null;

	requestedAt: string;
	assignedAt: string | null;
	enRouteAt: string | null;
	arrivedAt: string | null;
	startedAt: string | null;
	completedAt: string | null;
	cancelledAt: string | null;
	createdAt: string;
	updatedAt: string;

	vehicle: {
		id: string;
		plateNumber: string;
		vehicleType: string;
		brand: string;
		model: string;
		year: number | null;
		color: string | null;
	};

	clientUser: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
		fullName: string;
		phoneNumber: string | null;
	};

	provider: {
		id: string;
		providerType: string;
		businessName: string;
		contactPhone: string | null;
		city: string | null;
		isAvailable: boolean | null;
		averageRating: number;
	} | null;

	assignedTechnician: {
		id: string;
		providerId: string;
		firstName: string;
		lastName: string;
		fullName: string;
		phoneNumber: string | null;
		specialty: string | null;
		isActive: boolean;
		isAvailable: boolean;
	} | null;
};

export type AssignmentCandidateMatchedServiceDto = {
	code: string;
	category: string;
	title: string;
};

export type AssignmentCandidateProviderOwnerDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
};

export type AssignmentCandidateProviderDto = {
	id: string;
	provider_type: string;
	business_name: string;
	city: string | null;
	contact_phone: string | null;
	average_rating: number;
	available_capacity: number;
	available_technicians_count: number;
	base_latitude: number | null;
	base_longitude: number | null;
	owner_user: AssignmentCandidateProviderOwnerDto;
	matched_services: AssignmentCandidateMatchedServiceDto[];
};

export type AssignmentCandidateIncidentDto = {
	id: string;
	status: string;
	priority: string;
	reported_category: string;
	title: string;
	description: string;
	incident_latitude: number | null;
	incident_longitude: number | null;
	address_reference: string | null;
	ai_summary_status: string;
	structured_summary: string | null;
	suggested_category: string | null;
	suggested_priority: string | null;
	requires_more_information: boolean;
};

export type AssignmentCandidateDto = {
	id: string;
	incident_id: string;
	provider_id: string;
	status: string;
	recommendation_rank: number;
	score: number;
	distance_km: number | null;
	required_service_codes: string[];
	matched_service_codes: string[];
	rationale: Record<string, unknown> | null;
	provider_average_rating_snapshot: number;
	provider_available_capacity_snapshot: number;
	available_technicians_count_snapshot: number;
	published_at: string;
	responded_at: string | null;
	expires_at: string | null;
	provider: AssignmentCandidateProviderDto;
	incident: AssignmentCandidateIncidentDto;
};

export type AssignmentCandidate = {
	id: string;
	incidentId: string;
	providerId: string;
	status: string;
	recommendationRank: number;
	score: number;
	distanceKm: number | null;
	requiredServiceCodes: string[];
	matchedServiceCodes: string[];
	rationale: Record<string, unknown>;
	providerAverageRatingSnapshot: number;
	providerAvailableCapacitySnapshot: number;
	availableTechniciansCountSnapshot: number;
	publishedAt: string;
	respondedAt: string | null;
	expiresAt: string | null;

	provider: {
		id: string;
		providerType: string;
		businessName: string;
		city: string | null;
		contactPhone: string | null;
		averageRating: number;
		availableCapacity: number;
		availableTechniciansCount: number;
		baseLatitude: number | null;
		baseLongitude: number | null;
		ownerUser: {
			id: string;
			email: string;
			firstName: string;
			lastName: string;
			fullName: string;
			phoneNumber: string | null;
		};
		matchedServices: AssignmentCandidateMatchedService[];
	};

	incident: {
		id: string;
		status: string;
		priority: string;
		reportedCategory: string;
		title: string;
		description: string;
		incidentLatitude: number | null;
		incidentLongitude: number | null;
		addressReference: string | null;
		aiSummaryStatus: string;
		structuredSummary: string | null;
		suggestedCategory: string | null;
		suggestedPriority: string | null;
		requiresMoreInformation: boolean;
	};
};

export type AssignmentCandidateMatchedService = {
	code: string;
	category: string;
	title: string;
};

export type AssignmentPublishResponseDto = {
	incident_id: string;
	incident_status: string;
	used_category: string;
	used_priority: string;
	required_service_codes: string[];
	published_candidates_count: number;
	recommended_candidate_id: string | null;
	recommended_provider_id: string | null;
};

export type AssignmentPublishResult = {
	incidentId: string;
	incidentStatus: string;
	usedCategory: string;
	usedPriority: string;
	requiredServiceCodes: string[];
	publishedCandidatesCount: number;
	recommendedCandidateId: string | null;
	recommendedProviderId: string | null;
};

export type IncidentFiltersFormValue = {
	limit: number;
	offset: number;
};
