import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PriorCharacteristic, MyActionsPrioritiseService, TopPriorCharacteristic} from "./prioritise.service";
import {ReportingService} from "../../../shared/services/reporting.service";

import {UserService} from "../../../shared/services/user.service";
import {HomeService} from "../../home.service";
import {forkJoin, Subscription} from "rxjs/index";
import {switchMap} from "rxjs/operators";
import {UnitInfo} from "../../../shared/models/unit.model";
import {UnitService} from "../../../shared/services/unit.service";
import {AssessmentCaptureFullService} from "../../assessment/assessment-capture-full/assessment-capture-full.service";
import {AssessmentCaptureLightService} from "../../assessment/assessment-capture-light/assessment-capture-light.service";
import {IndicatorReportingService} from "../../performance-indicators/indicator-reporting/indicator-reporting.service";


@Component({
  selector: 'bluenorth-prioritise',
  templateUrl: './prioritise.component.html',
  styleUrls: ['./prioritise.component.scss']
})
export class MyActionsPrioritiseComponent implements OnInit, OnDestroy {

  @ViewChild('dxSelectBox') public dxSelectBox;
  @ViewChild('dxSelectBox2') public dxSelectBox2;

  @ViewChild('dataGrid') public dataGrid;

  public priorCharacteristicsByPrincipleGroup: PriorCharacteristic[] = [];
  public topPriorByPrincipleGroup: any[] = [];
  public principleGroupsList: TopPriorCharacteristic[] = [];
  public selectedFilterItem = 0;
  public selectedCharacteristic: TopPriorCharacteristic;
  public isSelectedCharacteristic = false;
  public riskStatement: any;
  public isPopupVisibleRisk: number;
  public charStatement: any = {};
  public isPopupVisibleChar: number;
  public currentPrincipleGroupSelector = 0;
  public currentPrincipleSelector = 0;
  public popoverHeaderVisible: number;
  public popoverHeaderVisible4 =false;
  public popoverHeaderVisible5 =false;
  public popoverHeaderVisible6 =false;
  private prinsipleGroupList$: any;
  private setPriorCharacteristicOrder$: any;
  private dataFromUnitSelectorSubscription$: Subscription;
  public showRiskPopover: boolean = false;
  public principleList: any[] = [];
  public isPopupVisible: boolean = false;
  public indicatorFormula: string;
  public indicatorFormulaAxis: string;
  public indicatorData: any;
  public graphData: any = {};
  public popupFirstTableData: any[] = [];
  public popupSecondTableData: any[] = [];

  constructor(private indicatorReportingService: IndicatorReportingService,
              private prioritiseService: MyActionsPrioritiseService,
              private userService: UserService,
              private unitService: UnitService,
              private reportingService: ReportingService,
              private homeService: HomeService,
              private assessmentCaptureFullService: AssessmentCaptureFullService,
              private assessmentCaptureLightService: AssessmentCaptureLightService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(0, () => {

    });
    let assessmentType;
    return this.userService.getUserInfo().pipe(
      switchMap(user => {
        if (user.body['CurrentUnitId']) {

          let userId = user.body['CurrentUnitId'];
          return this.unitService.getUnitById(userId)
        }
      })
    ).subscribe((unit: UnitInfo) => {
      this.dataGrid.instance.beginCustomLoading('Loading..');
      let fullListPrinciples;
      let fullListPrinciplesGroups;
      let topPriorByPrinceplesGroup;
      assessmentType = unit.AssessmentType;
      unit.AssessmentType === 0 ?
        fullListPrinciples = this.assessmentCaptureFullService.getGetFullListPrinciples()
        : fullListPrinciples = this.assessmentCaptureLightService.getPrinciples();

      fullListPrinciplesGroups =this.reportingService.getPrincipleGroupsForSelector();

      topPriorByPrinceplesGroup = this.prioritiseService.getTopPriorByPrincipleGroup(0);

      forkJoin(fullListPrinciples, fullListPrinciplesGroups, topPriorByPrinceplesGroup)
        .subscribe((result: any) => {
          result[0].unshift({
            OID: 0,
            ShortTitle: 'Principle'
          });
          result[1].unshift({
            OID: 0,
            Title: 'Management Focus Area'
          });
          this.principleList = result[0];
          this.principleGroupsList = result[1];
          this.topPriorByPrincipleGroup = result[2];
        }, error1 => {
          this.userService.showUserNotification(error1.error.Message, 'error');
          this.dataGrid.instance.endCustomLoading();
        });
    });

  }

  changeFilter(event, type) {
    this.dataGrid.instance.beginCustomLoading('Loading..');
    if(type === 'principle') {
      this.currentPrincipleSelector = event.selectedItem.OID;
    }
    if (type === 'principleGroup') {
      this.currentPrincipleGroupSelector = event.selectedItem.OID;
    }
    this.prioritiseService.getPriorByPrincipleAndGroup({
      "principleGroupOid" : this.currentPrincipleGroupSelector, "principleOid" : this.currentPrincipleSelector
    }).subscribe(result => {
      this.priorCharacteristicsByPrincipleGroup = result.body;
    }, (error1 => {
      this.dataGrid.instance.endCustomLoading();
      this.userService.showUserNotification(error1.error.Message, 'error');
    }), () => {
      this.dataGrid.instance.endCustomLoading();
    })
  }

  resetFilters() {
    this.dxSelectBox.value = 0;
    this.dxSelectBox2.value = 0;
  }

  changeCharacteristicPrior(event, data) {

    if (!event.value) {
      this.prioritiseService.removePriorCharacteristic(data.data.OID)
        .subscribe(response => {
          data.data.IsPrior = false;
          this.topPriorByPrincipleGroup = this.topPriorByPrincipleGroup.filter(item => item.OID !== data.data.OID);
        });
    }
    if (event.value) {
      this.prioritiseService.addPriorCharacteristic(data.data.OID)
        .subscribe(response => {
          data.data.IsPrior = true;
          this.topPriorByPrincipleGroup = [];
          this.prioritiseService.getTopPriorByPrincipleGroup(this.currentPrincipleGroupSelector)
            .subscribe((topPriorByPrincipleGroup: TopPriorCharacteristic[]) => {
              this.topPriorByPrincipleGroup = topPriorByPrincipleGroup;
            })
        });
    }
  }

  setClickableCharacteristic(characteristic, index) {
    this.selectedCharacteristic = characteristic;
    this.isSelectedCharacteristic = true;
  }

  moveTop() {
    if (this.isSelectedCharacteristic) {
      if (this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic) > 0) {
        let index = this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic);
        let current = this.topPriorByPrincipleGroup[index];
        let newOrder = this.topPriorByPrincipleGroup[index - 1].Order;
        this.topPriorByPrincipleGroup[index] = this.topPriorByPrincipleGroup[index - 1];
        this.topPriorByPrincipleGroup[index - 1] = current;
        this.selectedCharacteristic = this.topPriorByPrincipleGroup[index - 1];
        let order = {
          OID: this.selectedCharacteristic.OID,
          Order: newOrder
        }
        this.setPriorCharacteristicOrder$ = this.prioritiseService.setPriorCharacteristicOrder(order)
          .subscribe(response => {
          })
      }
    }
  }

  moveDown() {
    if (this.isSelectedCharacteristic) {
      if (this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic) < this.topPriorByPrincipleGroup.length - 1) {
        let index = this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic);

        let current = this.topPriorByPrincipleGroup[index];
        let newOrder = this.topPriorByPrincipleGroup[index + 1].Order;

        this.topPriorByPrincipleGroup[index] = this.topPriorByPrincipleGroup[index + 1];
        this.topPriorByPrincipleGroup[index + 1] = current;
        this.selectedCharacteristic = this.topPriorByPrincipleGroup[index + 1]

        let order = {
          OID: this.selectedCharacteristic.OID,
          Order: newOrder
        };

        this.prioritiseService.setPriorCharacteristicOrder(order)
          .subscribe(response => {

          })
      }
    }
  }

  toggleCharPopup(index, statement, title) {
    if (index !== null) {
      setTimeout(() => {
        this.charStatement.statement = statement;
        this.charStatement.title = title;
        this.isPopupVisibleChar = index;
      }, 50);
    } else {
      this.isPopupVisibleChar = -1;
    }
  }

  toggleRiskPopup(index, statement) {
    if (index !== null) {
      this.riskStatement = statement.split('\n');
      this.isPopupVisibleRisk = index;
    } else {
      this.isPopupVisibleRisk = -1;
    }
  }

  bulletColor(data) {
    if (data <= 21) return '#F55D62';
    if (data > 21 && data <= 31) return '#F8876B';
    if (data > 31 && data <= 47) return '#FBB475';
    if (data > 47 && data <= 62) return '#FFE681';
    if (data > 62 && data <= 70) return '#DBDD7F';
    if (data > 70 && data <= 81) return '#B8D37C';
    if (data > 81 && data <= 89) return '#98C779';
    if (data > 89 && data <= 94) return '#79BD76';
    if (data > 94 && data <= 100) return '#5BB474';
  }

  togglePopover(columnIndex){
      this.popoverHeaderVisible = columnIndex;
  }

  roundedValue(data) {
   return Math.round(data)
  }

  getScoreChartValue(data) {
    if (data.IndicatorScore > 50) {
      return 50;
    }
    if (data.IndicatorScore < -50) {
      return -50;
    }
    if (data.IndicatorScore === -25 && data.IndicatorScore.TrendDictionary) {
      if(data.IndicatorScore.TrendDictionary[0].Value='NaN') {
        return data.IndicatorScore;
      }
    }

    return data.IndicatorScore;
  }

  getCharacteristicPopup(data) {

    setTimeout( () => {
      this.dataGrid.instance.beginCustomLoading('Loading..');
    }, 0);
    this.indicatorReportingService.getIndicatorData(data.data.IndicatorOID).subscribe((response) => {
        this.indicatorData = response;
      },
      (error1) => {
        this.dataGrid.instance.endCustomLoading();
        this.userService.showUserNotification(error1.error.Message, 'error');
      },
      () => {
        setTimeout(() => {
          this.isPopupVisible = true;
        },0);
        if (this.indicatorData.Results != null && this.indicatorData.Results.length > 0) {
          this.indicatorData.Results = this.indicatorData.Results.map(el => {
            return el.map(innerEl => {
              if(innerEl === 'NaN') {
                return 'N/A';
              } else {
                return innerEl;
              }
            })
          });
          this.graphData.Period = this.indicatorData.Results[0].slice(2);
          this.graphData.Value = this.indicatorData.Results[1].slice(2);
          this.graphData = this.indicatorData.Results[0].map((item, index) => {
            if (index != 0 && index != 1) {
              return {
                Period: this.indicatorData.Results[0][index],
                Value: +this.indicatorData.Results[1][index]
              }
            }
          });

          this.popupFirstTableData[0] = this.indicatorData.Results[0];
          this.indicatorData.Results.forEach((row, index) => {
            if  (index != 0) {
              this.popupFirstTableData[index] = [];
              this.popupFirstTableData[index] = this.formatNumberArray(this.indicatorData.Results[index])
            }
          });
        }

        this.indicatorFormulaAxis = this.indicatorData.Relevance;
        if (this.indicatorFormulaAxis.length < 42) {
          this.indicatorFormulaAxis += "      .";
        }
        this.dataGrid.instance.endCustomLoading();

        if (this.indicatorData.PrimaryData && this.indicatorData.PrimaryData[0]) {
          this.popupSecondTableData[0] = this.indicatorData.PrimaryData[0];
          this.indicatorData.PrimaryData.forEach((row, index) => {
            if  (index != 0) {
              this.popupSecondTableData[index] = [];
              this.popupSecondTableData[index] = this.formatNumberArray(this.indicatorData.PrimaryData[index])
            }
          });
        }
      });
  }

  private formatNumberArray(arr) {
    let parsedArray = [];
    arr.forEach(num => {
      parsedArray.push(Number(num) ? new Intl.NumberFormat('en-us', {maximumFractionDigits: this.isInt(num) ? 0 : 2}).format(num) : num);
    });
    return parsedArray;
  }

  private isInt(number) {
    return Number(number) % 1 === 0;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  customizeTooltipText(data) {
    data.valueText = ['Actual Value:', data.value + '%'];
    return data;
  }

  isTrendDictionaryNaN(data) {
    return data.data.IndicatorScore === -25 && data.data.IsHashedRed;
  }

  ngOnDestroy() {
    if (this.prinsipleGroupList$) {
      this.prinsipleGroupList$.unsubscribe();
    }
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
  }
}
