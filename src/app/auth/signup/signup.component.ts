import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: Http,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      this.router.navigate(['']);
    }
  }

  onSignup(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    
    this.http.post('https://dry-stream-69567.herokuapp.com/users', {
      "email" : email,
      "password" : password
    }).subscribe(
      (response) => console.log(response),
      (error) => {
        console.log(error);
        const err = JSON.parse(error._body);
        if (err.code === 11000) {
          swal('That username is already taken.');
        }
        else {
          swal({
            title: 'An error occurred',
            icon: 'error'
          });
        }
      },
      () => {
        swal({
          title: 'You have successfully signed up! Please login with your new account.',
          icon: 'success'
        });
        this.router.navigate(['login']);
      }
    )
  }

}
