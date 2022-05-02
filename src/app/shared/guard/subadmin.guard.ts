import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";

@Injectable()
export class SubAdminGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        const role = JSON.parse(localStorage.getItem("user")).role;
        if (role === "SUBADMIN") {
            return true;
        }
        return false;
    }
}
