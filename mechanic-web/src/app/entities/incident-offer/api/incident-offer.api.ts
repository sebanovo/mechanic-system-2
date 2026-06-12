import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	IncidentOfferDetail,
	IncidentOfferListData,
	IncidentOfferListQuery,
	IncidentOfferResponsePayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class IncidentOfferApi {
	private readonly apiClient = inject(ApiClient);
	private readonly platformBasePath = "/platform/incident-offers";
	private readonly tenantBasePath = "/tenants/current/offers";

	listCurrentTenantOffers(
		query?: IncidentOfferListQuery
	): Observable<IncidentOfferListData> {
		return this.apiClient.get<IncidentOfferListData>(
			this.tenantBasePath,
			query
		);
	}

	getCurrentTenantOfferById(offerId: string): Observable<IncidentOfferDetail> {
		return this.apiClient.get<IncidentOfferDetail>(
			`${this.tenantBasePath}/${offerId}`
		);
	}

	listPlatformIncidentOffers(
		query?: IncidentOfferListQuery
	): Observable<IncidentOfferListData> {
		return this.apiClient.get<IncidentOfferListData>(
			this.platformBasePath,
			query
		);
	}

	getPlatformIncidentOfferById(
		offerId: string
	): Observable<IncidentOfferDetail> {
		return this.apiClient.get<IncidentOfferDetail>(
			`${this.platformBasePath}/${offerId}`
		);
	}

	acceptCurrentTenantOffer(
		offerId: string,
		payload?: IncidentOfferResponsePayload
	): Observable<IncidentOfferDetail> {
		return this.apiClient.patch<
			IncidentOfferDetail,
			IncidentOfferResponsePayload
		>(`${this.tenantBasePath}/${offerId}/accept`, payload ?? {});
	}

	rejectCurrentTenantOffer(
		offerId: string,
		payload?: IncidentOfferResponsePayload
	): Observable<IncidentOfferDetail> {
		return this.apiClient.patch<
			IncidentOfferDetail,
			IncidentOfferResponsePayload
		>(`${this.tenantBasePath}/${offerId}/reject`, payload ?? {});
	}
}
