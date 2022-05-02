import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apollo, gql } from "apollo-angular";

const updatePassword = gql`
    mutation updatePassword($password: String!, $id: Int!) {
        updatePassword(password: $password, id: $id) {
            id
            name
            userId
            email
            role
        }
    }
`

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  password: string;
  constructor(
    public dialogRef: MatDialogRef<EditPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private apollo: Apollo) { }

  ngOnInit(): void {

  }

  updatePass() {
    this.apollo.mutate({
      mutation: updatePassword,
      variables: {
        id: this.data.id,
        password: this.password,
      }
    }).subscribe({
      next: () => {
        this.dialogRef.close()
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
