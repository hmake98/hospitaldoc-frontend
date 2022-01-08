import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { CommonService } from '../shared/services/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    name: string;
    constructor(public router: Router, private commonService: CommonService) {}

    ngOnInit() {
        this.name = this.commonService.name;
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
