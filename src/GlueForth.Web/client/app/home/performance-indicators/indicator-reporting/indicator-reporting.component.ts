import { Component, OnInit, ViewChild } from '@angular/core';
import { IndicatorReportingService} from './indicator-reporting.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { UnitInfo } from '../../../shared/models/unit.model';
import { UserService } from '../../../shared/services/user.service';
import { UnitService } from '../../../shared/services/unit.service';
import { AssessmentCaptureFullService } from '../../assessment/assessment-capture-full/assessment-capture-full.service';
import { AssessmentCaptureLightService } from '../../assessment/assessment-capture-light/assessment-capture-light.service';
import { AssessmentStateService } from '../../assessment/assessment-state/assessment-state.service';

import { Dimension } from '../../../shared/models/dimension.model';
import { switchMap } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs/index';

export interface QueryParams {
  DimensionOid?: number;
  PrincipleGroupOid?: number;
  PrincipleOid?: number;
}

@Component({
  selector: 'bluenorth-indicator-reporting',
  templateUrl: './indicator-reporting.component.html',
  styleUrls: ['./indicator-reporting.component.scss']
})
export class IndicatorReportingComponent implements OnInit {

  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;

  public reportingDataSource: any[] = [];
  public dimentionsList: Dimension[] = [];
  public principleList: any[] = [];
  public principleGroups: any[] = [];
  public queryParams: QueryParams = {};
  public indicatorData: any;
  public graphData: any = {};
  public indicatorFormula: string;
  public indicatorFormulaAxis: string;
  public isPopoverVisible: number;
  public characteristicSummary: string;
  public popupFirstTableData: any[] = [];
  public popupSecondTableData: any[] = [];

  public isPopupVisible: boolean = false;

  public statuses = [
    {
      color: '#5fc874',
      description: 'Degree of Strengthening'
    },
    {
      color: '#DB253F',
      description: 'Degree of Weakening'
    },

    {
      color: '#DB253F',
      description: 'No Data'
    }
  ];

  constructor(private indicatorReportingService: IndicatorReportingService,
              private userService: UserService,
              private unitService: UnitService,
              private assessmentCaptureFullService: AssessmentCaptureFullService,
              private assessmentCaptureLightService: AssessmentCaptureLightService,
              private assessmentStateService: AssessmentStateService) { }

  ngOnInit() {
    let assessmentType;
    let fullListDimentions;
    let fullListPrinciples;
    let fullListPrinciplesGroups;
    return this.userService.getUserInfo().pipe(
      switchMap(user => {
        if (user.body['CurrentUnitId']) {

          let userId = user.body['CurrentUnitId'];
          return this.unitService.getUnitById(userId)
        }
      })
    ).subscribe((unit: UnitInfo) => {
        assessmentType = unit.AssessmentType;

          if (assessmentType === 0) {
          fullListDimentions = this.assessmentCaptureFullService.getGetFullListDimentions();
          fullListPrinciples = this.assessmentCaptureFullService.getGetFullListPrinciples();
          fullListPrinciplesGroups = this.assessmentStateService.getFullListByPrincipleGroups();
        }
        if (assessmentType === 1) {
          fullListDimentions = this.assessmentCaptureLightService.getDimensions();
          fullListPrinciples = this.assessmentCaptureLightService.getPrinciples();
          fullListPrinciplesGroups = this.assessmentStateService.getFullListByPrincipleGroups();
        }

        forkJoin(fullListDimentions, fullListPrinciples, fullListPrinciplesGroups)
          .subscribe((results: any) => {
            const allArr =  [{OID: 0, ShortTitle: 'All'}];
            this.dimentionsList = results[0].concat(allArr);
            this.principleList = results[1].concat(allArr);
            this.principleGroups = results[2].concat(allArr);
          });

    setTimeout( () => {
      this.dataGrid.instance.beginCustomLoading('Loading..');      
    }, 0);

        this.indicatorReportingService.getIndicatrsData({})
          .subscribe((data: any[]) => {
            this.reportingDataSource = data;
            this.dataGrid.instance.endCustomLoading();
          });
      });
  }

  changeFilter(event, type) {
    this.dataGrid.instance.beginCustomLoading('Loading..');
    if(type === 'dimension') {
      if (event.selectedItem.OID === 0) {
        delete this.queryParams.DimensionOid;
      } else {
        this.queryParams.DimensionOid = event.selectedItem.OID;
      }
    }
    if(type === 'principle') {
      if(event.selectedItem.OID === 0) {
        delete this.queryParams.PrincipleOid;
      } else {
        this.queryParams.PrincipleOid = event.selectedItem.OID;
      }
    }
    if(type === 'management-area') {
      if (event.selectedItem.OID === 0) {
        delete this.queryParams.PrincipleGroupOid;
      } else {
        this.queryParams.PrincipleGroupOid = event.selectedItem.OID;
      }
    }
   this.indicatorReportingService.getIndicatrsData(this.queryParams)
     .subscribe((data: any[]) => {
       this.reportingDataSource = data;
       this.dataGrid.instance.endCustomLoading();       
     },
       error => {
       this.userService.showUserNotification(error.error.Message, 'error')
         this.dataGrid.instance.endCustomLoading();

       })
  }
  getSortedValues(event) {
    if(event.selectedItem === 'WEAKENING') {
      this.reportingDataSource = this.reportingDataSource.sort(this.compareNumbersHighToLow)
    }
    if(event.selectedItem === 'STRENGTHENING') {
      this.reportingDataSource = this.reportingDataSource.sort(this.compareNumbersLowToHigh)
    }
  }

  compareNumbersHighToLow(a, b) {
    return b.Score - a.Score;
  }

  compareNumbersLowToHigh(a, b) {
    return a.Score - b.Score;
  }

  getCharacteristicPopup(data) {     
    setTimeout( () => {
      this.dataGrid.instance.beginCustomLoading('Loading..');
    }, 0);
    this.indicatorFormula = data.data.Relevance;
    this.indicatorFormulaAxis = data.data.Relevance;
    if (this.indicatorFormulaAxis.length < 42) {
      this.indicatorFormulaAxis += '      .';
    }
    this.indicatorReportingService.getIndicatorData(data.data.IndicatorOid).subscribe((response) => {
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
        this.indicatorData.Results = this.indicatorData.Results.map(el => {
          return el.map(innerEl => {
            if(innerEl === 'NaN') {
              return 'N/A';
            } else {
              return innerEl;
            }
          })
        });
        this.dataGrid.instance.endCustomLoading();        
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
        
        this.popupSecondTableData = []; //bugherd #1432
        this.popupSecondTableData[0] = this.indicatorData.PrimaryData[0];
        this.indicatorData.PrimaryData.forEach((row, index) => {
          if  (index != 0) {
            this.popupSecondTableData[index] = [];
            this.popupSecondTableData[index] = this.formatNumberArray(this.indicatorData.PrimaryData[index])
          }
        });
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

  customizeTooltip(arg) {
    return {
      text: 'dasdas'
    }
  }

  getArr(){
    return [{
      value: 'Value',
      name: 'NEW'
    }]
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  showCharateristicPopover(data) {    
    if (data) {
      this.indicatorReportingService.getCharacteristicData(data.data.CharacteristicOid).subscribe(resp => {
        this.characteristicSummary = resp['Summary'];
      });
      this.isPopoverVisible = data.rowIndex;
    } else {
      this.isPopoverVisible = -1;
      this.characteristicSummary = null;
    }
  }

  getChartBackgroundColor(d) {
    if (d.Score > -26 && d.Score < 1) return 'transparent';
    if (d.Score < -25) return 'transparent';
    if (d.Score > 0 && d.Score < 26) return 'transparent';
    if (d.Score > 25) return 'transparent';
  }

  getChartBackgroundClass(d) {
    if (d.Score > -26 && d.Score < 1) return 'yellow';
    if (d.Score < -25) return 'red';
    if (d.Score > 0 && d.Score < 26) return 'yellow';
    if (d.Score > 25) return 'green';
  }

  customScoreSortingFunction (rowData) {
      return rowData.Score; // Others are sorted as usual
  }

  getScoreChartValue(data) {

    if(data.TrendDictionary.every(elem => elem.Value ==='NaN')) {
      return -25;
    }

    if (data.Score > 50) {
      return 50;
    }
    if (data.Score < -50) {
      return -50;
    }
    return data.Score;
  }

  customizeTooltipText(data) {
    data.valueText = ['Actual Value:', data.value + '%'];
    return data;
  }

  isTrendDictionaryNaN(data) {
    return data.data.TrendDictionary.every(elem => elem.Value ==='NaN');
  }
}
