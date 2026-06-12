import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	ChangeProviderServiceStatusPayload,
	CreateProviderServicePayload,
	ProviderServiceDetail,
	ProviderServiceListData,
	ProviderServiceListQuery,
	UpdateProviderServicePayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class ProviderServiceApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/provider-services";

	listCurrentTenantProviderServices(
		query?: ProviderServiceListQuery
	): Observable<ProviderServiceListData> {
		return this.apiClient.get<ProviderServiceListData>(
			this.tenantBasePath,
			query
		);
	}

	getCurrentTenantProviderServiceById(
		providerServiceId: string
	): Observable<ProviderServiceDetail> {
		return this.apiClient.get<ProviderServiceDetail>(
			`${this.tenantBasePath}/${providerServiceId}`
		);
	}

	createCurrentTenantProviderService(
		payload: CreateProviderServicePayload
	): Observable<ProviderServiceDetail> {
		return this.apiClient.post<
			ProviderServiceDetail,
			CreateProviderServicePayload
		>(this.tenantBasePath, payload);
	}

	updateCurrentTenantProviderService(
		providerServiceId: string,
		payload: UpdateProviderServicePayload
	): Observable<ProviderServiceDetail> {
		return this.apiClient.put<
			ProviderServiceDetail,
			UpdateProviderServicePayload
		>(`${this.tenantBasePath}/${providerServiceId}`, payload);
	}

	changeCurrentTenantProviderServiceStatus(
		providerServiceId: string,
		payload: ChangeProviderServiceStatusPayload
	): Observable<ProviderServiceDetail> {
		return this.apiClient.patch<
			ProviderServiceDetail,
			ChangeProviderServiceStatusPayload
		>(`${this.tenantBasePath}/${providerServiceId}/status`, payload);
	}

	removeCurrentTenantProviderService(
		providerServiceId: string
	): Observable<ProviderServiceDetail> {
		return this.apiClient.delete<ProviderServiceDetail>(
			`${this.tenantBasePath}/${providerServiceId}`
		);
	}
}
