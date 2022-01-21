import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
import jwt_decode from "jwt-decode";

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

const putDocumentPresign = gql`
    query putDocumentPresign($docId: Int!, $fileName: String!) {
        putDocumentPresign(docId: $docId, fileName: $fileName)
    }
`;

const getDocumentPresign = gql`
    query getDocumentPresign($docId: Int!, $fileName: String!) {
        getDocumentPresign(docId: $docId, fileName: $fileName)
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
        "attachment",
    ];
    dataSource = new MatTableDataSource<DocumentData>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    qp: number;
    user;
    srcResult;

    constructor(
        private apollo: Apollo,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
        this.qp = Number(this.route.snapshot.params.id);
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.user = jwt_decode(localStorage.getItem("token"));
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
    onFileSelected(event, docId) {
        this.apollo
            .query<{ putDocumentPresign: string }>({
                query: putDocumentPresign,
                variables: {
                    docId,
                    fileName: event.target.files[0].name,
                },
            })
            .subscribe((res) => {
                const link = res.data.putDocumentPresign;
                const upload = this.http
                    .put(link, event.target.files[0])
                    .toPromise();
                upload
                    .then((data) => {
                        console.log("=> ", data);
                        this.getList();
                    })
                    .catch((err) => console.log("error: ", err));
            });
    }
    download(docId, fileName) {
        this.apollo
            .query<{ getDocumentPresign: string }>({
                query: getDocumentPresign,
                variables: {
                    docId,
                    fileName,
                },
            })
            .subscribe((res) => {
                console.log(res.data.getDocumentPresign);
                window.open(res.data.getDocumentPresign, "_blank");
                this.getList();
            });
    }
}
