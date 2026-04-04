import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export type DatabaseHealthResponse = {
	status: string;
	database: string;
	result?: number;
	detail?: string;
}

@Injectable({
	providedIn: "root",
})
export class HealthService {
	private readonly http = inject(HttpClient);

	checkDatabase(): Observable<DatabaseHealthResponse> {
		return this.http.get<DatabaseHealthResponse>("/api/health/db");
	}
}
