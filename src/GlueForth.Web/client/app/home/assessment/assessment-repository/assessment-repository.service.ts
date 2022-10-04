import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams, HttpRequest} from "@angular/common/http";
import {RequestOptions} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class AssessmentRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  getAnswerNotes() {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/GetList`)
  }
  getFilteredAnswerNotes(body) {
    return this.httpClient.post(`${environment.apiUrl}/api/AnswerNotes/GetFilteredList`, body);
  }

  getFilterDimensionsList() {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/GetFilterDimensionsList`);
  }

  getFilterPrincipleGroupsList() {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/GetFilterPrincipleGroupsList`);
  }

  getFilterPrinciplesList() {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/GetFilterPrinciplesList`);
  }

  getFilterCharacteristicsList() {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/GetFilterCharacteristicsList`);
  }


  downloadAttachment(answerAttachmentNoteOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/DownloadAttachment(${answerAttachmentNoteOid})`, {responseType: 'blob'})
  }
}

