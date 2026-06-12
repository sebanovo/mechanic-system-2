import { Component, signal, viewChild } from "@angular/core";

import { CreateTechnicianForm } from "../../../features/technician/create-technician/create-technician-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantTechniciansList } from "../../../widgets/tenant/tenant-technicians-list/tenant-technicians-list";

@Component({
	selector: "app-tenant-technicians-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		CreateTechnicianForm,
		TenantTechniciansList,
	],
	templateUrl: "./tenant-technicians.page.html",
})
export class TenantTechniciansPage {
	protected readonly showCreateDrawer = signal(false);

	private readonly list = viewChild(TenantTechniciansList);

	protected openCreateDrawer(): void {
		this.showCreateDrawer.set(true);
	}

	protected closeCreateDrawer(): void {
		this.showCreateDrawer.set(false);
	}

	protected onCreated(): void {
		this.showCreateDrawer.set(false);
		this.list()?.load();
	}
}
