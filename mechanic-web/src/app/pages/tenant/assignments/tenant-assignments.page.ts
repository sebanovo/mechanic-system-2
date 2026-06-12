import { Component, signal, viewChild } from "@angular/core";

import { AssignmentDetail } from "../../../entities/assignment/model";
import { CreateAssignmentForm } from "../../../features/assignment/create-assignment/create-assignment-form";
import { EditAssignmentForm } from "../../../features/assignment/edit-assignment/edit-assignment-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantAssignmentsList } from "../../../widgets/tenant/tenant-assignments-list/tenant-assignments-list";

@Component({
	selector: "app-tenant-assignments-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		CreateAssignmentForm,
		EditAssignmentForm,
		TenantAssignmentsList,
	],
	templateUrl: "./tenant-assignments.page.html",
})
export class TenantAssignmentsPage {
	protected readonly showCreateDrawer = signal(false);
	protected readonly editingItem = signal<AssignmentDetail | null>(null);

	private readonly list = viewChild(TenantAssignmentsList);

	protected openCreateDrawer(): void {
		this.editingItem.set(null);
		this.showCreateDrawer.set(true);
	}

	protected closeCreateDrawer(): void {
		this.showCreateDrawer.set(false);
	}

	protected openEditDrawer(item: AssignmentDetail): void {
		this.showCreateDrawer.set(false);
		this.editingItem.set(item);
	}

	protected closeEditDrawer(): void {
		this.editingItem.set(null);
	}

	protected onCreated(): void {
		this.showCreateDrawer.set(false);
		this.list()?.load();
		this.list()?.loadStats();
	}

	protected onUpdated(item: AssignmentDetail): void {
		this.editingItem.set(null);
		this.list()?.patchItem(item);
		this.list()?.loadStats();
	}
}
