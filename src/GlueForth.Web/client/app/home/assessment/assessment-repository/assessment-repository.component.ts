import { Component, OnInit } from '@angular/core';
import {AssessmentRepositoryService} from "./assessment-repository.service";
import {Observable} from "rxjs/Rx";
import {FileSaverService} from "ngx-filesaver";
import {UserService} from "../../../shared/services/user.service";
import {Popup} from "../../../shared/models/popup";
import { AssessmentCaptureFullService } from "../assessment-capture-full/assessment-capture-full.service";
import {QuestionNote} from "../../../shared/models/question.model";

import {forkJoin} from "rxjs/index";

export interface NotesQueryParams {
  DimensionOid: number;
  PrincipleOid: number;
  PrincipleGroupOid: number;
  CharacteristicOid: number;
}

@Component({
  selector: 'bluenorth-assessment-repository',
  templateUrl: './assessment-repository.component.html',
  styleUrls: ['./assessment-repository.component.scss']
})
export class AssessmentRepositoryComponent implements OnInit {

  notes: Observable<Object>;
  currentPopupTemplate = null;
  popupShow = false;
  currentPopupConfig: Popup;
  data
  questionNote: QuestionNote = {
    Attachments: null,
    Note: null,
    OID: null,
    Question: null
  };
  dimensionList;
  principlesList;
  principleGroupList;
  characteristicsList;
  isNoteChanged = false;

  notesQueryParams: NotesQueryParams = {
    DimensionOid: 0,
    PrincipleOid: 0,
    PrincipleGroupOid: 0,
    CharacteristicOid: 0
  };

  constructor(private assessmentRepositoryService: AssessmentRepositoryService,
              private assessmentCaptureFullService: AssessmentCaptureFullService,
              private fileSaverService: FileSaverService,
              private userService: UserService
              ) { }

  ngOnInit() {
    const characteristicsList$ = this.assessmentRepositoryService.getFilterCharacteristicsList();
    const principlesList$ = this.assessmentRepositoryService.getFilterPrinciplesList();
    const principleGroupList$ = this.assessmentRepositoryService.getFilterPrincipleGroupsList()
    const dimensionList$ = this.assessmentRepositoryService.getFilterDimensionsList()

    forkJoin([characteristicsList$, principlesList$, principleGroupList$, dimensionList$])
      .subscribe(([characteristicsList, principlesList, principleGroupList, dimensionList]) => {
        this.characteristicsList = characteristicsList;
        this.characteristicsList.unshift({OID: 0, ShortTitle: 'All Characteristics'});
        this.principlesList = principlesList;
        this.principlesList.unshift({OID: 0, Reference: 'All Principles'});
        this.principleGroupList = principleGroupList;
        this.principleGroupList.unshift({OID: 0, ShortTitle: 'All Management Focus Areas'});
        this.dimensionList = dimensionList;
        this.dimensionList.unshift({OID: 0, ShortTitle: 'All Dimensions'});
     });


   this.notes = this.assessmentRepositoryService.getAnswerNotes();
    this.currentPopupConfig = new Popup()
  }

  dowloadFile(item) {
    this.assessmentRepositoryService.downloadAttachment(item.OID)
      .subscribe((data: any) => {
          this.fileSaverService.save(data, item.FileName);
        },
        (error) => console.log(error));
  }

  showNotesPopup(template, type, data) {
    this.currentPopupTemplate = null;
    this.popupShow = false;

    let config: Popup = this.assessmentCaptureFullService[`${type}Popup`];
    this.currentPopupConfig = Object.assign(config)
    this.currentPopupTemplate = template;
    this.popupShow = true;

    if(data) {
      this.data = data;
      this.questionNote = {
        Attachments: data.data.Attachments,
        Note: data.data.Notes,
        OID:  data.data.OID
      }
    }
  }

  updateQuestionNote(event) {
    event.event.stopPropagation()
    this.assessmentCaptureFullService.updateQuestionNotes(this.questionNote)
      .subscribe((data) => {
          console.log(data)
         // this.data.Notes = this.questionNote.Note;
          console.log(this.questionNote)
          this.isNoteChanged = false;
        },
        error => {
          console.log(error);
          this.userService.showUserNotification(error.error.Message, 'error')
        }
      )
  }

  updateNotes(){
    this.notes = this.assessmentRepositoryService.getAnswerNotes();
    this.isNoteChanged = false;
  }

  onChangeQuestionNote(event) {

    this.questionNote.Note = event.event.target.value;

  }

  addFiles(target) {
    let uploadFileName;
    let fileForExport;
    let payload;
    if (target.value && target.value.length) {
      const files = target.value;
      uploadFileName = files[0].name;
      const reader = new FileReader();
      const fileData = new Blob([files[0]]);
      reader.readAsArrayBuffer(fileData);
      reader.onloadend = (evt: any) => {
        fileForExport = new Uint8Array(evt.currentTarget.result);
        payload = {
          AnswerNoteOID: this.questionNote.OID,
          FileName: uploadFileName,
          File: Array.from(fileForExport)
        };
        console.log(payload)
        this.assessmentCaptureFullService.uploadAnswerNoteAttachments(payload)
          .subscribe((note: number) => {
            if(!this.questionNote.Attachments) {
              this.questionNote.Attachments = [];
            }
              this.questionNote.Attachments.push({
                FileName: uploadFileName,
                OID: note
              })
          })
      };
    }
  }

  deleteAttachment(OID) {
    this.assessmentCaptureFullService.deleteAnswerNoteAttachments(OID)
      .subscribe(data => {
          this.questionNote.Attachments = this.questionNote.Attachments.filter(el => el.OID !== OID);
        },
        error => {
          console.log(error);
          this.userService.showUserNotification(error.error.Message, 'error')
        })
  }

  changeFilter(event, type) {

   // this.dataGrid.instance.beginCustomLoading('Loading..');

    if (type === 'dimensionList') {
      this.notesQueryParams.DimensionOid = event.selectedItem.OID;
    }
    if (type === 'principlesList') {
      this.notesQueryParams.PrincipleOid = event.selectedItem.OID;
    }
    if (type === 'principleGroupList') {
      this.notesQueryParams.PrincipleGroupOid = event.selectedItem.OID;
    }
    if (type === 'characteristicsList') {
      this.notesQueryParams.CharacteristicOid = event.selectedItem.OID;
    }
    console.log('this.tasksQueryParams', this.notesQueryParams);

    this.notes = this.assessmentRepositoryService.getFilteredAnswerNotes(this.notesQueryParams)

  }

  setCategorySelectWidth(e) {
    e.component._popup.option('width', 350);
  }
  setFocusAreaSelectWidth(e) {
    e.component._popup.option('width', 300);
  }

  setCharacteristicSelectWidth(e) {
    e.component._popup.option('width', 350);
  }

}
