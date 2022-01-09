import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Apollo, gql } from "apollo-angular";

export interface UserData {
    id: number;
    email: string;
    name: string;
    hospital: {
        id: number;
        name: string;
    };
}

const getSubadminList = gql`
    query getSubadminList($take: Int!, $skip: Int!, $search: String) {
        getSubadminList(take: $take, skip: $skip, search: $search) {
            id
            name
            email
            role
            hospital {
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

const ELEMENT_DATA: UserData[] | any = [];

@Component({
    selector: "app-screen1",
    templateUrl: "./screen1.component.html",
    styleUrls: ["./screen1.component.scss"],
})
export class Screen1Component implements OnInit {
    displayedColumns: string[] = ["id", "name", "email", "hospital"];
    dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private apollo: Apollo) {}

    ngOnInit() {
        this.apollo
            .query({
                query: getSubadminList,
                variables: { take: 100, skip: 0 },
            })
            .subscribe(
                (res) => {
                    const data = res.data["getSubadminList"];
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
}
