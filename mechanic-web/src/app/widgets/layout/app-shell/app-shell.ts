import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

import {
	CLIENT_NAVIGATION,
	filterNavigationGroups,
	NavigationGroup,
	PLATFORM_NAVIGATION,
	TENANT_NAVIGATION,
} from "../../../core/navigation";
import { SessionStore } from "../../../core/session/session.store";

import { AppHeader } from "../app-header/app-header";
import { AppSidebar } from "../app-sidebar/app-sidebar";

type PrivateAppArea = "CLIENT" | "TENANT" | "PLATFORM";

@Component({
	selector: "app-shell",
	standalone: true,
	imports: [AppHeader, AppSidebar],
	templateUrl: "./app-shell.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
	private readonly router = inject(Router);
	protected readonly sessionStore = inject(SessionStore);

	protected readonly currentUrl = signal(this.router.url);
	protected readonly isMobileSidebarOpen = signal(false);

	protected readonly currentArea = computed<PrivateAppArea>(() => {
		const url = this.currentUrl();

		if (url.startsWith("/platform")) {
			return "PLATFORM";
		}

		if (url.startsWith("/client")) {
			return "CLIENT";
		}

		return "TENANT";
	});

	protected readonly shellTitle = computed(() => {
		const area = this.currentArea();

		if (area === "PLATFORM") {
			return "Panel plataforma";
		}

		if (area === "CLIENT") {
			return "Panel cliente";
		}

		return "Panel taller";
	});

	protected readonly shellSubtitle = computed(() => {
		const area = this.currentArea();

		if (area === "PLATFORM") {
			return "Administración general del sistema";
		}

		if (area === "CLIENT") {
			return "Gestiona tus incidentes, vehículos y asistencias";
		}

		return "Gestiona incidentes, técnicos, servicios y asignaciones";
	});

	protected readonly contextLabel = computed(() => {
		const userType = this.sessionStore.userType();

		if (userType === "SUPERADMIN") {
			return "Superadmin";
		}

		if (userType === "CLIENT") {
			return "Cliente";
		}

		if (userType === "TECHNICIAN") {
			return "Técnico";
		}

		return "Taller";
	});

	protected readonly tenantName = computed(() => {
		const tenant = this.sessionStore.currentTenant();

		return tenant?.commercial_name ?? null;
	});

	protected readonly rawNavigationGroups = computed<NavigationGroup[]>(() => {
		const area = this.currentArea();

		if (area === "PLATFORM") {
			return PLATFORM_NAVIGATION;
		}

		if (area === "CLIENT") {
			return CLIENT_NAVIGATION;
		}

		return TENANT_NAVIGATION;
	});

	protected readonly navigationGroups = computed(() =>
		filterNavigationGroups(
			this.rawNavigationGroups(),
			this.sessionStore.navigationUserContext()
		)
	);

	protected readonly userName = computed(() => {
		return this.sessionStore.userFullName() || "Usuario";
	});

	constructor() {
		this.router.events
			.pipe(
				filter(
					(event): event is NavigationEnd => event instanceof NavigationEnd
				)
			)
			.subscribe(event => {
				this.currentUrl.set(event.urlAfterRedirects);
				this.closeMobileSidebar();
			});
	}

	protected openMobileSidebar(): void {
		this.isMobileSidebarOpen.set(true);
	}

	protected closeMobileSidebar(): void {
		this.isMobileSidebarOpen.set(false);
	}
}
