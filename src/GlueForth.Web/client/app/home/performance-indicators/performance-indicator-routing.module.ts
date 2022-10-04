import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { IndicatorDataSetComponent } from "./indicator-data-set/indicator-data-set.component";
import { IndicatorDataSetValueComponent } from "./indicator-data-set-value/indicator-data-set-value.component";
import { IndicatorReportingComponent } from "./indicator-reporting/indicator-reporting.component";
import { AreaMappingComponent } from "./area-mapping/area-mapping.component";

export const performanceIndicatorsRoutes = [
  {
    path: 'performance-indicators-current-status',
    component: IndicatorDataSetComponent,
    data: { title: 'PERFORMANCE INDICATORS' }
  },
  {
    path: 'performance-indicators-capture',
    component: IndicatorDataSetValueComponent,
    data: { title: 'PERFORMANCE INDICATORS' }
  },
  {
    path: 'performance-indicators-reporting',
    component: IndicatorReportingComponent,
    data: { title: 'PERFORMANCE INDICATORS' }
  },
  {
    path: 'performance-indicators-mapping',
    component: AreaMappingComponent,
    data: {title: 'PERFORMANCE INDICATORS'}
  },
  {
    path: 'standards-management/:standardId',
    component: IndicatorDataSetComponent,
    data: {title: 'INDICATOR DATA SETS'}
  },
  {
    path: 'standards-management/:standardId/performance-indicators',
    component: IndicatorDataSetValueComponent,
    data: {title: 'PERFORMANCE INDICATORS'}
  },
  {
    path: 'standards-management/:standardId/:indicatorDataSetId',
    component: IndicatorDataSetValueComponent,
    data: {title: 'PERFORMANCE INDICATORS'}
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(performanceIndicatorsRoutes)],
  exports: [RouterModule]
})

export class PerformanceIndicatorsRoutingModule{}
