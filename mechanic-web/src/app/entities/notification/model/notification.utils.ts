import {
	Notification,
	NOTIFICATION_STATUS_CONFIG,
	NotificationAction,
	NotificationStatus,
} from "./notification.types";

export function getNotificationStatusConfig(status: NotificationStatus) {
	return NOTIFICATION_STATUS_CONFIG[status];
}

export function isNotificationRead(notification: Notification): boolean {
	return notification.notification_status === "READ";
}

export function isNotificationUnread(notification: Notification): boolean {
	return !isNotificationRead(notification);
}

export function formatNotificationDate(
	value: string | null | undefined
): string {
	if (!value) {
		return "Sin registro";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat("es-BO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

export function formatNotificationRelativeDate(
	value: string | null | undefined
): string {
	if (!value) {
		return "Sin fecha";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value;
	}

	const differenceMs = Date.now() - date.getTime();
	const differenceSeconds = Math.floor(differenceMs / 1_000);

	if (differenceSeconds < 60) {
		return "Ahora";
	}

	const differenceMinutes = Math.floor(differenceSeconds / 60);

	if (differenceMinutes < 60) {
		return `Hace ${differenceMinutes} min`;
	}

	const differenceHours = Math.floor(differenceMinutes / 60);

	if (differenceHours < 24) {
		return `Hace ${differenceHours} h`;
	}

	const differenceDays = Math.floor(differenceHours / 24);

	if (differenceDays === 1) {
		return "Ayer";
	}

	if (differenceDays < 7) {
		return `Hace ${differenceDays} días`;
	}

	return formatNotificationDate(value);
}

export function formatNotificationType(value: string): string {
	return value
		.trim()
		.replaceAll("_", " ")
		.replaceAll("-", " ")
		.toLowerCase()
		.replace(/\b\w/g, character => character.toUpperCase());
}

export function formatNotificationData(notification: Notification): string {
	if (!notification.data) {
		return "Sin datos adicionales";
	}

	try {
		return JSON.stringify(notification.data, null, 2);
	} catch {
		return String(notification.data);
	}
}

export function notificationHasData(notification: Notification): boolean {
	return Boolean(
		notification.data && Object.keys(notification.data).length > 0
	);
}

export function getNotificationAudience(notification: Notification): string {
	return notification.data?.audience ?? "ALL";
}

export function getNotificationPrimaryAction(
	notification: Notification
): NotificationAction | null {
	const actions = notification.data?.actions;

	if (!actions) {
		return null;
	}

	return actions.view ?? actions.tracking ?? null;
}

export function getNotificationResourceReference(
	notification: Notification
): string {
	const data = notification.data;

	if (!data) {
		return "Sin recurso asociado";
	}

	if (data.incident_code) {
		return `Incidente ${data.incident_code}`;
	}

	if (data.incident_id) {
		return `Incidente ${data.incident_id}`;
	}

	if (data.assignment_id) {
		return `Asignación ${data.assignment_id}`;
	}

	if (data.offer_id) {
		return `Oferta ${data.offer_id}`;
	}

	return "Sin recurso asociado";
}

export function matchesNotificationSearch(
	notification: Notification,
	search: string
): boolean {
	const normalizedSearch = search.trim().toLowerCase();

	if (!normalizedSearch) {
		return true;
	}

	const dataText = notification.data ? JSON.stringify(notification.data) : "";

	const searchableValues = [
		notification.title,
		notification.body,
		notification.notification_type,
		formatNotificationType(notification.notification_type),
		dataText,
	];

	return searchableValues.some(value =>
		value.toLowerCase().includes(normalizedSearch)
	);
}
