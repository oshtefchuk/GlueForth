import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

export interface  ImprovementData {
  CharacteristicRef: string;
  CharacteristicTitle: string;
  QuestionGroupStatuses: QuestionGroupStatuses[];
  Status: number;
}

export enum QuestionGroupStatuses {
  NoQuestionAvailable = 0,
  HasUnansweredQuestion = 2,
  AnsweredNo = 1,
  AnsweredYesNotAllTasksComplete = 3,
  AnsweredYesAllTaskComplete = 4
}

@Injectable()
export class MyActionsReportingService {

  constructor(private httpClient: HttpClient) { }

  getImprovementsReportData() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetImprovementsData`)
  }

  getQuestionGroupsTitles() {
    return this.httpClient.get(`${environment.apiUrl}/api/QuestionGroups/GetLowest`)
  }

}
