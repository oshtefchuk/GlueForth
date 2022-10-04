import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


import { AuthService } from "./auth.service";
import {Observable} from "rxjs/index";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  authService: AuthService;
  constructor(private injector: Injector) {
      setTimeout(() => {
        this.authService = this.injector.get(AuthService);
      })
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = JSON.parse(localStorage.getItem('access_token'));

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request);
  }
}

