import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { AuditActorType, getAuditActorConfig } from "../../model";

@Component({
	selector: "app-audit-actor-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditActorBadge {
	readonly actorType = input.required<AuditActorType>();

	protected readonly config = computed(() =>
		getAuditActorConfig(this.actorType())
	);
}
