import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminPageShell } from "./admin-page-shell";

describe("AdminPageShell", () => {
	let component: AdminPageShell;
	let fixture: ComponentFixture<AdminPageShell>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AdminPageShell],
		}).compileComponents();

		fixture = TestBed.createComponent(AdminPageShell);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
