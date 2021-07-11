import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UserService, UserInterface } from 'src/app/common/user';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadsService, AudioInterface } from '../uploads.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'splaxh-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss', './audio.mobile.scss']
})
export class AudioComponent implements OnInit, OnDestroy {

  user: UserInterface;
  subscriptions: Subscription[] = [];
  form: FormGroup;
  isSpinning = false;

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private uploadsService: UploadsService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.user = this.getUser();
      //console.log(this.getUser())
    }

    this.form = new FormGroup({
      stageName: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      trackCategory: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      trackTitle: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      description: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      /* audioFile: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }), */
    })
  }

  private getUser() {
    return JSON.parse(this.userService.currentUser())
  }

  onSubmit(audioObj: AudioInterface) {
    this.isSpinning = true;

    audioObj['userId'] = this.user._id;
  
    this.subscriptions.push(
      this.uploadsService.audioUpload(audioObj).subscribe(res => {
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

  onFileUpload() {
    const imgBlob = this.fileInput.nativeElement.files[0];

    const file = new FormData();
    file.set('file', imgBlob);

    this.subscriptions.push(
      this.uploadsService.audioUploadFile(file).subscribe(res => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });
        }

        this.router.navigate(['/payment']);
      }, error => {

        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
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
