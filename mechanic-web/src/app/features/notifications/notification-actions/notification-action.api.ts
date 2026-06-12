import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ResolvedNotificationAction } from "../../../entities/notification/model";
import { ApiClient } from "../../../shared/api";

@Injectable({
	providedIn: "root",
})
export class NotificationActionApi {
	private readonly apiClient = inject(ApiClient);

	execute(action: ResolvedNotificationAction): Observable<unknown> {
		if (!action.apiUrl) {
			throw new Error("La acción no contiene un endpoint ejecutable.");
		}

		if (action.key === "accept" && action.method === "PATCH") {
			return this.apiClient.patch<unknown, Record<string, never>>(
				action.apiUrl,
				{}
			);
		}

		if (action.key === "reject" && action.method === "PATCH") {
			return this.apiClient.patch<unknown, Record<string, never>>(
				action.apiUrl,
				{}
			);
		}

		if (action.key === "start_route" && action.method === "POST") {
			return this.apiClient.post<unknown, Record<string, unknown>>(
				action.apiUrl,
				action.body ?? {
					event_type: "EN_ROUTE",
				}
			);
		}

		throw new Error("Acción de notificación no permitida.");
	}
}
