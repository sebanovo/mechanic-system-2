import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	CompleteIncidentRequest,
	CountMetaDto,
	DispatchIncidentRequest,
	IncidentOperationEventDto,
	IncidentOperationStateDto,
	OperationNoteRequest,
	ProviderTechnicianDto,
} from "../models/operation.types";

@Injectable({
	providedIn: "root",
})
export class OperationsApi {
	private readonly http = inject(HttpClient);

	getActiveOperations(): Observable<
		ApiResponse<IncidentOperationStateDto[], CountMetaDto>
	> {
		return this.http.get<ApiResponse<IncidentOperationStateDto[], CountMetaDto>>(
			"/api/operations/provider/me/active"
		);
	}

	getOperationState(incidentId: string): Observable<IncidentOperationStateDto> {
		return this.http
			.get<ApiResponse<IncidentOperationStateDto>>(
				`/api/operations/provider/incidents/${incidentId}/state`
			)
			.pipe(map(response => response.data));
	}

	dispatchIncident(
		incidentId: string,
		payload: DispatchIncidentRequest
	): Observable<IncidentOperationStateDto> {
		return this.http
			.post<ApiResponse<IncidentOperationStateDto>>(
				`/api/operations/provider/incidents/${incidentId}/dispatch`,
				payload
			)
			.pipe(map(response => response.data));
	}

	markArrival(
		incidentId: string,
		payload: OperationNoteRequest
	): Observable<IncidentOperationStateDto> {
		return this.http
			.post<ApiResponse<IncidentOperationStateDto>>(
				`/api/operations/provider/incidents/${incidentId}/arrive`,
				payload
			)
			.pipe(map(response => response.data));
	}

	startService(
		incidentId: string,
		payload: OperationNoteRequest
	): Observable<IncidentOperationStateDto> {
		return this.http
			.post<ApiResponse<IncidentOperationStateDto>>(
				`/api/operations/provider/incidents/${incidentId}/start`,
				payload
			)
			.pipe(map(response => response.data));
	}

	completeService(
		incidentId: string,
		payload: CompleteIncidentRequest
	): Observable<IncidentOperationStateDto> {
		return this.http
			.post<ApiResponse<IncidentOperationStateDto>>(
				`/api/operations/provider/incidents/${incidentId}/complete`,
				payload
			)
			.pipe(map(response => response.data));
	}

	cancelService(
		incidentId: string,
		payload: OperationNoteRequest
	): Observable<IncidentOperationStateDto> {
		return this.http
			.post<ApiResponse<IncidentOperationStateDto>>(
				`/api/operations/provider/incidents/${incidentId}/cancel`,
				payload
			)
			.pipe(map(response => response.data));
	}

	getOperationHistory(
		incidentId: string
	): Observable<ApiResponse<IncidentOperationEventDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<IncidentOperationEventDto[], CountMetaDto>>(
			`/api/operations/provider/incidents/${incidentId}/history`
		);
	}

	getMyTechnicians(): Observable<ApiResponse<ProviderTechnicianDto[], CountMetaDto>> {
		return this.http.get<ApiResponse<ProviderTechnicianDto[], CountMetaDto>>(
			"/api/providers/me/technicians"
		);
	}
}
