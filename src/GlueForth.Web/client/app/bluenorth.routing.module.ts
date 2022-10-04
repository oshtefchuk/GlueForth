import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {RegistrationComponent} from './authentification/registration/registration.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './authentification/login/login.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {ForgotPasswordComponent} from './authentification/forgot-password/forgot-password.component';
import {TermsConditionsComponent} from './authentification/terms-conditions/terms-conditions.component';
import {RegistrationSettingsComponent} from './authentification/registration-settings/registration-settings.component';
import {StandardsComponent} from './home/standards/standards.component';
import {AuthResolverService} from './shared/services/auth-resolver.service';
import {MyActionsCaptureComponent} from './home/my-actions/capture/capture.component';
import {MyActionsCurrentStatusComponent} from './home/my-actions/current-status/current-status.component';
import {MyActionsPrioritiseComponent} from './home/my-actions/prioritise/prioritise.component';
import {MyActionsReportingComponent} from './home/my-actions/reporting/reporting.component';
import {MyActionsTasksComponent} from './home/my-actions/tasks/tasks.component';
import {EulaConditionsComponent} from './authentification/eula/eula-conditions.component';
import {StandardsReportingComponent} from './home/standards/standards-reporting/standards-reporting.component';


const appRoutes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsConditionsComponent
  },
  {
    path: 'eula-and-conditions',
    component: EulaConditionsComponent
  },
  {
    path: 'registration-settings',
    component: RegistrationSettingsComponent
  },
  {
    path: 'units',
    canActivate: [AuthGuard],
    component: RegistrationSettingsComponent,
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      currentUser: AuthResolverService
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        component: HomeComponent,
        children: [
          {
            path: '',
            component: DashboardComponent,
            data: {title: 'DASHBOARD'}
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
            data: {title: 'DASHBOARD'}
          },
          {
            path: '',
            loadChildren: './home/assessment/assessment.module#AssessmentModule'
          },
          {
            path: '',
            loadChildren: './home/performance-indicators/performance-indicators.module#PerformanceIndicatorsModule'
          },
          {
            path: 'standards-management-control-points',
            component: StandardsComponent,
            data: {title: 'STANDARDS', subtitle: 'control points'}
          },
          {
            path: 'standards-management-current-status',
            component: StandardsReportingComponent,
            data: {title: 'STANDARDS', subtitle: 'current status'}
          },
          {
            path: 'my-actions-current-status',
            component: MyActionsCurrentStatusComponent,
            data: {title: 'MY ACTIONS'}
          },
          {
            path: 'my-actions-prioritise',
            component: MyActionsPrioritiseComponent,
            data: {title: 'MY ACTIONS'}
          },
          {
            path: 'my-actions-capture',
            component: MyActionsCaptureComponent,
            data: {title: 'MY ACTIONS'}
          },
          {
            path: 'my-actions-capture/:characteristicId',
            component: MyActionsCaptureComponent,
            data: {title: 'MY ACTIONS'}
          },
          {
            path: 'my-actions-reporting',
            component: MyActionsReportingComponent,
            data: {title: 'MY ACTIONS'}
          },
          {
            path: 'my-actions-tasks',
            component: MyActionsTasksComponent,
            data: {title: 'MY ACTIONS'}
          }
        ]
      },
      {
        path: 'profile',
        loadChildren: './user-profile/user-profile.module#UserProfileModule'
      },
      {path: '**', redirectTo: 'dashboard'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class BluenorthRoutingModule {
}
