import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ImprovementData, MyActionsReportingService, QuestionGroupStatuses} from "./reporting.service";
import {HomeService} from "../../home.service";
import {Subscription} from "rxjs/index";
import {UserService} from "../../../shared/services/user.service";



@Component({
  selector: 'bluenorth-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class MyActionsReportingComponent implements OnInit, OnDestroy {

  @ViewChild('dataGrid') public dataGrid;

  public improvementData: ImprovementData[] = [];
  public questionGroupTitles: any[] = [];
  private dataFromUnitSelectorSubscription$: Subscription;
  private improvementReportData$: Subscription;
  private questionGroupTitles$: Subscription;

  public statuses = [
     {
      color: '#5fc874',
      description: 'Tasks Completed'
    },
    {
      color: '#DB253F',
      description: 'Tasks Outstanding'
    },
    {
      color: '#fa9c3a',
      description: 'Not Yet Evaluated'
    },
    {
      color: '#5fc874',
      description: 'No Tasks Required'
    }
  ];

  QuestionGroupStatuses: typeof QuestionGroupStatuses =  QuestionGroupStatuses;

  constructor(private homeService: HomeService,
              private myActionsReportingService: MyActionsReportingService,
              private userService: UserService) { }

  ngOnInit() {
    this.questionGroupTitles$ = this.myActionsReportingService.getQuestionGroupsTitles()
      .subscribe((data: any[]) => {
        this.questionGroupTitles = data;
        for (let i = 0; i < this.questionGroupTitles.length; i++) {
          this.dataGrid.instance.addColumn({
            dataField: this.questionGroupTitles[i].Title,
            dataType: "number",
            cellTemplate: 'dataTemplate',
            headerCellTemplate: "titleHeaderTemplate"
          });
        }
      });
    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(item => {

        this.questionGroupTitles = [];
        this.improvementData = [];

        this.dataGrid.instance.beginCustomLoading('Loading..');
        this.loadData();
      });
    this.loadData();
  }

  loadData() {
  setTimeout(() => {
    this.dataGrid.instance.beginCustomLoading('Loading..');
  }, 0);


  this.improvementReportData$ = this.myActionsReportingService.getImprovementsReportData()
    .subscribe((result: any[]) => {
      this.improvementData = result;

      if(this.improvementData.length) {
      this.dataGrid.instance.deleteColumn('Progress')
      this.dataGrid.instance.deleteColumn('Status');
      this.dataGrid.instance.addColumn({
        dataField: "Progress",
        dataType: "number",
        cellTemplate: 'progressTemplate',
        headerCellTemplate: "statusHeaderTemplate",
        width: '50'
      });
      this.dataGrid.instance.addColumn({
        dataField: "Status",
        dataType: "number",
        cellTemplate: 'statusTemplate',
        headerCellTemplate: "titleHeaderTemplate",
        width: '130'
      });
      }
      this.dataGrid.instance.endCustomLoading()
    },
      error => {console.log(error)
      this.userService.showUserNotification(error.error.Message, 'error');
      this.dataGrid.instance.endCustomLoading()
    })
}
  getCellColor(cellData: number): string {
    if (cellData < 0) {
      return '#DB253F';
    }
    if (cellData === 0) {
      return '#989898';
    }
    if (cellData === 1) {
      return '#5fc874';
    }
    if (cellData === 2) {
      return '#fa9c3a';
    }
    if (cellData === 4) {
      return '#5fc874';
    }
  }

    getStatusCellColor(cellData) {
      if (cellData === 0) {
        return '#dc263f';
      }

      if (cellData > 0 && cellData < 100) {
        return '#fa9c3a';
      }
      if (cellData >= 100) {
        return '#5fc874';
      }
    }

  ngOnDestroy() {
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
    if (this.improvementReportData$) {
      this.improvementReportData$.unsubscribe();
    }
    if (this.questionGroupTitles$) {
      this.questionGroupTitles$.unsubscribe();
    }
  }
}
