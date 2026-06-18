import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientNotification } from "../../../entities/client/model";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";

@Component({
	selector: "app-client-notifications-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader],
	templateUrl: "./client-notifications.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientNotificationsPage {
	private readonly clientApi = inject(ClientApi);

	protected readonly notifications = signal<ClientNotification[]>([]);
	protected readonly loading = signal(false);
	protected readonly error = signal<string | null>(null);
	protected readonly total = signal(0);

	constructor() {
		void this.load();
	}

	protected async load(): Promise<void> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const response = await firstValueFrom(
				this.clientApi.listMyNotifications({ page: 1, page_size: 20 })
			);

			this.notifications.set(response.items);
			this.total.set(response.pagination.total);
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected async markAllAsRead(): Promise<void> {
		this.error.set(null);
		this.loading.set(true);

		try {
			await firstValueFrom(this.clientApi.markAllMyNotificationsAsRead());
			await this.load();
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
			this.loading.set(false);
		}
	}

	protected async markAsRead(notificationId: string): Promise<void> {
		this.error.set(null);
		this.loading.set(true);

		try {
			await firstValueFrom(this.clientApi.markMyNotificationAsRead(notificationId));
			await this.load();
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
			this.loading.set(false);
		}
	}

	protected formatDate(value: string | null): string {
		if (!value) {
			return "Sin registro";
		}

		return new Intl.DateTimeFormat("es-BO", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(new Date(value));
	}

	protected statusLabel(value: string): string {
		return value || "Sin estado";
	}
}

