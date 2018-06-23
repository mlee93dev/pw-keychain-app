import { Component, OnInit } from '@angular/core';
import { RedirectService } from './redirect.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(public redirectService: RedirectService,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit() {
    this.authService.authChange.next(true);
    const redirectRoute = this.redirectService.redirectRoute;
    setTimeout( () => {
      this.router.navigate([redirectRoute]);
    }, 1000);
  }

}
