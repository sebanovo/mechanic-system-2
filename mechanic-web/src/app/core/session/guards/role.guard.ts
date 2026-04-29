import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { RoleCode } from "../../../features/auth/models/auth.types";
import { APP_FORBIDDEN_ROUTE } from "../utils/session-route.utils";
import { SessionStore } from "../store/session.store";

export const roleGuard: CanActivateFn = async route => {
	const sessionStore = inject(SessionStore);
	const router = inject(Router);

	if (!sessionStore.initialized()) {
		await sessionStore.bootstrap();
	}

	if (!sessionStore.isAuthenticated()) {
		return router.createUrlTree(["/auth/login"]);
	}

	const allowedRoles = route.data["roles"] as RoleCode[] | undefined;

	if (!allowedRoles?.length) {
		return true;
	}

	if (sessionStore.hasAnyRole(allowedRoles)) {
		return true;
	}

	return router.createUrlTree([APP_FORBIDDEN_ROUTE]);
};
