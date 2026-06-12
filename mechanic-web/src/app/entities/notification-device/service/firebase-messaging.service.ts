import { DestroyRef, inject, Injectable, signal } from "@angular/core";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
	deleteToken,
	getMessaging,
	getToken,
	isSupported,
	MessagePayload,
	Messaging,
	onMessage,
} from "firebase/messaging";

import {
	getFirebaseWebConfig,
	getRequiredFirebaseVapidKey,
} from "../../../shared/config/mechanic-runtime-config";

export type PushPermissionState =
	| "UNSUPPORTED"
	| "DEFAULT"
	| "DENIED"
	| "GRANTED";

@Injectable({
	providedIn: "root",
})
export class FirebaseMessagingService {
	private readonly destroyRef = inject(DestroyRef);

	private firebaseApp: FirebaseApp | null = null;

	private messaging: Messaging | null = null;

	private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

	private foregroundUnsubscribe: (() => void) | null = null;

	readonly isAvailable = signal(false);

	readonly permissionState = signal<PushPermissionState>("DEFAULT");

	readonly currentToken = signal<string | null>(null);

	readonly lastMessage = signal<MessagePayload | null>(null);

	readonly errorMessage = signal<string | null>(null);

	private initialized = false;

	constructor() {
		this.destroyRef.onDestroy(() => {
			this.stopForegroundListener();
		});
	}

	async initialize(): Promise<boolean> {
		if (this.initialized) {
			return this.isAvailable();
		}

		this.initialized = true;
		this.errorMessage.set(null);

		try {
			const supported = await isSupported();

			if (
				!supported ||
				!("serviceWorker" in navigator) ||
				!("Notification" in window)
			) {
				this.isAvailable.set(false);
				this.permissionState.set("UNSUPPORTED");

				return false;
			}

			this.firebaseApp =
				getApps().length > 0 ? getApp() : initializeApp(getFirebaseWebConfig());

			this.messaging = getMessaging(this.firebaseApp);

			this.serviceWorkerRegistration = await navigator.serviceWorker.register(
				"/firebase-messaging-sw.js",
				{
					scope: "/",
				}
			);

			await navigator.serviceWorker.ready;

			this.syncPermissionState();
			this.isAvailable.set(true);

			return true;
		} catch (error) {
			this.isAvailable.set(false);
			this.errorMessage.set(this.getErrorMessage(error));

			return false;
		}
	}

	async requestPermissionAndGetToken(): Promise<string | null> {
		const initialized = await this.initialize();

		if (!initialized || !this.messaging || !this.serviceWorkerRegistration) {
			return null;
		}

		try {
			let permission = Notification.permission;

			if (permission === "default") {
				permission = await Notification.requestPermission();
			}

			this.syncPermissionState();

			if (permission !== "granted") {
				return null;
			}

			const token = await getToken(this.messaging, {
				vapidKey: getRequiredFirebaseVapidKey(),
				serviceWorkerRegistration: this.serviceWorkerRegistration,
			});

			if (!token) {
				this.errorMessage.set(
					"Firebase no devolvió un token para este navegador."
				);

				return null;
			}

			this.currentToken.set(token);
			this.errorMessage.set(null);

			return token;
		} catch (error) {
			this.errorMessage.set(this.getErrorMessage(error));

			return null;
		}
	}

	async getExistingToken(): Promise<string | null> {
		const initialized = await this.initialize();

		if (
			!initialized ||
			!this.messaging ||
			!this.serviceWorkerRegistration ||
			Notification.permission !== "granted"
		) {
			return null;
		}

		try {
			const token = await getToken(this.messaging, {
				vapidKey: getRequiredFirebaseVapidKey(),
				serviceWorkerRegistration: this.serviceWorkerRegistration,
			});

			this.currentToken.set(token || null);

			return token || null;
		} catch (error) {
			this.errorMessage.set(this.getErrorMessage(error));

			return null;
		}
	}

	startForegroundListener(onPayload: (payload: MessagePayload) => void): void {
		if (!this.messaging) {
			return;
		}

		this.stopForegroundListener();

		this.foregroundUnsubscribe = onMessage(this.messaging, payload => {
			this.lastMessage.set(payload);
			onPayload(payload);
		});
	}

	stopForegroundListener(): void {
		this.foregroundUnsubscribe?.();
		this.foregroundUnsubscribe = null;
	}

	async deleteCurrentToken(): Promise<boolean> {
		if (!this.messaging) {
			this.currentToken.set(null);
			return true;
		}

		try {
			const deleted = await deleteToken(this.messaging);

			if (deleted) {
				this.currentToken.set(null);
			}

			return deleted;
		} catch (error) {
			this.errorMessage.set(this.getErrorMessage(error));

			return false;
		}
	}

	private syncPermissionState(): void {
		if (!("Notification" in window)) {
			this.permissionState.set("UNSUPPORTED");

			return;
		}

		const permission = Notification.permission;

		if (permission === "granted") {
			this.permissionState.set("GRANTED");
			return;
		}

		if (permission === "denied") {
			this.permissionState.set("DENIED");
			return;
		}

		this.permissionState.set("DEFAULT");
	}

	private getErrorMessage(error: unknown): string {
		return error instanceof Error
			? error.message
			: "No se pudo inicializar Firebase Messaging.";
	}
}
