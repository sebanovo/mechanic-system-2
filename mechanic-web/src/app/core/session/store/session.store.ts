import { computed, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { toAuthUser } from "../../../features/auth/adapters/auth.adapter";
import { AuthUser, RoleCode } from "../../../features/auth/models/auth.types";
import { AuthService } from "../../../features/auth/services/auth.service";
import { SessionBootstrapResult } from "../model/session-result.type";
import { SessionState } from "../model/session-state.type";

@Injectable({
	providedIn: "root",
})
export class SessionStore {
	private readonly authService = inject(AuthService);

	private readonly initialState: SessionState = {
		status: "idle",
		initialized: false,
		user: null,
		errorMessage: null,
	};

	private readonly stateSignal = signal<SessionState>(this.initialState);

	readonly state = this.stateSignal.asReadonly();

	readonly status = computed(() => this.state().status);
	readonly initialized = computed(() => this.state().initialized);
	readonly user = computed(() => this.state().user);
	readonly errorMessage = computed(() => this.state().errorMessage);

	readonly isIdle = computed(() => this.status() === "idle");
	readonly isBootstrapping = computed(() => this.status() === "bootstrapping");
	readonly isAuthenticated = computed(() => this.status() === "authenticated");
	readonly isUnauthenticated = computed(
		() => this.status() === "unauthenticated"
	);
	readonly isReady = computed(() => this.initialized());

	readonly roleCodes = computed<RoleCode[]>(() => this.user()?.roleCodes ?? []);

	/**
	 * Alias de compatibilidad.
	 * El AppSidebar y otros componentes existentes usan sessionStore.roles().
	 */
	readonly roles = this.roleCodes;

	readonly isPlatformAdmin = computed(() =>
		this.hasAnyRole(["PLATFORM_ADMIN"])
	);

	readonly isProviderAdmin = computed(() =>
		this.hasAnyRole(["PROVIDER_ADMIN"])
	);

	readonly isTechnician = computed(() => this.hasAnyRole(["TECHNICIAN"]));

	readonly isClient = computed(() => this.hasAnyRole(["CLIENT"]));

	readonly displayName = computed(() => {
		const currentUser = this.user();

		if (!currentUser) {
			return "Invitado";
		}

		return currentUser.fullName || currentUser.email;
	});

	async bootstrap(): Promise<void> {
		this.startBootstrap();

		const result = await this.resolveBootstrapResult();

		this.applyBootstrapResult(result);
	}

	setAuthenticated(user: AuthUser): void {
		this.stateSignal.set({
			status: "authenticated",
			initialized: true,
			user,
			errorMessage: null,
		});
	}

	setUnauthenticated(errorMessage: string | null = null): void {
		this.stateSignal.set({
			status: "unauthenticated",
			initialized: true,
			user: null,
			errorMessage,
		});
	}

	clearSession(): void {
		this.authService.logout();
		this.setUnauthenticated(null);
	}

	reset(): void {
		this.stateSignal.set(this.initialState);
	}

	hasAnyRole(allowedRoles: readonly RoleCode[]): boolean {
		const currentRoles = this.roleCodes();

		if (!allowedRoles.length) {
			return true;
		}

		return allowedRoles.some(role => currentRoles.includes(role));
	}

	private async resolveBootstrapResult(): Promise<SessionBootstrapResult> {
		if (!this.authService.hasToken()) {
			return {
				status: "unauthenticated",
				user: null,
				errorMessage: null,
			};
		}

		try {
			const userDto = await firstValueFrom(this.authService.getMe());

			return {
				status: "authenticated",
				user: toAuthUser(userDto),
				errorMessage: null,
			};
		} catch {
			this.authService.logout();

			return {
				status: "unauthenticated",
				user: null,
				errorMessage: "La sesión expiró o ya no es válida.",
			};
		}
	}

	private startBootstrap(): void {
		this.stateSignal.set({
			status: "bootstrapping",
			initialized: false,
			user: null,
			errorMessage: null,
		});
	}

	private applyBootstrapResult(result: SessionBootstrapResult): void {
		if (result.status === "authenticated") {
			this.setAuthenticated(result.user);
			return;
		}

		this.setUnauthenticated(result.errorMessage);
	}
}
