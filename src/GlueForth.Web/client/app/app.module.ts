import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { ActionItemsComponent } from './shared/components/action-items/action-items.component';
import { AppComponent } from './app.component';
import { AssessmentCaptureFullService } from './home/assessment/assessment-capture-full/assessment-capture-full.service';
import { AssessmentStateService } from './home/assessment/assessment-state/assessment-state.service';
import { AssessmentCaptureLightService } from './home/assessment/assessment-capture-light/assessment-capture-light.service';
import { AssessmentReportingService } from './home/assessment/assessment-reporting/assessment-reporting.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AuthService } from './shared/services/auth.service';
import { AuthResolverService } from './shared/services/auth-resolver.service';
import { BluenorthRoutingModule } from './bluenorth.routing.module';

import { CommodityService } from './shared/services/commodity.service';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { DashboardService } from './home/dashboard/dashboard.service';
import { ElementWidthDirective } from './shared/element-width.directive';
import { ForgotPasswordService } from './authentification/forgot-password/forgot-password.service';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { IndicatorDataSetValueService } from './home/performance-indicators/indicator-data-set-value/indicator-data-set-value.service';
import { IndicatorReportingService } from './home/performance-indicators/indicator-reporting/indicator-reporting.service';
import { LoginComponent } from './authentification/login/login.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { MyActionsCurrentStatusComponent } from './home/my-actions/current-status/current-status.component';
import { MyActionsCaptureComponent } from './home/my-actions/capture/capture.component';
import { MyActionsPrioritiseComponent } from './home/my-actions/prioritise/prioritise.component';
import { MyActionsReportingComponent } from './home/my-actions/reporting/reporting.component';
import { MyActionsPrioritiseService } from './home/my-actions/prioritise/prioritise.service';
import { MyActionsCaptureService } from './home/my-actions/capture/capture.service';
import { MyActionsReportingService } from './home/my-actions/reporting/reporting.service';
import { PriorCharacteristicsComponent } from './shared/components/prior-characteristics/prior-characteristics.component';
import { RegistrationComponent } from './authentification/registration/registration.component';
import { RegistrationService } from './authentification/registration/registration.service';
import { RegistrationSettingsComponent } from './authentification/registration-settings/registration-settings.component';
import { RegistrationSettingsService } from './authentification/registration-settings/registration-settings.service';
import { ReportingService } from './shared/services/reporting.service';
import { QuestionsService } from './shared/services/questions.service';
import { StandardsService } from './home/standards/standards.service';
import { StandardsComponent } from './home/standards/standards.component';
import { TermsConditionsComponent } from './authentification/terms-conditions/terms-conditions.component';
import { UserService } from './shared/services/user.service';
import { UnitService } from './shared/services/unit.service';
import { UnitItemService } from './shared/services/unit-item.service';

import { SharedModule } from './shared/shared.module';
import { UserProfileBusinessUnitItemService } from './user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service';
import { UserProfileInfoService } from './user-profile/user-profile-info/user-profile-info.service';
import { UserProfileOrganisationService } from './user-profile/user-profile-organisation/user-profile-organisation.service';
import { UserProfileService } from './user-profile/user-profile.service';

import { AreaMappingComponent } from './home/performance-indicators/area-mapping/area-mapping.component';
import { AreaMappingService } from './home/performance-indicators/area-mapping/area-mapping.service';
import { MyActionsTasksService } from './home/my-actions/tasks/tasks.service';
import { MyActionsTasksComponent } from './home/my-actions/tasks/tasks.component';
import { EulaConditionsComponent } from './authentification/eula/eula-conditions.component';
import { StandardsReportingComponent } from './home/standards/standards-reporting/standards-reporting.component';
import { StandardsOverviewComponent } from './shared/components/standards-overview/standards-overview.component';
import { FileSaverModule } from 'ngx-filesaver';


@NgModule({
  declarations: [
    ActionItemsComponent,
    AppComponent,

    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    TermsConditionsComponent,
    EulaConditionsComponent,
    RegistrationSettingsComponent,
    StandardsComponent,
    HeaderComponent,
    ElementWidthDirective,
    RegistrationComponent,
    MyActionsCurrentStatusComponent,
    MyActionsCaptureComponent,
    MyActionsPrioritiseComponent,
    MyActionsReportingComponent,
    MyActionsTasksComponent,
    PriorCharacteristicsComponent,
    StandardsReportingComponent,
    StandardsOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    SharedModule,
    BluenorthRoutingModule,
    FileSaverModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthResolverService,
    AssessmentCaptureFullService,
    AssessmentCaptureLightService,
    AssessmentReportingService,
    AssessmentStateService,
    CommodityService,
    DashboardService,
    ForgotPasswordService,
    HomeService,
    IndicatorDataSetValueService,
    AreaMappingService,
    IndicatorReportingService,
    LocalStorageService,
    MyActionsPrioritiseService,
    RegistrationService,
    RegistrationSettingsService,
    ReportingService,
    StandardsService,
    UserService,
    UnitService,
    MyActionsTasksService,
    QuestionsService,
    UserProfileService,
    UserProfileInfoService,
    UserProfileOrganisationService,
    UserProfileBusinessUnitItemService,
    UnitItemService,
    UpperCasePipe,
    MyActionsCaptureService,
    MyActionsReportingService
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
