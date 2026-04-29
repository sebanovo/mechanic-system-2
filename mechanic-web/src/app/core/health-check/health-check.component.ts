import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Observable, map } from "rxjs";

import {
	DatabaseHealthResponse,
	HealthService,
	SystemInfoResponse,
} from "./health.service";

type HealthAction = "health" | "readiness" | "info";

type HealthPanelResponse = {
	title: string;
	data: DatabaseHealthResponse | SystemInfoResponse;
};

@Component({
	selector: "app-health-check",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./health-check.component.html",
})
export class HealthCheckComponent {
	private readonly healthService = inject(HealthService);

	readonly loadingAction = signal<HealthAction | null>(null);
	readonly response = signal<HealthPanelResponse | null>(null);
	readonly error = signal<string | null>(null);

	handleCheckHealth(): void {
		this.executeRequest("health");
	}

	handleCheckReadiness(): void {
		this.executeRequest("readiness");
	}

	handleCheckInfo(): void {
		this.executeRequest("info");
	}

	handleCheckDatabase(): void {
		this.handleCheckHealth();
	}

	private executeRequest(action: HealthAction): void {
		this.loadingAction.set(action);
		this.response.set(null);
		this.error.set(null);

		this.buildRequest(action).subscribe({
			next: (result: HealthPanelResponse) => {
				this.response.set(result);
				this.loadingAction.set(null);
			},
			error: (err: unknown) => {
				this.error.set(this.getErrorMessage(err));
				this.loadingAction.set(null);
			},
		});
	}

	private buildRequest(action: HealthAction): Observable<HealthPanelResponse> {
		switch (action) {
			case "health":
				return this.healthService.checkHealth().pipe(
					map(data => ({
						title: "Health check",
						data,
					}))
				);

			case "readiness":
				return this.healthService.checkReadiness().pipe(
					map(data => ({
						title: "Readiness check",
						data,
					}))
				);

			case "info":
				return this.healthService.getSystemInfo().pipe(
					map(data => ({
						title: "System info",
						data,
					}))
				);
		}
	}

	private getErrorMessage(err: unknown): string {
		if (err instanceof Error) {
			return err.message;
		}

		if (
			typeof err === "object" &&
			err !== null &&
			"message" in err &&
			typeof err.message === "string"
		) {
			return err.message;
		}

		return "No se pudo consultar el backend.";
	}
}
