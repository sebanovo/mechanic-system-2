import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientAssignmentDetail } from "../../../entities/client/model";
import {
	formatAssignmentDate,
	getAssignmentIncidentCode,
	getAssignmentIncidentDescription,
	getAssignmentIncidentLocation,
	getAssignmentStatusLabel,
	getAssignmentTechnicianLabel,
} from "../../../entities/assignment/model";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";

@Component({
	selector: "app-client-assignments-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader],
	templateUrl: "./client-assignments.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientAssignmentsPage {
	private readonly clientApi = inject(ClientApi);

	protected readonly assignments = signal<ClientAssignmentDetail[]>([]);
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
				this.clientApi.listMyAssignments({ page: 1, page_size: 20 })
			);

			this.assignments.set(response.items);
			this.total.set(response.pagination.total);
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected assignmentIncidentCode(item: ClientAssignmentDetail): string {
		return getAssignmentIncidentCode(item);
	}

	protected assignmentIncidentDescription(item: ClientAssignmentDetail): string {
		return getAssignmentIncidentDescription(item);
	}

	protected assignmentIncidentLocation(item: ClientAssignmentDetail): string {
		return getAssignmentIncidentLocation(item);
	}

	protected assignmentTechnicianLabel(item: ClientAssignmentDetail): string {
		return getAssignmentTechnicianLabel(item);
	}

	protected assignmentStatusLabel(item: ClientAssignmentDetail): string {
		return getAssignmentStatusLabel(item.assignment.assignment_status);
	}

	protected assignmentTimelineLabel(item: ClientAssignmentDetail): string {
		if (item.assignment.assignment_status === "COMPLETED") {
			return `Completada: ${formatAssignmentDate(item.assignment.completed_at)}`;
		}

		if (item.assignment.assignment_status === "CANCELLED") {
			return `Cancelada: ${formatAssignmentDate(item.assignment.cancelled_at)}`;
		}

		if (item.assignment.assignment_status === "IN_SERVICE") {
			return `Servicio iniciado: ${formatAssignmentDate(item.assignment.started_at)}`;
		}

		if (item.assignment.assignment_status === "ARRIVED") {
			return `Llegó: ${formatAssignmentDate(item.assignment.arrived_at)}`;
		}

		if (item.assignment.assignment_status === "EN_ROUTE") {
			return `En camino: ${formatAssignmentDate(item.assignment.en_route_at)}`;
		}

		return `Asignada: ${formatAssignmentDate(item.assignment.assigned_at)}`;
	}
}
