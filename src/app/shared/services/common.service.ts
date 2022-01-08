import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    name: string
    constructor() {
        this.name = 'HospitalDoc'
    }
}
