import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideX } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-side-drawer",
	standalone: true,
	imports: [HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideX })],
	templateUrl: "./side-drawer.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideDrawer {
	readonly open = input(false);
	readonly title = input.required<string>();
	readonly description = input<string | null>(null);
	readonly widthClass = input("sm:max-w-xl");

	readonly closed = output<void>();

	protected close(): void {
		this.closed.emit();
	}
}
