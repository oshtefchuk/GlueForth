import { Component, OnInit, ViewChild } from '@angular/core';
import { MyActionsTasksService } from './tasks.service';
import { UserService } from '../../../shared/services/user.service';
import { DxDataGridComponent, DxFormComponent } from  'devextreme-angular';
import { CharacteristicCaptureListItems, MyActionsCaptureService } from "../capture/capture.service";
import { FileSaverService } from 'ngx-filesaver';
import { forkJoin } from 'rxjs';
import { UserProfileBusinessUnitItemService }
from '../../../user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service';
import { StandardsService } from '../../standards/standards.service';
import { AssessmentStateService } from '../../assessment/assessment-state/assessment-state.service';

export interface TasksQueryParams {
  CharacteristicOid?: number;
  PrincipleGroupOid?: number;
  QuestionGroupOid?: number;
}

@Component({
  selector: 'bluenorth-my-actions-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class MyActionsTasksComponent implements OnInit {

  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @ViewChild('createTaskForm') public createTaskForm: DxFormComponent;

  public today: Date = new Date('30 01 1901');

  public tasksData: any;
  private tasks: any;

  public newTask: CharacteristicCaptureListItems;
  public isAddTaskPopupVisible = false;
  public isFormSubmited = false;
  uploadFileName;
  fileForExport;
  questionGroupsTitles = [];
  fullListPrinciplesGroups = [];
  characteristicsList = [];
  tasksQueryParams: TasksQueryParams = {
    CharacteristicOid: 0,
    PrincipleGroupOid: 0,
    QuestionGroupOid: 0
  };

  constructor(private tasksService: MyActionsTasksService,
              private userService: UserService,
              private myActionsCaptureService: MyActionsCaptureService,
              private fileSaverService: FileSaverService,
              private userProfileBusinessUnitItemService: UserProfileBusinessUnitItemService,
              private standardsService: StandardsService,
              private assessmentStateService: AssessmentStateService,
              private myActionsTasksService: MyActionsTasksService) {
  }


  ngOnInit() {
    setTimeout( () => {
    //  this.dataGrid.instance.beginCustomLoading('Loading..');
    }, 0);

    const questionGroupsTitles$ = this.myActionsTasksService.getImprovementPlanQuestionGroups();
    const fullListPrinciplesGroups$ = this.myActionsTasksService.getImprovementPlanPrincipleGroups();
    const characteristicsList$ = this.myActionsTasksService.getImprovementPlanCharacteristics();
    forkJoin([questionGroupsTitles$, fullListPrinciplesGroups$, characteristicsList$])
      .subscribe((result: any[]) => {
        this.questionGroupsTitles = result[0];
        this.questionGroupsTitles.unshift({OID: 0, Title: 'All Categories'});
        this.fullListPrinciplesGroups = result[1];
        this.fullListPrinciplesGroups.unshift({OID: 0, Title: 'All Focus Areas', ShortTitle: 'All Focus Areas'});
        this.characteristicsList = result[2];
        this.characteristicsList.unshift({OID: 0, Title: 'All Characteristics', ShortTitle: 'All Characteristics'});
      });

    this.tasksService.getTasks().subscribe( data => {
      this.tasksData = data;
      this.tasks = data;
        this.dataGrid.instance.endCustomLoading();
    },
      error => {
        this.dataGrid.instance.endCustomLoading();
        this.userService.showUserNotification(error.error.Message, 'error');
      },
      () => {
      if(this.tasksData && this.tasksData.length) {
        this.tasksData.forEach(data => {
          if (data.DueDate === '0001-01-01T00:00:00') {
            data.DueDate = '';
          } else {
            data.DueDate = new Date(data.DueDate);
          }
        });
        this.today = this.tasksData[0].DueDate;
      }
      this.orderHeaderFilter = this.orderHeaderFilter.bind(this);

          this.dataGrid.instance.endCustomLoading();
        });
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

  changeFilter(event, type) {

   // this.currentUnitStatuses = [];
   // this.checkBoxValue = false;
   // if (this.filterSubscription) this.filterSubscription.unsubscribe();
   // if (this.isStatusFilterInit) this.statusFilter.value = 2;
    this.dataGrid.instance.beginCustomLoading('Loading..');

    if (type === 'questionGroup') {
      this.tasksQueryParams.QuestionGroupOid = event.selectedItem.OID;
    }
    if (type === 'fullListPrinciplesGroups') {
      this.tasksQueryParams.PrincipleGroupOid = event.selectedItem.OID;
    }
    if (type === 'characteristicsList') {
      this.tasksQueryParams.CharacteristicOid = event.selectedItem.OID;
    }

    this.tasksService.getFilteredTasks(this.tasksQueryParams)
      .subscribe(data => {
        this.tasksData = []
        this.tasksData = data;
        this.dataGrid.instance.endCustomLoading()
      });
    /*this.tasksSubscription = this.standardsService.getCurrentUnitStatuses(this.standardQueryParams)
      .subscribe((data: any[]) => {
          this.currentUnitStatuses = data;
          this.currentUnitStatusesSource = Object.assign([], this.currentUnitStatuses);
          this.dataGrid.instance.endCustomLoading();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          this.dataGrid.instance.endCustomLoading();
        })*/
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    const now = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(now.getDate() - now.getDay() + 1);
    endDate.setDate(startDate.getDate() + 6);
    let column = this as any;
    if(target === 'headerFilter' && value === 'This week') {
      return [['DueDate', '>=', startDate], 'and', ['DueDate', '<=', endDate]];
    }
    if(target === 'headerFilter' && value === 'Other') {
      return [['DueDate', '<', startDate], 'or', ['DueDate', '>', endDate]];
    }

    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results = ([{
        text: 'This week',
        value: 'This week'
      },
        {
          text: 'Other',
          value: 'Other'
        }]);
      return results;
    };
  }

  editTask(event, data) {
    this.isFormSubmited = false;
    this.newTask = new CharacteristicCaptureListItems();
    this.newTask.DueDate = data.data.DueDate;
    this.newTask.Actions = data.data.Actions;
    this.newTask.CharacteristicOid = data.data.CharacteristicOid;
    this.newTask.Resposible = data.data.Resposible;
    this.newTask.IsCompleted = data.data.IsCompleted;
    this.newTask.QuestionOid = data.data.QuestionOid;
    this.newTask.Result = data.data.Result;
    this.newTask.File = data.data.File;
    this.newTask.FileName = data.data.FileName;

    this.isAddTaskPopupVisible = true;
    this.newTask.ImprovementPlanItemOid = data.data.ImprovementPlanItemOid;
  }


  deleteTask(event, data) {
    let index = this.tasksData.indexOf(data.data);

    this.myActionsCaptureService.deleteImprovementPlanItems(data.data.ImprovementPlanItemOid).subscribe(response => {
      this.tasksData.splice(index, 1);
    });
  }
/*
  downloadFile(item) {

    this.myActionsCaptureService.downloadAttachment(item.ImprovementPlanItemOid)
      .subscribe(
        data => console.log(data)
      )
  }*/

  addFiles(target) {
    if (target.value && target.value.length) {
      const files = target.value;

      this.uploadFileName =  files[0].name;
      const reader = new FileReader();
      const fileData = new Blob([files[0]]);
      reader.readAsArrayBuffer(fileData);
      reader.onloadend = (evt: any) => {
        this.fileForExport = new Uint8Array(evt.currentTarget.result);
        this.newTask.File = Array.from(this.fileForExport);
        this.newTask.FileName = this.uploadFileName;
      };
    } else {
      this.uploadFileName = '';
      this.fileForExport = [];
      this.newTask.FileName = '';
      this.newTask.File = null;
    }
  }


  downLoadFile(task) {
    this.myActionsCaptureService.downloadAttachment(task.ImprovementPlanItemOid)
      .subscribe((data: any) => {
        this.fileSaverService.save(data, task.FileName);
      });
  }


  onFormSubmitEditTask(event) {
    this.isFormSubmited = true;
    this.myActionsCaptureService.createOrUpdateRow(this.newTask)
      .subscribe((rowData: any) => {

          let index = this.tasksData.findIndex(task => task.ImprovementPlanItemOid === this.newTask.ImprovementPlanItemOid);
          this.tasksData[index].DueDate = this.newTask.DueDate;
          this.tasksData[index].Actions = this.newTask.Actions;
          this.tasksData[index].CharacteristicOid = this.newTask.CharacteristicOid;
          this.tasksData[index].Resposible = this.newTask.Resposible;
          this.tasksData[index].IsCompleted = this.newTask.IsCompleted;
          this.tasksData[index].QuestionOid = this.newTask.QuestionOid;
          this.tasksData[index].Result = this.newTask.Result;
          this.tasksData[index].Status = rowData.body;
          this.tasksData[index].File = this.newTask.File;
          this.tasksData[index].FileName = this.newTask.FileName;
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        },
        () => {
          this.isAddTaskPopupVisible = false;
          this.dataGrid.instance.refresh();
          this.createTaskForm.instance.resetValues();
        });
  }
}
