import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../common/material/material.module';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from './auth.service';
import { FormResetterService } from './../common/form-resetter.service';
import {UserService} from './../common/user';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, FormResetterService, UserService]
})
export class AuthModule { }
