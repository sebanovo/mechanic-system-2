export function removeEmptyValues<T extends Record<string, unknown>>(
	value: T
): Partial<T> {
	return Object.entries(value).reduce<Partial<T>>((acc, [key, item]) => {
		if (item === null || item === undefined || item === "") {
			return acc;
		}

		if (Array.isArray(item) && item.length === 0) {
			return acc;
		}

		return {
			...acc,
			[key]: item,
		};
	}, {});
}
