import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { UserService, UserInterface } from 'src/app/common/user';
import { Router } from '@angular/router';


@Component({
  selector: 'splaxh-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: UserInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
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
