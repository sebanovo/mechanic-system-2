import { Component, signal, viewChild } from "@angular/core";

import { AssignmentTrackingEventDetail } from "../../../entities/assignment-tracking-event/model";
import { AssignmentDetail } from "../../../entities/assignment/model";
import { CreateAssignmentTrackingEventForm } from "../../../features/assignment-tracking-event/create-assignment-tracking-event/create-assignment-tracking-event-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantAssignmentTrackingEventsPanel } from "../../../widgets/tenant/tenant-assignment-tracking-events-panel/tenant-assignment-tracking-events-panel";

@Component({
	selector: "app-tenant-tracking-events-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		CreateAssignmentTrackingEventForm,
		TenantAssignmentTrackingEventsPanel,
	],
	templateUrl: "./tenant-tracking-events.page.html",
})
export class TenantTrackingEventsPage {
	protected readonly selectedAssignment = signal<AssignmentDetail | null>(null);

	private readonly panel = viewChild(TenantAssignmentTrackingEventsPanel);

	protected openCreateDrawer(item: AssignmentDetail): void {
		this.selectedAssignment.set(item);
	}

	protected closeCreateDrawer(): void {
		this.selectedAssignment.set(null);
	}

	protected onCreated(item: AssignmentTrackingEventDetail): void {
		this.selectedAssignment.set(null);
		this.panel()?.patchCreatedEvent(item);
	}
}
