import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";
import { finalize, firstValueFrom } from "rxjs";

import {
	Notification,
	ResolvedNotificationAction,
} from "../../../entities/notification/model";
import { NotificationStore } from "../../../entities/notification/store/notification.store";
import { getApiErrorMessage } from "../../../shared/api";
import { NotificationActionApi } from "./notification-action.api";

@Injectable({
	providedIn: "root",
})
export class NotificationActionService {
	private readonly router = inject(Router);

	private readonly actionApi = inject(NotificationActionApi);

	private readonly notificationStore = inject(NotificationStore);

	readonly executingActionKey = signal<string | null>(null);

	async handle(
		action: ResolvedNotificationAction,
		notification?: Notification
	): Promise<boolean> {
		if (!action.requiresConfirmation) {
			await this.navigate(action);
			await this.markNotificationAsRead(notification);

			return true;
		}

		const confirmed = window.confirm(
			[action.confirmationTitle, "", action.confirmationMessage]
				.filter(Boolean)
				.join("\n")
		);

		if (!confirmed) {
			return false;
		}

		return this.execute(action, notification);
	}

	async execute(
		action: ResolvedNotificationAction,
		notification?: Notification
	): Promise<boolean> {
		if (this.executingActionKey() !== null) {
			return false;
		}

		this.executingActionKey.set(action.key);

		try {
			await firstValueFrom(
				this.actionApi.execute(action).pipe(
					finalize(() => {
						this.executingActionKey.set(null);
					})
				)
			);

			await this.markNotificationAsRead(notification);

			toast.success(this.successTitle(action));

			await this.navigate(action);

			this.notificationStore.refresh().subscribe();

			return true;
		} catch (error) {
			this.executingActionKey.set(null);

			toast.error("No se pudo completar la acción", {
				description: getApiErrorMessage(error),
			});

			return false;
		}
	}

	private async navigate(action: ResolvedNotificationAction): Promise<void> {
		await this.router.navigateByUrl(action.frontendRoute);
	}

	private async markNotificationAsRead(
		notification?: Notification
	): Promise<void> {
		if (!notification || notification.notification_status === "READ") {
			return;
		}

		try {
			await firstValueFrom(this.notificationStore.markAsRead(notification.id));
		} catch {
			// La acción principal no debe fallar porque marcar
			// como leída haya fallado.
		}
	}

	private successTitle(action: ResolvedNotificationAction): string {
		if (action.key === "accept") {
			return "Solicitud aceptada";
		}

		if (action.key === "reject") {
			return "Solicitud rechazada";
		}

		if (action.key === "start_route") {
			return "Ruta iniciada";
		}

		return "Acción completada";
	}
}
