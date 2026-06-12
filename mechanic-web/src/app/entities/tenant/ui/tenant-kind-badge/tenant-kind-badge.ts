import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import { getTenantKindLabel, TenantKind } from "../../model";

@Component({
	selector: "app-tenant-kind-badge",
	standalone: true,
	imports: [StatusBadge],
	template: ` <app-status-badge [label]="label()" tone="info" /> `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantKindBadge {
	readonly kind = input.required<TenantKind>();

	protected readonly label = computed(() => getTenantKindLabel(this.kind()));
}
