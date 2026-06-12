import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import { RealtimeTrackingSession } from "../model";

@Injectable({
	providedIn: "root",
})
export class RealtimeTrackingApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantAssignmentsBasePath = "/tenants/current/assignments";

	getCurrentTenantTrackingSession(
		assignmentId: string
	): Observable<RealtimeTrackingSession> {
		return this.apiClient.get<RealtimeTrackingSession>(
			`${this.tenantAssignmentsBasePath}/${assignmentId}/tracking-session`
		);
	}
}
