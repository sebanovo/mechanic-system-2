import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
	selector: "app-loading-state",
	standalone: true,
	templateUrl: "./loading-state.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingState {
	readonly title = input("Cargando información");
	readonly description = input(
		"Espera un momento mientras obtenemos los datos."
	);
	readonly minHeight = input("min-h-64");
}
