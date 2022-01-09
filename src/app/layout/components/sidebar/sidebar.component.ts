import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/shared/services/common.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    public isAdmin: boolean;
    public isSubAdmin: boolean;
    public isUser: boolean;
    constructor(private commonService: CommonService) {}

    ngOnInit() {
        const role = JSON.parse(localStorage.getItem("user")).role;
        if (role === "ADMIN") {
            this.isAdmin = true;
        } else if (role === "SUBADMIN") {
            this.isSubAdmin = true;
        } else {
            this.isUser = true;
        }
        this.showMenu = "";
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        } else {
            this.showMenu = element;
        }
    }
}
