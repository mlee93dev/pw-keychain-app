import { SignupComponent } from './auth/signup/signup.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'new', component: AddAccountComponent, canActivate: [AuthGuard]},
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