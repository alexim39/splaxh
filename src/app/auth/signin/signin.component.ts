import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService, SignInInterface } from './../auth.service';
import { UserService } from './../../common/user';


@Component({
  selector: 'splaxh-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signIn_hide = true; // password hide
  subscriptions: Subscription[] = [];
  form: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private thisDialogRef: MatDialogRef<SigninComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  onSignIn(formObject: SignInInterface): void {
    this.isSpinning = true;
    // push into list
    this.subscriptions.push(
      this.authService.signIn(formObject).subscribe(res => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });

          localStorage.setItem('token', res.obj.token); // used to check if user is logged in
          this.userService.setUser(res.obj.user)
          // close dialog
          this.thisDialogRef.close()
          // stop spinner
          this.isSpinning = false;

        }
      }, error => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
        // stop spinner
        this.isSpinning = false;
      })
    )

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),
      password: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      })
    })
  }

}
