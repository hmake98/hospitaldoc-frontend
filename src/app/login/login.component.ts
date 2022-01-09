import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { gql } from "apollo-angular";
import { Apollo } from "apollo-angular";
import { CommonService } from "../shared/services/common.service";

const login = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
            user {
                id
                email
                name
                role
                hospital {
                    name
                }
            }
        }
    }
`;

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    name: string;
    email: string;
    password: string;
    error: string;
    @ViewChild("userForm") public userFrm: NgForm;

    constructor(
        private router: Router,
        private apollo: Apollo,
        private commonService: CommonService
    ) {
        this.name = "HospitalDoc";
    }

    ngOnInit() {}

    onLogin() {
        if (!this.userFrm.invalid) {
            this.apollo
                .mutate({
                    mutation: login,
                    variables: { ...this.userFrm.value },
                })
                .subscribe(
                    (res) => {
                        const token = res.data["login"]["accessToken"];
                        const user = res.data["login"]["user"];
                        this.commonService.roleSubject.next(user.role);
                        localStorage.setItem("isLoggedin", "true");
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(user));
                        this.router.navigate(["/dashboard"]);
                    },
                    (err) => {
                        console.log(err);
                        this.error = "Invalid login details!";
                    }
                );
        }
    }
}
