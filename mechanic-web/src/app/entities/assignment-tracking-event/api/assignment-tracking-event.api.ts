import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	AssignmentTrackingEventDetail,
	AssignmentTrackingEventListData,
	AssignmentTrackingEventListQuery,
	CreateAssignmentTrackingEventPayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class AssignmentTrackingEventApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantAssignmentsBasePath = "/tenants/current/assignments";

	listCurrentTenantAssignmentTrackingEvents(
		assignmentId: string,
		query?: AssignmentTrackingEventListQuery
	): Observable<AssignmentTrackingEventListData> {
		return this.apiClient.get<AssignmentTrackingEventListData>(
			`${this.tenantAssignmentsBasePath}/${assignmentId}/tracking-events`,
			query
		);
	}

	createCurrentTenantAssignmentTrackingEvent(
		assignmentId: string,
		payload: CreateAssignmentTrackingEventPayload
	): Observable<AssignmentTrackingEventDetail> {
		return this.apiClient.post<
			AssignmentTrackingEventDetail,
			CreateAssignmentTrackingEventPayload
		>(
			`${this.tenantAssignmentsBasePath}/${assignmentId}/tracking-events`,
			payload
		);
	}
}
