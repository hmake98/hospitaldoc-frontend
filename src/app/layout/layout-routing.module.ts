import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "../shared/guard/admin.guard";
import { SubAdminGuard } from "../shared/guard/subadmin.guard";

import { LayoutComponent } from "./layout.component";
import { Screen1Component } from "./screen1/screen1.component";
import { Screen2Component } from "./screen2/screen2.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "",
                redirectTo: "dashboard",
            },
            {
                path: "dashboard",
                loadChildren: () =>
                    import("./dashboard/dashboard.module").then(
                        (m) => m.DashboardModule
                    ),
            },
            {
                path: "screen1",
                loadChildren: () =>
                    import("./screen1/screen1.module").then(
                        (m) => m.Screen1Module
                    ),
                canActivate: [AdminGuard],
            },
            {
                path: "screen2",
                component: Screen2Component,
                canActivate: [SubAdminGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
