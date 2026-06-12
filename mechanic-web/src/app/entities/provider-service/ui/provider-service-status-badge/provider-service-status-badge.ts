import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getProviderServiceStatus,
	getProviderServiceStatusConfig,
	ProviderServiceDetail,
} from "../../model";

@Component({
	selector: "app-provider-service-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderServiceStatusBadge {
	readonly item = input.required<ProviderServiceDetail>();

	protected readonly config = computed(() =>
		getProviderServiceStatusConfig(getProviderServiceStatus(this.item()))
	);
}
