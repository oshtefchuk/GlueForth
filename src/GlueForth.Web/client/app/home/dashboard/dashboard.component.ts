import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CountryInfo, DashboardService, EnergyDescription, PopulationByRegion } from "./dashboard.service";
import { PercentPipe } from "@angular/common";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {HomeService} from "../home.service";
import {Title} from "@angular/platform-browser";
import {
  DataForBarChart,
  SpaDatasetForChart,
  SpaDataSetLitePieChart,
  SpaDataSetState
} from "../../shared/models/spaDataSet.model";
import {UserService} from "../../shared/services/user.service";
import {AssessmentStateService} from "../assessment/assessment-state/assessment-state.service";
import {UnitInfo} from "../../shared/models/unit.model";
import {forkJoin, Subscription} from "rxjs/index";
import {MyActionsPrioritiseService} from "../my-actions/prioritise/prioritise.service";
import {CurrentStatusService} from "../my-actions/current-status/current-status.service";
import {UnitService} from "../../shared/services/unit.service";
import {pluck} from "rxjs/operators";
import {StandardsService} from "../standards/standards.service";
import {AreaMappingService} from "../performance-indicators/area-mapping/area-mapping.service";
import {ReportingService} from "../../shared/services/reporting.service";

@Component({
  selector: 'bluenorth-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


  @ViewChild('navigation') public navigation: ElementRef;

  types: string[] = ["line", "stackedline", "fullstackedline"];
  countriesInfo: any[] = [];
  energySources: EnergyDescription[];
  sales: any;
  public isActive: number;

  public spaDataSetByDimentionsBarChartLite = [];
  public spaDataSetByDimentionsBarChartFull = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartLite: DataForBarChart[] = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons: DataForBarChart[] = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartFull: DataForBarChart[] = [];
  public spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons: DataForBarChart[] = [];
  public dataForFilter = [{id: 1, text: 'By Focus Area'}, {id: 2, text: 'By Principle'}];
  public spaDatasetLite = new SpaDatasetForChart();
  public spaDatasetFull = new SpaDatasetForChart();
  public spaDataSetPieChart: SpaDataSetLitePieChart[] = [];
  public spaDataSetFullPieChart: SpaDataSetLitePieChart[] = [];
  public currentUnit: UnitInfo;
  public loadingVisible1 = true;
  public loadingVisible2 = true;
  public loadingVisible3 = true;
  public loadingVisible4 = true;
  public loadingVisible5 = true;
  public loadingVisible6 = true;
  public isFocusAriaActive = true;
  public isNavFixed = false;
  public topPriorByPrincipleGroup: any[] = [];
  public reportingCounts: number[] = [];
  public assesstentType: number;
  private topPriorByPrincipleGroup$: any;
  private countsForReporting$: any;
  private spaDataSet0$: Subscription;
  private spaDataSet1$: Subscription;
  private dataFromUnitSelectorSubscription$: any;
  public standardsList: any[] = [];

  public categories: any[] = [];
  public currentCategory: any;

  public improvementPlanOpenProgress : any;
  public improvementPlanOverdueProgress : any;

  public lastAssessmentUpdate: any;
  public lastIndicatorsUpdate: any;
  SpaDataSetState: typeof SpaDataSetState = SpaDataSetState;

  customizeText(arg) {
    return arg.valueText;
  }

  constructor(private dashboardService: DashboardService,
              private homeService: HomeService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private assessmentStateService: AssessmentStateService,
              private prioritiseService: MyActionsPrioritiseService,
              private currentStatusService: CurrentStatusService,
              private unitService: UnitService,
              private standardsService: StandardsService,
              private areaMappingService: AreaMappingService,
              private reportingService: ReportingService
  ) {
    this.energySources = dashboardService.getEnergySources();
    this.populationByRegions =  dashboardService.getPopulationByRegions();

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


  customizeTooltip(arg) {
    return {
      text: arg.valueText
    }
  }
  customizeText2(arg) {
    return arg.valueText + ' %';
  }
  pipe: any = new PercentPipe("en-US");

  populationByRegions: PopulationByRegion[];


  customizeTooltipN = (arg: any) => {
    return {
      text: arg.valueText + " - " + this.pipe.transform(arg.percent, "1.2-2")
    };
  };

  public redirect(route, title) {
    this.homeService.title.next(title);
    this.router.navigate([route]);

  }

  ngOnInit() {
    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(item => {
      this.spaDatasetLite = new SpaDatasetForChart();
      this.spaDatasetFull = new SpaDatasetForChart();
      this.spaDataSetPieChart = [];
      this.spaDataSetFullPieChart = [];
        this.loadData();
      });
    this.loadData();
  }

  getSpaDataSetByAssessmentType(type) {
      this.spaDataSet1$ = this.assessmentStateService.getSpaDataSetByAssessmentType(type)
        .subscribe((spaDataSet: SpaDatasetForChart) => {
            this.spaDatasetLite = spaDataSet;
            this.spaDataSetPieChart.push({
              state: 'Answered',
              value: spaDataSet.AnsweredPercentage
            });
            this.spaDataSetPieChart.push({
              state: 'Not answered',
              value: 100 - spaDataSet.AnsweredPercentage
            });
            this.loadingVisible1 = false;
          },
          error => {
            console.log(error)
            this.spaDataSetPieChart.push({
              state: 'Answered',
              value: 0
            });
            this.spaDataSetPieChart.push({
              state: 'Not answered',
              value: 100
            });
            this.spaDatasetLite.AnsweredPercentage = 0;
            //this.userService.showUserNotification(error.error.Message, 'error')
          });
  }

  loadData() {

    this.unitService.getUnitById( this.userService.currentUser.CurrentUnitId)
     .pipe(
        pluck('AssessmentType')
      ).subscribe((type: number) => {

      this.assesstentType = type;
        this.getSpaDataSetByAssessmentType(type);
      }, error1 => {
        console.log(error1);
      }
      , () => {
        if (this.assesstentType === 0) {
          this.standardsService.getStandardsList().subscribe((resp: any[]) => {
          this.standardsList = resp.filter(standard => {return standard.LogoImage});
          })
        }
      });


    this.topPriorByPrincipleGroup$ = this.prioritiseService.getTopPriorByPrincipleGroup(0);
    this.countsForReporting$ = this.currentStatusService.getCountsForReporting()
    forkJoin([this.topPriorByPrincipleGroup$, this.countsForReporting$])
      .subscribe((result: any[]) => {
        this.topPriorByPrincipleGroup = result[0];

        this.reportingCounts = result[1];

      }, error1 => {
        console.log(error1);
        this.reportingCounts = [0, 0, 0];
        this.topPriorByPrincipleGroup = [];
      });

    this.getCategories();

    this.dashboardService.getCountriesInfo().subscribe((resp:any[]) => {
      this.countriesInfo = resp;
    });

    this.dashboardService.getImprovementPlanOpenProgress().subscribe(resp => {
      this.improvementPlanOpenProgress = resp;
    });
    this.dashboardService.getImprovementPlanOverdueProgress().subscribe(resp => {
      this.improvementPlanOverdueProgress = resp;
    })
  }

  getCategories() {
    this.reportingService.getPrincipleGroups().subscribe((resp:any[]) => {
      this.categories = resp;
      this.categories.unshift({Title: 'Overall', OID: -1});
      this.currentCategory = this.categories[0];
    });

    this.dashboardService.getAssessmentLastModifiedDate().subscribe(resp => {
      if (resp != '0001-01-01T00:00:00') {
        this.lastAssessmentUpdate = resp;
      }

    });
    this.dashboardService.getIndicatorsLastModifiedDate().subscribe(resp => {
      if (resp != '0001-01-01T00:00:00') {
        this.lastIndicatorsUpdate = resp;
      }
    });
  }

  setCategory(event) {
     if (event.selectedItem) {
       if (event.selectedItem.OID === -1) {
         this.dashboardService.getIndicatorsDataSetsOverAllProgress().subscribe((resp) => {
           let years = Object.keys(resp);
           this.sales = [];
           for (let i = 0; i < years.length; i++) {

             this.sales.push({year : years[i], sales: resp[years[i]]})
           }
         })
       } else {
         this.dashboardService.getIndicatorsDataSetProgressByCategoryOid(event.selectedItem.OID).subscribe(resp => {
           let years = Object.keys(resp);
           this.sales = [];
           for (let i = 0; i < years.length; i++) {
             this.sales.push({year : years[i], sales: resp[years[i]]})
           }
         })
       }
     }
  }

  customizeValueLabel(info){
    return `${info.value}%`
  }

  navigateToAssessment() {
    if (this.assesstentType === 1) {
      this.router.navigate(['assessment-capture-light']);
    }
    if (this.assesstentType === 0) {
      this.router.navigate(['assessment-capture-full']);
    }
  }

  navigateToPerfomanceIndicatorsCapture() {
    this.router.navigate(['performance-indicators-capture']);
  }

  ngOnDestroy() {
    if (this.dataFromUnitSelectorSubscription$) {
      this.dataFromUnitSelectorSubscription$.unsubscribe();
    }
    if (this.spaDataSet1$) {
      this.spaDataSet1$.unsubscribe();
    }

  }
}
