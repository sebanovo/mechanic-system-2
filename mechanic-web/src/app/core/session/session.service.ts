import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
	catchError,
	map,
	Observable,
	of,
	tap,
	throwError,
} from "rxjs";

import { AuthContext } from "../../entities/session/model";
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
			tap(context => this.handleAuthenticatedContext(context)),
			map(() => true),
			catchError(() =>
				this.refreshSession().pipe(
					tap(context => this.navigateAfterAuth(context)),
					map(() => true),
					catchError(() => {
						this.setAnonymousIfStillUnauthenticated();
						return of(false);
					})
				)
			)
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
				tap(context => this.handleAuthenticatedContext(context)),
				catchError(error => {
					this.store.setAnonymous();
					return throwError(() => error);
				}),
				map(() => undefined)
			);
	}

	registerClient(payload: {
		email: string;
		password: string;
		first_name: string;
		last_name: string;
	}): Observable<void> {
		this.store.setLoading();

		return this.authApi.registerClient(payload).pipe(
			tap(context => this.handleAuthenticatedContext(context)),
			catchError(error => {
				this.store.setAnonymous();
				return throwError(() => error);
			}),
			map(() => undefined)
		);
	}

	registerTenant(payload: {
		email: string;
		password: string;
		first_name: string;
		last_name: string;
		commercial_name: string;
		tenant_kind?: "WORKSHOP" | "WORKSHOP_NETWORK" | "INDEPENDENT_TECHNICIAN";
	}): Observable<void> {
		this.store.setLoading();

		return this.authApi.registerTenant(payload).pipe(
			tap(context => this.handleAuthenticatedContext(context)),
			catchError(error => {
				this.store.setAnonymous();
				return throwError(() => error);
			}),
			map(() => undefined)
		);
	}

	selectTenant(tenantId: string): Observable<void> {
		this.store.setLoading();

		return this.authApi.selectTenant({ tenant_id: tenantId }).pipe(
			tap(context => this.handleAuthenticatedContext(context)),
			catchError(error => {
				const currentContext = this.store.authContext();

				if (currentContext) {
					this.store.setAuthContext(currentContext);
				} else {
					this.store.setAnonymous();
				}

				return throwError(() => error);
			}),
			map(() => undefined)
		);
	}

	refreshSession(): Observable<AuthContext> {
		return this.authApi.refresh().pipe(
			tap(context => this.store.setAuthContext(context))
		);
	}

	logout(): Observable<void> {
		this.store.setLoading();

		return this.authApi.logout().pipe(
			catchError(() => of(undefined)),
			tap(() => {
				this.store.clear();
				void this.router.navigateByUrl(APP_ROUTES.auth.login);
			}),
			map(() => undefined)
		);
	}

	getDefaultRedirect(userType: string): string {
		if (userType === "SUPERADMIN") {
			return APP_ROUTES.platform.dashboard;
		}

		if (userType === "CLIENT") {
			return APP_ROUTES.client.dashboard;
		}

		if (userType === "TECHNICIAN") {
			return APP_ROUTES.tenant.technicianDashboard;
		}

		return APP_ROUTES.tenant.dashboard;
	}

	private handleAuthenticatedContext(context: AuthContext): void {
		this.store.setAuthContext(context);
		this.navigateAfterAuth(context);
	}

	private navigateAfterAuth(context: AuthContext): void {
		if (context.requires_tenant_selection) {
			void this.router.navigateByUrl(APP_ROUTES.auth.selectTenant);
			return;
		}

		void this.router.navigateByUrl(this.getDefaultRedirect(context.user_type));
	}

	private setAnonymousIfStillUnauthenticated(): void {
		if (this.store.isAuthenticated() || this.store.accessToken()) {
			return;
		}

		this.store.setAnonymous();
	}
}
