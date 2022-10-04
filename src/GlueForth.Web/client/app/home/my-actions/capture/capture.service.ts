import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/index';


export interface CharacteristicsForImprovementPlanItemsSelector {
  Oid: number;
  Title: string;
  Count: number;
}

export interface NewTask {
  Actions: string;
  Resposible: string;
  DueDate: string;
  IsCompleted: boolean;
  Result: string;
  CharacteristicOid: any;
  QuestionOid: any;
  Cost: number;
}

export class CharacteristicCaptureList {
  CharacteristicOid: number;
  ImprovementPlanItemOid: number;
  ImprovementPlanGuidance: number;
  ImprovementPlanQuestion: number;
  QuestionGroup: string;
  QuestionOid: number;
  IsDisabled: boolean;
  IsOverDue?: boolean;
  Items: CharacteristicCaptureListItems[];
}

export class CharacteristicCaptureListItems {
  Actions: string;
  Resposible: string;
  DueDate: string;
  IsCompleted: boolean;
  Result: string;
  CharacteristicOid: number;
  QuestionOid: number;
  ImprovementPlanItemOid?: number;
  File?: any[];
  FileName?: string;
  Cost: number;
}

const newTask: NewTask = {
  'Actions': '',
  'Resposible': '',
  'DueDate': '',
  'IsCompleted': false,
  'Result': '',
  'CharacteristicOid': '',
  'QuestionOid': '',
  'Cost': 0
};

@Injectable()
export class MyActionsCaptureService {

  constructor(private httpClient: HttpClient) { }

  getCharacteristicCaptureList(characteristicOid): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlanItems/GetCharacteristicCaptureList(${characteristicOid})`);
  }

  getCharacteristics(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlanItems/GetCharacteristics`);
  }

  createOrUpdateSet(tasksArr) {
    return this.httpClient.post(`${environment.apiUrl}/api/ImprovementPlanItems/CreateOrUpdateSet`, tasksArr, {observe: 'response'});
  }

  createOrUpdateRow(body) {
    return this.httpClient.post(`${environment.apiUrl}/api/ImprovementPlanItems/CreateOrUpdate`, body, {observe: 'response'});
  }

  downloadAttachment(improvementPlanItemOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/ImprovementPlan/DownloadAttachment?improvementPlanItemOid=${improvementPlanItemOid}`,
      {responseType: 'blob'});
  }

  deleteImprovementPlanItems(key) {
    return this.httpClient.delete(`${environment.apiUrl}/api/ImprovementPlanItems(${key})`);
  }

  getNewTask() {
    return newTask;
  }
}
