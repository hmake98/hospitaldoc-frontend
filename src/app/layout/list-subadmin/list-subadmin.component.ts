import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import { EditPasswordComponent } from "../edit-password/edit-password.component";
import jwt_decode from "jwt-decode";

export interface UserData {
    id: number;
    email: string;
    name: string;
}

const getSubadminList = gql`
    query getSubadminList($take: Int!, $skip: Int!, $search: String) {
        getSubadminList(take: $take, skip: $skip, search: $search) {
            id
            name
            userId
            email
            role
            createdAt
            updatedAt
        }
    }
`;

const ELEMENT_DATA: UserData[] = [];

@Component({
    selector: "app-list-subadmin",
    templateUrl: "./list-subadmin.component.html",
    styleUrls: ["./list-subadmin.component.scss"],
})
export class ListSubadminComponent implements OnInit {
    displayedColumns: string[] = ["id", "userId", "name", "email", "action"];
    dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    user;
    constructor(private apollo: Apollo, private router: Router, public dialog: MatDialog) { }

    ngOnInit() {
        this.user = jwt_decode(localStorage.getItem("token"));

        this.apollo
            .query<{ getSubadminList: UserData[] }>({
                query: getSubadminList,
                variables: { take: 100, skip: 0 },
                fetchPolicy: "network-only",
            })
            .subscribe(
                (res) => {
                    const data = res.data.getSubadminList;
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
        this.router.navigateByUrl("/add-subadmin");
    }
    goToHospital(id) {
        this.router.navigate(["/list-hospital", id]);
    }
    edit(id) {
        this.dialog.open(EditPasswordComponent, {
            width: '250px',
            data: { id }
        });
    }
}
