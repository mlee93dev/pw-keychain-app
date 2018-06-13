import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
        const err = JSON.parse(error._body);
        if (err.code === 11000) {
          alert('That username is already taken');
        } else {
          console.log('An error occurred' + '\n' + error);
        }
      },
      () => alert('You have successfully signed up!')
    )
  }

}
