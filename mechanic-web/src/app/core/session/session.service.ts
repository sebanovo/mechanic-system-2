import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, of, tap } from "rxjs";

import { AuthApi } from "../../features/auth/api/auth.api";
import { APP_ROUTES } from "../routing";
import { SessionStore } from "./session.store";

@Injectable({
	providedIn: "root",
})
export class SessionService {
	private readonly authApi = inject(AuthApi);
	private readonly router = inject(Router);
	readonly store = inject(SessionStore);

	bootstrap(): Observable<boolean> {
		this.store.setLoading();

		return this.authApi.me().pipe(
			tap(context => this.store.setAuthContext(context)),
			tap(context => {
				if (context.requires_tenant_selection) {
					void this.router.navigateByUrl(APP_ROUTES.auth.selectTenant);
				}
			}),
			map(() => true),
			catchError(() => {
				this.store.setAnonymous();
				return of(false);
			})
		);
	}

	login(email: string, password: string): Observable<void> {
		this.store.setLoading();

		return this.authApi
			.login({
				email,
				password,
				device_type: "WEB",
				device_name: navigator.userAgent,
			})
			.pipe(
				tap(context => this.store.setAuthContext(context)),
				tap(context => {
					if (context.requires_tenant_selection) {
						void this.router.navigateByUrl(APP_ROUTES.auth.selectTenant);
						return;
					}

					void this.router.navigateByUrl(
						this.getDefaultRedirect(context.user_type)
					);
				}),
				map(() => undefined)
			);
	}

	selectTenant(tenantId: string): Observable<void> {
		this.store.setLoading();

		return this.authApi.selectTenant({ tenant_id: tenantId }).pipe(
			tap(context => this.store.setAuthContext(context)),
			tap(() => {
				void this.router.navigateByUrl(APP_ROUTES.tenant.dashboard);
			}),
			map(() => undefined)
		);
	}

	logout(): Observable<void> {
		return this.authApi.logout().pipe(
			tap(() => this.store.clear()),
			tap(() => {
				void this.router.navigateByUrl(APP_ROUTES.auth.login);
			})
		);
	}

	getDefaultRedirect(userType: string): string {
		if (userType === "SUPERADMIN") {
			return APP_ROUTES.platform.dashboard;
		}

		if (userType === "CLIENT") {
			return APP_ROUTES.client.dashboard;
		}

		return APP_ROUTES.tenant.dashboard;
	}
}
