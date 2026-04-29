export type DevicePlatform = "ANDROID" | "IOS" | "WEB";

export type NotificationDeliveryStatus =
	| "PENDING"
	| "SENT"
	| "FAILED"
	| "SKIPPED"
	| "CANCELLED"
	| string;

export type RegisterDeviceTokenRequest = {
	device_token: string;
	device_platform: DevicePlatform;
	device_label: string | null;
	app_role: string | null;
};

export type RegisterDeviceTokenFormValue = {
	deviceToken: string;
	devicePlatform: DevicePlatform;
	deviceLabel: string | null;
	appRole: string | null;
};

export type UserDeviceTokenDto = {
	id: string;
	user_id: string;
	device_platform: DevicePlatform | string;
	device_label: string | null;
	app_role: string | null;
	push_provider_name: string | null;
	is_active: boolean;
	last_seen_at: string;
	created_at: string;
	updated_at: string;
};

export type UserDeviceToken = {
	id: string;
	userId: string;
	devicePlatform: string;
	deviceLabel: string | null;
	appRole: string | null;
	pushProviderName: string | null;
	isActive: boolean;
	lastSeenAt: string;
	createdAt: string;
	updatedAt: string;
};

export type PlatformSendTestPushRequest = {
	title: string;
	body: string;
	data: Record<string, string>;
	incident_id: string | null;
};

export type PlatformSendTestPushFormValue = {
	userId: string;
	title: string;
	body: string;
	dataJsonText: string;
	incidentId: string | null;
};

export type NotificationDispatchSummaryDto = {
	event_code: string;
	incident_id: string | null;
	target_user_id: string;
	active_device_tokens_count: number;
	enqueued_jobs_count: number;
};

export type NotificationDispatchSummary = {
	eventCode: string;
	incidentId: string | null;
	targetUserId: string;
	activeDeviceTokensCount: number;
	enqueuedJobsCount: number;
};

export type NotificationRecipientUserDto = {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	full_name: string;
};

export type NotificationRecipientUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	fullName: string;
};

export type NotificationDeliveryDto = {
	id: string;
	background_job_id: string | null;
	incident_id: string | null;
	recipient_user_id: string | null;
	user_device_token_id: string | null;
	provider_name: string | null;
	event_code: string;
	title: string;
	body: string;
	data_json: Record<string, unknown> | null;
	status: NotificationDeliveryStatus;
	provider_message_id: string | null;
	error_message: string | null;
	sent_at: string | null;
	created_at: string;
	updated_at: string;
	recipient_user: NotificationRecipientUserDto | null;
};

export type NotificationDelivery = {
	id: string;
	backgroundJobId: string | null;
	incidentId: string | null;
	recipientUserId: string | null;
	userDeviceTokenId: string | null;
	providerName: string | null;
	eventCode: string;
	title: string;
	body: string;
	dataJson: Record<string, unknown>;
	status: NotificationDeliveryStatus;
	providerMessageId: string | null;
	errorMessage: string | null;
	sentAt: string | null;
	createdAt: string;
	updatedAt: string;
	recipientUser: NotificationRecipientUser | null;
};

export type CountMetaDto = {
	count: number;
};

export type ApiResponse<TData, TMeta = null> = {
	success: boolean;
	message: string;
	data: TData;
	meta: TMeta;
};
