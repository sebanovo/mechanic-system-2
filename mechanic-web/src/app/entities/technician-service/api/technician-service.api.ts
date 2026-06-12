import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	ChangeTechnicianServiceStatusPayload,
	CreateTechnicianServicePayload,
	TechnicianServiceDetail,
	TechnicianServiceListData,
	TechnicianServiceListQuery,
	UpdateTechnicianServicePayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class TechnicianServiceApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/technician-services";

	listCurrentTenantTechnicianServices(
		query?: TechnicianServiceListQuery
	): Observable<TechnicianServiceListData> {
		return this.apiClient.get<TechnicianServiceListData>(
			this.tenantBasePath,
			query
		);
	}

	getCurrentTenantTechnicianServiceById(
		technicianServiceId: string
	): Observable<TechnicianServiceDetail> {
		return this.apiClient.get<TechnicianServiceDetail>(
			`${this.tenantBasePath}/${technicianServiceId}`
		);
	}

	createCurrentTenantTechnicianService(
		payload: CreateTechnicianServicePayload
	): Observable<TechnicianServiceDetail> {
		return this.apiClient.post<
			TechnicianServiceDetail,
			CreateTechnicianServicePayload
		>(this.tenantBasePath, payload);
	}

	updateCurrentTenantTechnicianService(
		technicianServiceId: string,
		payload: UpdateTechnicianServicePayload
	): Observable<TechnicianServiceDetail> {
		return this.apiClient.put<
			TechnicianServiceDetail,
			UpdateTechnicianServicePayload
		>(`${this.tenantBasePath}/${technicianServiceId}`, payload);
	}

	changeCurrentTenantTechnicianServiceStatus(
		technicianServiceId: string,
		payload: ChangeTechnicianServiceStatusPayload
	): Observable<TechnicianServiceDetail> {
		return this.apiClient.patch<
			TechnicianServiceDetail,
			ChangeTechnicianServiceStatusPayload
		>(`${this.tenantBasePath}/${technicianServiceId}/status`, payload);
	}

	removeCurrentTenantTechnicianService(
		technicianServiceId: string
	): Observable<TechnicianServiceDetail> {
		return this.apiClient.delete<TechnicianServiceDetail>(
			`${this.tenantBasePath}/${technicianServiceId}`
		);
	}
}
