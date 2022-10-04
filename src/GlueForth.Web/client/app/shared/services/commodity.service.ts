import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable()
export class CommodityService {

  constructor(private httpClient: HttpClient) {
  }

  getCommodities() {
    return this.httpClient.get(`${environment.apiUrl}/api/Commodities`, {observe: 'body'});
  }

  getCommoditiesByUnitType(unitTypeOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Commodities/GetCommoditiesByUnitType(${unitTypeOid})`);
  }

  addCommodity(newCommodity) {
    return this.httpClient.post(`${environment.apiUrl}/api/Commodities/CreateOrUpdate`, newCommodity);
  }
}

