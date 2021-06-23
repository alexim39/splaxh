import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SigninComponent } from './../../auth/signin/signin.component';
import {AuthService} from './../../auth/auth.service';
import { UserService, UserInterface } from 'src/app/common/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'splaxh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './nav.mobile.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() deviceXs: boolean;
  user: UserInterface | null;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      this.getUser()
    }
  }

  private getUser() {
    this.subscriptions.push(
      this.userService.currentUser.subscribe( (user: UserInterface)  => {
        console.log(user)
      }, error => {
        console.log(error)
      })
    )
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

  signOut() {
    localStorage.removeItem('token')
   /*  // push into list
    this.subscriptions.push(
      this.authService.signOut().subscribe(res => {
        if (res.code === 200) {
          localStorage.removeItem('token')
        }
      }, error => {
        console.error(error);
      })
    ) */
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
