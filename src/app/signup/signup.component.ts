import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);
    
    this.http.post('https://dry-stream-69567.herokuapp.com/users', {
      "email" : email,
      "password" : password
    }).subscribe(
      (response) => console.log(response),
      (error) => console.log('An error occurred', error),
      () => alert('You have successfully signed up!')
    )
  }

}
