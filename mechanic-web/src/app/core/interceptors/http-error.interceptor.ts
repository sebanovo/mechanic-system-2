import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

import { APP_ROUTES } from "../routing";
import { SessionStore } from "../session/session.store";

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	const sessionStore = inject(SessionStore);

	return next(req).pipe(
		catchError((error: unknown) => {
			if (error instanceof HttpErrorResponse && error.status === 401) {
				sessionStore.clear();

				if (!req.url.includes("/auth/login")) {
					void router.navigateByUrl(APP_ROUTES.auth.login);
				}
			}

			return throwError(() => error);
		})
	);
};
