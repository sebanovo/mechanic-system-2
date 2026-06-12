import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import { AuditEvent, AuditEventListData, AuditEventListQuery } from "../model";

@Injectable({
	providedIn: "root",
})
export class AuditEventApi {
	private readonly apiClient = inject(ApiClient);

	private readonly tenantBasePath = "/tenants/current/audit-events";
	private readonly platformBasePath = "/platform/audit-events";

	listCurrentTenantAuditEvents(
		query?: AuditEventListQuery
	): Observable<AuditEventListData> {
		return this.apiClient.get<AuditEventListData>(this.tenantBasePath, query);
	}

	listPlatformAuditEvents(
		query?: AuditEventListQuery & { scope?: string; tenant_id?: string }
	): Observable<AuditEventListData> {
		return this.apiClient.get<AuditEventListData>(this.platformBasePath, query);
	}

	getCurrentTenantAuditEventById(auditEventId: string): Observable<AuditEvent> {
		return this.apiClient.get<AuditEvent>(
			`${this.tenantBasePath}/${auditEventId}`
		);
	}

	getPlatformAuditEventById(auditEventId: string): Observable<AuditEvent> {
		return this.apiClient.get<AuditEvent>(
			`${this.platformBasePath}/${auditEventId}`
		);
	}

	getCurrentTenantResourceHistory(
		resourceType: string,
		resourceId: string
	): Observable<AuditEventListData> {
		return this.apiClient.get<AuditEventListData>(
			`${this.tenantBasePath}/resources/${encodeURIComponent(resourceType)}/${encodeURIComponent(resourceId)}`
		);
	}

	getPlatformResourceHistory(
		resourceType: string,
		resourceId: string
	): Observable<AuditEventListData> {
		return this.apiClient.get<AuditEventListData>(
			`${this.platformBasePath}/resources/${encodeURIComponent(resourceType)}/${encodeURIComponent(resourceId)}`
		);
	}
}
