import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideChevronDown,
	lucideLogOut,
	lucideUser,
	lucideUserRound,
} from "@ng-icons/lucide";
import { finalize } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmDropdownMenuImports } from "@shared/ui/dropdown-menu";
import { HlmIcon } from "@shared/ui/icon";

import { APP_ROUTES } from "../../../core/routing";
import { SessionService } from "../../../core/session/session.service";
import { SessionStore } from "../../../core/session/session.store";

@Component({
	selector: "app-user-menu",
	standalone: true,
	imports: [
		RouterLink,
		HlmButtonImports,
		HlmDropdownMenuImports,
		HlmIcon,
		NgIcon,
	],
	providers: [
		provideIcons({
			lucideChevronDown,
			lucideLogOut,
			lucideUser,
			lucideUserRound,
		}),
	],
	template: `
		<div class="relative">
			<button
				type="button"
				hlmBtn
				variant="ghost"
				class="hidden cursor-pointer items-center gap-2 px-2 sm:inline-flex"
				aria-label="Abrir menú de usuario"
				[hlmDropdownMenuTrigger]="userMenu"
				[align]="'end'"
				[side]="'bottom'"
			>
				<span
					class="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full"
				>
					<ng-icon hlm name="lucideUserRound" size="sm" />
				</span>

				<span class="hidden max-w-32 truncate text-sm font-medium md:inline">
					{{ userName() }}
				</span>

				<ng-icon hlm name="lucideChevronDown" size="sm" />
			</button>

			<button
				type="button"
				hlmBtn
				variant="ghost"
				size="icon"
				class="cursor-pointer sm:hidden"
				aria-label="Abrir menú de usuario"
				[hlmDropdownMenuTrigger]="userMenu"
				[align]="'end'"
				[side]="'bottom'"
			>
				<ng-icon hlm name="lucideUser" size="sm" />
			</button>

			<ng-template #userMenu>
				<div
					hlmDropdownMenu
					class="bg-popover text-popover-foreground min-w-56 overflow-hidden rounded-md border p-1 shadow-md"
				>
					<div class="px-2 py-1.5">
						<p class="truncate text-sm font-semibold">{{ userName() }}</p>
						<p class="text-muted-foreground truncate text-xs">
							{{ userTypeLabel() }}
						</p>
					</div>

					<div hlmDropdownMenuSeparator></div>

					<a
						hlmDropdownMenuItem
						[routerLink]="profileRoute()"
						class="cursor-pointer"
					>
						<ng-icon name="lucideUserRound" class="size-4" />
						{{ profileLabel() }}
					</a>

					<button
						type="button"
						hlmDropdownMenuItem
						variant="destructive"
						class="cursor-pointer"
						[disabled]="isLoggingOut()"
						(click)="logout()"
					>
						<ng-icon name="lucideLogOut" class="size-4" />
						@if (isLoggingOut()) {
							Cerrando sesión...
						} @else {
							Cerrar sesión
						}
					</button>
				</div>
			</ng-template>
		</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenu {
	private readonly sessionService = inject(SessionService);
	protected readonly sessionStore = inject(SessionStore);

	protected readonly isLoggingOut = signal(false);

	protected readonly userName = computed(
		() => this.sessionStore.userFullName() || "Usuario"
	);

	protected readonly userTypeLabel = computed(() => {
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

		if (userType === "TENANT_OWNER") {
			return "Taller";
		}

		return "Cuenta";
	});

	protected readonly profileLabel = computed(() => {
		const userType = this.sessionStore.userType();

		if (userType === "CLIENT") {
			return "Ir a mi perfil";
		}

		if (userType === "TENANT_OWNER") {
			return "Ir a configuración";
		}

		if (userType === "TECHNICIAN") {
			return "Ir a mi panel";
		}

		if (userType === "SUPERADMIN") {
			return "Ir al panel";
		}

		return "Ir a mi cuenta";
	});

	protected readonly profileRoute = computed(() => {
		const userType = this.sessionStore.userType();

		if (userType === "CLIENT") {
			return APP_ROUTES.client.profile;
		}

		if (userType === "TENANT_OWNER") {
			return APP_ROUTES.tenant.settings;
		}

		if (userType === "TECHNICIAN") {
			return APP_ROUTES.tenant.technicianDashboard;
		}

		if (userType === "SUPERADMIN") {
			return APP_ROUTES.platform.dashboard;
		}

		return APP_ROUTES.auth.login;
	});

	protected logout(): void {
		if (this.isLoggingOut()) {
			return;
		}

		this.isLoggingOut.set(true);

		this.sessionService
			.logout()
			.pipe(finalize(() => this.isLoggingOut.set(false)))
			.subscribe();
	}
}
