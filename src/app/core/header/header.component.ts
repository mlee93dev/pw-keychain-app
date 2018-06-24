import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert'
import { Http, Headers } from '@angular/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  authSubscription: Subscription;

  constructor(public authService: AuthService,
              private http: Http) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authSubscription = this.authService.authChange
      .subscribe((tokenExists: boolean) => {
        this.isAuthenticated = tokenExists;
        console.log(this.isAuthenticated)
      });
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
  }

  onLogOut(){
    this.authService.logOut();
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
              // this.isAuthenticated = false;
              console.log(error);
              const err = JSON.parse(error._body);
              throw new Error(err.message);
            },
            () => {
              if (newToken) {
                console.log('newtoken');
                const tokens = [newToken];
                window.localStorage.setItem('tokens', JSON.stringify(tokens));
              }
              swal({title: 'Account successfully added!', icon: 'success'});
            }
          );
        });
  }

}
