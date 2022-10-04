import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {AnswerToPost} from "../models/question.model";
import {environment} from "../../../environments/environment";


@Injectable()
export class QuestionsService {

  constructor(private httpClient: HttpClient) { }
  getQuestionsByGroup(group) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetByGroup(${group})`);
  }

  addAnswersArray(answers: AnswerToPost[]) {
    return this.httpClient.post(`${environment.apiUrl}/api/Answers/CreateOrUpdate`, answers, {observe: 'response'});
  }

  deleteAnswer(oid) {
    return this.httpClient.delete(`${environment.apiUrl}/api/Answers(${oid})`, {observe: 'response'});
  }
}
