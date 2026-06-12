export interface PaginationQuery {
	page?: number;
	page_size?: number;
}

export interface PaginationMeta {
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
	has_next: boolean;
	has_previous: boolean;
}

export interface PaginatedResponse<T> {
	items: T[];
	meta: PaginationMeta;
}
