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
	lucideHash,
	lucideMail,
	lucidePhone,
	lucideShield,
	lucideUser,
	lucideUsers,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";
import { forkJoin } from "rxjs";

import { MembershipApi } from "../../../entities/membership/api/membership.api";
import {
	createEmptyTenantMembershipPagination,
	formatMembershipDate,
	getMembershipEmailVerifiedLabel,
	getMembershipFullName,
	getMembershipOperationalText,
	getMembershipPhoneLabel,
	getUserTypeLabel,
	MEMBERSHIP_STATUS_OPTIONS,
	MembershipStatus,
	TenantMembership,
	TenantMembershipDetail,
	TenantMembershipPagination,
} from "../../../entities/membership/model";
import { MembershipStatusBadge } from "../../../entities/membership/ui/membership-status-badge/membership-status-badge";
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

type PendingMembershipStatusChange = {
	item: TenantMembershipDetail;
	nextStatus: MembershipStatus;
	title: string;
	description: string;
	confirmLabel: string;
	destructive: boolean;
};

type PendingMembershipRemoval = {
	item: TenantMembershipDetail;
	title: string;
	description: string;
	confirmLabel: string;
};

@Component({
	selector: "app-tenant-members-list",
	standalone: true,
	imports: [
		NgIcon,
		DataToolbar,
		PageSection,
		LoadingState,
		ErrorState,
		Pagination,
		ResourceActionsMenu,
		SideDrawer,
		ConfirmActionDialog,
		StatCard,
		MembershipStatusBadge,
	],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideHash,
			lucideMail,
			lucidePhone,
			lucideShield,
			lucideUser,
			lucideUsers,
		}),
	],
	templateUrl: "./tenant-members-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantMembersList implements OnInit {
	private readonly membershipApi = inject(MembershipApi);

	protected readonly members = signal<TenantMembershipDetail[]>([]);
	protected readonly pagination = signal<TenantMembershipPagination>(
		createEmptyTenantMembershipPagination()
	);

	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly search = signal("");
	protected readonly status = signal<MembershipStatus | "">("");
	protected readonly statusOptions = MEMBERSHIP_STATUS_OPTIONS;

	protected readonly selectedMember = signal<TenantMembershipDetail | null>(
		null
	);
	protected readonly isDetailDrawerOpen = signal(false);

	protected readonly pendingStatusChange =
		signal<PendingMembershipStatusChange | null>(null);
	protected readonly isChangingStatus = signal(false);

	protected readonly pendingRemoval = signal<PendingMembershipRemoval | null>(
		null
	);
	protected readonly isRemoving = signal(false);

	protected readonly stats = signal({
		total: 0,
		active: 0,
		inactive: 0,
		suspended: 0,
	});

	protected readonly filteredMembers = computed(() => {
		const search = this.search().trim().toLowerCase();
		const items = this.members();

		if (!search) {
			return items;
		}

		return items.filter(item => {
			const fullName = getMembershipFullName(item).toLowerCase();
			const email = item.user.email.toLowerCase();
			const userType = getUserTypeLabel(item.user.user_type).toLowerCase();

			return (
				fullName.includes(search) ||
				email.includes(search) ||
				userType.includes(search)
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

		this.membershipApi
			.listCurrentTenantMembers({
				page: this.pagination().page,
				page_size: this.pagination().page_size,
				status: this.status(),
			})
			.subscribe({
				next: response => {
					this.members.set(response.items);
					this.pagination.set(response.pagination);
					this.isLoading.set(false);
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.isLoading.set(false);

					toast.error("No se pudieron cargar los miembros", {
						description: message,
					});
				},
			});
	}

	protected loadStats(): void {
		forkJoin({
			all: this.membershipApi.listCurrentTenantMembers({
				page: 1,
				page_size: 1,
				status: "",
			}),
			active: this.membershipApi.listCurrentTenantMembers({
				page: 1,
				page_size: 1,
				status: "ACTIVE",
			}),
			inactive: this.membershipApi.listCurrentTenantMembers({
				page: 1,
				page_size: 1,
				status: "INACTIVE",
			}),
			suspended: this.membershipApi.listCurrentTenantMembers({
				page: 1,
				page_size: 1,
				status: "SUSPENDED",
			}),
		}).subscribe({
			next: response => {
				this.stats.set({
					total: response.all.pagination.total,
					active: response.active.pagination.total,
					inactive: response.inactive.pagination.total,
					suspended: response.suspended.pagination.total,
				});
			},
			error: () => {
				this.stats.set({
					total: 0,
					active: 0,
					inactive: 0,
					suspended: 0,
				});
			},
		});
	}

	protected onSearch(value: string): void {
		this.search.set(value);
	}

	protected onStatusFilterChange(event: Event): void {
		const target = event.target as HTMLSelectElement;

		this.status.set(target.value as MembershipStatus | "");
		this.pagination.update(current => ({
			...current,
			page: 1,
		}));

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

	protected openDetail(item: TenantMembershipDetail): void {
		this.selectedMember.set(item);
		this.isDetailDrawerOpen.set(true);
	}

	protected closeDetail(): void {
		this.selectedMember.set(null);
		this.isDetailDrawerOpen.set(false);
	}

	protected actionsFor(item: TenantMembershipDetail): ResourceActionItem[] {
		const status = item.membership.status;

		const actions: ResourceActionItem[] = [
			{
				id: "view",
				label: "Ver detalle",
			},
		];

		if (status !== "ACTIVE") {
			actions.push({
				id: "activate",
				label: "Activar",
			});
		}

		if (status !== "INACTIVE") {
			actions.push({
				id: "deactivate",
				label: "Inactivar",
			});
		}

		if (status !== "SUSPENDED") {
			actions.push({
				id: "suspend",
				label: "Suspender",
				destructive: true,
			});
		}

		actions.push({
			id: "remove",
			label: "Eliminar del tenant",
			destructive: true,
		});

		return actions;
	}

	protected onAction(actionId: string, item: TenantMembershipDetail): void {
		if (actionId === "view") {
			this.openDetail(item);
			return;
		}

		if (actionId === "activate") {
			this.prepareStatusChange(item, "ACTIVE");
			return;
		}

		if (actionId === "deactivate") {
			this.prepareStatusChange(item, "INACTIVE");
			return;
		}

		if (actionId === "suspend") {
			this.prepareStatusChange(item, "SUSPENDED");
			return;
		}

		if (actionId === "remove") {
			this.prepareRemoval(item);
		}
	}

	protected prepareStatusChange(
		item: TenantMembershipDetail,
		nextStatus: MembershipStatus
	): void {
		const name = this.fullName(item);

		if (nextStatus === "ACTIVE") {
			this.pendingStatusChange.set({
				item,
				nextStatus,
				title: "Activar miembro",
				description: `${name} podrá operar nuevamente dentro del tenant.`,
				confirmLabel: "Activar",
				destructive: false,
			});
			return;
		}

		if (nextStatus === "INACTIVE") {
			this.pendingStatusChange.set({
				item,
				nextStatus,
				title: "Inactivar miembro",
				description: `${name} quedará inactivo dentro del tenant.`,
				confirmLabel: "Inactivar",
				destructive: false,
			});
			return;
		}

		this.pendingStatusChange.set({
			item,
			nextStatus,
			title: "Suspender miembro",
			description: `${name} quedará suspendido y no debería operar dentro del tenant.`,
			confirmLabel: "Suspender",
			destructive: true,
		});
	}

	protected cancelStatusChange(): void {
		if (this.isChangingStatus()) {
			return;
		}

		this.pendingStatusChange.set(null);
	}

	protected confirmStatusChange(): void {
		const pending = this.pendingStatusChange();

		if (!pending || this.isChangingStatus()) {
			return;
		}

		this.isChangingStatus.set(true);

		this.membershipApi
			.changeCurrentTenantMemberStatus(pending.item.membership.id, {
				status: pending.nextStatus,
			})
			.subscribe({
				next: membership => {
					this.patchMembership(membership);

					const statusLabel =
						membership.status === "ACTIVE"
							? "activado"
							: membership.status === "INACTIVE"
								? "inactivado"
								: "suspendido";

					toast.success("Estado actualizado", {
						description: `El miembro fue ${statusLabel} correctamente.`,
					});

					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);
					this.loadStats();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingStatusChange.set(null);
					this.isChangingStatus.set(false);

					toast.error("No se pudo actualizar el estado", {
						description: message,
					});
				},
			});
	}

	protected prepareRemoval(item: TenantMembershipDetail): void {
		this.pendingRemoval.set({
			item,
			title: "Eliminar miembro del tenant",
			description: `${this.fullName(item)} será eliminado del tenant. Esta acción lo inactiva y ya no aparecerá en la lista.`,
			confirmLabel: "Eliminar",
		});
	}

	protected cancelRemoval(): void {
		if (this.isRemoving()) {
			return;
		}

		this.pendingRemoval.set(null);
	}

	protected confirmRemoval(): void {
		const pending = this.pendingRemoval();

		if (!pending || this.isRemoving()) {
			return;
		}

		this.isRemoving.set(true);

		this.membershipApi
			.removeCurrentTenantMember(pending.item.membership.id)
			.subscribe({
				next: membership => {
					this.members.update(items =>
						items.filter(item => item.membership.id !== membership.id)
					);

					if (this.selectedMember()?.membership.id === membership.id) {
						this.closeDetail();
					}

					toast.success("Miembro eliminado", {
						description: "El miembro fue eliminado del tenant correctamente.",
					});

					this.pendingRemoval.set(null);
					this.isRemoving.set(false);
					this.loadStats();
					this.refreshPageAfterRemoval();
				},
				error: error => {
					const message = getApiErrorMessage(error);

					this.errorMessage.set(message);
					this.pendingRemoval.set(null);
					this.isRemoving.set(false);

					toast.error("No se pudo eliminar el miembro", {
						description: message,
					});
				},
			});
	}

	protected refreshPageAfterRemoval(): void {
		const remainingItems = this.members().length;

		if (remainingItems === 0 && this.pagination().page > 1) {
			this.pagination.update(current => ({
				...current,
				page: current.page - 1,
			}));
		}

		this.load();
	}

	protected patchMembership(updated: TenantMembership): void {
		this.members.update(items =>
			items.map(item =>
				item.membership.id === updated.id
					? {
							...item,
							membership: updated,
						}
					: item
			)
		);

		if (this.selectedMember()?.membership.id === updated.id) {
			this.selectedMember.update(current =>
				current
					? {
							...current,
							membership: updated,
						}
					: current
			);
		}
	}

	protected fullName(item: TenantMembershipDetail): string {
		return getMembershipFullName(item);
	}

	protected userTypeLabel(item: TenantMembershipDetail): string {
		return getUserTypeLabel(item.user.user_type);
	}

	protected operationalText(item: TenantMembershipDetail): string {
		return getMembershipOperationalText(item);
	}

	protected phoneLabel(item: TenantMembershipDetail): string {
		return getMembershipPhoneLabel(item);
	}

	protected emailVerifiedLabel(item: TenantMembershipDetail): string {
		return getMembershipEmailVerifiedLabel(item);
	}

	protected joinedAtLabel(item: TenantMembershipDetail): string {
		return formatMembershipDate(item.membership.joined_at);
	}

	protected createdAtLabel(item: TenantMembershipDetail): string {
		return formatMembershipDate(item.membership.created_at);
	}

	protected updatedAtLabel(item: TenantMembershipDetail): string {
		return formatMembershipDate(item.membership.updated_at);
	}

	protected lastLoginLabel(item: TenantMembershipDetail): string {
		return formatMembershipDate(item.user.last_login_at);
	}
}
