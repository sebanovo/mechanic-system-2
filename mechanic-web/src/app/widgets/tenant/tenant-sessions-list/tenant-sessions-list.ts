import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject,
	signal,
} from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	lucideClock,
	lucideFingerprint,
	lucideHash,
	lucideMonitor,
	lucideShield,
	lucideSmartphone,
} from "@ng-icons/lucide";
import { toast } from "@spartan-ng/brain/sonner";

import { HlmButtonImports } from "@shared/ui/button";
import { HlmInputImports } from "@shared/ui/input";
import { SessionApi } from "../../../entities/session/api";
import {
	createEmptySessionPagination,
	formatSessionDate,
	getSessionStatusLabel,
	SESSION_STATUS_OPTIONS,
	Session,
	SessionListQuery,
	SessionStatus,
} from "../../../entities/session/model";
import { SessionStatusBadge } from "../../../entities/session/ui";
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
} from "../../../shared/custom-components";

@Component({
	selector: "app-tenant-sessions-list",
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
		SessionStatusBadge,
	],
	providers: [
		provideIcons({
			lucideClock,
			lucideFingerprint,
			lucideHash,
			lucideMonitor,
			lucideShield,
			lucideSmartphone,
		}),
	],
	templateUrl: "./tenant-sessions-list.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantSessionsList implements OnInit {
	private readonly sessionApi = inject(SessionApi);

	protected readonly items = signal<Session[]>([]);
	protected readonly pagination = signal(createEmptySessionPagination());
	protected readonly isLoading = signal(false);
	protected readonly errorMessage = signal<string | null>(null);
	protected readonly statusFilter = signal<SessionStatus | "">("");
	protected readonly statusOptions = SESSION_STATUS_OPTIONS;

	protected readonly selectedSession = signal<Session | null>(null);
	protected readonly isDetailOpen = signal(false);
	protected readonly isDetailLoading = signal(false);
	protected readonly pendingRevoke = signal<Session | null>(null);
	protected readonly isRevoking = signal(false);

	ngOnInit(): void {
		this.load();
	}

	load(): void {
		this.isLoading.set(true);
		this.errorMessage.set(null);

		this.sessionApi
			.listMyTenantSessions(this.buildQuery())
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

					toast.error("No se pudieron cargar las sesiones", {
						description: message,
					});
				},
			});
	}

	protected onStatusChange(event: Event): void {
		this.statusFilter.set(this.inputValue(event) as SessionStatus | "");
		this.resetToFirstPage();
		this.load();
	}

	protected clearFilters(): void {
		this.statusFilter.set("");
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

	protected actionsFor(item: Session): ResourceActionItem[] {
		return [
			{ id: "view", label: "Ver detalle" },
			item.session_status === "REVOKED"
				? { id: "revoked", label: "Sesión revocada", disabled: true }
				: { id: "revoke", label: "Revocar sesión", destructive: true },
		];
	}

	protected onAction(actionId: string, item: Session): void {
		if (actionId === "view") {
			this.openDetail(item);
		}

		if (actionId === "revoke") {
			this.pendingRevoke.set(item);
		}
	}

	protected openDetail(item: Session): void {
		this.selectedSession.set(item);
		this.isDetailOpen.set(true);
		this.isDetailLoading.set(true);

		this.selectedSession.set(item);
		this.isDetailLoading.set(false);
	}

	protected closeDetail(): void {
		this.isDetailOpen.set(false);
		this.selectedSession.set(null);
	}

	protected confirmRevoke(): void {
		const session = this.pendingRevoke();

		if (!session || this.isRevoking()) {
			return;
		}

		this.isRevoking.set(true);

		this.sessionApi.revokeMyTenantSession(session.id).subscribe({
			next: revoked => {
				this.isRevoking.set(false);
				this.pendingRevoke.set(null);
				this.load();

				if (this.selectedSession()?.id === revoked.id) {
					this.selectedSession.set(revoked);
				}

				toast.success("Sesión revocada correctamente");
			},
			error: error => {
				const message = getApiErrorMessage(error);

				this.isRevoking.set(false);

				toast.error("No se pudo revocar la sesión", {
					description: message,
				});
			},
		});
	}

	protected cancelRevoke(): void {
		this.pendingRevoke.set(null);
	}

	protected sessionStatusLabel(item: Session): string {
		return getSessionStatusLabel(item.session_status);
	}

	protected sessionDate(value: string | null): string {
		return formatSessionDate(value);
	}

	protected deviceLabel(item: Session): string {
		return item.device_name || item.device_type || "Sesión";
	}

	protected trackSession(_: number, item: Session): string {
		return item.id;
	}

	private buildQuery(): SessionListQuery {
		return {
			page: this.pagination().page,
			page_size: this.pagination().page_size,
			session_status: this.statusFilter() || undefined,
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
