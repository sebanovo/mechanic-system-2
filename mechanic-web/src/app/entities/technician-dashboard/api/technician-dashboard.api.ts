import {
	inject,
	Injectable,
} from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	TechnicianDashboardQuery,
	TechnicianOperationalDashboard,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class TechnicianDashboardApi {
	private readonly apiClient =
		inject(ApiClient);

	private readonly basePath =
		"/technicians/current/dashboard/operational";

	getOperationalDashboard(
		query?: TechnicianDashboardQuery,
	): Observable<TechnicianOperationalDashboard> {
		return this.apiClient.get<
			TechnicianOperationalDashboard
		>(
			this.basePath,
			query as Record<string, string | number | boolean | null | undefined> | undefined,
		);
	}
}
