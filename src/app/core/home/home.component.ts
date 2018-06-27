import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subscription } from 'rxjs';
import { AccountsService } from '../accounts.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  toggleList: boolean;
  accounts;
  accountsSub: Subscription;
  token: string;

  constructor(private http: Http,
              private accountsService: AccountsService,
              public authService: AuthService) { }

  ngOnInit() {
    console.log('home')
    this.token = JSON.parse(window.localStorage.getItem('tokens'))[0];
    this.http.get('https://dry-stream-69567.herokuapp.com/users/me/accounts', 
      {headers: new Headers({'x-auth': this.token})})
        .subscribe(
          (response) => {
            console.log(response);
            this.accounts = JSON.parse(response.text());
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

  onDelete(id: string, name: string){
    swal({
      title: `Are you sure you want to delete ${name}?`,
      icon: 'warning',
      buttons: ['Cancel', 'Ok'],
      dangerMode: true})
        .then((deletion) => {
          if (deletion) {
            const token = JSON.parse(window.localStorage.getItem('tokens'))[0];
            let newToken;
            this.http.delete('https://dry-stream-69567.herokuapp.com/users/me/accounts/delete',
              {headers: new Headers({'x-auth': this.token}),
               body: {"name": name}
              }).subscribe(
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
                },
                () => {
                  swal({title: 'Account successfully deleted!', icon: 'success'});
                  if (newToken !== 'undefined') {
                    const tokens = [newToken];
                    window.localStorage.setItem('tokens', JSON.stringify(tokens));
                  };
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
                }
              );
          }
        });
  }

}
