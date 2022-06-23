import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonFunction } from '../common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public path = 'http://10.25.61.243:3200/api/';
  constructor(
    private http: HttpClient,
    private router: Router,
    private commonFunction: CommonFunction,
  ) { }

  public token() {
    return localStorage.getItem('token');
  }
  public setToken(token: any) {
    localStorage.setItem('token', token);
  }

  public setRefreshToken(refreshToken: any) {
    localStorage.setItem('token', refreshToken);
  }

  public getRegisteredUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('User') || "");
  }

  public setLocalStorageItems(registeredUser: any) {
    localStorage.setItem('User', JSON.stringify(registeredUser));
  }

  public isLoggedIn() {
    return this.token() !== null;
  }

  public logout(): any {
    this.commonFunction.clearLocalstorageForLogout();
    this.commonFunction.setIsToShowToaster(false);
    this.router.navigate(['/login']);
  }

  public userLogin(userData: any) {
    console.log(userData)
    return this.http.post<any>(this.path + 'login', userData);
  }
  public registerUser(userObj: any) {
    console.log(userObj)
    return this.http.post<any>(this.path + "signup", userObj);
  }
}
