import { StatusConfig } from "../../../shared/types";

export type NotificationStatus = "PENDING" | "SENT" | "FAILED" | "READ";

export type NotificationAudience =
	| "SUPERADMIN"
	| "TENANT_OWNER"
	| "TECHNICIAN"
	| "CLIENT"
	| "ALL";

export type NotificationHttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export type NotificationActionKey =
	| "view"
	| "accept"
	| "reject"
	| "start_route"
	| "view_assignment"
	| "view_incident"
	| "view_tracking"
	| "tracking"
	| "cancel";

export type NotificationAction = {
	method: NotificationHttpMethod;
	url: string;
	body?: Record<string, unknown>;
	label?: string;
};

export type NotificationActions = Partial<
	Record<NotificationActionKey, NotificationAction>
>;

export type NotificationData = {
	type?: string;
	title?: string;
	message?: string;
	audience?: NotificationAudience;
	deeplink?: string;
	action_context?: string;

	incident_id?: string;
	incident_code?: string;
	incident_title?: string;
	incident_status?: string;
	incident_priority?: string;

	offer_id?: string;
	offer_status?: string;
	assignment_id?: string;
	assignment_status?: string;
	technician_id?: string;
	provider_profile_id?: string;
	customer_id?: string;
	vehicle_id?: string;
	service_catalog_id?: string;

	service_name?: string;
	service_code?: string;
	service_category?: string;

	customer_name?: string;
	technician_name?: string;
	provider_name?: string;

	vehicle_label?: string;
	vehicle_plate?: string;
	address_text?: string | null;

	status?: string;
	status_label?: string;
	priority_label?: string;

	actions?: NotificationActions;

	[key: string]: unknown;
};

export type Notification = {
	id: string;
	recipient_user_id: string;
	tenant_id: string | null;
	notification_type: string;
	title: string;
	body: string;
	data: NotificationData | null;
	notification_status: NotificationStatus;
	provider_message_id: string | null;
	error_message: string | null;
	sent_at: string | null;
	read_at: string | null;
	created_at: string;
	updated_at: string;
};

export type NotificationPagination = {
	page: number;
	page_size: number;
	total: number;
	total_pages: number;
	has_next?: boolean;
	has_previous?: boolean;
};

export type NotificationListData = {
	items: Notification[];
	pagination: NotificationPagination;
};

export type NotificationListQuery = {
	page?: number;
	page_size?: number;
	status?: NotificationStatus | "";
};

export type NotificationBulkActionData = {
	updated_count: number;
};

export type NotificationSummary = {
	total: number;
	unread: number;
	read: number;
	pending: number;
	sent: number;
	failed: number;
};

export const NOTIFICATION_STATUS_OPTIONS: {
	value: NotificationStatus | "";
	label: string;
}[] = [
	{
		value: "",
		label: "Todas",
	},
	{
		value: "SENT",
		label: "Enviadas",
	},
	{
		value: "PENDING",
		label: "Pendientes",
	},
	{
		value: "FAILED",
		label: "Fallidas",
	},
	{
		value: "READ",
		label: "Leídas",
	},
];

export const NOTIFICATION_STATUS_CONFIG: Record<
	NotificationStatus,
	StatusConfig<NotificationStatus>
> = {
	PENDING: {
		value: "PENDING",
		label: "Pendiente",
		description: "La notificación está pendiente de procesamiento.",
		tone: "warning",
		order: 1,
	},
	SENT: {
		value: "SENT",
		label: "No leída",
		description: "La notificación fue enviada y todavía no fue leída.",
		tone: "info",
		order: 2,
	},
	FAILED: {
		value: "FAILED",
		label: "No leída",
		description:
			"El push falló, pero la notificación permanece disponible en la bandeja.",
		tone: "destructive",
		order: 3,
	},
	READ: {
		value: "READ",
		label: "Leída",
		description: "La notificación ya fue revisada.",
		tone: "muted",
		order: 4,
	},
};

export function createEmptyNotificationPagination(): NotificationPagination {
	return {
		page: 1,
		page_size: 10,
		total: 0,
		total_pages: 1,
		has_next: false,
		has_previous: false,
	};
}

export function createEmptyNotificationSummary(): NotificationSummary {
	return {
		total: 0,
		unread: 0,
		read: 0,
		pending: 0,
		sent: 0,
		failed: 0,
	};
}
