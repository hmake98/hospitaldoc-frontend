import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";

const createHospital = gql`
    mutation createHospital(
        $name: String!
        $subAdminId: Int!
        $email: String!
        $password: String!
    ) {
        createHospital(
            name: $name
            subAdminId: $subAdminId
            email: $email
            password: $password
        ) {
            id
            name
            subAdminId
            createdAt
            updatedAt
        }
    }
`;

@Component({
    selector: "app-add-hospital",
    templateUrl: "./add-hospital.component.html",
    styleUrls: ["./add-hospital.component.scss"],
})
export class AddHospitalComponent implements OnInit {
    @ViewChild("myform") form: NgForm;
    qp: number;
    constructor(
        private apollo: Apollo,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.qp = Number(this.route.snapshot.params.id);
    }

    ngOnInit() {}
    addHospital() {
        this.apollo
            .mutate({
                mutation: createHospital,
                variables: {
                    ...this.form.value,
                    subAdminId: this.qp,
                },
            })
            .subscribe((res) => {
                this.router.navigate(["/list-hospital", this.qp]);
            });
    }
    back() {
        this.router.navigate(["/list-hospital", this.qp]);
    }
}
