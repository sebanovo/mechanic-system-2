import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CountMetaDto,
	IncidentBillingDto,
	ProviderEstimateIncidentPricingRequest,
	ProviderFinalizeIncidentPricingRequest,
	ProviderIncidentDto,
} from "../models/billing.types";

@Injectable({
	providedIn: "root",
})
export class BillingApi {
	private readonly http = inject(HttpClient);

	getMyProviderIncidents(): Observable<
		ApiResponse<ProviderIncidentDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<ProviderIncidentDto[], CountMetaDto>>(
			"/api/incidents/provider/me"
		);
	}

	getProviderIncidentBilling(incidentId: string): Observable<IncidentBillingDto> {
		return this.http
			.get<ApiResponse<IncidentBillingDto>>(
				`/api/billing/provider/incidents/${incidentId}`
			)
			.pipe(map(response => response.data));
	}

	estimateProviderIncidentPricing(
		incidentId: string,
		payload: ProviderEstimateIncidentPricingRequest
	): Observable<IncidentBillingDto> {
		return this.http
			.post<ApiResponse<IncidentBillingDto>>(
				`/api/billing/provider/incidents/${incidentId}/estimate`,
				payload
			)
			.pipe(map(response => response.data));
	}

	finalizeProviderIncidentPricing(
		incidentId: string,
		payload: ProviderFinalizeIncidentPricingRequest
	): Observable<IncidentBillingDto> {
		return this.http
			.post<ApiResponse<IncidentBillingDto>>(
				`/api/billing/provider/incidents/${incidentId}/finalize`,
				payload
			)
			.pipe(map(response => response.data));
	}
}
