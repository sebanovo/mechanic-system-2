import { Component, signal, viewChild } from "@angular/core";

import { TechnicianAvailabilityDetail } from "../../../entities/technician-availability/model";
import { UpdateTechnicianAvailabilityForm } from "../../../features/technician-availability/update-technician-availability/update-technician-availability-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { TenantTechnicianAvailabilityList } from "../../../widgets/tenant/tenant-technician-availability-list/tenant-technician-availability-list";

@Component({
	selector: "app-tenant-availability-page",
	standalone: true,
	imports: [
		AdminPageShell,
		PageHeader,
		SideDrawer,
		UpdateTechnicianAvailabilityForm,
		TenantTechnicianAvailabilityList,
	],
	templateUrl: "./tenant-availability.page.html",
})
export class TenantAvailabilityPage {
	protected readonly editingItem = signal<TechnicianAvailabilityDetail | null>(
		null
	);

	private readonly list = viewChild(TenantTechnicianAvailabilityList);

	protected openEditDrawer(item: TechnicianAvailabilityDetail): void {
		this.editingItem.set(item);
	}

	protected closeEditDrawer(): void {
		this.editingItem.set(null);
	}

	protected onUpdated(): void {
		const item = this.editingItem();

		this.editingItem.set(null);

		if (item) {
			this.list()?.load();
			this.list()?.loadStats();
		}
	}
}
