import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
} from "@angular/core";

import { StatusBadge } from "../../../../shared/custom-components";
import {
	getServiceCatalogStatus,
	getServiceCatalogStatusConfig,
	ServiceCatalog,
} from "../../model";

@Component({
	selector: "app-service-catalog-status-badge",
	standalone: true,
	imports: [StatusBadge],
	template: `
		<app-status-badge [label]="config().label" [tone]="config().tone" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCatalogStatusBadge {
	readonly item = input.required<ServiceCatalog>();

	protected readonly config = computed(() =>
		getServiceCatalogStatusConfig(getServiceCatalogStatus(this.item()))
	);
}
