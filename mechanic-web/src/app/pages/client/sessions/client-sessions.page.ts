import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { ClientApi } from "../../../entities/client/api";
import { ClientSession } from "../../../entities/client/model";
import { getApiErrorMessage } from "../../../shared/api";
import { AdminPageShell, PageHeader } from "../../../shared/custom-components";

@Component({
	selector: "app-client-sessions-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader],
	templateUrl: "./client-sessions.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSessionsPage {
	private readonly clientApi = inject(ClientApi);

	protected readonly sessions = signal<ClientSession[]>([]);
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
				this.clientApi.listMySessions({ page: 1, page_size: 20 })
			);

			this.sessions.set(response.items);
			this.total.set(response.pagination.total);
		} catch (error) {
			this.error.set(getApiErrorMessage(error));
		} finally {
			this.loading.set(false);
		}
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

	protected statusLabel(value: string): string {
		return value || "Sin estado";
	}
}

