import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private injector: Injector){}

  handleError(error){
    if (error.message == 'jwt expired'){
      swal({title: 'Please login again.', icon: 'error'});
      const authService = this.injector.get(AuthService);
      authService.authChange.next(false);
      authService.logOut();
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