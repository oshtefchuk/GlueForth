import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../../shared/services/user.service";
import { UnitService } from "../../../shared/services/unit.service";
import { environment } from "../../../../environments/environment";

export class Tab {
  id: number;
  text: string;
  badge: string;
  content: string;
}

@Injectable()
export class AssessmentCaptureLightService {

  public currentUserId: string;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private unitService: UnitService
  ) {
  }

  getDimensions() {
    return this.httpClient.get(`${environment.apiUrl}/api/Dimensions/GetLiteList`)
  }

  getPrinciples() {
    return this.httpClient.get(`${environment.apiUrl}/api/Principles/GetLiteList`)
  }

  getLiteListPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetLiteList`)
  }

  getQuestionsListByStandardAndPrinciple(principleOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetLiteListByStandardAndPrinciple(${principleOid})`);
  }


  getQuestionsListByStandardAndDimension(dimensionOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetLiteListByStandardAndDimension(${dimensionOid})`);
  }

  getQuestionsListByPrincipleGroup(principleGroupOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetLiteListByStandardAndPrincipleGroup(${principleGroupOid})`);
  }

  getLiteListGuidanses() {
   return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetLiteQuestionsGroupGuidances`);
  }

  getCharacteristicStatus(oid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/Get(${oid})`);
  }
}
