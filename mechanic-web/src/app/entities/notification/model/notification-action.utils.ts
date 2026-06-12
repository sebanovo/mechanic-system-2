import {
	PushMessageData,
	PushNavigationTarget,
	ResolvedNotificationAction,
	ResolvedNotificationActionKey,
} from "./notification-action.types";
import {
	Notification,
	NotificationAction,
	NotificationActionKey,
} from "./notification.types";

const UUID_PATTERN =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}";

const TENANT_OFFER_DETAIL_PATTERN = new RegExp(
	`^/api/tenants/current/offers/(${UUID_PATTERN})$`
);

const TENANT_OFFER_ACCEPT_PATTERN = new RegExp(
	`^/api/tenants/current/offers/(${UUID_PATTERN})/accept$`
);

const TENANT_OFFER_REJECT_PATTERN = new RegExp(
	`^/api/tenants/current/offers/(${UUID_PATTERN})/reject$`
);

const TENANT_ASSIGNMENT_DETAIL_PATTERN = new RegExp(
	`^/api/tenants/current/assignments/(${UUID_PATTERN})$`
);

const TENANT_TRACKING_EVENTS_PATTERN = new RegExp(
	`^/api/tenants/current/assignments/(${UUID_PATTERN})/tracking-events$`
);

const CLIENT_INCIDENT_PATTERN = new RegExp(
	`^/api/clients/me/incidents/(${UUID_PATTERN})$`
);

const CLIENT_ASSIGNMENT_PATTERN = new RegExp(
	`^/api/clients/me/assignments/(${UUID_PATTERN})$`
);

const CLIENT_TRACKING_PATTERN = new RegExp(
	`^/api/clients/me/assignments/(${UUID_PATTERN})/tracking-events$`
);

export function getNotificationActions(
	notification: Notification
): ResolvedNotificationAction[] {
	const data = notification.data;

	if (!data) {
		return [];
	}

	const resolved: ResolvedNotificationAction[] = [];

	for (const [key, action] of Object.entries(data.actions ?? {})) {
		if (!action) {
			continue;
		}

		const item = resolvePersistedNotificationAction(
			key as NotificationActionKey,
			action
		);

		if (item) {
			resolved.push(item);
		}
	}

	if (resolved.length > 0) {
		return sortNotificationActions(resolved);
	}

	const fallback = resolveNotificationFallbackAction(notification);

	return fallback ? [fallback] : [];
}

export function getPrimaryNotificationAction(
	notification: Notification
): ResolvedNotificationAction | null {
	const actions = getNotificationActions(notification);

	return (
		actions.find(action =>
			[
				"view",
				"view_assignment",
				"view_incident",
				"view_tracking",
				"tracking",
			].includes(action.key)
		) ??
		actions[0] ??
		null
	);
}

export function resolvePersistedNotificationAction(
	key: NotificationActionKey,
	action: NotificationAction
): ResolvedNotificationAction | null {
	const method = action.method?.toUpperCase();

	if (method !== "GET" && method !== "POST" && method !== "PATCH") {
		return null;
	}

	if (!action.url.startsWith("/api/")) {
		return null;
	}

	if (key === "accept" && method === "PATCH") {
		const match = action.url.match(TENANT_OFFER_ACCEPT_PATTERN);

		if (!match) {
			return null;
		}

		return {
			key: "accept",
			label: "Aceptar",
			method: "PATCH",
			apiUrl: action.url,
			frontendRoute: buildTenantOfferRoute(match[1]),
			requiresConfirmation: true,
			confirmationTitle: "Aceptar solicitud",
			confirmationMessage:
				"¿Confirmas que el taller puede atender esta solicitud?",
		};
	}

	if (key === "reject" && method === "PATCH") {
		const match = action.url.match(TENANT_OFFER_REJECT_PATTERN);

		if (!match) {
			return null;
		}

		return {
			key: "reject",
			label: "Rechazar",
			method: "PATCH",
			apiUrl: action.url,
			frontendRoute: buildTenantOfferRoute(match[1]),
			requiresConfirmation: true,
			confirmationTitle: "Rechazar solicitud",
			confirmationMessage:
				"¿Confirmas que el taller no atenderá esta solicitud?",
		};
	}

	if (key === "start_route" && method === "POST") {
		const match = action.url.match(TENANT_TRACKING_EVENTS_PATTERN);

		if (!match) {
			return null;
		}

		const body = normalizeStartRouteBody(action.body);

		return {
			key: "start_route",
			label: "Iniciar ruta",
			method: "POST",
			apiUrl: action.url,
			body,
			frontendRoute: buildTenantAssignmentRoute(match[1]),
			requiresConfirmation: true,
			confirmationTitle: "Iniciar ruta",
			confirmationMessage:
				"¿Confirmas que estás saliendo hacia la ubicación del cliente?",
		};
	}

	return resolveNavigationAction(key, action);
}

export function resolvePushNavigationTarget(
	data: PushMessageData,
	actionKey?: string
): PushNavigationTarget {
	const normalizedAction = normalizePushActionKey(actionKey);

	const notificationId = data.notification_id ?? null;

	if (normalizedAction === "accept" && data.offer_id) {
		return {
			route: buildTenantOfferRoute(data.offer_id, "accept", notificationId),
			action: "accept",
			notificationId,
		};
	}

	if (normalizedAction === "reject" && data.offer_id) {
		return {
			route: buildTenantOfferRoute(data.offer_id, "reject", notificationId),
			action: "reject",
			notificationId,
		};
	}

	if (normalizedAction === "start_route" && data.assignment_id) {
		return {
			route: buildTenantAssignmentRoute(
				data.assignment_id,
				"start_route",
				notificationId
			),
			action: "start_route",
			notificationId,
		};
	}

	return {
		route: resolvePushDefaultRoute(data),
		action: null,
		notificationId,
	};
}

export function resolvePushDefaultRoute(data: PushMessageData): string {
	const audience = data.audience?.toUpperCase();

	if (audience === "TENANT_OWNER" && data.offer_id) {
		return buildTenantOfferRoute(
			data.offer_id,
			undefined,
			data.notification_id ?? null
		);
	}

	if (
		(audience === "TECHNICIAN" || audience === "TENANT_OWNER") &&
		data.assignment_id
	) {
		return buildTenantAssignmentRoute(
			data.assignment_id,
			undefined,
			data.notification_id ?? null
		);
	}

	if (audience === "CLIENT" && data.assignment_id) {
		return buildClientAssignmentRoute(
			data.assignment_id,
			data.notification_id ?? null
		);
	}

	if (audience === "CLIENT" && data.incident_id) {
		return buildClientIncidentRoute(
			data.incident_id,
			data.notification_id ?? null
		);
	}

	if (audience === "CLIENT") {
		return "/client/notifications";
	}

	return "/tenant/notifications";
}

export function getPushActionKeys(
	data: PushMessageData
): ResolvedNotificationActionKey[] {
	const actions: ResolvedNotificationActionKey[] = [];

	if (
		data.offer_id &&
		(data.accept_url ||
			data.primary_action === "RESPOND_INCIDENT_OFFER" ||
			data.type === "INCIDENT_OFFER_CREATED")
	) {
		actions.push("accept");
	}

	if (
		data.offer_id &&
		(data.reject_url ||
			data.primary_action === "RESPOND_INCIDENT_OFFER" ||
			data.type === "INCIDENT_OFFER_CREATED")
	) {
		actions.push("reject");
	}

	if (
		data.assignment_id &&
		(data.start_route_url ||
			data.primary_action === "START_ROUTE" ||
			(data.type === "ASSIGNMENT_CREATED" && data.audience === "TECHNICIAN"))
	) {
		actions.push("start_route");
	}

	return actions.slice(0, 2);
}

export function buildTenantOfferRoute(
	offerId: string,
	action?: "accept" | "reject",
	notificationId?: string | null
): string {
	const params = new URLSearchParams({
		offerId,
	});

	if (action) {
		params.set("notificationAction", action);
	}

	if (notificationId) {
		params.set("notificationId", notificationId);
	}

	return `/tenant/offers?${params.toString()}`;
}

export function buildTenantAssignmentRoute(
	assignmentId: string,
	action?: "start_route",
	notificationId?: string | null
): string {
	const params = new URLSearchParams({
		assignmentId,
	});

	if (action) {
		params.set("notificationAction", action);
	}

	if (notificationId) {
		params.set("notificationId", notificationId);
	}

	return `/tenant/assignments?${params.toString()}`;
}

export function buildClientAssignmentRoute(
	assignmentId: string,
	notificationId?: string | null
): string {
	const params = new URLSearchParams({
		assignmentId,
	});

	if (notificationId) {
		params.set("notificationId", notificationId);
	}

	return `/client/assignments?${params.toString()}`;
}

export function buildClientIncidentRoute(
	incidentId: string,
	notificationId?: string | null
): string {
	const params = new URLSearchParams({
		incidentId,
	});

	if (notificationId) {
		params.set("notificationId", notificationId);
	}

	return `/client/incidents?${params.toString()}`;
}

function resolveNavigationAction(
	key: NotificationActionKey,
	action: NotificationAction
): ResolvedNotificationAction | null {
	if (action.method !== "GET") {
		return null;
	}

	let route: string | null = null;
	let resolvedKey: ResolvedNotificationActionKey | null = null;

	const tenantOffer = action.url.match(TENANT_OFFER_DETAIL_PATTERN);

	if (tenantOffer) {
		route = buildTenantOfferRoute(tenantOffer[1]);
		resolvedKey = "view";
	}

	const tenantAssignment = action.url.match(TENANT_ASSIGNMENT_DETAIL_PATTERN);

	if (tenantAssignment) {
		route = buildTenantAssignmentRoute(tenantAssignment[1]);
		resolvedKey = "view_assignment";
	}

	const clientIncident = action.url.match(CLIENT_INCIDENT_PATTERN);

	if (clientIncident) {
		route = buildClientIncidentRoute(clientIncident[1]);
		resolvedKey = "view_incident";
	}

	const clientAssignment = action.url.match(CLIENT_ASSIGNMENT_PATTERN);

	if (clientAssignment) {
		route = buildClientAssignmentRoute(clientAssignment[1]);
		resolvedKey = "view_assignment";
	}

	const clientTracking = action.url.match(CLIENT_TRACKING_PATTERN);

	if (clientTracking) {
		route = `/client/realtime-tracking?assignmentId=${encodeURIComponent(
			clientTracking[1]
		)}`;
		resolvedKey = "view_tracking";
	}

	if (!route || !resolvedKey) {
		return null;
	}

	return {
		key: resolvedKey,
		label: getActionLabel(key),
		method: "GET",
		apiUrl: null,
		frontendRoute: route,
		requiresConfirmation: false,
	};
}

function resolveNotificationFallbackAction(
	notification: Notification
): ResolvedNotificationAction | null {
	const data = notification.data;

	if (!data) {
		return null;
	}

	if (data.audience === "TENANT_OWNER" && data.offer_id) {
		return {
			key: "view",
			label: "Ver oferta",
			method: "GET",
			apiUrl: null,
			frontendRoute: buildTenantOfferRoute(data.offer_id),
			requiresConfirmation: false,
		};
	}

	if (data.audience === "TECHNICIAN" && data.assignment_id) {
		return {
			key: "view_assignment",
			label: "Ver asignación",
			method: "GET",
			apiUrl: null,
			frontendRoute: buildTenantAssignmentRoute(data.assignment_id),
			requiresConfirmation: false,
		};
	}

	if (data.audience === "CLIENT" && data.assignment_id) {
		return {
			key: "view_assignment",
			label: "Ver asignación",
			method: "GET",
			apiUrl: null,
			frontendRoute: buildClientAssignmentRoute(data.assignment_id),
			requiresConfirmation: false,
		};
	}

	if (data.audience === "CLIENT" && data.incident_id) {
		return {
			key: "view_incident",
			label: "Ver incidente",
			method: "GET",
			apiUrl: null,
			frontendRoute: buildClientIncidentRoute(data.incident_id),
			requiresConfirmation: false,
		};
	}

	return null;
}

function normalizeStartRouteBody(
	body: Record<string, unknown> | undefined
): Record<string, unknown> {
	if (body?.["event_type"] === "EN_ROUTE") {
		return body;
	}

	return {
		event_type: "EN_ROUTE",
	};
}

function normalizePushActionKey(
	value: string | undefined
): "accept" | "reject" | "start_route" | null {
	if (value === "accept") {
		return "accept";
	}

	if (value === "reject") {
		return "reject";
	}

	if (value === "start_route") {
		return "start_route";
	}

	return null;
}

function getActionLabel(key: NotificationActionKey): string {
	const labels: Partial<Record<NotificationActionKey, string>> = {
		view: "Ver oferta",
		accept: "Aceptar",
		reject: "Rechazar",
		start_route: "Iniciar ruta",
		view_assignment: "Ver asignación",
		view_incident: "Ver incidente",
		view_tracking: "Ver seguimiento",
		tracking: "Ver seguimiento",
		cancel: "Cancelar",
	};

	return labels[key] ?? "Ver";
}

function sortNotificationActions(
	actions: ResolvedNotificationAction[]
): ResolvedNotificationAction[] {
	const order: Record<ResolvedNotificationActionKey, number> = {
		view: 1,
		view_assignment: 1,
		view_incident: 1,
		view_tracking: 1,
		tracking: 1,
		start_route: 2,
		accept: 2,
		reject: 3,
	};

	return [...actions].sort(
		(first, second) => order[first.key] - order[second.key]
	);
}
