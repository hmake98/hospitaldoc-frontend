import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo, gql } from "apollo-angular";

const createDocument = gql`
    mutation createDocument(
        $name: String!
        $barcode: String!
        $link: String!
        $hospitalId: Int!
        $pages: Int
        $rackNumber: Int
        $boxNumber: Int
    ) {
        createDocument(
            name: $name
            barcode: $barcode
            link: $link
            hospitalId: $hospitalId
            pages: $pages
            rackNumber: $rackNumber
            boxNumber: $boxNumber
        ) {
            id
        }
    }
`;

@Component({
    selector: "app-add-document",
    templateUrl: "./add-document.component.html",
    styleUrls: ["./add-document.component.scss"],
})
export class AddDocumentComponent implements OnInit {
    @ViewChild("myform") form: NgForm;
    qp: number;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apollo: Apollo
    ) {
        this.qp = Number(this.route.snapshot.params.id);
    }

    ngOnInit() {}

    back() {
        this.router.navigate(["/list-document", this.qp]);
    }

    addDoc() {
        this.apollo
            .mutate({
                mutation: createDocument,
                variables: {
                    ...this.form.value,
                    hospitalId: this.qp,
                },
            })
            .subscribe((res) => {
                this.router.navigate(["/list-document", this.qp]);
            });
    }
}
