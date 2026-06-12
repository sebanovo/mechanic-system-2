import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getTenantStatusConfig, TenantStatus } from "../../model";

@Component({
	selector: "app-tenant-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantStatusBadge {
	readonly status = input.required<TenantStatus>();

	protected readonly config = computed(() =>
		getTenantStatusConfig(this.status())
	);
}
