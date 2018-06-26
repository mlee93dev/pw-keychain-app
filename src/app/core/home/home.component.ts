import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subscription } from 'rxjs';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  toggleList: boolean;
  accounts;
  accountsSub: Subscription;

  constructor(private http: Http,
              private accountsService: AccountsService) { }

  ngOnInit() {
    console.log('home')
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
     this.accountsSub = this.accountsService.accountsUpdate
        .subscribe((newAccts: any[]) => {
          this.accounts = newAccts;
        });
  }

  ngOnDestroy() {
    if (this.accountsSub) {
      this.accountsSub.unsubscribe();
    }
  }

  onToggleList(){
    this.toggleList = true;
  }

  onToggleGrid(){
    this.toggleList = false;
  }

}
