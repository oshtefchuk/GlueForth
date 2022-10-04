import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';



@Injectable()
export class MyActionsTasksService {

  constructor(private httpClient: HttpClient) {
  }

  getTasks() {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlan/GetList`)
  }

  getFilteredTasks(tasksQueryParams) {
    return this.httpClient.post(`${environment.apiUrl}/api/ImprovementPlan/GetList`, tasksQueryParams);
  }


  getImprovementPlanCharacteristics() {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlan/GetCharacteristicsList`)
  }

  getImprovementPlanPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlan/GetPrincipleGroupsList`)
  }

  getImprovementPlanQuestionGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlan/GetQuestionGroupsList`)
  }
}
