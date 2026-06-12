import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getProviderOperationalStatusConfig,
	ProviderOperationalStatus,
} from "../../model";

@Component({
	selector: "app-provider-operational-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderOperationalStatusBadge {
	readonly status = input.required<ProviderOperationalStatus>();

	protected readonly config = computed(() =>
		getProviderOperationalStatusConfig(this.status())
	);
}
