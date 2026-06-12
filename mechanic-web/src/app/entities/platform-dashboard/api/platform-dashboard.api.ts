import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	PlatformDashboardQuery,
	PlatformOperationalDashboard,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class PlatformDashboardApi {
	private readonly apiClient = inject(ApiClient);
	private readonly basePath = "/platform/dashboard/operational";

	getOperationalDashboard(
		query?: PlatformDashboardQuery
	): Observable<PlatformOperationalDashboard> {
		return this.apiClient.get<PlatformOperationalDashboard>(
			this.basePath,
			query as
				| Record<string, string | number | boolean | null | undefined>
				| undefined
		);
	}
}
