import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RedirectService } from './redirect.service';
import { Router } from '@angular/router';

@Injectable()
export class RedirectGuard implements CanActivate{

  constructor(public redirectService: RedirectService,
              public router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.redirectService.redirectRoute || this.redirectService.logout || this.redirectService.canRedirect){
      return true;
    }
    else{
      this.router.navigate(['']);
      return false;
    }
  }
}