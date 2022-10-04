import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DevExtremeModule,
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule, DxFileUploaderModule,
  DxFormModule,
  DxMapModule,
  DxNumberBoxModule, DxPopoverModule,
  DxResponsiveBoxModule, DxScrollViewModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxTemplateModule,
  DxTooltipModule,
  DxTreeViewModule
} from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { AgmCoreModule } from '@agm/core';
import {TokenInterceptor} from "./services/token.Interseptor";
import {ReplaceLineBreaksPipe} from "./replace-line-breaks.pipe";
import {CharacteristicStatusComponent} from "./components/characteristic-status/characteristic-status.component";


@NgModule({
  imports: [
    CommonModule,
    DevExtremeModule,
    DxResponsiveBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxFormModule,
    DxPopoverModule,
    DxTagBoxModule,
    FormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxTooltipModule,
    DxTreeViewModule,
    DxMapModule,
    DxFileUploaderModule,
    DxScrollViewModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2PageScrollModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBkoVvbeNw1T22g7V95635zS16NQo5dYNs",
      libraries: ["places"]
    })
  ],
  declarations: [
    CharacteristicStatusComponent,
ReplaceLineBreaksPipe],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  exports: [
    CommonModule,
    DevExtremeModule,
    DxResponsiveBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxFormModule,
    DxTagBoxModule,
    DxFileUploaderModule,
    DxScrollViewModule,
    FormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxTreeViewModule,
    DxTooltipModule,
    ReactiveFormsModule,
    AgmCoreModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    Ng2PageScrollModule,
    DxMapModule,
    ReplaceLineBreaksPipe,
    CharacteristicStatusComponent,
  ],
  entryComponents: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }
