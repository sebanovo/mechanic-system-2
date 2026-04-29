import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideBell,
	lucideMenu,
	lucideSearch,
	lucideUser,
} from "@ng-icons/lucide";

import { AuthStore } from "../../../../features/auth/store/auth.store";
import { SessionStore } from "../../../session/store/session.store";
import { AppLayoutState } from "../../services/app-layout.state";
import { UserMenu } from "../user-menu/user-menu";

@Component({
	selector: "app-app-header",
	standalone: true,
	imports: [NgIcon, UserMenu],
	providers: [
		provideIcons({
			lucideBell,
			lucideSearch,
			lucideUser,
			lucideMenu,
		}),
	],
	templateUrl: "./app-header.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
	private readonly sessionStore = inject(SessionStore);
	private readonly authStore = inject(AuthStore);
	private readonly router = inject(Router);

	readonly title = input("Dashboard");
	readonly subtitle = input("Administración");
	readonly showSearch = input(true);
	readonly showNotifications = input(true);
	readonly showProfile = input(true);
	readonly searchPlaceholder = input("Buscar...");

	protected readonly layoutState = inject(AppLayoutState);

	readonly currentUser = this.sessionStore.user;
	readonly changePasswordDialogOpen = signal(false);

	readonly userName = computed(() => {
		const user = this.currentUser();

		if (!user) {
			return "Usuario";
		}

		return (
			user.fullName ||
			`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
			user.email
		);
	});

	readonly userEmail = computed(() => this.currentUser()?.email ?? "");

	readonly avatarUrl = computed(() => null);

	protected openMobileSidebar(): void {
		this.layoutState.openMobileSidebar();
	}

	protected onClickNotifications(): void {
		this.router.navigate(["/app/notifications"]);
	}

	protected onClickPerfil(): void {
		this.router.navigate(["/app/users/profile"]);
	}

	protected onClickSettings(): void {
		this.router.navigate(["/app/settings"]);
	}

	protected async onClickLogout(): Promise<void> {
		await this.authStore.logout();
	}

	protected onClickChangePassword(): void {
		this.changePasswordDialogOpen.set(true);
	}
}
