import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

import { environment } from "../../../environments/environment";
import {map} from "rxjs/operators";



export class RegistrationInfo {
  UserName: string;
  FirstName?: string;
  LastName: string;
  Password: string;
  Email: string;
  Phone: string;
  Mobile: string;
  Birthday: string;
  CountryId: any;
  OrganisationOid: string;
}

const registrationInfo: RegistrationInfo = {
  'UserName': '',
  'FirstName': '',
  'Password': '',
  'LastName': '',
  'Email': '',
  'Phone': '',
  'Mobile': '',
  'Birthday': '',
  'CountryId': '',
  OrganisationOid: ''
};

const subscriptionType: string[] = [
  'FREE TRIAL',
  'I HAVE A VOUCHER',
  'PAID ACCOUNT'
];

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  getRegistrationInfo(): RegistrationInfo {
    return registrationInfo;
  }

  getSubscriptionType() {
    return subscriptionType;
  }

  public userRegister(registrationInfo: RegistrationInfo) {
    return this.http.post(`${environment.apiUrl}/api/Users/Register`, registrationInfo, {
      observe: 'response',
      responseType: 'json',
    }).pipe(
      map(response => response)
    )
  }
}
