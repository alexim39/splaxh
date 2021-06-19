import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { MaterialModule } from './../common/material/material.module';
import { IndexComponent } from './index.component';
import { NavComponent } from './nav/nav.component';
import { TypingComponent } from './index-content/typing/typing.component';
import { FooterComponent } from './footer/footer.component';
import { LogoModule } from './../common/logo/logo.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexContentComponent } from './index-content/index-content.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './index-content/banner/banner.component';
import { CountdownComponent } from './index-content/countdown/countdown.component';
import { SupportersComponent } from './index-content/supporters/supporters.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { AuthModule } from './../auth/auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    IndexComponent,
    NavComponent,
    TypingComponent,
    FooterComponent,
    IndexContentComponent,
    ContactComponent,
    BannerComponent,
    CountdownComponent,
    SupportersComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LogoModule,
    IndexRoutingModule,
    ReactiveFormsModule,
    MatCarouselModule.forRoot(),
    AuthModule,
    RouterModule
  ],
  providers: []
})
export class LandingPageModule { }
