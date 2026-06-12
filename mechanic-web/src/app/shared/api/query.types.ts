import { PaginationQuery } from "./pagination.types";

export type SortDirection = "asc" | "desc";

export interface SortQuery {
	sort_by?: string;
	sort_direction?: SortDirection;
}

export interface SearchQuery {
	search?: string;
}

export interface DateRangeQuery {
	from_date?: string;
	to_date?: string;
}

export type PrimitiveQueryValue = string | number | boolean | null | undefined;

export type QueryParamsValue = PrimitiveQueryValue | PrimitiveQueryValue[];

export type QueryParams = Record<string, QueryParamsValue>;

export type ListQuery<TFilters extends QueryParams = QueryParams> =
	PaginationQuery & SortQuery & SearchQuery & DateRangeQuery & TFilters;
