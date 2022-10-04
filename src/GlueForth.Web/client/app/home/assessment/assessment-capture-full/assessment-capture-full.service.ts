import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../shared/services/user.service";
import {UnitService} from "../../../shared/services/unit.service";
import {StandardsService} from "../../standards/standards.service";

import {switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs/index";
import {Popup} from "../../../shared/models/popup";
import {QuestionNote, QuestionNoteAttachment} from "../../../shared/models/question.model";


@Injectable()
export class AssessmentCaptureFullService {

  public currentUnitId: string;
  public currentUserId: string;
  private filterParam: string;
  private filterParam$ = new BehaviorSubject(1);
  private dinamicPopupHeight = document.body.offsetHeight - 100;
  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private unitService: UnitService,
              private standardService: StandardsService) {
  }

  getQuestionsByCharacteristicAndUnit(characteristicOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetListByCharacteristicAndUnit(${characteristicOid})`)
  }

  getCurrentCharacteristic(id) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/Get(${id})`);
  }
  getFirstNotCapturedCharacteristic() {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetFirstNotCapturedCharacteristic`);
  }
  getFirstNotCapturedCharacteristicByPrinciple({principleOid}) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetFirstNotCapturedCharacteristicByPrinciple(${principleOid})`);

  }

  getFirstNotCapturedCharacteristicByDimension({dimensionOid}) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetFirstNotCapturedCharacteristicByDimension(${dimensionOid})`);
  }
 getFirstNotCapturedCharacteristicByPrincipleGroup({groupOid}) {
    return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetFirstNotCapturedCharacteristicByPrincipleGroup(${groupOid})`);
  }

 getFirstNotCapturedCharacteristicByDimensionOrPrinciple(type, oid) {
   return this.httpClient.get(`${environment.apiUrl}/api/Questions/GetFirstNotCapturedCharacteristicBy${type}(${oid})`);
 }

  getGetFullListDimentions() {
    return this.httpClient.get(`${environment.apiUrl}/api/Dimensions/GetFullList`)
  }

  getGetFullListPrinciples() {
    return this.httpClient.get(`${environment.apiUrl}/api/Principles/GetFullList`)
  }

  getFullListPrincipleGroups() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetFullList`)
  }

  getAllPrincipleGroupsFull() {
    return this.httpClient.get(`${environment.apiUrl}/api/PrincipleGroups/GetFullStatusList`)
  }

  getFullListDimentionsOrPrincipleGroups(selectedItem) {
    return this.httpClient.get(`${environment.apiUrl}/api/${selectedItem}/GetFullList`)
  }

  getFullListDimentionsOrPrinciplesFromCurrentUnit(selectedItem) {
    return this.unitService.getUnitById(this.userService.currentUser['CurrentUnitId'])
      .pipe(
        switchMap((unit: any) => {
          return this.getFullListDimentionsOrPrincipleGroups(selectedItem);
        })
      )
  }

  addNonRelevantCharacteristic(characteristicOid, body?) {
    return this.httpClient.post(`${environment.apiUrl}/api/SPADataSets/AddNonRelevantCharacteristic(${characteristicOid})`, body, {observe: 'response'});
  }

  removeNonRelevantCharacteristic(characteristicOid) {
    return this.httpClient.delete(`${environment.apiUrl}/api/SPADataSets/RemoveNonRelevantCharacteristic(${characteristicOid})`, {observe: 'response'})
  }

  setDataFromCompleteByFilter(selectedData: number) {
    this.filterParam$.next(selectedData);
  }

  getDataFromCompleteByFilter(): Observable<any> {
    return this.filterParam$.asObservable();
  }

  getNotesByQuestionAndCharacteristic(questionOid, characteristicOid): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/GetByQuestionAndCharacteristic?questionOid=${questionOid}&characteristicOid=${characteristicOid}`);
  }

  updateQuestionNotes(note: QuestionNote) {
    return this.httpClient.post(`${environment.apiUrl}/api/AnswerNotes/Update`, note)
  }

  uploadAnswerNoteAttachments(file: QuestionNoteAttachment ) {
    return this.httpClient.post(`${environment.apiUrl}/api/AnswerNoteAttachments/Create`, file)

  }

  deleteAnswerNoteAttachments(answerNoteAttachmentOid) {
    return this.httpClient.delete(`${environment.apiUrl}/api/AnswerNoteAttachments(${answerNoteAttachmentOid})`)
  }
  downloadAttachment(answerAttachmentNoteOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/AnswerNotes/DownloadAttachment(${answerAttachmentNoteOid})`, {responseType: 'blob'})
  }



  get notePopup(): Popup {
    return {
    width: '500',
    height: 350,
    showTitle: true,
    title: 'NOTES',
    dragEnabled: true,
    closeOnOutsideClick: true,
    closeOnBackButton: true,
    showCloseButton: true,
    isVisible: true,
    shading: false,
    resizeEnabled: true,
    template: 'content'
    }
  }


  get statusPopup(): Popup {
    return {
    width: '485',
    height: 400,
    title: '',
    showTitle: true,
    dragEnabled: true,
    closeOnOutsideClick: true,
    closeOnBackButton: true,
    showCloseButton: true,
    isVisible: true,
    shading: false,
    resizeEnabled: true,
    template: 'content'
    }
  }


  get guidancePopup(): Popup {
    return {
    width: '700',
    height: this.dinamicPopupHeight,
    title: '',
    showTitle: true,
    dragEnabled: true,
    closeOnOutsideClick: true,
    closeOnBackButton: true,
    showCloseButton: true,
    isVisible: true,
    shading: false,
    resizeEnabled: true,
    template: 'content'
    }
  }
}
