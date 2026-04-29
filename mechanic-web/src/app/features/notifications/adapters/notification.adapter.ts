import {
	NotificationDelivery,
	NotificationDeliveryDto,
	NotificationDispatchSummary,
	NotificationDispatchSummaryDto,
	NotificationRecipientUser,
	NotificationRecipientUserDto,
	PlatformSendTestPushFormValue,
	PlatformSendTestPushRequest,
	RegisterDeviceTokenFormValue,
	RegisterDeviceTokenRequest,
	UserDeviceToken,
	UserDeviceTokenDto,
} from "../models/notification.types";

export function toUserDeviceToken(dto: UserDeviceTokenDto): UserDeviceToken {
	return {
		id: dto.id,
		userId: dto.user_id,
		devicePlatform: dto.device_platform,
		deviceLabel: dto.device_label,
		appRole: dto.app_role,
		pushProviderName: dto.push_provider_name,
		isActive: dto.is_active,
		lastSeenAt: formatDateTime(dto.last_seen_at),
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
	};
}

export function toUserDeviceTokens(
	dtos: UserDeviceTokenDto[]
): UserDeviceToken[] {
	return dtos.map(toUserDeviceToken);
}

export function toRegisterDeviceTokenRequest(
	formValue: RegisterDeviceTokenFormValue
): RegisterDeviceTokenRequest {
	return {
		device_token: formValue.deviceToken.trim(),
		device_platform: formValue.devicePlatform,
		device_label: cleanOptional(formValue.deviceLabel),
		app_role: cleanOptional(formValue.appRole),
	};
}

export function toPlatformSendTestPushRequest(
	formValue: PlatformSendTestPushFormValue
): PlatformSendTestPushRequest {
	return {
		title: formValue.title.trim(),
		body: formValue.body.trim(),
		data: parseDataJson(formValue.dataJsonText),
		incident_id: cleanOptional(formValue.incidentId),
	};
}

export function toNotificationDispatchSummary(
	dto: NotificationDispatchSummaryDto
): NotificationDispatchSummary {
	return {
		eventCode: dto.event_code,
		incidentId: dto.incident_id,
		targetUserId: dto.target_user_id,
		activeDeviceTokensCount: dto.active_device_tokens_count,
		enqueuedJobsCount: dto.enqueued_jobs_count,
	};
}

export function toNotificationRecipientUser(
	dto: NotificationRecipientUserDto
): NotificationRecipientUser {
	return {
		id: dto.id,
		email: dto.email,
		firstName: dto.first_name,
		lastName: dto.last_name,
		fullName: dto.full_name,
	};
}

export function toNotificationDelivery(
	dto: NotificationDeliveryDto
): NotificationDelivery {
	return {
		id: dto.id,
		backgroundJobId: dto.background_job_id,
		incidentId: dto.incident_id,
		recipientUserId: dto.recipient_user_id,
		userDeviceTokenId: dto.user_device_token_id,
		providerName: dto.provider_name,
		eventCode: dto.event_code,
		title: dto.title,
		body: dto.body,
		dataJson: dto.data_json ?? {},
		status: dto.status,
		providerMessageId: dto.provider_message_id,
		errorMessage: dto.error_message,
		sentAt: formatDateTimeOrNull(dto.sent_at),
		createdAt: formatDateTime(dto.created_at),
		updatedAt: formatDateTime(dto.updated_at),
		recipientUser: dto.recipient_user
			? toNotificationRecipientUser(dto.recipient_user)
			: null,
	};
}

export function toNotificationDeliveries(
	dtos: NotificationDeliveryDto[]
): NotificationDelivery[] {
	return dtos.map(toNotificationDelivery);
}

export function parseDataJson(value: string): Record<string, string> {
	const cleanedValue = value.trim();

	if (!cleanedValue) {
		return {};
	}

	const parsedValue = JSON.parse(cleanedValue) as Record<string, unknown>;
	const result: Record<string, string> = {};

	for (const [key, itemValue] of Object.entries(parsedValue)) {
		result[key] = String(itemValue);
	}

	return result;
}

function cleanOptional(value: string | null | undefined): string | null {
	const cleanedValue = value?.trim();

	return cleanedValue ? cleanedValue : null;
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
