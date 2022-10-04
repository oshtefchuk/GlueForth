import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HomeService} from "../../home.service";
import {UserService} from "../../../shared/services/user.service";
import {IndicatorDataSet} from "../../../shared/models/indicatorDataSet.model";
import {DxDataGridComponent, DxFormComponent, DxSelectBoxComponent} from "devextreme-angular";
import {StandardsService} from "../../standards/standards.service";
import {SpaDataSetState} from "../../../shared/models/spaDataSet.model";
import {IndicatorDataSetValueService} from "../indicator-data-set-value/indicator-data-set-value.service";
import {ReportingService} from '../../../shared/services/reporting.service';
import {DashboardService} from '../../dashboard/dashboard.service';


@Component({
  selector: 'bluenorth-indicator-data-set',
  templateUrl: './indicator-data-set.component.html',
  styleUrls: ['./indicator-data-set.component.scss']
})
export class IndicatorDataSetComponent implements OnInit {

  indicatorList = [];
  currentStandardId: any;
  currentUnitId: string;
  isCreateDataSetPopupVisible = false;
  newDataSet: IndicatorDataSet;
  public loadingVisible = false;
  public yearArray = [];
  public monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  @ViewChild("progressBar")
  public progressBar: ElementRef;

  @ViewChild("periodFromYearSelector")
  public periodFromYearSelector: DxSelectBoxComponent;

  @ViewChild("periodToYearSelector")
  public periodToYearSelector: DxSelectBoxComponent;

  @ViewChild("periodToMonthSelector")
  public periodToMonthSelector: DxSelectBoxComponent;

  @ViewChild("periodFromMonthSelector")
  public periodFromMonthSelector: DxSelectBoxComponent;

  @ViewChild("dxForm")
  public dxForm: DxFormComponent;

  @ViewChild("createDataSetForm")
  public createDataSetForm: DxFormComponent;

  @ViewChild("dxDataGridComponent")
  public dataGrid: DxDataGridComponent;

  categories = []
  sales = [];
  SpaDataSetState: typeof SpaDataSetState = SpaDataSetState;
  currentCategory;
  isLoaded = false;
  public maxPeriodByUnitFrom;

  constructor(private standardsService: StandardsService,
              private homeService: HomeService,
              private userService: UserService,
              private indicatorDataSetValueService: IndicatorDataSetValueService,
              private router: Router,
              private route: ActivatedRoute,
              private reportingService: ReportingService,
              private dashboardService: DashboardService) {

    this.newDataSet = this.standardsService.getNewDataSet();
   }

  ngOnInit() {
   this.userService.getUserInfo()
      .subscribe(userLight => {
          this.loadingVisible = true;
          this.currentUnitId = userLight.body['CurrentUnitId'];
          this.getCategories();
       },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
  }

  setCategory(event) {
    this.isLoaded = false;
    if (event.selectedItem) {
      if (event.selectedItem.OID === -1) {
        this.dashboardService.getIndicatorsDataSetsOverAllProgress().subscribe((resp) => {
          let years = Object.keys(resp);
          this.sales = [];
          for (let i = 0; i < years.length; i++) {
          //  console.log({year : years[i], sales: resp[years[i]]});
            this.sales.push({year : years[i], sales: resp[years[i]]});
          }
          this.isLoaded = true;
        });
      } else {
        this.dashboardService.getIndicatorsDataSetProgressByCategoryOid(event.selectedItem.OID).subscribe(resp => {
          let years = Object.keys(resp);
          this.sales = [];
          for (let i = 0; i < years.length; i++) {
            this.sales.push({year : years[i], sales: resp[years[i]]});
          }
          this.isLoaded = true;
        })
      }

    }
  }

  navigateToPerfomanceIndicatorsCapture() {
    this.router.navigate(['/performance-indicators-capture']);
  }


  getMaxPeriodByUnit(currentUnitId) {
    this.indicatorDataSetValueService.getMaxPeriodByUnit(currentUnitId)
      .subscribe(period => {
          this.maxPeriodByUnitFrom = period;
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
  }

  /*getIndicatorDataSetList() {
    this.indicatorDataSetValueService.getIndicatorDataSetList()
      .subscribe((indicatorList: any) => {
          this.indicatorList = indicatorList;
          console.log('indicatorList', indicatorList);
          this.loadingVisible = false;

        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        })
  }*/


  getCategories() {
    this.reportingService.getPrincipleGroups().subscribe((resp:any[]) => {
      this.categories = resp;
      this.categories.unshift({Title: 'Overall', OID: -1});
      this.currentCategory = this.categories[0];
    });



    //console.log(this.standardsList);
  }

/*
  showFormPopup() {
    this.isCreateDataSetPopupVisible = true;
    console.log('form', this.dxForm)
  }

  dateFormatting(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    return month + '-' + day + '-' + year;
  }

  generateYearsArray() {
    let date = new Date();
    let year = date.getFullYear();
    let yearArray = [];
    for (let i = 2000; i <= year; i++) {
      yearArray.push(i);
    }
    this.yearArray = yearArray;
   }

  onFormSubmitCreateDataSet(e) {
    console.log('onFormSubmitCreateDataSet', e);
    this.newDataSet.Unit = this.currentUnitId;
    this.newDataSet.PeriodFromMonth = this.periodFromMonthSelector.value;
    this.newDataSet.PeriodFromYear = this.periodFromYearSelector.value;
    this.newDataSet.PeriodToMonth = this.periodToMonthSelector.value;
    this.newDataSet.PeriodToYear = this.periodToYearSelector.value;
    console.log('this.newDataSet', this.newDataSet);
    this.indicatorDataSetValueService.addNewIndicatorDataSet(this.newDataSet)
      .subscribe(dataset => {
          this.dataGrid.instance.beginCustomLoading('Loading..');
          //this.indicatorList.push(dataset);
          this.indicatorList = [];
          this.getIndicatorDataSetList();
          this.getMaxPeriodByUnit(this.currentUnitId);
          console.log('dataset', dataset);
          this.userService.showUserNotification('DATA SET WAS CREATED', 'success');
          this.createDataSetForm.instance.resetValues();
          this.isCreateDataSetPopupVisible = false;
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    e.preventDefault();
  }

  redirectToIndicatorValues(e) {
    console.log('CurrentDataSet', e);
    this.router.navigate([`standards-management/${e.data.Standard}/${e.data.OID}`]);
  }

  showChangesFromYear(e){
    console.log("PeriodFromYear", this.periodFromYearSelector.selectedItem);
    console.log("PeriodFrom", this.periodFromYearSelector.value);
    if(this.periodFromYearSelector.selectedItem === this.yearArray[this.yearArray.length-1]){
      this.periodFromYearSelector.value = this.yearArray[this.yearArray.length-2];
      this.periodToYearSelector.value = this.yearArray[this.yearArray.length-1];
    }
    this.periodToYearSelector.value = this.periodFromYearSelector.selectedItem +1;
  }

  showChangesToYear(e){
    console.log("PeriodTo", this.periodToYearSelector.selectedItem);
    console.log("PeriodTo", this.periodToYearSelector.value);
    if(this.periodToYearSelector.selectedItem === this.yearArray[0]){
      this.periodToYearSelector.value = this.yearArray[1];
      this.periodFromYearSelector.value = this.yearArray[0];
    }
    if (this.periodToYearSelector.selectedItem <= this.periodFromYearSelector.value) {
      this.periodFromYearSelector.value = this.periodToYearSelector.selectedItem - 1;
    }
  }

  showChangesFromMonth(event) {
   console.log('showChangesFromMonth1', event)
   console.log('showChangesFromMonth2', this.periodFromMonthSelector.selectedItem)
  }
  showChangesToMonth(event) {
    console.log('showChangesToMonth1', this.periodToMonthSelector.value)
  }

  calculatePeriodFrom(data) {
    return [data.PeriodFromMonth < 10 ? '0' + data.PeriodFromMonth : data.PeriodFromMonth, data.PeriodFromYear].join("-");
  }
  calculatePeriodTo(data) {
    return [data.PeriodToMonth < 10 ? '0' + data.PeriodToMonth : data.PeriodToMonth, data.PeriodToYear].join("-");
  }*/
}
