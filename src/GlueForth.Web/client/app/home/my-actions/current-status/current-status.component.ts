import {Component, OnInit} from '@angular/core';
import {MyActionsPrioritiseService, PriorCharacteristic} from "../prioritise/prioritise.service";
import {forkJoin} from "rxjs/index";
import {map} from "rxjs/internal/operators";
import {CurrentStatusService} from "./current-status.service";
import {HomeService} from "../../home.service";
import {MyActionsReportingService} from "../reporting/reporting.service";

@Component({
  selector: 'bluenorth-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})
export class MyActionsCurrentStatusComponent implements OnInit {

  public topPriorByPrincipleGroup: any[] = [];
  public isLoaderShown = true;
  public priorCharacteristicsByPrincipleGroup: PriorCharacteristic[] = [];
  public selfAssesPieChart: any[] = [];
  public reportingCounts: number[] = [];
  public loadingVisibleprogress = true;
  private priorCharacteristicsByPrincipleGroup$: any;
  private dataFromUnitSelectorSubscription$: any;
  private topPriorByPrincipleGroup$: any;
  private countsForReporting$: any;

  constructor(private prioritiseService: MyActionsPrioritiseService,
              private currentStatusService: CurrentStatusService,
              private homeService: HomeService,
              private myActionsReportingService: MyActionsReportingService
  ) {
  }

  ngOnInit() {
    this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
      .subscribe(item => {
        this.topPriorByPrincipleGroup = [];
        this.selfAssesPieChart = [];
        this.loadingVisibleprogress = true;
        this.loadData();
      });
    this.loadData();
  }

  loadData() {
    this.topPriorByPrincipleGroup$ = this.prioritiseService.getTopPriorByPrincipleGroup(0)
    this.countsForReporting$ = this.currentStatusService.getCountsForReporting()
    forkJoin([this.topPriorByPrincipleGroup$, this.countsForReporting$])
      .subscribe((result: any[]) => {
        this.topPriorByPrincipleGroup = result[0];
        this.reportingCounts = result[1];
      });

    this.priorCharacteristicsByPrincipleGroup$ = this.myActionsReportingService.getImprovementsReportData()

      .subscribe((priorCharacteristic: any[]) => {
        priorCharacteristic.forEach(item => {
          this.selfAssesPieChart.push({
            title: item.CharacteristicTitle, chart: [{state: 'assesment', value: item.Status},
              {state: 'other', value: 100 - item.Status}]
          })
        });
        this.loadingVisibleprogress = false;
      })
  }

  getPieChartColor(data) {
    if (data === 0) {
      return '#DB253F';
    }
    if (data > 0 && data < 100) {
      return '#FE962C';
    }
    if (data >= 100) {
      return '#6BC870';
    }
  }
}
