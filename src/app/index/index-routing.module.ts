import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexContentComponent } from './index-content/index-content.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { UploadsComponent } from './uploads/uploads.component';
import { AuthGuard } from '../auth/auth.guard';
import {FaqComponent} from './faq/faq.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: IndexContentComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'faqs', component: FaqComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'uploads', component: UploadsComponent, canActivate:  [AuthGuard]},
      { path: 'payment', component: PaymentComponent },
      { path: 'profile', component: ProfileComponent, canActivate:  [AuthGuard] },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
