import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CountMetaDto,
	CreateIncidentRequest,
	CreateTextEvidenceRequest,
	CreateVehicleRequest,
	EvidenceType,
	IncidentDto,
	IncidentEvidenceDto,
	VehicleDto,
} from "../models/client-portal.types";

@Injectable({
	providedIn: "root",
})
export class ClientPortalApi {
	private readonly http = inject(HttpClient);

	listMyVehicles(): Observable<ApiResponse<VehicleDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<VehicleDto[], CountMetaDto>>(
			"/api/vehicles"
		);
	}

	createVehicle(payload: CreateVehicleRequest): Observable<VehicleDto> {
		return this.http
			.post<ApiResponse<VehicleDto>>("/api/vehicles", payload)
			.pipe(map(response => response.data));
	}

	listMyIncidents(): Observable<ApiResponse<IncidentDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<IncidentDto[], CountMetaDto>>(
			"/api/incidents/me"
		);
	}

	createIncident(payload: CreateIncidentRequest): Observable<IncidentDto> {
		return this.http
			.post<ApiResponse<IncidentDto>>("/api/incidents", payload)
			.pipe(map(response => response.data));
	}

	getIncidentById(incidentId: string): Observable<IncidentDto> {
		return this.http
			.get<ApiResponse<IncidentDto>>(`/api/incidents/me/${incidentId}`)
			.pipe(map(response => response.data));
	}

	cancelIncident(incidentId: string): Observable<IncidentDto> {
		return this.http
			.post<ApiResponse<IncidentDto>>(
				`/api/incidents/me/${incidentId}/cancel`,
				{}
			)
			.pipe(map(response => response.data));
	}

	listIncidentEvidences(
		incidentId: string
	): Observable<ApiResponse<IncidentEvidenceDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<IncidentEvidenceDto[], CountMetaDto>>(
			`/api/evidences/client/incidents/${incidentId}`
		);
	}

	createTextEvidence(
		incidentId: string,
		payload: CreateTextEvidenceRequest
	): Observable<IncidentEvidenceDto> {
		return this.http
			.post<ApiResponse<IncidentEvidenceDto>>(
				`/api/evidences/client/incidents/${incidentId}/text`,
				payload
			)
			.pipe(map(response => response.data));
	}

	uploadFileEvidence(
		incidentId: string,
		evidenceType: Exclude<EvidenceType, "TEXT">,
		description: string | null,
		file: File
	): Observable<IncidentEvidenceDto> {
		const formData = new FormData();

		formData.append("evidence_type", evidenceType);

		if (description) {
			formData.append("description", description);
		}

		formData.append("file", file);

		return this.http
			.post<ApiResponse<IncidentEvidenceDto>>(
				`/api/evidences/client/incidents/${incidentId}/files`,
				formData
			)
			.pipe(map(response => response.data));
	}
}
