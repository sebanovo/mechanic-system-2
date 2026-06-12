import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	AssignmentDetail,
	AssignmentListData,
	AssignmentListQuery,
	ChangeAssignmentStatusPayload,
	CreateAssignmentPayload,
	UpdateAssignmentPayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class AssignmentApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/assignments";

	listCurrentTenantAssignments(
		query?: AssignmentListQuery
	): Observable<AssignmentListData> {
		return this.apiClient.get<AssignmentListData>(this.tenantBasePath, query);
	}

	getCurrentTenantAssignmentById(
		assignmentId: string
	): Observable<AssignmentDetail> {
		return this.apiClient.get<AssignmentDetail>(
			`${this.tenantBasePath}/${assignmentId}`
		);
	}

	createCurrentTenantAssignment(
		payload: CreateAssignmentPayload
	): Observable<AssignmentDetail> {
		return this.apiClient.post<AssignmentDetail, CreateAssignmentPayload>(
			this.tenantBasePath,
			payload
		);
	}

	updateCurrentTenantAssignment(
		assignmentId: string,
		payload: UpdateAssignmentPayload
	): Observable<AssignmentDetail> {
		return this.apiClient.put<AssignmentDetail, UpdateAssignmentPayload>(
			`${this.tenantBasePath}/${assignmentId}`,
			payload
		);
	}

	changeCurrentTenantAssignmentStatus(
		assignmentId: string,
		payload: ChangeAssignmentStatusPayload
	): Observable<AssignmentDetail> {
		return this.apiClient.patch<
			AssignmentDetail,
			ChangeAssignmentStatusPayload
		>(`${this.tenantBasePath}/${assignmentId}/status`, payload);
	}
}
