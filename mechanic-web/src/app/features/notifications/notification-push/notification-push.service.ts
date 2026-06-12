import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";
import { MessagePayload } from "firebase/messaging";
import { catchError, firstValueFrom, of } from "rxjs";

import { NotificationDeviceApi } from "../../../entities/notification-device/api/notification-device.api";
import { NotificationDevice } from "../../../entities/notification-device/model";
import { FirebaseMessagingService } from "../../../entities/notification-device/service/firebase-messaging.service";
import {
	PushMessageData,
	resolvePushNavigationTarget,
} from "../../../entities/notification/model";
import { NotificationStore } from "../../../entities/notification/store/notification.store";
import { getApplicationVersion } from "../../../shared/config/mechanic-runtime-config";

@Injectable({
	providedIn: "root",
})
export class NotificationPushService {
	private readonly router = inject(Router);

	private readonly firebaseMessaging = inject(FirebaseMessagingService);

	private readonly notificationDeviceApi = inject(NotificationDeviceApi);

	private readonly notificationStore = inject(NotificationStore);

	private readonly _registeredDevice = signal<NotificationDevice | null>(null);

	private readonly _isInitializing = signal(false);

	private readonly _isEnabling = signal(false);

	private readonly _isDisabling = signal(false);

	private readonly _initialized = signal(false);

	private initializationGeneration = 0;

	readonly registeredDevice = this._registeredDevice.asReadonly();

	readonly isInitializing = this._isInitializing.asReadonly();

	readonly isEnabling = this._isEnabling.asReadonly();

	readonly isDisabling = this._isDisabling.asReadonly();

	readonly initialized = this._initialized.asReadonly();

	readonly permissionState = this.firebaseMessaging.permissionState;

	readonly isAvailable = this.firebaseMessaging.isAvailable;

	readonly errorMessage = this.firebaseMessaging.errorMessage;

	readonly isEnabled = computed(
		() =>
			this.permissionState() === "GRANTED" &&
			this._registeredDevice()?.status === "ACTIVE"
	);

	async initializeForAuthenticatedUser(): Promise<void> {
		if (this._isInitializing() || this._initialized()) {
			return;
		}

		const generation = ++this.initializationGeneration;

		this._isInitializing.set(true);

		try {
			const supported = await this.firebaseMessaging.initialize();

			if (generation !== this.initializationGeneration) {
				return;
			}

			if (!supported) {
				return;
			}

			this.firebaseMessaging.startForegroundListener(payload => {
				this.handleForegroundMessage(payload);
			});

			if (Notification.permission === "granted") {
				await this.restoreExistingDevice();
			}

			if (generation !== this.initializationGeneration) {
				return;
			}

			this.notificationStore.loadSummaryAndLatest().subscribe();

			this._initialized.set(true);
		} catch (error) {
			console.error("[NotificationPushService] Initialization failed", error);

			this._initialized.set(false);
		} finally {
			if (generation === this.initializationGeneration) {
				this._isInitializing.set(false);
			}
		}
	}

	async enablePushNotifications(): Promise<boolean> {
		if (this._isEnabling() || this._isDisabling()) {
			return false;
		}

		this._isEnabling.set(true);

		try {
			const supported = await this.firebaseMessaging.initialize();

			if (!supported) {
				toast.error("Notificaciones no compatibles", {
					description: "Este navegador no soporta Firebase Cloud Messaging.",
				});

				return false;
			}

			const token = await this.firebaseMessaging.requestPermissionAndGetToken();

			if (!token) {
				this.handleMissingToken();

				return false;
			}

			const device = await this.registerToken(token);

			this._registeredDevice.set(device);

			this.firebaseMessaging.startForegroundListener(payload => {
				this.handleForegroundMessage(payload);
			});

			this._initialized.set(true);

			toast.success("Notificaciones activadas", {
				description: "Este navegador recibirá notificaciones push.",
			});

			return true;
		} catch (error) {
			toast.error("No se pudieron activar las notificaciones", {
				description: this.getErrorMessage(error),
			});

			return false;
		} finally {
			this._isEnabling.set(false);
		}
	}

	async disablePushNotifications(): Promise<boolean> {
		if (this._isDisabling() || this._isEnabling()) {
			return false;
		}

		this._isDisabling.set(true);

		const device = this._registeredDevice();

		let backendRevoked = !device;
		let firebaseTokenDeleted: boolean;

		try {
			if (device) {
				await firstValueFrom(
					this.notificationDeviceApi.revokeMyDevice(device.id)
				);

				backendRevoked = true;
			}

			firebaseTokenDeleted = await this.firebaseMessaging.deleteCurrentToken();

			if (backendRevoked && firebaseTokenDeleted) {
				this._registeredDevice.set(null);

				toast.success("Notificaciones desactivadas", {
					description: "Este navegador dejó de recibir notificaciones push.",
				});

				return true;
			}

			if (backendRevoked) {
				/*
				 * El backend ya no enviará mensajes al dispositivo,
				 * aunque Firebase no haya podido eliminar el token
				 * localmente.
				 */
				this._registeredDevice.set(null);

				toast.warning("Dispositivo revocado", {
					description:
						"El backend dejó de enviar notificaciones, pero el token local no pudo eliminarse.",
				});

				return true;
			}

			return false;
		} catch (error) {
			if (backendRevoked) {
				this._registeredDevice.set(null);
			}

			toast.error("No se pudieron desactivar las notificaciones", {
				description: this.getErrorMessage(error),
			});

			return false;
		} finally {
			this._isDisabling.set(false);
		}
	}

	resetAfterLogout(): void {
		/*
		 * Invalida cualquier inicialización asíncrona que siga
		 * ejecutándose cuando se produce el logout.
		 */
		this.initializationGeneration += 1;

		this.firebaseMessaging.stopForegroundListener();

		this._registeredDevice.set(null);
		this._initialized.set(false);
		this._isInitializing.set(false);
		this._isEnabling.set(false);
		this._isDisabling.set(false);

		this.notificationStore.reset();
	}

	private async restoreExistingDevice(): Promise<void> {
		const token = await this.firebaseMessaging.getExistingToken();

		if (!token) {
			this._registeredDevice.set(null);
			return;
		}

		try {
			const device = await this.registerToken(token);

			this._registeredDevice.set(device);
		} catch (error) {
			this._registeredDevice.set(null);

			console.error(
				"[NotificationPushService] Could not restore notification device",
				error
			);
		}
	}

	private registerToken(token: string): Promise<NotificationDevice> {
		return firstValueFrom(
			this.notificationDeviceApi.registerMyDevice({
				device_token: token,
				platform: "WEB",
				device_name: this.buildDeviceName(),
				app_version: getApplicationVersion(),
				os_version: this.getOperatingSystemLabel(),
			})
		);
	}

	private handleForegroundMessage(payload: MessagePayload): void {
		const data = this.normalizePushData(payload.data);

		/*
		 * La notificación ya fue persistida por el backend.
		 * El push solo indica que debemos refrescar la bandeja.
		 */
		this.notificationStore
			.refresh()
			.pipe(
				catchError(error => {
					console.error(
						"[NotificationPushService] Could not refresh notification store",
						error
					);

					return of(null);
				})
			)
			.subscribe();

		const title: string =
			data.notification_title ?? data["title"] ?? "Nueva notificación";

		const body: string =
			data.notification_body ??
			data["body"] ??
			data["message"] ??
			"Recibiste una actualización.";

		const target = resolvePushNavigationTarget(data);

		toast.info(title, {
			description: body,
			action: {
				label: this.getForegroundActionLabel(data),
				onClick: () => {
					void this.router.navigateByUrl(target.route);
				},
			},
		});
	}

	private normalizePushData(
		data: Record<string, string> | undefined
	): PushMessageData {
		if (!data) {
			return {};
		}

		const normalized: PushMessageData = {};

		for (const [key, value] of Object.entries(data)) {
			if (typeof value === "string") {
				normalized[key] = value;
			}
		}

		return normalized;
	}

	private getForegroundActionLabel(data: PushMessageData): string {
		if (data.audience === "TENANT_OWNER" && data.offer_id) {
			return "Ver oferta";
		}

		if (data.audience === "TECHNICIAN" && data.assignment_id) {
			return "Ver servicio";
		}

		if (data.audience === "CLIENT" && data.assignment_id) {
			return "Ver asignación";
		}

		if (data.audience === "CLIENT" && data.incident_id) {
			return "Ver incidente";
		}

		if (data.assignment_id) {
			return "Ver asignación";
		}

		if (data.offer_id) {
			return "Ver oferta";
		}

		if (data.incident_id) {
			return "Ver incidente";
		}

		return "Ver";
	}

	private handleMissingToken(): void {
		if (Notification.permission === "denied") {
			toast.error("Permiso de notificaciones bloqueado", {
				description:
					"Debes habilitar las notificaciones desde la configuración del navegador.",
			});

			return;
		}

		if (Notification.permission === "default") {
			toast.info("Permiso no concedido", {
				description:
					"Debes aceptar el permiso para recibir notificaciones push.",
			});

			return;
		}

		toast.error("No se pudo obtener el token", {
			description: "Firebase no devolvió un token para este navegador.",
		});
	}

	private buildDeviceName(): string {
		const browser = this.detectBrowserName();

		const platform = this.getOperatingSystemLabel() ?? "Plataforma desconocida";

		return `${browser} · ${platform}`.slice(0, 150);
	}

	private getOperatingSystemLabel(): string | undefined {
		const userAgentData = (
			navigator as Navigator & {
				userAgentData?: {
					platform?: string;
				};
			}
		).userAgentData;

		const platform = userAgentData?.platform || navigator.platform;

		return platform || undefined;
	}

	private detectBrowserName(): string {
		const userAgent = navigator.userAgent;

		if (userAgent.includes("Edg/")) {
			return "Microsoft Edge";
		}

		if (userAgent.includes("Firefox/")) {
			return "Firefox";
		}

		if (userAgent.includes("Chrome/") && !userAgent.includes("Edg/")) {
			return "Google Chrome";
		}

		if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) {
			return "Safari";
		}

		return "Navegador web";
	}

	private getErrorMessage(error: unknown): string {
		return error instanceof Error
			? error.message
			: "Ocurrió un error al configurar las notificaciones.";
	}
}
