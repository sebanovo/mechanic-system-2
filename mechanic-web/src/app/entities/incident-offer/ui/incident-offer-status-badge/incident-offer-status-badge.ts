import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getIncidentOfferStatusConfig, IncidentOfferStatus } from "../../model";

@Component({
	selector: "app-incident-offer-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentOfferStatusBadge {
	readonly status = input.required<IncidentOfferStatus>();

	protected readonly config = computed(() =>
		getIncidentOfferStatusConfig(this.status())
	);
}
