import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

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
      this.router.navigate(['']);
    }
  }

  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    let token;

    this.http.post('https://dry-stream-69567.herokuapp.com/users/login', {
      "email" : email,
      "password" : password
    }).subscribe(
      (response) => {
        console.log(response);
        token = response.headers.get('x-auth');
      },
      (error) => {
        swal({
          title: JSON.parse(error._body).message,
          icon: 'error'
        });
      },
      () => {
        const tokens = [token];
        window.localStorage.setItem('tokens', JSON.stringify(tokens));
        this.authService.authChange.next(true);
        this.router.navigate(['']);
      }
    );
  }

  onReset(){
    swal('Password Reset', {
      content: {
        element: "input",
        attributes: {
          placeholder: "Type the email address of the registered account here"
        }
      },
      closeOnClickOutside: true,
      closeOnEsc: true
    }).then((email) => {
      if (!email) {
        return false;
      }
      this.http.post('https://dry-stream-69567.herokuapp.com/forgot', {
        "email" : email
      }).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          swal('An email containing the necessary steps for your password reset has been sent to the specified email.');
        }
      );
    })
  }

}
