import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private injector: Injector){}

  handleError(error){
    console.log(error);
    if (error.message == 'TokenExpiredError'){
      swal({title: 'Please login again.', icon: 'error'});
      const authService = this.injector.get(AuthService);
      authService.logOut();
    }
    else{
      alert('That page does not exist.');
      const router = this.injector.get(Router);
      router.navigate(['']);
    }
  }
}