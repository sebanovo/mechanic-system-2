export type VehicleType = "CAR" | "MOTORCYCLE" | "TRUCK" | "VAN" | "OTHER";

export type IncidentCategory =
	| "BATTERY"
	| "TIRE"
	| "ACCIDENT"
	| "ENGINE"
	| "LOCKOUT"
	| "OVERHEATING"
	| "OTHER"
	| "UNCERTAIN";

export type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus =
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

export type EvidenceType = "TEXT" | "IMAGE" | "AUDIO";

export type ProcessingStatus =
	| "NOT_REQUESTED"
	| "PENDING"
	| "RUNNING"
	| "SUCCEEDED"
	| "FAILED"
	| string;

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};

export type CountMetaDto = {
	count: number;
};

export type VehicleDto = {
	id: string;
	owner_user_id: string;
	plate_number: string;
	vehicle_type: VehicleType;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
	notes: string | null;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type Vehicle = {
	id: string;
	ownerUserId: string;
	plateNumber: string;
	vehicleType: VehicleType;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
	notes: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

export type CreateVehicleRequest = {
	plate_number: string;
	vehicle_type: VehicleType;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
	notes: string | null;
};

export type CreateVehicleFormValue = {
	plateNumber: string;
	vehicleType: VehicleType;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
	notes: string | null;
};

export type IncidentVehicleSummaryDto = {
	id: string;
	plate_number: string;
	vehicle_type: VehicleType;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
};

export type IncidentUserSummaryDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
};

export type IncidentProviderSummaryDto = {
	id: string;
	provider_type: string;
	business_name: string;
	city: string | null;
	contact_phone: string | null;
	average_rating: number;
};

export type IncidentTechnicianSummaryDto = {
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

export type IncidentDto = {
	id: string;
	client_user_id: string;
	vehicle_id: string;
	provider_id: string | null;
	assigned_technician_id: string | null;
	dispatch_mode: string | null;

	status: IncidentStatus;
	priority: IncidentPriority;
	reported_category: IncidentCategory;
	title: string;
	description: string;
	client_contact_phone_snapshot: string | null;
	incident_latitude: number | null;
	incident_longitude: number | null;
	address_reference: string | null;
	estimated_price_min: number | null;
	estimated_price_max: number | null;

	ai_summary_status: ProcessingStatus;
	summary_provider_name: string | null;
	structured_summary: string | null;
	suggested_category: IncidentCategory | null;
	suggested_priority: IncidentPriority | null;
	requires_more_information: boolean;
	summary_processed_at: string | null;
	summary_error_message: string | null;

	responder_last_latitude: number | null;
	responder_last_longitude: number | null;
	responder_last_source_type: string | null;
	responder_last_recorded_at: string | null;

	route_provider_name: string | null;
	route_distance_meters: number | null;
	route_distance_km: number | null;
	route_duration_seconds: number | null;
	route_eta_seconds: number | null;
	route_eta_minutes: number | null;
	route_polyline: string | null;
	route_last_calculated_at: string | null;
	route_error_message: string | null;

	requested_at: string;
	assigned_at: string | null;
	en_route_at: string | null;
	arrived_at: string | null;
	started_at: string | null;
	completed_at: string | null;
	cancelled_at: string | null;
	created_at: string;
	updated_at: string;

	vehicle: IncidentVehicleSummaryDto;
	client_user: IncidentUserSummaryDto;
	provider: IncidentProviderSummaryDto | null;
	assigned_technician: IncidentTechnicianSummaryDto | null;
};

export type IncidentVehicleSummary = {
	id: string;
	plateNumber: string;
	vehicleType: VehicleType;
	brand: string;
	model: string;
	year: number | null;
	color: string | null;
};

export type IncidentUserSummary = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
};

export type IncidentProviderSummary = {
	id: string;
	providerType: string;
	businessName: string;
	city: string | null;
	contactPhone: string | null;
	averageRating: number;
};

export type IncidentTechnicianSummary = {
	id: string;
	providerId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	specialty: string | null;
	isActive: boolean;
	isAvailable: boolean;
};

export type Incident = {
	id: string;
	clientUserId: string;
	vehicleId: string;
	providerId: string | null;
	assignedTechnicianId: string | null;
	dispatchMode: string | null;

	status: IncidentStatus;
	priority: IncidentPriority;
	reportedCategory: IncidentCategory;
	title: string;
	description: string;
	clientContactPhoneSnapshot: string | null;
	incidentLatitude: number | null;
	incidentLongitude: number | null;
	addressReference: string | null;
	estimatedPriceMin: number | null;
	estimatedPriceMax: number | null;

	aiSummaryStatus: ProcessingStatus;
	summaryProviderName: string | null;
	structuredSummary: string | null;
	suggestedCategory: IncidentCategory | null;
	suggestedPriority: IncidentPriority | null;
	requiresMoreInformation: boolean;
	summaryProcessedAt: string | null;
	summaryErrorMessage: string | null;

	responderLastLatitude: number | null;
	responderLastLongitude: number | null;
	responderLastSourceType: string | null;
	responderLastRecordedAt: string | null;

	routeProviderName: string | null;
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

	vehicle: IncidentVehicleSummary;
	clientUser: IncidentUserSummary;
	provider: IncidentProviderSummary | null;
	assignedTechnician: IncidentTechnicianSummary | null;
};

export type CreateIncidentRequest = {
	vehicle_id: string;
	reported_category: IncidentCategory;
	priority: IncidentPriority;
	title: string;
	description: string;
	incident_latitude: number | null;
	incident_longitude: number | null;
	address_reference: string | null;
};

export type CreateIncidentFormValue = {
	vehicleId: string;
	reportedCategory: IncidentCategory;
	priority: IncidentPriority;
	title: string;
	description: string;
	incidentLatitude: number | null;
	incidentLongitude: number | null;
	addressReference: string | null;
};

export type EvidenceUploaderDto = {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
};

export type IncidentEvidenceDto = {
	id: string;
	incident_id: string;
	uploaded_by_user_id: string | null;
	evidence_type: EvidenceType;
	original_filename: string | null;
	stored_filename: string;
	file_extension: string | null;
	mime_type: string | null;
	file_size_bytes: number | null;
	description: string | null;
	text_content_snapshot: string | null;

	storage_provider: string;
	storage_bucket: string | null;
	storage_object_key: string | null;
	public_url: string | null;
	download_url: string;

	audio_processing_status: ProcessingStatus;
	audio_provider_name: string | null;
	transcript_text: string | null;
	transcript_language_code: string | null;
	transcript_confidence: number | null;
	transcript_segments_json: unknown[] | null;
	audio_processed_at: string | null;
	audio_error_message: string | null;

	image_processing_status: ProcessingStatus;
	image_provider_name: string | null;
	image_labels_json: string[] | null;
	image_detections_json: Array<Record<string, unknown>> | null;
	image_summary: string | null;
	image_processed_at: string | null;
	image_error_message: string | null;

	created_at: string;
	updated_at: string;
	uploaded_by_user: EvidenceUploaderDto | null;
};

export type IncidentEvidence = {
	id: string;
	incidentId: string;
	uploadedByUserId: string | null;
	evidenceType: EvidenceType;
	originalFilename: string | null;
	storedFilename: string;
	fileExtension: string | null;
	mimeType: string | null;
	fileSizeBytes: number | null;
	description: string | null;
	textContentSnapshot: string | null;

	storageProvider: string;
	publicUrl: string | null;
	downloadUrl: string;

	audioProcessingStatus: ProcessingStatus;
	audioProviderName: string | null;
	transcriptText: string | null;
	transcriptLanguageCode: string | null;
	transcriptConfidence: number | null;
	audioProcessedAt: string | null;
	audioErrorMessage: string | null;

	imageProcessingStatus: ProcessingStatus;
	imageProviderName: string | null;
	imageLabels: string[];
	imageDetections: Array<Record<string, unknown>>;
	imageSummary: string | null;
	imageProcessedAt: string | null;
	imageErrorMessage: string | null;

	createdAt: string;
	updatedAt: string;
};

export type CreateTextEvidenceRequest = {
	description: string | null;
	text_content: string;
	evidence_type: "TEXT";
};

export type CreateTextEvidenceFormValue = {
	description: string | null;
	textContent: string;
};

export type UploadFileEvidenceFormValue = {
	evidenceType: "IMAGE" | "AUDIO";
	description: string | null;
	file: File;
};
