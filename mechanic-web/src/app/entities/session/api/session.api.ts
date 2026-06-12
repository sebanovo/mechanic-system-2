import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import { Session, SessionListData, SessionListQuery } from "../model";

@Injectable({
	providedIn: "root",
})
export class SessionApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/sessions";

	listMyTenantSessions(query?: SessionListQuery): Observable<SessionListData> {
		return this.apiClient.get<SessionListData>(`${this.tenantBasePath}/me`, query);
	}

	revokeMyTenantSession(sessionId: string): Observable<Session> {
		return this.apiClient.delete<Session>(
			`${this.tenantBasePath}/me/${sessionId}`
		);
	}
}
