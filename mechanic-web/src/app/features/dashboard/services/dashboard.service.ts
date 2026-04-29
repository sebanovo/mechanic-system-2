import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CountMetaDto,
	PlatformMetricsDto,
	ProviderCandidateDto,
	ProviderIncidentDto,
	ProviderOperationDto,
	ProviderProfileDto,
	ProviderServiceDto,
} from "../models/dashboard.types";

@Injectable({
	providedIn: "root",
})
export class DashboardApi {
	private readonly http = inject(HttpClient);

	getPlatformMetrics(): Observable<PlatformMetricsDto> {
		return this.http
			.get<ApiResponse<PlatformMetricsDto>>("/api/system/platform/metrics")
			.pipe(map(response => response.data));
	}

	createPlatformMetricsSnapshot(): Observable<Record<string, unknown>> {
		return this.http
			.post<ApiResponse<Record<string, unknown>>>(
				"/api/system/platform/metrics/snapshot",
				{}
			)
			.pipe(map(response => response.data));
	}

	getProviderProfile(): Observable<ProviderProfileDto> {
		return this.http
			.get<ApiResponse<ProviderProfileDto>>("/api/providers/me/profile")
			.pipe(map(response => response.data));
	}

	getProviderAvailableCandidates(): Observable<
		ApiResponse<ProviderCandidateDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<ProviderCandidateDto[], CountMetaDto>>(
			"/api/assignment/provider/me/available"
		);
	}

	getProviderActiveOperations(): Observable<
		ApiResponse<ProviderOperationDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<ProviderOperationDto[], CountMetaDto>>(
			"/api/operations/provider/me/active"
		);
	}

	getProviderServices(): Observable<ApiResponse<ProviderServiceDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<ProviderServiceDto[], CountMetaDto>>(
			"/api/catalog/me/services"
		);
	}

	getProviderIncidents(): Observable<ApiResponse<ProviderIncidentDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<ProviderIncidentDto[], CountMetaDto>>(
			"/api/incidents/provider/me"
		);
	}
}
