import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideChevronDown, lucideUser } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmIcon } from "@shared/ui/icon";

@Component({
	selector: "app-user-menu",
	standalone: true,
	imports: [HlmButtonImports, HlmIcon, NgIcon],
	providers: [provideIcons({ lucideChevronDown, lucideUser })],
	template: `
		<button
			type="button"
			hlmBtn
			variant="ghost"
			class="hidden cursor-pointer items-center gap-2 px-2 sm:inline-flex"
			aria-label="Abrir menú de usuario"
		>
			<span
				class="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full"
			>
				<ng-icon hlm name="lucideUser" size="sm" />
			</span>

			<span class="hidden max-w-32 truncate text-sm font-medium md:inline">
				{{ userName() }}
			</span>

			<ng-icon hlm name="lucideChevronDown" size="sm" />
		</button>

		<button
			type="button"
			hlmBtn
			variant="ghost"
			size="icon"
			class="cursor-pointer sm:hidden"
			aria-label="Abrir menú de usuario"
		>
			<ng-icon hlm name="lucideUser" size="sm" />
		</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenu {
	readonly userName = input("Walter");
}
