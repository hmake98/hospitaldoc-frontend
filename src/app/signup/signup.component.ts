import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { CommonService } from '../shared/services/common.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    name: string;
    constructor(private commonService: CommonService) {}

    ngOnInit() {
        this.name = this.commonService.name;
    }
}
