import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
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
            pages
            rackNumber
            boxNumber
            viewCount
            createdAt
            updatedAt
        }
    }
`;

const ELEMENT_DATA: DocumentData[] = [];
@Component({
    selector: "app-list-document",
    templateUrl: "./list-document.component.html",
    styleUrls: ["./list-document.component.scss"],
})
export class ListDocumentComponent implements OnInit {
    displayedColumns: string[] = [
        "id",
        "name",
        "link",
        "barcode",
        "pages",
        "boxNumber",
        "rackNumber",
        "viewCount",
    ];
    dataSource = new MatTableDataSource<DocumentData>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    qp: number;

    constructor(
        private apollo: Apollo,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.qp = Number(this.route.snapshot.params.id);
    }

    ngOnInit() {
        this.apollo
            .query<{ getDocumentList: DocumentData[] }>({
                query: getDocumentList,
                variables: {
                    skip: 0,
                    take: 100,
                    hospitalId: this.qp,
                },
                fetchPolicy: "network-only",
            })
            .subscribe(
                (res) => {
                    const data = res.data.getDocumentList;
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
        this.router.navigate(["/add-document", this.qp]);
    }
}
