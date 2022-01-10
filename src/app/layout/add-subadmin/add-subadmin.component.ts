import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";

const createSubAdmin = gql`
    mutation createSubAdmin(
        $name: String!
        $email: String!
        $password: String!
    ) {
        createSubAdmin(name: $name, email: $email, password: $password) {
            user {
                id
                name
                email
                role
                createdAt
                updatedAt
            }
        }
    }
`;

@Component({
    selector: "app-add-subadmin",
    templateUrl: "./add-subadmin.component.html",
    styleUrls: ["./add-subadmin.component.scss"],
})
export class AddSubadminComponent implements OnInit {
    @ViewChild("myform") form: NgForm;
    constructor(private apollo: Apollo, private router: Router) {}

    ngOnInit() {}

    addSubadmin() {
        this.apollo
            .mutate({
                mutation: createSubAdmin,
                variables: {
                    ...this.form.value,
                },
            })
            .subscribe((res) => {
                this.router.navigate(["/list-subadmin"]);
            });
    }
    back() {
        this.router.navigate(["/list-subadmin"]);
    }
}
