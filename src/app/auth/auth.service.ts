import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Subject } from "rxjs";

@Injectable()
export class AuthService{
  authChange = new Subject<boolean>();

  constructor(public router: Router,
              private http: Http){}

  isAuthenticated(){
    return window.localStorage.getItem('tokens') ? true : false;
  }

  logOut(){
    const token = JSON.parse(window.localStorage.getItem('tokens'))[0];
    this.http.delete('https://dry-stream-69567.herokuapp.com/users/me/token', {headers: new Headers({'x-auth': token})})
      .subscribe(
        (response) => console.log(response),
        (error) => {
          this.authChange.next(false);
          window.localStorage.removeItem('tokens');
          this.router.navigate(['login']);
        },
        () => {
          this.authChange.next(false);
          window.localStorage.removeItem('tokens');
          this.router.navigate(['login']);
        }
      );
  }
}