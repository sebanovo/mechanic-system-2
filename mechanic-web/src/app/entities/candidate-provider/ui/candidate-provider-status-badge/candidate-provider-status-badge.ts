import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	CandidateProviderStatus,
	getCandidateProviderStatusConfig,
} from "../../model";

@Component({
	selector: "app-candidate-provider-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateProviderStatusBadge {
	readonly status = input.required<CandidateProviderStatus>();

	protected readonly config = computed(() =>
		getCandidateProviderStatusConfig(this.status())
	);
}
