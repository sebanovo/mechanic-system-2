export type OperationStatus =
	| "PENDING"
	| "PUBLISHED"
	| "ASSIGNED"
	| "EN_ROUTE"
	| "ON_SITE"
	| "ARRIVED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED";

export type OperationPriority =
	| "LOW"
	| "MEDIUM"
	| "HIGH"
	| "CRITICAL"
	| "URGENT"
	| "UNKNOWN";

export type OperationTechnicianSummaryDto = {
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

export type OperationClientSummaryDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
	phone_number: string | null;
};

export type IncidentOperationStateDto = {
	incident_id: string;
	provider_id: string | null;
	assigned_technician_id: string | null;
	dispatch_mode: string | null;

	status: OperationStatus;
	priority: OperationPriority;
	reported_category: string;
	title: string;
	description: string;
	client_contact_phone_snapshot: string | null;
	incident_latitude: number | null;
	incident_longitude: number | null;
	address_reference: string | null;

	ai_summary_status: string;
	structured_summary: string | null;
	suggested_category: string | null;
	suggested_priority: OperationPriority | null;
	requires_more_information: boolean;

	assigned_at: string | null;
	en_route_at: string | null;
	arrived_at: string | null;
	started_at: string | null;
	completed_at: string | null;
	cancelled_at: string | null;

	client_user: OperationClientSummaryDto;
	assigned_technician: OperationTechnicianSummaryDto | null;
};

export type OperationEventActorDto = {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
};

export type IncidentOperationEventDto = {
	id: string;
	incident_id: string;
	provider_id: string | null;
	technician_id: string | null;
	actor_user_id: string | null;
	event_type: string;
	from_status: OperationStatus | null;
	to_status: OperationStatus | null;
	note: string | null;
	payload_json: Record<string, unknown> | null;
	created_at: string;
	actor_user: OperationEventActorDto | null;
	technician: OperationTechnicianSummaryDto | null;
};

export type ProviderTechnicianDto = {
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

export type OperationTechnicianSummary = {
	id: string;
	providerId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	specialty: string;
	isActive: boolean;
	isAvailable: boolean;
};

export type OperationClientSummary = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
};

export type IncidentOperationState = {
	incidentId: string;
	providerId: string | null;
	assignedTechnicianId: string | null;
	dispatchMode: string | null;

	status: OperationStatus;
	priority: OperationPriority;
	reportedCategory: string;
	title: string;
	description: string;
	clientContactPhoneSnapshot: string | null;
	incidentLatitude: number | null;
	incidentLongitude: number | null;
	addressReference: string | null;

	aiSummaryStatus: string;
	structuredSummary: string | null;
	suggestedCategory: string | null;
	suggestedPriority: OperationPriority | null;
	requiresMoreInformation: boolean;

	assignedAt: string | null;
	enRouteAt: string | null;
	arrivedAt: string | null;
	startedAt: string | null;
	completedAt: string | null;
	cancelledAt: string | null;

	clientUser: OperationClientSummary;
	assignedTechnician: OperationTechnicianSummary | null;
};

export type IncidentOperationEvent = {
	id: string;
	incidentId: string;
	providerId: string | null;
	technicianId: string | null;
	actorUserId: string | null;
	eventType: string;
	fromStatus: OperationStatus | null;
	toStatus: OperationStatus | null;
	note: string | null;
	payloadJson: Record<string, unknown>;
	createdAt: string;
	actorUser: OperationEventActor | null;
	technician: OperationTechnicianSummary | null;
};

export type OperationEventActor = {
	id: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	fullName: string | null;
};

export type ProviderTechnician = {
	id: string;
	providerId: string;
	firstName: string;
	lastName: string;
	fullName: string;
	phoneNumber: string | null;
	specialty: string;
	isActive: boolean;
	isAvailable: boolean;
	currentLatitude: number | null;
	currentLongitude: number | null;
	createdAt: string;
	updatedAt: string;
};

export type DispatchIncidentRequest = {
	technician_id: string | null;
	note: string | null;
};

export type OperationNoteRequest = {
	note: string | null;
};

export type CompleteIncidentRequest = {
	note: string | null;
	completion_summary: string | null;
};

export type DispatchIncidentFormValue = {
	technicianId: string;
	note: string;
};

export type OperationNoteFormValue = {
	note: string;
};

export type CompleteIncidentFormValue = {
	note: string;
	completionSummary: string;
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
