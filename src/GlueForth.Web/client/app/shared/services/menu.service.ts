import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  getDisabledByCurrentFramework() {
    return this.httpClient.get(`${environment.apiUrl}/api/FrontendMenuItem/GetDisabledByCurrentFramework`)
  }

}
