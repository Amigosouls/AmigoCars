import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if(myToken){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}//set the bearer token of user trying to login.
      });
    }
    return next.handle(request);
  }
}
