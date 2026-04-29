import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

import { SessionStore } from "../store/session.store";

export const authGuard: CanActivateFn = async (_route, state) => {
	const sessionStore = inject(SessionStore);
	const router = inject(Router);

	if (!sessionStore.initialized()) {
		await sessionStore.bootstrap();
	}

	if (sessionStore.isAuthenticated()) {
		return true;
	}

	return router.createUrlTree(["/auth/login"], {
		queryParams: {
			returnUrl: state.url,
		},
	});
};
