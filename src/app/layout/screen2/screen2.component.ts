import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Apollo, gql } from "apollo-angular";

export interface DocumentData {
    id: number;
    link: string;
    name: string;
    barcode: string;
}

const getDocumentList = gql`
    query getDocumentList(
        $hospitalId: Int
        $take: Int!
        $skip: Int!
        $barcode: String
        $search: String
    ) {
        getDocumentList(
            hospitalId: $hospitalId
            take: $take
            skip: $skip
            barcode: $barcode
            search: $search
        ) {
            id
            barcode
            name
            link
            created_by {
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

const ELEMENT_DATA: DocumentData[] = [];

@Component({
    selector: "app-screen2",
    templateUrl: "./screen2.component.html",
    styleUrls: ["./screen2.component.scss"],
})
export class Screen2Component implements OnInit {
    displayedColumns: string[] = ["id", "name", "link", "barcode"];
    dataSource = new MatTableDataSource<DocumentData>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private apollo: Apollo) {
        this.apollo
            .query({
                query: getDocumentList,
                variables: {
                    skip: 0,
                    take: 100,
                },
            })
            .subscribe(
                (res) => {
                    const data = res.data["getDocumentList"];
                    console.log(data);

                    this.dataSource.data = data;
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    ngOnInit() {}
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
