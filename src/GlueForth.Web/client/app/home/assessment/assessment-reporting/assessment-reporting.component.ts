import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AssessmentReportingService} from "./assessment-reporting.service";
import {UnitInfo} from "../../../shared/models/unit.model";
import {UserService} from "../../../shared/services/user.service";
import {UnitService} from "../../../shared/services/unit.service";
import {AssessmentCaptureFullService} from "../assessment-capture-full/assessment-capture-full.service";
import {AssessmentCaptureLightService} from "../assessment-capture-light/assessment-capture-light.service";
import {Dimension} from "../../../shared/models/dimension.model";

import {AssessmentStateService} from "../assessment-state/assessment-state.service";
import {HomeService} from "../../home.service";
import {RegistrationSettingsService} from "../../../authentification/registration-settings/registration-settings.service";
import {DxBarGaugeComponent} from "devextreme-angular";
import {ReportingService} from "../../../shared/services/reporting.service";
import {forkJoin, Subscription} from "rxjs";


export interface SpiderData {
  Name: string;
  Value: number;
  Group?: string;
}

@Component({
  selector: 'bluenorth-assessment-reporting',
  templateUrl: './assessment-reporting.component.html',
  styleUrls: ['./assessment-reporting.component.scss']
})
export class AssessmentReportingComponent implements OnInit, OnDestroy {

  @ViewChild('gauge') public gauge: DxBarGaugeComponent;

  @ViewChild('navigation') public navigation: ElementRef;

  public dataSourseForDimensionSpider: SpiderData[] = [];
  public dataSourseForPrincipleSpider: SpiderData[] = [];
  public characteristicsBarChartDataSource: SpiderData[] = [];
  public dimentionsList: Dimension[] = [];
  public principleGroupList: any[] = [];
  public principleList: any[] = [];
  public dimensionsObservable: any;
  public principleGroupObservable: any;
  public principlesObservable: any;
  public dataSources: any = [];
  public dataSourcesByPrinciplesGroup: any[] = [];
  public colors = [];
  public dimensionsValues = [];
  public principlesValues = [];
  public loadingVisible = true;
  public loadingVisibleRanked = false;
  public isActive: number;
  public isNavFixed = false;
  public isDemensionsPopupVisible = -1;
  public isPrinciplesPopupVisible = -1;

  public colorsArr1 = ['#5fafd4', '#cd8684', '#74c938'];
  public colorsArr = [];
  public principlesColor= ['#aae6ff','#65c0ec' ,'#5fafd4' , '#387a94' ,'#fcbfc6','#cd8684','#74c938','#508928'];
  //public principlesColor2= ['#aae6ff','#65c0ec' ,'#5fafd4' , '#387a94' ,'#fcbfc6','#cd8684','#74c938','#508928'].reverse();
  public principlesColor2= [];
  public dimensionsColor= [];
  public guidanceShow = false;
  public guidanceText;
  public guidanceTitle;
  private dataFromUnitSelectorSubscription$: Subscription;
  private datasourseFoSpider$: Subscription;
  private dimensionSpiderData$: Subscription;
  private datasoursesForDimensionsPrincipleGroupPrinciples$: Subscription;
  private characteristicsBarChartGroupedByDimension$: Subscription;
  private dataSpiderByDimension$: Subscription;
  private data$: Subscription;
  private dimensionsPrincipleGroupsPrinciples$: Subscription;
  self: any;
  private currentUnitId: any;
  public heigth: any = '800px';
  public isCurrentSPACompleted: boolean;

  constructor(private assessmentReportingService: AssessmentReportingService,
              private userService: UserService,
              private unitService: UnitService,
              private assessmentCaptureFullService: AssessmentCaptureFullService,
              private assessmentCaptureLightService: AssessmentCaptureLightService,
              private homeService: HomeService,
              private registrationSettingsService: RegistrationSettingsService,
              private reportingService: ReportingService,
              private assessmentStateService: AssessmentStateService) {
    this.self = this;
    this.customizeGauge1Tooltip = this.customizeGauge1Tooltip.bind(this);
    this.customizeGauge2Tooltip = this.customizeGauge2Tooltip.bind(this);
    this.customizeSeriesByGroup1 = this.customizeSeriesByGroup1.bind(this);
    this.customizeSpiderTooltip =  this.customizeSpiderTooltip.bind(this);
    this.togglePrinciplePopup = this.togglePrinciplePopup.bind(this);
    this.toggleDimPopup = this.toggleDimPopup.bind(this);
    this.tooltipShow = this.tooltipShow.bind(this);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
     const scrollPosition = window.pageYOffset
      if (scrollPosition > 110) {
      this.isNavFixed = true;
      } else {
        this.isNavFixed = false;
      }
  }

  ngOnInit() {
    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(item => {
        this.dimensionsValues = [];
        this.principlesValues = [];
        this.dataSources = [];
        this.dataSourcesByPrinciplesGroup = [];
        this.characteristicsBarChartDataSource = [];
        this.loadingVisible = true;
        if (item.AssessmentType === (null || -1)) {
          item.AssessmentType = 0;
          this.registrationSettingsService.addOrUpdateUnit(item)
            .subscribe(unit => {
              this.loadData(item);
            })
        } else {
          this.loadData(item);
        }
      });
        return this.unitService.getUnitById(this.userService.currentUser['CurrentUnitId'])
        .subscribe((unit: UnitInfo) => {
          this.currentUnitId = unit.Oid;
          this.loadData(unit);
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        })
  }

  public loadData(unit) {
    this.assessmentReportingService.isCurrentSpaCompleted().subscribe(response => {
      if(response.toString() === 'false') {
        this.isCurrentSPACompleted = false;
      } else {
        this.isCurrentSPACompleted = true;
      }
      /*this.isCurrentSPACompleted = response;*/
    });
    this.dimensionSpiderData$ = this.assessmentReportingService.getDimensionSpiderData()
      .subscribe((data: SpiderData[]) => {
          this.dataSourseForDimensionSpider = data.reverse();
          this.getValuesForDimensions(this.dataSourseForDimensionSpider);
          this.getColorsForDimensions(this.dataSourseForDimensionSpider);
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        });

    let dataSourseForPrincipleSpider$ = this.assessmentReportingService.getPrincipleSpiderData();
    let characteristicsBarChartDataSource$ = this.assessmentReportingService.getCharacteristicsBarChartData()
    this.datasourseFoSpider$ = forkJoin(dataSourseForPrincipleSpider$, characteristicsBarChartDataSource$)
      .subscribe((results: any) => {
          this.dataSourseForPrincipleSpider = results[0].reverse();
          let datasoursePrinciple = Object.assign([], this.dataSourseForPrincipleSpider);
          this.getValuesForPrinciples(datasoursePrinciple);
          this.getColorsForPrinciple(datasoursePrinciple);
          this.characteristicsBarChartDataSource = results[1].reverse();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        });

    if (unit.AssessmentType === 0) {
      this.dimensionsObservable = this.assessmentReportingService.getDimensionsForLegend();
      this.principleGroupObservable = this.assessmentStateService.getFullListByPrincipleGroups();
      this.principlesObservable = this.assessmentReportingService.getPrinciplesForLegend();
      this.datasoursesForDimensionsPrincipleGroupPrinciples$ = forkJoin([this.dimensionsObservable, this.principleGroupObservable, this.principlesObservable])
        .subscribe((results: any) => {
            this.dimentionsList = results[0].reverse();
            this.principleGroupList = results[1];
            this.principleList =results[2].reverse();
            this.getArrayOfCharacteristicsByDimension(this.dimentionsList);
            this.getArrayOfCharacteristicsByPrinciplesGroup(this.principleGroupList);
            this.loadingVisible = false;
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error')
            this.loadingVisible = false;
          });
    }
    if (unit.AssessmentType === 1) {
      let dimensionsObservable = this.assessmentReportingService.getDimensionsForLegend();
      let principleGroupObservable = this.assessmentStateService.getLiteListByPrincipleGroups();
      let principlesObservable = this.assessmentReportingService.getPrinciplesForLegend();
      this.dimensionsPrincipleGroupsPrinciples$ = forkJoin([dimensionsObservable, principleGroupObservable, principlesObservable])
        .subscribe((results: any) => {
            this.dimentionsList = results[0].reverse();
            this.principleGroupList = results[1];
            this.principleList = results[2].reverse();
            this.getArrayOfCharacteristicsByDimension(this.dimentionsList);
            this.getArrayOfCharacteristicsByPrinciplesGroup(this.principleGroupList);
            this.loadingVisible = false;
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error')
            this.loadingVisible = false;
          });
    }

  }

  customizeSeriesByGroup1 = (series: any) => {
    for (let i = 0; i < this.self.characteristicsBarChartDataSource.length; i++) {
      if (series.index == i && this.self.characteristicsBarChartDataSource[i].Group.includes('Soc')) {
        return {color: '#D49290'}
      }
      if (series.index == i && this.self.characteristicsBarChartDataSource[i].Group.includes('Eco')) {
        return {color: '#6AB8D9'}
      }
      if (series.index == i && this.self.characteristicsBarChartDataSource[i].Group.includes('Env')) {
        return {color: '#7FD03E'}
      }
    }
  }

  tooltipShow(event) {
     let arr = this.self.characteristicsBarChartDataSource
      .filter(item => {
     return item.Name === event.argument;
    });
    this.guidanceShow = true;
    this.guidanceText = arr[0].Guidance;
    this.guidanceTitle = arr[0].Name
  }

  customizeSpiderTooltip(arg) {
    let value = arg.argumentText + ": " + Math.floor(arg.value) + "%"
    return {
      text: value
    }
  }

  customizeGauge1Tooltip(arg) {
    let tooltip = this.self.dataSourseForDimensionSpider[arg.index].Name + ":  " + Math.floor(arg.value) + "%";
    return {
      text: tooltip
    }
  }

  customizeGauge2Tooltip(arg) {
    let tooltip = this.self.dataSourseForPrincipleSpider[arg.index].Name + ":  " + Math.floor(arg.value) + "%";
    return {
      text: tooltip
    }
  }

  getValuesForDimensions(graphArr) {
    let dimArr = [];
    graphArr.map(item => {
      dimArr.push(item.Value)
    });
    this.dimensionsValues = dimArr;
  }

  getValuesForPrinciples(graphArr) {
    let dimArr = [];
    graphArr.map(item => {
      dimArr.push(item.Value)
    });
    this.principlesValues = dimArr;
  }
  getColorsForPrinciple(graphArr) {
    graphArr.map(item => {
     this.principlesColor2.push(this.getHexColor(item.Color))
    })
  }
  getColorsForDimensions(graphArr) {
    graphArr.map(item => {
     this.dimensionsColor.push(this.getHexColor(item.Color))
    })
  }

  getHexColor(number) {
    return "#" + ((number) >>> 0).toString(16).slice(-6);
  }

  customizeCharacteristicBarChartLabel = (arg: any) => {
    return {
      backgroundColor: "none",
      font: {color: '#fff'},
      position: 'inside',
      alignment: 'Right',
    }
  }

  getArrayOfCharacteristicsByDimension(dimensions) {
    let data = [];
    for (let i = 0; i < this.dimentionsList.length; i++) {
      data.push(this.assessmentReportingService.getCharacteristicSpiderByDimension(dimensions[i].OID));
    }
    this.dataSpiderByDimension$ = forkJoin(data).subscribe(data => {
      for (let i = 0; i < this.dimentionsList.length; i++) {
        this.dataSources.push({title: this.dimentionsList[i].ShortTitle, data: data[i], color: this.getHexColor(this.dimentionsList[i].Color)})
        this.colorsArr.push(this.getHexColor(data[i].Color));
      }
      this.dataSources = this.dataSources.reverse();
    });
  }

  getArrayOfCharacteristicsByPrinciplesGroup(principleGroup) {
    let data = [];
    for (let i = 0; i < this.principleGroupList.length; i++) {
      data.push(this.assessmentReportingService.getCharacteristicSpiderByPrincipleGroup(principleGroup[i].OID));
    }
   this.data$ = forkJoin(data).subscribe(data => {
      for (let i = 0; i < this.principleGroupList.length; i++) {
        this.dataSourcesByPrinciplesGroup.push({title: this.principleGroupList[i].Title, data: data[i], color: this.getHexColor(this.principleGroupList[i].Color)})
      }
    });
  }


  compareNumbersLowToHigh(a, b) {
    return b.Value - a.Value;
  }

  compareNumbersHighToLow(a, b) {
    return a.Value - b.Value;
  }

  compareByDimension(a, b) {
    if (a.Name > b.Name) {
      return 1
    }
    if (!(a.Name - b.Name)) {
      return -1
    }
  }

  getSortedValues(event) {
    this.colors = [];

    if (event.selectedItem === 'Low To High') {
      this.characteristicsBarChartDataSource = this.characteristicsBarChartDataSource.sort(this.compareNumbersLowToHigh);
    }
    if (event.selectedItem === 'High To Low') {
      this.characteristicsBarChartDataSource = this.characteristicsBarChartDataSource.sort(this.compareNumbersHighToLow);
    }
    if (event.selectedItem === 'Dimension') {
      this.loadingVisibleRanked = true;
      this.characteristicsBarChartDataSource = [];
    this.characteristicsBarChartGroupedByDimension$ = this.assessmentReportingService.getCharacteristicsBarChartGroupedByDimension()
        .subscribe((dataSource: SpiderData[]) => {
          this.characteristicsBarChartDataSource = dataSource;
          this.loadingVisibleRanked = false;
        })
    }
    if (event.selectedItem === 'Dimension High To Low') {
      this.loadingVisibleRanked = true;
      this.characteristicsBarChartDataSource = [];
      this.characteristicsBarChartGroupedByDimension$ = this.assessmentReportingService.getCharacteristicsBarChartGroupedByDimensionHighToLow()
        .subscribe((dataSource: SpiderData[]) => {
          this.characteristicsBarChartDataSource = dataSource;
          this.loadingVisibleRanked = false;
        })
    }
  }

  customizePoint = (arg: any) => {
    for (let i = 0; i < this.dimentionsList.length; i++) {
      if (arg.argument === this.dimentionsList[i].ShortTitle) {
        return {color: `${this.colorsArr[i]}`}
      }
    }

  };

  spiderText = (arg: any) => {
    return '';
  }

  barChartText(info) {
    return `${Math.floor(info.value)}%`
  }


  customizeValueLabel(info){
    return `${info.value}%`
  }

  togglePrinciplePopup(index) {
  this.isPrinciplesPopupVisible = index;
 }

  toggleDimPopup(index) {
    this.isDemensionsPopupVisible = index;
  }

  recalcData() {
    this.assessmentReportingService.recalcCharacteristicUnitScores(this.currentUnitId).subscribe();
  }

  ngOnDestroy() {
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
    if (this.dimensionSpiderData$) {
      this.dimensionSpiderData$.unsubscribe();
    }
  }
}
