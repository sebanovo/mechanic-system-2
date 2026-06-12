import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	NotificationDevice,
	NotificationDeviceCreateRequest,
	NotificationDeviceListData,
	NotificationDeviceListQuery,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class NotificationDeviceApi {
	private readonly apiClient = inject(ApiClient);

	private readonly basePath = "/notification/devices";

	listMyDevices(
		query?: NotificationDeviceListQuery
	): Observable<NotificationDeviceListData> {
		return this.apiClient.get<NotificationDeviceListData>(this.basePath, query);
	}

	registerMyDevice(
		payload: NotificationDeviceCreateRequest
	): Observable<NotificationDevice> {
		return this.apiClient.post<
			NotificationDevice,
			NotificationDeviceCreateRequest
		>(this.basePath, payload);
	}

	revokeMyDevice(deviceId: string): Observable<NotificationDevice> {
		return this.apiClient.delete<NotificationDevice>(
			`${this.basePath}/${deviceId}`
		);
	}
}
