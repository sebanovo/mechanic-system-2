import {
	NavigationGroup,
	NavigationItem,
	NavigationUserContext,
} from "./navigation.types";

export function filterNavigationGroups(
	groups: NavigationGroup[],
	userContext: NavigationUserContext
): NavigationGroup[] {
	return groups
		.map(group => ({
			...group,
			items: filterNavigationItems(group.items, userContext),
		}))
		.filter(group => group.items.length > 0);
}

export function filterNavigationItems(
	items: NavigationItem[],
	userContext: NavigationUserContext
): NavigationItem[] {
	return items
		.filter(item => canShowNavigationItem(item, userContext))
		.map(item => ({
			...item,
			children: item.children
				? filterNavigationItems(item.children, userContext)
				: undefined,
		}));
}

export function canShowNavigationItem(
	item: NavigationItem,
	userContext: NavigationUserContext
): boolean {
	if (item.requiresAuth && !userContext.isAuthenticated) {
		return false;
	}

	if (item.requiresTenant && !userContext.tenantSelected) {
		return false;
	}

	if (
		item.allowedUserTypes?.length &&
		(!userContext.userType ||
			!item.allowedUserTypes.includes(userContext.userType))
	) {
		return false;
	}

	if (
		item.requiredRoles?.length &&
		!item.requiredRoles.some(role => userContext.roles.includes(role))
	) {
		return false;
	}

	if (
		item.requiredPermissions?.length &&
		!item.requiredPermissions.every(permission =>
			userContext.permissions.includes(permission)
		)
	) {
		return false;
	}

	return true;
}
