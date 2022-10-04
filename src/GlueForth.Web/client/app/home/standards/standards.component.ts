import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StandardsService} from "./standards.service";
import {CurrentUnitStatuses, Standard} from "../../shared/models/standard.model";
import {UserService} from "../../shared/services/user.service";
import {UnitService} from "../../shared/services/unit.service";
import {UnitInfo} from "../../shared/models/unit.model";
import {UserLight} from "../../shared/models/user.model";
import {Router} from "@angular/router";
import {HomeService} from "../home.service";
import {DxDataGridComponent, DxFormComponent, DxSelectBoxComponent, DxFileUploaderComponent} from 'devextreme-angular';
import {RegistrationSettingsService} from "../../authentification/registration-settings/registration-settings.service";
import {AssessmentStateService} from "../assessment/assessment-state/assessment-state.service";
import {forkJoin} from "rxjs/index";
import {UserProfileBusinessUnitItemService} from "../../user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service";
import {CharacteristicCaptureList, MyActionsCaptureService} from "../my-actions/capture/capture.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import slide_out from "devextreme/ui/slide_out";


export interface StandardQueryParams {
  CharacteristicOid?: number;
  PrincipleGroupOid?: number;
  QuestionGroupOid?: number;
  StandardOid?: number;
}

@Component({
  selector: 'bluenorth-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.scss']
})
export class StandardsComponent implements OnInit, OnDestroy {

  @ViewChild('dataGrid') public dataGrid: DxDataGridComponent;
  @ViewChild('statusFilter') public statusFilter: DxSelectBoxComponent;
  @ViewChild('createTaskForm') public createTaskForm: DxFormComponent;

  userLight: UserLight;
  currentUnitId: string;
  currentUnitStatuses: CurrentUnitStatuses[] = [];
  currentUnitStatusesSource: CurrentUnitStatuses[] = [];
  public standardsByUnit: Standard[] = [];
  public isStatusFilterInit = false;
  public standardsByCurrentUnit: any[] = [];
  public questionGroupsTitles: any[] = [];
  public fullListPrinciplesGroups: any[] = [];
  public characteristicsList: any[] = [];
  public currentUnit: UnitInfo;
  public standardStatuses = [{id: 0, status: 'In Action Plan'}, {id: 1, status: 'Not In Action Plan'}, {
    id: 2,
    status: 'All Statuses'
  }];
  public standardShowFilter = [{id: 0, status: 'Not Fully Compliant'}, {id: 1, status: 'Entire Standard'}];
  public standardQueryParams: StandardQueryParams = {
    CharacteristicOid: 0,
    PrincipleGroupOid: 0,
    QuestionGroupOid: 0,
    StandardOid: 0
  };
  public isAddTaskPopupVisible = false;
  isMultipleTask = false;
  public newTask: any;
  public checkBoxValue = false;
  private multipleTasks = [];
  private filterSubscription: any;
  private dataFromUnitSelectorSubscription$: any;

  value: any[] = [];
  uploadValue: any[] = [];
  fileForExport;
  uploadFileName
  constructor(private standardsService: StandardsService,
              private userService: UserService,
              private router: Router,
              private unitService: UnitService,
              private registrationSettingsService: RegistrationSettingsService,
              private assessmentStateService: AssessmentStateService,
              private userProfileBusinessUnitItemService: UserProfileBusinessUnitItemService,
              private homeService: HomeService,
              private myActionCaptureService: MyActionsCaptureService) {

  }

  ngOnInit() {
    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(data => {
        this.loadData();
      });
    this.loadData();
  }

  getAllPoints(event) {
  }

  updateClick(event) {

  }

  getItemForTask(event, item) {
    if (event) {
      this.multipleTasks.push({
        CharacteristicOid: item.data.CharacteristicOid,
        StandardContentOid: item.data.StandardContentOid
      });
    } else {
      this.multipleTasks = this.multipleTasks.filter(elem => elem.StandardContentOid !== item.data.StandardContentOid);
    }
  }

  addMultipleTasks() {
    this.isAddTaskPopupVisible = true;
    this.isMultipleTask = true;
  }

  loadData() {
    this.currentUnitStatuses = [];
    setTimeout(() => {
     this.dataGrid.instance.beginCustomLoading('Loading..');
    }, 0);
    const standardsByCurrentUnit$ = this.userProfileBusinessUnitItemService.getStandardsByUnitId(this.userService.currentUser.CurrentUnitId);
    const questionGroupsTitles$ = this.standardsService.getQuestionGroupsTitles();
    const fullListPrinciplesGroups$ = this.assessmentStateService.getFullListByPrincipleGroups();
    const characteristicsList$ = this.standardsService.getCharacteristicsByCurrentFramework();
    forkJoin([standardsByCurrentUnit$, questionGroupsTitles$, fullListPrinciplesGroups$, characteristicsList$])
      .subscribe((result: any[]) => {
        this.standardsByCurrentUnit = result[0];
        this.standardsByCurrentUnit.unshift({OID: 0, Title: 'All Standards', ShortTitle: 'All Standards'});
        this.questionGroupsTitles = result[1];
        this.questionGroupsTitles.unshift({OID: 0, Title: 'All Categories'});
        this.fullListPrinciplesGroups = result[2];
        this.fullListPrinciplesGroups.unshift({OID: 0, Title: 'All Focus Areas', ShortTitle: 'All Focus Areas'});
        this.characteristicsList = result[3];
        this.characteristicsList.unshift({OID: 0, Title: 'All Characteristics', ShortTitle: 'All Characteristics'});
      });
    this.standardsService.getCurrentUnitAllStatuses(0, this.standardQueryParams)
      .subscribe((currentUnitStatuses: CurrentUnitStatuses[]) => {
          this.currentUnitStatuses = currentUnitStatuses;
          this.currentUnitStatusesSource = Object.assign([], this.currentUnitStatuses);
          this.dataGrid.instance.endCustomLoading();
          if (!this.currentUnitStatuses.length) {
            this.userService.showUserNotification("You don't have STANDARDS yet", 'error')
          }
          this.dataGrid.instance.endCustomLoading();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        });
  }

  redirectToCurrentStandard(event) {
    this.router.navigate([`standards-management/${event.data.OID}/performance-indicators`]);
    this.homeService.title.next('PERFORMANCE INDICATORS');
  }

  changeFilter(event, type) {
    this.currentUnitStatuses = [];
    this.checkBoxValue = false;
    if (this.filterSubscription) this.filterSubscription.unsubscribe();
    if (this.isStatusFilterInit) this.statusFilter.value = 2;
    this.dataGrid.instance.beginCustomLoading('Loading..');
    if (type === 'standard') {
       this.standardQueryParams.StandardOid = event.selectedItem.OID;
    }
    if (type === 'questionGroup') {
      this.standardQueryParams.QuestionGroupOid = event.selectedItem.OID;
    }
    if (type === 'fullListPrinciplesGroups') {
      this.standardQueryParams.PrincipleGroupOid = event.selectedItem.OID;
    }
    if (type === 'characteristicsList') {
      this.standardQueryParams.CharacteristicOid = event.selectedItem.OID;
    }
    this.filterSubscription = this.standardsService.getCurrentUnitStatuses(this.standardQueryParams)
    .subscribe((data: any[]) => {
          this.currentUnitStatuses = data;
          this.currentUnitStatusesSource = Object.assign([], this.currentUnitStatuses);
          this.dataGrid.instance.endCustomLoading();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
          this.dataGrid.instance.endCustomLoading();
        })
  }

  changeStatusFilter(event) {
    this.isStatusFilterInit = true;
    if (event.selectedItem.id === 0) {
      this.currentUnitStatuses = this.currentUnitStatusesSource.filter(item => item['TasksCount'] > 0);
    } else if (event.selectedItem.id === 1) {
      this.currentUnitStatuses = this.currentUnitStatusesSource.filter(item => item['TasksCount'] === 0);
    } else {
      this.currentUnitStatuses = this.currentUnitStatusesSource;
    }
  }


  changeStandardShowFilter(event) {
    this.currentUnitStatuses = [];
    this.checkBoxValue = false;
    this.dataGrid.instance.beginCustomLoading('Loading..');
     this.standardsService.getCurrentUnitAllStatuses(event.selectedItem.id, this.standardQueryParams).subscribe((data: any[])  => {
      this.currentUnitStatuses = data;
       this.dataGrid.instance.endCustomLoading();
    });
  }

  ngOnDestroy() {
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
  }

  onFormSubmitCreateTask(event) {

    if (!this.newTask.IsCompleted) {
      this.newTask.IsCompleted = false;
    }

    if (this.fileForExport && this.fileForExport.length) {
      this.newTask.File = Array.from(this.fileForExport);
      this.newTask.FileName =  this.uploadFileName;

    }

    if (this.isMultipleTask) {
      const payloadArray = [];
      for (let i = 0; i < this.multipleTasks.length; i++) {
      //  this.newTask.CharacteristicOid = this.multipleTasks[i].CharacteristicOid;
      //  this.newTask.StandardContentOid = this.multipleTasks[i].StandardContentOid;
        payloadArray.push({...this.newTask, ...this.multipleTasks[i]});
      }
     this.myActionCaptureService.createOrUpdateSet(payloadArray)
        .subscribe(
          (response: any) => {
           this.loadData();
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error')
          },
          () => {
            this.isMultipleTask = false;
            this.isAddTaskPopupVisible = false;
            this.createTaskForm.instance.resetValues();
            this.newTask = {};
            this.multipleTasks = [];
          });
    }

    if (!this.isMultipleTask) {

      this.myActionCaptureService.createOrUpdateRow(this.newTask).subscribe((rowData: any) => {
          this.isAddTaskPopupVisible = false;
          this.multipleTasks = [];
          this.createTaskForm.instance.resetValues();
          this.uploadValue = null;
          this.loadData();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    }
  }

  addTask(data) {
    this.newTask = {};
    this.isMultipleTask = false;
    this.isAddTaskPopupVisible = true;
    this.newTask.CharacteristicOid = data.data.CharacteristicOid;
    this.newTask.StandardContentOid = data.data.StandardContentOid;
  }

  setStandardSelectWidth(e) {
    e.component._popup.option('width', 500);
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

  sortByStandardContentRef(value1, value2) {
    const arr1 = value1.split(' ');
    const arr2 = value2.split(' ');

    if (arr1[0] === arr2[0]) {
      const arr1Numbers = arr1[1].split('.');
      const arr2Numbers = arr2[1].split('.');
      const result = StandardsComponent.compareTwoNumberArrays(arr1Numbers, arr2Numbers);
      return result !== null ? result : 10;
    } else if (arr1[0] > arr2[0]) {
      return 10;
    } else {
      return -10;
    }
  }

  static compareTwoNumberArrays(arr1, arr2) {
    let result = null;
    let i = 0;
    while (result === null && i < 5) {
      if (arr1[i] && arr2[i] && parseInt(arr1[i]) > parseInt(arr2[i])) {
        result = 10;
      } else if (arr1[i] && arr2[i] && parseInt(arr1[i]) < parseInt(arr2[i])) {
        result = -10;
      }
      i++;
    }
    return result;
  }

  addFiles(target) {
    if (target.value && target.value.length) {
      const files = target.value;
      this.uploadFileName = files[0].name;
      const reader = new FileReader();
      const fileData = new Blob([files[0]]);
      reader.readAsArrayBuffer(fileData);
      reader.onloadend = (evt: any) => {
        this.fileForExport = new Uint8Array(evt.currentTarget.result);
      };
    } else {
      this.uploadFileName = '';
      this.fileForExport = [];
    }
  }
}
