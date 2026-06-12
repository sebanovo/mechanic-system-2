import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";

import { SessionStore } from "../session/session.store";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
	const sessionStore = inject(SessionStore);
	const accessToken = sessionStore.accessToken();

	const authReq = accessToken
		? req.clone({
				withCredentials: true,
				setHeaders: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
		: req.clone({
				withCredentials: true,
			});

	return next(authReq);
};
