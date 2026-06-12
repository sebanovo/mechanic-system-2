import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	ChangeTechnicianStatusPayload,
	CreateTechnicianPayload,
	Technician,
	TechnicianListData,
	TechnicianListQuery,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class TechnicianApi {
	private readonly apiClient = inject(ApiClient);

	private readonly tenantBasePath = "/tenants/current/technicians";
	private readonly platformBasePath = "/platform/technicians";

	listTenantTechnicians(
		query?: TechnicianListQuery
	): Observable<TechnicianListData> {
		return this.apiClient.get<TechnicianListData>(this.tenantBasePath, query);
	}

	getTenantTechnicianById(id: string): Observable<Technician> {
		return this.apiClient.get<Technician>(`${this.tenantBasePath}/${id}`);
	}

	createTenantTechnician(
		payload: CreateTechnicianPayload
	): Observable<Technician> {
		return this.apiClient.post<Technician, CreateTechnicianPayload>(
			this.tenantBasePath,
			payload
		);
	}

	changeTenantTechnicianStatus(
		id: string,
		payload: ChangeTechnicianStatusPayload
	): Observable<Technician> {
		return this.apiClient.patch<Technician, ChangeTechnicianStatusPayload>(
			`${this.tenantBasePath}/${id}/status`,
			payload
		);
	}

	listPlatformTechnicians(
		query?: TechnicianListQuery
	): Observable<TechnicianListData> {
		return this.apiClient.get<TechnicianListData>(this.platformBasePath, query);
	}

	getPlatformTechnicianById(id: string): Observable<Technician> {
		return this.apiClient.get<Technician>(`${this.platformBasePath}/${id}`);
	}
}
