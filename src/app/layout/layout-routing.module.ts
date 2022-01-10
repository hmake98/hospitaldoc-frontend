import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guard";
import { AddDocumentComponent } from "./add-document/add-document.component";
import { AddHospitalComponent } from "./add-hospital/add-hospital.component";
import { AddSubadminComponent } from "./add-subadmin/add-subadmin.component";

import { LayoutComponent } from "./layout.component";
import { ListDocumentComponent } from "./list-document/list-document.component";
import { ListHospitalComponent } from "./list-hospital/list-hospital.component";
import { ListSubadminComponent } from "./list-subadmin/list-subadmin.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "list-subadmin",
                component: ListSubadminComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "list-subadmin/:id",
                component: ListSubadminComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add-subadmin",
                component: AddSubadminComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "list-document",
                component: ListDocumentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "list-document/:id",
                component: ListDocumentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add-document",
                component: AddDocumentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add-document/:id",
                component: AddDocumentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "list-hospital",
                component: ListHospitalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "list-hospital/:id",
                component: ListHospitalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add-hospital",
                component: AddHospitalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add-hospital/:id",
                component: AddHospitalComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "",
                pathMatch: "full",
                redirectTo: "list-subadmin",
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
