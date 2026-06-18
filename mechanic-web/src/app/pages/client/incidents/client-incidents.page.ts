import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientIncident } from "../../../entities/client/model";
import { getIncidentStatusLabel } from "../../../entities/incident/model";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { APP_ROUTES } from "../../../core/routing/app-routes.constants";
import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-client-incidents-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, HlmButtonImports],
	templateUrl: "./client-incidents.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientIncidentsPage {
	private readonly clientApi = inject(ClientApi);
	private readonly router = inject(Router);

	protected readonly incidents = signal<ClientIncident[]>([]);
	protected readonly loading = signal(false);
	protected readonly error = signal<string | null>(null);
	protected readonly total = signal(0);

	constructor() {
		void this.load();
	}

	protected async load(): Promise<void> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const response = await firstValueFrom(
				this.clientApi.listMyIncidents({ page: 1, page_size: 20 })
			);

			this.incidents.set(response.items);
			this.total.set(response.pagination.total);
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected createIncident(): void {
		void this.router.navigate([APP_ROUTES.client.incidentCreate]);
	}

	protected editIncident(incidentId: string): void {
		void this.router.navigate([APP_ROUTES.client.incidents, incidentId]);
	}

	protected async cancelIncident(incidentId: string): Promise<void> {
		const confirmed = window.confirm(
			"¿Seguro que quieres cancelar este incidente?"
		);

		if (!confirmed) {
			return;
		}

		this.loading.set(true);
		this.error.set(null);

		try {
			await firstValueFrom(this.clientApi.cancelMyIncident(incidentId));
			await this.load();
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected canCancelIncident(status: string | null): boolean {
		return !["CANCELLED", "COMPLETED", "UNATTENDED"].includes(status || "");
	}

	protected formatDate(value: string | null): string {
		if (!value) {
			return "Sin registro";
		}

		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			return value;
		}

		return new Intl.DateTimeFormat("es-BO", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	}

	protected statusLabel(status: string | null): string {
		return getIncidentStatusLabel(status);
	}

	protected priorityLabel(priority: string | null): string {
		return priority || "Sin prioridad";
	}
}
