import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";

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
    displayedColumns: string[] = ["id", "userId", "name", "email"];
    dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private apollo: Apollo, private router: Router) { }

    ngOnInit() {
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
}
