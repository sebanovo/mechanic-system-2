/* global firebase */

importScripts("/mechanic-config.js");

importScripts(
	"https://www.gstatic.com/firebasejs/12.7.0/firebase-app-compat.js"
);

importScripts(
	"https://www.gstatic.com/firebasejs/12.7.0/firebase-messaging-compat.js"
);

const runtimeConfig = globalThis.__MECHANIC_CONFIG__ || {};

firebase.initializeApp({
	apiKey: runtimeConfig.FIREBASE_API_KEY,
	authDomain: runtimeConfig.FIREBASE_AUTH_DOMAIN,
	projectId: runtimeConfig.FIREBASE_PROJECT_ID,
	storageBucket: runtimeConfig.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: runtimeConfig.FIREBASE_MESSAGING_SENDER_ID,
	appId: runtimeConfig.FIREBASE_APP_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
	const data = normalizeData(payload.data || {});

	const title =
		payload.notification?.title ||
		data.notification_title ||
		data.title ||
		"Nueva notificación";

	const body =
		payload.notification?.body ||
		data.notification_body ||
		data.body ||
		data.message ||
		"Recibiste una actualización.";

	const actions = buildSystemActions(data);

	const targetRoute = resolveTargetRoute(data, null);

	const options = {
		body,
		icon: "/icons/icon-192x192.png",
		badge: "/icons/icon-72x72.png",
		tag:
			data.notification_id ||
			data.offer_id ||
			data.assignment_id ||
			data.incident_id ||
			"mechanic-notification",
		renotify: true,
		actions,
		data: {
			...data,
			target_route: targetRoute,
		},
	};

	return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", event => {
	event.notification.close();

	const data = normalizeData(event.notification.data || {});

	const route = resolveTargetRoute(data, event.action || null);

	event.waitUntil(openOrFocusClient(route));
});

function buildSystemActions(data) {
	const actions = [];

	const isOffer =
		Boolean(data.offer_id) &&
		(data.type === "INCIDENT_OFFER_CREATED" ||
			data.notification_type === "INCIDENT_OFFER_CREATED" ||
			data.accept_url ||
			data.reject_url ||
			data.primary_action === "RESPOND_INCIDENT_OFFER");

	if (isOffer) {
		actions.push({
			action: "accept",
			title: "Aceptar",
		});

		actions.push({
			action: "reject",
			title: "Rechazar",
		});

		return actions;
	}

	const isTechnicianAssignment =
		Boolean(data.assignment_id) &&
		data.audience === "TECHNICIAN" &&
		(data.type === "ASSIGNMENT_CREATED" ||
			data.notification_type === "ASSIGNMENT_CREATED" ||
			data.start_route_url ||
			data.primary_action === "START_ROUTE");

	if (isTechnicianAssignment) {
		actions.push({
			action: "start_route",
			title: "Iniciar ruta",
		});
	}

	return actions;
}

function resolveTargetRoute(data, action) {
	const notificationId = data.notification_id || "";

	if (action === "accept" && data.offer_id) {
		return buildRoute("/tenant/offers", {
			offerId: data.offer_id,
			notificationAction: "accept",
			notificationId,
		});
	}

	if (action === "reject" && data.offer_id) {
		return buildRoute("/tenant/offers", {
			offerId: data.offer_id,
			notificationAction: "reject",
			notificationId,
		});
	}

	if (action === "start_route" && data.assignment_id) {
		return buildRoute("/tenant/assignments", {
			assignmentId: data.assignment_id,
			notificationAction: "start_route",
			notificationId,
		});
	}

	if (data.audience === "TENANT_OWNER" && data.offer_id) {
		return buildRoute("/tenant/offers", {
			offerId: data.offer_id,
			notificationId,
		});
	}

	if (
		(data.audience === "TECHNICIAN" || data.audience === "TENANT_OWNER") &&
		data.assignment_id
	) {
		return buildRoute("/tenant/assignments", {
			assignmentId: data.assignment_id,
			notificationId,
		});
	}

	if (data.audience === "CLIENT" && data.assignment_id) {
		return buildRoute("/client/assignments", {
			assignmentId: data.assignment_id,
			notificationId,
		});
	}

	if (data.audience === "CLIENT" && data.incident_id) {
		return buildRoute("/client/incidents", {
			incidentId: data.incident_id,
			notificationId,
		});
	}

	return data.audience === "CLIENT"
		? "/client/notifications"
		: "/tenant/notifications";
}

function buildRoute(path, params) {
	const url = new URL(path, self.location.origin);

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== "") {
			url.searchParams.set(key, String(value));
		}
	}

	return url.pathname + url.search;
}

function normalizeData(data) {
	const normalized = {};

	for (const [key, value] of Object.entries(data)) {
		if (value === undefined || value === null) {
			continue;
		}

		normalized[key] = String(value);
	}

	return normalized;
}

async function openOrFocusClient(targetPath) {
	const absoluteUrl = new URL(targetPath, self.location.origin).href;

	const clientList = await clients.matchAll({
		type: "window",
		includeUncontrolled: true,
	});

	for (const client of clientList) {
		if (!("focus" in client)) {
			continue;
		}

		await client.focus();

		if ("navigate" in client) {
			return client.navigate(absoluteUrl);
		}

		return client;
	}

	if (clients.openWindow) {
		return clients.openWindow(absoluteUrl);
	}

	return undefined;
}
