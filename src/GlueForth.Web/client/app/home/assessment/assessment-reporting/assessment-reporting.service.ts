import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../../../shared/services/user.service";
import { UnitService } from "../../../shared/services/unit.service";
import { environment } from "../../../../environments/environment";

@Injectable()
export class AssessmentReportingService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private unitService: UnitService
  ) {
  }


  getDimensionSpiderData() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetDimensionSpiderData`);
  }
  getDimensionsForLegend() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetSpiderDataDimensions`);
  }

  getPrinciplesForLegend() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetSpiderDataPrinciples`);
  }


  getPrincipleSpiderData() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetPrincipleSpiderData`);
  }

  getCharacteristicSpiderByDimension(dimensionId) {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetCharacteristicSpiderByDimension(${dimensionId})`);
  }

  getCharacteristicSpiderByPrincipleGroup(principleGroupId) {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetCharacteristicSpiderByPrincipleGroup(${principleGroupId})`);
  }

  getCharacteristicsBarChartData() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetCharacteristicsBarChartData`);
  }

  getCharacteristicsBarChartGroupedByDimension() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetCharacteristicsBarChartGroupedByDimension`);
  }

  getCharacteristicsBarChartGroupedByDimensionHighToLow() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetCharacteristicsBarChartGroupedByDimensionToLow`);
  }

  isCurrentSpaCompleted() {
    return this.httpClient.get(`${environment.apiUrl}/api/SPADataSets/IsCurrentSPACompleted`);
  }

  recalcCharacteristicUnitScores(unitOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/RecalcCharacteristicUnitScores?unitOid=${unitOid}`)
  }

  redirectToAdmin(oid){
   return `${environment.adminUrl}/default.aspx#ViewID=Principle_DetailView&ObjectKey=${oid}&ObjectClassName=BlueNorth.Model.Principle&mode=View`
  }

}
