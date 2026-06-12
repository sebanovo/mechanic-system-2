import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import { ProviderProfile, UpdateProviderProfilePayload } from "../model";

@Injectable({
	providedIn: "root",
})
export class ProviderApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantBasePath = "/tenants/current/provider";

	getCurrentProviderProfile(): Observable<ProviderProfile> {
		return this.apiClient.get<ProviderProfile>(this.tenantBasePath);
	}

	updateCurrentProviderProfile(
		payload: UpdateProviderProfilePayload
	): Observable<ProviderProfile> {
		return this.apiClient.put<ProviderProfile, UpdateProviderProfilePayload>(
			this.tenantBasePath,
			payload
		);
	}
}
