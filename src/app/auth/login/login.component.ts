import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      this.router.navigate(['search']);
    }
  }

  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    let token;

    console.log(email, password);

    this.http.post('https://dry-stream-69567.herokuapp.com/users/login', {
      "email" : email,
      "password" : password
    }).subscribe(
      (response) => {
        console.log(response);
        token = response.headers.get('x-auth');
      },
      (error) => console.log(error),
      () => {
        console.log(token);
        const tokens = JSON.parse(window.localStorage.getItem('tokens'));
        // Persistence
        if (tokens.indexOf(token) !== -1) {
          return;
        }
        // Outdated token or tokens property doesn't exist
        else {
          const tokens = [token];
          window.localStorage.setItem('tokens', JSON.stringify(tokens));
        }
      }
    )
  }

}
