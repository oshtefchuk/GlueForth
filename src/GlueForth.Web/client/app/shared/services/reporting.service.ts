import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ReportingService {

  constructor(private httpClient: HttpClient) { }

  getAllDimensions() {
    return this.httpClient.get(`${environment.apiUrl}/api/Dimensions`)
  }
  getAllPrinciples() {
    return this.httpClient.get(`${environment.apiUrl}/api/Principles`)
  }
  getAllPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetLiteStatusList`)
  }

  getPrincipleGroupsForSelector() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetList`)
  }

  getPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/Indicators/GetCategories`)
  }

}
