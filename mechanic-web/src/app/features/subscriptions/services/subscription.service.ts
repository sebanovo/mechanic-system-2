import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	ClientIncidentDto,
	ClientPlanSubscriptionDto,
	ClientSubscribeToPlanRequest,
	CountMetaDto,
	IncidentCoveragePreviewDto,
	IncidentSubscriptionApplicationDto,
	ProviderPlanCoverageUpsertRequest,
	ProviderPlanDto,
	ProviderPlanUpsertRequest,
} from "../models/subscription.types";

@Injectable({
	providedIn: "root",
})
export class SubscriptionApi {
	private readonly http = inject(HttpClient);

	listMyProviderPlans(
		includeInactive: boolean
	): Observable<ApiResponse<ProviderPlanDto[], CountMetaDto>> {
		const params = new HttpParams().set("include_inactive", includeInactive);

		return this.http.get<ApiResponse<ProviderPlanDto[], CountMetaDto>>(
			"/api/subscriptions/provider/me/plans",
			{ params }
		);
	}

	createMyProviderPlan(
		payload: ProviderPlanUpsertRequest
	): Observable<ProviderPlanDto> {
		return this.http
			.post<ApiResponse<ProviderPlanDto>>(
				"/api/subscriptions/provider/me/plans",
				payload
			)
			.pipe(map(response => response.data));
	}

	updateMyProviderPlan(
		planId: string,
		payload: ProviderPlanUpsertRequest
	): Observable<ProviderPlanDto> {
		return this.http
			.put<ApiResponse<ProviderPlanDto>>(
				`/api/subscriptions/provider/me/plans/${planId}`,
				payload
			)
			.pipe(map(response => response.data));
	}

	upsertMyProviderPlanCoverage(
		planId: string,
		payload: ProviderPlanCoverageUpsertRequest
	): Observable<ProviderPlanCoverageUpsertRequest> {
		return this.http
			.post<ApiResponse<ProviderPlanCoverageUpsertRequest>>(
				`/api/subscriptions/provider/me/plans/${planId}/coverages`,
				payload
			)
			.pipe(map(response => response.data));
	}

	listProviderPlansForClient(
		providerId: string
	): Observable<ApiResponse<ProviderPlanDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<ProviderPlanDto[], CountMetaDto>>(
			`/api/subscriptions/client/providers/${providerId}/plans`
		);
	}

	subscribeClientToPlan(
		planId: string,
		payload: ClientSubscribeToPlanRequest
	): Observable<ClientPlanSubscriptionDto> {
		return this.http
			.post<ApiResponse<ClientPlanSubscriptionDto>>(
				`/api/subscriptions/client/plans/${planId}/subscribe`,
				payload
			)
			.pipe(map(response => response.data));
	}

	listMyClientSubscriptions(): Observable<
		ApiResponse<ClientPlanSubscriptionDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<ClientPlanSubscriptionDto[], CountMetaDto>>(
			"/api/subscriptions/client/me/subscriptions"
		);
	}

	previewIncidentCoverage(
		incidentId: string
	): Observable<IncidentCoveragePreviewDto> {
		return this.http
			.get<ApiResponse<IncidentCoveragePreviewDto>>(
				`/api/subscriptions/client/incidents/${incidentId}/coverage-preview`
			)
			.pipe(map(response => response.data));
	}

	applyIncidentCoverage(
		incidentId: string
	): Observable<IncidentSubscriptionApplicationDto> {
		return this.http
			.post<ApiResponse<IncidentSubscriptionApplicationDto>>(
				`/api/subscriptions/client/incidents/${incidentId}/apply-coverage`,
				{}
			)
			.pipe(map(response => response.data));
	}

	listMyClientIncidents(): Observable<ApiResponse<ClientIncidentDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<ClientIncidentDto[], CountMetaDto>>(
			"/api/incidents/me"
		);
	}

	listPlatformIncidentApplications(
		incidentId: string
	): Observable<ApiResponse<IncidentSubscriptionApplicationDto[], CountMetaDto>> {
		return this.http.get<
			ApiResponse<IncidentSubscriptionApplicationDto[], CountMetaDto>
		>(`/api/subscriptions/platform/incidents/${incidentId}/applications`);
	}
}
