import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RedirectService } from './redirect/redirect.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
  // authService = this.injector.get(AuthService);
  // redirectService = this.injector.get(RedirectService);
  // router = this.injector.get(Router);

  constructor(private injector: Injector){}

  handleError(error){
    if (error.message == 'jwt expired'){
      swal({title: 'Please login again.', icon: 'error'});
      const authService = this.injector.get(AuthService);
      const redirectService = this.injector.get(RedirectService);
      const router = this.injector.get(Router);
      redirectService.logout = true;
      authService.authChange.next(false);
      router.navigate(['reloading']);
      // authService.logOut();
    }
    else if (error.message){
      swal({title: error.message, icon: 'error'});
    }
    else {
      swal({title: 'An error occurred.', icon: 'error'});
      const router = this.injector.get(Router);
      router.navigate(['']);
    }
  }
}