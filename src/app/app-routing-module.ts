import { SignupComponent } from './signup/signup.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'search', component: SearchComponent},
  {path: 'new', component: AddAccountComponent},
  {path: 'signup', component: SignupComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{

}