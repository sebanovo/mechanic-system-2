import { computed, Injectable, signal } from "@angular/core";

import { AuthContext } from "../../entities/session/model";
import { getUserFullName } from "../../entities/user/model";
import { NavigationUserContext } from "../navigation";

const ACCESS_TOKEN_STORAGE_KEY = "mechanic_access_token";

export type SessionStatus = "idle" | "loading" | "authenticated" | "anonymous";

@Injectable({
	providedIn: "root",
})
export class SessionStore {
	private readonly authContextState = signal<AuthContext | null>(null);
	private readonly statusState = signal<SessionStatus>("idle");
	private readonly accessTokenState = signal<string | null>(
		sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
	);

	readonly authContext = this.authContextState.asReadonly();
	readonly status = this.statusState.asReadonly();
	readonly accessToken = this.accessTokenState.asReadonly();

	readonly isLoading = computed(() => this.statusState() === "loading");
	readonly isAuthenticated = computed(
		() => this.statusState() === "authenticated"
	);

	readonly user = computed(() => this.authContextState()?.user ?? null);
	readonly userType = computed(
		() => this.authContextState()?.user_type ?? null
	);
	readonly session = computed(() => this.authContextState()?.session ?? null);

	readonly currentTenant = computed(
		() => this.authContextState()?.current_tenant ?? null
	);
	readonly availableTenants = computed(
		() => this.authContextState()?.available_tenants ?? []
	);
	readonly requiresTenantSelection = computed(
		() => this.authContextState()?.requires_tenant_selection ?? false
	);

	readonly tenantSelected = computed(
		() => !!this.authContextState()?.tenant_id
	);

	readonly userFullName = computed(() => getUserFullName(this.user()));

	readonly navigationUserContext = computed<NavigationUserContext>(() => {
		const auth = this.authContextState();

		return {
			isAuthenticated: this.isAuthenticated(),
			userType: auth?.user_type ?? null,
			roles: auth?.user_type ? [auth.user_type] : [],
			permissions: [],
			tenantSelected: !!auth?.tenant_id,
		};
	});

	setLoading(): void {
		this.statusState.set("loading");
	}

	setAuthContext(context: AuthContext): void {
		this.authContextState.set(context);
		this.statusState.set("authenticated");

		const accessToken = context.tokens?.access_token ?? null;
		this.setAccessToken(accessToken);
	}

	clear(): void {
		this.authContextState.set(null);
		this.statusState.set("anonymous");
		this.setAccessToken(null);
	}

	setAnonymous(): void {
		this.authContextState.set(null);
		this.statusState.set("anonymous");
	}

	private setAccessToken(token: string | null): void {
		this.accessTokenState.set(token);

		if (token) {
			sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
			return;
		}

		sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
	}
}
