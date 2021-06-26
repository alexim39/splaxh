import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UserService, UserInterface } from 'src/app/common/user';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadsService, AudioInterface } from '../uploads.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  file: File;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
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
      audioFile: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
    })
  }

  private getUser() {
    return JSON.parse(this.userService.currentUser())
  }

  // On file Select
  onChange(event: any) {
    //
    if (event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
    }
}

  onSubmit(audioObj: AudioInterface) {
    this.isSpinning = true;

    audioObj['file'] = this.file;

        
    //const formData: FormData = new FormData();

    //formData.append('file', this.file, this.file.name);
    /* formData.append('userId', audioObj.userId);
    formData.append('stageName', audioObj.stageName);
    formData.append('trackCategory', audioObj.trackCategory);
    formData.append('trackTitle', audioObj.trackTitle);
    formData.append('description', audioObj.description); */

  
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

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
