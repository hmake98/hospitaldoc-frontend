import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { AdminGuard } from "../shared/guard/admin.guard";
import { SubAdminGuard } from "../shared/guard/subadmin.guard";
import { MaterialModule } from "../shared/modules/material/material.module";
import { AddDocumentComponent } from "./add-document/add-document.component";
import { AddHospitalComponent } from "./add-hospital/add-hospital.component";
import { AddSubadminComponent } from "./add-subadmin/add-subadmin.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TopnavComponent } from "./components/topnav/topnav.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { ListDocumentComponent } from "./list-document/list-document.component";
import { ListHospitalComponent } from "./list-hospital/list-hospital.component";
import { ListSubadminComponent } from "./list-subadmin/list-subadmin.component";
import { NavComponent } from "./nav/nav.component";
import { EditPasswordComponent } from './edit-password/edit-password.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MaterialModule,
        TranslateModule,
        FormsModule,
        BarcodeScannerLivestreamModule,
    ],
    declarations: [
        LayoutComponent,
        NavComponent,
        TopnavComponent,
        SidebarComponent,
        AddDocumentComponent,
        AddSubadminComponent,
        AddHospitalComponent,
        ListSubadminComponent,
        ListDocumentComponent,
        ListHospitalComponent,
        EditPasswordComponent,
    ],
    providers: [SubAdminGuard, AdminGuard],
})
export class LayoutModule {}
