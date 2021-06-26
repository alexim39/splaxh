import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SigninComponent } from './../../auth/signin/signin.component';
import { AuthService } from './../../auth/auth.service';
import { UserService, UserInterface } from 'src/app/common/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'splaxh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './nav.mobile.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() deviceXs: boolean;
  user: UserInterface;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.getUser();
      //console.log(this.getUser())
    }

    // call refresh method from event emitter service
    if (this.userService.subsVar == undefined) {
      this.userService.subsVar = this.userService.reload.subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  private getUser() {
    return JSON.parse(this.userService.currentUser())
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
    // push into list
    this.subscriptions.push(
      this.authService.signOut().subscribe(res => {
        if (res.code === 200) {
          localStorage.removeItem('token')
          localStorage.removeItem('susr')
          this.router.navigate(['/']);
        }
      }, error => {
        //console.error(error);
        localStorage.removeItem('token')
        localStorage.removeItem('susr')
        this.router.navigate(['/']);
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
