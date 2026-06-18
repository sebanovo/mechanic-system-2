import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientVehicle } from "../../../entities/client/model";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";
import { APP_ROUTES } from "../../../core/routing/app-routes.constants";
import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-client-vehicles-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, HlmButtonImports],
	templateUrl: "./client-vehicles.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientVehiclesPage {
	private readonly clientApi = inject(ClientApi);
	private readonly router = inject(Router);

	protected readonly vehicles = signal<ClientVehicle[]>([]);
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
				this.clientApi.listMyVehicles({ page: 1, page_size: 20 })
			);

			this.vehicles.set(response.items);
			this.total.set(response.pagination.total);
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected createVehicle(): void {
		void this.router.navigate([APP_ROUTES.client.vehicleCreate]);
	}

	protected editVehicle(vehicle: ClientVehicle): void {
		void this.router.navigate([APP_ROUTES.client.vehicles, vehicle.id]);
	}

	protected formatDate(value: string | null): string {
		if (!value) {
			return "Sin registro";
		}

		return new Intl.DateTimeFormat("es-BO", {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(new Date(value));
	}

	protected typeLabel(value: string): string {
		return value || "Sin tipo";
	}

	protected statusLabel(value: string): string {
		return value || "Sin estado";
	}
}
