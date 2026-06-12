import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiClient } from "../../../shared/api";
import {
	User,
	UserCreatePayload,
	UserListData,
	UserListQuery,
	UserPasswordChangePayload,
	UserStatusChangePayload,
	UserTypeChangePayload,
	UserUpdatePayload,
} from "../model";

@Injectable({
	providedIn: "root",
})
export class UserApi {
	private readonly apiClient = inject(ApiClient);

	private readonly platformBasePath = "/platform/users";

	listPlatformUsers(query?: UserListQuery): Observable<UserListData> {
		return this.apiClient.get<UserListData>(this.platformBasePath, query);
	}

	getPlatformUserById(userId: string): Observable<User> {
		return this.apiClient.get<User>(`${this.platformBasePath}/${userId}`);
	}

	createPlatformUser(payload: UserCreatePayload): Observable<User> {
		return this.apiClient.post<User, UserCreatePayload>(
			this.platformBasePath,
			payload
		);
	}

	updatePlatformUser(userId: string, payload: UserUpdatePayload): Observable<User> {
		return this.apiClient.put<User, UserUpdatePayload>(
			`${this.platformBasePath}/${userId}`,
			payload
		);
	}

	changePlatformUserType(
		userId: string,
		payload: UserTypeChangePayload
	): Observable<User> {
		return this.apiClient.patch<User, UserTypeChangePayload>(
			`${this.platformBasePath}/${userId}/type`,
			payload
		);
	}

	changePlatformUserStatus(
		userId: string,
		payload: UserStatusChangePayload
	): Observable<User> {
		return this.apiClient.patch<User, UserStatusChangePayload>(
			`${this.platformBasePath}/${userId}/status`,
			payload
		);
	}

	changePlatformUserPassword(
		userId: string,
		payload: UserPasswordChangePayload
	): Observable<User> {
		return this.apiClient.patch<User, UserPasswordChangePayload>(
			`${this.platformBasePath}/${userId}/password`,
			payload
		);
	}

	deletePlatformUser(userId: string): Observable<User> {
		return this.apiClient.delete<User>(`${this.platformBasePath}/${userId}`);
	}

	restorePlatformUser(userId: string): Observable<User> {
		return this.apiClient.patch<User>(
			`${this.platformBasePath}/${userId}/restore`,
			{}
		);
	}
}
