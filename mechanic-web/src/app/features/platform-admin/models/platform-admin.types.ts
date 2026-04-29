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

export type AuditActorUserDto = {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
};

export type AuditLogDto = {
	id: string;
	actor_user_id: string | null;
	incident_id: string | null;
	provider_id: string | null;
	request_id: string | null;
	event_scope: string;
	event_type: string;
	entity_type: string | null;
	entity_id: string | null;
	http_method: string | null;
	route_path: string | null;
	ip_address: string | null;
	user_agent: string | null;
	status_code: number | null;
	outcome: string;
	payload_json: Record<string, unknown> | null;
	created_at: string;
	actor_user: AuditActorUserDto | null;
};

export type MetricSnapshotCapturedByUserDto = {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
};

export type MetricSnapshotDto = {
	id: string;
	captured_by_user_id: string | null;
	snapshot_type: string;
	payload_json: Record<string, unknown>;
	created_at: string;
	captured_by_user: MetricSnapshotCapturedByUserDto | null;
};

export type BackgroundJobRequestedByUserDto = {
	id: string | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	full_name: string | null;
};

export type BackgroundJobDto = {
	id: string;
	requested_by_user_id: string | null;
	job_type: string;
	status: string;
	provider_name: string | null;
	queue_name: string;
	celery_task_id: string | null;
	entity_type: string | null;
	entity_id: string | null;
	payload_json: Record<string, unknown> | null;
	result_json: Record<string, unknown> | null;
	error_message: string | null;
	attempts_count: number;
	started_at: string | null;
	finished_at: string | null;
	created_at: string;
	updated_at: string;
	requested_by_user: BackgroundJobRequestedByUserDto | null;
};

export type AuditActorUser = {
	id: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	fullName: string | null;
};

export type AuditLog = {
	id: string;
	actorUserId: string | null;
	incidentId: string | null;
	providerId: string | null;
	requestId: string | null;
	eventScope: string;
	eventType: string;
	entityType: string | null;
	entityId: string | null;
	httpMethod: string | null;
	routePath: string | null;
	ipAddress: string | null;
	userAgent: string | null;
	statusCode: number | null;
	outcome: string;
	payloadJson: Record<string, unknown>;
	createdAt: string;
	actorUser: AuditActorUser | null;
};

export type MetricSnapshotCapturedByUser = {
	id: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	fullName: string | null;
};

export type MetricSnapshot = {
	id: string;
	capturedByUserId: string | null;
	snapshotType: string;
	payloadJson: Record<string, unknown>;
	createdAt: string;
	capturedByUser: MetricSnapshotCapturedByUser | null;
};

export type BackgroundJobRequestedByUser = {
	id: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	fullName: string | null;
};

export type BackgroundJob = {
	id: string;
	requestedByUserId: string | null;
	jobType: string;
	status: string;
	providerName: string | null;
	queueName: string;
	celeryTaskId: string | null;
	entityType: string | null;
	entityId: string | null;
	payloadJson: Record<string, unknown>;
	resultJson: Record<string, unknown>;
	errorMessage: string | null;
	attemptsCount: number;
	startedAt: string | null;
	finishedAt: string | null;
	createdAt: string;
	updatedAt: string;
	requestedByUser: BackgroundJobRequestedByUser | null;
};

export type DemoJobEnqueueRequest = {
	message: string;
	countdown_seconds: number;
};

export type DemoJobFormValue = {
	message: string;
	countdownSeconds: number;
};

export type EvidenceJobKind = "audio" | "image";

export type EvidenceJobFormValue = {
	evidenceId: string;
	jobKind: EvidenceJobKind;
};

export type IncidentSummaryJobFormValue = {
	incidentId: string;
};

export type AuditFiltersFormValue = {
	limit: number;
	offset: number;
	eventType: string;
	actorUserId: string;
	incidentId: string;
	providerId: string;
	requestId: string;
};

export type SnapshotFiltersFormValue = {
	limit: number;
	offset: number;
	snapshotType: string;
};

export type JobsFiltersFormValue = {
	limit: number;
	offset: number;
};

export type PlatformAdminTab = "jobs" | "audit" | "snapshots";
