import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class AuthService{

  constructor(public router: Router){}

  isAuthenticated(){
    return window.localStorage.getItem('tokens') ? true : false;
  }

  logOut(){
    window.localStorage.removeItem('tokens');
    this.router.navigate(['login']);
  }
}