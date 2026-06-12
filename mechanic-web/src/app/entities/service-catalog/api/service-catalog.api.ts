import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	ChangeServiceCatalogStatusPayload,
	CreateServiceCatalogPayload,
	ServiceCatalog,
	ServiceCatalogListData,
	ServiceCatalogListQuery,
	UpdateServiceCatalogPayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class ServiceCatalogApi {
	private readonly apiClient = inject(ApiClient);

	private readonly platformBasePath = "/platform/service-catalog";
	private readonly tenantBasePath = "/tenants/current/service-catalog";

	listPlatformCatalog(
		query?: ServiceCatalogListQuery
	): Observable<ServiceCatalogListData> {
		return this.apiClient.get<ServiceCatalogListData>(
			this.platformBasePath,
			query
		);
	}

	getPlatformCatalogById(id: string): Observable<ServiceCatalog> {
		return this.apiClient.get<ServiceCatalog>(`${this.platformBasePath}/${id}`);
	}

	createPlatformCatalog(
		payload: CreateServiceCatalogPayload
	): Observable<ServiceCatalog> {
		return this.apiClient.post<ServiceCatalog, CreateServiceCatalogPayload>(
			this.platformBasePath,
			payload
		);
	}

	updatePlatformCatalog(
		id: string,
		payload: UpdateServiceCatalogPayload
	): Observable<ServiceCatalog> {
		return this.apiClient.put<ServiceCatalog, UpdateServiceCatalogPayload>(
			`${this.platformBasePath}/${id}`,
			payload
		);
	}

	changePlatformCatalogStatus(
		id: string,
		payload: ChangeServiceCatalogStatusPayload
	): Observable<ServiceCatalog> {
		return this.apiClient.patch<
			ServiceCatalog,
			ChangeServiceCatalogStatusPayload
		>(`${this.platformBasePath}/${id}/status`, payload);
	}

	listTenantCatalog(
		query?: ServiceCatalogListQuery
	): Observable<ServiceCatalogListData> {
		return this.apiClient.get<ServiceCatalogListData>(
			this.tenantBasePath,
			query
		);
	}

	getTenantCatalogById(id: string): Observable<ServiceCatalog> {
		return this.apiClient.get<ServiceCatalog>(`${this.tenantBasePath}/${id}`);
	}
}
