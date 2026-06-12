import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, switchMap, throwError } from "rxjs";

import { APP_ROUTES } from "../routing";
import { SessionService } from "../session/session.service";
import { SessionStore } from "../session/session.store";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	const sessionService = inject(SessionService);
	const sessionStore = inject(SessionStore);

	return next(req).pipe(
		catchError((error: unknown) => {
			if (error instanceof HttpErrorResponse && error.status === 401) {
				if (req.url.includes("/auth/")) {
					return throwError(() => error);
				}

				return sessionService.refreshSession().pipe(
					switchMap(() => {
						const accessToken = sessionStore.accessToken();
						const retryReq = accessToken
							? req.clone({
									withCredentials: true,
									setHeaders: {
										Authorization: `Bearer ${accessToken}`,
									},
								})
							: req.clone({
									withCredentials: true,
								});

						return next(retryReq).pipe(
							catchError(retryError => {
								if (
									retryError instanceof HttpErrorResponse &&
									retryError.status === 401
								) {
									sessionStore.clear();

									void router.navigateByUrl(APP_ROUTES.auth.login);
								}

								return throwError(() => retryError);
							})
						);
					}),
					catchError(refreshError => {
						if (
							refreshError instanceof HttpErrorResponse &&
							refreshError.status === 401
						) {
							sessionStore.clear();

							void router.navigateByUrl(APP_ROUTES.auth.login);
						}

						return throwError(() => error);
					})
				);
			}

			return throwError(() => error);
		})
	);
};
