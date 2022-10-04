import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UpperCasePipe } from "@angular/common";
import { Router } from "@angular/router";

import { DxDataGridComponent, DxPopupComponent } from "devextreme-angular";
import { Subscription } from "rxjs/Rx";
import { switchMap } from "rxjs/internal/operators";
import { FileSaverService } from "ngx-filesaver";

import { AssessmentCaptureLightService, Tab } from "./assessment-capture-light.service";
import { UnitService } from "../../../shared/services/unit.service";
import { AssessmentCaptureFullService } from "../assessment-capture-full/assessment-capture-full.service";
import { QuestionsService } from "../../../shared/services/questions.service";
import { UserService } from "../../../shared/services/user.service";
import { UnitInfo } from "../../../shared/models/unit.model";
import { RegistrationSettingsService } from "../../../authentification/registration-settings/registration-settings.service";
import { AssessmentStateService } from "../assessment-state/assessment-state.service";
import { HomeService } from "../../home.service";
import { Popup } from "../../../shared/models/popup";
import { QuestionNote } from "../../../shared/models/question.model";


@Component({
  selector: 'bluenorth-assessment-capture-light',
  templateUrl: './assessment-capture-light.component.html',
  styleUrls: ['./assessment-capture-light.component.scss']
})
export class AssessmentCaptureLightComponent implements OnInit, OnDestroy {

  @ViewChild("dataGrid")
  public dataGrid: DxDataGridComponent;

  @ViewChild("apiTabs")
  public apiTabs: ElementRef;

  @ViewChild("dxPopup")
  public dxPopup: DxPopupComponent;

  @ViewChild("DataGridWrapper")
  public dataGridWrapper: any;
  public popoverHeaderVisible1 = false;
  public popoverHeaderVisible2 = false;
  public width: number;
  public questionsArray: any = [];
  public itemIndex: number;
  public showCharacteristicGuidance = false;
  public dataForFilter = [{oid: 1, type: 'Management Focus Area'}, {oid: 2, type: 'Principle'}];
  public filterSource: Tab[] = [];
  public updating = false;
  public firstNotAnsweredIndex = -1;
  public currentUnit: UnitInfo;
  public isNotificationShow = false;
  public buttonText = 'Change Assessment Type';
  public buttonTextNo = 'Cancel';
  public completeBy = 1;
  public filter = this.dataForFilter[0];
  public guidanses: any[] = [];
  public loadingVisible = true;
  public assesstentType: number;
  public startLoad = false;
  public isPopupVisibleDontKnow1: number;
  public isPopupVisibleNo1: number;
  public isPopupVisiblePartially1: number;
  public isPopupVisibleYes1: number;
  public isPopupVisibleDontKnow2: number;
  public isPopupVisibleNo2: number;
  public isPopupVisiblePartially2: number;
  public isPopupVisibleYes2: number;
  public info = '';
  public showFullScreenTooltip = false;
  public isCompleteByFilterVisible = true;
  public guidancePopupShow = false;
  public isShowExplanationTable: boolean = false;
  public guidanceText = '';
  private dataFromUnitSelectorSubscription$: any;
  private updateSubscription: Subscription;
  private answerResponse: any = {};
  public currentFramework: any;
  currentPopupTemplate: string;
  currentPopupConfig = new Popup();
  currentQuestionOid: number;
  uploadValue: any[] = [];
  currentCharacteristicOid: string;
  currentQuestion;
  questionNote: QuestionNote = {
    Attachments: null,
    Note: null,
    OID: null,
    Question: null
  };
  isNoteChanged = false;

  constructor(
    private assessmentCaptureLightService: AssessmentCaptureLightService,
    private unitService: UnitService,
    private assessmentCaptureFullService: AssessmentCaptureFullService,
    private userService: UserService,
    private upperCasePipe: UpperCasePipe,
    private questionsService: QuestionsService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private assesmentStateService: AssessmentStateService,
    private registrationSettingsService: RegistrationSettingsService,
    private homeService: HomeService,
    private fileSaverService: FileSaverService
  ) {
  }

  ngOnInit() {

    if (this.assesmentStateService.getDimentionOid().type && this.assesmentStateService.getDimentionOid().oid) {
      this.completeBy = this.assesmentStateService.getDimentionOid().type;
    }

    this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
      .subscribe(
        (unit: UnitInfo) => {
          this.currentUnit = unit;
          this.assesstentType = unit.AssessmentType;
          if (unit.AssessmentType === (null || -1)) {
            this.currentUnit = unit;
            this.currentUnit['AssessmentType'] = 1;
            this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
              .subscribe(unit => {
                this.startLoad = true;
                this.getFiltersForQuestions(this.filter);
              });
            return;
          }
          if (unit.AssessmentType === 0) {
            this.isNotificationShow = true;
            this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
              arg.stopPropagation();
            });
            return;
          }
          if (unit.AssessmentType === 1) {
            this.startLoad = true;
            this.getFiltersForQuestions(this.filter);
          }
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        },
        () => {
          this.unitService.getFrameworkById(this.currentUnit.FrameworkId).subscribe(response => {
            this.currentFramework = response;
          })
        }
      );
    this.changeDetector.detectChanges();

    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(data => {
        this.questionsArray = [];
        this.filterSource = [];
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
          .subscribe(
            (unit: UnitInfo) => {
              this.currentUnit = unit;
              if (unit.AssessmentType === (null || -1)) {
                this.currentUnit = unit;
                this.currentUnit['AssessmentType'] = 1;
                this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
                  .subscribe(unit => {
                    this.getFiltersForQuestions(this.filter);
                  })
              }
              if (unit.AssessmentType === 0) {
                this.isNotificationShow = true;
                this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
                  arg.stopPropagation();
                });

              }
              else {
                this.getFiltersForQuestions(this.filter);
              }
            },
            error => {
              this.userService.showUserNotification(error.error.Message, 'error')
            }
          );
      });

    this.assessmentCaptureLightService.getLiteListGuidanses()
      .subscribe((guidances: any[]) => {
        this.guidanses = guidances;
    /*this.guidanses[0] = 'What is your level of management commitment to achieve this?';
    this.guidanses[1] = 'What is your level of practical action to achieve this?';*/
      })
  }

  format(value, data) {
    let customTooltips = [];
    if (data.columnIndex === 3) {
      customTooltips = [data.data.UnknownAG1, data.data.NoAG1, data.data.PartiallyAG1, data.data.YesAG1];
    }
    if (data.columnIndex === 4) {
      customTooltips = [data.data.UnknownAG2, data.data.NoAG2, data.data.PartiallyAG2, data.data.YesAG2];
    }

    let newValue = customTooltips[value];
    // if (!newValue) return value;
    return newValue;
  }

  notAnswered(element, index, array) {
    if (element.UnAnsweredQuestionsCount > 0) {
      return index;
    }
  }

  getPrincipleGroupsForTabs() {
    this.loadingVisible = true;
    this.questionsArray = [];
    this.filterSource = [];
    this.firstNotAnsweredIndex = -1;
    this.assessmentCaptureLightService.getLiteListPrincipleGroups()
      .subscribe((principleGroups: any[]) => {
        if (principleGroups.length === 0) {
          this.userService.showUserNotification("No Principle Groups Yet", "error");
          this.loadingVisible = false;
          return;
        }
        this.filterSource = [];
        this.filterSource = [];
        for (let i = 0; i < principleGroups.length; i++) {
          this.filterSource.push({
            id: principleGroups[i]['OID'],
            text: this.upperCasePipe.transform(principleGroups[i].ShortTitle),
            content: 'Management Focus Area',
            badge: principleGroups[i].CharacteristicsCount
          })
        }
        if (this.assesmentStateService.getDimentionOid().oid) {
          for (let i = 0; i < principleGroups.length; i++) {
            if (principleGroups[i].OID === this.assesmentStateService.getDimentionOid().oid) {
              this.firstNotAnsweredIndex = i;
            }
          }
        }
        else {
          if (principleGroups.findIndex(this.notAnswered) > -1) {
            this.firstNotAnsweredIndex = principleGroups.findIndex(this.notAnswered)
          } else {
            this.firstNotAnsweredIndex = 0;
          }
        }
        this.assessmentCaptureLightService.getQuestionsListByPrincipleGroup(this.filterSource[this.firstNotAnsweredIndex].id)
          .subscribe((questions: any) => {
            this.questionsArray = [];
            this.questionsArray = questions;
            this.questionsArray.forEach(question => {
              if (question.AnswerChoise1 === -1 || question.AnswerChoise2 === -1) {
                question.Status = -1;
              }
            });
            this.loadingVisible = false;
          }, error => {
            this.userService.showUserNotification(error.error.Message, 'error')
            this.loadingVisible = false;
            console.log(error);
          });
        this.changeDetector.detectChanges();
      }, error => {
        this.userService.showUserNotification(error.error.Message, 'error')
        console.log(error)
      })

  }

  getPrincipleForTabs() {
    this.loadingVisible = true;
    this.firstNotAnsweredIndex = -1;
    this.questionsArray = [];
    this.filterSource = [];

    this.assessmentCaptureLightService.getPrinciples()
      .subscribe((principles: any) => {
          if (principles.length === 0) {
            this.userService.showUserNotification("No Principles Yet", "error");
            this.loadingVisible = false;
            return
          }
          this.filterSource = [];
          for (let i = 0; i < principles.length; i++) {
            this.filterSource.push({
              id: principles[i]['OID'],
              text: this.upperCasePipe.transform(principles[i]['ShortTitle']),
              content: 'Principle',
              badge: principles[i].CharacteristicsCount
            })
          }
          if (this.assesmentStateService.getDimentionOid().oid) {
            for (let i = 0; i < principles.length; i++) {
              if (principles[i].OID === this.assesmentStateService.getDimentionOid().oid) {
                this.firstNotAnsweredIndex = i;
              }
            }
          } else {
            if (principles.findIndex(this.notAnswered) > -1) {
              this.firstNotAnsweredIndex = principles.findIndex(this.notAnswered)
            } else {
              this.firstNotAnsweredIndex = 0;
            }
          }
          this.assessmentCaptureLightService.getQuestionsListByStandardAndPrinciple(this.filterSource[this.firstNotAnsweredIndex].id)
            .subscribe((questions: any) => {
              this.questionsArray = questions;
              this.loadingVisible = false;
            }, error => {
              this.userService.showUserNotification(error.error.Message, 'error');
              this.loadingVisible = false;
            });
          this.changeDetector.detectChanges();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          console.log(error)
        })
  }

  getFiltersForQuestions(filter) {
    if (this.startLoad) {
      this.filter = filter;
      this.questionsArray = [];
      this.filterSource = [];
      if (filter.oid === 1) {
        this.getPrincipleGroupsForTabs()
      }
      if (filter.oid === 2) {
        this.getPrincipleForTabs();
      }
    }
  }

  setCurrentFilter(e) {
    this.filter = e.selectedItem;
    this.getFiltersForQuestions(e.selectedItem)
  }

  selectTab(e) {
    this.questionsArray = [];
    this.dataGrid.instance.beginCustomLoading('Loading..');
    this.firstNotAnsweredIndex = e.itemIndex;
    if (e.itemData.content === "Principle") {
      this.assessmentCaptureLightService.getQuestionsListByStandardAndPrinciple(e.itemData.id)
        .subscribe(
          (questions: any) => {
            this.questionsArray = questions;
            this.dataGrid.instance.endCustomLoading();

          },
          error => {
            this.dataGrid.instance.endCustomLoading();
            this.userService.showUserNotification(error.error.Message, 'error')
            console.log(error)
          }
        );
    }
    if (e.itemData.content === "Management Focus Area") {
      this.assessmentCaptureLightService.getQuestionsListByPrincipleGroup(e.itemData.id)
        .subscribe(
          (questions: any) => {
            this.questionsArray = [];
            this.questionsArray = questions;
            this.dataGrid.instance.endCustomLoading();
            this.dataGrid.instance.endCustomLoading();
          },
          error => {
            this.dataGrid.instance.endCustomLoading();
            this.userService.showUserNotification(error.error.Message, 'error');
          }
        );
    }
  }

  getAnswer(event, data) {
    let oldAnswerOid1 = data.data.AnswerOid1;
    let oldAnswerOid2 = data.data.AnswerOid2;
    this.answerResponse = {};
    let answer = [];
    let columnIndex: number;
    for (let i = 0; i < this.questionsArray.length; i++) {
      if (i == data.rowIndex && data.columnIndex === 3) {

        data.data.AnswerChoise1 = event.value;
        answer.push({
          "Unit": this.currentUnit.Oid,
          "User": this.userService.getCurrentUser().Oid,
          "AnswerText": this.questionsArray[i].AnswerText1,
          "Choice": event.value,
          "AssessmentType": this.currentUnit.AssessmentType,
          "Question": this.questionsArray[i].QuestionOid1,
          "OID": this.questionsArray[i].AnswerOid1,
          "Characteristic": this.questionsArray[i].CharacteristicOid
        });
        columnIndex = 3;
      }
      if (i == data.rowIndex && data.columnIndex === 4) {
        data.data.AnswerChoise2 = event.value;

        answer.push({
          "Unit": this.currentUnit.Oid,
          "User": this.userService.getCurrentUser().Oid,
          "AnswerText": this.questionsArray[i].AnswerText2,
          "Choice": event.value,
          "AssessmentType": this.currentUnit.AssessmentType,
          "Question": this.questionsArray[i].QuestionOid2,
          "OID": this.questionsArray[i].AnswerOid2,
          "Characteristic": this.questionsArray[i].CharacteristicOid
        });
        columnIndex = 4;
      }
    }
    if (event.value > -1) {
      if (this.updateSubscription) this.updateSubscription.unsubscribe();

      this.updateSubscription = this.questionsService.addAnswersArray(answer[0])
        .subscribe(
          response => {
            this.answerResponse = response.body;
            this.userService.showUserNotification("Answers was updated", 'success');

            if (data.data.AnswerOid1 === 0 && columnIndex === 3) {
              data.data.AnswerOid1 = this.answerResponse;
            }

            if (data.data.AnswerOid2 === 0 && columnIndex === 4) {
              data.data.AnswerOid2 = this.answerResponse;
            }

            if (data.data.AnswerOid1 !== 0 && data.data.AnswerOid2 !==0 && event.previousValue === -1) {
              this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge - 1).toString();
            }

            if (this.questionsArray[data.rowIndex].AnswerChoise1 !== -1 && this.questionsArray[data.rowIndex].AnswerChoise2 !== -1) {
              this.assessmentCaptureLightService.getCharacteristicStatus(this.questionsArray[data.rowIndex].CharacteristicOid)
                .subscribe((response: any) => {
                  this.questionsArray[data.rowIndex].Status = response.Status;
                },
                error1 => {
                  console.log(error1);
                  if (oldAnswerOid1 === 0 || oldAnswerOid2 ===0) {
                    this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge + 1).toString();
                  }
                });
            }
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error')
            console.log(error)

          }
        );
    } else {
      this.questionsService.deleteAnswer(answer[0].OID)
        .subscribe(() => {
            if (data.columnIndex === 3) {
              data.data.AnswerOid1 = 0;
              if (data.data.AnswerOid2 !== 0) {
                this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge + 1).toString();
              }
            }
            if (data.columnIndex === 4) {
              data.data.AnswerOid2 = 0;
              if (data.data.AnswerOid1 !== 0) {
                this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge + 1).toString();
              }
            }
            this.userService.showUserNotification("Answer was updated", 'success');
            this.questionsArray[data.rowIndex].Status = -1;
          },
          error => {
            if (oldAnswerOid1 === 0 || oldAnswerOid2 ===0) {
              this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge - 1).toString();
            }
            this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error)
          }
        )
    }
  }

  updateTable(event) {
    if (this.updating && !event.component.hasEditData()) {  // updates finished successfully
      this.updating = false;
    }
  }

  toShowCharacteristicGuidance(data) {
    this.showCharacteristicGuidance = data.rowIndex;
  }

  changeCharacteristicRelevant(event, data) {
    if (!event.value) {
      this.assessmentCaptureFullService.addNonRelevantCharacteristic(data.data.CharacteristicOid)
        .subscribe(response => {
          data.data.IsRelevantCharacteristic = false;
          this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge - 1).toString();
        });
    }
    if (event.value) {
      this.assessmentCaptureFullService.removeNonRelevantCharacteristic(data.data.CharacteristicOid)
        .subscribe(response => {
          data.data.IsRelevantCharacteristic = true;
          this.filterSource[this.firstNotAnsweredIndex].badge = (+this.filterSource[this.firstNotAnsweredIndex].badge + 1).toString();
        })
    }
  }

  changeAssessmentType(event) {
    this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
      .subscribe((unit: UnitInfo) => {
        this.currentUnit = unit;
        this.currentUnit['AssessmentType'] = 1;
        this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
          .subscribe(
            unit => {
              this.userService.showUserNotification('Assessment Type was Updated', 'success');
              this.isNotificationShow = false;
              this.startLoad = true;
              this.getFiltersForQuestions(this.filter);
            },
            error => {
              this.userService.showUserNotification(error.error.Message, 'error')
            }
          )
      });
  }

  redirectToCharts() {
    this.router.navigate(['assessment-current-status'])
  }

  togglePopover(data) {
    if (data === 1) {
      this.popoverHeaderVisible1 = !this.popoverHeaderVisible1;
    }
    if (data === 2) {
      this.popoverHeaderVisible2 = !this.popoverHeaderVisible2;
    }
  }

  toggleDefault1(index, variant, info?) {
    if (variant === 1) {
      this.isPopupVisibleDontKnow1 = index;
    }
    if (variant === 2) {
      this.isPopupVisibleNo1 = index;
    }
    if (variant === 3) {
      this.isPopupVisiblePartially1 = index;
    }
    if (variant === 4) {
      this.isPopupVisibleYes1 = index;
    }

    if (info) {
      this.info = info;
    }
  }

  toggleDefault2(index, variant, info?) {
    if (variant === 1) {
      this.isPopupVisibleDontKnow2 = index;
    }
    if (variant === 2) {
      this.isPopupVisibleNo2 = index;
    }
    if (variant === 3) {
      this.isPopupVisiblePartially2 = index;
    }
    if (variant === 4) {
      this.isPopupVisibleYes2 = index;
    }
    if (info) {
      this.info = info;
    }
  }

  public toggleFullScreenToolTip() {
    this.showFullScreenTooltip = !this.showFullScreenTooltip;
  }

  public toggleFullScreenMode(mode: boolean) {
    this.isCompleteByFilterVisible = !this.isCompleteByFilterVisible;
    this.homeService.changeFullscreenMode(mode);
  }

  public getGuidance(data, template, type) {
    this.currentPopupTemplate = null;
    this.guidancePopupShow = false;
    this.guidanceText = data;

    let config: Popup = this.assessmentCaptureFullService[`${type}Popup`];
    this.currentPopupConfig = Object.assign(config);
    this.currentPopupTemplate = template;

    setTimeout(() => {
      this.guidancePopupShow = true;
    }, 500)
  }

  closeStatusExplanationTable() {
    this.guidancePopupShow = false;
    this.currentPopupTemplate = null;
  }

  popupShown(template, type): void {
    let config: Popup = this.assessmentCaptureFullService[`${type}Popup`];
    this.currentPopupConfig = Object.assign(config)
    this.currentPopupTemplate = template;

    this.guidancePopupShow = true;
  }


  showNotesPopup(template, type, data?) {
    this.currentPopupTemplate = null;
    this.guidancePopupShow = false;
    if(data) {
      this.currentQuestionOid = data.data.QuestionOid1;
      this.currentCharacteristicOid =  data.data.CharacteristicOid;
      this.currentQuestion = data;
    }

    this.assessmentCaptureFullService.getNotesByQuestionAndCharacteristic(this.currentQuestionOid, this.currentCharacteristicOid)
      .subscribe((note: QuestionNote) => {

        this.questionNote = note;
        this.popupShown(template, type)
        //this.currentPopupConfig.title = data.data.QuestionTitle
      })
  }

  updateQuestionNote() {
    this.assessmentCaptureFullService.updateQuestionNotes(this.questionNote)
      .subscribe(data => {
          this.isNoteChanged = false;
          if(this.questionNote.Attachments) {
            (!this.questionNote.Attachments.length && !this.questionNote.Note) ? this.currentQuestion.data.IsNoteOrFileExist1 = false :
              this.currentQuestion.data.IsNoteOrFileExist1 = true

          } else {
            !this.questionNote.Note ? this.currentQuestion.data.IsNoteOrFileExist1 = false :
              this.currentQuestion.data.IsNoteOrFileExist1 = true
          }

        },
        error => {
          console.log(error);
          this.userService.showUserNotification(error.error.Message, 'error')
        }
      )
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
        this.assessmentCaptureFullService.uploadAnswerNoteAttachments(payload).pipe(
          switchMap(notes => {
            return this.assessmentCaptureFullService.getNotesByQuestionAndCharacteristic(this.currentQuestionOid, this.currentCharacteristicOid)
          })
        ).subscribe((note: QuestionNote) => {
          this.questionNote = note;
          this.currentQuestion.data.IsNoteOrFileExist1 = true
        })
      };
    }
  }

  onChangeQuestionNote(event) {
    this.questionNote.Note = event.value;
  }

  updateNotes() {
    this.isNoteChanged = false;
  }

  deleteAttachment(OID) {
    this.assessmentCaptureFullService.deleteAnswerNoteAttachments(OID)
      .subscribe(data => {
          this.questionNote.Attachments = this.questionNote.Attachments.filter(el => el.OID !== OID);
          if(this.questionNote.Attachments) {
            if (!this.questionNote.Attachments.length && !this.questionNote.Note) {
              this.currentQuestion.data.IsNoteOrFileExist1 = false;
            }
          } else {
            !this.questionNote.Note ? this.currentQuestion.data.IsNoteOrFileExist1 = false :
              this.currentQuestion.data.IsNoteOrFileExist1 = true
          }
        },
        error => {
          console.log(error);
          this.userService.showUserNotification(error.error.Message, 'error')
        })
  }
  downloadAttachment(file) {
    this.assessmentCaptureFullService.downloadAttachment(file.OID)
      .subscribe((data: any) => {
          this.fileSaverService.save(data, file.FileName)
        },
        error => {
        console.log(error);
        this.userService.showUserNotification(error.error.Message, 'error')
        });
  }


  ngOnDestroy() {
    this.dataFromUnitSelectorSubscription$.unsubscribe();
  }
}
