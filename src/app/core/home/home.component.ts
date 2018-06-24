import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toggleList: boolean;
  accounts;

  constructor(private http: Http) { }

  ngOnInit() {
    const token = JSON.parse(window.localStorage.getItem('tokens'))[0];
    this.http.get('https://dry-stream-69567.herokuapp.com/users/me/accounts', 
      {headers: new Headers({'x-auth': token})})
        .subscribe(
          (response) => {
            console.log(response);
            this.accounts = JSON.parse(response.text());
          },
          (error) => {
            console.log(error);
            const err = JSON.parse(error._body);
            throw new Error(err.message);
          }
        );
  }

  onToggleList(){
    this.toggleList = true;
  }

  onToggleGrid(){
    this.toggleList = false;
  }

}
