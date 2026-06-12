import { Notification } from "./notification.types";

export function resolveNotificationFrontendRoute(
	notification: Notification
): string | null {
	const data = notification.data;

	if (!data) {
		return null;
	}

	if (data.assignment_id) {
		return "/tenant/assignments";
	}

	if (data.offer_id) {
		return "/tenant/offers";
	}

	if (data.incident_id) {
		return "/tenant/incidents";
	}

	return resolveBackendActionRoute(data.actions?.view?.url);
}

function resolveBackendActionRoute(
	backendUrl: string | undefined
): string | null {
	if (!backendUrl) {
		return null;
	}

	if (backendUrl.includes("/tenants/current/offers/")) {
		return "/tenant/offers";
	}

	if (backendUrl.includes("/tenants/current/assignments/")) {
		return "/tenant/assignments";
	}

	if (backendUrl.includes("/tenants/current/incidents/")) {
		return "/tenant/incidents";
	}

	return null;
}
