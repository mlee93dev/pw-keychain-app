import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert'
import { Http } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private http: Http) { }

  ngOnInit() {
  }

  onLogOut(){
    console.log('logged out');
    this.authService.logOut();
  }

  onAdd(){
    swal('Account / Service Name Input', {
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your account / service name here"
        }
      }
    }).then((value) => {
      this.http.post('https://dry-stream-69567.herokuapp.com/users/add', {
        "name": value
      }).subscribe(
       (response) => console.log(response),
       (error) => {
         console.log(error);
         swal({title: 'An error occurred.', icon: 'error'});
       },
       () => swal({title: 'Account successfully added!', icon: 'success'})
      );
    });
  }

}
