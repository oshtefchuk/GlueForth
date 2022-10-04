import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";


export interface ForgotPasswordInfo {
  email: string;
}

const forgotPassword: ForgotPasswordInfo = {
  'email': ''
};

@Injectable()
export class ForgotPasswordService {

  constructor(private httpClient: HttpClient) {
  }

  public getForgotPassword(): ForgotPasswordInfo {
    return forgotPassword;
  }

  public postEmailForgotPassword(email) {
    return this.httpClient.post(`${environment.apiUrl}/api/Account/ForgotPassword?email=${email}`, email, {observe: 'response'});
  }

}

