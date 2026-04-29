import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { getDefaultRouteForUser } from "../utils/session-route.utils";
import { SessionStore } from "../store/session.store";

export const guestGuard: CanActivateFn = async () => {
	const sessionStore = inject(SessionStore);
	const router = inject(Router);

	if (!sessionStore.initialized()) {
		await sessionStore.bootstrap();
	}

	if (!sessionStore.isAuthenticated()) {
		return true;
	}

	return router.createUrlTree([getDefaultRouteForUser(sessionStore.user())]);
};
