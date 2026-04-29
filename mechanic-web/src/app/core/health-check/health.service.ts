import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";

import { ApiResponse } from "../http/models/api-response.model";

export type DatabaseHealthResponse = {
	status?: string;
	database?: string;
	result?: number;
	detail?: string;
	checks?: Record<string, unknown>;
	[key: string]: unknown;
};

export type SystemInfoResponse = {
	app_name?: string;
	app_version?: string;
	environment?: string;
	api_prefix?: string;
	docs_url?: string;
	providers?: Record<string, unknown>;
	[key: string]: unknown;
};

@Injectable({
	providedIn: "root",
})
export class HealthService {
	private readonly http = inject(HttpClient);

	checkHealth(): Observable<DatabaseHealthResponse> {
		return this.http
			.get<ApiResponse<DatabaseHealthResponse>>("/api/system/health")
			.pipe(map(response => response.data));
	}

	checkReadiness(): Observable<DatabaseHealthResponse> {
		return this.http
			.get<ApiResponse<DatabaseHealthResponse>>("/api/system/readiness")
			.pipe(map(response => response.data));
	}

	getSystemInfo(): Observable<SystemInfoResponse> {
		return this.http
			.get<ApiResponse<SystemInfoResponse>>("/api/system/info")
			.pipe(map(response => response.data));
	}

	/**
	 * Mantiene compatibilidad con el componente anterior.
	 * Internamente ahora usa el wrapper real del backend.
	 */
	checkDatabase(): Observable<DatabaseHealthResponse> {
		return this.checkHealth();
	}
}
