import {
	ChangeDetectionStrategy,
	Component,
	input,
	model,
	output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideSearch, lucideX } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";

@Component({
	selector: "app-search-input",
	standalone: true,
	imports: [FormsModule, HlmInputImports, HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideSearch, lucideX })],
	templateUrl: "./search-input.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
	readonly value = model("");
	readonly placeholder = input("Buscar...");
	readonly ariaLabel = input("Buscar");

	readonly searchChanged = output<string>();
	readonly cleared = output<void>();

	protected onValueChange(value: string): void {
		this.value.set(value);
		this.searchChanged.emit(value);
	}

	protected clear(): void {
		this.value.set("");
		this.searchChanged.emit("");
		this.cleared.emit();
	}
}
