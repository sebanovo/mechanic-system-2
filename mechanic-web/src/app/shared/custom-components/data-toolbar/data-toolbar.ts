import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideFilter,
	lucideRefreshCcw,
	lucideSlidersHorizontal,
} from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";

import { SearchInput } from "../search-input/search-input";

@Component({
	selector: "app-data-toolbar",
	standalone: true,
	imports: [HlmButtonImports, NgIcon, SearchInput],
	providers: [
		provideIcons({
			lucideFilter,
			lucideRefreshCcw,
			lucideSlidersHorizontal,
		}),
	],
	templateUrl: "./data-toolbar.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataToolbar {
	readonly search = input("");
	readonly searchPlaceholder = input("Buscar...");
	readonly showSearch = input(true);
	readonly showRefresh = input(true);
	readonly showFilters = input(false);
	readonly showAdvancedFilters = input(false);

	readonly searchChanged = output<string>();
	readonly refreshClicked = output<void>();
	readonly filtersClicked = output<void>();
	readonly advancedFiltersClicked = output<void>();
}
