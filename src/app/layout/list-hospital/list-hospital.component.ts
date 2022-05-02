import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import jwt_decode from 'jwt-decode';
import { EditPasswordComponent } from "../edit-password/edit-password.component";
import { MatDialog } from '@angular/material/dialog';
export interface HospitalData {
    id: number;
    name: string;
}

const getHospitalList = gql`
    query getHospitalList($take: Int!, $skip: Int!, $subAdminId: Int!) {
        getHospitalList(take: $take, skip: $skip, subAdminId: $subAdminId) {
            id
            name
            userId,
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

const ELEMENT_DATA: HospitalData[] | any = [];

@Component({
    selector: "app-list-hospital",
    templateUrl: "./list-hospital.component.html",
    styleUrls: ["./list-hospital.component.scss"],
})
export class ListHospitalComponent implements OnInit {
    displayedColumns: string[] = [
        "id",
        "name",
        "userId",
        "clientName",
        "address",
        "phone",
        "legalName",
        "billingAddress",
        "panCard",
        "gst",
        "agreementDuration",
        "emergencyContactName",
        "emergencyContactNumber",
        "action"
    ];
    dataSource = new MatTableDataSource<HospitalData>(ELEMENT_DATA);
    qp: number;
    user;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private apollo: Apollo,
        private router: Router,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {
        this.qp = Number(this.route.snapshot.params.id);
    }

    ngOnInit() {
        this.user = jwt_decode(localStorage.getItem("token"));
        this.getData();
    }

    getData() {
        this.apollo
            .query<{ getHospitalList: HospitalData[] }>({
                query: getHospitalList,
                variables: { take: 100, skip: 0, subAdminId: this.qp || undefined },
                fetchPolicy: "network-only",
            })
            .subscribe(
                (res) => {
                    const data = res.data.getHospitalList;
                    this.dataSource.data = data;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    toAdd() {
        this.router.navigate(["/add-hospital", this.qp]);
    }
    openDocs(id) {
        this.router.navigate(["/list-document", id]);
    }
    back() {
        this.router.navigateByUrl('/list-subadmin');
    }
    edit(id) {
        this.dialog.open(EditPasswordComponent, {
            width: '250px',
            data: { id }
        });
    }
}
