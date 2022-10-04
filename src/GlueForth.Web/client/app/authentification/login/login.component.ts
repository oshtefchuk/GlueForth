import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {DxFormComponent} from "devextreme-angular";

import { AuthService } from '../../shared/services/auth.service';
import { Login } from '../../shared/models/login.model';
import { UserService } from "../../shared/services/user.service";
import { LocalStorageService } from "../../shared/services/local-storage.service";
import {environment} from "../../../environments/environment";
import ValidationEngine from "devextreme/ui/validation_engine";

@Component({
  selector: 'bluenorth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('loginForm')
  public loginForm: DxFormComponent;

  buttonText = "LOGIN";
  loadIndicatorVisible = false;
  loginInfo: Login;
  loading = false;

  password = '';
  passwordOptions: any = {
    mode: 'password',
    value: this.password
  };

  userRole: string;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private localStorageService: LocalStorageService) {
  }


  ngOnInit() {
    this.authService.logout();
    this.loginInfo = this.authService.getLoginInfo();

    var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('Username')){
          let username = urlParams.get('Username');
          this.autoLogin(username);
  }
}

  login(e) {
    this.loadIndicatorVisible = true;
    this.buttonText = "LOGIN..";
    this.loading = true;
    let body = `grant_type=password&username=${encodeURIComponent(this.loginInfo.username)}&password=${encodeURIComponent(this.loginInfo.password)}`;
    this.authService.login(body).subscribe(response => {
        this.localStorageService.remove('access_token');
        this.localStorageService.set('access_token', response.body['access_token']);
        this.localStorageService.set('token_expires', (response.body['.expires']));
        this.localStorageService.set('current_user', this.loginInfo.username);
        this.userService.getUserRole()
          .subscribe(user => {
            this.loadIndicatorVisible = false;
            this.buttonText = "LOGIN";
            this.userRole = user;
            if (!this.userRole) {
              this.userService.showUserNotification("can't get User Role", 'error');
            }
            if (this.userRole === 'User' && !this.userService.isOrganisationNull) {
              if (this.userService.currentUnitId !== '') {
                this.router.navigate(['dashboard']);
              } else {
                this.router.navigate(['profile/business-unit']);
              }
            }
            if (this.userRole === 'User' && this.userService.isOrganisationNull && this.userService.currentUnitId === "") {
              this.router.navigate(['units']);
            }
            if (this.userRole === 'User' && this.userService.isOrganisationNull && this.userService.currentUnitId !== "") {
              this.router.navigate(['dashboard']);
            }
            if (this.userRole === 'Administrators') {
              window.location.href = environment.adminUrl;
            }
          }, error => {
            this.userService.showUserNotification(error.error.Message, 'error');
            this.loadIndicatorVisible = false;
            this.buttonText = "LOGIN";
          });

      },
      error => {
        this.userService.showUserNotification(error.error.error_description, 'error');
        this.loadIndicatorVisible = false;
        this.buttonText = "LOGIN";
        console.log(error.error.error_description)
      });

    e.preventDefault();
  }

  autoLogin(username) {            
        this.userService.getUserDetail(username)
        .subscribe(response => {
          this.loginInfo.username = username;
          this.loginInfo.password = atob(response.body['Password']);
    
          let body = `grant_type=password&username=${encodeURIComponent(this.loginInfo.username)}&password=${encodeURIComponent(this.loginInfo.password)}`;
          this.authService.login(body).subscribe(response => {
              this.localStorageService.remove('access_token');
              this.localStorageService.set('access_token', response.body['access_token']);
              this.localStorageService.set('token_expires', (response.body['.expires']));
              this.localStorageService.set('current_user', this.loginInfo.username);
              this.userService.getUserRole()
                .subscribe(user => {
                  this.loadIndicatorVisible = false;
                  this.buttonText = "LOGIN";
                  this.userRole = user;
                  if (!this.userRole) {
                    this.userService.showUserNotification("can't get User Role", 'error');
                  }
                  if (this.userRole === 'User' && !this.userService.isOrganisationNull) {
                    if (this.userService.currentUnitId !== '') {
                      this.router.navigate(['dashboard']);
                    } else {
                      this.router.navigate(['profile/business-unit']);
                    }
                  }
                  if (this.userRole === 'User' && this.userService.isOrganisationNull && this.userService.currentUnitId === "") {
                    this.router.navigate(['units']);
                  }
                  if (this.userRole === 'User' && this.userService.isOrganisationNull && this.userService.currentUnitId !== "") {
                    this.router.navigate(['dashboard']);
                  }
                  if (this.userRole === 'Administrators') {
                    window.location.href = environment.adminUrl;
                  }
                }, error => {
                  this.userService.showUserNotification(error.error.Message, 'error');
                  this.loadIndicatorVisible = false;
                  this.buttonText = "LOGIN";
                });
      
            },
            error => {
              this.userService.showUserNotification(error.error.error_description, 'error');
              this.loadIndicatorVisible = false;
              this.buttonText = "LOGIN";
              console.log(error.error.error_description)
            });
      
        });
      } 

  onClick(data) {
    this.buttonText = "Sending";
    this.loadIndicatorVisible = true;

    setTimeout(() => {
      this.buttonText = "Send";
      this.loadIndicatorVisible = false;
    }, 2000);
  }

  ngOnDestroy() {
  }

}
