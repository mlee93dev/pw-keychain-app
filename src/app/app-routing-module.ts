import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectGuard } from './redirect/redirect-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reloading', component: RedirectComponent, canActivate: [RedirectGuard]},
]

@NgModule({
  imports: [
  RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{

}