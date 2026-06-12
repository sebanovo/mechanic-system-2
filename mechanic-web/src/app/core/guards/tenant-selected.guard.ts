import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { APP_ROUTES } from "../routing";
import { SessionStore } from "../session/session.store";

export const tenantSelectedGuard: CanActivateFn = () => {
	const router = inject(Router);
	const sessionStore = inject(SessionStore);

	if (!sessionStore.isAuthenticated()) {
		return router.createUrlTree([APP_ROUTES.auth.login]);
	}

	if (sessionStore.tenantSelected()) {
		return true;
	}

	return router.createUrlTree([APP_ROUTES.auth.selectTenant]);
};
