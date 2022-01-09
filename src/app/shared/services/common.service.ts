import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CommonService {
    roleSubject = new BehaviorSubject<string>("");
    role = this.roleSubject.asObservable();
    constructor() {}
}
