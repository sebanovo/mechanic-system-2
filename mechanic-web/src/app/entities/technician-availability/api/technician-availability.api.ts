import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	TechnicianAvailability,
	TechnicianAvailabilityUpsertPayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class TechnicianAvailabilityApi {
	private readonly apiClient = inject(ApiClient);
	private readonly tenantTechniciansBasePath = "/tenants/current/technicians";

	getCurrentTenantTechnicianAvailability(
		technicianId: string
	): Observable<TechnicianAvailability> {
		return this.apiClient.get<TechnicianAvailability>(
			`${this.tenantTechniciansBasePath}/${technicianId}/availability`
		);
	}

	upsertCurrentTenantTechnicianAvailability(
		technicianId: string,
		payload: TechnicianAvailabilityUpsertPayload
	): Observable<TechnicianAvailability> {
		return this.apiClient.put<
			TechnicianAvailability,
			TechnicianAvailabilityUpsertPayload
		>(
			`${this.tenantTechniciansBasePath}/${technicianId}/availability`,
			payload
		);
	}
}
