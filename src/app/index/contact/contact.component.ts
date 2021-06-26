import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from 'src/app/common/user';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService, ContactInterface } from './contact.service';


@Component({
  selector: 'splaxh-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact.mobile.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  form: FormGroup;
  isSpinning = false;

  constructor(
    private snackBar: MatSnackBar,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      names: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
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
            Validators.email,
          ], updateOn: 'change'
      }),
      comment: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      })
    })
  }

  onSubmit(contactObj: any) {
    this.isSpinning = true;
    
    this.subscriptions.push(
      this.contactService.contacts(contactObj).subscribe( res => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });
        }
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


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
