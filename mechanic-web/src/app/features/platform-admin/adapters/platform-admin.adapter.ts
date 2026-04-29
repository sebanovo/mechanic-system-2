import {
	AuditActorUser,
	AuditActorUserDto,
	AuditFiltersFormValue,
	AuditLog,
	AuditLogDto,
	BackgroundJob,
	BackgroundJobDto,
	BackgroundJobRequestedByUser,
	BackgroundJobRequestedByUserDto,
	DemoJobEnqueueRequest,
	DemoJobFormValue,
	MetricSnapshot,
	MetricSnapshotCapturedByUser,
	MetricSnapshotCapturedByUserDto,
	MetricSnapshotDto,
} from "../models/platform-admin.types";

export function toAuditActorUser(
	dto: AuditActorUserDto | null
): AuditActorUser | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
	};
}

export function toAuditLog(dto: AuditLogDto): AuditLog {
	return {
		id: dto.id,
		actorUserId: dto.actor_user_id,
		incidentId: dto.incident_id,
		providerId: dto.provider_id,
		requestId: dto.request_id,
		eventScope: dto.event_scope,
		eventType: dto.event_type,
		entityType: dto.entity_type,
		entityId: dto.entity_id,
		httpMethod: dto.http_method,
		routePath: dto.route_path,
		ipAddress: dto.ip_address,
		userAgent: dto.user_agent,
		statusCode: dto.status_code,
		outcome: dto.outcome,
		payloadJson: dto.payload_json ?? {},
		createdAt: formatDateTime(dto.created_at),
		actorUser: toAuditActorUser(dto.actor_user),
	};
}

export function toAuditLogs(dtos: AuditLogDto[]): AuditLog[] {
	return dtos.map(toAuditLog);
}

export function toMetricSnapshotCapturedByUser(
	dto: MetricSnapshotCapturedByUserDto | null
): MetricSnapshotCapturedByUser | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
	};
}

export function toMetricSnapshot(dto: MetricSnapshotDto): MetricSnapshot {
	return {
		id: dto.id,
		capturedByUserId: dto.captured_by_user_id,
		snapshotType: dto.snapshot_type,
		payloadJson: dto.payload_json ?? {},
		createdAt: formatDateTime(dto.created_at),
		capturedByUser: toMetricSnapshotCapturedByUser(dto.captured_by_user),
	};
}

export function toMetricSnapshots(dtos: MetricSnapshotDto[]): MetricSnapshot[] {
	return dtos.map(toMetricSnapshot);
}

export function toBackgroundJobRequestedByUser(
	dto: BackgroundJobRequestedByUserDto | null
): BackgroundJobRequestedByUser | null {
	if (!dto) {
		return null;
	}

	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
	};
}

export function toBackgroundJob(dto: BackgroundJobDto): BackgroundJob {
	return {
		id: dto.id,
		requestedByUserId: dto.requested_by_user_id,
		jobType: dto.job_type,
		status: dto.status,
		providerName: dto.provider_name,
		queueName: dto.queue_name,
		celeryTaskId: dto.celery_task_id,
		entityType: dto.entity_type,
		entityId: dto.entity_id,
		payloadJson: dto.payload_json ?? {},
		resultJson: dto.result_json ?? {},
		errorMessage: dto.error_message,
		attemptsCount: dto.attempts_count,
		startedAt: formatDateTimeOrNull(dto.started_at),
		finishedAt: formatDateTimeOrNull(dto.finished_at),
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
		requestedByUser: toBackgroundJobRequestedByUser(dto.requested_by_user),
	};
}

export function toBackgroundJobs(dtos: BackgroundJobDto[]): BackgroundJob[] {
	return dtos.map(toBackgroundJob);
}

export function toDemoJobEnqueueRequest(
	formValue: DemoJobFormValue
): DemoJobEnqueueRequest {
	return {
		message: formValue.message.trim(),
		countdown_seconds: Number(formValue.countdownSeconds),
	};
}

export function cleanAuditFilters(
	formValue: AuditFiltersFormValue
): Record<string, string> {
	const params: Record<string, string> = {
		limit: String(formValue.limit),
		offset: String(formValue.offset),
	};

	addOptionalParam(params, "event_type", formValue.eventType);
	addOptionalParam(params, "actor_user_id", formValue.actorUserId);
	addOptionalParam(params, "incident_id", formValue.incidentId);
	addOptionalParam(params, "provider_id", formValue.providerId);
	addOptionalParam(params, "request_id", formValue.requestId);

	return params;
}

export function jsonToText(value: Record<string, unknown>): string {
	return JSON.stringify(value ?? {}, null, 2);
}

function addOptionalParam(
	params: Record<string, string>,
	key: string,
	value: string
): void {
	const cleanedValue = value.trim();

	if (cleanedValue) {
		params[key] = cleanedValue;
	}
}

function formatDateTimeOrNull(value: string | null): string | null {
	if (!value) {
		return null;
	}

	return formatDateTime(value);
}

function formatDateTime(value: string): string {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return date.toLocaleString("es-BO", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
}
