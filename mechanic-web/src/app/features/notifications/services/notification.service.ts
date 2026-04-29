import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CountMetaDto,
	NotificationDeliveryDto,
	NotificationDispatchSummaryDto,
	PlatformSendTestPushRequest,
	RegisterDeviceTokenRequest,
	UserDeviceTokenDto,
} from "../models/notification.types";

@Injectable({
	providedIn: "root",
})
export class NotificationsApi {
	private readonly http = inject(HttpClient);

	registerMyDeviceToken(
		payload: RegisterDeviceTokenRequest
	): Observable<UserDeviceTokenDto> {
		return this.http
			.post<ApiResponse<UserDeviceTokenDto>>(
				"/api/notifications/me/devices/register",
				payload
			)
			.pipe(map(response => response.data));
	}

	listMyDeviceTokens(): Observable<
		ApiResponse<UserDeviceTokenDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<UserDeviceTokenDto[], CountMetaDto>>(
			"/api/notifications/me/devices"
		);
	}

	deactivateMyDeviceToken(deviceTokenId: string): Observable<UserDeviceTokenDto> {
		return this.http
			.delete<ApiResponse<UserDeviceTokenDto>>(
				`/api/notifications/me/devices/${deviceTokenId}`
			)
			.pipe(map(response => response.data));
	}

	sendPlatformTestPush(
		userId: string,
		payload: PlatformSendTestPushRequest
	): Observable<NotificationDispatchSummaryDto> {
		return this.http
			.post<ApiResponse<NotificationDispatchSummaryDto>>(
				`/api/notifications/platform/users/${userId}/test`,
				payload
			)
			.pipe(map(response => response.data));
	}

	listPlatformIncidentDeliveries(
		incidentId: string
	): Observable<ApiResponse<NotificationDeliveryDto[], CountMetaDto>> {
		return this.http.get<
			ApiResponse<NotificationDeliveryDto[], CountMetaDto>
		>(`/api/notifications/platform/incidents/${incidentId}/deliveries`);
	}
}
