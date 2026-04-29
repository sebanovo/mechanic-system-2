export type ApiResponse<TData> = {
	success: boolean;
	message: string;
	data: TData;
	meta?: unknown;
};
