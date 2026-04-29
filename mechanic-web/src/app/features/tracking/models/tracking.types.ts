export type TrackingOperationStatus =
	| "PENDING"
	| "PUBLISHED"
	| "ASSIGNED"
	| "EN_ROUTE"
	| "ON_SITE"
	| "ARRIVED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED";

export type TrackingPriority =
	| "LOW"
	| "MEDIUM"
	| "HIGH"
	| "CRITICAL"
	| "URGENT"
	| "UNKNOWN";

export type TrackingTechnicianDto = {
	id: string;
	provider_id?: string;
	first_name?: string;
	last_name?: string;
	full_name: string;
	phone_number?: string | null;
	specialty?: string | null;
	is_active?: boolean;
	is_available?: boolean;
	current_latitude?: number | null;
	current_longitude?: number | null;
};

export type TrackingClientDto = {
	id: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	full_name: string;
	phone_number?: string | null;
};

export type TrackingOperationDto = {
	incident_id: string;
	provider_id?: string | null;
	assigned_technician_id?: string | null;
	status: TrackingOperationStatus;
	priority?: TrackingPriority;
	reported_category?: string;
	title: string;
	description?: string;
	incident_latitude?: number | null;
	incident_longitude?: number | null;
	address_reference?: string | null;
	assigned_at?: string | null;
	en_route_at?: string | null;
	arrived_at?: string | null;
	started_at?: string | null;
	client_user?: TrackingClientDto | null;
	assigned_technician?: TrackingTechnicianDto | null;
};

export type TrackingLocationDto = {
	latitude?: number | null;
	longitude?: number | null;
	lat?: number | null;
	lng?: number | null;
	accuracy_meters?: number | null;
	speed_kmh?: number | null;
	heading_degrees?: number | null;
	recorded_at?: string | null;
	updated_at?: string | null;
	created_at?: string | null;
};

export type TrackingRouteDto = {
	distance_km?: number | null;
	eta_minutes?: number | null;
	duration_minutes?: number | null;
	route_distance_km?: number | null;
	route_duration_minutes?: number | null;
	polyline?: string | null;
	provider?: string | null;
};

export type TrackingLiveDto = {
	incident_id: string;
	status?: TrackingOperationStatus | string | null;

	incident_latitude?: number | null;
	incident_longitude?: number | null;
	destination_latitude?: number | null;
	destination_longitude?: number | null;

	technician_latitude?: number | null;
	technician_longitude?: number | null;
	current_latitude?: number | null;
	current_longitude?: number | null;

	distance_km?: number | null;
	eta_minutes?: number | null;
	route_distance_km?: number | null;
	route_duration_minutes?: number | null;

	last_updated_at?: string | null;
	updated_at?: string | null;

	incident_location?: TrackingLocationDto | null;
	technician_location?: TrackingLocationDto | null;
	last_location?: TrackingLocationDto | null;
	route?: TrackingRouteDto | null;

	assigned_technician?: TrackingTechnicianDto | null;
};

export type TrackingHistoryItemDto = {
	id: string;
	incident_id: string;
	technician_id?: string | null;
	latitude?: number | null;
	longitude?: number | null;
	lat?: number | null;
	lng?: number | null;
	accuracy_meters?: number | null;
	speed_kmh?: number | null;
	heading_degrees?: number | null;
	source?: string | null;
	note?: string | null;
	recorded_at?: string | null;
	created_at: string;
};

export type TrackingTechnician = {
	id: string;
	fullName: string;
	phoneNumber: string | null;
	specialty: string;
	isActive: boolean;
	isAvailable: boolean;
	currentLatitude: number | null;
	currentLongitude: number | null;
};

export type TrackingClient = {
	id: string;
	fullName: string;
	email: string | null;
	phoneNumber: string | null;
};

export type TrackingOperation = {
	incidentId: string;
	providerId: string | null;
	assignedTechnicianId: string | null;
	status: TrackingOperationStatus;
	priority: TrackingPriority;
	reportedCategory: string;
	title: string;
	description: string;
	incidentLatitude: number | null;
	incidentLongitude: number | null;
	addressReference: string | null;
	assignedAt: string | null;
	enRouteAt: string | null;
	arrivedAt: string | null;
	startedAt: string | null;
	clientUser: TrackingClient | null;
	assignedTechnician: TrackingTechnician | null;
};

export type TrackingLive = {
	incidentId: string;
	status: string | null;

	incidentLatitude: number | null;
	incidentLongitude: number | null;

	technicianLatitude: number | null;
	technicianLongitude: number | null;

	distanceKm: number | null;
	etaMinutes: number | null;
	routePolyline: string | null;

	lastUpdatedAt: string | null;
	assignedTechnician: TrackingTechnician | null;
};

export type TrackingHistoryItem = {
	id: string;
	incidentId: string;
	technicianId: string | null;
	latitude: number | null;
	longitude: number | null;
	accuracyMeters: number | null;
	speedKmh: number | null;
	headingDegrees: number | null;
	source: string | null;
	note: string | null;
	recordedAt: string | null;
	createdAt: string;
};

export type UpdateTrackingLocationRequest = {
	latitude: number;
	longitude: number;
	accuracy_meters: number | null;
	speed_kmh: number | null;
	heading_degrees: number | null;
	note: string | null;
};

export type UpdateTrackingLocationFormValue = {
	latitude: number;
	longitude: number;
	accuracyMeters: number | null;
	speedKmh: number | null;
	headingDegrees: number | null;
	note: string | null;
};

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type CountMetaDto = {
	count: number;
};
