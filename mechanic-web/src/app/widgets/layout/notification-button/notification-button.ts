import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideBell } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmIcon } from "@shared/ui/icon";

@Component({
	selector: "app-notification-button",
	standalone: true,
	imports: [HlmButtonImports, HlmIcon, NgIcon],
	providers: [provideIcons({ lucideBell })],
	template: `
		<button
			type="button"
			hlmBtn
			variant="ghost"
			size="icon"
			class="relative cursor-pointer"
			aria-label="Ver notificaciones"
		>
			<ng-icon hlm name="lucideBell" size="sm" />

			<span
				class="bg-destructive absolute top-2 right-2 size-2 rounded-full"
				aria-hidden="true"
			></span>
		</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationButton {}
