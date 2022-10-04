import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { UpperCasePipe } from "@angular/common";
import { DxDataGridComponent, DxPopupComponent, DxTabsComponent } from "devextreme-angular";
import { DxoTooltipComponent } from "devextreme-angular/ui/nested/tooltip";
import { AssessmentCaptureFullService } from "./assessment-capture-full.service";
import { AssessmentStateService } from "../assessment-state/assessment-state.service";
import { HomeService } from "../../home.service";
import { RegistrationSettingsService } from "../../../authentification/registration-settings/registration-settings.service";
import { StandardsService } from "../../standards/standards.service";
import {Question, QuestionNote, QuestionNoteAttachment} from "../../../shared/models/question.model";
import { QuestionsService } from "../../../shared/services/questions.service";
import { UnitService } from "../../../shared/services/unit.service";
import { UserService } from "../../../shared/services/user.service";
import { Tab } from "../assessment-capture-light/assessment-capture-light.service";
import { UnitInfo } from "../../../shared/models/unit.model";
import { forkJoin } from "rxjs/index";
import { Subscription } from "rxjs/Rx";
import {Popup} from "../../../shared/models/popup";
import {switchMap} from "rxjs/internal/operators";
import {FileSaverService} from "ngx-filesaver";


@Component({
  selector: 'bluenorth-assessment-capture-full',
  templateUrl: './assessment-capture-full.component.html',
  styleUrls: ['./assessment-capture-full.component.scss']
})
export class AssessmentCaptureFullComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('dataGrid')
  public dataGrid: DxDataGridComponent;

  @ViewChild('tooltip')
  public tooltip: DxoTooltipComponent;

  @ViewChild("apiTabs")
  public apiTabs: DxTabsComponent;

  @ViewChild("dxPopup")
  public dxPopup: DxPopupComponent;

  public questionsByCharacteristic: Question[];
  public saveButton = true;
  public assessmentType: number;
  public characteristicList = [];
  public currentCharacteristic: any = {};
  public currentTab: Tab;
  public showGuidance: boolean;
  public showGuidanceQuestion = false;
  public updating = false;
  public arrayForTabs: Tab[] = [];
  public firstNotAnsweredIndex = -1;
  public isDementionOrPrinsipleSelected = false;
  public isRelevantCharacteristic: boolean;
  public isRelevantShown = false;
  public currentUnit: UnitInfo;
  public isNotificationShow = false;
  public filter;
  public activeTab: number = 0;
  public loadingVisible = false;
  public loadText = '';
  public isPopupVisibleDontKnow;
  public isPopupVisibleNo;
  public isPopupVisiblePartially;
  public isPopupVisibleYes;
  public width: number;
  public showFullScreenTooltip = false;
  public info = '';
  public disabledAnswerVariantText = '';
  public answersNumber = 3;
  public currentFramework: string = '';
  public guidancePopupShow = false;
  public isRelevantDisabled: boolean = false;
  private isDone: any;
  private dataFromUnitSelectorSubscription$: any;
  private updateSubscription: Subscription;
  public showCharacteristicStatus: boolean = true;
  public isShowExplanationTable: boolean = false;

  public answerResponse : any = {};

  public threeAnswersStyle = {'grid-template-columns' : '1fr 1fr 1fr 1fr 1fr'};

  public twoAnswersStyle = {'grid-template-columns' : '1fr 1fr 1fr 1fr 1fr'};

  public explanationTable: any[];
  currentPopupTemplate: string;
  currentPopupConfig = new Popup();
  currentQuestionOid: number;
  uploadValue: any[] = [];

  questionNote: QuestionNote = {
    Attachments: null,
    Note: null,
    OID: null,
    Question: null
  };
  isNoteChanged = false;
  currentQuestion;
  constructor(
    private assessmentCaptureFullService: AssessmentCaptureFullService,
    private questionsService: QuestionsService,
    private unitService: UnitService,
    private userService: UserService,
    private standardsService: StandardsService,
    private router: Router,
    private registrationSettingsService: RegistrationSettingsService,
    private assesmentStateService: AssessmentStateService,
    private homeService: HomeService,
    private changeDetector: ChangeDetectorRef,
    private upperCasePipe: UpperCasePipe,
    private fileSaverService: FileSaverService
  ) {
  }

  ngOnInit() {
    this.disabledAnswerVariantText = this.userService.disabledAnswerVariantText;
    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(item => {
       this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
          .subscribe((unit: UnitInfo) => {
            this.currentUnit = unit;
            if (unit.AssessmentType === (null || -1)) {
              this.currentUnit = unit;
              this.currentUnit['AssessmentType'] = 0;
              this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
                .subscribe(unit => {
                  this.loadData();
                })
            }
            if (unit.AssessmentType === 1) {
              this.isNotificationShow = true;

              this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
                arg.stopPropagation();
              });
            }
            else {
              this.loadData();
            }
          })
      });

    this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
      .subscribe((unit: UnitInfo) => {
        this.currentUnit = unit;
        if (unit.AssessmentType === (null || -1)) {
          this.currentUnit = unit;
          this.currentUnit['AssessmentType'] = 0;
          this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
            .subscribe(unit => {
              this.loadData();
            })
        }
        if (unit.AssessmentType === 1) {
          this.isNotificationShow = true;
          this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
            arg.stopPropagation();
          });
        }
        if (unit.AssessmentType === 0) {
          this.loadData();
         }
      })
  }

  loadData() {
    if (this.isDone) {
      this.isDone.unsubscribe();
    }
    this.isDone = this.assessmentCaptureFullService.getDataFromCompleteByFilter()
      .subscribe(filter => {
          this.firstNotAnsweredIndex = -1;
          this.arrayForTabs = [];
          this.questionsByCharacteristic = [];
          this.currentCharacteristic = {};
          this.characteristicList = [];
          this.filter = filter;
          this.activeTab = 0;
          if (this.filter.type) {
            this.assessmentCaptureFullService.getFullListDimentionsOrPrincipleGroups(this.filter.type)
              .subscribe(async (arrayForTabs: any) => {
                  if (arrayForTabs.length === 0) {
                    this.userService.showUserNotification(`No ${this.filter.type} yet`, 'error')
                    return
                  }
                  this.dataGrid.instance.beginCustomLoading('Loading..');
                  this.arrayForTabs = [];
                  for (let i = 0; i < arrayForTabs.length; i++) {
                    this.arrayForTabs.push({
                      id: arrayForTabs[i]['OID'],
                      text: this.upperCasePipe.transform(arrayForTabs[i].ShortTitle),
                      content: this.filter.selector,
                      badge: arrayForTabs[i].CharacteristicsCount
                    })
                  }
                  if (this.assesmentStateService.getDimentionOid().oid) {
                    for (let i = 0; i < arrayForTabs.length; i++) {
                      if (arrayForTabs[i].OID === this.assesmentStateService.getDimentionOid().oid) {
                        this.firstNotAnsweredIndex = i;
                      }
                    }
                  } else {
                    if (arrayForTabs.findIndex(this.notAnswered) > -1) {
                      this.firstNotAnsweredIndex = arrayForTabs.findIndex(this.notAnswered)
                    } else {
                      this.firstNotAnsweredIndex = 0;
                    }
                  }
                  this.currentTab = this.arrayForTabs[this.firstNotAnsweredIndex];

                  this.isDementionOrPrinsipleSelected = true;
                  if (this.arrayForTabs.length) {
                    this.standardsService.getCharacteristicByGroupOrPrinciple(
                      this.arrayForTabs[this.firstNotAnsweredIndex].id,
                      this.filter.selector
                    )
                      .subscribe((characteristicList: any) => {
                          this.characteristicList = characteristicList;

                          //this.firstNotCapturedCharacteristic = this.characteristicList[0].OID;
                          // this.activeTab = this.firstNotCapturedCharacteristic;

                          this.getCharacteristicsListWithQuestionsAndCharacteristicByOid(this.characteristicList[0].OID);
                        },
                        error => {
                          this.userService.showUserNotification(error.error.Message, 'error');
                          console.log(error)
                        });
                  }
                },
                error => {
                  this.userService.showUserNotification(error.error.Message, 'error');
                  console.log(error)
                });
          }
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
          console.log(error)
        });
  }

  countMaxAnswersNumber(number) {
   return 3 - number;
  }

  getCharacteristicsListWithQuestionsAndCharacteristicByOid(characteristicOid) {
    let answersVariantsCounter = 0;
    let questionArray$ = this.assessmentCaptureFullService.getQuestionsByCharacteristicAndUnit(characteristicOid);
    let currentCharacteristicItem$ = this.assessmentCaptureFullService.getCurrentCharacteristic(characteristicOid);
    let currentFramework$ = this.unitService.getFrameworkById(this.currentUnit.FrameworkId);
    forkJoin([questionArray$, currentCharacteristicItem$, currentFramework$])
      .subscribe(
        (results: any) => {
          this.questionsByCharacteristic = [];
          this.questionsByCharacteristic = results[0].QuestionsList;

          this.dataGrid.instance.endCustomLoading();
          this.questionsByCharacteristic.forEach(question => {
            let numberOfAnsws = this.getNumberOfAnswers(question);

            if(numberOfAnsws === 3) {
              if (question.AnswerChoise === -1) {
                question.AnswerChoise = 0;
              } else if (question.AnswerChoise === 0) {
                question.AnswerChoise = 28;
              } else if (question.AnswerChoise === 1) {
                question.AnswerChoise = 50;
              } else if(question.AnswerChoise === 2) {
                question.AnswerChoise = 75;
              } else if (question.AnswerChoise === 3) {
                question.AnswerChoise = 100;
              }
            } else if (numberOfAnsws === 2) {
              if (question.AnswerChoise === -1) {
                question.AnswerChoise = 0;
              } else if (question.AnswerChoise === 0) {
                question.AnswerChoise = 28;
              } else if (question.AnswerChoise === 1) {
                question.AnswerChoise = 50;
              } else if (question.AnswerChoise == 2) {
                question.AnswerChoise = 100;
              }
            }
          });
          this.showCharacteristicStatus = this.questionsByCharacteristic.some(question => question.AnswerChoise === 0);
          let unansweredQuestions = 0;
          for (let i = 0; i < this.questionsByCharacteristic.length; i++) {
            this.answersNumber = 3;
            answersVariantsCounter = 0;
            if (this.questionsByCharacteristic[i].AnswerOid === 0) {
              this.dataGrid.instance.cellValue(i, 2, this.questionsByCharacteristic[i].AnswerChoise);
              unansweredQuestions++;
            }
          }
          this.isRelevantDisabled = unansweredQuestions !== this.questionsByCharacteristic.length;
          this.isRelevantCharacteristic = results[0].IsRelevantCharacteristic;
          this.isRelevantShown = true;
          this.currentCharacteristic = results[1];
          this.currentFramework = results[2].Title;
          this.loadingVisible = false;
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          console.log(error);
        }
      )
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  getNumberOfAnswers(question : Question) {
    let numberOfAnswers = -1;

    if(question.NoAnswerGuidance !== this.disabledAnswerVariantText) {
      numberOfAnswers++;
    }
    if(question.PartiallyAnswerGuidance !== this.disabledAnswerVariantText) {
      numberOfAnswers++;
    }
    if(question.UnknownAnswerGuidance !== this.disabledAnswerVariantText) {
      numberOfAnswers++;
    }
    if(question.YesAnswerGuidance !== this.disabledAnswerVariantText) {
      numberOfAnswers++;
    }
    return numberOfAnswers;
  }

  setCurrentCharacteristic(tab, index) {
    this.questionsByCharacteristic = [];
    this.activeTab = index;
    this.loadingVisible = true;
    this.dataGrid.instance.beginCustomLoading('Loading..');
    let characteristicOid;
    if (tab === null) {
      characteristicOid = this.characteristicList[0].OID;
    }
    else {
      characteristicOid = tab.OID;
    }
    this.currentCharacteristic = this.characteristicList[index];
    this.getCharacteristicsListWithQuestionsAndCharacteristicByOid(characteristicOid);
  }

  format(value, data) {
    let customTooltips = [
      data.data.UnknownAnswerGuidance,
      data.data.NoAnswerGuidance,
      data.data.PartiallyAnswerGuidance,
      data.data.YesAnswerGuidance
    ];
    let newValue = customTooltips[value];
    return newValue;
  }

  onEditorPreparing(event) {
    console.info('editor prepearing', event);
    if ((event.dataField == "QuestionTitle") && event.parentType == "dataRow") {
      event.editorOptions.disabled = true;
      event.editorOptions.readOnly = true;
    }
  }

  getAnswer(event, data) {
    let numberOfAnswers = this.getNumberOfAnswers(data.data);
    let answerChoise;

    if(numberOfAnswers === 3) {
      if (event.value < 13) {
        data.data.AnswerChoise = 0;
        answerChoise = -1;
        event.value = 0;
      } else if (event.value >= 13 && event.value < 41) {
        data.data.AnswerChoise = 28;
        answerChoise = 0;
        event.value = 28;
      } else if (event.value >= 41 && event.value < 63) {
        data.data.AnswerChoise = 50;
        answerChoise = 1;
        event.value = 50;
      } else if(event.value >= 63 && event.value < 88) {
        data.data.AnswerChoise = 75;
        answerChoise = 2;
        event.value = 75;
      } else if (event.value >= 88) {
        data.data.AnswerChoise = 100;
        answerChoise = 3;
        event.value = 100;
      }
    } else if (numberOfAnswers === 2) {
      if (event.value < 13) {
        data.data.AnswerChoise = 0;
        answerChoise = -1;
        event.value = 0;
      } else if (event.value >= 13 && event.value < 41) {
        data.data.AnswerChoise = 28;
        answerChoise = 0;
        event.value = 28;
      } else if (event.value >= 41 && event.value < 75) {
        data.data.AnswerChoise = 50;
        answerChoise = 1;
        event.value = 50;
      } else if (event.value >= 75) {
        data.data.AnswerChoise = 100;
        answerChoise = 2;
        event.value = 100;
      }
    }
    this.answerResponse = {};
    let answer = [];
    data.data.AnswerChoise = event.value;
    answer.push({
      "Unit": this.currentUnit.Oid,
      "User": this.userService.getCurrentUser().Oid,
      "AnswerText": data.data.AnswerText,
      "Choice": answerChoise,
      "AssessmentType": this.currentUnit.AssessmentType,
      "Question": data.data.QuestionOid,
      "OID": data.data.AnswerOid,
      "Characteristic": this.currentCharacteristic['OID']
    });

    if (data.data.AnswerChoise >= 13) {
      if (this.updateSubscription) this.updateSubscription.unsubscribe();
      this.updateSubscription = this.questionsService.addAnswersArray(answer[0])
        .subscribe(
          response => {
            this.answerResponse = response.body;
            if (data.data.AnswerOid === 0) {
              data.data.AnswerOid = this.answerResponse;
            }

            if (answer[0].OID === 0) {
              this.characteristicList[this.activeTab].Answers.length--;
              if (this.characteristicList[this.activeTab].Answers.length === 0) {
                this.arrayForTabs[this.firstNotAnsweredIndex].badge = (+this.arrayForTabs[this.firstNotAnsweredIndex].badge - 1).toString();
              }
            }
           this.userService.showUserNotification("Answer was updated", 'success');

           let count = 0;
           this.questionsByCharacteristic.forEach(question => {
             if (question.AnswerChoise !== 0) {
               count++;
             }
           });
           this.isRelevantDisabled = count <= this.questionsByCharacteristic.length;
           if (count === this.questionsByCharacteristic.length) {
             this.assessmentCaptureFullService.getCurrentCharacteristic(this.currentCharacteristic.OID).subscribe(response => {
               this.answerResponse = response;
               this.currentCharacteristic.Status = this.answerResponse.Status;
               this.showCharacteristicStatus = this.questionsByCharacteristic.some(question => question.AnswerChoise === 0);
             })
           }
           },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error)
          }
        );
    } else {
      if (data.data.AnswerOid && data.data.AnswerOid != 0) {
        this.questionsService.deleteAnswer(data.data.AnswerOid)
          .subscribe((deletedAnswer) => {
              data.data.AnswerOid = 0;
              this.characteristicList[this.activeTab].Answers.length++;
              if (this.characteristicList[this.activeTab].Answers.length === 1) {
                this.arrayForTabs[this.firstNotAnsweredIndex].badge = (+this.arrayForTabs[this.firstNotAnsweredIndex].badge + 1).toString();
              }
              this.showCharacteristicStatus = this.questionsByCharacteristic.some(question => question.AnswerChoise === 0);

              this.userService.showUserNotification("Answer was updated", 'success');

              let count = 0;
              this.questionsByCharacteristic.forEach(question => {
                if (question.AnswerChoise !== 0) {
                  count++;
                }
              });
              this.isRelevantDisabled = count !== 0;
            },
            error => {
              this.userService.showUserNotification(error.error.Message, 'error');
              console.log(error)
            }
          )
      }
    }
  }

  onToolbarPreparing(e) {
     let indexRevertButton = e.toolbarOptions.items.indexOf(e.toolbarOptions.items.find(function (item) {
      return item.name == "revertButton";
    }));
    if (indexRevertButton != -1) {
      e.toolbarOptions.items.splice(indexRevertButton, 1);
    }
  }

  toShowGuidanceQuestion(data, item) {
   this.showGuidanceQuestion = data.rowIndex;
  }

  updateTable(event) {
    if (this.updating && !event.component.hasEditData()) {  // updates finished successfully
      this.updating = false;
    }
  }

  notAnswered(element, index, array) {
    if (element.UnAnsweredQuestionsCount > 0) {
      return index;
    }
  }

  selectTab(event) {
    this.dataGrid.instance.beginCustomLoading('Loading..');
    this.loadingVisible = true;
    this.characteristicList = [];
    this.currentCharacteristic = {};
    this.questionsByCharacteristic = [];
    this.activeTab = 0;
    this.firstNotAnsweredIndex = event.itemIndex;
    this.currentTab = this.arrayForTabs[event.itemIndex];

    this.standardsService.getCharacteristicByGroupOrPrinciple(event.itemData.id, event.itemData.content)
      .subscribe(
        (characteristicList: any) => {
          this.characteristicList = characteristicList;
          this.currentCharacteristic = this.characteristicList[0];
          this.getCharacteristicsListWithQuestionsAndCharacteristicByOid(this.characteristicList[0].OID)
         },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          console.log(error)
        }
      );
  }

  changeCharacteristicRelevant(event) {
   if (!event.value && this.isRelevantCharacteristic) {

      this.assessmentCaptureFullService.addNonRelevantCharacteristic(this.currentCharacteristic['OID'])
        .subscribe(response => {

          this.isRelevantCharacteristic = false;
        });
     this.arrayForTabs[this.firstNotAnsweredIndex].badge = (+this.arrayForTabs[this.firstNotAnsweredIndex].badge - 1).toString();

     this.characteristicList[this.activeTab].Answers = 0;
    }
    if (event.value && !this.isRelevantCharacteristic) {
      this.assessmentCaptureFullService.removeNonRelevantCharacteristic(this.currentCharacteristic['OID'])
        .subscribe(response => {

          this.isRelevantCharacteristic = true;
        })
      this.arrayForTabs[this.firstNotAnsweredIndex].badge = (+this.arrayForTabs[this.firstNotAnsweredIndex].badge + 1).toString();

      let questionArray$ = this.assessmentCaptureFullService.getQuestionsByCharacteristicAndUnit(this.currentCharacteristic['OID']);
      this.characteristicList[this.activeTab].Answers = questionArray$.subscribe(questions => {

        this.characteristicList[this.activeTab].Answers = questions['QuestionsList'];
        })
    }
  }

  toggleDefault(index, variant, info?) {
    if (variant === 1) {
      this.isPopupVisibleDontKnow = index;
    }
    if (variant === 2) {
      this.isPopupVisibleNo = index;
    }
    if (variant === 3) {
      this.isPopupVisiblePartially = index;
    }
    if (variant === 4) {
      this.isPopupVisibleYes = index;
    }

    if (info) {
      this.info = info;
    }
  }

  public toggleFullScreenToolTip() {
    this.showFullScreenTooltip = !this.showFullScreenTooltip;
  }

  public toggleFullScreenMode(mode: boolean) {
    this.homeService.changeFullscreenMode(mode);
  }

  /*data.data.Title === 'Practical Action' && currentCharacteristic.GuidanceText*/
  public isShowGoodManagementPractice(data) {
    if (data.data.Title === 'Practical Action') {
      let questions = this.questionsByCharacteristic.filter(question => {
        return question.Title === 'Practical Action';
      });
      if (questions.length === 1) {
        return data.data.Title === 'Practical Action' && this.currentCharacteristic.GuidanceText;
      } else {
        if (questions[0] && data.data.QuestionOid === questions[0].QuestionOid) {
          return data.data.Title === 'Practical Action' && this.currentCharacteristic.GuidanceText;
        }
      }
    }
    return false;
    }

  popupShown(template, type): void {
    this.currentPopupTemplate = null;
    this.guidancePopupShow = false;
    setTimeout( () => {
      let config: Popup = this.assessmentCaptureFullService[`${type}Popup`];
      this.currentPopupConfig = Object.assign(config)
      this.currentPopupTemplate = template;
      this.guidancePopupShow = true;
    }, 0)


  }

  showNotesPopup(template, type, data?) {
    this.currentPopupTemplate = null;
    this.guidancePopupShow = false;

   if(data) {
      this.currentQuestionOid = data.data.QuestionOid;
      this.currentQuestion = data.data;
     this.currentQuestion = data;
    }
    this.assessmentCaptureFullService.getNotesByQuestionAndCharacteristic(this.currentQuestionOid, this.currentCharacteristic.OID)
      .subscribe((note: QuestionNote) => {
        this.questionNote = note;
        this.popupShown(template, type)
        this.currentPopupConfig.title = "NOTES"
      })
  }


  updateNotes() {
    this.isNoteChanged = false;
  }

  updateQuestionNote(event) {
    event.event.stopPropagation();
    this.assessmentCaptureFullService.updateQuestionNotes(this.questionNote)
      .subscribe(data => {

          console.log(data)
        this.isNoteChanged = false;
          if(this.questionNote.Attachments) {
            if (!this.questionNote.Attachments.length && !this.questionNote.Note) {
              this.currentQuestion.data.IsNoteOrFileExist = false;
            }
          }
          !this.questionNote.Note ? this.currentQuestion.data.IsNoteOrFileExist = false :
            this.currentQuestion.data.IsNoteOrFileExist = true

        },
        error => {
          console.log(error);
          this.userService.showUserNotification(error.error.Message, 'error')
        }
      )
  }

  onChangeQuestionNote(event) {
    this.questionNote.Note = event.value;
  }

  deleteAttachment(OID) {
    this.assessmentCaptureFullService.deleteAnswerNoteAttachments(OID)
      .subscribe(data => {
          this.questionNote.Attachments = this.questionNote.Attachments.filter(el => el.OID !== OID);
          if(this.questionNote.Attachments) {
            if (!this.questionNote.Attachments.length && !this.questionNote.Note) {
              this.currentQuestion.data.IsNoteOrFileExist = false;
            }
          }
          !this.questionNote.Note ? this.currentQuestion.data.IsNoteOrFileExist = false :
            this.currentQuestion.data.IsNoteOrFileExist = true
        },
        error => {
          console.log(error);
          this.userService.showUserNotification(error.error.Message, 'error')
        })
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
            return this.assessmentCaptureFullService.getNotesByQuestionAndCharacteristic(this.currentQuestionOid, this.currentCharacteristic.OID)
          })
        ).subscribe((note: QuestionNote) => {
          this.questionNote = note;
          this.currentQuestion.data.IsNoteOrFileExist = true
        })
      };
    }
  }

  downloadAttachment(file) {
   this.assessmentCaptureFullService.downloadAttachment(file.OID)
     .subscribe((data: any) => {
       this.fileSaverService.save(data, file.FileName)
     },
       error => console.log(error));
  }

  ngOnDestroy() {
    if (this.isDone) {
      this.isDone.unsubscribe();
    }
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
  }
}
