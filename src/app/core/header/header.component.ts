import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert'
import { Http, Headers } from '@angular/http';
import { Subscription } from 'rxjs';
import { AccountsService } from '../accounts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('f') searchInput: NgForm;
  isAuthenticated: boolean;
  authSubscription: Subscription;
  accounts;
  filteredAccounts;
  accountsSub: Subscription;

  constructor(public authService: AuthService,
              private http: Http,
              public accountsService: AccountsService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authSubscription = this.authService.authChange
      .subscribe((tokenExists: boolean) => {
        this.isAuthenticated = tokenExists;
      });
    this.accountsSub = this.accountsService.accountsUpdate
      .subscribe((accounts) => {
        this.accounts = accounts;
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.accountsSub) this.accountsSub.unsubscribe();
  }

  onLogOut(){
    this.authService.logOut();
  }

  performSearch(event){
    let accountsCopy = this.accounts;
    let input = this.searchInput.value.search;
    this.filteredAccounts = accountsCopy.filter((v,i) => {
      return (v["name"].toLowerCase().startsWith(input.toLowerCase()));
    });
    this.accountsService.accountsFiltered.next(this.filteredAccounts);
  }

  toggleIcon(){
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    }
    else {
      x.className = "topnav";
    }
  }

  onAdd(){
    swal('Account / Service Name Input', {
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your account / service name here"
        }
      },
      closeOnClickOutside: true,
      closeOnEsc: true
    }).then((value) => {
      if (!value) {
        return false;
      }
      const token = JSON.parse(window.localStorage.getItem('tokens'))[0];
      let newToken;
      this.http.post('https://dry-stream-69567.herokuapp.com/users/add', {"name": value}, 
        {headers: new Headers({'x-auth': token})})
          .subscribe(
            (response) => {
              console.log(response);
              newToken = response.headers.get('x-auth');
            },
            (error) => {
              console.log(error);
              const err = JSON.parse(error._body);
              if (err.message === 'jwt expired') {
                this.authService.logOut();
                swal({title: 'Please login again.', icon: 'error'});
              }
              else {
                swal({title: err.message, icon: 'error'});
              }
            },
            () => {
              if (newToken !== 'undefined') {
                const tokens = [newToken];
                window.localStorage.setItem('tokens', JSON.stringify(tokens));
              }
              this.http.get('https://dry-stream-69567.herokuapp.com/users/me/accounts', 
              {headers: new Headers({'x-auth': token})})
                .subscribe(
                  (response) => {
                    console.log(response);
                    this.accountsService.accountsUpdate.next(JSON.parse(response.text()));
                  },
                  (error) => {
                    console.log(error);
                    const err = JSON.parse(error._body);
                    if (err.message === 'jwt expired') {
                      this.authService.logOut();
                      swal({title: 'Please login again.', icon: 'error'});
                    }
                    else {
                      swal({title: err.message, icon: 'error'});
                    }
                  }
                );
              swal({title: 'Account successfully added!', icon: 'success'});
            }
          );
      });
  }

}
