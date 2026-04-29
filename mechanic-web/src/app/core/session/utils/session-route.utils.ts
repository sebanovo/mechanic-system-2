import { AuthUser, RoleCode } from "../../../features/auth/models/auth.types";

export const AUTH_LOGIN_ROUTE = "/auth/login";
export const APP_FORBIDDEN_ROUTE = "/app/forbidden";

export function getDefaultRouteForRoles(
	roleCodes: readonly RoleCode[] | null | undefined
): string {
	if (!roleCodes?.length) {
		return AUTH_LOGIN_ROUTE;
	}

	if (roleCodes.includes("PLATFORM_ADMIN")) {
		return "/app/dashboard";
	}

	if (roleCodes.includes("PROVIDER_ADMIN")) {
		return "/app/candidates";
	}

	if (roleCodes.includes("TECHNICIAN")) {
		return "/app/dashboard";
	}

	if (roleCodes.includes("CLIENT")) {
		return "/app/dashboard";
	}

	return "/app/dashboard";
}

export function getDefaultRouteForUser(
	user: AuthUser | null | undefined
): string {
	return getDefaultRouteForRoles(user?.roleCodes);
}

export function isSafeLocalReturnUrl(
	returnUrl: string | null | undefined
): returnUrl is string {
	return !!returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//");
}
