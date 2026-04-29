import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { toast } from "@spartan-ng/brain/sonner";

import {
	BackgroundJob,
	EvidenceJobKind,
	PlatformAdminTab,
} from "../../models/platform-admin.types";
import { PlatformAdminStore } from "../../store/platform-admin.store";

@Component({
	selector: "app-platform-admin-page",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, RouterLink],
	templateUrl: "./platform-admin-page.html",
	styleUrl: "./platform-admin-page.css",
})
export class PlatformAdminPage implements OnInit {
	readonly store = inject(PlatformAdminStore);
	private readonly fb = inject(FormBuilder);

	readonly activeTab = signal<PlatformAdminTab>("jobs");
	readonly jobDetailOpen = signal(false);

	readonly jobsFilterForm = this.fb.nonNullable.group({
		limit: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
		offset: [0, [Validators.required, Validators.min(0)]],
	});

	readonly auditFilterForm = this.fb.nonNullable.group({
		limit: [50, [Validators.required, Validators.min(1), Validators.max(200)]],
		offset: [0, [Validators.required, Validators.min(0)]],
		eventType: [""],
		actorUserId: [""],
		incidentId: [""],
		providerId: [""],
		requestId: [""],
	});

	readonly snapshotFilterForm = this.fb.nonNullable.group({
		limit: [50, [Validators.required, Validators.min(1), Validators.max(200)]],
		offset: [0, [Validators.required, Validators.min(0)]],
		snapshotType: [""],
	});

	readonly demoJobForm = this.fb.nonNullable.group({
		message: ["Job demo desde Angular", [Validators.required, Validators.minLength(1)]],
		countdownSeconds: [0, [Validators.required, Validators.min(0), Validators.max(30)]],
	});

	readonly evidenceJobForm = this.fb.nonNullable.group({
		evidenceId: ["", [Validators.required]],
		jobKind: ["audio" as EvidenceJobKind, [Validators.required]],
	});

	readonly incidentSummaryJobForm = this.fb.nonNullable.group({
		incidentId: ["", [Validators.required]],
	});

	async ngOnInit(): Promise<void> {
		await this.store.loadWorkspace();
	}

	setActiveTab(tab: PlatformAdminTab): void {
		this.activeTab.set(tab);
	}

	async onRefreshAll(): Promise<void> {
		await this.store.loadWorkspace();
	}

	async onLoadJobs(): Promise<void> {
		if (this.jobsFilterForm.invalid) {
			this.jobsFilterForm.markAllAsTouched();
			return;
		}

		await this.store.loadJobs(this.jobsFilterForm.getRawValue());
	}

	async onLoadAuditLogs(): Promise<void> {
		if (this.auditFilterForm.invalid) {
			this.auditFilterForm.markAllAsTouched();
			return;
		}

		await this.store.loadAuditLogs(this.auditFilterForm.getRawValue());
	}

	async onLoadSnapshots(): Promise<void> {
		if (this.snapshotFilterForm.invalid) {
			this.snapshotFilterForm.markAllAsTouched();
			return;
		}

		await this.store.loadMetricSnapshots(this.snapshotFilterForm.getRawValue());
	}

	async onOpenJobDetail(job: BackgroundJob): Promise<void> {
		this.store.clearSelectedJob();
		this.jobDetailOpen.set(true);

		const loaded = await this.store.loadJobById(job.id);

		if (!loaded) {
			toast("No se pudo cargar el job", {
				description:
					this.store.selectedJobError()?.message || "Ocurrió un error inesperado.",
			});
		}
	}

	onCloseJobDetail(): void {
		this.jobDetailOpen.set(false);
		this.store.clearSelectedJob();
	}

	async onEnqueueDemoJob(): Promise<void> {
		if (this.demoJobForm.invalid) {
			this.demoJobForm.markAllAsTouched();
			return;
		}

		const job = await this.store.enqueueDemoJob(this.demoJobForm.getRawValue());

		if (!job) {
			this.showEnqueueError("No se pudo encolar el job demo");
			return;
		}

		toast.success("Job demo encolado correctamente");
	}

	async onEnqueueEvidenceJob(): Promise<void> {
		if (this.evidenceJobForm.invalid) {
			this.evidenceJobForm.markAllAsTouched();
			return;
		}

		const job = await this.store.enqueueEvidenceJob(this.evidenceJobForm.getRawValue());

		if (!job) {
			this.showEnqueueError("No se pudo encolar el job de evidencia");
			return;
		}

		toast.success("Job de evidencia encolado correctamente");
	}

	async onEnqueueIncidentSummaryJob(): Promise<void> {
		if (this.incidentSummaryJobForm.invalid) {
			this.incidentSummaryJobForm.markAllAsTouched();
			return;
		}

		const job = await this.store.enqueueIncidentSummaryJob(
			this.incidentSummaryJobForm.getRawValue()
		);

		if (!job) {
			this.showEnqueueError("No se pudo encolar el resumen IA");
			return;
		}

		toast.success("Job de resumen IA encolado correctamente");
	}

	getStatusLabel(status: string): string {
		switch (status) {
			case "PENDING":
				return "Pendiente";
			case "QUEUED":
				return "En cola";
			case "STARTED":
			case "RUNNING":
				return "Ejecutando";
			case "SUCCESS":
			case "SUCCEEDED":
			case "COMPLETED":
				return "Completado";
			case "FAILED":
				return "Fallido";
			case "RETRY":
				return "Reintentando";
			default:
				return status;
		}
	}

	getStatusBadgeClass(status: string): string {
		switch (status) {
			case "SUCCESS":
			case "SUCCEEDED":
			case "COMPLETED":
				return "bg-emerald-100 text-emerald-700";
			case "FAILED":
				return "bg-red-100 text-red-700";
			case "STARTED":
			case "RUNNING":
				return "bg-blue-100 text-blue-700";
			case "PENDING":
			case "QUEUED":
			case "RETRY":
				return "bg-orange-100 text-orange-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	getOutcomeBadgeClass(outcome: string): string {
		switch (outcome) {
			case "SUCCESS":
				return "bg-emerald-100 text-emerald-700";
			case "FAILED":
			case "ERROR":
				return "bg-red-100 text-red-700";
			default:
				return "bg-slate-100 text-slate-700";
		}
	}

	private showEnqueueError(title: string): void {
		toast(title, {
			description:
				this.store.enqueueJobError()?.message || "Ocurrió un error inesperado.",
		});
	}
}
