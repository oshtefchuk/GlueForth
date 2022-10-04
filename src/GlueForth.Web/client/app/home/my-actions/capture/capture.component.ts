import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CharacteristicCaptureList, CharacteristicCaptureListItems, CharacteristicsForImprovementPlanItemsSelector,
          MyActionsCaptureService } from './capture.service';

import { StandardsService } from '../../standards/standards.service';
import { UserService } from '../../../shared/services/user.service';
import { HomeService } from '../../home.service';
import { forkJoin, of } from 'rxjs/index';
import { switchMap } from 'rxjs/internal/operators';
import { DxFormComponent } from 'devextreme-angular';
import { IndicatorReportingService } from '../../performance-indicators/indicator-reporting/indicator-reporting.service';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from "../../../shared/services/unit.service";
import { UnitInfo } from "../../../shared/models/unit.model";


@Component({
  selector: 'bluenorth-my-actions-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class MyActionsCaptureComponent implements OnInit, OnDestroy {

  @ViewChild('dataGrid') public dataGrid;

  @ViewChild('createTaskForm') public createTaskForm: DxFormComponent;

  @ViewChild('characterisricSelectBox') public characterisricSelectBox;

  @ViewChild('dateSelectBox') public dateSelectBox;

  @ViewChild('completeSelectBox') public completeSelectBox;

  @ViewChild('evidence') public evidence;

  public characteristicsList: CharacteristicsForImprovementPlanItemsSelector[] = [];
  public defaultChoosenCharacteristic: number;
  public currentCharacteristic: any;
  public currentCharacteristicOID: number;
  public currentFrameworkTitle: string;
  public characteristicCaptureList: CharacteristicCaptureList[] = [];
  public isPopupVisibleGuidance: number;
  public guidance: string;
  public showGuidance: number;
  public showCharacteristicGuidance = false;
  public newTask: CharacteristicCaptureListItems;
  public popupTitle: string;
  public currentRow: any;
  public currentIndex: number;
  public date;
  public optionType: string;
  public isDeleteClicked: number;
  public isAddTaskPopupVisible = false;
  public isClicked = false;
  public isShowPopupGuidance: boolean = false;
  public isShowAdoptionOfGoodPracticePopupGuidance: boolean = false;
  private completeFilter: string;
  private dateFilter: string;
  private dataFromUnitSelectorSubscription$: any;
  public popoverHeaderVisibleIndex: number;
  public popoverHeaderVisibleRow: number;
  private characteristicId: number;
  public popupContent: string[] = ['A specific action to be taken.', 'The person responsible for this action.',
    'The due-date for completion of the action.', 'Any specific evidence to confirm completion of the action (if applicable)',
    'Mark as “completed” those actions that are completed.'];

  public booleanSelectBox : any[] = [
    {
      Name: 'Unanswered',
      State: 0
    },
    {
      Name: 'No',
      State: 1
    },
    {
      Name: 'Yes',
      State: 2
    }
  ];

  public isPopupVisible = false;
  public graphData: any = {};
  public indicatorData: any;
  public showFullScreenTooltip = false;
  public isCompleteByFilterVisible = true;
  public isFormSubmited = false;

  constructor(private myActionsCaptureService: MyActionsCaptureService,
              private standardsService: StandardsService,
              private userService: UserService,
              private unitService: UnitService,
              private homeService: HomeService,
              private indicatorReportingService: IndicatorReportingService,
              private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.characteristicId = params['characteristicId'];
    });
    this.newTask = this.myActionsCaptureService.getNewTask();
  }

  ngOnInit() {
    this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
      .subscribe((unit: UnitInfo) => {
        if (unit.FrameworkId) {
          this.unitService.getFrameworkById(unit.FrameworkId).subscribe(resp => {
            this.currentFrameworkTitle = resp['Title'];
          })
        }
      });

    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(() => {
        this.characteristicsList = [];
        this.currentCharacteristic = [];

        this.characteristicCaptureList = [];
        this.getCharacteristics();
      });
    this.getCharacteristics();
  }

  getCharacteristics() {
    this.myActionsCaptureService.getCharacteristics()
      .subscribe((characteristicsList: CharacteristicsForImprovementPlanItemsSelector[]) => {
          this.characteristicsList = characteristicsList;
            const characteristic = this.characteristicsList.find(char => {
              return char.Oid == this.characteristicId;
            });
            if (characteristic && characteristic.Oid) {
              this.defaultChoosenCharacteristic = characteristic.Oid;
            }
            if (!this.defaultChoosenCharacteristic) {
              this.defaultChoosenCharacteristic = this.characteristicsList.length ? this.characteristicsList[0].Oid : null;
            }
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
  }

  setCurrentCharacteristic(event) { 
    this.dataGrid.instance.beginCustomLoading('Loading..')
    let characteristicByOid$;
    let characteristicCaptureList$;
    this.currentCharacteristicOID = event.selectedItem.Oid;
    const select = of(event.selectedItem.Oid);
    this.characteristicCaptureList = [];
    characteristicByOid$ = select.pipe(
      switchMap((characteristicOid) => {
        return this.standardsService.getCharacteristicByOid(characteristicOid)
      })
    );
    characteristicCaptureList$ = select.pipe(
      switchMap((characteristicOid) => {
        return this.myActionsCaptureService.getCharacteristicCaptureList(characteristicOid)
      })
    );

    forkJoin([characteristicByOid$, characteristicCaptureList$])
      .subscribe((result: any) => {
        this.currentCharacteristic = result[0];
        this.getByCompleteCharacteristicList(this.completeFilter, result[1]);
      });      
  }

  setIsCompleted(event) {
    this.completeFilter = event.selectedItem;
    if (!this.currentCharacteristicOID) { return; }
    this.characteristicCaptureList = [];
    this.myActionsCaptureService.getCharacteristicCaptureList(this.currentCharacteristicOID)
      .subscribe((characteristicCaptureList: CharacteristicCaptureList[]) => {
          this.getByCompleteCharacteristicList(this.completeFilter, characteristicCaptureList);
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          this.dataGrid.instance.endCustomLoading();
        });
  }

  getByCompleteCharacteristicList(completeFilter, characteristicCaptureList) {
    if (this.completeFilter === 'All') {
      this.characteristicCaptureList = characteristicCaptureList;
    }
    if (this.completeFilter === 'Complete') {
      this.characteristicCaptureList = characteristicCaptureList;
      for (let i = 0; i < characteristicCaptureList.length; i++) {
        this.characteristicCaptureList[i].Items = characteristicCaptureList[i].Items.filter(item => item.IsCompleted);
      }

    }
    if (this.completeFilter === 'Incomplete') {
      this.characteristicCaptureList = characteristicCaptureList;
      for (let i = 0; i < characteristicCaptureList.length; i++) {
        this.characteristicCaptureList[i].Items = characteristicCaptureList[i].Items.filter(item => !item.IsCompleted);
      }
    }
    this.dataGrid.instance.endCustomLoading();
  }

  changeIsCompleted(event, data) {
    data.data.IsCompleted = event.value;
    this.myActionsCaptureService.createOrUpdateRow(data.key)
      .subscribe((rowData: any) => {
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        });
  }

  toggleGuidancePopup(index, guidance) {
    this.isPopupVisibleGuidance = index;
    this.guidance = guidance;
  }

  deleteRow(event, data) {
    this.isDeleteClicked = data.rowIndex;
    this.myActionsCaptureService.deleteImprovementPlanItems(data.data.ImprovementPlanItemOid)
      .subscribe(response => {
          this.myActionsCaptureService.getCharacteristicCaptureList(this.currentCharacteristicOID)
            .subscribe((characteristicCaptureList: CharacteristicCaptureList[]) => {
              this.characteristicCaptureList = []
              this.getByCompleteCharacteristicList(this.completeFilter, characteristicCaptureList);
              this.isDeleteClicked = null;
            });
          },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          this.isDeleteClicked = null;
        });
  }

  answerQuestion(event, data) {
   data.data.IsCompleted = event.data;
  }

  rowToUpdate(rowItem) {
    return {
      QuestionOid: rowItem.QuestionOid,
      CharacteristicOid: rowItem.CharacteristicOid,
      Actions: rowItem.Actions,
      Resposible: rowItem.Resposible,
      DueDate: rowItem.DueDate,
      Result: rowItem.Result,
      IsCompleted: rowItem.IsCompleted,
      IsDisabled: rowItem.IsDisabled
    }      
  }

  saveUpdatedRow(data) {
    if (data.key.Items.length > 0) {
      data.key.Items.forEach(rowItem => {
        let item = {
          QuestionOid: rowItem.QuestionOid,
          CharacteristicOid: rowItem.CharacteristicOid,
          IsDisabled: data.key.IsDisabled,
          ImprovementPlanItemOid: rowItem.ImprovementPlanItemOid,
          Actions: rowItem.Actions,
          Resposible: rowItem.Resposible,
          DueDate: rowItem.DueDate,
          Result: rowItem.Result,
          IsCompleted: rowItem.IsCompleted,
          Cost: rowItem.Cost
        }
        this.myActionsCaptureService.createOrUpdateRow(item)
          .subscribe((rowData: any) => {
            },
            error => {
              this.userService.showUserNotification(error.error.Message, 'error');
            });
      });
    } else {
      const item = {
        QuestionOid: data.data.QuestionOid,
        CharacteristicOid: data.data.CharacteristicOid,
        IsDisabled: data.key.IsDisabled
      }
      this.myActionsCaptureService.createOrUpdateRow(item)
        .subscribe((rowData: any) => {
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error')
          });
    }
  }

  updateRow(event, data, cellData, field) {
    data.data.State = event.itemData.State;
    if (event.itemData.State === 1) {
      data.key['IsDisabled'] = true;
      this.saveUpdatedRow(data)
    }
    if (event.itemData.State === 2) {
      data.key['IsDisabled'] = false;
      // this.saveUpdatedRow(data) // bugherd #1447
      this.addTask(event, data);
    }
    if (event.itemData.State === 0) {
      data.key['IsDisabled'] = true;
      data.data.Items.forEach(item => {
        this.myActionsCaptureService.deleteImprovementPlanItems(item.ImprovementPlanItemOid)
          .subscribe(response => {
              this.myActionsCaptureService.getCharacteristicCaptureList(this.currentCharacteristicOID)
                .subscribe((characteristicCaptureList: CharacteristicCaptureList[]) => {
                  this.characteristicCaptureList = []
                  this.getByCompleteCharacteristicList(this.completeFilter, characteristicCaptureList);
                  this.isDeleteClicked = null;
                });
            },
            error => {
              this.userService.showUserNotification(error.error.Message, 'error')
              this.isDeleteClicked = null;
            });
      });
    }
  }

  addTask(event, data) {
    if (this.createTaskForm) {      
      this.createTaskForm.instance.resetValues();
    }
    
    this.popupTitle = `ADD TASK: ${data.key.QuestionGroup}`;
    this.optionType = 'create';
    this.newTask =  this.myActionsCaptureService.getNewTask();
    this.isFormSubmited = false;
    this.isAddTaskPopupVisible = true;
    this.date = new Date();       
    this.currentRow = data.key;        
    this.newTask.Cost = 0 // bugherd #1448     
 }

  editTask(event, data) {
    this.optionType = 'edit';
    this.isFormSubmited = false;
    this.newTask.DueDate = data.key.DueDate;
    this.newTask.Actions = data.key.Actions;
    this.newTask.CharacteristicOid = data.key.CharacteristicOid;
    this.newTask.Resposible = data.key.Resposible;
    this.newTask.IsCompleted = data.key.IsCompleted;
    this.newTask.QuestionOid = data.key.QuestionOid;
    this.newTask.Result = data.key.Result;
    this.newTask.Cost = data.key.Cost;
    this.isAddTaskPopupVisible = true;
    let questionGroup = '';
    for (let i = 0; i < this.characteristicCaptureList.length; i++) {
      if (this.characteristicCaptureList[i].QuestionOid === this.newTask.QuestionOid) {
        questionGroup = this.characteristicCaptureList[i].QuestionGroup;
      }
    }
    this.popupTitle = `EDIT TASK: ${questionGroup}`;
    this.newTask.ImprovementPlanItemOid = data.key.ImprovementPlanItemOid;
  }

  getTitle() {
    return this.popupTitle;
  }

  compareDates(date) {
    let dueDate = new Date(date).setHours(0, 0, 0, 0);
    let currentDate = new Date().setHours(0, 0, 0, 0);

    if (dueDate < currentDate) {
      return true
    } else {
      return false
    }    
  }

  onFormSubmitCreateTask(event) {
    this.isFormSubmited = true;
    if (this.optionType === 'create') {
      this.newTask.CharacteristicOid = this.currentRow.CharacteristicOid;
      this.newTask.QuestionOid = this.currentRow.QuestionOid;
      !this.newTask.IsCompleted ? this.newTask.IsCompleted = false : this.newTask.IsCompleted;
      !this.newTask.DueDate ? this.newTask.DueDate = this.date : this.newTask.DueDate;
      delete this.newTask.ImprovementPlanItemOid;

      for (let i = 0; i < this.characteristicCaptureList.length; i++) {
        if (this.characteristicCaptureList[i].QuestionOid === this.newTask.QuestionOid) {
          this.currentIndex = i;
        }
      }
      this.myActionsCaptureService.createOrUpdateRow(this.newTask).pipe(
        switchMap(() => {
          this.isAddTaskPopupVisible = false;
          return this.myActionsCaptureService.getCharacteristicCaptureList(this.currentCharacteristicOID);
        }))
        .subscribe((characteristicCaptureList: CharacteristicCaptureList[]) => {
            this.characteristicCaptureList = [];
            this.getByCompleteCharacteristicList(this.completeFilter, characteristicCaptureList);
            this.createTaskForm.instance.resetValues();
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error');
          });
    }
    if (this.optionType === 'edit') {
      this.myActionsCaptureService.createOrUpdateRow(this.newTask).pipe(
        switchMap(() => {
          return this.myActionsCaptureService.getCharacteristicCaptureList(this.currentCharacteristicOID);
        })
      ).subscribe((characteristicCaptureList: CharacteristicCaptureList[]) => {
          this.characteristicCaptureList = [];
          this.getByCompleteCharacteristicList(this.completeFilter, characteristicCaptureList);
          this.isAddTaskPopupVisible = false;
          this.createTaskForm.instance.resetValues();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    }
  }

  onRowPrepared(event) {
    if (event.data) {
      event.rowElement.className = 'not-active-row dx-row dx-data-row dx-row-lines dx-column-lines';
      if (!event.data.IsCompleted && event.data.IsOverDue) {
        event.rowElement.className = 'not-active-row dx-row dx-data-row dx-row-lines dx-column-lines';
      } else {
        event.rowElement.className = 'active-row dx-row dx-data-row dx-row-lines dx-column-lines';
      }
    }
  }

  togglePopover(dataIndex, taskRow) {
    this.popoverHeaderVisibleRow = taskRow;
    this.popoverHeaderVisibleIndex = dataIndex;
  }

  public toggleFullScreenToolTip() {
    this.showFullScreenTooltip = !this.showFullScreenTooltip;
  }

  public toggleFullScreenMode(mode: boolean) {
    this.isCompleteByFilterVisible = !this.isCompleteByFilterVisible;
    this.homeService.changeFullscreenMode(mode);
  }

  getCharacteristicPopup(data) {
    if (data.data.QuestionGroup === 'Measured Result/Impact') {
      setTimeout(() => {
        this.dataGrid.instance.beginCustomLoading('Loading..');
      }, 0);
      this.indicatorReportingService.getIndicatorChartData(data.data.CharacteristicOid).subscribe((response) => {
         this.indicatorData = response;
        },
        (error1) => {
          this.dataGrid.instance.endCustomLoading();
          this.userService.showUserNotification(error1.error.Message, 'error');
        },
        () => {
          setTimeout(() => {
            this.isPopupVisible = true;
          }, 0);
          this.dataGrid.instance.endCustomLoading();
          this.graphData.Period = this.indicatorData.Results[0].slice(2);
          this.graphData.Value = this.indicatorData.Results[1].slice(2);
          this.graphData = this.indicatorData.Results[0].map((item, index) => {
            if (index !== 0 && index !== 1) {
              return {
                Period: this.indicatorData.Results[0][index],
                Value: +this.indicatorData.Results[1][index]
              };
            }
          });
        });
    } else {

    }
  }

  showGuidancePopup(data) {
    this.guidance = data.data.ImprovementPlanGuidance;
    this.isShowPopupGuidance = true;
  }

  showAdoptionOfGoodPracticeGuidancePopup(data) {
    this.guidance = data.data.ImprovementPlanGuidance;
    this.isShowAdoptionOfGoodPracticePopupGuidance = true;
  }

  closePopup() {    
    this.isPopupVisible = false; 
  }

  ngOnDestroy() {
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
  }
}
