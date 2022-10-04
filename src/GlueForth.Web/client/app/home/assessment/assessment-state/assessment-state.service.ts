import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UnitInfo} from "../../../shared/models/unit.model";
import {UserService} from "../../../shared/services/user.service";
import {UnitService} from "../../../shared/services/unit.service";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AssessmentStateService {

  private selectorPrinsipleDimension: any = {};

  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private unitService: UnitService) { }

  getSpaDataSetByAssessmentType(assessmentType) {
    return this.httpClient.get(`${environment.apiUrl}/api/SPADataSets/GetByAssessmentType(${assessmentType})`)
  }

  getPrinciplesListByAssessmentType(assessmentType) {
    return this.httpClient.get(`${environment.apiUrl}/api/SPADataSets/GetPrinciplesListByAssessmentType(${assessmentType})`)
  }
  getDimensionsListByAssessmentType(assessmentType) {
    return this.httpClient.get(`${environment.apiUrl}/api/SPADataSets/GetDimensionsListByAssessmentType(${assessmentType})`)
  }

  updateGradeByAssessmentType(assessmentType, body?) {
    return this.httpClient.post(`${environment.apiUrl}/api/SPADataSets/UpdateGradeByAssessmentType(${assessmentType})`, body, {observe: 'response'})
  }

  getFullListByPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetFullList`)
  }

  getLiteListByPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetLiteList`)
  }


  getLiteListByPrincipleGroupsByStandardIdFromUnit() {
    if (this.userService.currentUser['CurrentUnitId']){
          return this.unitService.getUnitById(this.userService.currentUser['CurrentUnitId'])
            .pipe(
            switchMap((unit: UnitInfo) => {
              return this.getLiteListByPrincipleGroups();
            })
            )
        }
  }

  getFullListByPrincipleGroupsByStandardIdFromUnit() {
    if (this.userService.currentUser['CurrentUnitId']){
      return this.unitService.getUnitById(this.userService.currentUser['CurrentUnitId'])
        .pipe(
          switchMap((unit: UnitInfo) => {
            return this.getFullListByPrincipleGroups();
          })
        )
    }
  }

  getAssessmentDetailedProgressByPrinciple() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetStatusList`);
  }

  setDimensionOid(oid, type) {
   this.selectorPrinsipleDimension = {
     oid: oid,
     type: type
   }
  }
  getDimentionOid() {
    return this.selectorPrinsipleDimension;
  }
}
