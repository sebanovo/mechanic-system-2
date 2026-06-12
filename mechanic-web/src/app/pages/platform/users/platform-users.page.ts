import { Component, signal, viewChild } from "@angular/core";

import { User } from "../../../entities/user/model";
import { CreateUserForm } from "../../../features/user/create-user/create-user-form";
import {
	AdminPageShell,
	PageHeader,
	SideDrawer,
} from "../../../shared/custom-components";
import { PlatformUsersList } from "../../../widgets/platform/platform-users-list/platform-users-list";

@Component({
	selector: "app-platform-users-page",
	standalone: true,
	imports: [AdminPageShell, PageHeader, SideDrawer, CreateUserForm, PlatformUsersList],
	templateUrl: "./platform-users.page.html",
})
export class PlatformUsersPage {
	protected readonly showCreateDrawer = signal(false);

	private readonly list = viewChild(PlatformUsersList);

	protected openCreateDrawer(): void {
		this.showCreateDrawer.set(true);
	}

	protected closeCreateDrawer(): void {
		this.showCreateDrawer.set(false);
	}

	protected onCreated(_: User): void {
		this.showCreateDrawer.set(false);
		this.list()?.load();
		this.list()?.loadStats();
	}
}
