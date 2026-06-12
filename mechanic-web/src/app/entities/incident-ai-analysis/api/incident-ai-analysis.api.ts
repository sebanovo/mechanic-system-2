import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	IncidentAiAnalysis,
	IncidentAiAnalysisCreatePayload,
	IncidentAiAnalysisListData,
	IncidentAiAnalysisListQuery,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class IncidentAiAnalysisApi {
	private readonly apiClient = inject(ApiClient);
	private readonly platformBasePath = "/platform/incident-ai-analyses";
	private readonly tenantIncidentBasePath = "/tenants/current/incidents";

	listPlatformIncidentAiAnalyses(
		query?: IncidentAiAnalysisListQuery
	): Observable<IncidentAiAnalysisListData> {
		return this.apiClient.get<IncidentAiAnalysisListData>(
			this.platformBasePath,
			query as Record<string, string | number | boolean | null | undefined> | undefined
		);
	}

	createPlatformIncidentAiAnalysis(
		incidentId: string,
		payload: IncidentAiAnalysisCreatePayload
	): Observable<IncidentAiAnalysis> {
		return this.apiClient.post<IncidentAiAnalysis, IncidentAiAnalysisCreatePayload>(
			`${this.platformBasePath}/incidents/${incidentId}`,
			payload
		);
	}

	getPlatformIncidentAiAnalysis(
		analysisId: string
	): Observable<IncidentAiAnalysis> {
		return this.apiClient.get<IncidentAiAnalysis>(
			`${this.platformBasePath}/${analysisId}`
		);
	}

	listCurrentTenantIncidentAiAnalyses(
		incidentId: string,
		query?: Omit<IncidentAiAnalysisListQuery, "incident_id">
	): Observable<IncidentAiAnalysisListData> {
		return this.apiClient.get<IncidentAiAnalysisListData>(
			`${this.tenantIncidentBasePath}/${incidentId}/ai-analyses`,
			query as Record<string, string | number | boolean | null | undefined> | undefined
		);
	}

	createCurrentTenantIncidentAiAnalysis(
		incidentId: string,
		payload: IncidentAiAnalysisCreatePayload
	): Observable<IncidentAiAnalysis> {
		return this.apiClient.post<IncidentAiAnalysis, IncidentAiAnalysisCreatePayload>(
			`${this.tenantIncidentBasePath}/${incidentId}/ai-analyses`,
			payload
		);
	}

	getCurrentTenantIncidentAiAnalysis(
		incidentId: string,
		analysisId: string
	): Observable<IncidentAiAnalysis> {
		return this.apiClient.get<IncidentAiAnalysis>(
			`${this.tenantIncidentBasePath}/${incidentId}/ai-analyses/${analysisId}`
		);
	}
}
