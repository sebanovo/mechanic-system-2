import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	CreateTenantNetworkPayload,
	Tenant,
	TenantDetail,
	TenantProfile,
	TenantSettings,
	UpdateTenantProfilePayload,
	UpdateTenantSettingsPayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class TenantApi {
	private readonly apiClient = inject(ApiClient);
	private readonly basePath = "/tenants";

	listMyTenants(): Observable<Tenant[]> {
		return this.apiClient.get<Tenant[]>(`${this.basePath}/me`);
	}

	getCurrentTenant(): Observable<Tenant> {
		return this.apiClient.get<Tenant>(`${this.basePath}/current`);
	}

	getCurrentTenantDetail(): Observable<TenantDetail> {
		return this.apiClient.get<TenantDetail>(`${this.basePath}/current/detail`);
	}

	getCurrentTenantProfile(): Observable<TenantProfile> {
		return this.apiClient.get<TenantProfile>(
			`${this.basePath}/current/profile`
		);
	}

	updateCurrentTenantProfile(
		payload: UpdateTenantProfilePayload
	): Observable<TenantProfile> {
		return this.apiClient.put<TenantProfile, UpdateTenantProfilePayload>(
			`${this.basePath}/current/profile`,
			payload
		);
	}

	getCurrentTenantSettings(): Observable<TenantSettings> {
		return this.apiClient.get<TenantSettings>(
			`${this.basePath}/current/settings`
		);
	}

	updateCurrentTenantSettings(
		payload: UpdateTenantSettingsPayload
	): Observable<TenantSettings> {
		return this.apiClient.put<TenantSettings, UpdateTenantSettingsPayload>(
			`${this.basePath}/current/settings`,
			payload
		);
	}

	createCurrentTenantNetwork(
		payload: CreateTenantNetworkPayload
	): Observable<Tenant> {
		return this.apiClient.post<Tenant, CreateTenantNetworkPayload>(
			`${this.basePath}/current/network`,
			payload
		);
	}
}
