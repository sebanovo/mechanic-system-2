import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	CandidateProviderDetail,
	CandidateProviderListData,
	CandidateProviderListQuery,
	ChangeCandidateProviderStatusPayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class CandidateProviderApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/candidate-providers";

	listCurrentTenantCandidateProviders(
		query?: CandidateProviderListQuery
	): Observable<CandidateProviderListData> {
		return this.apiClient.get<CandidateProviderListData>(
			this.tenantBasePath,
			query
		);
	}

	getCurrentTenantCandidateProviderById(
		candidateId: string
	): Observable<CandidateProviderDetail> {
		return this.apiClient.get<CandidateProviderDetail>(
			`${this.tenantBasePath}/${candidateId}`
		);
	}

	changeCurrentTenantCandidateProviderStatus(
		candidateId: string,
		payload: ChangeCandidateProviderStatusPayload
	): Observable<CandidateProviderDetail> {
		return this.apiClient.patch<
			CandidateProviderDetail,
			ChangeCandidateProviderStatusPayload
		>(`${this.tenantBasePath}/${candidateId}/status`, payload);
	}
}
