import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideMoreVertical } from "@ng-icons/lucide";

import { HlmButtonImports } from "@shared/ui/button";

export interface ResourceActionItem {
	id: string;
	label: string;
	destructive?: boolean;
	disabled?: boolean;
}

@Component({
	selector: "app-resource-actions-menu",
	standalone: true,
	imports: [HlmButtonImports, NgIcon],
	providers: [provideIcons({ lucideMoreVertical })],
	templateUrl: "./resource-actions-menu.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceActionsMenu {
	readonly actions = input.required<ResourceActionItem[]>();

	readonly actionSelected = output<string>();

	protected readonly open = signal(false);

	protected toggle(): void {
		this.open.update(value => !value);
	}

	protected selectAction(action: ResourceActionItem): void {
		if (action.disabled) {
			return;
		}

		this.open.set(false);
		this.actionSelected.emit(action.id);
	}
}
