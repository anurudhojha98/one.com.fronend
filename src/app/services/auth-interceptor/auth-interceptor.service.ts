import { HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  public intercept(req: any, next: any) {
    const token = localStorage.getItem('token');
    const authRequest = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer' + ' ' + token,

      }),
    });
    return next.handle(authRequest);
  }
}
