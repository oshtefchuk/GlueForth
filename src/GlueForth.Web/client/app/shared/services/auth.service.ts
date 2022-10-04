import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Router} from "@angular/router";
import {Login} from "../models/login.model";


import { LocalStorageService } from "./local-storage.service";
import {environment} from "../../../environments/environment";

const loginInfo: Login = {
  'grant_type': 'password',
  'username': '',
  'password': ''
};


@Injectable()
export class AuthService {
  public redirectUrl: string;
  public token: string;

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {
  }

  public login(loginInfo) {
    return this.httpClient.post(`${environment.apiUrl}/api/Token`, loginInfo, {observe: 'response'})
  }

  logout(): void {
    this.localStorageService.remove('access_token');
    this.localStorageService.remove('token_expires');
    this.localStorageService.remove('current_user');
    this.router.navigate(['login']);
  }

  public getToken(): string {
    if (localStorage.getItem('access_token')) {
      return localStorage.getItem('access_token');
    }
  }

  public isAuthenticated(): boolean {
    let today = Date.parse(new Date().toDateString());
    let expiresToken = Date.parse(this.localStorageService.get('token_expires'));
    let expirationToken = (expiresToken > today) ? true : false;
    return !!this.getToken() && expirationToken;
  }

  public getLoginInfo() {
    return loginInfo;
  }

}


