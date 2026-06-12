import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";

import { HlmButtonImports } from "@shared/ui/button";

import { SessionService } from "../../../core/session/session.service";
import { SessionStore } from "../../../core/session/session.store";
import { getApiErrorMessage } from "../../../shared/api/api-error";

@Component({
	selector: "app-select-tenant-panel",
	standalone: true,
	imports: [HlmButtonImports],
	templateUrl: "./select-tenant-panel.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTenantPanel {
	private readonly sessionService = inject(SessionService);
	protected readonly sessionStore = inject(SessionStore);

	protected readonly selectedTenantId = signal<string | null>(null);
	protected readonly isSubmitting = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected selectTenant(tenantId: string): void {
		this.selectedTenantId.set(tenantId);
		this.errorMessage.set(null);
	}

	protected continue(): void {
		const tenantId = this.selectedTenantId();

		if (!tenantId || this.isSubmitting()) {
			return;
		}

		this.isSubmitting.set(true);

		this.sessionService.selectTenant(tenantId).subscribe({
			next: () => {
				this.isSubmitting.set(false);
			},
			error: error => {
				this.errorMessage.set(getApiErrorMessage(error));
				this.isSubmitting.set(false);
			},
		});
	}
}
