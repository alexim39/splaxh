import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexContentComponent } from './index-content/index-content.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from '../auth/signup/signup.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: IndexContentComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'signup', component: SignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
