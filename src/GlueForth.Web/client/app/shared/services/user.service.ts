import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {LocalStorageService} from "./local-storage.service";

import {environment} from "../../../environments/environment";
import notify from "devextreme/ui/notify";
import {map} from "rxjs/operators";


@Injectable()
export class UserService {

  public currentUser: any;
  public isOrganisationNull = true;
  public unitsCountLimit: number;
  public organisationOid: string;
  public currentUnitId: any;
  public disabledAnswerVariantText = ''

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  public loadCurrentUser() {
    let currentUser = this.localStorageService.get('current_user');
    if (currentUser) {
      return this.httpClient.get(`${environment.apiUrl}/api/Users/GetByNameFull?name='${currentUser}'`, {observe: 'response'})
        .pipe(
          map((response) => {
            this.disabledAnswerVariantText = response.body['DisabledAnswerVariantText'];
            this.currentUser = response.body;
            return this.currentUser;
          })
        )
    }
  }

  public getLastUpdate() {
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetLastModified`);
  }

  public updateCurrentUser(updatedProfile) {
    return this.httpClient.post(`${environment.apiUrl}/api/Users`, updatedProfile, {observe: 'response'});
  }

  public changeCurrentUnit(currentUnit) {
    return this.httpClient.post(`${environment.apiUrl}/api/Users`, currentUnit, {observe: 'response'})
      .pipe(
       map((response: any) => {
        let currentUnitId = response.body.CurrentUnitId;
        return currentUnitId;
      })
      )
  }

  public getUserRole() {
    let currentUser = this.localStorageService.get('current_user');
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetByName?name='${currentUser}'`, {observe: 'response'})
      .pipe(
       map((response) => {
        response.body['OrganisationOid'] == '' ? this.isOrganisationNull = true : this.isOrganisationNull = false;
        this.currentUnitId = response.body['CurrentUnitId'];
         if (response.body['UnitsCountLimit']) {
           this.unitsCountLimit = response.body['UnitsCountLimit'];
         }
         return response.body['Roles'][0];
      })
      )
  }

  getUserInfo() {
    let currentUser = this.localStorageService.get('current_user');
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetByName?name='${currentUser}'`, {observe: 'response'})
  }

  getUserDetail(username) {
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetByName?name='${username}'`, {observe: 'response'})
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user) {
    this.currentUser = user;
    if (this.unitsCountLimit) {
      this.currentUser.UnitsCountLimit = this.unitsCountLimit;
    }
  }

  getCountriesList() {
    return this.httpClient.get(`${environment.apiUrl}/api/Countries`, {observe: 'response'})
      .pipe(
       map(response => response.body)
      )
  }

  showUserNotification(message, type, userTime?) {
    let time = 1000;
    userTime ? time = userTime : time;
  return notify({
      message: `${message}`,
      closeOnClick: true,
      closeOnOutsideClick: true,
      width: '500',
      font: '16',
      position: {
        my: 'center top',
        at: 'center top'
      }
    }, type, time);
  }
}
