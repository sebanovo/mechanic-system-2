import {
	Notification,
	NotificationAction,
	NotificationActionKey,
} from "./notification.types";

export type ExecutableNotificationActionKey =
	| "accept"
	| "reject"
	| "start_route";

export type NavigationNotificationActionKey =
	| "view"
	| "view_assignment"
	| "view_incident"
	| "view_tracking"
	| "tracking";

export type ResolvedNotificationActionKey =
	| ExecutableNotificationActionKey
	| NavigationNotificationActionKey;

export type ResolvedNotificationAction = {
	key: ResolvedNotificationActionKey;
	label: string;
	method: "GET" | "POST" | "PATCH";
	apiUrl: string | null;
	frontendRoute: string;
	body?: Record<string, unknown>;
	requiresConfirmation: boolean;
	confirmationTitle?: string;
	confirmationMessage?: string;
};

export type NotificationActionExecutionContext = {
	notification?: Notification;
	action: ResolvedNotificationAction;
};

export type PushMessageData = {
	notification_id?: string;
	notification_type?: string;
	notification_title?: string;
	notification_body?: string;
	notification_created_at?: string;

	type?: string;
	audience?: string;
	deeplink?: string;
	action_context?: string;
	primary_action?: string;

	incident_id?: string;
	offer_id?: string;
	offer_status?: string;
	assignment_id?: string;
	assignment_status?: string;

	view_url?: string;
	accept_url?: string;
	reject_url?: string;
	start_route_url?: string;
	view_assignment_url?: string;
	view_incident_url?: string;
	view_tracking_url?: string;

	start_route_body?: string;

	[key: string]: string | undefined;
};

export type PushNavigationTarget = {
	route: string;
	action: ResolvedNotificationActionKey | null;
	notificationId: string | null;
};

export type NotificationActionDescriptor = {
	key: NotificationActionKey;
	action: NotificationAction;
};
