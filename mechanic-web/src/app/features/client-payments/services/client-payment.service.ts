import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	BillingCheckoutPreviewDto,
	ClientCreateCheckoutRequest,
	ClientIncidentDto,
	ClientMarkIncidentPaidRequest,
	ClientSimulatePaymentFailureRequest,
	ClientSimulatePaymentSuccessRequest,
	CountMetaDto,
	CreateOrUpdateProviderRatingRequest,
	IncidentBillingDto,
	ProviderRatingDto,
} from "../models/client-payment.types";

@Injectable({
	providedIn: "root",
})
export class ClientPaymentApi {
	private readonly http = inject(HttpClient);

	listMyIncidents(): Observable<ApiResponse<ClientIncidentDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<ClientIncidentDto[], CountMetaDto>>(
			"/api/incidents/me"
		);
	}

	getClientIncidentBilling(incidentId: string): Observable<IncidentBillingDto> {
		return this.http
			.get<ApiResponse<IncidentBillingDto>>(
				`/api/billing/client/incidents/${incidentId}`
			)
			.pipe(map(response => response.data));
	}

	createCheckout(
		incidentId: string,
		payload: ClientCreateCheckoutRequest
	): Observable<BillingCheckoutPreviewDto> {
		return this.http
			.post<ApiResponse<BillingCheckoutPreviewDto>>(
				`/api/billing/client/incidents/${incidentId}/checkout`,
				payload
			)
			.pipe(map(response => response.data));
	}

	simulatePaymentSuccess(
		incidentId: string,
		payload: ClientSimulatePaymentSuccessRequest
	): Observable<IncidentBillingDto> {
		return this.http
			.post<ApiResponse<IncidentBillingDto>>(
				`/api/billing/client/incidents/${incidentId}/simulate-success`,
				payload
			)
			.pipe(map(response => response.data));
	}

	simulatePaymentFailure(
		incidentId: string,
		payload: ClientSimulatePaymentFailureRequest
	): Observable<IncidentBillingDto> {
		return this.http
			.post<ApiResponse<IncidentBillingDto>>(
				`/api/billing/client/incidents/${incidentId}/simulate-failure`,
				payload
			)
			.pipe(map(response => response.data));
	}

	markIncidentAsPaid(
		incidentId: string,
		payload: ClientMarkIncidentPaidRequest
	): Observable<IncidentBillingDto> {
		return this.http
			.post<ApiResponse<IncidentBillingDto>>(
				`/api/billing/client/incidents/${incidentId}/mark-paid`,
				payload
			)
			.pipe(map(response => response.data));
	}

	createOrUpdateRating(
		incidentId: string,
		payload: CreateOrUpdateProviderRatingRequest
	): Observable<ProviderRatingDto> {
		return this.http
			.post<ApiResponse<ProviderRatingDto>>(
				`/api/ratings/client/incidents/${incidentId}`,
				payload
			)
			.pipe(map(response => response.data));
	}

	getMyIncidentRating(incidentId: string): Observable<ProviderRatingDto> {
		return this.http
			.get<ApiResponse<ProviderRatingDto>>(
				`/api/ratings/client/incidents/${incidentId}`
			)
			.pipe(map(response => response.data));
	}
}
