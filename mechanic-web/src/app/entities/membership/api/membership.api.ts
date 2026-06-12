import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	TenantMembership,
	TenantMembershipListData,
	TenantMembershipListQuery,
	TenantMembershipStatusChangePayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class MembershipApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/members";

	listCurrentTenantMembers(
		query?: TenantMembershipListQuery
	): Observable<TenantMembershipListData> {
		return this.apiClient.get<TenantMembershipListData>(
			this.tenantBasePath,
			query
		);
	}

	changeCurrentTenantMemberStatus(
		membershipId: string,
		payload: TenantMembershipStatusChangePayload
	): Observable<TenantMembership> {
		return this.apiClient.patch<
			TenantMembership,
			TenantMembershipStatusChangePayload
		>(`${this.tenantBasePath}/${membershipId}/status`, payload);
	}

	removeCurrentTenantMember(
		membershipId: string
	): Observable<TenantMembership> {
		return this.apiClient.delete<TenantMembership>(
			`${this.tenantBasePath}/${membershipId}`
		);
	}
}
