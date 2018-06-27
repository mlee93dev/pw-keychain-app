import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router: Router,
              public authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.authService.isAuthenticated()){
      console.log('authenticated')
      return true;
    } else {
      console.log('not authenticated')
      this.router.navigate(['login']);
    }
  }
}