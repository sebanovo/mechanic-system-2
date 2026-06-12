import { getConfiguredWsBaseUrl } from "../../../shared/config/mechanic-runtime-config";

export function buildRealtimeTrackingWsUrl(relativeWsUrl: string): string {
	const trimmedUrl = relativeWsUrl.trim();

	if (trimmedUrl.startsWith("ws://") || trimmedUrl.startsWith("wss://")) {
		return trimmedUrl;
	}

	if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
		const absoluteUrl = new URL(trimmedUrl);

		absoluteUrl.protocol = absoluteUrl.protocol === "https:" ? "wss:" : "ws:";

		return absoluteUrl.toString();
	}

	const normalizedPath = trimmedUrl.startsWith("/")
		? trimmedUrl
		: `/${trimmedUrl}`;

	const configuredBaseUrl = getConfiguredWsBaseUrl();

	const baseUrl =
		normalizeWsBaseUrl(configuredBaseUrl) ?? buildDefaultWsBaseUrl();

	return new URL(normalizedPath, baseUrl).toString();
}

function buildDefaultWsBaseUrl(): string {
	const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

	return `${protocol}//${window.location.host}`;
}

function normalizeWsBaseUrl(value: string | null): string | null {
	if (!value) {
		return null;
	}

	const trimmed = value.trim();

	if (!trimmed) {
		return null;
	}

	if (trimmed.startsWith("ws://") || trimmed.startsWith("wss://")) {
		return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
	}

	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
		const url = new URL(trimmed);

		url.protocol = url.protocol === "https:" ? "wss:" : "ws:";

		return url.toString();
	}

	throw new Error(
		"WS_BASE_URL debe comenzar con ws://, wss://, http:// o https://."
	);
}
