import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable()
export class UnitService {

  constructor(private httpClient: HttpClient) { }

  getOrganisationByOid(organisationOid){
    return this.httpClient.get(`${environment.apiUrl}/api/Organisations?key=${organisationOid}`);
  }

  getUnitsListForOrganisation(organisationId) {
    return this.httpClient.get(`${environment.apiUrl}/api/Units/ByOrganisation?key=${organisationId}`)
  }

  getUnitsListByUser() {
    return this.httpClient.get(`${environment.apiUrl}/api/Units/ByCurrentUser`);
  }

  getUnitsLiteListForOrganisation(organisationId){
    return this.httpClient.get(`${environment.apiUrl}/api/Units/ByOrganisationLite?key=${organisationId}`)
  }
  getUnitsLiteListByUser(){
    return this.httpClient.get(`${environment.apiUrl}/api/Units/ByCurrentUserLite`)
  }

  getUnitById(id) {
    return this.httpClient.get(`${environment.apiUrl}/api/Units?key=${id}`);
  }

  deleteUnitById(id) {
    return this.httpClient.delete(`${environment.apiUrl}/api/Units?key=${id}`);
  }

  getFrameworkById(frameworkId) {
    return this.httpClient.get(`${environment.apiUrl}/api/Frameworks(${frameworkId})`);
  }

  assingUserToUnit(userData) {
    return this.httpClient.post(`${environment.apiUrl}/api/Users/CreateAndAssign`, userData);
  }

  addAdminRightToAssignedUser(userOid, unitOid) {
    return this.httpClient.post(`${environment.apiUrl}/api/Users/AssignUnitAsAdmin?userOid=${userOid}&unitOid=${unitOid}`, {}, {observe: 'response'});
  }

  getAssignedUsersToUnit(unitOid) {
   return this.httpClient.get(`${environment.apiUrl}/api/Units/GetAssignedUsers?key=${unitOid}`);
  }

  unassignCurrentUnit(userOid, unitOid) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/Users/UnassignUnit?userOid=${userOid}&unitOid=${unitOid}`,
      {},
      {observe: 'response'});
  }
}
