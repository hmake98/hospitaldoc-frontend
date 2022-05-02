import { Location } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";

const createHospital = gql`
    mutation createHospital(
        $userId: String!
        $name: String!
        $subAdminId: Int!
        $email: String!
        $password: String!
        $clientName: String!
        $address: String!
        $phone: String!
        $legalName: String!
        $billingAddress: String!
        $panCard: String!
        $gst: String!
        $agreementDuration: Int!
        $emergencyContactName: String!
        $emergencyContactNumber: String!
    ) {
        createHospital(
            userId: $userId
            name: $name
            subAdminId: $subAdminId
            email: $email
            password: $password,
            clientName: $clientName,
            address: $address,
            phone: $phone,
            legalName: $legalName,
            billingAddress: $billingAddress,
            panCard: $panCard,
            gst: $gst,
            agreementDuration: $agreementDuration,
            emergencyContactName: $emergencyContactName,
            emergencyContactNumber: $emergencyContactNumber,
        ) {
            id
            name
            subAdminId
            clientName,
            address,
            phone,
            legalName,
            billingAddress,
            panCard,
            gst,
            agreementDuration,
            emergencyContactName,
            emergencyContactNumber
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
        private route: ActivatedRoute,
        private _location: Location,
    ) {
        this.qp = Number(this.route.snapshot.params.id);
    }

    ngOnInit() { }
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
        this._location.back();
    }
}
