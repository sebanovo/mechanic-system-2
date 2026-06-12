import { DestroyRef, inject, Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, firstValueFrom } from "rxjs";

import { NotificationApi } from "../../../entities/notification/api/notification.api";
import {
	buildTenantAssignmentRoute,
	buildTenantOfferRoute,
	Notification,
	ResolvedNotificationAction,
} from "../../../entities/notification/model";
import { NotificationActionService } from "./notification-action.service";

@Injectable({
	providedIn: "root",
})
export class NotificationActionBootstrapService {
	private readonly router = inject(Router);

	private readonly activatedRoute = inject(ActivatedRoute);

	private readonly notificationApi = inject(NotificationApi);

	private readonly actionService = inject(NotificationActionService);

	private readonly destroyRef = inject(DestroyRef);

	private initialized = false;
	private processing = false;

	initialize(): void {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		const subscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				void this.processCurrentUrl();
			});

		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe();
		});

		void this.processCurrentUrl();
	}

	private async processCurrentUrl(): Promise<void> {
		if (this.processing) {
			return;
		}

		const tree = this.router.parseUrl(this.router.url);

		const actionKey = tree.queryParams["notificationAction"];

		const notificationId = tree.queryParams["notificationId"];

		if (
			typeof actionKey !== "string" ||
			!["accept", "reject", "start_route"].includes(actionKey)
		) {
			return;
		}

		this.processing = true;

		try {
			const notification = await this.findNotification(notificationId);

			const action = this.buildActionFromQuery(actionKey, tree.queryParams);

			await this.removeActionQueryParams();

			if (!action) {
				return;
			}

			await this.actionService.handle(action, notification ?? undefined);
		} finally {
			this.processing = false;
		}
	}

	private buildActionFromQuery(
		actionKey: string,
		params: Record<string, unknown>
	): ResolvedNotificationAction | null {
		if (actionKey === "accept" || actionKey === "reject") {
			const offerId = params["offerId"];

			if (typeof offerId !== "string") {
				return null;
			}

			return {
				key: actionKey,
				label: actionKey === "accept" ? "Aceptar" : "Rechazar",
				method: "PATCH",
				apiUrl: `/tenants/current/offers/${offerId}/${actionKey}`,
				frontendRoute: buildTenantOfferRoute(offerId),
				requiresConfirmation: true,
				confirmationTitle:
					actionKey === "accept" ? "Aceptar solicitud" : "Rechazar solicitud",
				confirmationMessage:
					actionKey === "accept"
						? "¿Confirmas que el taller puede atender esta solicitud?"
						: "¿Confirmas que el taller no atenderá esta solicitud?",
			};
		}

		if (actionKey === "start_route") {
			const assignmentId = params["assignmentId"];

			if (typeof assignmentId !== "string") {
				return null;
			}

			return {
				key: "start_route",
				label: "Iniciar ruta",
				method: "POST",
				apiUrl: `/tenants/current/assignments/${assignmentId}/tracking-events`,
				body: {
					event_type: "EN_ROUTE",
				},
				frontendRoute: buildTenantAssignmentRoute(assignmentId),
				requiresConfirmation: true,
				confirmationTitle: "Iniciar ruta",
				confirmationMessage:
					"¿Confirmas que estás saliendo hacia la ubicación del cliente?",
			};
		}

		return null;
	}

	private async findNotification(
		notificationId: unknown
	): Promise<Notification | null> {
		if (typeof notificationId !== "string") {
			return null;
		}

		// El backend no expone GET /notifications/{id}.
		// Se busca en las últimas notificaciones del usuario.
		try {
			const response = await firstValueFrom(
				this.notificationApi.listMyNotifications({
					page: 1,
					page_size: 50,
				})
			);

			return response.items.find(item => item.id === notificationId) ?? null;
		} catch {
			return null;
		}
	}

	private async removeActionQueryParams(): Promise<void> {
		const tree = this.router.parseUrl(this.router.url);

		delete tree.queryParams["notificationAction"];

		await this.router.navigateByUrl(tree, {
			replaceUrl: true,
		});
	}
}
