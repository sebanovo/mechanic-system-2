import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CountMetaDto,
	TrackingHistoryItemDto,
	TrackingLiveDto,
	TrackingOperationDto,
	UpdateTrackingLocationRequest,
} from "../models/tracking.types";

@Injectable({
	providedIn: "root",
})
export class TrackingApi {
	private readonly http = inject(HttpClient);

	getActiveOperations(): Observable<
		ApiResponse<TrackingOperationDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<TrackingOperationDto[], CountMetaDto>>(
			"/api/operations/provider/me/active"
		);
	}

	getProviderLiveTracking(incidentId: string): Observable<TrackingLiveDto> {
		return this.http
			.get<ApiResponse<TrackingLiveDto>>(
				`/api/tracking/provider/incidents/${incidentId}/live`
			)
			.pipe(map(response => response.data));
	}

	getProviderTrackingHistory(
		incidentId: string
	): Observable<ApiResponse<TrackingHistoryItemDto[], CountMetaDto>> {
		return this.http.get<
			ApiResponse<TrackingHistoryItemDto[], CountMetaDto>
		>(`/api/tracking/provider/incidents/${incidentId}/history`);
	}

	updateProviderLocation(
		incidentId: string,
		payload: UpdateTrackingLocationRequest
	): Observable<TrackingLiveDto> {
		return this.http
			.post<ApiResponse<TrackingLiveDto>>(
				`/api/tracking/provider/incidents/${incidentId}/location`,
				payload
			)
			.pipe(map(response => response.data));
	}

	refreshProviderRoute(incidentId: string): Observable<TrackingLiveDto> {
		return this.http
			.post<ApiResponse<TrackingLiveDto>>(
				`/api/tracking/provider/incidents/${incidentId}/refresh-route`,
				{}
			)
			.pipe(map(response => response.data));
	}
}
