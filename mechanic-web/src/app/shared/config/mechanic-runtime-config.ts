export type MechanicRuntimeConfig = {
	GOOGLE_MAPS_API_KEY?: string;
	GOOGLE_MAPS_MAP_ID?: string;
	WS_BASE_URL?: string;

	FIREBASE_API_KEY?: string;
	FIREBASE_AUTH_DOMAIN?: string;
	FIREBASE_PROJECT_ID?: string;
	FIREBASE_STORAGE_BUCKET?: string;
	FIREBASE_MESSAGING_SENDER_ID?: string;
	FIREBASE_APP_ID?: string;
	FIREBASE_VAPID_KEY?: string;

	APP_VERSION?: string;
};

declare global {
	var __MECHANIC_CONFIG__: MechanicRuntimeConfig | undefined;

	interface Window {
		__MECHANIC_CONFIG__?: MechanicRuntimeConfig;
	}
}

function getRuntimeConfig(): MechanicRuntimeConfig {
	return globalThis.__MECHANIC_CONFIG__ ?? {};
}

function getRequiredRuntimeValue(key: keyof MechanicRuntimeConfig): string {
	const value = getRuntimeConfig()[key];

	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`La configuración runtime ${key} no está definida.`);
	}

	return value.trim();
}

function getOptionalRuntimeValue(
	key: keyof MechanicRuntimeConfig
): string | undefined {
	const value = getRuntimeConfig()[key];

	if (typeof value !== "string" || value.trim().length === 0) {
		return undefined;
	}

	return value.trim();
}

export function getRequiredGoogleMapsApiKey(): string {
	return getRequiredRuntimeValue("GOOGLE_MAPS_API_KEY");
}

export function getGoogleMapsMapId(): string | undefined {
	return getOptionalRuntimeValue("GOOGLE_MAPS_MAP_ID");
}

export function getConfiguredWsBaseUrl(): string {
	return getOptionalRuntimeValue("WS_BASE_URL") ?? "";
}

export type FirebaseWebRuntimeConfig = {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
};

export function getFirebaseWebConfig(): FirebaseWebRuntimeConfig {
	return {
		apiKey: getRequiredRuntimeValue("FIREBASE_API_KEY"),
		authDomain: getRequiredRuntimeValue("FIREBASE_AUTH_DOMAIN"),
		projectId: getRequiredRuntimeValue("FIREBASE_PROJECT_ID"),
		storageBucket: getRequiredRuntimeValue("FIREBASE_STORAGE_BUCKET"),
		messagingSenderId: getRequiredRuntimeValue("FIREBASE_MESSAGING_SENDER_ID"),
		appId: getRequiredRuntimeValue("FIREBASE_APP_ID"),
	};
}

export function getRequiredFirebaseVapidKey(): string {
	return getRequiredRuntimeValue("FIREBASE_VAPID_KEY");
}

export function getApplicationVersion(): string {
	return getOptionalRuntimeValue("APP_VERSION") ?? "development";
}
