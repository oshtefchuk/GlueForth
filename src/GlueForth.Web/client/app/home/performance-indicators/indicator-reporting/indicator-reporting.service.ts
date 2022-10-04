import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable()
export class IndicatorReportingService {

  constructor(private httpClient: HttpClient) { }

  getIndicatrsData(params) {
    return this.httpClient.post(`${environment.apiUrl}/api/Reports/GetIndicatorsData`, params)
  }

  getIndicatorData(id) {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetCharacteristicIndicatorData(${id})`)
  }

  getIndicatorChartData(charactheristicOid) {
    return this.httpClient.get( `${environment.apiUrl}/api/Reports/GetCharIndicatorData(${charactheristicOid})`);
  }

  getCharacteristicData(id) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics(${id})`)
  }

}
