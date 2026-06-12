import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	Notification,
	NotificationBulkActionData,
	NotificationListData,
	NotificationListQuery,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class NotificationApi {
	private readonly apiClient = inject(ApiClient);
	private readonly basePath = "/notifications";

	listMyNotifications(
		query?: NotificationListQuery
	): Observable<NotificationListData> {
		return this.apiClient.get<NotificationListData>(this.basePath, query);
	}

	markMyNotificationAsRead(notificationId: string): Observable<Notification> {
		return this.apiClient.patch<Notification, Record<string, never>>(
			`${this.basePath}/${notificationId}/read`,
			{}
		);
	}

	markAllMyNotificationsAsRead(): Observable<NotificationBulkActionData> {
		return this.apiClient.patch<
			NotificationBulkActionData,
			Record<string, never>
		>(`${this.basePath}/read-all`, {});
	}
}
