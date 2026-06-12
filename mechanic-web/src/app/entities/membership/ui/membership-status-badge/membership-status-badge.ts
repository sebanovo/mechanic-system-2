import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getMembershipStatusConfig, MembershipStatus } from "../../model";

@Component({
	selector: "app-membership-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembershipStatusBadge {
	readonly status = input.required<MembershipStatus>();

	protected readonly config = computed(() =>
		getMembershipStatusConfig(this.status())
	);
}
