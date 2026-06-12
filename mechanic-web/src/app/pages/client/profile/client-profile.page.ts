import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";

import { SessionStore } from "../../../core/session/session.store";
import {
	AdminPageShell,
	PageHeader,
} from "../../../shared/custom-components";

@Component({
	selector: "app-client-profile-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader],
	templateUrl: "./client-profile.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfilePage {
	protected readonly sessionStore = inject(SessionStore);

	protected readonly availableTenantsCount = computed(
		() => this.sessionStore.availableTenants().length
	);

	protected readonly currentTenantLabel = computed(() => {
		const tenant = this.sessionStore.currentTenant();

		return tenant?.commercial_name ?? "Sin tenant seleccionado";
	});

	protected readonly currentTenantKind = computed(() => {
		const tenant = this.sessionStore.currentTenant();

		return tenant?.tenant_kind ?? "N/A";
	});

	protected formatDate(value: string | null | undefined): string {
		if (!value) {
			return "Sin información";
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
}
