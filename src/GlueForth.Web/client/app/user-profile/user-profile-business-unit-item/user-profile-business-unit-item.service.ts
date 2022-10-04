import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

export interface FormSelector {
  dataSource: any;
  displayExpr: string;
  valueExpr: string;
  value?: string | number;
  placeholder: string;
}

@Injectable()
export class UserProfileBusinessUnitItemService {

  constructor(private httpClient: HttpClient) {
  }

  getFrameworksByCommodity(commodityOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Frameworks/GetByCommodity(${commodityOid})`)
  }

  getStandardsByFramework(frameworkOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards/ByFramework(${frameworkOid})`)
  }

  getStandardsByCurrentUnit() {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards/ByCurrentUnit`)
  }

  updateCurrentUnitSetStandards(standardsOids) {
    return this.httpClient.post(`${environment.apiUrl}/api/Standards/UpdateCurrentUnitSet`, standardsOids)
  }

  getStandardsByUnitId(unitId) {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards/ByUnit(${unitId})`)
  }
}
