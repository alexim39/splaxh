import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UserService, UserInterface } from 'src/app/common/user';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadsService, VideoInterface } from '../uploads.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'splaxh-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss', './video.mobile.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  user: UserInterface;
  subscriptions: Subscription[] = [];
  form: FormGroup;
  isSpinning = false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router,
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
      videoTitle: new FormControl('', {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      videoCategory: new FormControl('', {
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
      youtubeURL: new FormControl('', {
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


  onSubmit(videoObj: VideoInterface) {
    this.isSpinning = true;

    videoObj['userId'] = this.user._id;
  
    this.subscriptions.push(
      this.uploadsService.vidoeUpload(videoObj).subscribe(res => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 8000,
              panelClass: ['success']
            });
          }
          // stop spinner
          this.isSpinning = false

          this.router.navigate(['/payment']);
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
