import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { IndicatorDataSetComponent } from "./indicator-data-set/indicator-data-set.component";
import { IndicatorDataSetValueComponent } from "./indicator-data-set-value/indicator-data-set-value.component";
import { AreaMappingComponent } from "./area-mapping/area-mapping.component";
import { IndicatorReportingComponent } from "./indicator-reporting/indicator-reporting.component";
import { PerformanceIndicatorsRoutingModule } from "./performance-indicator-routing.module";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerformanceIndicatorsRoutingModule
  ],
  declarations: [
    IndicatorDataSetComponent,
    IndicatorDataSetValueComponent,
    AreaMappingComponent,
    IndicatorReportingComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PerformanceIndicatorsModule { }
