import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from "@angular/core";

import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-confirm-action-dialog",
	standalone: true,
	imports: [HlmButtonImports],
	templateUrl: "./confirm-action-dialog.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmActionDialog {
	readonly open = input(false);
	readonly title = input.required<string>();
	readonly description = input.required<string>();
	readonly confirmLabel = input("Confirmar");
	readonly cancelLabel = input("Cancelar");
	readonly destructive = input(false);
	readonly loading = input(false);

	readonly confirmed = output<void>();
	readonly cancelled = output<void>();

	protected confirm(): void {
		if (this.loading()) {
			return;
		}

		this.confirmed.emit();
	}

	protected cancel(): void {
		if (this.loading()) {
			return;
		}

		this.cancelled.emit();
	}
}
