import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{

  constructor(){}

  isAuthenticated(){
    const token = window.localStorage.getItem('tokens')[0];
    return token ? true : false;
  }
}