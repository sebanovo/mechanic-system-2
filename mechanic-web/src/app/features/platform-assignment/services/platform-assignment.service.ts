import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	AssignmentCandidateDto,
	AssignmentPublishResponseDto,
	CountMetaDto,
	PagedMetaDto,
	PlatformIncidentDto,
} from "../models/platform-assignment.types";

@Injectable({
	providedIn: "root",
})
export class PlatformAssignmentApi {
	private readonly http = inject(HttpClient);

	listIncidents(paramsRecord: {
		limit: string;
		offset: string;
	}): Observable<ApiResponse<PlatformIncidentDto[], PagedMetaDto>> {
		const params = new HttpParams({ fromObject: paramsRecord });

		return this.http.get<ApiResponse<PlatformIncidentDto[], PagedMetaDto>>(
			"/api/incidents",
			{ params }
		);
	}

	getIncidentById(incidentId: string): Observable<PlatformIncidentDto> {
		return this.http
			.get<ApiResponse<PlatformIncidentDto>>(`/api/incidents/${incidentId}`)
			.pipe(map(response => response.data));
	}

	publishIncident(incidentId: string): Observable<AssignmentPublishResponseDto> {
		return this.http
			.post<ApiResponse<AssignmentPublishResponseDto>>(
				`/api/assignment/platform/incidents/${incidentId}/publish`,
				{}
			)
			.pipe(map(response => response.data));
	}

	listCandidatesByIncident(
		incidentId: string
	): Observable<ApiResponse<AssignmentCandidateDto[], CountMetaDto>> {
		return this.http.get<
			ApiResponse<AssignmentCandidateDto[], CountMetaDto>
		>(`/api/assignment/platform/incidents/${incidentId}/candidates`);
	}
}
