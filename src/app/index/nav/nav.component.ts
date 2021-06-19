import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SigninComponent} from './../../auth/signin/signin.component';

@Component({
  selector: 'splaxh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './nav.mobile.scss']
})
export class NavComponent implements OnInit {

  @Input() deviceXs: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {
      //width: '250px',
     // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
