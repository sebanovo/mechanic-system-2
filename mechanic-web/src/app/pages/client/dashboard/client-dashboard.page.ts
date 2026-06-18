import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientOperationalDashboard } from "../../../entities/client/model";
import { getApiErrorMessage } from "../../../shared/api";
import {
	AdminPageShell,
	ErrorState,
	LoadingState,
	PageHeader,
	StatCard,
} from "../../../shared/custom-components";

@Component({
	selector: "app-client-dashboard-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		StatCard,
		LoadingState,
		ErrorState,
	],
	templateUrl: "./client-dashboard.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDashboardPage {
	private readonly clientApi = inject(ClientApi);

	protected readonly dashboard = signal<ClientOperationalDashboard | null>(null);
	protected readonly loading = signal(false);
	protected readonly error = signal<string | null>(null);

	constructor() {
		void this.load();
	}

	protected async load(): Promise<void> {
		this.loading.set(true);
		this.error.set(null);

		try {
			const dashboard = await firstValueFrom(
				this.clientApi.getMyOperationalDashboard()
			);

			this.dashboard.set(dashboard);
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
	}

	protected formatNumber(value: number | null | undefined): string {
		if (value === null || value === undefined || Number.isNaN(value)) {
			return "0";
		}

		return new Intl.NumberFormat("es-BO", {
			maximumFractionDigits: 0,
		}).format(value);
	}

	protected formatPercent(value: number | null | undefined): string {
		if (value === null || value === undefined || Number.isNaN(value)) {
			return "0%";
		}

		return `${new Intl.NumberFormat("es-BO", {
			maximumFractionDigits: 1,
		}).format(value)}%`;
	}

	protected barWidth(value: number, maxValue: number): string {
		if (!maxValue || maxValue <= 0) {
			return "0%";
		}

		return `${Math.max(6, Math.round((value / maxValue) * 100))}%`;
	}
}

