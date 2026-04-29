import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import {
	ApiResponse,
	AuditLogDto,
	BackgroundJobDto,
	DemoJobEnqueueRequest,
	MetricSnapshotDto,
	PagedMetaDto,
} from "../models/platform-admin.types";

@Injectable({
	providedIn: "root",
})
export class PlatformAdminApi {
	private readonly http = inject(HttpClient);

	getAuditLogs(
		paramsRecord: Record<string, string>
	): Observable<ApiResponse<AuditLogDto[], PagedMetaDto>> {
		const params = new HttpParams({ fromObject: paramsRecord });

		return this.http.get<ApiResponse<AuditLogDto[], PagedMetaDto>>(
			"/api/audit/logs",
			{ params }
		);
	}

	getMetricSnapshots(paramsRecord: {
		limit: string;
		offset: string;
		snapshot_type?: string;
	}): Observable<ApiResponse<MetricSnapshotDto[], PagedMetaDto>> {
		const params = new HttpParams({ fromObject: paramsRecord });

		return this.http.get<ApiResponse<MetricSnapshotDto[], PagedMetaDto>>(
			"/api/audit/metric-snapshots",
			{ params }
		);
	}

	getJobs(paramsRecord: {
		limit: string;
		offset: string;
	}): Observable<ApiResponse<BackgroundJobDto[], PagedMetaDto>> {
		const params = new HttpParams({ fromObject: paramsRecord });

		return this.http.get<ApiResponse<BackgroundJobDto[], PagedMetaDto>>(
			"/api/jobs",
			{ params }
		);
	}

	getJobById(jobId: string): Observable<BackgroundJobDto> {
		return this.http
			.get<ApiResponse<BackgroundJobDto>>(`/api/jobs/${jobId}`)
			.pipe(map(response => response.data));
	}

	enqueueDemoJob(payload: DemoJobEnqueueRequest): Observable<BackgroundJobDto> {
		return this.http
			.post<ApiResponse<BackgroundJobDto>>("/api/jobs/demo/enqueue", payload)
			.pipe(map(response => response.data));
	}

	enqueueAudioTranscriptionJob(evidenceId: string): Observable<BackgroundJobDto> {
		return this.http
			.post<ApiResponse<BackgroundJobDto>>(
				`/api/jobs/evidences/${evidenceId}/audio-transcription/enqueue`,
				{}
			)
			.pipe(map(response => response.data));
	}

	enqueueImageAnalysisJob(evidenceId: string): Observable<BackgroundJobDto> {
		return this.http
			.post<ApiResponse<BackgroundJobDto>>(
				`/api/jobs/evidences/${evidenceId}/image-analysis/enqueue`,
				{}
			)
			.pipe(map(response => response.data));
	}

	enqueueIncidentSummaryJob(incidentId: string): Observable<BackgroundJobDto> {
		return this.http
			.post<ApiResponse<BackgroundJobDto>>(
				`/api/jobs/incidents/${incidentId}/summary/enqueue`,
				{}
			)
			.pipe(map(response => response.data));
	}
}
