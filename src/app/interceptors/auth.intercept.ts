import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req, next): any {
    const token = localStorage.getItem('token');
    let authRequest;
    if (token) {
       authRequest = req.clone({
        headers: req.headers.set('Authorization',  `JWT ${token}` )
    });
    }else {
       authRequest = req.clone();
    }

    return next.handle(authRequest);
  }
}
