import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import { OwnerDashboardQuery, OwnerOperationalDashboard } from "../model";

@Injectable({
	providedIn: "root",
})
export class OwnerDashboardApi {
	private readonly apiClient = inject(ApiClient);
	private readonly basePath = "/tenants/current/dashboard/operational";

	getOperationalDashboard(
		query?: OwnerDashboardQuery
	): Observable<OwnerOperationalDashboard> {
		return this.apiClient.get<OwnerOperationalDashboard>(
			this.basePath,
			query as Record<string, string | number | boolean | null | undefined> | undefined
		);
	}
}
