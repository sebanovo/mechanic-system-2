export type LoadingStatus = "idle" | "loading" | "success" | "error";

export interface LoadingState<TData = unknown> {
	status: LoadingStatus;
	data: TData | null;
	error: string | null;
}

export function createInitialLoadingState<TData>(): LoadingState<TData> {
	return {
		status: "idle",
		data: null,
		error: null,
	};
}

export function createLoadingState<TData>(
	currentData: TData | null = null
): LoadingState<TData> {
	return {
		status: "loading",
		data: currentData,
		error: null,
	};
}

export function createSuccessState<TData>(data: TData): LoadingState<TData> {
	return {
		status: "success",
		data,
		error: null,
	};
}

export function createErrorState<TData>(
	error: string,
	currentData: TData | null = null
): LoadingState<TData> {
	return {
		status: "error",
		data: currentData,
		error,
	};
}
