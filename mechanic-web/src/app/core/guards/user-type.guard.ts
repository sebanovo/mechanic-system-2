import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { APP_ROUTES } from "../routing";
import { SessionStore } from "../session/session.store";

export function userTypeGuard(allowedTypes: string[]): CanActivateFn {
	return () => {
		const router = inject(Router);
		const sessionStore = inject(SessionStore);

		const userType = sessionStore.userType();

		if (!sessionStore.isAuthenticated()) {
			return router.createUrlTree([APP_ROUTES.auth.login]);
		}

		if (userType && allowedTypes.includes(userType)) {
			return true;
		}

		return router.createUrlTree([APP_ROUTES.public.home]);
	};
}
