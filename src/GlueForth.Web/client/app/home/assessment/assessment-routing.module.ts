import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {AssessmentCurrentStatusComponent} from "./assessment-current-status/assessment-current-status.component";
import {AssessmentStateComponent} from "./assessment-state/assessment-state.component";
import {AssessmentCaptureFullComponent} from "./assessment-capture-full/assessment-capture-full.component";
import {AssessmentCaptureLightComponent} from "./assessment-capture-light/assessment-capture-light.component";
import {AssessmentReportingComponent} from "./assessment-reporting/assessment-reporting.component";
import {AssessmentRepositoryComponent} from "./assessment-repository/assessment-repository.component";



export const assessmentRoutes = [
  {
    path: 'assessment-current-status-init',
    component: AssessmentCurrentStatusComponent,
    data: { title: 'STRATEGIC ASSESSMENT'}
  }, {
    path: 'assessment-current-status',
    component: AssessmentStateComponent,
    data: { title: 'STRATEGIC ASSESSMENT'}
  },
  {
    path: 'assessment-capture-full',
    component: AssessmentCaptureFullComponent,
    data: {title: 'STRATEGIC ASSESSMENT'}
  },
  {
    path: 'assessment-capture-light',
    component: AssessmentCaptureLightComponent,
    data: { title: 'STRATEGIC ASSESSMENT', subtitle: 'lite assessment'}
  },
  {
    path: 'assessment-reporting',
    component: AssessmentReportingComponent,
    data: { title: 'STRATEGIC ASSESSMENT', subtitle: 'reporting'}
  },
  {
    path: 'assessment-repository',
    component: AssessmentRepositoryComponent,
    data: { title: 'STRATEGIC ASSESSMENT', subtitle: 'repository'}
  }];

@NgModule({
  imports: [RouterModule.forChild(assessmentRoutes)],
  exports: [RouterModule]
})

export class AssessmentRoutingModule{}
