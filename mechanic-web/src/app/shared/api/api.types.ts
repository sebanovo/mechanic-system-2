export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface ApiErrorDetail {
	field?: string;
	message: string;
}

export interface ApiErrorResponse {
	success: false;
	message: string;
	error_code?: string;
	request_id?: string;
	details?: ApiErrorDetail[];
}

export interface ApiMessageResponse {
	success: boolean;
	message: string;
}
