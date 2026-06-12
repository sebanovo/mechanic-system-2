import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideArrowLeft,
	lucidePlus,
	lucideRefreshCcw,
} from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-page-header",
	standalone: true,
	imports: [HlmButtonImports, NgIcon],
	providers: [
		provideIcons({
			lucideArrowLeft,
			lucidePlus,
			lucideRefreshCcw,
		}),
	],
	templateUrl: "./page-header.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
	readonly title = input.required<string>();
	readonly description = input<string | null>(null);
	readonly eyebrow = input<string | null>(null);

	readonly showBack = input(false);
	readonly showRefresh = input(false);
	readonly showPrimaryAction = input(false);

	readonly primaryActionLabel = input("Nuevo");
	readonly primaryActionIcon = input("lucidePlus");

	readonly backClicked = output<void>();
	readonly refreshClicked = output<void>();
	readonly primaryActionClicked = output<void>();
}
