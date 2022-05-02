import { TestBed, waitForAsync } from "@angular/core/testing";
import { MatMenuModule } from "@angular/material/menu";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { TopnavComponent } from "./layout/components/topnav/topnav.component";

describe("AppComponent", () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
        }).compileComponents();
    }));
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatMenuModule],
            declarations: [TopnavComponent],
        }).compileComponents();
    });
    it("should create the app", waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'app'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("app");
    }));
    it("should render title in a h1 tag", waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain(
            "Welcome to app!"
        );
    }));
});
