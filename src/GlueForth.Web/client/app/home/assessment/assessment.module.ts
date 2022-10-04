import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from "../../shared/shared.module";
import {AssessmentCurrentStatusComponent} from "./assessment-current-status/assessment-current-status.component";
import {AssessmentStateComponent} from "./assessment-state/assessment-state.component";
import {AssessmentCaptureFullComponent} from "./assessment-capture-full/assessment-capture-full.component";
import {AssessmentCaptureLightComponent} from "./assessment-capture-light/assessment-capture-light.component";
import {AssessmentReportingComponent} from "./assessment-reporting/assessment-reporting.component";
import {AssessmentRoutingModule} from "./assessment-routing.module";
import { AssessmentRepositoryComponent } from "./assessment-repository/assessment-repository.component";
import {AssessmentRepositoryService} from "./assessment-repository/assessment-repository.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AssessmentRoutingModule
  ],
  declarations: [
    AssessmentCurrentStatusComponent,
    AssessmentStateComponent,
    AssessmentCaptureFullComponent,
    AssessmentCaptureLightComponent,
    AssessmentReportingComponent,
    AssessmentRepositoryComponent
  ],
  providers: [
    AssessmentRepositoryService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssessmentModule { }

