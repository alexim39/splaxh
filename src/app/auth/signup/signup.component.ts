import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormResetterService } from 'src/app/common/form-resetter.service';
import { SignUpInterface, AuthService } from './../auth.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SigninComponent } from './../../auth/signin/signin.component'
import { Router } from '@angular/router';
import { UserService } from './../../common/user';

@Component({
  selector: 'splaxh-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './signup.mobile.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  passwordHide = true;
  form: FormGroup;
  isSpinning = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private formResetterService: FormResetterService,
    private userService: UserService
  ) { }

  onSignIn(forms: SignUpInterface) {
    this.isSpinning = true;

    this.subscriptions.push(
      this.authService.signUp(forms).subscribe(res => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 12000,
            panelClass: ['success']
          });
        }

        // reset form
        this.formResetterService.reset(this.form);

        //localStorage.setItem('token', res.obj.token); // used to check if user is logged in
        //localStorage.setItem('susr', JSON.stringify(res.obj.user))

        // redirect to upload form
        //this.router.navigate(['/upload']);
        // reload navigation component
        //this.userService.reloadNavbar();

        // stop spinner
        this.isSpinning = false
      }, error => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
        // stop spinner
        this.isSpinning = false
      })
    )
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      /* lastname: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }), */
      phone: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
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

  openDialog(): void {
    const dialogRef = this.dialog.open(SigninComponent, {});

    dialogRef.afterClosed().subscribe(result => { });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
