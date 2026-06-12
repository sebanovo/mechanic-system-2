import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideAlertCircle, lucideRefreshCcw } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-error-state",
	standalone: true,
	imports: [HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideAlertCircle, lucideRefreshCcw })],
	templateUrl: "./error-state.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorState {
	readonly title = input("No se pudo cargar la información");
	readonly description = input("Intenta nuevamente o verifica tu conexión.");
	readonly actionLabel = input("Reintentar");
	readonly showAction = input(true);

	readonly actionClicked = output<void>();
}
