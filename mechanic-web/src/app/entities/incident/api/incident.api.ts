import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import { Incident, IncidentListData, IncidentListQuery } from "../model";

@Injectable({
	providedIn: "root",
})
export class IncidentApi {
	private readonly apiClient = inject(ApiClient);
	private readonly platformBasePath = "/platform/incidents";
	private readonly tenantBasePath = "/tenants/current/incidents";

	listPlatformIncidents(
		query?: IncidentListQuery
	): Observable<IncidentListData> {
		return this.apiClient.get<IncidentListData>(
			this.platformBasePath,
			query as Record<string, string | number | boolean | null | undefined> | undefined
		);
	}

	getPlatformIncidentById(id: string): Observable<Incident> {
		return this.apiClient.get<Incident>(`${this.platformBasePath}/${id}`);
	}

	listCurrentTenantIncidents(
		query?: IncidentListQuery
	): Observable<IncidentListData> {
		return this.apiClient.get<IncidentListData>(
			this.tenantBasePath,
			query as Record<string, string | number | boolean | null | undefined> | undefined
		);
	}

	getCurrentTenantIncident(id: string): Observable<Incident> {
		return this.apiClient.get<Incident>(`${this.tenantBasePath}/${id}`);
	}
}
