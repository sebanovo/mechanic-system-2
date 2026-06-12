import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideCalendar,
	lucideClock,
	lucideFingerprint,
	lucideHash,
	lucideMail,
	lucideMonitor,
	lucidePhone,
	lucideShield,
	lucideUser,
	lucideUsers,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";
import { UserApi } from "../../../entities/user/api";
import {
	createEmptyUserPagination,
	formatUserDate,
	getUserFullName,
	getUserStatusLabel,
	getUserTypeLabel,
	USER_STATUS_OPTIONS,
	USER_TYPE_OPTIONS,
	User,
	UserListQuery,
	UserPagination,
	UserStatus,
	UserType,
} from "../../../entities/user/model";
import { UserStatusBadge } from "../../../entities/user/ui";
import { getApiErrorMessage } from "../../../shared/api";
import {
	ConfirmActionDialog,
	DataToolbar,
	ErrorState,
	LoadingState,
	PageSection,
	Pagination,
	ResourceActionItem,
	ResourceActionsMenu,
	SideDrawer,
	StatCard,
} from "../../../shared/custom-components";
import { ChangeUserPasswordForm } from "../../../features/user/change-user-password/change-user-password-form";
import { ChangeUserStatusForm } from "../../../features/user/change-user-status/change-user-status-form";
import { ChangeUserTypeForm } from "../../../features/user/change-user-type/change-user-type-form";
import { EditUserForm } from "../../../features/user/edit-user/edit-user-form";

type PendingUserRemoval = {
	item: User;
	title: string;
	description: string;
	confirmLabel: string;
};

@Component({
	selector: "app-platform-users-list",
	standalone: true,
	imports: [
		NgIcon,
		HlmButtonImports,
		HlmInputImports,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		ConfirmActionDialog,
		StatCard,
		UserStatusBadge,
		EditUserForm,
		ChangeUserTypeForm,
		ChangeUserPasswordForm,
		ChangeUserStatusForm,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideClock,
			lucideFingerprint,
			lucideHash,
			lucideMail,
			lucideMonitor,
			lucidePhone,
			lucideShield,
			lucideUser,
			lucideUsers,
		}),
	],
	templateUrl: "./platform-users-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformUsersList implements OnInit {
	private readonly userApi = inject(UserApi);

	protected readonly items = signal<User[]>([]);
	protected readonly pagination = signal<UserPagination>(
		createEmptyUserPagination()
	);
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly search = signal("");
	protected readonly emailFilter = signal("");
	protected readonly userTypeFilter = signal<UserType | "">("");
	protected readonly statusFilter = signal<UserStatus | "">("");
	protected readonly createdFromFilter = signal("");
	protected readonly createdToFilter = signal("");
	protected readonly userTypeOptions = USER_TYPE_OPTIONS;
	protected readonly userStatusOptions = USER_STATUS_OPTIONS;

	protected readonly stats = signal({
		total: 0,
		active: 0,
		inactive: 0,
		blocked: 0,
		pending: 0,
	});

	protected readonly selectedUser = signal<User | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);

	protected readonly editUser = signal<User | null>(null);
	protected readonly isEditOpen = signal(false);

	protected readonly typeUser = signal<User | null>(null);
	protected readonly isTypeOpen = signal(false);

	protected readonly passwordUser = signal<User | null>(null);
	protected readonly isPasswordOpen = signal(false);

	protected readonly statusUser = signal<User | null>(null);
	protected readonly isStatusOpen = signal(false);

	protected readonly pendingRemoval = signal<PendingUserRemoval | null>(null);
	protected readonly isRemoving = signal(false);

	protected readonly filteredItems = computed(() => {
		const search = this.search().trim().toLowerCase();

		if (!search) {
			return this.items();
		}

		return this.items().filter(item => {
			const fullName = getUserFullName(item).toLowerCase();
			const email = item.email.toLowerCase();
			const userType = getUserTypeLabel(item.user_type).toLowerCase();
			const status = getUserStatusLabel(item.status).toLowerCase();

			return (
				fullName.includes(search) ||
				email.includes(search) ||
				userType.includes(search) ||
				status.includes(search)
			);
		});
	});

	ngOnInit(): void {
		this.load();
		this.loadStats();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.userApi
			.listPlatformUsers(this.buildQuery())
			.subscribe({
				next: response => {
					this.items.set(response.items);
					this.pagination.set(response.pagination);
					this.isLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoading.set(false);

					toast.error("No se pudo cargar los usuarios", {
						description: message,
					});
				},
			});
	}

	loadStats(): void {
		forkJoin({
			all: this.userApi.listPlatformUsers({
				page: 1,
				page_size: 1,
			}),
			active: this.userApi.listPlatformUsers({
				page: 1,
				page_size: 1,
				status: "ACTIVE",
			}),
			inactive: this.userApi.listPlatformUsers({
				page: 1,
				page_size: 1,
				status: "INACTIVE",
			}),
			blocked: this.userApi.listPlatformUsers({
				page: 1,
				page_size: 1,
				status: "BLOCKED",
			}),
			pending: this.userApi.listPlatformUsers({
				page: 1,
				page_size: 1,
				status: "PENDING_VERIFICATION",
			}),
		}).subscribe({
			next: response => {
				this.stats.set({
					total: response.all.pagination.total,
					active: response.active.pagination.total,
					inactive: response.inactive.pagination.total,
					blocked: response.blocked.pagination.total,
					pending: response.pending.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					active: 0,
					inactive: 0,
					blocked: 0,
					pending: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onEmailFilterChange(event: Event): void {
		this.emailFilter.set(this.inputValue(event));
		this.resetToFirstPage();
		this.load();
	}

	protected onUserTypeFilterChange(event: Event): void {
		this.userTypeFilter.set(this.inputValue(event) as UserType | "");
		this.resetToFirstPage();
		this.load();
	}

	protected onStatusFilterChange(event: Event): void {
		this.statusFilter.set(this.inputValue(event) as UserStatus | "");
		this.resetToFirstPage();
		this.load();
	}

	protected onCreatedFromChange(event: Event): void {
		this.createdFromFilter.set(this.inputValue(event));
		this.resetToFirstPage();
		this.load();
	}

	protected onCreatedToChange(event: Event): void {
		this.createdToFilter.set(this.inputValue(event));
		this.resetToFirstPage();
		this.load();
	}

	protected clearFilters(): void {
		this.emailFilter.set("");
		this.userTypeFilter.set("");
		this.statusFilter.set("");
		this.createdFromFilter.set("");
		this.createdToFilter.set("");
		this.search.set("");
		this.resetToFirstPage();
		this.load();
	}

	protected onPageChange(page: number): void {
		this.pagination.update(current => ({
			...current,
			page,
		}));

		this.load();
	}

	protected onPageSizeChange(pageSize: number): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
			page_size: pageSize,
		}));

		this.load();
	}

	protected actionsFor(item: User): ResourceActionItem[] {
		return [
			{ id: "view", label: "Ver detalle" },
			{ id: "edit", label: "Editar usuario" },
			{ id: "type", label: "Cambiar tipo" },
			{ id: "status", label: "Cambiar estado" },
			{ id: "password", label: "Cambiar contraseña" },
			item.deleted_at
				? { id: "restore", label: "Restaurar usuario" }
				: { id: "delete", label: "Eliminar usuario", destructive: true },
		];
	}

	protected onAction(actionId: string, item: User): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "edit") {
			this.openEdit(item);
			return;
		}

		if (actionId === "type") {
			this.openType(item);
			return;
		}

		if (actionId === "status") {
			this.openStatus(item);
			return;
		}

		if (actionId === "password") {
			this.openPassword(item);
			return;
		}

		if (actionId === "restore") {
			this.pendingRemoval.set({
				item,
				title: "Restaurar usuario",
				description: `Se restaurará a ${getUserFullName(item) || item.email}.`,
				confirmLabel: "Restaurar",
			});
			return;
		}

		if (actionId === "delete") {
			this.pendingRemoval.set({
				item,
				title: "Eliminar usuario",
				description: `Se eliminará a ${getUserFullName(item) || item.email}. Podrá restaurarse después.`,
				confirmLabel: "Eliminar",
			});
		}
	}

	protected openDetail(item: User): void {
		this.selectedUser.set(item);
		this.isDetailOpen.set(true);
		this.isDetailLoading.set(true);

		this.userApi.getPlatformUserById(item.id).subscribe({
			next: user => {
				this.selectedUser.set(user);
				this.isDetailLoading.set(false);
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.isDetailLoading.set(false);

				toast.error("No se pudo cargar el usuario", {
					description: message,
				});
			},
		});
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedUser.set(null);
	}

	protected openEdit(item: User): void {
		this.editUser.set(item);
		this.isEditOpen.set(true);
	}

	protected closeEdit(): void {
		this.isEditOpen.set(false);
		this.editUser.set(null);
	}

	protected openType(item: User): void {
		this.typeUser.set(item);
		this.isTypeOpen.set(true);
	}

	protected closeType(): void {
		this.isTypeOpen.set(false);
		this.typeUser.set(null);
	}

	protected openPassword(item: User): void {
		this.passwordUser.set(item);
		this.isPasswordOpen.set(true);
	}

	protected closePassword(): void {
		this.isPasswordOpen.set(false);
		this.passwordUser.set(null);
	}

	protected openStatus(item: User): void {
		this.statusUser.set(item);
		this.isStatusOpen.set(true);
	}

	protected closeStatus(): void {
		this.isStatusOpen.set(false);
		this.statusUser.set(null);
	}

	protected onUserUpdated(user: User): void {
		this.replaceUser(user);
		this.loadStats();
	}

	protected confirmRemoval(): void {
		const pending = this.pendingRemoval();

		if (!pending || this.isRemoving()) {
			return;
		}

		this.isRemoving.set(true);

		const request = pending.item.deleted_at
			? this.userApi.restorePlatformUser(pending.item.id)
			: this.userApi.deletePlatformUser(pending.item.id);

		request.subscribe({
			next: user => {
				this.isRemoving.set(false);
				this.pendingRemoval.set(null);
				this.load();
				this.loadStats();

				if (this.selectedUser()?.id === user.id) {
					this.selectedUser.set(user);
				}
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.isRemoving.set(false);

				toast.error("No se pudo completar la acción", {
					description: message,
				});
			},
		});
	}

	protected cancelRemoval(): void {
		this.pendingRemoval.set(null);
	}

	protected fullName(item: User): string {
		return getUserFullName(item) || "Sin nombre";
	}

	protected typeLabel(item: User): string {
		return getUserTypeLabel(item.user_type);
	}

	protected statusLabel(item: User): string {
		return getUserStatusLabel(item.status);
	}

	protected dateLabel(value: string | null | undefined): string {
		return formatUserDate(value);
	}

	protected trackUser(_: number, item: User): string {
		return item.id;
	}

	protected userSummary(): string {
		return `${this.filteredItems().length} de ${this.pagination().total} usuarios`;
	}

	private replaceUser(user: User): void {
		this.items.update(current =>
			current.map(item => (item.id === user.id ? user : item))
		);

		if (this.selectedUser()?.id === user.id) {
			this.selectedUser.set(user);
		}

		if (this.editUser()?.id === user.id) {
			this.editUser.set(user);
		}

		if (this.typeUser()?.id === user.id) {
			this.typeUser.set(user);
		}

		if (this.passwordUser()?.id === user.id) {
			this.passwordUser.set(user);
		}

		if (this.statusUser()?.id === user.id) {
			this.statusUser.set(user);
		}
	}

	private buildQuery(): UserListQuery {
		return {
			page: this.pagination().page,
			page_size: this.pagination().page_size,
			email: this.emailFilter().trim() || undefined,
			user_type: this.userTypeFilter() || undefined,
			status: this.statusFilter() || undefined,
			created_from: this.createdFromFilter() || undefined,
			created_to: this.createdToFilter() || undefined,
		};
	}

	private resetToFirstPage(): void {
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));
	}

	private inputValue(event: Event): string {
		return (event.target as HTMLInputElement).value;
	}
}
