import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	output,
} from "@angular/core";

import { HlmButtonImports } from "@shared/ui/button";

@Component({
	selector: "app-pagination",
	standalone: true,
	imports: [HlmButtonImports],
	templateUrl: "./pagination.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
	readonly page = input.required<number>();
	readonly pageSize = input.required<number>();
	readonly total = input.required<number>();
	readonly totalPages = input.required<number>();
	readonly pageSizeOptions = input<number[]>([10, 20, 50, 100]);
	readonly disabled = input(false);

	readonly pageChanged = output<number>();
	readonly pageSizeChanged = output<number>();

	protected readonly fromItem = computed(() => {
		if (this.total() === 0) {
			return 0;
		}

		return (this.page() - 1) * this.pageSize() + 1;
	});

	protected readonly toItem = computed(() => {
		return Math.min(this.page() * this.pageSize(), this.total());
	});

	protected previous(): void {
		if (this.disabled() || this.page() <= 1) {
			return;
		}

		this.pageChanged.emit(this.page() - 1);
	}

	protected next(): void {
		if (this.disabled() || this.page() >= this.totalPages()) {
			return;
		}

		this.pageChanged.emit(this.page() + 1);
	}

	protected onPageSizeChange(event: Event): void {
		const target = event.target as HTMLSelectElement;
		this.pageSizeChanged.emit(Number(target.value));
	}
}
