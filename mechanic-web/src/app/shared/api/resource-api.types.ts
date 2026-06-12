import { Observable } from "rxjs";

import { PaginatedResponse } from "./pagination.types";
import { ListQuery, QueryParams } from "./query.types";

export interface ResourceListApi<
	TEntity,
	TFilters extends QueryParams = QueryParams,
> {
	list(query?: ListQuery<TFilters>): Observable<PaginatedResponse<TEntity>>;
}

export interface ResourceDetailApi<TEntity> {
	getById(id: string): Observable<TEntity>;
}

export interface ResourceCreateApi<TEntity, TCreatePayload> {
	create(payload: TCreatePayload): Observable<TEntity>;
}

export interface ResourceUpdateApi<TEntity, TUpdatePayload> {
	update(id: string, payload: TUpdatePayload): Observable<TEntity>;
}

export interface ResourceDeleteApi {
	delete(id: string): Observable<void>;
}

export interface ResourceStatusApi<TEntity, TStatusPayload> {
	changeStatus(id: string, payload: TStatusPayload): Observable<TEntity>;
}
