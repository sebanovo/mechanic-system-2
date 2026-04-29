import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AppHttpError } from "../../../core/http/models/app-http-error.model";
import { SessionStore } from "../../../core/session/store/session.store";
import {
	toNotificationDeliveries,
	toNotificationDispatchSummary,
	toPlatformSendTestPushRequest,
	toRegisterDeviceTokenRequest,
	toUserDeviceToken,
	toUserDeviceTokens,
} from "../adapters/notification.adapter";
import {
	CountMetaDto,
	NotificationDelivery,
	NotificationDispatchSummary,
	PlatformSendTestPushFormValue,
	RegisterDeviceTokenFormValue,
	UserDeviceToken,
} from "../models/notification.types";
import { NotificationsApi } from "../services/notification.service";

@Injectable({
	providedIn: "root",
})
export class NotificationsStore {
	private readonly notificationsApi = inject(NotificationsApi);
	private readonly sessionStore = inject(SessionStore);

	readonly isPlatformAdmin = computed(() =>
		this.sessionStore.hasAnyRole(["PLATFORM_ADMIN"])
	);

	readonly currentUser = this.sessionStore.user;
	readonly currentRoleCodes = this.sessionStore.roleCodes;

	readonly deviceTokens = signal<UserDeviceToken[]>([]);
	readonly deviceTokensMeta = signal<CountMetaDto | null>(null);
	readonly deviceTokensLoading = signal(false);
	readonly deviceTokensHasLoaded = signal(false);
	readonly deviceTokensError = signal<AppHttpError | null>(null);
	readonly hasDeviceTokensError = computed(
		() => this.deviceTokensError() !== null
	);

	readonly activeDeviceTokensCount = computed(
		() => this.deviceTokens().filter(device => device.isActive).length
	);

	readonly inactiveDeviceTokensCount = computed(
		() => this.deviceTokens().filter(device => !device.isActive).length
	);

	readonly deviceTokensCount = computed(
		() => this.deviceTokensMeta()?.count ?? this.deviceTokens().length
	);

	readonly registeringDeviceToken = signal(false);
	readonly registeringDeviceTokenError = signal<AppHttpError | null>(null);
	readonly hasRegisteringDeviceTokenError = computed(
		() => this.registeringDeviceTokenError() !== null
	);

	readonly deactivatingDeviceTokenIds = signal<string[]>([]);
	readonly deactivatingDeviceTokenError = signal<AppHttpError | null>(null);
	readonly hasDeactivatingDeviceTokenError = computed(
		() => this.deactivatingDeviceTokenError() !== null
	);

	readonly testPushResult = signal<NotificationDispatchSummary | null>(null);
	readonly sendingTestPush = signal(false);
	readonly sendingTestPushError = signal<AppHttpError | null>(null);
	readonly hasSendingTestPushError = computed(
		() => this.sendingTestPushError() !== null
	);

	readonly deliveries = signal<NotificationDelivery[]>([]);
	readonly deliveriesMeta = signal<CountMetaDto | null>(null);
	readonly deliveriesLoading = signal(false);
	readonly deliveriesHasLoaded = signal(false);
	readonly deliveriesError = signal<AppHttpError | null>(null);
	readonly hasDeliveriesError = computed(() => this.deliveriesError() !== null);

	readonly deliveriesCount = computed(
		() => this.deliveriesMeta()?.count ?? this.deliveries().length
	);

	readonly sentDeliveriesCount = computed(
		() => this.deliveries().filter(delivery => delivery.status === "SENT").length
	);

	readonly failedDeliveriesCount = computed(
		() =>
			this.deliveries().filter(delivery => delivery.status === "FAILED").length
	);

	async loadMyDeviceTokens(): Promise<void> {
		this.deviceTokensLoading.set(true);
		this.deviceTokensError.set(null);

		try {
			const response = await firstValueFrom(
				this.notificationsApi.listMyDeviceTokens()
			);

			this.deviceTokens.set(toUserDeviceTokens(response.data));
			this.deviceTokensMeta.set(response.meta);
			this.deviceTokensHasLoaded.set(true);
		} catch (error) {
			this.deviceTokensError.set(error as AppHttpError);
			this.deviceTokens.set([]);
			this.deviceTokensMeta.set(null);
			this.deviceTokensHasLoaded.set(true);
		} finally {
			this.deviceTokensLoading.set(false);
		}
	}

	async registerDeviceToken(
		formValue: RegisterDeviceTokenFormValue
	): Promise<UserDeviceToken | null> {
		this.registeringDeviceToken.set(true);
		this.registeringDeviceTokenError.set(null);

		try {
			const payload = toRegisterDeviceTokenRequest(formValue);
			const dto = await firstValueFrom(
				this.notificationsApi.registerMyDeviceToken(payload)
			);
			const deviceToken = toUserDeviceToken(dto);

			this.upsertDeviceToken(deviceToken);

			return deviceToken;
		} catch (error) {
			this.registeringDeviceTokenError.set(error as AppHttpError);
			return null;
		} finally {
			this.registeringDeviceToken.set(false);
		}
	}

	async deactivateDeviceToken(
		deviceTokenId: string
	): Promise<UserDeviceToken | null> {
		this.deactivatingDeviceTokenError.set(null);
		this.addDeactivatingDeviceTokenId(deviceTokenId);

		try {
			const dto = await firstValueFrom(
				this.notificationsApi.deactivateMyDeviceToken(deviceTokenId)
			);
			const deviceToken = toUserDeviceToken(dto);

			this.upsertDeviceToken(deviceToken);

			return deviceToken;
		} catch (error) {
			this.deactivatingDeviceTokenError.set(error as AppHttpError);
			return null;
		} finally {
			this.removeDeactivatingDeviceTokenId(deviceTokenId);
		}
	}

	async sendTestPush(
		formValue: PlatformSendTestPushFormValue
	): Promise<NotificationDispatchSummary | null> {
		this.sendingTestPush.set(true);
		this.sendingTestPushError.set(null);
		this.testPushResult.set(null);

		try {
			const payload = toPlatformSendTestPushRequest(formValue);
			const dto = await firstValueFrom(
				this.notificationsApi.sendPlatformTestPush(
					formValue.userId.trim(),
					payload
				)
			);
			const result = toNotificationDispatchSummary(dto);

			this.testPushResult.set(result);

			return result;
		} catch (error) {
			this.sendingTestPushError.set(error as AppHttpError);
			return null;
		} finally {
			this.sendingTestPush.set(false);
		}
	}

	async loadIncidentDeliveries(incidentId: string): Promise<void> {
		this.deliveriesLoading.set(true);
		this.deliveriesError.set(null);

		try {
			const response = await firstValueFrom(
				this.notificationsApi.listPlatformIncidentDeliveries(incidentId)
			);

			this.deliveries.set(toNotificationDeliveries(response.data));
			this.deliveriesMeta.set(response.meta);
			this.deliveriesHasLoaded.set(true);
		} catch (error) {
			this.deliveriesError.set(error as AppHttpError);
			this.deliveries.set([]);
			this.deliveriesMeta.set(null);
			this.deliveriesHasLoaded.set(true);
		} finally {
			this.deliveriesLoading.set(false);
		}
	}

	isDeactivatingDeviceToken(deviceTokenId: string): boolean {
		return this.deactivatingDeviceTokenIds().includes(deviceTokenId);
	}

	clearDeviceTokensError(): void {
		this.deviceTokensError.set(null);
	}

	clearRegisteringDeviceTokenError(): void {
		this.registeringDeviceTokenError.set(null);
	}

	clearDeactivatingDeviceTokenError(): void {
		this.deactivatingDeviceTokenError.set(null);
	}

	clearSendingTestPushError(): void {
		this.sendingTestPushError.set(null);
	}

	clearDeliveriesError(): void {
		this.deliveriesError.set(null);
	}

	private upsertDeviceToken(deviceToken: UserDeviceToken): void {
		this.deviceTokens.update(current => {
			const exists = current.some(item => item.id === deviceToken.id);

			if (exists) {
				return current.map(item =>
					item.id === deviceToken.id ? deviceToken : item
				);
			}

			return [deviceToken, ...current];
		});

		this.deviceTokensMeta.set({
			count: this.deviceTokens().length,
		});
	}

	private addDeactivatingDeviceTokenId(deviceTokenId: string): void {
		this.deactivatingDeviceTokenIds.update(ids =>
			ids.includes(deviceTokenId) ? ids : [...ids, deviceTokenId]
		);
	}

	private removeDeactivatingDeviceTokenId(deviceTokenId: string): void {
		this.deactivatingDeviceTokenIds.update(ids =>
			ids.filter(id => id !== deviceTokenId)
		);
	}
}
