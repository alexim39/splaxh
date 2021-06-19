import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../common/material/material.module';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class AuthModule { }
