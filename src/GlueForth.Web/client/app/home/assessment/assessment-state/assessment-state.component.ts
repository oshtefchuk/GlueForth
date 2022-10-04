import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssessmentStateService} from './assessment-state.service';
import {
  DataForBarChart, SpaDatasetForChart,
  SpaDataSetLitePieChart, SpaDataSetState
} from '../../../shared/models/spaDataSet.model';
import {AssessmentCaptureLightService} from '../assessment-capture-light/assessment-capture-light.service';
import {AssessmentCaptureFullService} from '../assessment-capture-full/assessment-capture-full.service';
import {UserService} from '../../../shared/services/user.service';
import {UnitService} from '../../../shared/services/unit.service';
import {UnitInfo} from '../../../shared/models/unit.model';
import {HomeService} from '../../home.service';
import {ReportingService} from '../../../shared/services/reporting.service';
import {Subscription} from 'rxjs/index';



export interface Tab {
  id: number;
  text: string;
}


@Component({
  selector: 'bluenorth-assessment-state',
  templateUrl: './assessment-state.component.html',
  styleUrls: ['./assessment-state.component.scss']
})

export class AssessmentStateComponent implements OnInit, OnDestroy {

  public spaDataSetByDimentionsBarChartLite = [];
  public spaDataSetByDimentionsBarChartFull = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartLite: DataForBarChart[] = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons: DataForBarChart[] = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartFull: DataForBarChart[] = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons: DataForBarChart[] = [];
  public dataForFilter = [{id: 1, text: 'By Focus Area'}, {id: 2, text: 'By Principle'}];
  public spaDatasetLite: SpaDatasetForChart;
  public spaDatasetFull: SpaDatasetForChart;
  public spaDataSetLitePieChart: SpaDataSetLitePieChart[] = [];
  public spaDataSetFullPieChart: SpaDataSetLitePieChart[] = [];
  public currentUnit: UnitInfo;
  public loadingVisible1 = false;
  public loadingVisible2 = false;
  public loadingVisible3 = false;
  public loadingVisible4 = false;
  public loadingVisible5 = false;
  public loadingVisible6 = false;
  public isFocusAriaActive = true;
  public isActive: number;

  private spaDataSet1$: Subscription;
  private spaDataSet0$: Subscription;
  private updateGradeByAssessmentType$: Subscription;
  private dataFromUnitSelector$: Subscription;
  private unitById$: Subscription;
  private dimensionsByStandardIdFromUnit$: Subscription;
  private fullListDimentionsFromCurrentUnit$: Subscription;
  private principlesFromCurrentUnit$: Subscription;
  private allPrincipleGroups$: Subscription;
  private allPrincipleGroupsFull$: Subscription;
  private liteListByPrincipleGroupsByStandardIdFromUnit$: Subscription;
  private principlesByStandardIdFromUnit$: Subscription;
  private fullListByPrincipleGroupsByStandardIdFromUnit$: Subscription;


  SpaDataSetState: typeof SpaDataSetState = SpaDataSetState;

  constructor(private userService: UserService,
              private unitService: UnitService,
              private router: Router,
              private assessmentStateService: AssessmentStateService,
              private assessmentCaptureLightService: AssessmentCaptureLightService,
              private homeService: HomeService,
              private reportingService: ReportingService,
              private assessmentCaptureFullService: AssessmentCaptureFullService) {
  }

  ngOnInit() {
    this.loadingVisible1 = true;
    this.dataFromUnitSelector$ = this.homeService.getDataFromUnitSelector()
      .subscribe(item => {
        this.spaDataSetByDimentionsBarChartLite = [];
        this.spaDataSetByDimentionsBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = [];
        this.spaDataSetLitePieChart = [];
        this.spaDataSetFullPieChart = [];
        this.spaDatasetLite = new SpaDatasetForChart();
        this.spaDatasetFull = new SpaDatasetForChart();
      });
    this.loadData();
  }

  public loadData() {
    this.unitById$ = this.unitService.getUnitById(this.userService.currentUser.CurrentUnitId)
      .subscribe((unit: UnitInfo) => {
          this.currentUnit = unit;
          if (this.currentUnit.AssessmentType === (null || -1)) {
            this.router.navigate(['assessment-current-status-init']);
          }
          this.spaDataSet1$ = this.assessmentStateService.getSpaDataSetByAssessmentType(this.currentUnit.AssessmentType)
            .subscribe((spaDataSet: SpaDatasetForChart) => {
                this.spaDatasetLite = spaDataSet;
                this.spaDataSetLitePieChart.push({
                  state: 'Answered',
                  value: spaDataSet.AnsweredPercentage
                });
                this.spaDataSetLitePieChart.push({
                  state: 'Not answered',
                  value: 100 - spaDataSet.AnsweredPercentage
                });
                this.loadingVisible1 = false;
              },
              error => {
                this.userService.showUserNotification(error.error.Message, 'error')
              });

          this.dimensionsByStandardIdFromUnit$ = this.assessmentCaptureLightService.getDimensions()
            .subscribe((getDimensionsList: any[]) => {
                this.spaDataSetByDimentionsBarChartLite = getDimensionsList;
                this.loadingVisible2 = false;
              },
              error => {
                this.userService.showUserNotification(error.error.Message, 'error')
              });

          this.fullListDimentionsFromCurrentUnit$ = this.assessmentCaptureFullService.getFullListDimentionsOrPrinciplesFromCurrentUnit('Dimensions')
            .subscribe((getDimensionsList: any[]) => {
                this.spaDataSetByDimentionsBarChartFull = getDimensionsList;
                this.loadingVisible5 = false;

              },
              error => {
                this.userService.showUserNotification(error.error.Message, 'error')
              }
            );

          this.allPrincipleGroups$ = this.reportingService.getAllPrincipleGroups()
            .subscribe((getLiteListByPrincipleGroups: DataForBarChart[]) => {
                this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = getLiteListByPrincipleGroups.reverse();
                this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = Object.assign([], getLiteListByPrincipleGroups);
                this.loadingVisible3 = false;
              },
              error => {
                this.userService.showUserNotification(error.error.Message, 'error');
              });

          this.allPrincipleGroupsFull$ = this.assessmentCaptureFullService.getAllPrincipleGroupsFull()
            .subscribe((getFullListByPrincipleGroups: DataForBarChart[]) => {
                getFullListByPrincipleGroups = getFullListByPrincipleGroups.reverse();
                this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = getFullListByPrincipleGroups;
                this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = Object.assign([], getFullListByPrincipleGroups);
                this.loadingVisible6 = false;

              },
              error => {
                this.userService.showUserNotification(error.error.Message, 'error');
              });
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
  }

  selectLiteAssessmentDetailedProgress(event) {
    this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = [];
    this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = [];
    this.loadingVisible3 = true;
    if (event.itemIndex === 0) {
      this.isFocusAriaActive = true;
      this.liteListByPrincipleGroupsByStandardIdFromUnit$ = this.reportingService.getAllPrincipleGroups()
        .subscribe((getLiteListByPrincipleGroups: DataForBarChart[]) => {
          getLiteListByPrincipleGroups = getLiteListByPrincipleGroups.reverse();
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = getLiteListByPrincipleGroups;
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = Object.assign([], getLiteListByPrincipleGroups);

          this.loadingVisible3 = false;
        });
    }
    if (event.itemIndex === 1) {
      this.isFocusAriaActive = false;
      this.principlesByStandardIdFromUnit$ = this.assessmentStateService.getAssessmentDetailedProgressByPrinciple()
        .subscribe((getPrincipleList: DataForBarChart[]) => {
          getPrincipleList = getPrincipleList.reverse();
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = getPrincipleList;
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = Object.assign([], getPrincipleList);
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons.reverse();
          this.loadingVisible3 = false;
        });
    }
  }

  selectFullAssessmentDetailedProgress(event) {
    this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = [];
    this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = [];
    this.loadingVisible6 = true;
    if (event.itemIndex === 0) {
      this.isFocusAriaActive = true;
      this.fullListByPrincipleGroupsByStandardIdFromUnit$ = this.assessmentCaptureFullService.getAllPrincipleGroupsFull()
        .subscribe((getFullListByPrincipleGroups: DataForBarChart[]) => {
          getFullListByPrincipleGroups = getFullListByPrincipleGroups.reverse();
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = getFullListByPrincipleGroups;
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = Object.assign([], getFullListByPrincipleGroups);
          this.loadingVisible6 = false;
        });
    }
    if (event.itemIndex === 1) {
      this.isFocusAriaActive = false;
      this.principlesFromCurrentUnit$ = this.assessmentStateService.getAssessmentDetailedProgressByPrinciple()
        .subscribe((getPrincipleList: DataForBarChart[]) => {
          getPrincipleList = getPrincipleList.reverse();
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = getPrincipleList;
          this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = Object.assign([], getPrincipleList);
          this.loadingVisible6 = false;
        });
    }
  }

  updateGrade(assessmentType, type) {
    this.updateGradeByAssessmentType$ = this.assessmentStateService.updateGradeByAssessmentType(assessmentType)
      .subscribe(response => {
          if (type === 'Lite') {
            this.spaDatasetLite.Grade = 'Under Review';
          }
          if (type === 'Full') {
            this.spaDatasetFull.Grade = 'Under Review';
          }
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error')
        });
  }

  customizeTextLegendDimensionsLite(legendInfo: any) {
   return legendInfo.seriesName;
  }

  customizeTextLegendDimensionsFull(legendInfo: any) {
    if (legendInfo.seriesName) {
      return `${this.spaDataSetByDimentionsBarChartFull[legendInfo.seriesIndex].AnsweredPercentage}%  ${legendInfo.seriesName}`
    } else {
      return '0%';
    }
  }

  customizeToolTip(arg) {
    return {
      text: `${arg.valueText}%`
    };
  }

  customizeTextLabel(info) {
    return '';
  }

  customizeValueLabel(info) {
    return `${info.value}%`;
  }

  onLegendClick(event) {
    const series = event.target;
  }

  redirectToCurrentPrincipleOrPrincipleGroup(item, label, type) {
    if (label === 'light') {
      this.assessmentStateService.setDimensionOid(item.OID, type);
    }
    if (label === 'full') {
      this.assessmentStateService.setDimensionOid(item.OID, type);
      this.homeService.preselectDataToFilter(type);
    }
    this.router.navigate([`assessment-capture-${label}`]);
  }

  onArgumentValueAxisClick(event, label, type) {
    if (label === 'light') {
      const dataset = this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons.find(data => {
        return data.ShortTitle === event.argument;
      });
      this.assessmentStateService.setDimensionOid(dataset.OID, type);
    }
    if (label === 'full') {
      const dataset = this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons.find(data => {
        return data.ShortTitle === event.argument;
      });

      this.assessmentStateService.setDimensionOid(dataset.OID, type);
      this.homeService.preselectDataToFilter(type);
    }
    this.router.navigate([`assessment-capture-${label}`]);
  }

  ngOnDestroy() {
    if (this.dataFromUnitSelector$) {
      this.dataFromUnitSelector$.unsubscribe();
    }
    if (this.unitById$) {
      this.unitById$.unsubscribe();
    }
    if (this.dimensionsByStandardIdFromUnit$) {
      this.dimensionsByStandardIdFromUnit$.unsubscribe();
    }
    if (this.fullListDimentionsFromCurrentUnit$) {
      this.fullListDimentionsFromCurrentUnit$.unsubscribe();
    }
    if (this.allPrincipleGroups$) {
      this.allPrincipleGroups$.unsubscribe();
    }
    if (this.allPrincipleGroupsFull$) {
      this.allPrincipleGroupsFull$.unsubscribe();
    }
  }
}
