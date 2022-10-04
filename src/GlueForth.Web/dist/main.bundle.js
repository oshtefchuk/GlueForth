webpackJsonp(["main"],{

/***/ "./client/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/user-profile/user-profile.module": [
		"./client/app/user-profile/user-profile.module.ts"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./client/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./client/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ "./client/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = "bluenorth-header {\n  position: fixed;\n  width: 100%;\n  top: 0;\n  z-index: 5; }\n"

/***/ }),

/***/ "./client/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(router, activatedRoute, titleService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        //смотрим на все события роутера
        this.router.events
            .filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationEnd */]; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            console.log('route', route);
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (stateTitle) { return _this.titleService.setTitle(stateTitle.title); });
    };
    AppComponent.prototype.ngOnChanges = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("./client/app/app.component.html"),
            styles: [__webpack_require__("./client/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* Title */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./client/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./client/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__ = __webpack_require__("./client/app/shared/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__ = __webpack_require__("./client/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_resolver_service__ = __webpack_require__("./client/app/shared/services/auth-resolver.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bluenorth_routing_module__ = __webpack_require__("./client/app/bluenorth.routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_dashboard_dashboard_component__ = __webpack_require__("./client/app/home/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_dashboard_dashboard_service__ = __webpack_require__("./client/app/home/dashboard/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authentification_forgot_password_forgot_password_service__ = __webpack_require__("./client/app/authentification/forgot-password/forgot-password.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__authentification_forgot_password_forgot_password_component__ = __webpack_require__("./client/app/authentification/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_header_header_component__ = __webpack_require__("./client/app/shared/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_home_component__ = __webpack_require__("./client/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__authentification_login_login_component__ = __webpack_require__("./client/app/authentification/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_services_local_storage_service__ = __webpack_require__("./client/app/shared/services/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__authentification_registration_registration_component__ = __webpack_require__("./client/app/authentification/registration/registration.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__authentification_registration_registration_service__ = __webpack_require__("./client/app/authentification/registration/registration.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__authentification_registration_settings_registration_settings_component__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared_services_questions_service__ = __webpack_require__("./client/app/shared/services/questions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__home_standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__home_standards_standards_component__ = __webpack_require__("./client/app/home/standards/standards.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__authentification_terms_conditions_terms_conditions_component__ = __webpack_require__("./client/app/authentification/terms-conditions/terms-conditions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__shared_services_unit_item_service__ = __webpack_require__("./client/app/shared/services/unit-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__home_assessment_assessment_capture_full_assessment_capture_full_component__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__home_assessment_assessment_current_status_assessment_current_status_component__ = __webpack_require__("./client/app/home/assessment/assessment-current-status/assessment-current-status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__home_assessment_assessment_state_assessment_state_component__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__home_assessment_assessment_capture_light_assessment_capture_light_component__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__home_assessment_assessment_capture_full_assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__home_assessment_assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__home_assessment_assessment_capture_light_assessment_capture_light_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__shared_services_commodity_service__ = __webpack_require__("./client/app/shared/services/commodity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__home_performance_indicators_indicator_data_set_indicator_data_set_component__ = __webpack_require__("./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_component__ = __webpack_require__("./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_service__ = __webpack_require__("./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__home_assessment_assessment_reporting_assessment_reporting_component__ = __webpack_require__("./client/app/home/assessment/assessment-reporting/assessment-reporting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__home_assessment_assessment_reporting_assessment_reporting_service__ = __webpack_require__("./client/app/home/assessment/assessment-reporting/assessment-reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__home_performance_indicators_indicator_reporting_indicator_reporting_component__ = __webpack_require__("./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__home_performance_indicators_indicator_reporting_indicator_reporting_service__ = __webpack_require__("./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__shared_element_width_directive__ = __webpack_require__("./client/app/shared/element-width.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__shared_replace_line_breaks_pipe__ = __webpack_require__("./client/app/shared/replace-line-breaks.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__user_profile_user_profile_module__ = __webpack_require__("./client/app/user-profile/user-profile.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__shared_shared_module__ = __webpack_require__("./client/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__home_my_actions_current_status_current_status_component__ = __webpack_require__("./client/app/home/my-actions/current-status/current-status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__home_my_actions_capture_capture_component__ = __webpack_require__("./client/app/home/my-actions/capture/capture.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__home_my_actions_prioritise_prioritise_component__ = __webpack_require__("./client/app/home/my-actions/prioritise/prioritise.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__home_my_actions_reporting_reporting_component__ = __webpack_require__("./client/app/home/my-actions/reporting/reporting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__home_my_actions_prioritise_prioritise_service__ = __webpack_require__("./client/app/home/my-actions/prioritise/prioritise.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__shared_services_reporting_service__ = __webpack_require__("./client/app/shared/services/reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__home_my_actions_capture_capture_service__ = __webpack_require__("./client/app/home/my-actions/capture/capture.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__home_my_actions_reporting_reporting_service__ = __webpack_require__("./client/app/home/my-actions/reporting/reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__shared_characteristic_status_characteristic_status_component__ = __webpack_require__("./client/app/shared/characteristic-status/characteristic-status.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_16__authentification_registration_registration_component__["a" /* RegistrationComponent */],
                __WEBPACK_IMPORTED_MODULE_12__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_14__authentification_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_7__home_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_10__authentification_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_23__authentification_terms_conditions_terms_conditions_component__["a" /* TermsConditionsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__authentification_registration_settings_registration_settings_component__["a" /* RegistrationSettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_22__home_standards_standards_component__["a" /* StandardsComponent */],
                __WEBPACK_IMPORTED_MODULE_11__shared_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_36__home_performance_indicators_indicator_data_set_indicator_data_set_component__["a" /* IndicatorDataSetComponent */],
                __WEBPACK_IMPORTED_MODULE_37__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_component__["a" /* IndicatorDataSetValueComponent */],
                __WEBPACK_IMPORTED_MODULE_28__home_assessment_assessment_capture_full_assessment_capture_full_component__["a" /* AssessmentCaptureFullComponent */],
                __WEBPACK_IMPORTED_MODULE_29__home_assessment_assessment_current_status_assessment_current_status_component__["a" /* AssessmentCurrentStatusComponent */],
                __WEBPACK_IMPORTED_MODULE_31__home_assessment_assessment_capture_light_assessment_capture_light_component__["a" /* AssessmentCaptureLightComponent */],
                __WEBPACK_IMPORTED_MODULE_30__home_assessment_assessment_state_assessment_state_component__["a" /* AssessmentStateComponent */],
                __WEBPACK_IMPORTED_MODULE_39__home_assessment_assessment_reporting_assessment_reporting_component__["a" /* AssessmentReportingComponent */],
                __WEBPACK_IMPORTED_MODULE_41__home_performance_indicators_indicator_reporting_indicator_reporting_component__["a" /* IndicatorReportingComponent */],
                __WEBPACK_IMPORTED_MODULE_43__shared_element_width_directive__["a" /* ElementWidthDirective */],
                __WEBPACK_IMPORTED_MODULE_44__shared_replace_line_breaks_pipe__["a" /* ReplaceLineBreaksPipe */],
                __WEBPACK_IMPORTED_MODULE_47__home_my_actions_current_status_current_status_component__["a" /* MyActionsCurrentStatusComponent */],
                __WEBPACK_IMPORTED_MODULE_48__home_my_actions_capture_capture_component__["a" /* MyActionsCaptureComponent */],
                __WEBPACK_IMPORTED_MODULE_49__home_my_actions_prioritise_prioritise_component__["a" /* MyActionsPrioritiseComponent */],
                __WEBPACK_IMPORTED_MODULE_50__home_my_actions_reporting_reporting_component__["a" /* MyActionsReportingComponent */],
                __WEBPACK_IMPORTED_MODULE_55__shared_characteristic_status_characteristic_status_component__["a" /* CharacteristicStatusComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__bluenorth_routing_module__["a" /* BluenorthRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_45__user_profile_user_profile_module__["UserProfileModule"],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_46__shared_shared_module__["a" /* SharedModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_guard_service__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_resolver_service__["a" /* AuthResolverService */],
                __WEBPACK_IMPORTED_MODULE_32__home_assessment_assessment_capture_full_assessment_capture_full_service__["a" /* AssessmentCaptureFullService */],
                __WEBPACK_IMPORTED_MODULE_34__home_assessment_assessment_capture_light_assessment_capture_light_service__["a" /* AssessmentCaptureLightService */],
                __WEBPACK_IMPORTED_MODULE_40__home_assessment_assessment_reporting_assessment_reporting_service__["a" /* AssessmentReportingService */],
                __WEBPACK_IMPORTED_MODULE_33__home_assessment_assessment_state_assessment_state_service__["a" /* AssessmentStateService */],
                __WEBPACK_IMPORTED_MODULE_35__shared_services_commodity_service__["a" /* CommodityService */],
                __WEBPACK_IMPORTED_MODULE_8__home_dashboard_dashboard_service__["a" /* DashboardService */],
                __WEBPACK_IMPORTED_MODULE_9__authentification_forgot_password_forgot_password_service__["a" /* ForgotPasswordService */],
                __WEBPACK_IMPORTED_MODULE_13__home_home_service__["a" /* HomeService */],
                __WEBPACK_IMPORTED_MODULE_38__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_service__["a" /* IndicatorDataSetValueService */],
                __WEBPACK_IMPORTED_MODULE_42__home_performance_indicators_indicator_reporting_indicator_reporting_service__["a" /* IndicatorReportingService */],
                __WEBPACK_IMPORTED_MODULE_15__shared_services_local_storage_service__["a" /* LocalStorageService */],
                __WEBPACK_IMPORTED_MODULE_51__home_my_actions_prioritise_prioritise_service__["a" /* MyActionsPrioritiseService */],
                __WEBPACK_IMPORTED_MODULE_17__authentification_registration_registration_service__["a" /* RegistrationService */],
                __WEBPACK_IMPORTED_MODULE_19__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
                __WEBPACK_IMPORTED_MODULE_52__shared_services_reporting_service__["a" /* ReportingService */],
                __WEBPACK_IMPORTED_MODULE_21__home_standards_standards_service__["a" /* StandardsService */],
                __WEBPACK_IMPORTED_MODULE_24__shared_services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_25__shared_services_unit_service__["a" /* UnitService */],
                __WEBPACK_IMPORTED_MODULE_20__shared_services_questions_service__["a" /* QuestionsService */],
                __WEBPACK_IMPORTED_MODULE_26__shared_services_unit_item_service__["a" /* UnitItemService */],
                __WEBPACK_IMPORTED_MODULE_27__angular_common__["UpperCasePipe"],
                __WEBPACK_IMPORTED_MODULE_53__home_my_actions_capture_capture_service__["a" /* MyActionsCaptureService */],
                __WEBPACK_IMPORTED_MODULE_54__home_my_actions_reporting_reporting_service__["a" /* MyActionsReportingService */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["CUSTOM_ELEMENTS_SCHEMA"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NO_ERRORS_SCHEMA"]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./client/app/authentification/forgot-password/forgot-password.component.html":
/***/ (function(module, exports) {

module.exports = "<bluenorth-header></bluenorth-header>\r\n<div class=\"forgot-background\">\r\n<div class=\"forgot-container\">\r\n  <form class=\"forgot-form\" (submit)=\"postForgotPassword($event)\">\r\n    <h4>FORGOT YOUR PASSWORD?</h4>\r\n    <span class=\"login-registration\">Enter your email address below and we'll get you back on track.</span>\r\n    <dx-form id=\"form\"\r\n      labelLocation=\"right\"\r\n      [formData]=\"forgotPassword\"\r\n      [readOnly]=\"false\"\r\n      [showColonAfterLabel]=\"false\"\r\n      [showValidationSummary]=\"true\"\r\n      validationGroup=\"customerData\">\r\n      <dxi-item dataField=\"email\"\r\n        [editorOptions]=\"{ placeholder: 'YOUR EMAIL ADDRESS' }\">\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Emai is required\">\r\n        </dxi-validation-rule>\r\n        <dxi-validation-rule\r\n          type=\"pattern\"\r\n          [pattern]=\"emailPattern\"\r\n          message=\"Enter valid Email\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n    </dx-form>\r\n    <br/>\r\n    <dx-button\r\n      text=\"REQUEST RESET LINK\"\r\n      type=\"success\"\r\n      validationGroup=\"customerData\"\r\n      [useSubmitBehavior]=\"true\">\r\n    </dx-button>\r\n    <a class=\"login-registration notes-position\" [routerLink]=\"['/login']\">Back to sign in</a>\r\n  </form>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/authentification/forgot-password/forgot-password.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.forgot-background {\n  background: url('login-background.3351ea44af2378d2cd27.jpg');\n  background-size: cover;\n  width: 100%;\n  height: calc(100vh - 0px); }\n.forgot-container {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -ms-grid-columns: minmax(300px, 34%);\n      grid-template-columns: minmax(300px, 34%); }\n.forgot-container h4 {\n    color: #3282B9;\n    margin-bottom: 20px; }\n.forgot-container /deep/ form {\n    /*width: 60%;\r\n  margin-left: auto;\r\n  margin-right: auto;*/\n    border-right: 10px solid #6BCDFD;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    background-color: #fff;\n    padding: 50px;\n    display: -ms-grid;\n    display: grid; }\n.forgot-container .forgot-form {\n    padding-top: 44px; }\n.forgot-container dx-form {\n    margin-top: 12px; }\n.forgot-container .dx-overlay-content .dx-toast-success .dx-toast-content .dx-resizable {\n    width: 50px; }\n.forgot-container /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 194px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    -ms-grid-column-align: right;\n        justify-self: right;\n    margin-right: 20px;\n    margin-bottom: 12px;\n    height: 33px;\n    font-weight: normal; }\n.forgot-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.forgot-container .login-registration {\n    font-size: 12px;\n    margin-bottom: 15px; }\n.forgot-container .notes-position {\n    -ms-grid-column-align: right;\n        justify-self: right;\n    margin-right: 20px; }\n@media screen and (max-width: 768px) {\n  .forgot-container {\n    width: 100% !important; }\n    .forgot-container form {\n      min-width: inherit; } }\n"

/***/ }),

/***/ "./client/app/authentification/forgot-password/forgot-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forgot_password_service__ = __webpack_require__("./client/app/authentification/forgot-password/forgot-password.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_models_form_validation_model__ = __webpack_require__("./client/app/shared/models/form-validation.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify__ = __webpack_require__("./node_modules/devextreme/ui/notify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
        this.emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.emailPattern = __WEBPACK_IMPORTED_MODULE_2__shared_models_form_validation_model__["a" /* FormValidation */].prototype.getEmailPattern();
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPassword = this.forgotPasswordService.getForgotPassword();
    };
    ForgotPasswordComponent.prototype.postForgotPassword = function (e) {
        var _this = this;
        console.log(this.forgotPassword);
        this.forgotPasswordService.postEmailForgotPassword(this.forgotPassword.email)
            .subscribe(function (response) {
            __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default()({
                message: "We sent you url for password reset via " + _this.forgotPassword.email + ". Plz check your mailbox",
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                position: {
                    my: 'top center',
                    at: 'top center',
                }
            }, 'success', 100000);
            console.log(response);
        });
        e.preventDefault();
    };
    ForgotPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-forgot-password',
            template: __webpack_require__("./client/app/authentification/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__("./client/app/authentification/forgot-password/forgot-password.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__forgot_password_service__["a" /* ForgotPasswordService */]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());

/*We sent you url for password reset via {entered_e-mail}. Plz check your mailbox"*/


/***/ }),

/***/ "./client/app/authentification/forgot-password/forgot-password.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var forgotPassword = {
    'email': ''
};
var ForgotPasswordService = (function () {
    function ForgotPasswordService(httpClient) {
        this.httpClient = httpClient;
    }
    ForgotPasswordService.prototype.getForgotPassword = function () {
        return forgotPassword;
    };
    ForgotPasswordService.prototype.postEmailForgotPassword = function (email) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Account/ResetPassword?email={email}", email, { observe: 'response' });
    };
    ForgotPasswordService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], ForgotPasswordService);
    return ForgotPasswordService;
}());



/***/ }),

/***/ "./client/app/authentification/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<bluenorth-header></bluenorth-header>\r\n<div class=\"login-background\">\r\n  <div class=\"login-container\">\r\n    <form class=\"login-form\" (submit)=\"login($event)\" dx-group-column-count=\"2\">\r\n      <h4>SIGN IN</h4>\r\n      <p class=\"login-text\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has\r\n        been the industry's.</p>\r\n      <span class=\"notation-alignment\">All fileds marked <i class=\"asterisk\">*</i> are mandatory.</span>\r\n      <dx-form id=\"form\"\r\n        #loginForm\r\n        class=\"form-position\"\r\n        labelLocation=\"right\"\r\n        [formData]=\"loginInfo\"\r\n        [readOnly]=\"false\"\r\n        [showColonAfterLabel]=\"false\"\r\n        [showValidationSummary]=\"true\"\r\n        validationGroup=\"customerData\">\r\n        <dxi-item dataField=\"username\"\r\n          [editorOptions]=\"{ placeholder: 'E-MAIL' }\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Username is required\">\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n        <dxi-item class=\"forgot-password-container\"><a class=\"forgot-password\" [routerLink]=\"['/forgot-password']\">Forgot\r\n          Password?</a></dxi-item>\r\n        <dxi-item dataField=\"password\"\r\n          [editorOptions]=\"{ placeholder: 'PASSWORD' , mode: 'password'}\">\r\n        </dxi-item>\r\n      </dx-form>\r\n      <dx-button\r\n        type=\"success\"\r\n        validationGroup=\"customerData\"\r\n        [useSubmitBehavior]=\"true\">\r\n        <div *dxTemplate=\"let data of 'content'\">\r\n          <dx-load-indicator class='button-indicator'\r\n            height=\"20\" width=\"20\" color=\"#fff\"\r\n            [visible]=\"loadIndicatorVisible\">\r\n          </dx-load-indicator>\r\n          <span class='button-text'>{{buttonText}}</span>\r\n        </div>\r\n      </dx-button>\r\n\r\n      <span class=\"login-registration notation-alignment\">Don't have an account?\r\n      <a [routerLink]=\"['/registration']\">Register here</a>\r\n    </span>\r\n    </form>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/authentification/login/login.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.login-background {\n  background: url('login-background.3351ea44af2378d2cd27.jpg');\n  background-size: cover;\n  width: 100%;\n  height: calc(100vh - 0px); }\n.login-container {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n.login-container .login-form {\n    padding-top: 44px; }\n.login-container .notation-alignment {\n    font-size: 11px;\n    -ms-grid-column-align: right;\n        justify-self: right;\n    margin-right: 20px; }\n.login-container .notation-alignment .asterisk {\n      color: red; }\n.login-container .login-text {\n    font-size: 12px;\n    margin-bottom: 10px; }\n.login-container h4 {\n    color: #3282B9;\n    margin-bottom: 22px; }\n.login-container .form-position {\n    margin: 30px 0; }\n.login-container /deep/ form {\n    /*width: 60%;\r\n  margin-left: auto;\r\n  margin-right: auto;*/\n    border-right: 10px solid #6BCDFD;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    background-color: #fff;\n    padding: 50px;\n    display: -ms-grid;\n    display: grid;\n    overflow: hidden;\n    max-width: 655px;\n    padding: 50px; }\n.login-container /deep/ form .dx-layout-manager .dx-field-item:not(.dx-first-row) {\n      padding-top: 0; }\n@media all and (max-width: 768px) {\n    .login-container /deep/ form {\n      max-width: 400px;\n      padding: 30px; } }\n@media all and (max-width: 500px) {\n    .login-container /deep/ form {\n      max-width: 100%;\n      padding: 20px; } }\n.login-container /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 170px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    -ms-grid-column-align: right;\n        justify-self: right;\n    margin-right: 20px;\n    margin-top: -6px;\n    margin-bottom: 12px;\n    height: 33px; }\n.login-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.login-container /deep/ dx-button .button-text {\n      font-size: 14px;\n      padding: 0; }\n.login-container /deep/ dx-load-indicator {\n    vertical-align: top; }\n.login-container /deep/ dx-load-indicator .dx-loadindicator-icon {\n      display: -webkit-inline-box;\n      display: -ms-inline-flexbox;\n      display: inline-flex; }\n.login-container /deep/ dx-load-indicator .dx-loadindicator-icon .dx-loadindicator-segment {\n        background: #fff;\n        left: 0;\n        top: 0; }\n.login-container .forgot-password-container dxi-item {\n    padding-top: 0; }\n.login-container .forgot-password-container .forgot-password {\n    font-size: 11px;\n    display: block;\n    margin-top: 15px;\n    -ms-grid-column-align: right;\n        justify-self: right;\n    text-decoration: none;\n    float: right;\n    margin-right: 20px; }\n@media screen and (max-width: 600px) {\n  /deep/ form {\n    margin: 0;\n    width: 100% !important; } }\n.wrapper {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n.dx-button .dx-button-content {\n  padding: 0 !important; }\n"

/***/ }),

/***/ "./client/app/authentification/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__("./client/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_local_storage_service__ = __webpack_require__("./client/app/shared/services/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_devextreme_ui_validation_engine__ = __webpack_require__("./node_modules/devextreme/ui/validation_engine.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_devextreme_ui_validation_engine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_devextreme_ui_validation_engine__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = (function () {
    function LoginComponent(router, authService, userService, localStorageService) {
        this.router = router;
        this.authService = authService;
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.buttonText = "LOGiN";
        this.loadIndicatorVisible = false;
        this.loading = false;
        this.password = '';
        this.passwordOptions = {
            mode: 'password',
            value: this.password
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.authService.logout();
        this.loginInfo = this.authService.getLoginInfo();
        console.log(this.loginInfo);
    };
    LoginComponent.prototype.login = function (e) {
        var _this = this;
        this.loadIndicatorVisible = true;
        this.buttonText = "LOGIN..";
        this.loading = true;
        var body = "grant_type=password&username=" + this.loginInfo.username + "&password=" + this.loginInfo.password;
        this.authService.login(body).subscribe(function (response) {
            setTimeout(function () {
            }, 0);
            _this.localStorageService.remove('access_token');
            _this.localStorageService.set('access_token', response.body['access_token']);
            _this.localStorageService.set('token_expires', (response.body['.expires']));
            _this.localStorageService.set('current_user', _this.loginInfo.username);
            console.log(response);
            //this.router.navigate(['dashboard']);
            _this.userService.getUserRole()
                .subscribe(function (user) {
                _this.loadIndicatorVisible = false;
                _this.buttonText = "LOGIN";
                console.log('user', user);
                _this.userRole = user;
                if (!_this.userRole) {
                    _this.userService.showUserNotification("can't get User Role", 'error');
                }
                if (_this.userRole === 'User' && !_this.userService.isOrganisationNull) {
                    if (_this.userService.currentUnitId !== '') {
                        _this.router.navigate(['dashboard']);
                    }
                    else {
                        _this.router.navigate(['profile/business-unit']);
                    }
                }
                if (_this.userRole === 'User' && _this.userService.isOrganisationNull) {
                    _this.router.navigate(['units']);
                }
                if (_this.userRole === 'Administrators') {
                    window.location.href = __WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].adminUrl;
                }
                _this.loginForm.instance.resetValues();
                __WEBPACK_IMPORTED_MODULE_7_devextreme_ui_validation_engine___default.a.resetGroup('customerData');
            });
        }, function (error) {
            _this.userService.showUserNotification(error.error.error_description, 'error');
        });
        e.preventDefault();
    };
    LoginComponent.prototype.onClick = function (data) {
        var _this = this;
        this.buttonText = "Sending";
        this.loadIndicatorVisible = true;
        setTimeout(function () {
            _this.buttonText = "Send";
            _this.loadIndicatorVisible = false;
        }, 2000);
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('loginForm'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxFormComponent"])
    ], LoginComponent.prototype, "loginForm", void 0);
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-login',
            template: __webpack_require__("./client/app/authentification/login/login.component.html"),
            styles: [__webpack_require__("./client/app/authentification/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_local_storage_service__["a" /* LocalStorageService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./client/app/authentification/registration-settings/registration-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<bluenorth-header></bluenorth-header>\r\n<div class=\"registration-settings-background\">\r\n<div class=\"registration-settings-container\">\r\n  <div id=\"tabs\" class=\"tabs-container\">\r\n    <dx-tabs\r\n      #apiTabs\r\n      [dataSource]=\"tabs\"\r\n      [selectedIndex]=\"0\"\r\n      (onItemClick)=\"selectTab($event)\"\r\n    ></dx-tabs>\r\n    <div *ngIf=\"itemIndex===0\">\r\n      <form (submit)=\"onFormSubmitCreateOrganisation($event)\" dx-group-column-count=\"2\">\r\n        <span class=\"registration-mandatory\">All fields marked * are mandatory.</span>\r\n        <dx-form id=\"form\" #organisationForm\r\n          labelLocation=\"right\"\r\n          [formData]=\"setupOrganisation\"\r\n          [readOnly]=\"false\"\r\n          [showColonAfterLabel]=\"true\"\r\n          [showValidationSummary]=\"true\"\r\n          validationGroup=\"setupOrganisation\">\r\n          <dxi-item dataField=\"organisationName\"\r\n            [editorOptions]=\"{ placeholder: 'ORGANISATION NAME'}\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Organisation name is required\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n          <dxi-item itemType=\"group\" class=\"address\" caption=\"ADDRESS\">\r\n            <dxi-item dataField=\"organisationStreet\"\r\n              [editorOptions]=\"{ placeholder: 'STREET'}\">\r\n              <dxi-validation-rule\r\n                type=\"required\"\r\n                message=\"Street is required\">\r\n              </dxi-validation-rule>\r\n            </dxi-item>\r\n            <dxi-item dataField=\"organisationCity\"\r\n              [editorOptions]=\"{ placeholder: 'CITY'}\">\r\n              <dxi-validation-rule\r\n                type=\"required\"\r\n                message=\"City is required\">\r\n              </dxi-validation-rule>\r\n            </dxi-item>\r\n            <dxi-item dataField=\"stateProvince\"\r\n              [editorOptions]=\"{ placeholder: 'STATE PROVINCE'}\">\r\n              <dxi-validation-rule\r\n                type=\"required\"\r\n                message=\"Province is required\">\r\n              </dxi-validation-rule>\r\n            </dxi-item>\r\n            <!--<dxi-item dataField=\"country\" *ngIf=\"countriesInfo\">\r\n              <dx-select-box [dataSource]=\"countriesInfo\"\r\n                [value]=\"countriesInfo.length === 1 ? countriesInfo[0].Oid : ''\"\r\n                valueExpr=\"Oid\"\r\n                displayExpr=\"Name\"\r\n                placeholder=\"SELECT COUNTRY\"\r\n                (onSelectionChanged)=\"getCountryValueForOrganisation($event)\">\r\n              </dx-select-box>\r\n            </dxi-item>-->\r\n          </dxi-item>\r\n            <dxi-item\r\n              [template]=\"'countryTemplate'\">\r\n            </dxi-item>\r\n            <div *dxTemplate=\"let data of 'countryTemplate'\">\r\n              <dx-select-box #countrySelector\r\n                             [items]=\"countriesInfo\"\r\n                             displayExpr=\"Name\"\r\n                             [value]=\"countriesInfo.length === 1 ? countriesInfo[0].Oid : ''\"\r\n                             placeholder=\"SELECT COUNTRY\"\r\n                             valueExpr=\"Oid\"\r\n                             (onSelectionChanged)=\"getCountryValueForOrganisation($event)\">\r\n              </dx-select-box>\r\n            </div>\r\n\r\n          <dxi-item dataField=\"phoneNumber\"\r\n                    [disabled]=\"phoneCode === ''\"\r\n                    [editorOptions]=\"{\r\n                    placeholder: 'TELEPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-999',\r\n                    useMaskedValue: true\r\n                }\">\r\n          </dxi-item>\r\n        </dx-form>\r\n        <br/>\r\n        <dx-button\r\n          text=\"NEXT\"\r\n          type=\"success\"\r\n          validationGroup=\"setupOrganisation\"\r\n          [useSubmitBehavior]=\"true\">\r\n        </dx-button>\r\n      </form>\r\n    </div>\r\n\r\n    <div *ngIf=\"itemIndex===1\">\r\n      <form (submit)=\"onFormSubmitAddUnit($event)\">\r\n        <dx-form #unitForm\r\n          (onFieldDataChanged)=\"onFieldDataChanged($event)\"\r\n          labelLocation=\"right\"\r\n          [(formData)]=\"unitInfo\"\r\n          [readOnly]=\"false\"\r\n          [showColonAfterLabel]=\"true\"\r\n          [showValidationSummary]=\"true\"\r\n          validationGroup=\"businessUnit\">\r\n          <dxi-item dataField=\"UnitName\"\r\n            [editorOptions]=\"{ placeholder: 'BUSINESS UNIT NAME  ( eg Farm Name, Packhouse name, etc) '}\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Business Unit Name is required\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n\r\n          <dxi-item dataField=\"UnitTypeId\"\r\n            editorType=\"dxSelectBox\"\r\n            [editorOptions]=\"unitTypeBoxOptions\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Type of business is required\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n\r\n          <dxi-item dataField=\"UnitStructure\"\r\n            editorType=\"dxSelectBox\"\r\n            [editorOptions]=\"unitStructureBoxOptions\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Unit Structure is required\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n\r\n          <dxi-item dataField=\"ResponsibleName\"\r\n            [editorOptions]=\"{ placeholder: 'NAME OF PERSON RESPONSIBLE FOR THIS UNIT '}\">\r\n          </dxi-item>\r\n          <dxi-item dataField=\"ResponsibleSurname\"\r\n            [editorOptions]=\"{ placeholder: 'LAST NAME OF PERSON RESPONSIBLE FOR THIS UNIT '}\">\r\n          </dxi-item>\r\n          <dxi-item dataField=\"ResponsibleEmail\"\r\n            [editorOptions]=\"{ placeholder: 'EMAIL OF PERSON RESPONSIBLE FOR THIS UNIT '}\">\r\n\r\n            <dxi-validation-rule\r\n              type=\"pattern\"\r\n              [pattern]=\"emailPattern\"\r\n              message=\"Enter valid Email\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n          <dxi-item\r\n            [template]=\"'countryTemplate'\">\r\n          </dxi-item>\r\n          <div *dxTemplate=\"let data of 'countryTemplate'\">\r\n            <dx-select-box #countryUnitSelector\r\n                           [items]=\"countriesInfo\"\r\n                           displayExpr=\"Name\"\r\n                           placeholder=\"SELECT COUNTRY\"\r\n                           valueExpr=\"Oid\"\r\n                           [value]=\"unitInfo.UnitCountryId\"\r\n                           (onSelectionChanged)=\"getCountryValueForUnit($event, countryUnitSelector)\">\r\n\r\n            <dx-validator validationGroup=\"businessUnit\">\r\n              <dxi-validation-rule\r\n                type=\"required\"\r\n                message=\"Country is required\">\r\n              </dxi-validation-rule>\r\n            </dx-validator>\r\n            </dx-select-box>\r\n          </div>\r\n          <dxi-item dataField=\"ResponsibleMobile\" [disabled]=\"phoneCode === ''\"\r\n            [editorOptions]=\"{\r\n                    placeholder: 'TELEPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-9999',\r\n                    useMaskedValue: true\r\n                }\">\r\n          </dxi-item>\r\n          <dxi-item dataField=\"ResponsiblePhone\" [disabled]=\"phoneCode === ''\"\r\n            [editorOptions]=\"{\r\n                    placeholder: 'CELLPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-999',\r\n                    useMaskedValue: true\r\n                }\">\r\n          </dxi-item>\r\n          <dxi-item dataField=\"UnitCommodityId\"\r\n            editorType=\"dxSelectBox\"\r\n            [editorOptions]=\"commoditiesBoxOptions\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Commodity is required\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n          <dxi-item>\r\n            <span (click)=\"isCommodityPopupVisible = true\" class=\"link-style\">+<a>Add own commodity</a></span>\r\n          </dxi-item>\r\n          <dxi-item dataField=\"FrameworkId\"\r\n            editorType=\"dxSelectBox\"\r\n            [editorOptions]=\"frameworkBoxOptions\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Framework is required\">\r\n            </dxi-validation-rule>\r\n          </dxi-item>\r\n          <dxi-item dataField=\"Standards\"\r\n            [template]=\"'standardTemplate'\"></dxi-item>\r\n          <div *dxTemplate=\"let data of 'standardTemplate'\">\r\n            <dx-tag-box #multySelector\r\n              [items]=\"standardsInfo\"\r\n              [value]=\"unitInfo.Standards\"\r\n              displayExpr=\"Title\"\r\n              placeholder=\"SELECT STANDARDS\"\r\n              [disabled]=\"!ifFrameworkSelected\"\r\n              valueExpr=\"OID\">\r\n            </dx-tag-box>\r\n          </div>\r\n          <dxi-item dataField=\"Suppliers\"\r\n            [template]=\"'supplierTemplate'\">\r\n          </dxi-item>\r\n          <div *dxTemplate=\"let data of 'supplierTemplate'\">\r\n            <dx-tag-box #multySelectorSupplier\r\n                        [items]=\"supplierInfo\"\r\n                        displayExpr=\"Title\"\r\n                        placeholder=\"SELECT SUPPLIER\"\r\n                        valueExpr=\"OID\">\r\n              <dx-validator validationGroup=\"businessUnit\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Supplier is required\">\r\n                </dxi-validation-rule>\r\n              </dx-validator>\r\n            </dx-tag-box>\r\n          </div>\r\n          <dxi-item dataField=\"Retailers\"\r\n            [template]=\"'retailerTemplate'\">\r\n          </dxi-item>\r\n          <div *dxTemplate=\"let data of 'retailerTemplate'\">\r\n            <dx-tag-box #multySelectorRetailer\r\n                        [items]=\"retailerInfo\"\r\n                        displayExpr=\"Title\"\r\n                        placeholder=\"ADD RETAILER\"\r\n                        valueExpr=\"OID\">\r\n              <dx-validator validationGroup=\"businessUnit\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Retailer is required\">\r\n                </dxi-validation-rule>\r\n              </dx-validator>\r\n            </dx-tag-box>\r\n          </div>\r\n         <!-- <dxi-item dataField=\"UnitSupplierId\"\r\n            editorType=\"dxSelectBox\"\r\n            [editorOptions]=\"supplierBoxOptions\">\r\n          </dxi-item>-->\r\n          <dxi-item>\r\n            <span (click)=\"isSupplierPopupVisible = true\" class=\"link-style\">+<a>Add own supplier</a></span>\r\n          </dxi-item>\r\n        </dx-form>\r\n        <dx-validation-group validationGroup=\"businessUnit\">\r\n          <div class=\"questions-container\" *ngFor=\"let question of questionsWithAnswers let index = index\">\r\n            <div>{{question.question}}</div>\r\n            <div>\r\n              <dx-number-box\r\n                [(value)]=\"question.answer\"\r\n                [showSpinButtons]=\"true\"\r\n                [min]=\"0\">\r\n              </dx-number-box>\r\n            </div>\r\n          </div>\r\n          <dx-validation-summary></dx-validation-summary>\r\n        </dx-validation-group>\r\n        <h5 class=\"map-title\">BUSINESS UNIT LOCATION</h5>\r\n        <div class=\"dx-textbox dx-texteditor dx-widget dx-texteditor-masked map-container\">\r\n          <div class=\"dx-texteditor-container\">\r\n            <input placeholder=\"Add Address of Your Organisation\" autocorrect=\"off\" autocapitalize=\"off\"\r\n              spellcheck=\"off\" type=\"text\"\r\n              class=\"search-location\" #search [formControl]=\"searchControl\">\r\n          </div>\r\n        </div>\r\n        <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n          <agm-marker [latitude]=\"latitude\"\r\n                      [longitude]=\"longitude\"\r\n                      [markerDraggable]=\"true\"\r\n                      (dragEnd)=\"markerDragEnd($event)\"></agm-marker>\r\n        </agm-map>\r\n        <br/>\r\n        <dx-button\r\n          #continueButton\r\n          (onClick)=\"changeTabIndicator = true\"\r\n          validationGroup=\"businessUnit\"\r\n          [useSubmitBehavior]=\"true\"\r\n          class=\"continue-btn\"\r\n          text=\"SAVE and CONTINUE\"\r\n          type=\"success\">\r\n        </dx-button>\r\n        <dx-button\r\n          #addAnotherButton\r\n          (onClick)=\"changeTabIndicator = false\"\r\n          class=\"add-unit-btn\"\r\n          text=\"Save and add Another Business Unit\"\r\n          type=\"success\"\r\n          validationGroup=\"businessUnit\"\r\n          [useSubmitBehavior]=\"true\">\r\n        </dx-button>\r\n      </form>\r\n      <dx-popup\r\n        [width]=\"600\"\r\n        [height]=\"250\"\r\n        [showTitle]=\"true\"\r\n        title=\"Add new Commodity\"\r\n        [dragEnabled]=\"false\"\r\n        [closeOnOutsideClick]=\"true\"\r\n        [(visible)]=\"isCommodityPopupVisible\">\r\n        <div *dxTemplate=\"let data of 'content'\">\r\n          <form class=\"commodity-create-form\" (submit)=\"onFormSubmitCreateCommodity($event)\">\r\n            <dx-form\r\n              [formData]=\"newCommodity\"\r\n              [readOnly]=\"false\"\r\n              [showColonAfterLabel]=\"true\"\r\n              [showValidationSummary]=\"true\"\r\n              validationGroup=\"addCommodity\">\r\n              <dxi-item dataField=\"Title\"\r\n                [editorOptions]=\"{placeholder: 'ADD TITLE'}\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Title is required\">\r\n                </dxi-validation-rule>\r\n              </dxi-item>\r\n              <dxi-item dataField=\"Reference\"\r\n                [editorOptions]=\"{placeholder: 'ADD REFERENCE'}\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Reference is required\">\r\n                </dxi-validation-rule>\r\n              </dxi-item>\r\n            </dx-form>\r\n            <dx-button validationGroup=\"addCommodity\"\r\n              [useSubmitBehavior]=\"true\"\r\n              class=\"continue-btn\"\r\n              text=\"Add Commodity\"\r\n              type=\"success\">\r\n            </dx-button>\r\n          </form>\r\n        </div>\r\n      </dx-popup>\r\n      <dx-popup\r\n        [width]=\"600\"\r\n        [height]=\"300\"\r\n        [showTitle]=\"true\"\r\n        title=\"Add new Supplier\"\r\n        [dragEnabled]=\"false\"\r\n        [closeOnOutsideClick]=\"true\"\r\n        [(visible)]=\"isSupplierPopupVisible\">\r\n        <div *dxTemplate=\"let data of 'content'\">\r\n          <form class=\"commodity-create-form supplier-edit-form\" (submit)=\"onFormSubmitCreateSupplier($event)\">\r\n            <dx-form\r\n              [formData]=\"newSupplier\"\r\n              [readOnly]=\"false\"\r\n              [showColonAfterLabel]=\"true\"\r\n              [showValidationSummary]=\"true\"\r\n              validationGroup=\"addSupplier\">\r\n              <dxi-item dataField=\"Title\"\r\n                [editorOptions]=\"{placeholder: 'ADD TITLE'}\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Title is required\">\r\n                </dxi-validation-rule>\r\n              </dxi-item>\r\n              <dxi-item dataField=\"ShortTitle\"\r\n                [editorOptions]=\"{placeholder: 'ADD SHORT TITLE'}\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Short title is required\">\r\n                </dxi-validation-rule>\r\n              </dxi-item>\r\n              <dxi-item dataField=\"Description\"\r\n                editorType=\"dxTextArea\"\r\n                [editorOptions]=\"{placeholder: 'ADD DESCRIPTION'}\">\r\n                <dxi-validation-rule\r\n                  type=\"required\"\r\n                  message=\"Description is required\">\r\n                </dxi-validation-rule>\r\n              </dxi-item>\r\n            </dx-form>\r\n            <dx-button validationGroup=\"addSupplier\"\r\n              [useSubmitBehavior]=\"true\"\r\n              class=\"continue-btn\"\r\n              text=\"Add Supplier\"\r\n              type=\"success\">\r\n            </dx-button>\r\n          </form>\r\n        </div>\r\n      </dx-popup>\r\n    </div>\r\n    <div *ngIf=\"itemIndex===2\">\r\n      <form>\r\n        <dx-button\r\n          class=\"add-unit-btn back-btn\"\r\n          text=\"BACK TO BUSSINESS UNIT\"\r\n          type=\"success\"\r\n          (onClick)=\"backToBusinessUnit()\">\r\n        </dx-button>\r\n        <div class=\"subscription-notification-container\">\r\n          <p class=\"subscription-notification\">\r\n            Thank you for completing the online registration process.\r\n          </p>\r\n          <span class=\"subscription-notification-instruction\">\r\n    Please click below to log in into your 3 month trial account.\r\n     </span>\r\n        </div>\r\n        <dx-button\r\n          [routerLink]=\"['/dashboard']\"\r\n          class=\"continue-btn\"\r\n          text=\"Continue with free account\"\r\n          type=\"success\">\r\n        </dx-button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/authentification/registration-settings/registration-settings.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.registration-settings-background {\n  background: url('login-background.3351ea44af2378d2cd27.jpg');\n  background-size: cover;\n  width: 100%;\n  height: 100%;\n  display: table; }\n.registration-settings-container {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n.registration-settings-container h1 {\n    width: 60%; }\n.registration-settings-container .search-location {\n    width: 100%;\n    border: 0 none;\n    line-height: 30px; }\n.registration-settings-container .map-container {\n    margin-bottom: 15px;\n    margin-right: 20px; }\n.registration-settings-container .map-title {\n    font-size: 14px;\n    margin: 15px; }\n.registration-settings-container .add-unit-btn {\n    width: 42%;\n    font-size: 10px !important;\n    color: #6BCDFD;\n    background-color: #fff;\n    border: 2px solid #6BCDFD;\n    border-radius: 7px; }\n.registration-settings-container .add-unit-btn:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD; }\n.registration-settings-container .continue-btn {\n    width: 50%; }\n.registration-settings-container .back-btn {\n    width: 200px;\n    margin-bottom: 30px; }\n.registration-settings-container .tabs-container {\n    background-color: #fff;\n    margin-top: 80px;\n    border-right: 10px solid #6BCDFD;\n    max-width: 650px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n.registration-settings-container .registration-mandatory {\n    float: left;\n    margin-bottom: 15px;\n    font-size: 14px; }\n.registration-settings-container .dx-tabs {\n    border: none;\n    height: 100px; }\n.registration-settings-container .dx-tabs .dx-item .dx-tab .dx-tab-selected {\n      color: black !important; }\n@media all and (max-width: 600px) {\n    .registration-settings-container .dx-tabs {\n      height: auto; }\n      .registration-settings-container .dx-tabs /deep/ .dx-tab {\n        display: block; } }\n.registration-settings-container form {\n    margin-top: 50px;\n    /*width: 60%;\r\n  margin-left: auto;\r\n  margin-right: auto;*/\n    border-right: 10px solid #6BCDFD;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    background-color: #fff;\n    padding: 50px;\n    border: none; }\n.registration-settings-container form .dx-form-group-with-caption .dx-form-group {\n      margin-top: 15px !important; }\n.registration-settings-container form .dx-form-group-caption {\n      color: #9898A5;\n      font-size: 16px; }\n.registration-settings-container form .dx-form-group-with-caption {\n      margin-top: 15px; }\n@media all and (max-width: 600px) {\n    .registration-settings-container form {\n      margin-top: 20px;\n      padding: 0px 19px 25px; } }\n.registration-settings-container /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.registration-settings-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\nagm-map {\n  height: 300px; }\n.subscription-notification-container {\n  margin-bottom: 15px; }\n.subscription-notification-container .subscription-notification {\n    color: #3282B9; }\n.subscription-notification-container .subscription-notification-instruction {\n    font-size: 12px;\n    display: block; }\n.commodity-create-form {\n  text-align: center; }\n.commodity-create-form /deep/ dx-form {\n    margin-bottom: 35px; }\n.commodity-create-form /deep/ dx-button {\n    margin-top: 15px;\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.commodity-create-form /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.link-style {\n  float: right;\n  padding-right: 25px;\n  font-size: 12px;\n  color: #000;\n  font-style: italic;\n  cursor: pointer; }\n.link-style:hover {\n    color: #0000EE; }\n.link-style a {\n    color: #000;\n    text-decoration: underline; }\n.link-style a:hover {\n      color: #0000EE; }\n@media screen and (max-width: 1200px) {\n  .registration-settings-container form {\n    width: 100%; } }\n.address {\n  border: 1px solid #6BCDFD; }\n.supplier-edit-form /deep/ dx-form {\n  margin-bottom: 0; }\n.questions-container {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 4fr 1fr;\n      grid-template-columns: 4fr 1fr;\n  margin: 15px;\n  font-size: 13px; }\n/deep/ dx-tag-box[placeholder=\"ADD STANDARD\"],\n/deep/ dx-select-box[placeholder=\"SELECT COUNTRY\"] {\n  margin-right: 20px;\n  position: relative; }\n/deep/ dx-tag-box[placeholder=\"SELECT SUPPLIER\"]:after,\n/deep/ dx-tag-box[placeholder=\"ADD RETAILER\"]:after,\n/deep/ dx-select-box[placeholder=\"SELECT COUNTRY\"]:after {\n  content: \" *\";\n  position: absolute;\n  right: -20px;\n  top: 5px;\n  color: #ea4444;\n  display: inline-block; }\n/deep/ .dx-layout-manager .dx-label-h-align .dx-field-item-label .dx-field-item-label-content {\n  width: 0 !important; }\n/deep/ .agm-map-container-inner {\n  margin-right: 20px; }\n"

/***/ }),

/***/ "./client/app/authentification/registration-settings/registration-settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationSettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify__ = __webpack_require__("./node_modules/devextreme/ui/notify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_devextreme_ui_validation_engine__ = __webpack_require__("./node_modules/devextreme/ui/validation_engine.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_devextreme_ui_validation_engine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_devextreme_ui_validation_engine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_models_form_validation_model__ = __webpack_require__("./client/app/shared/models/form-validation.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_models_unit_model__ = __webpack_require__("./client/app/shared/models/unit.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_commodity_service__ = __webpack_require__("./client/app/shared/services/commodity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_profile_user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_questions_service__ = __webpack_require__("./client/app/shared/services/questions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_profile_user_profile_business_unit_item_user_profile_business_unit_item_service__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var RegistrationSettingsComponent = (function () {
    function RegistrationSettingsComponent(registrationSettingsService, userService, commodityService, mapsAPILoader, userProfileService, questionsService, userProfileBusinessUnitItemService, changeDetector, ngZone) {
        this.registrationSettingsService = registrationSettingsService;
        this.userService = userService;
        this.commodityService = commodityService;
        this.mapsAPILoader = mapsAPILoader;
        this.userProfileService = userProfileService;
        this.questionsService = questionsService;
        this.userProfileBusinessUnitItemService = userProfileBusinessUnitItemService;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.standardsInfo = [];
        this.ifFrameworkSelected = false;
        this.standardsOidArray = [];
        this.bussinesUnitInfo = [];
        this.businessUnitStructure = [];
        this.itemIndex = 0;
        this.unitInfo = {};
        this.countriesInfo = [];
        this.commodityInfo = [];
        this.supplierInfo = [];
        this.retailerInfo = [];
        this.frameworkInfo = [];
        this.isCommodityPopupVisible = false;
        this.isSupplierPopupVisible = false;
        this.phoneCode = '';
        this.questionsWithAnswers = [];
        this.questions = [];
        this.answersToPost = [];
        this.tabs = registrationSettingsService.getTabs();
        this.tabContent = this.tabs[0].content;
        this.setupOrganisation = this.registrationSettingsService.getSetupOrganisation();
        this.organisation = this.registrationSettingsService.getOrganisation();
        this.formValidation = new __WEBPACK_IMPORTED_MODULE_5__shared_models_form_validation_model__["a" /* FormValidation */]();
        this.phonePattern = this.formValidation.getPhonePattern();
        this.phoneRules = this.formValidation.getPhoneRules();
        this.emailPattern = this.formValidation.getEmailPattern();
        this.newCommodity = this.userProfileService.getNewCommodity();
        this.newSupplier = this.userProfileService.getNewSupplier();
    }
    RegistrationSettingsComponent.prototype.ngOnInit = function () {
        this.formInit();
    };
    RegistrationSettingsComponent.prototype.formInit = function () {
        var _this = this;
        var commodities$ = this.commodityService.getCommodities();
        this.businessUnitStructure = [
            { Name: 'Independent', Oid: __WEBPACK_IMPORTED_MODULE_8__shared_models_unit_model__["b" /* UnitStructure */].Independent },
            { Name: 'Cooperative', Oid: __WEBPACK_IMPORTED_MODULE_8__shared_models_unit_model__["b" /* UnitStructure */].Cooperative }
        ];
        this.unitStructureBoxOptions = {
            dataSource: this.businessUnitStructure,
            displayExpr: 'Name',
            valueExpr: 'Oid',
            placeholder: "ADD BUSINESS UNIT STRUCTURE"
        };
        var unitType$ = this.registrationSettingsService.getUnitType();
        var countriesList$ = this.userService.getCountriesList();
        var suppliers$ = this.registrationSettingsService.getSuppliers();
        var retailers$ = this.registrationSettingsService.getRetailers();
        __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__["Observable"].forkJoin([commodities$, unitType$, countriesList$, suppliers$, retailers$])
            .subscribe(function (result) {
            console.log('commodities', result[0]);
            _this.commodityInfo = result[0];
            _this.commoditiesBoxOptions = {
                dataSource: _this.commodityInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                placeholder: "SELECT PRIMARY COMMODITY"
            };
            _this.bussinesUnitInfo = result[1]['value'];
            _this.unitTypeBoxOptions = {
                dataSource: _this.bussinesUnitInfo,
                displayExpr: 'Name',
                valueExpr: 'OID',
                placeholder: "ADD TYPE OF BUSINESS UNIT"
            };
            _this.countriesInfo = result[2];
            console.log('this.countriesInfo', result[2]);
            var countriesValue;
            if (_this.countriesInfo && _this.countriesInfo.length === 1) {
                countriesValue = _this.countriesInfo[0].Oid;
            }
            _this.countryBoxOptions = {
                dataSource: _this.countriesInfo,
                displayExpr: 'Name',
                valueExpr: 'Oid',
                value: countriesValue,
                placeholder: "SELECT COUNTRY"
            };
            _this.supplierInfo = result[3];
            var value;
            if (_this.supplierInfo.length === 1) {
                value = _this.supplierInfo[0].OID;
            }
            _this.supplierBoxOptions = {
                dataSource: _this.supplierInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                value: value,
                placeholder: "SELECT SUPPLIER"
            };
            _this.retailerInfo = result[4];
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        /* this.questionsService.getQuestionsByGroup('scale')
           .subscribe((questions:any[]) => {
             console.log('questions', questions);
             this.questions = questions;
              this.questions.map( question => {
                let questionItem = {
                  questionId: question.OID,
                  question: question.Title,
                  answer: null
                };
                this.questionsWithAnswers.push(questionItem);
              });
             console.log('this.questionsWithAnswers', this.questionsWithAnswers);
           },
             error=> {
               this.userService.showUserNotification(error.error.Message, 'error');
             });*/
        this.apiTabs['disabled'] = true;
        this.userService.getUserInfo()
            .subscribe(function (userLight) {
            _this.userId = userLight.body['Oid'];
            if (userLight.body['OrganisationOid'] !== '') {
                _this.organisationOid = userLight.body['OrganisationOid'];
                _this.apiTabs['selectedIndex'] = 1;
                _this.itemIndex = 1;
                _this.setupGoogleMap();
            }
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    RegistrationSettingsComponent.prototype.setupGoogleMap = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        //create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    RegistrationSettingsComponent.prototype.getAddressFromCordinates = function (lat, lng) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({
            'location': latlng
        }, (function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    _this.searchElementRef.nativeElement.value = results[1].formatted_address;
                }
                else {
                    console.error('Geocoder failed due to: ' + status);
                }
            }
        }));
    };
    RegistrationSettingsComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
                console.log(_this.latitude);
                console.log(_this.longitude);
            });
        }
    };
    RegistrationSettingsComponent.prototype.markerDragEnd = function (event) {
        console.log('MARKER', event);
        this.getAddressFromCordinates(event.coords.lat, event.coords.lng);
        this.latitude = event.coords.lat;
        this.longitude = event.coords.lng;
    };
    RegistrationSettingsComponent.prototype.getCountryValueForOrganisation = function (value) {
        this.setupOrganisation.country = value.selectedItem.Oid;
        this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
    };
    RegistrationSettingsComponent.prototype.getCountryValueForUnit = function (value, selector) {
        console.log(value);
        console.log(selector);
        this.unitInfo.UnitCountryId = value.selectedItem.Oid;
        this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
    };
    RegistrationSettingsComponent.prototype.selectTab = function (e) {
        this.tabContent = this.tabs[e.itemIndex].content;
        console.log(e);
        this.itemIndex = e.itemIndex;
    };
    RegistrationSettingsComponent.prototype.onFormSubmitCreateOrganisation = function (e) {
        var _this = this;
        this.organisation.Organization.Name = this.setupOrganisation.organisationName;
        this.organisation.Organization.Party.Address.Street = this.setupOrganisation.organisationStreet;
        this.organisation.Organization.Party.Address.City = this.setupOrganisation.organisationCity;
        this.organisation.Organization.Party.Address.StateProvince = this.setupOrganisation.stateProvince;
        this.organisation.Organization.Party.Address.Country = this.setupOrganisation.country;
        this.organisation.Organization.Party.PhoneNumbers[0].Number = this.setupOrganisation.phoneNumber;
        this.registrationSettingsService.addOrUpdateOrganisation(this.organisation)
            .subscribe(function (organisation) {
            console.log('organisationresp', organisation);
            __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default()({
                message: "ORGANISATION \"" + _this.organisation.Organization.Name.toUpperCase() + "\" WAS CREATED.",
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                font: '16',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'success', 10000);
            _this.organisationOid = organisation;
            console.log('this.organisationOid', _this.organisationOid);
            _this.itemIndex = 1;
            _this.apiTabs['selectedIndex'] = 1;
            _this.organisationForm.instance.resetValues();
            _this.phoneCode = '';
            _this.setupGoogleMap();
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        e.preventDefault();
    };
    RegistrationSettingsComponent.prototype.onFormSubmitAddUnit = function (e) {
        var _this = this;
        var counter = 0;
        var isQuestionsAnswered = false;
        /*this.questionsWithAnswers.forEach(question => {
          if(question.answer === null) {
            notify({
              message: 'You need to answer all questions',
              closeOnClick: true,
              closeOnOutsideClick: true,
              width: '500',
              font: '16',
              position: {
                my: 'center top',
                at: 'center top'
              }
            }, 'info', 100000);
            return;
          } else{
            counter++;
          }
        });*/
        /*  if(counter === this.questionsWithAnswers.length) {*/
        this.unitInfo.LocationLattitude = this.latitude;
        this.unitInfo.LocationLongtitude = this.longitude;
        this.unitInfo.Suppliers = this.multySelectorSupplier.value;
        this.unitInfo.Retailers = this.multySelectorRetailer.value;
        this.unitInfo.Standards = this.multySelector.value;
        this.unitInfo.OrganisationId = this.organisationOid;
        console.log('this.unitInfo', this.unitInfo);
        this.registrationSettingsService.addOrUpdateUnit(this.unitInfo)
            .subscribe(function (newUnit) {
            _this.userService.showUserNotification("UNIT " + _this.unitInfo.UnitName + " WAS CREATED", 'success');
            console.log('add new unit', newUnit);
            /* this.questionsWithAnswers.map(answer => {
               this.answersToPost.push({
                 Unit: newUnit['Oid'],
                 User: this.userId,
                 AnswerText: answer.answer,
                 Question: answer.questionId,
                 Choice: answer.answer
               });
             });
             console.log('this.answersToPost', this.answersToPost);
             this.questionsService.addAnswersArray(this.answersToPost)
               .subscribe(answers => {
                   this.questionsWithAnswers = [];
                   console.log('answers', answers);
                   if (answers.status === 200) {
                     notify({
                       message: `UNIT ${this.unitInfo.UnitName.toUpperCase()}  WAS CREATED. YOU CAN ADD ANOTHER ONE`,
                       closeOnClick: true,
                       closeOnOutsideClick: true,
                       width: '500',
                       font: '16',
                       position: {
                         my: 'center top',
                         at: 'center top'
                       }
                     }, 'success', 100000);
                   }
                 },
                 error => {
                   this.userService.showUserNotification(error.error.Message, 'error');
                   console.log('answers error', error);
                 });
  */
            if (!_this.changeTabIndicator) {
                _this.formInit();
            }
            if (_this.changeTabIndicator) {
                _this.apiTabs['selectedIndex'] = 2;
                _this.itemIndex = 2;
            }
            _this.unitInfo.Standards = [];
            //console.log(this.unitForm.instance.getEditor('ResponsibleMobile').mask);
            _this.unitForm.instance.resetValues();
            __WEBPACK_IMPORTED_MODULE_4_devextreme_ui_validation_engine___default.a.resetGroup('businessUnit');
        }, function (error) {
            __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default()({
                message: "ERROR: " + error.error.Message,
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                font: '16',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'error', 10000);
        });
        console.log(this.unitInfo);
        e.preventDefault();
    };
    RegistrationSettingsComponent.prototype.backToBusinessUnit = function () {
        this.formInit();
        this.apiTabs['selectedIndex'] = 1;
        this.itemIndex = 1;
    };
    RegistrationSettingsComponent.prototype.onFormSubmitCreateCommodity = function (e) {
        var _this = this;
        console.log('newCommodity', this.newCommodity);
        this.commodityService.addCommodity(this.newCommodity)
            .subscribe(function (commodity) {
            delete commodity['@odata.context'];
            _this.commodityInfo.push(commodity);
            _this.commoditiesBoxOptions = {
                dataSource: _this.commodityInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                value: commodity['OID'],
                placeholder: "SELECT PRIMARY COMMODITY"
            };
            console.log('commodity', commodity);
            console.log('this.commodityInfo', _this.commodityInfo);
            __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default()({
                message: "COMMODITY \"" + _this.newCommodity.Title.toUpperCase() + "\" WAS CREATED",
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                font: '16',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'success', 100000);
            _this.isCommodityPopupVisible = false;
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        e.preventDefault();
    };
    RegistrationSettingsComponent.prototype.onFormSubmitCreateSupplier = function (e) {
        var _this = this;
        console.log('this.newSupplier', this.newSupplier);
        this.registrationSettingsService.addSupplier(this.newSupplier)
            .subscribe(function (supplier) {
            _this.supplierInfo.push(supplier);
            _this.supplierBoxOptions = {
                dataSource: _this.supplierInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                value: supplier['OID'],
                placeholder: "SELECT SUPPLIER"
            };
            __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default()({
                message: "SUPPLIER \"" + _this.newSupplier.Title.toUpperCase() + "\" WAS CREATED",
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                font: '16',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'success', 10000);
            _this.isSupplierPopupVisible = false;
            console.log('NEWsupplier', supplier);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        e.preventDefault();
    };
    RegistrationSettingsComponent.prototype.onFieldDataChanged = function (event) {
        var _this = this;
        if (event.dataField === "UnitCommodityId" && event.value) {
            console.log('this.unitForm', this.unitForm);
            this.userProfileBusinessUnitItemService.getFrameworksByCommodity(event.value)
                .subscribe(function (frameworks) {
                _this.frameworkInfo = frameworks;
                console.log('farmeworks', frameworks);
                if (_this.frameworkInfo.length) {
                    _this.frameworkBoxOptions = {
                        items: _this.frameworkInfo,
                        displayExpr: 'Title',
                        valueExpr: 'OID',
                        placeholder: "SELECT PRIMARY FRAMEWORK",
                        disabled: false
                    };
                }
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        }
        if (event.dataField === "UnitCommodityId" && !event.value) {
            this.frameworkBoxOptions = {
                items: this.frameworkInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                placeholder: "SELECT PRIMARY FRAMEWORK",
                disabled: true
            };
        }
        if (event.dataField === "FrameworkId" && event.value) {
            this.userProfileBusinessUnitItemService.getStandardsByFramework(event.value)
                .subscribe(function (standards) {
                console.log('standards', standards);
                _this.standardsInfo = standards;
            });
            this.ifFrameworkSelected = true;
        }
    };
    RegistrationSettingsComponent.prototype.setStandards = function (event) {
        this.standardsOidArray = [];
        if (this.multySelector) {
            console.log(this.multySelector);
            this.standardsOidArray = this.multySelector.selectedItems.map(function (item) {
                return item.OID;
            });
        }
        console.log(this.standardsOidArray);
    };
    RegistrationSettingsComponent.prototype.ngAfterViewChecked = function () {
        this.changeDetector.detectChanges();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], RegistrationSettingsComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("apiTabs"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], RegistrationSettingsComponent.prototype, "apiTabs", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("organisationForm"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_13_devextreme_angular__["DxFormComponent"])
    ], RegistrationSettingsComponent.prototype, "organisationForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("unitForm"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_13_devextreme_angular__["DxFormComponent"])
    ], RegistrationSettingsComponent.prototype, "unitForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelector'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_13_devextreme_angular__["DxTagBoxComponent"])
    ], RegistrationSettingsComponent.prototype, "multySelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelectorSupplier'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_13_devextreme_angular__["DxTagBoxComponent"])
    ], RegistrationSettingsComponent.prototype, "multySelectorSupplier", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelectorRetailer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_13_devextreme_angular__["DxTagBoxComponent"])
    ], RegistrationSettingsComponent.prototype, "multySelectorRetailer", void 0);
    RegistrationSettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-registration-settings',
            template: __webpack_require__("./client/app/authentification/registration-settings/registration-settings.component.html"),
            styles: [__webpack_require__("./client/app/authentification/registration-settings/registration-settings.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_9__shared_services_commodity_service__["a" /* CommodityService */],
            __WEBPACK_IMPORTED_MODULE_2__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_10__user_profile_user_profile_service__["a" /* UserProfileService */],
            __WEBPACK_IMPORTED_MODULE_11__shared_services_questions_service__["a" /* QuestionsService */],
            __WEBPACK_IMPORTED_MODULE_12__user_profile_user_profile_business_unit_item_user_profile_business_unit_item_service__["a" /* UserProfileBusinessUnitItemService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], RegistrationSettingsComponent);
    return RegistrationSettingsComponent;
}());



/***/ }),

/***/ "./client/app/authentification/registration-settings/registration-settings.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Tab */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationSettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var setupOrganisation = {
    'organisationName': '',
    'organisationStreet': '',
    'organisationCity': '',
    'stateProvince': '',
    'country': '',
    'phoneNumber': ''
};
var Tab = (function () {
    function Tab() {
    }
    return Tab;
}());

var tabs = [
    {
        id: 0,
        text: "SET UP ORGANISATION",
        icon: "add",
        content: "User tab content"
    },
    {
        id: 1,
        text: "MY BUSINESS UNIT",
        icon: "business",
        content: "Comment tab content"
    },
    {
        id: 2,
        text: "SUBSCRIPTION",
        icon: "subscription",
        content: "Find tab content"
    }
];
var businessUnitType = [
    "FARMING OPERATION",
    "PROCESSING UNIT"
];
var myBusinessUnit = {
    'businessUnitType': '',
    'businessUnitName': '',
    'businessUnitStructure': ''
};
var unitInfo = {
    'UnitName': '',
    'UnitTypeId': '',
    'UnitStructure': '',
    'ResponsibleName': '',
    'ResponsibleSurname': '',
    'ResponsibleEmail': '',
    'ResponsibleMobile': '',
    'ResponsiblePhone': '',
    'UnitCountryId': '',
    'LocationLongtitude': '',
    'LocationLattitude': '',
    'UnitCommodityId': '',
    'Suppliers': '',
    'Retailers': '',
    'OrganisationId': '',
    'FrameworkId': ''
};
var organisation = {
    'Organization': {
        "Party": {
            "Address": {
                "Street": "",
                "City": "",
                "StateProvince": "",
                "ZipPostal": "",
                "Country": "",
            },
            "PhoneNumbers": [
                {
                    "Number": "",
                    "PhoneType": "",
                }
            ],
        },
        "FullName": "",
        "Profile": "",
        "Email": "",
        "WebSite": "",
        "Name": ""
    }
};
var RegistrationSettingsService = (function () {
    function RegistrationSettingsService(httpClient) {
        this.httpClient = httpClient;
    }
    RegistrationSettingsService.prototype.getTabs = function () {
        return tabs;
    };
    RegistrationSettingsService.prototype.getSetupOrganisation = function () {
        return setupOrganisation;
    };
    RegistrationSettingsService.prototype.getUnitType = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/UnitTypes", { observe: 'body' });
    };
    RegistrationSettingsService.prototype.getSuppliers = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Suppliers", { observe: 'body' });
    };
    RegistrationSettingsService.prototype.getRetailers = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Retailers", { observe: 'body' });
    };
    RegistrationSettingsService.prototype.getUnitInfo = function () {
        return unitInfo;
    };
    RegistrationSettingsService.prototype.getOrganisation = function () {
        return organisation;
    };
    RegistrationSettingsService.prototype.addOrUpdateUnit = function (unitInfo) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Units/CreateOrUpdate", unitInfo);
    };
    RegistrationSettingsService.prototype.addOrUpdateOrganisation = function (organisation) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Organisations", organisation);
    };
    RegistrationSettingsService.prototype.addSupplier = function (supplier) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Suppliers/CreateOrUpdate", supplier);
    };
    RegistrationSettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], RegistrationSettingsService);
    return RegistrationSettingsService;
}());



/***/ }),

/***/ "./client/app/authentification/registration/registration.component.html":
/***/ (function(module, exports) {

module.exports = "<bluenorth-header></bluenorth-header>\r\n<div class=\"registration-background\">\r\n<div class=\"registration-container\">\r\n  <form (submit)=\"onFormSubmit($event)\" #declarativeForm=\"ngForm\">\r\n    <div>\r\n      <h4 id=\"targetElement\"\r\n        (mouseenter)=\"toggleDefault()\"\r\n        (mouseleave)=\"toggleDefault()\">REGISTER\r\n        <i class=\"material-icons\">help_outline</i>\r\n      </h4>\r\n      <dx-tooltip\r\n        target=\"#targetElement\"\r\n        position=\"top\"\r\n        [(visible)]=\"tooltipVisible\">\r\n        <div *dxTemplate=\"let data = data of 'content'\">\r\n          <span class=\"registration-mandatory\">All fields marked * and CAPTCHA are mandatory.</span>\r\n        </div>\r\n      </dx-tooltip>\r\n    </div>\r\n    <p class=\"login-text\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>\r\n    <dx-form id=\"form\" #dxForm\r\n      labelLocation=\"right\"\r\n      [formData]=\"registrationInfo\"\r\n      [readOnly]=\"false\"\r\n      [showColonAfterLabel]=\"true\"\r\n      [showValidationSummary]=\"true\"\r\n      validationGroup=\"customerData\">\r\n      <dxi-item dataField=\"subscriptionType\"\r\n        editorType=\"dxSelectBox\"\r\n        [editorOptions]=\"{ dataSource: subscriptionType, placeholder: 'SELECT TYPE OF SUBSCRIPTION'}\">\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Select type of subscription\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n     <!-- <dxi-item dataField=\"UserName\"\r\n        [editorOptions]=\"{ placeholder: 'LOGIN'}\">\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Login is required\"\r\n        >\r\n        </dxi-validation-rule>\r\n\r\n      </dxi-item>-->\r\n      <dxi-item dataField=\"FirstName\"\r\n        [editorOptions]=\"{ placeholder: 'NAME'}\">\r\n      </dxi-item>\r\n      <dxi-item dataField=\"LastName\"\r\n        [editorOptions]=\"{ placeholder: 'LAST NAME'}\">\r\n      </dxi-item>\r\n      <dxi-item dataField=\"Email\"\r\n        [editorOptions]=\"{ placeholder: 'EMAIL'}\">\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Email is required\"\r\n        >\r\n        </dxi-validation-rule>\r\n        <dxi-validation-rule\r\n          type=\"pattern\"\r\n          [pattern]=\"emailPattern\"\r\n          message=\"Enter valid Email\"\r\n        >\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n\r\n      <dxi-item\r\n        [template]=\"'countryTemplate'\">\r\n      </dxi-item>\r\n      <div *dxTemplate=\"let data of 'countryTemplate'\">\r\n        <dx-select-box #countrySelector\r\n                    [items]=\"countriesInfo\"\r\n                    displayExpr=\"Name\"\r\n                    placeholder=\"SELECT COUNTRY\"\r\n                    valueExpr=\"Oid\"\r\n                    (onSelectionChanged)=\"countrySelectorChange($event)\">\r\n          <dx-validator validationGroup=\"customerData\">\r\n            <dxi-validation-rule\r\n              type=\"required\"\r\n              message=\"Country is required\">\r\n            </dxi-validation-rule>\r\n          </dx-validator>\r\n        </dx-select-box>\r\n      </div>\r\n      <dxi-item itemType=\"group\" caption=\"Cellphone number\">\r\n        <dxi-item dataField=\"Mobile\"\r\n          [editorOptions]=\"{\r\n                    placeholder: 'CELLPHONE NUMBER',\r\n                    mask: phoneCode+'(000)000-0000',\r\n\r\n                    useMaskedValue: true,\r\n                    maskInvalidMessage: 'The phone must have a correct format'\r\n                }\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Cellphone Number is required\">\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n      </dxi-item>\r\n      <dxi-item itemType=\"group\" caption=\"Phone number\">\r\n        <dxi-item dataField=\"Phone\"\r\n          [editorOptions]=\"{\r\n                    placeholder: 'PHONE NUMBER',\r\n                    mask:  phoneCode+'(999) 999-9999',\r\n                    maskRules: phoneRules,\r\n                    useMaskedValue: true,\r\n                    maskInvalidMessage: 'The phone must have a correct format'\r\n                }\">\r\n        </dxi-item>\r\n      </dxi-item>\r\n\r\n      <dxi-item dataField=\"Password\"\r\n        [editorOptions]=\"{ placeholder: 'PASSWORD' , mode: 'password'}\"\r\n      >\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Password is required\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n      <dxi-item\r\n        dataField=\"Password1\"\r\n        editorType=\"dxTextBox\"\r\n        [editorOptions]=\"{ placeholder: 'CONFIRM PASSWORD', mode: 'password' }\">\r\n\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Confirm Password is required\">\r\n        </dxi-validation-rule>\r\n        <dxi-validation-rule\r\n          type=\"compare\"\r\n          [comparisonTarget]=\"passwordComparison\"\r\n          message=\"Password and Confirm Password do not match\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n      <dxi-item>\r\n        <re-captcha class=\"re-captcha\" (resolved)=\"resolved($event)\"\r\n          siteKey=\"6LffPUAUAAAAAGmXfFJ44Pqis3OCKo-HpnWJnORL\"\r\n        ></re-captcha>\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Captcha is required\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n    </dx-form>\r\n    <span class=\"registration-terms-conditions\">By clicking Register button, you agree to our <a [routerLink]=\"['/terms-and-conditions']\">Terms & Conditions.</a></span>\r\n    <br/>\r\n    <dx-button\r\n      [disabled]=\"!captchaResponse\"\r\n      text=\"REGISTER\"\r\n      type=\"success\"\r\n      validationGroup=\"customerData\"\r\n      [useSubmitBehavior]=\"true\">\r\n    </dx-button>\r\n    <span class=\"registration-terms-conditions\">Already have an account?  <a [routerLink]=\"['/login']\">Sign In</a></span>\r\n  </form>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/authentification/registration/registration.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.registration-background {\n  background: url('login-background.3351ea44af2378d2cd27.jpg');\n  background-size: cover;\n  width: 100%; }\n.registration-container {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n.registration-container h4, .registration-container .material-icons {\n    color: #3282B9;\n    margin-bottom: 15px; }\n.registration-container /deep/ dx-select-box[placeholder=\"SELECT COUNTRY\"] {\n    margin-right: 20px;\n    position: relative; }\n.registration-container /deep/ dx-select-box[placeholder=\"SELECT COUNTRY\"]:after {\n    content: \" *\";\n    position: absolute;\n    right: -20px;\n    top: 5px;\n    color: #ea4444;\n    display: inline-block; }\n.registration-container /deep/ form {\n    /*width: 60%;\r\n  margin-left: auto;\r\n  margin-right: auto;*/\n    border-right: 10px solid #6BCDFD;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    background-color: #fff;\n    padding: 50px;\n    padding: 72px 108px;\n    max-width: 720px;\n    overflow: hidden; }\n.registration-container .login-text {\n    font-size: 12px;\n    margin-bottom: 10px; }\n.registration-container .registration-mandatory {\n    float: left;\n    margin-bottom: 15px;\n    font-size: 14px; }\n.registration-container dx-form /deep/ .dx-form-group-caption {\n    color: #9898A5; }\n.registration-container dx-form /deep/ .dx-form-group-caption {\n    margin-left: 0; }\n.registration-container /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.registration-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.registration-container .dx-item {\n    margin-bottom: 15px; }\n.registration-container .rc-anchor .rc-anchor-normal .rc-anchor-light {\n    margin-top: 15px; }\n.registration-container .registration-terms-conditions {\n    font-size: 12px;\n    margin-bottom: 15px;\n    display: block;\n    margin-top: 15px; }\n/deep/ dx-form .dx-form-group-caption {\n  font-size: 14px;\n  margin-left: 20px; }\n/deep/ dx-form .dx-form-group-with-caption > .dx-form-group-content {\n  border-top: none; }\n/deep/ dx-form .dx-form-group-with-caption .dx-form-group-content {\n  padding-top: 0;\n  padding-bottom: 0; }\n@media screen and (max-width: 768px) {\n  .registration-container form {\n    max-width: 500px;\n    padding: 20px; } }\n"

/***/ }),

/***/ "./client/app/authentification/registration/registration.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration_service__ = __webpack_require__("./client/app/authentification/registration/registration.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__ = __webpack_require__("./client/app/shared/models/form-validation.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_devextreme_ui_validation_engine__ = __webpack_require__("./node_modules/devextreme/ui/validation_engine.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_devextreme_ui_validation_engine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_devextreme_ui_validation_engine__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RegistrationComponent = (function () {
    function RegistrationComponent(registrationService, userService, router) {
        var _this = this;
        this.registrationService = registrationService;
        this.userService = userService;
        this.router = router;
        this.FormValidation = __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__["a" /* FormValidation */];
        this.password = '';
        this.passwordOptions = {
            mode: 'password',
            value: this.password
        };
        this.captchaResponse = null;
        this.tooltipVisible = false;
        this.countriesInfo = [];
        this.phoneCode = " ";
        this.passwordComparison = function () {
            return _this.form.instance.option("formData").Password;
        };
        this.registrationInfo = registrationService.getRegistrationInfo();
        this.subscriptionType = this.registrationService.getSubscriptionType();
        this.formValidation = new __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__["a" /* FormValidation */]();
        this.namePattern = this.formValidation.getNamePattern();
        this.emailPattern = this.formValidation.getEmailPattern();
        this.phoneRules = this.formValidation.getPhoneRules();
        this.phonePattern = this.formValidation.getPhonePattern();
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.countriesList$ = this.userService.getCountriesList()
            .subscribe(function (countriesList) {
            _this.countriesInfo = countriesList;
            console.log(' this.countriesInfo', _this.countriesInfo);
        });
    };
    RegistrationComponent.prototype.countrySelectorChange = function (event) {
        console.log('Country', event);
        this.phoneCode = event.selectedItem.PhoneCode ? event.selectedItem.PhoneCode : "";
        console.log(this.phoneCode);
    };
    RegistrationComponent.prototype.onFormSubmit = function (e) {
        var _this = this;
        this.registrationInfo.UserName = this.registrationInfo.Email;
        this.registrationInfo.CountryId = this.countrySelector.selectedItem.Oid;
        console.log('this.registrationInfo', this.registrationInfo);
        this.registrationService.userRegister(this.registrationInfo)
            .subscribe(function (response) {
            console.log('register info', response);
            _this.dxForm.instance.resetValues();
            __WEBPACK_IMPORTED_MODULE_6_devextreme_ui_validation_engine___default.a.resetGroup('customerData');
            _this.userService.showUserNotification("Registration succeeded. We sent you activation link via " + _this.registrationInfo.Email + ". Plz check your mailbox and follow the insctructions", 'success');
            _this.router.navigate(['login']);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        e.preventDefault();
    };
    ;
    RegistrationComponent.prototype.resolved = function (captchaResponse) {
        console.log("Resolved captcha with response: " + captchaResponse);
        this.captchaResponse = captchaResponse;
    };
    RegistrationComponent.prototype.toggleDefault = function () {
        this.tooltipVisible = !this.tooltipVisible;
    };
    RegistrationComponent.prototype.ngOnDestroy = function () {
        this.countriesList$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxFormComponent"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxFormComponent"])
    ], RegistrationComponent.prototype, "form", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dxForm'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxFormComponent"])
    ], RegistrationComponent.prototype, "dxForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('countrySelector'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxSelectBoxComponent"])
    ], RegistrationComponent.prototype, "countrySelector", void 0);
    RegistrationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-registration',
            template: __webpack_require__("./client/app/authentification/registration/registration.component.html"),
            styles: [__webpack_require__("./client/app/authentification/registration/registration.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__registration_service__["a" /* RegistrationService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["e" /* Router */]])
    ], RegistrationComponent);
    return RegistrationComponent;
}());



/***/ }),

/***/ "./client/app/authentification/registration/registration.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RegistrationInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegistrationInfo = (function () {
    function RegistrationInfo() {
    }
    return RegistrationInfo;
}());

var registrationInfo = {
    'UserName': '',
    'FirstName': '',
    'Password': '',
    'LastName': '',
    'Email': '',
    'Phone': '',
    'Mobile': '',
    'Birthday': '',
    'CountryId': ''
};
var subscriptionType = [
    'FREE TRIAL',
    'I HAVE A VOUCHER',
    'PAID ACCOUNT'
];
var RegistrationService = (function () {
    function RegistrationService(http) {
        this.http = http;
    }
    RegistrationService.prototype.getRegistrationInfo = function () {
        return registrationInfo;
    };
    RegistrationService.prototype.getSubscriptionType = function () {
        return subscriptionType;
    };
    RegistrationService.prototype.userRegister = function (registrationInfo) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Users/Register", registrationInfo, {
            observe: 'response',
            responseType: 'json',
        })
            .map(function (response) { return response; });
    };
    RegistrationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], RegistrationService);
    return RegistrationService;
}());



/***/ }),

/***/ "./client/app/authentification/terms-conditions/terms-conditions.component.html":
/***/ (function(module, exports) {

module.exports = "<bluenorth-header></bluenorth-header>\r\n<div class=\"terms-background\">\r\n<div class=\"terms-container\">\r\n  <div class=\"terms-wrapper\">\r\n    <div class=\"terms-content\">\r\n      <h1>TERMS AND CONDITIONS</h1>\r\n      <h5 class=\"sub-title\">PLEASE READ</h5>\r\n\r\n      <p>\r\n        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\r\n\r\n      <p>Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>\r\n\r\n      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\r\n\r\n      <p>Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>\r\n\r\n      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummyLorem Ipsum is simply dummy text of the printing and typesetting industry.\r\n      </p>\r\n\r\n      <dx-button\r\n        text=\"BACK TO REGISTRATION\"\r\n        type=\"success\"\r\n        [routerLink]=\"['/registration']\"\r\n      >\r\n      </dx-button>\r\n    </div>\r\n    <div class=\"terms-right-block\">\r\n      <span class=\"terms-close\" [routerLink]=\"['/registration']\">x</span>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/authentification/terms-conditions/terms-conditions.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.terms-background {\n  background: url('login-background.3351ea44af2378d2cd27.jpg');\n  background-size: cover;\n  width: 100%; }\n.terms-container {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -ms-grid-columns: minmax(300px, 40%);\n      grid-template-columns: minmax(300px, 40%);\n  height: 100vh;\n  grid-gap: 0; }\n.terms-container .terms-wrapper {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: auto 50px;\n        grid-template-columns: auto 50px;\n    margin-top: 100px;\n    margin-bottom: 20px; }\n.terms-container .terms-content {\n    background-color: #ffffff;\n    padding: 30px;\n    line-height: 20px; }\n.terms-container .terms-content h1 {\n      color: #3282B9;\n      margin-bottom: 7px;\n      font-size: 20px; }\n.terms-container .terms-content p {\n      font-size: 12px;\n      padding-bottom: 10px; }\n.terms-container .terms-content .sub-title:after {\n      display: block;\n      content: '';\n      height: 5px;\n      border-radius: 1px;\n      background: rgba(234, 224, 222, 0.4);\n      margin: 10px 0; }\n.terms-container .terms-right-block {\n    text-align: center;\n    width: 50px;\n    background-color: #6BCDFD;\n    height: 100%; }\n.terms-container .terms-close {\n    font-weight: 900;\n    color: #fff;\n    font-size: 25px;\n    cursor: pointer; }\n.terms-container /deep/ dx-button {\n    color: #6BCDFD;\n    background-color: #fff;\n    border: 2px solid #6BCDFD;\n    width: 250px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    margin-top: 50px; }\n.terms-container /deep/ dx-button:hover {\n      color: #6BCDFD;\n      background-color: #e6e5e5;\n      border-color: #2fb9fc; }\n.terms-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD; }\n"

/***/ }),

/***/ "./client/app/authentification/terms-conditions/terms-conditions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsConditionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TermsConditionsComponent = (function () {
    function TermsConditionsComponent() {
    }
    TermsConditionsComponent.prototype.ngOnInit = function () {
    };
    TermsConditionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-terms-conditions',
            template: __webpack_require__("./client/app/authentification/terms-conditions/terms-conditions.component.html"),
            styles: [__webpack_require__("./client/app/authentification/terms-conditions/terms-conditions.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TermsConditionsComponent);
    return TermsConditionsComponent;
}());



/***/ }),

/***/ "./client/app/bluenorth.routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BluenorthRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentification_registration_registration_component__ = __webpack_require__("./client/app/authentification/registration/registration.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home_component__ = __webpack_require__("./client/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authentification_login_login_component__ = __webpack_require__("./client/app/authentification/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_dashboard_dashboard_component__ = __webpack_require__("./client/app/home/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_auth_guard_service__ = __webpack_require__("./client/app/shared/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__authentification_forgot_password_forgot_password_component__ = __webpack_require__("./client/app/authentification/forgot-password/forgot-password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authentification_terms_conditions_terms_conditions_component__ = __webpack_require__("./client/app/authentification/terms-conditions/terms-conditions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_component__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_standards_standards_component__ = __webpack_require__("./client/app/home/standards/standards.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_auth_resolver_service__ = __webpack_require__("./client/app/shared/services/auth-resolver.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_assessment_assessment_current_status_assessment_current_status_component__ = __webpack_require__("./client/app/home/assessment/assessment-current-status/assessment-current-status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_assessment_assessment_state_assessment_state_component__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_assessment_assessment_capture_full_assessment_capture_full_component__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_assessment_assessment_capture_light_assessment_capture_light_component__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__home_performance_indicators_indicator_data_set_indicator_data_set_component__ = __webpack_require__("./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_component__ = __webpack_require__("./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__home_assessment_assessment_reporting_assessment_reporting_component__ = __webpack_require__("./client/app/home/assessment/assessment-reporting/assessment-reporting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__home_performance_indicators_indicator_reporting_indicator_reporting_component__ = __webpack_require__("./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__home_my_actions_capture_capture_component__ = __webpack_require__("./client/app/home/my-actions/capture/capture.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__home_my_actions_current_status_current_status_component__ = __webpack_require__("./client/app/home/my-actions/current-status/current-status.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__home_my_actions_prioritise_prioritise_component__ = __webpack_require__("./client/app/home/my-actions/prioritise/prioritise.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__home_my_actions_reporting_reporting_component__ = __webpack_require__("./client/app/home/my-actions/reporting/reporting.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var appRoutes = [
    {
        path: "",
        component: __WEBPACK_IMPORTED_MODULE_4__authentification_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: "login",
        component: __WEBPACK_IMPORTED_MODULE_4__authentification_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: "registration",
        component: __WEBPACK_IMPORTED_MODULE_2__authentification_registration_registration_component__["a" /* RegistrationComponent */]
    },
    {
        path: "terms-and-conditions",
        component: __WEBPACK_IMPORTED_MODULE_8__authentification_terms_conditions_terms_conditions_component__["a" /* TermsConditionsComponent */]
    },
    {
        path: "registration-settings",
        component: __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_component__["a" /* RegistrationSettingsComponent */]
    },
    {
        path: 'units',
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__shared_services_auth_guard_service__["a" /* AuthGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_component__["a" /* RegistrationSettingsComponent */],
    },
    {
        path: "forgot-password",
        component: __WEBPACK_IMPORTED_MODULE_7__authentification_forgot_password_forgot_password_component__["a" /* ForgotPasswordComponent */]
    },
    {
        path: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_6__shared_services_auth_guard_service__["a" /* AuthGuard */]],
        resolve: {
            currentUser: __WEBPACK_IMPORTED_MODULE_11__shared_services_auth_resolver_service__["a" /* AuthResolverService */]
        },
        children: [
            {
                path: "",
                component: __WEBPACK_IMPORTED_MODULE_3__home_home_component__["a" /* HomeComponent */],
                children: [
                    {
                        path: "",
                        canActivateChild: [__WEBPACK_IMPORTED_MODULE_6__shared_services_auth_guard_service__["a" /* AuthGuard */]],
                        children: [
                            {
                                path: "",
                                component: __WEBPACK_IMPORTED_MODULE_5__home_dashboard_dashboard_component__["a" /* DashboardComponent */],
                            },
                            {
                                path: "dashboard",
                                component: __WEBPACK_IMPORTED_MODULE_5__home_dashboard_dashboard_component__["a" /* DashboardComponent */],
                                data: { title: 'DASHBOARD' }
                            },
                            {
                                path: "assessment-current-status-init",
                                component: __WEBPACK_IMPORTED_MODULE_12__home_assessment_assessment_current_status_assessment_current_status_component__["a" /* AssessmentCurrentStatusComponent */],
                                data: { title: 'STRATEGIC ASSESSMENT' }
                            }, {
                                path: "assessment-current-status",
                                component: __WEBPACK_IMPORTED_MODULE_13__home_assessment_assessment_state_assessment_state_component__["a" /* AssessmentStateComponent */],
                                data: { title: 'STRATEGIC ASSESSMENT' }
                            },
                            {
                                path: "assessment-capture-full",
                                component: __WEBPACK_IMPORTED_MODULE_14__home_assessment_assessment_capture_full_assessment_capture_full_component__["a" /* AssessmentCaptureFullComponent */],
                                data: { title: 'STRATEGIC ASSESSMENT' }
                            },
                            {
                                path: "assessment-capture-light",
                                component: __WEBPACK_IMPORTED_MODULE_15__home_assessment_assessment_capture_light_assessment_capture_light_component__["a" /* AssessmentCaptureLightComponent */],
                                data: { title: 'STRATEGIC ASSESSMENT', subtitle: 'lite assessment' }
                            },
                            {
                                path: "assessment-reporting",
                                component: __WEBPACK_IMPORTED_MODULE_18__home_assessment_assessment_reporting_assessment_reporting_component__["a" /* AssessmentReportingComponent */],
                                data: { title: 'STRATEGIC ASSESSMENT', subtitle: 'reporting' }
                            },
                            {
                                path: "standards-management",
                                component: __WEBPACK_IMPORTED_MODULE_10__home_standards_standards_component__["a" /* StandardsComponent */],
                                data: { title: 'STANDARDS', subtitle: 'current status' }
                            },
                            {
                                path: "performance-indicators-current-status",
                                component: __WEBPACK_IMPORTED_MODULE_16__home_performance_indicators_indicator_data_set_indicator_data_set_component__["a" /* IndicatorDataSetComponent */],
                                data: { title: 'PERFORMANCE INDICATORS' }
                            },
                            {
                                path: "performance-indicators-capture",
                                component: __WEBPACK_IMPORTED_MODULE_17__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_component__["a" /* IndicatorDataSetValueComponent */],
                                data: { title: 'PERFORMANCE INDICATORS' }
                            },
                            {
                                path: "performance-indicators-reporting",
                                component: __WEBPACK_IMPORTED_MODULE_19__home_performance_indicators_indicator_reporting_indicator_reporting_component__["a" /* IndicatorReportingComponent */],
                                data: { title: 'PERFORMANCE INDICATORS' }
                            },
                            {
                                path: "standards-management/:standardId",
                                component: __WEBPACK_IMPORTED_MODULE_16__home_performance_indicators_indicator_data_set_indicator_data_set_component__["a" /* IndicatorDataSetComponent */],
                                data: { title: 'INDICATOR DATA SETS' }
                            },
                            {
                                path: "standards-management/:standardId/performance-indicators",
                                component: __WEBPACK_IMPORTED_MODULE_17__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_component__["a" /* IndicatorDataSetValueComponent */],
                                data: { title: 'PERFORMANCE INDICATORS' }
                            },
                            {
                                path: "standards-management/:standardId/:indicatorDataSetId",
                                component: __WEBPACK_IMPORTED_MODULE_17__home_performance_indicators_indicator_data_set_value_indicator_data_set_value_component__["a" /* IndicatorDataSetValueComponent */],
                                data: { title: 'PERFORMANCE INDICATORS' }
                            },
                            {
                                path: "my-actions-current-status",
                                component: __WEBPACK_IMPORTED_MODULE_21__home_my_actions_current_status_current_status_component__["a" /* MyActionsCurrentStatusComponent */],
                                data: { title: 'MY ACTIONS' }
                            },
                            {
                                path: "my-actions-prioritise",
                                component: __WEBPACK_IMPORTED_MODULE_22__home_my_actions_prioritise_prioritise_component__["a" /* MyActionsPrioritiseComponent */],
                                data: { title: 'MY ACTIONS' }
                            },
                            {
                                path: "my-actions-capture",
                                component: __WEBPACK_IMPORTED_MODULE_20__home_my_actions_capture_capture_component__["a" /* MyActionsCaptureComponent */],
                                data: { title: 'MY ACTIONS' }
                            },
                            {
                                path: "my-actions-reporting",
                                component: __WEBPACK_IMPORTED_MODULE_23__home_my_actions_reporting_reporting_component__["a" /* MyActionsReportingComponent */],
                                data: { title: 'MY ACTIONS' }
                            }
                        ],
                    }
                ]
            },
            {
                path: "profile",
                loadChildren: 'app/user-profile/user-profile.module#UserProfileModule'
            },
        ]
    },
    { path: '**', redirectTo: 'login' }
];
var BluenorthRoutingModule = (function () {
    function BluenorthRoutingModule() {
    }
    BluenorthRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* RouterModule */].forRoot(appRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* RouterModule */]]
        })
    ], BluenorthRoutingModule);
    return BluenorthRoutingModule;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"assessment-full-selector-container\">\r\n\r\n<dx-tabs [style.visibility]=\"arrayForTabs.length ? 'visible' : 'hidden'\"\r\n         id=\"tabs\"\r\n         #apiTabs\r\n         [dataSource]=\"arrayForTabs\"\r\n         (onItemClick)=\"selectTab($event)\"\r\n         [selectedIndex]=\"firstNotAnsweredIndex\"\r\n         [scrollByContent]=\"true\"\r\n         [showNavButtons]=\"true\"\r\n          noDataText=\" \"\r\n         itemTemplate=\"tabTemplate\"\r\n         [width]=\"width\"\r\n         keyExpr=\"id\">\r\n  <div *dxTemplate=\"let info of 'tabTemplate'\">\r\n    <span>{{info.text}}</span>\r\n     <span class=\"unanswered-characteristic-label\"  *ngIf=\"info.badge != 0\">{{info.badge}}</span>\r\n      <i *ngIf=\"info.badge == 0\" class=\"material-icons answered-characteristic-label\" >done</i>\r\n  </div>\r\n</dx-tabs>\r\n\r\n<dx-load-panel\r\n  #loadPanelTabs\r\n  shadingColor=\"rgba(0,0,0,0)\"\r\n  [position]=\"{ of: '#tabs' }\"\r\n  [visible]=\"!arrayForTabs.length\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"false\"\r\n  [shading]=\"false\"\r\n  [message]=\"loadText\"\r\n  [closeOnOutsideClick]=\"false\">\r\n</dx-load-panel>\r\n\r\n<div class=\"data-grid-full-wrapper\" bluenorthElementWidth (actual-width)=\"width = $event\">\r\n  <div class=\"table-header\"><span *ngIf=\"arrayForTabs.length && currentCharacteristic\" >{{currentTab.text}} / {{currentCharacteristic.ShortTitle}}</span>\r\n    <dx-tooltip\r\n        target=\"#fullScrinMode\"\r\n        [(visible)]=\"showFullScreenTooltip\">\r\n        <div *dxTemplate=\"let data = data of 'content'\">\r\n          Full ScreenMode\r\n        </div>\r\n      </dx-tooltip>\r\n      <i id=\"fullScrinMode\"\r\n\r\n         class=\"material-icons fullscreen-btn fullscreen-icon\"\r\n         (click)=\"toggleFullScreenMode(true)\"\r\n         (mouseenter)=\"toggleFullScreenToolTip()\"\r\n         (mouseleave)=\"toggleFullScreenToolTip()\" >\r\n        fullscreen\r\n      </i>\r\n       <i\r\n          class=\"material-icons fullscreen-btn fullscreen-exit-icon\"\r\n          (click)=\"toggleFullScreenMode(false)\">\r\n        fullscreen_exit\r\n      </i>\r\n  </div>\r\n  <ul class=\"characteristic-tabs\">\r\n    <li class=\"characteristic-tabs-item\"\r\n        *ngFor=\"let tab of characteristicList let index = index\"\r\n        [ngClass]=\"{'active': activeTab === index}\"\r\n        (click)=\"setCurrentCharacteristic(tab, index)\">{{tab.Title}}\r\n      <span *ngIf=\"tab.Answers.length\" class=\"unanswered-characteristic-label\">{{tab.Answers.length}}</span>\r\n      <i *ngIf=\"!tab.Answers.length\" class=\"material-icons answered-characteristic-label\" >done</i>\r\n    </li>\r\n  </ul>\r\n\r\n  <div class=\"data-grid-container inner-padding\">\r\n    <div id=\"characteristic-info\"\r\n         class=\"characteristic-container\">\r\n      <div class=\"characteristic-reference-container\">\r\n        {{currentCharacteristic?.Reference}}\r\n      </div>\r\n      <div class=\"characteristic-info\">\r\n        <div class=\"characteristic-type-style\" *ngIf=\"currentCharacteristic && characteristicList.length\">\r\n          On a <span class=\"font-bold\">sustainable</span> {{currentCharacteristic?.ShortTitle}}\r\n        </div>\r\n        <bluenorth-characteristic-status *ngIf=\"currentCharacteristic && characteristicList.length\"\r\n                                         class=\"status-label\" [status]=\"currentCharacteristic.Status\"></bluenorth-characteristic-status>\r\n        <div class=\"characteristic-description\">{{currentCharacteristic?.Description}}</div>\r\n        <div *ngIf=\"showGuidance\" [innerHTML]=\"currentCharacteristic?.Summary | replaceLineBreaks\"></div>\r\n        <div *ngIf=\"!showGuidance && currentCharacteristic?.Summary\" (click)=\"showGuidance = !showGuidance\">\r\n          <a>Refer to guidance</a>\r\n        </div>\r\n        <div *ngIf=\"showGuidance\" (click)=\"showGuidance = !showGuidance\"><a>Close guidance</a></div>\r\n      </div>\r\n      <div *ngIf=\"currentCharacteristic && characteristicList.length\"\r\n           class=\"characteristic-info characteristic-relevant\" [ngClass]=\"{'not-relevant': !isRelevantCharacteristic}\">\r\n        <span>Relevant</span>\r\n        <dx-switch *ngIf=\"isRelevantShown\"\r\n                   #switch\r\n                   (onValueChanged)=\"changeCharacteristicRelevant($event)\"\r\n                   [value]=\"isRelevantCharacteristic\"></dx-switch>\r\n      </div>\r\n    </div>\r\n    <dx-load-panel\r\n      #loadPanel\r\n      shadingColor=\"rgba(0,0,0,0.1)\"\r\n      [position]=\"{ of: '#characteristic-info' }\"\r\n      [visible]=\"loadingVisible\"\r\n      [showIndicator]=\"true\"\r\n      [showPane]=\"false\"\r\n      [shading]=\"false\"\r\n      [message]=\"loadText\"\r\n      [closeOnOutsideClick]=\"false\">\r\n    </dx-load-panel>\r\n    <dx-data-grid #dataGrid\r\n                  id=\"gridContainer\"\r\n                  noDataText=\"\"\r\n                  [showColumnHeaders]=\"false\"\r\n                  (onToolbarPreparing)=\"onToolbarPreparing($event)\"\r\n                  [showColumnLines]=\"false\"\r\n                  [showRowLines]=\"true\"\r\n                  [showBorders]=\"true\"\r\n                  [wordWrapEnabled]=\"true\"\r\n                  [autoExpandAll]=\"true\"\r\n                  [grouping]=\"{allowCollapsing : false}\"\r\n                  [dataSource]=\"questionsByCharacteristic\"\r\n                  keyExpr=\"QuestionOid\"\r\n                  (onEditorPreparing)=\"onEditorPreparing($event)\"\r\n                  (onContentReady)=\"updateTable($event)\">\r\n      <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n      <dxo-load-panel [enabled]=\"true\"\r\n                      [showIndicator]=\"true\"\r\n                      [showPane]=\"false\"\r\n                      [shading]=\"false\"\r\n                      [message]=\"\"></dxo-load-panel>\r\n      <dxo-editing\r\n        mode=\"batch\"\r\n        [allowUpdating]=\"false\">\r\n      </dxo-editing>\r\n      <div *dxTemplate=\"let info of 'titleHeaderTemplate'\" class=\"data-grid-header\">\r\n\r\n      </div>\r\n      <dxi-column dataField=\"Title\"\r\n                  [groupIndex]=\"0\"\r\n                  groupCellTemplate=\"groupCellTemplate\"\r\n                  [allowSorting]=\"false\"\r\n                  sortOrder=\"asc\"\r\n                  calculateGroupValue=\"GroupShortTitle\"\r\n                  headerCellTemplate=\"titleHeaderTemplate\"></dxi-column>\r\n      <div *dxTemplate=\"let item of 'groupCellTemplate'\" >{{item.data.items[0].Title}}</div>\r\n      <dxi-column dataField=\"QuestionTitle\" caption=\"Question\" cellTemplate=\"questionCellTemplate\" headerCellTemplate=\"titleHeaderTemplate\"></dxi-column>\r\n\r\n      <div class=\"grid-slider-view\" *dxTemplate=\"let data of 'questionCellTemplate' let index = index\">\r\n        <div class=\"question-title\">{{data.data.QuestionTitle}}</div>\r\n        <div *ngIf=\"showGuidanceQuestion === data.rowIndex\" class=\"question-guidance\"\r\n             [innerHTML]=\"data.data?.GuidanceText | replaceLineBreaks\"></div>\r\n        <div *ngIf=\"data.data.IsGuidanceExists && showGuidanceQuestion !== data.rowIndex\"\r\n             (click)=\"toShowGuidanceQuestion(data)\"><a class=\"guidance-show\">Refer to guidance</a></div>\r\n        <div *ngIf=\"showGuidanceQuestion === data.rowIndex\" (click)=\"showGuidanceQuestion = null\"><a\r\n          class=\"guidance-show\">Close guidance</a></div>\r\n      </div>\r\n\r\n      <dxi-column dataField=\"AnswerChoise\" caption=\"Answer\"\r\n                  [showEditorAlways]=\"true\"\r\n                  editCellTemplate=\"sliderCellTemplate\" headerCellTemplate=\"titleHeaderTemplate\">\r\n      </dxi-column>\r\n      <div *dxTemplate=\"let data of 'sliderCellTemplate' let index = index \">\r\n        <dx-popover class=\"full-assess-popup-wrapper\"\r\n          target=\"#unknown{{data.rowIndex}}\"\r\n          position=\"top\"\r\n          [width]=\"300\"\r\n          [visible]=\"isPopupVisibleDontKnow === data.rowIndex\">\r\n          <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-dontknow-content\">\r\n           {{info}}\r\n          </div>\r\n          <dxo-animation>\r\n            <dxo-show\r\n              type=\"pop\"\r\n              [from]=\"{ scale: 0 }\"\r\n              [to]=\"{ scale: 1 }\"></dxo-show>\r\n            <dxo-hide\r\n              type=\"fade\"\r\n              [from]=\"1\"\r\n              [to]=\"0\"></dxo-hide>\r\n          </dxo-animation>\r\n        </dx-popover>\r\n        <dx-popover class=\"full-assess-popup-wrapper\"\r\n          target=\"#no{{data.rowIndex}}\"\r\n          position=\"top\"\r\n          [width]=\"300\"\r\n          [visible]=\"isPopupVisibleNo === data.rowIndex\">\r\n          <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-no-content\">\r\n            <h5>NO</h5>\r\n            {{info}}\r\n          </div>\r\n          <dxo-animation>\r\n            <dxo-show\r\n              type=\"pop\"\r\n              [from]=\"{ scale: 0 }\"\r\n              [to]=\"{ scale: 1 }\"></dxo-show>\r\n            <dxo-hide\r\n              type=\"fade\"\r\n              [from]=\"1\"\r\n              [to]=\"0\"></dxo-hide>\r\n          </dxo-animation>\r\n        </dx-popover>\r\n        <dx-popover class=\"full-assess-popup-wrapper\"\r\n          target=\"#partially{{data.rowIndex}}\"\r\n          position=\"top\"\r\n          [width]=\"300\"\r\n          [visible]=\"isPopupVisiblePartially === data.rowIndex\">\r\n          <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-partially-content\">\r\n            <h5>PARTIALLY</h5>\r\n            {{info}}\r\n          </div>\r\n          <dxo-animation>\r\n            <dxo-show\r\n              type=\"pop\"\r\n              [from]=\"{ scale: 0 }\"\r\n              [to]=\"{ scale: 1 }\"></dxo-show>\r\n            <dxo-hide\r\n              type=\"fade\"\r\n              [from]=\"1\"\r\n              [to]=\"0\"></dxo-hide>\r\n          </dxo-animation>\r\n        </dx-popover>\r\n        <dx-popover class=\"full-assess-popup-wrapper\"\r\n          target=\"#yes{{data.rowIndex}}\"\r\n          position=\"top\"\r\n          [width]=\"300\"\r\n          [visible]=\"isPopupVisibleYes === data.rowIndex\">\r\n          <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-yes-content\">\r\n            <h5>YES</h5>\r\n            {{info}}\r\n          </div>\r\n          <dxo-animation>\r\n            <dxo-show\r\n              type=\"pop\"\r\n              [from]=\"{ scale: 0 }\"\r\n              [to]=\"{ scale: 1 }\"></dxo-show>\r\n            <dxo-hide\r\n              type=\"fade\"\r\n              [from]=\"1\"\r\n              [to]=\"0\"></dxo-hide>\r\n          </dxo-animation>\r\n        </dx-popover>\r\n        <div class=\"slider-scale\">\r\n\r\n           <span class=\"answer-alignment-dont-know\"\r\n           >Unanswered</span>\r\n\r\n          <span *ngIf=\"data.data.UnknownAnswerGuidance !== disabledAnswerVariantText\" style=\"text-align: left;\"><span id=\"unknown{{data.rowIndex}}\" class=\"answer-alignment-dont-know\"\r\n                (mouseenter)=\"toggleDefault(data.rowIndex, 1, data.data.UnknownAnswerGuidance)\"\r\n                (mouseleave)=\"toggleDefault(null, 1)\"\r\n                [ngClass]=\"{'dont-know-color': data.data.AnswerChoise === 0 && isRelevantCharacteristic}\">I don't know</span></span>\r\n          <span *ngIf=\"data.data.NoAnswerGuidance !== disabledAnswerVariantText\" style=\"text-align: center;\"><span id=\"no{{data.rowIndex}}\"\r\n                class=\"answer-alignment-no\"\r\n                (mouseenter)=\"toggleDefault(data.rowIndex, 2, data.data.NoAnswerGuidance)\"\r\n                (mouseleave)=\"toggleDefault(null, 2)\"\r\n                [ngClass]=\"{'no-color':data.data.AnswerChoise === 1 && isRelevantCharacteristic}\">No</span></span>\r\n          <span *ngIf=\"data.data.PartiallyAnswerGuidance !== disabledAnswerVariantText\"><span id=\"partially{{data.rowIndex}}\"\r\n                (mouseenter)=\"toggleDefault(data.rowIndex, 3, data.data.PartiallyAnswerGuidance)\"\r\n                (mouseleave)=\"toggleDefault(null, 3)\"\r\n            class=\"answer-alignment-partially\"\r\n                [ngClass]=\"{'partially-color': data.data.AnswerChoise === 2 && isRelevantCharacteristic}\">Partially</span></span>\r\n          <span  *ngIf=\"data.data.YesAnswerGuidance !== disabledAnswerVariantText\"><span id=\"yes{{data.rowIndex}}\"\r\n                (mouseenter)=\"toggleDefault(data.rowIndex, 4, data.data.YesAnswerGuidance)\"\r\n                (mouseleave)=\"toggleDefault(null, 4)\"class=\"answer-alignment-yes\"\r\n                [ngClass]=\"{'yes-color': data.data.AnswerChoise === 3 && isRelevantCharacteristic}\">Yes</span></span>\r\n        </div>\r\n        <dx-slider *ngIf=\"answersNumber === 3\"\r\n          #slider\r\n          [min]=\"-1\"\r\n          [max]=\"3\"\r\n          [value]=\"data.data.AnswerChoise ? data.data.AnswerChoise : 0\"\r\n          [showRange]=\"true\"\r\n          (onValueChanged)=\"getAnswer($event, data)\"\r\n          [disabled]=\"!isRelevantCharacteristic\"\r\n          (mouseenter)=\"toggleWithTitle()\"\r\n        >\r\n         <!-- <dxo-tooltip *ngIf=\"slider.value > -1\" #tooltip class=\"tooltip-style\"\r\n                      target=\"#slider\"\r\n                       [enabled]=\"true\"\r\n                       [format]=\"format(slider.value, data)\"\r\n                       [height]=\"170\"\r\n                       [width]=\"200\"\r\n                       position=\"top\"\r\n                       contentTemplate=\"tooltipContent\"\r\n                       >\r\n          </dxo-tooltip>-->\r\n         </dx-slider>\r\n        <p class=\"unanswered-label\" *ngIf=\"data.data.AnswerOid === 0\">UNANSWERED</p>\r\n      </div>\r\n\r\n    </dx-data-grid>\r\n  </div>\r\n  <dx-popup #dxPopup\r\n            [width]=\"500\"\r\n            [height]=\"150\"\r\n            [showTitle]=\"true\"\r\n            title=\"Would You Like to change Assessment Type?\"\r\n            [dragEnabled]=\"false\"\r\n            [closeOnOutsideClick]=\"false\"\r\n            [closeOnBackButton]=\"false\"\r\n            [showCloseButton]=\"false\"\r\n            [allowUpdating]=\"true\"\r\n            [(visible)]=\"isNotificationShow\"\r\n  >\r\n    <div *dxTemplate=\"let data of 'content'\">\r\n      <dx-button\r\n        class=\"change-assessment\"\r\n        [text]=\"buttonText\"\r\n        [width]=\"210\"\r\n        [height]=\"44\"\r\n        (onClick)=\"changeAssessmentType($event)\">\r\n      </dx-button>\r\n      <dx-button\r\n        class=\"favorites\"\r\n        [text]=\"buttonTextNo\"\r\n        [width]=\"210\"\r\n        [height]=\"44\"\r\n        (onClick)=\"redirectToCharts($event)\">\r\n      </dx-button>\r\n    </div>\r\n  </dx-popup>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.data-grid-full-wrapper {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr 5fr;\n      grid-template-columns: 1fr 5fr; }\n.data-grid-full-wrapper /deep/ .dx-datagrid-rowsview.dx-last-row-border .dx-datagrid-content .dx-datagrid-table.dx-datagrid-table-fixed {\n    table-layout: auto !important; }\n.data-grid-full-wrapper /deep/ .dx-row.dx-data-row.dx-row-lines td:nth-child(2) {\n    width: 60%;\n    display: table-cell; }\n.data-grid-full-wrapper .data-grid-container {\n    background-color: #fff;\n    margin-bottom: 15px; }\n.data-grid-full-wrapper .table-header {\n    position: relative; }\n.data-grid-full-wrapper /deep/ .dx-item {\n    width: inherit !important; }\n.data-grid-full-wrapper /deep/ .slider-scale {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr;\n        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n    font-size: 14px;\n    font-weight: 500;\n    color: #9898A5;\n    padding: 0 8px; }\n.data-grid-full-wrapper /deep/ .slider-scale .answer-alignment-dont-know {\n      text-align: left; }\n.data-grid-full-wrapper /deep/ .slider-scale .answer-alignment-no {\n      text-align: center;\n      padding-right: 12px; }\n.data-grid-full-wrapper /deep/ .slider-scale .answer-alignment-partially {\n      text-align: right;\n      padding-right: 10px; }\n.data-grid-full-wrapper /deep/ .slider-scale span span {\n      font-size: 12px; }\n.data-grid-full-wrapper .data-grid-container-header {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    height: 50px;\n    padding: 15px;\n    background-color: #C7EBFB;\n    color: #fff;\n    font-weight: bold; }\n.data-grid-full-wrapper .table-header {\n    grid-column: 1 / -1;\n    height: 50px;\n    background-color: #6CCDFA;\n    display: -ms-grid;\n    display: grid;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    color: #fff;\n    padding: 15px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n.data-grid-full-wrapper .data-grid-full-selector {\n    height: 35px;\n    width: 250px; }\n.data-grid-full-wrapper /deep/ dx-select-box {\n    width: 250px !important; }\n.data-grid-full-wrapper /deep/ .dx-slider .dx-tooltip-wrapper .dx-overlay-content {\n    width: 220px !important;\n    height: 90px !important;\n    display: block; }\n.data-grid-full-wrapper /deep/ .dx-tooltip-wrapper .dx-overlay-content .dx-popup-content {\n    white-space: normal;\n    height: 100% !important;\n    padding: 15px 10px 0 15px;\n    line-height: 1.3em;\n    text-align: left;\n    color: #fff;\n    display: block; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"0\"] .dx-overlay-content .dx-popup-content {\n    background-color: #B8EDFF; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content .dx-popup-content {\n    background-color: #6BC89F; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"2\"] .dx-overlay-content .dx-popup-content {\n    background-color: #FE962C; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"1\"] .dx-overlay-content .dx-popup-content {\n    background-color: #FD001A; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover .dx-overlay-content .dx-popover-arrow {\n    width: 15px;\n    height: 10px;\n    background-color: transparent; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover .dx-overlay-content .dx-popover-arrow:after {\n    border-width: 10px 7.5px 0 7.5px;\n    -webkit-transform: none;\n            transform: none;\n    background-color: transparent; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"0\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #B8EDFF transparent transparent transparent; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #6BC89F transparent transparent transparent; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"2\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #FE962C transparent transparent transparent; }\n.data-grid-full-wrapper /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"1\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #FD001A transparent transparent transparent; }\n.data-grid-full-wrapper /deep/ .dx-datagrid.dx-datagrid-borders .dx-datagrid-header-panel {\n    height: 0; }\n@media all and (max-width: 768px) {\n  .data-grid-full-wrapper {\n    -ms-grid-columns: none;\n        grid-template-columns: none; } }\n.data-grid-full-wrapper .dx-template-wrapper {\n  padding: 0; }\n.data-grid-full-wrapper .characteristic-container {\n  display: -ms-grid;\n  display: grid;\n  grid-gap: 20px;\n  width: 100%;\n  -ms-grid-columns: auto 7fr 100px;\n      grid-template-columns: auto 7fr 100px;\n  padding: 15px 0 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 12px;\n  color: #000; }\n.data-grid-full-wrapper .characteristic-container .characteristic-info {\n    position: relative;\n    border: 1px solid #DCDCDC;\n    grid-row: 1 / 3;\n    /* autoprefixer: off */\n    padding: 10px; }\n.data-grid-full-wrapper .characteristic-container .characteristic-relevant span {\n    font-size: 14px;\n    color: #989898;\n    margin-bottom: 15px;\n    display: inline-block; }\n.data-grid-full-wrapper .characteristic-container .characteristic-description {\n    font-size: 15px;\n    margin-bottom: 15px; }\n.data-grid-full-wrapper .characteristic-container .characteristic-info a {\n    font-size: 12px;\n    color: #6BCDFD;\n    text-decoration: underline;\n    cursor: pointer; }\n.data-grid-full-wrapper .characteristic-container .characteristic-type-style {\n    font-size: 22px;\n    margin: 0 0 15px;\n    color: #666; }\n.data-grid-full-wrapper .characteristic-container .characteristic-type-style .font-bold {\n      font-weight: bold; }\n.data-grid-full-wrapper .characteristic-container .characteristic-reference-container {\n    border: 1px solid #DCDCDC;\n    min-width: 36px;\n    text-align: center;\n    grid-row: 1 / 3;\n    padding-top: 10px;\n    font-size: 12px;\n    color: #666;\n    /* autoprefixer: off */ }\n.data-grid-full-wrapper /deep/ .dx-datagrid {\n  padding: 15px 0; }\n.data-grid-full-wrapper /deep/ dx-data-grid > .dx-datagrid {\n  min-height: 175px;\n  height: auto;\n  max-height: calc(100vh - 320px);\n  overflow-y: auto; }\n.data-grid-full-wrapper .grid-slider-view a {\n  font-size: 12px;\n  color: #6BCDFD;\n  text-decoration: underline;\n  cursor: pointer; }\n.data-grid-full-wrapper .inner-padding {\n  padding: 0px 20px 0;\n  margin: 0; }\n.assessment-selector-container {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 100px 250px;\n      grid-template-columns: 100px 250px;\n  margin-bottom: 15px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 14px; }\n.question-guidance {\n  font-size: 12px;\n  font-style: italic; }\n.question-title {\n  margin-bottom: 15px;\n  color: #9898A5; }\n/deep/ dx-tabs {\n  margin-bottom: 15px;\n  /*.dx-tab:first-child {\r\n      border-top-left-radius: 50px;\r\n      border-bottom-left-radius: 50px;\r\n    }\r\n    .dx-tab:last-child {\r\n      border-top-right-radius: 50px;\r\n      border-bottom-right-radius: 50px;\r\n    }*/ }\n/deep/ dx-tabs .dx-tab {\n    color: #CBCBCB;\n    font-weight: bold;\n    font-size: 11px; }\n/deep/ dx-tabs .dx-tab.dx-tab-selected {\n    background-color: #F3F3F3;\n    color: #6BCDFD; }\n/deep/ dx-tabs .dx-badge {\n    background-color: silver; }\n/deep/ dx-tabs .dx-tabs-item-badge {\n    vertical-align: inherit;\n    margin-left: 5px; }\n/deep/ dx-tabs .dx-badge {\n    display: none; }\n/deep/ dx-button {\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 100%;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n/deep/ dx-button:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\n:host /deep/ .tooltip-style dx-slider .dx-overlay-content .dx-popup-normal .dx-resizable {\n  background-color: red !important; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container {\n  background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container :hover {\n    background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-state-hover {\n  background: #D8D9DB; }\n/deep/ dx-slider .dx-slider-handle {\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  background-color: #fff;\n  border: 3px solid #DCDCDC; }\n/deep/ dx-slider .dx-state-hover.dx-slider-handle:not(.dx-state-active) {\n  background-color: transparent;\n  border: 3px solid #DCDCDC; }\n/deep/ dx-slider .dx-trackbar-range .dx-slider-range .dx-slider-range-visible {\n  background-color: #D8DBE3 !important; }\n/deep/ dx-slider .dx-widget .dx-slider-handle .dx-slider-tooltip-on-hover {\n  background-color: #D8DBE3 !important; }\n/deep/ dx-slider .dx-slider-range.dx-slider-range-visible {\n  border: none;\n  background: none; }\n/deep/ dx-slider .data-grid-wrapper dx-slider .dx-state-hover.dx-slider-handle:not(.dx-state-active) {\n  background-color: #fff !important;\n  color: #9898A5; }\n/deep/ dx-slider .dx-state-hover {\n  background-color: #fff !important; }\n/deep/ dx-data-grid .dx-editor-cell {\n  padding: 5px !important; }\n/deep/ dx-data-grid .dx-datagrid-rowsview .dx-data-row .dx-cell-modified .dx-highlight-outline::after {\n  border: none; }\n/deep/ dx-switch .dx-switch-container {\n  background: #4AD768;\n  border-radius: 22px;\n  border: none;\n  height: 22px; }\n/deep/ dx-switch .dx-switch-container :hover {\n    background: #4AD768;\n    border-radius: 22px; }\n/deep/ dx-switch .dx-switch-handle {\n  width: 18px;\n  height: 18px;\n  margin-left: -18px; }\n/deep/ dx-switch .dx-switch-handle :hover {\n    background-color: #fff; }\n/deep/ dx-switch .dx-switch-off {\n  color: transparent; }\n/deep/ dx-switch .dx-switch-handle:before {\n  border-radius: 50%;\n  background-color: #fff !important; }\n/deep/ dx-switch .dx-state-hover {\n  background: #4AD768; }\n/deep/ dx-switch .dx-visibility-change-handler {\n  background-color: #fff; }\n/deep/ dx-switch .dx-switch-on {\n  color: transparent; }\n.dont-know-color {\n  color: #6BCDFA; }\n.no-color {\n  color: #FD001A; }\n.partially-color {\n  color: #FE962C; }\n.yes-color {\n  color: #6BC89F; }\n.top-navigation {\n  display: -ms-grid;\n  display: grid;\n  grid-column: 1 / -1;\n  width: 65%;\n  -ms-grid-columns: auto auto auto auto auto;\n      grid-template-columns: auto auto auto auto auto;\n  font-size: 12px;\n  font-weight: bold;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer; }\n.top-navigation .nav-item {\n    padding: 10px;\n    border: 1px solid #d8d8d8;\n    border-right: none !important;\n    text-align: center; }\n.top-navigation .nav-item:first-child {\n      border-top-left-radius: 20px;\n      border-bottom-left-radius: 20px;\n      border-right: none !important; }\n.top-navigation .nav-item:last-child {\n      border-top-right-radius: 20px;\n      border-bottom-right-radius: 20px;\n      border: 1px solid #d8d8d8 !important; }\n.top-navigation .nav-item:not(:last-child) {\n      border-right: 1px solid #d8d8d8; }\n.top-navigation .top-navigation-active {\n    background-color: #fff;\n    color: #6BCDFD; }\n.characteristic-tabs {\n  list-style-type: none;\n  color: #66667F;\n  font-size: 12px;\n  font-weight: bold;\n  padding-left: 0; }\n.characteristic-tabs .characteristic-tabs-item {\n    line-height: 15px;\n    padding: 10px 0 10px 15px;\n    background-color: #F9F9F9;\n    font-size: 12px;\n    border-top: 1px solid #D8CFCB;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n.characteristic-tabs .characteristic-tabs-item:first-child {\n      border-top: none; }\n.characteristic-tabs .characteristic-tabs-item:hover {\n      color: #666666;\n      cursor: pointer; }\n.characteristic-tabs .active {\n    background-color: #fff;\n    color: #666666; }\n.data-grid-header {\n  display: none; }\n.popover-content {\n  background-color: #6BCDFA;\n  color: #fff;\n  padding: 0; }\n.unanswered-label {\n  width: 100px;\n  height: 20px;\n  background-color: silver;\n  border-radius: 3px;\n  text-align: center;\n  color: #fff;\n  font-size: 12px;\n  line-height: 20px;\n  margin-left: 10px; }\n.popover-dontknow-content {\n  background-color: #6BCDFA;\n  color: #fff;\n  padding: 0; }\n.popover-no-content {\n  background-color: #FD001A;\n  color: #fff;\n  padding: 0; }\n.popover-partially-content {\n  background-color: #FE962C;\n  color: #fff;\n  padding: 0; }\n.popover-yes-content {\n  background-color: #6BC89F;\n  color: #fff;\n  padding: 0; }\n.unanswered-characteristic-label {\n  border-radius: 50%;\n  background-color: red;\n  color: #fff;\n  margin-right: 10px;\n  width: 20px;\n  height: 18px;\n  text-align: center;\n  line-height: 20px;\n  display: inline-block; }\n.ununswered-null {\n  background-color: silver;\n  margin-right: 10px;\n  width: 20px;\n  height: 18px;\n  text-align: center;\n  line-height: 18px; }\n.answered-characteristic-label {\n  border-radius: 50%;\n  background-color: #6EC676;\n  color: #fff;\n  margin-right: 10px;\n  width: 20px;\n  height: 18px;\n  text-align: center;\n  line-height: 18px;\n  display: inline-block;\n  font-size: 15px;\n  vertical-align: middle; }\n.fullscreen-exit-icon {\n  display: none; }\n.fullscreen-btn {\n  position: absolute;\n  top: 50%;\n  right: 20px;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  cursor: pointer;\n  -webkit-transition: all .25s linear;\n  transition: all .25s linear;\n  color: #fff; }\n.fullscreen-btn:hover {\n    font-size: 30px; }\n.assessment-full-selector-container /deep/ dx-tabs {\n  margin-bottom: 5px; }\n.status-label {\n  position: absolute;\n  top: 10px;\n  right: 10px; }\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentCaptureFullComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_devextreme_angular_ui_nested_tooltip__ = __webpack_require__("./node_modules/devextreme-angular/ui/nested/tooltip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_devextreme_angular_ui_nested_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_devextreme_angular_ui_nested_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_questions_service__ = __webpack_require__("./client/app/shared/services/questions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};














var AssessmentCaptureFullComponent = (function () {
    function AssessmentCaptureFullComponent(assessmentCaptureFullService, questionsService, unitService, userService, standardsService, router, registrationSettingsService, assesmentStateService, homeService, changeDetector, upperCasePipe) {
        this.assessmentCaptureFullService = assessmentCaptureFullService;
        this.questionsService = questionsService;
        this.unitService = unitService;
        this.userService = userService;
        this.standardsService = standardsService;
        this.router = router;
        this.registrationSettingsService = registrationSettingsService;
        this.assesmentStateService = assesmentStateService;
        this.homeService = homeService;
        this.changeDetector = changeDetector;
        this.upperCasePipe = upperCasePipe;
        this.saveButton = true;
        this.characteristicList = [];
        this.currentCharacteristic = {};
        this.showGuidanceQuestion = false;
        this.updating = false;
        this.arrayForTabs = [];
        this.firstNotAnsweredIndex = -1;
        this.isDementionOrPrinsipleSelected = false;
        this.isRelevantShown = false;
        this.isNotificationShow = false;
        this.buttonText = 'Change Assessment Type';
        this.buttonTextNo = 'Cancel';
        this.completeBy = 1;
        this.activeTab = 0;
        this.loadingVisible = false;
        this.loadText = '';
        this.showFullScreenTooltip = false;
        this.info = '';
        this.disabledAnswerVariantText = '';
        this.answersNumber = 3;
    }
    AssessmentCaptureFullComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.disabledAnswerVariantText = this.userService.disabledAnswerVariantText;
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (item) {
            console.log('SELECTORUNIT', item);
            _this.unitService.getUnitById(_this.userService.getCurrentUser().CurrentUnitId)
                .subscribe(function (unit) {
                console.log('UNIT', unit);
                _this.currentUnit = unit;
                if (unit.AssessmentType === (null || -1)) {
                    _this.currentUnit = unit;
                    _this.currentUnit['AssessmentType'] = 0;
                    _this.registrationSettingsService.addOrUpdateUnit(_this.currentUnit)
                        .subscribe(function (unit) {
                        console.log('this.currentUnit[AssessmentType] = 0;', unit);
                        _this.loadData();
                    });
                }
                if (unit.AssessmentType === 1) {
                    _this.isNotificationShow = true;
                    _this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
                        arg.stopPropagation();
                    });
                }
                else {
                    _this.loadData();
                    console.log('this.currentUnit[AssessmentType] allready 0;');
                }
                console.log('unit', unit);
            });
        });
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
            .subscribe(function (unit) {
            if (_this.assesmentStateService.getDimentionOid().type && _this.assesmentStateService.getDimentionOid().oid) {
                console.log(_this.assesmentStateService.getDimentionOid());
                _this.assessmentCaptureFullService.setDataFromCompleteByFilter(_this.assesmentStateService.getDimentionOid().oid);
            }
            console.log('UNIT', unit);
            _this.currentUnit = unit;
            if (unit.AssessmentType === (null || -1)) {
                _this.currentUnit = unit;
                _this.currentUnit['AssessmentType'] = 0;
                _this.registrationSettingsService.addOrUpdateUnit(_this.currentUnit)
                    .subscribe(function (unit) {
                    console.log('updatedunit', unit);
                    _this.loadData();
                });
            }
            if (unit.AssessmentType === 1) {
                _this.isNotificationShow = true;
                console.log('ONINIT unit.AssessmentType === 1');
                _this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
                    arg.stopPropagation();
                });
            }
            if (unit.AssessmentType === 0) {
                _this.loadData();
                console.log('ONINIT unit.AssessmentType === 0');
            }
            console.log('unit', unit);
        });
    };
    AssessmentCaptureFullComponent.prototype.loadData = function () {
        var _this = this;
        if (this.isDone) {
            this.isDone.unsubscribe();
        }
        this.isDone = this.assessmentCaptureFullService.getDataFromCompleteByFilter()
            .subscribe(function (filter) {
            _this.firstNotAnsweredIndex = -1;
            _this.arrayForTabs = [];
            _this.questionsByCharacteristic = [];
            _this.currentCharacteristic = {};
            _this.characteristicList = [];
            _this.filter = filter;
            _this.activeTab = 0;
            console.log(filter);
            if (_this.filter.type) {
                _this.assessmentCaptureFullService.getFullListDimentionsOrPrincipleGroups(_this.filter.type)
                    .subscribe(function (arrayForTabs) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var i, i;
                    return __generator(this, function (_a) {
                        if (arrayForTabs.length === 0) {
                            this.userService.showUserNotification("No " + this.filter.type + " yet", 'error');
                            return [2 /*return*/];
                        }
                        this.dataGrid.instance.beginCustomLoading('Loading..');
                        console.log('getFullListDimentionsOrPrincipleGroups', arrayForTabs);
                        this.arrayForTabs = [];
                        for (i = 0; i < arrayForTabs.length; i++) {
                            this.arrayForTabs.push({
                                id: arrayForTabs[i]['OID'],
                                text: this.upperCasePipe.transform(arrayForTabs[i].ShortTitle),
                                content: this.filter.selector,
                                badge: arrayForTabs[i].CharacteristicsCount
                            });
                        }
                        console.log(this.filter.type, this.arrayForTabs);
                        if (this.assesmentStateService.getDimentionOid().oid) {
                            for (i = 0; i < arrayForTabs.length; i++) {
                                if (arrayForTabs[i].OID === this.assesmentStateService.getDimentionOid().oid) {
                                    this.firstNotAnsweredIndex = i;
                                }
                            }
                        }
                        else {
                            if (arrayForTabs.findIndex(this.notAnswered) > -1) {
                                this.firstNotAnsweredIndex = arrayForTabs.findIndex(this.notAnswered);
                            }
                            else {
                                this.firstNotAnsweredIndex = 0;
                            }
                        }
                        this.currentTab = this.arrayForTabs[this.firstNotAnsweredIndex];
                        this.isDementionOrPrinsipleSelected = true;
                        if (this.arrayForTabs.length) {
                            this.standardsService.getCharacteristicByGroupOrPrinciple(this.arrayForTabs[this.firstNotAnsweredIndex].id, this.filter.selector)
                                .subscribe(function (characteristicList) {
                                _this.characteristicList = characteristicList;
                                //this.firstNotCapturedCharacteristic = this.characteristicList[0].OID;
                                // this.activeTab = this.firstNotCapturedCharacteristic;
                                _this.getCharacteristicsListWithQuestionsAndCharacteristicByOid(_this.characteristicList[0].OID);
                            }, function (error) {
                                _this.userService.showUserNotification(error.error.Message, 'error');
                                console.log(error);
                            });
                        }
                        return [2 /*return*/];
                    });
                }); }, function (error) {
                    _this.userService.showUserNotification(error.error.Message, 'error');
                    console.log(error);
                });
            }
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error);
        });
    };
    AssessmentCaptureFullComponent.prototype.countMaxAnswersNumber = function (number) {
        console.log('number', number);
        return 3 - number;
    };
    AssessmentCaptureFullComponent.prototype.getCharacteristicsListWithQuestionsAndCharacteristicByOid = function (characteristicOid) {
        var _this = this;
        var answersVariantsCounter = 0;
        var questionArray$ = this.assessmentCaptureFullService.getQuestionsByCharacteristicAndUnit(characteristicOid);
        var currentCharacteristicItem$ = this.assessmentCaptureFullService.getCurrentCharacteristic(characteristicOid);
        __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].forkJoin([questionArray$, currentCharacteristicItem$])
            .subscribe(function (results) {
            _this.questionsByCharacteristic = [];
            _this.questionsByCharacteristic = results[0].QuestionsList;
            console.log('this.questionsByCharacteristic', _this.questionsByCharacteristic);
            _this.dataGrid.instance.endCustomLoading();
            for (var i = 0; i < _this.questionsByCharacteristic.length; i++) {
                _this.answersNumber = 3;
                answersVariantsCounter = 0;
                if (_this.questionsByCharacteristic[i].AnswerOid === 0) {
                    // this.unansweredQuestionsCounter++;
                    _this.dataGrid.instance.cellValue(i, 2, _this.questionsByCharacteristic[i].AnswerChoise);
                    console.log('questions', _this.questionsByCharacteristic);
                }
                /* this.questionsByCharacteristic[i].UnknownAnswerGuidance === this.disabledAnswerVariantText ? answersVariantsCounter++ : 0;
                 this.questionsByCharacteristic[i].NoAnswerGuidance === this.disabledAnswerVariantText ? answersVariantsCounter++ : 0;
                 this.questionsByCharacteristic[i].PartiallyAnswerGuidance === this.disabledAnswerVariantText ? answersVariantsCounter++ : 0;
                 this.questionsByCharacteristic[i].YesAnswerGuidance === this.disabledAnswerVariantText ? answersVariantsCounter++ : 0;
                 //this.countMaxAnswersNumber(answersVariantsCounter)
                 this.answersNumber = this.answersNumber - answersVariantsCounter;*/
            }
            _this.isRelevantCharacteristic = results[0].IsRelevantCharacteristic;
            _this.isRelevantShown = true;
            _this.currentCharacteristic = results[1];
            _this.loadingVisible = false;
            console.log('characteristic', results[1]);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error);
        });
    };
    AssessmentCaptureFullComponent.prototype.ngAfterViewChecked = function () {
        this.changeDetector.detectChanges();
    };
    AssessmentCaptureFullComponent.prototype.setCurrentCharacteristic = function (tab, index) {
        this.questionsByCharacteristic = [];
        this.activeTab = index;
        this.loadingVisible = true;
        this.dataGrid.instance.beginCustomLoading('Loading..');
        var characteristicOid;
        if (tab === null) {
            characteristicOid = this.characteristicList[0].OID;
        }
        else {
            characteristicOid = tab.OID;
        }
        this.currentCharacteristic = this.characteristicList[index];
        this.getCharacteristicsListWithQuestionsAndCharacteristicByOid(characteristicOid);
    };
    AssessmentCaptureFullComponent.prototype.format = function (value, data) {
        var customTooltips = [
            data.data.UnknownAnswerGuidance,
            data.data.NoAnswerGuidance,
            data.data.PartiallyAnswerGuidance,
            data.data.YesAnswerGuidance
        ];
        var newValue = customTooltips[value];
        return newValue;
    };
    AssessmentCaptureFullComponent.prototype.onEditorPreparing = function (event) {
        console.info('editor prepearing', event);
        if ((event.dataField == "QuestionTitle") && event.parentType == "dataRow") {
            event.editorOptions.disabled = true;
            event.editorOptions.readOnly = true;
        }
    };
    AssessmentCaptureFullComponent.prototype.getAnswer = function (event, data) {
        var _this = this;
        var answer = [];
        console.log('DATA', data.data);
        console.log('EVENT', event);
        data.data.AnswerChoise = event.value;
        answer.push({
            "Unit": this.currentUnit.Oid,
            "User": this.userService.getCurrentUser().Oid,
            "AnswerText": data.data.AnswerText,
            "Choice": data.data.AnswerChoise,
            "AssessmentType": this.currentUnit.AssessmentType,
            "Question": data.data.QuestionOid,
            "OID": data.data.AnswerOid,
            "Characteristic": this.currentCharacteristic['OID']
        });
        if (event.value > -1) {
            this.questionsService.addAnswersArray(answer)
                .subscribe(function (response) {
                if (data.data.AnswerOid === 0) {
                    data.data.AnswerOid = response.body[0].OID;
                }
                console.log('this.activeTab1', _this.activeTab);
                if (answer[0].OID === 0) {
                    console.log('this.activeTab2', _this.activeTab);
                    console.log('this.characteristicList[this.activeTab].Answers', _this.characteristicList[_this.activeTab].Answers);
                    _this.characteristicList[_this.activeTab].Answers.length--;
                    if (_this.characteristicList[_this.activeTab].Answers.length === 0) {
                        _this.arrayForTabs[_this.firstNotAnsweredIndex].badge = (+_this.arrayForTabs[_this.firstNotAnsweredIndex].badge - 1).toString();
                    }
                }
                console.log('this.arrayForTabs[this.firstNotAnsweredIndex]', _this.arrayForTabs[_this.firstNotAnsweredIndex]);
                _this.userService.showUserNotification("Answer was updated", 'success');
                console.log('response', response);
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }
        else {
            this.questionsService.deleteAnswer(data.data.AnswerOid)
                .subscribe(function (deletedAnswer) {
                console.log('DELETE answer', deletedAnswer);
                data.data.AnswerOid = 0;
                _this.characteristicList[_this.activeTab].Answers.length++;
                if (_this.characteristicList[_this.activeTab].Answers.length === 1) {
                    _this.arrayForTabs[_this.firstNotAnsweredIndex].badge = (+_this.arrayForTabs[_this.firstNotAnsweredIndex].badge + 1).toString();
                }
                console.log('this.arrayForTabs[this.firstNotAnsweredIndex]', _this.arrayForTabs[_this.firstNotAnsweredIndex]);
                _this.userService.showUserNotification("Answer was updated", 'success');
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }
        console.log('this.questionsByCharacteristic', this.questionsByCharacteristic);
    };
    AssessmentCaptureFullComponent.prototype.onToolbarPreparing = function (e) {
        console.log('onToolbarPreparing', e.toolbarOptions);
        var indexRevertButton = e.toolbarOptions.items.indexOf(e.toolbarOptions.items.find(function (item) {
            return item.name == "revertButton";
        }));
        if (indexRevertButton != -1) {
            e.toolbarOptions.items.splice(indexRevertButton, 1);
        }
    };
    AssessmentCaptureFullComponent.prototype.toShowGuidanceQuestion = function (data) {
        console.log('dataindex', data);
        this.showGuidanceQuestion = data.rowIndex;
    };
    AssessmentCaptureFullComponent.prototype.updateTable = function (event) {
        if (this.updating && !event.component.hasEditData()) {
            console.log("onContentReady");
            this.updating = false;
        }
    };
    AssessmentCaptureFullComponent.prototype.notAnswered = function (element, index, array) {
        if (element.UnAnsweredQuestionsCount > 0) {
            return index;
        }
    };
    AssessmentCaptureFullComponent.prototype.selectTab = function (event) {
        var _this = this;
        console.log(event);
        this.dataGrid.instance.beginCustomLoading('Loading..');
        this.loadingVisible = true;
        this.characteristicList = [];
        this.currentCharacteristic = {};
        this.questionsByCharacteristic = [];
        this.activeTab = 0;
        this.firstNotAnsweredIndex = event.itemIndex;
        this.currentTab = this.arrayForTabs[event.itemIndex];
        this.standardsService.getCharacteristicByGroupOrPrinciple(event.itemData.id, event.itemData.content)
            .subscribe(function (characteristicList) {
            _this.characteristicList = characteristicList;
            _this.currentCharacteristic = _this.characteristicList[0];
            _this.getCharacteristicsListWithQuestionsAndCharacteristicByOid(_this.characteristicList[0].OID);
            console.log('CHARACTERISTIC', characteristicList);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error);
        });
    };
    AssessmentCaptureFullComponent.prototype.changeCharacteristicRelevant = function (event) {
        var _this = this;
        console.log('relevant', event);
        if (!event.value) {
            this.assessmentCaptureFullService.addNonRelevantCharacteristic(this.currentCharacteristic['OID'])
                .subscribe(function (response) {
                console.log('addNonRelevantCharacteristic', response);
                _this.isRelevantCharacteristic = false;
            });
        }
        if (event.value) {
            this.assessmentCaptureFullService.removeNonRelevantCharacteristic(this.currentCharacteristic['OID'])
                .subscribe(function (response) {
                console.log('removeNonRelevantCharacteristic', response);
                _this.isRelevantCharacteristic = true;
            });
        }
    };
    AssessmentCaptureFullComponent.prototype.changeAssessmentType = function (event) {
        var _this = this;
        console.log(event);
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
            .subscribe(function (unit) {
            _this.currentUnit = unit;
            _this.currentUnit['AssessmentType'] = 0;
            _this.registrationSettingsService.addOrUpdateUnit(_this.currentUnit)
                .subscribe(function (unit) {
                console.log('updatedunit', unit);
                _this.userService.showUserNotification('Assessment Type was Updated', 'success');
                _this.isNotificationShow = false;
                _this.loadData();
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    AssessmentCaptureFullComponent.prototype.redirectToCharts = function () {
        this.router.navigate(['assessment-current-status']);
    };
    AssessmentCaptureFullComponent.prototype.toggleWithTitle = function () {
        // this.defaultVisible = !this.defaultVisible;
        console.log('hi');
    };
    AssessmentCaptureFullComponent.prototype.toggleDefault = function (index, variant, info) {
        if (variant === 1) {
            this.isPopupVisibleDontKnow = index;
        }
        if (variant === 2) {
            this.isPopupVisibleNo = index;
        }
        if (variant === 3) {
            this.isPopupVisiblePartially = index;
        }
        if (variant === 4) {
            this.isPopupVisibleYes = index;
        }
        if (info) {
            this.info = info;
        }
    };
    AssessmentCaptureFullComponent.prototype.toggleFullScreenToolTip = function () {
        this.showFullScreenTooltip = !this.showFullScreenTooltip;
    };
    AssessmentCaptureFullComponent.prototype.toggleFullScreenMode = function (mode) {
        this.homeService.changeFullscreenMode(mode);
    };
    AssessmentCaptureFullComponent.prototype.ngOnDestroy = function () {
        this.isDone.unsubscribe();
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    AssessmentCaptureFullComponent.prototype.getReplaseString = function (string) {
        console.log(string.replace(new RegExp('\n', 'g'), "<br />"));
        return string.replace(string.replace(new RegExp('\n', 'g'), "<br />"));
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxDataGridComponent"])
    ], AssessmentCaptureFullComponent.prototype, "dataGrid", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tooltip'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_devextreme_angular_ui_nested_tooltip__["DxoTooltipComponent"])
    ], AssessmentCaptureFullComponent.prototype, "tooltip", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("apiTabs"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxTabsComponent"])
    ], AssessmentCaptureFullComponent.prototype, "apiTabs", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("dxPopup"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxPopupComponent"])
    ], AssessmentCaptureFullComponent.prototype, "dxPopup", void 0);
    AssessmentCaptureFullComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-assessment-capture-full',
            template: __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.html"),
            styles: [__webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__assessment_capture_full_service__["a" /* AssessmentCaptureFullService */],
            __WEBPACK_IMPORTED_MODULE_11__shared_services_questions_service__["a" /* QuestionsService */],
            __WEBPACK_IMPORTED_MODULE_12__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_13__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_10__standards_standards_service__["a" /* StandardsService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_7__assessment_state_assessment_state_service__["a" /* AssessmentStateService */],
            __WEBPACK_IMPORTED_MODULE_8__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["UpperCasePipe"]])
    ], AssessmentCaptureFullComponent);
    return AssessmentCaptureFullComponent;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentCaptureFullService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AssessmentCaptureFullService = (function () {
    function AssessmentCaptureFullService(httpClient, userService, unitService, standardService) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.unitService = unitService;
        this.standardService = standardService;
        this.filterParam$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_BehaviorSubject__["BehaviorSubject"](1);
    }
    AssessmentCaptureFullService.prototype.getQuestionsByCharacteristicAndUnit = function (characteristicOid) {
        /* return this.userService.getUserInfo()
           .switchMap(user => {
           console.log('currentUSER', user.body);
           this.currentUnitId = user.body['CurrentUnitId'];
           this.currentUserId = user.body['Oid'];*/
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetListByCharacteristicAndUnit(" + characteristicOid + ")");
    };
    AssessmentCaptureFullService.prototype.getCharacteristicsByCurrentStandard = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            console.log('USER', user.body['CurrentUnitId']);
            return _this.unitService.getUnitById(user.body['CurrentUnitId'])
                .switchMap(function (unit) {
                console.log('UNIT current standard', unit['CurrentStandardId']);
                var currentUnit = unit;
                return _this.standardService.getCharacteristicsByStandard();
            });
        });
    };
    AssessmentCaptureFullService.prototype.getCurrentCharacteristic = function (id) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/Get(" + id + ")");
    };
    AssessmentCaptureFullService.prototype.getFirstNotCapturedCharacteristic = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetFirstNotCapturedCharacteristic");
    };
    AssessmentCaptureFullService.prototype.getFirstNotCapturedCharacteristicByPrinciple = function (_a) {
        var principleOid = _a.principleOid;
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetFirstNotCapturedCharacteristicByPrinciple(" + principleOid + ")");
    };
    AssessmentCaptureFullService.prototype.getFirstNotCapturedCharacteristicByDimension = function (_a) {
        var dimensionOid = _a.dimensionOid;
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetFirstNotCapturedCharacteristicByDimension(" + dimensionOid + ")");
    };
    AssessmentCaptureFullService.prototype.getFirstNotCapturedCharacteristicByPrincipleGroup = function (_a) {
        var groupOid = _a.groupOid;
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetFirstNotCapturedCharacteristicByPrincipleGroup(" + groupOid + ")");
    };
    AssessmentCaptureFullService.prototype.getFirstNotCapturedCharacteristicByDimensionOrPrinciple = function (type, oid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetFirstNotCapturedCharacteristicBy" + type + "(" + oid + ")");
    };
    AssessmentCaptureFullService.prototype.getGetFullListDimentions = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Dimensions/GetFullList");
    };
    AssessmentCaptureFullService.prototype.getGetFullListPrinciples = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Principles/GetFullList");
    };
    AssessmentCaptureFullService.prototype.getFullListPrincipleGroups = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/PrincipleGroups/GetFullList");
    };
    AssessmentCaptureFullService.prototype.getAllPrincipleGroupsFull = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/PrincipleGroups/GetFullStatusList");
    };
    AssessmentCaptureFullService.prototype.getFullListDimentionsOrPrincipleGroups = function (selectedItem) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/" + selectedItem + "/GetFullList");
    };
    AssessmentCaptureFullService.prototype.getFullListDimentionsOrPrinciplesFromCurrentUnit = function (selectedItem) {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            console.log('USER', user.body['CurrentUnitId']);
            return _this.unitService.getUnitById(user.body['CurrentUnitId'])
                .switchMap(function (unit) {
                console.log('UNIT current standard', unit['CurrentStandardId']);
                var currentUnit = unit;
                return _this.getFullListDimentionsOrPrincipleGroups(selectedItem);
            });
        });
    };
    AssessmentCaptureFullService.prototype.getUnitFromUser = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            _this.currentUserId = user.body['Oid'];
            console.log('USER', user.body['CurrentUnitId']);
            return _this.unitService.getUnitById(user.body['CurrentUnitId']);
        });
    };
    AssessmentCaptureFullService.prototype.addNonRelevantCharacteristic = function (characteristicOid, body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/SPADataSets/AddNonRelevantCharacteristic(" + characteristicOid + ")", body, { observe: 'response' });
    };
    AssessmentCaptureFullService.prototype.removeNonRelevantCharacteristic = function (characteristicOid) {
        return this.httpClient.delete(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/SPADataSets/RemoveNonRelevantCharacteristic(" + characteristicOid + ")", { observe: 'response' });
    };
    AssessmentCaptureFullService.prototype.setDataFromCompleteByFilter = function (selectedData) {
        this.filterParam$.next(selectedData);
    };
    AssessmentCaptureFullService.prototype.getDataFromCompleteByFilter = function () {
        return this.filterParam$.asObservable();
    };
    AssessmentCaptureFullService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_5__standards_standards_service__["a" /* StandardsService */]])
    ], AssessmentCaptureFullService);
    return AssessmentCaptureFullService;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.html":
/***/ (function(module, exports) {

module.exports = "<dx-load-panel\r\n  #loadPanel\r\n  shadingColor=\"rgba(255,255,255,0)\"\r\n  [position]=\"{ of: '#container' }\"\r\n  [(visible)]=\"loadingVisible\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n>\r\n</dx-load-panel>\r\n<div id=\"container\">\r\n<div class=\"assessment-capture-light-container\">\r\n  <div class=\"assessment-selector-container\" [style.visibility]=\"isCompleteByFilterVisible ? 'visible' : 'hidden'\">\r\n    <span>Complete by:</span>\r\n    <dx-select-box [dataSource]=\"dataForFilter\"\r\n      valueExpr=\"oid\"\r\n      displayExpr=\"type\"\r\n      [value]=\"completeBy\"\r\n      (onSelectionChanged)=\"setCurrentFilter($event)\"\r\n      placeholder=\"\">\r\n    </dx-select-box>\r\n  </div>\r\n\r\n  <dx-tabs\r\n    #apiTabs\r\n    [dataSource]=\"filterSource\"\r\n    (onItemClick)=\"selectTab($event)\"\r\n    [selectedIndex]=\"firstNotAnsweredIndex\"\r\n    [scrollByContent]=\"true\"\r\n    [showNavButtons]=\"true\"\r\n    [width]=\"width\"\r\n    itemTemplate=\"tabTemplate\"\r\n    keyExpr=\"id\">\r\n    <div *dxTemplate=\"let info of 'tabTemplate'\">\r\n      <span>{{info.text}}</span>\r\n      <span class=\"unanswered-characteristic-label\" *ngIf=\"info.badge != 0\">{{info.badge}}</span>\r\n      <i *ngIf=\"info.badge == 0\" class=\"material-icons answered-characteristic-label\">done</i>\r\n    </div>\r\n  </dx-tabs>\r\n  <dx-popover\r\n    target=\"#managementPopover1\"\r\n    position=\"top\"\r\n    [width]=\"300\"\r\n    [(visible)]=\"popoverHeaderVisible1\">\r\n    <div *dxTemplate=\"let data = model of 'content'\">\r\n     {{guidanses[0]}}\r\n    </div>\r\n  </dx-popover>\r\n\r\n  <dx-popover\r\n    target=\"#managementPopover2\"\r\n    position=\"top\"\r\n    [width]=\"300\"\r\n    [(visible)]=\"popoverHeaderVisible2\">\r\n    <div *dxTemplate=\"let data = model of 'content'\">\r\n      {{guidanses[1]}}\r\n    </div>\r\n  </dx-popover>\r\n    <div class=\"data-grid-wrapper\" #dataGridWrapper bluenorthElementWidth (actual-width)=\"width = $event\">\r\n      <div class=\"data-grid-container inner-padding\">\r\n        <dx-tooltip\r\n        target=\"#fullScrinMode\"\r\n        [(visible)]=\"showFullScreenTooltip\">\r\n        <div *dxTemplate=\"let data = data of 'content'\">\r\n          Full ScreenMode\r\n        </div>\r\n      </dx-tooltip>\r\n      <i id=\"fullScrinMode\"\r\n\r\n         class=\"material-icons fullscreen-btn fullscreen-icon\"\r\n         (click)=\"toggleFullScreenMode(true)\"\r\n         (mouseenter)=\"toggleFullScreenToolTip()\"\r\n         (mouseleave)=\"toggleFullScreenToolTip()\" >\r\n        fullscreen\r\n      </i>\r\n       <i\r\n          class=\"material-icons fullscreen-btn fullscreen-exit-icon\"\r\n          (click)=\"toggleFullScreenMode(false)\">\r\n        fullscreen_exit\r\n      </i>\r\n        <dx-data-grid #dataGrid\r\n          id=\"gridContainer\"\r\n          noDataText=\"\"\r\n          (onToolbarPreparing)=\"onToolbarPreparing($event)\"\r\n          [showColumnLines]=\"false\"\r\n          [showRowLines]=\"true\"\r\n          [showBorders]=\"false\"\r\n          [rowAlternationEnabled]=\"false\"\r\n          [hoverStateEnabled]=\"true\"\r\n          [wordWrapEnabled]=\"true\"\r\n          [dataSource]=\"questionsArray\"\r\n          keyExpr=\"QuestionOid1\"\r\n          (onEditorPreparing)=\"onEditorPreparing($event)\"\r\n          (onContentReady)=\"updateTable($event)\">\r\n          <dxo-load-panel [enabled]=\"true\"\r\n                          [showIndicator]=\"true\"\r\n                          [showPane]=\"false\"\r\n                          [shading]=\"false\"\r\n                          [message]=\" \"></dxo-load-panel>\r\n          <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n          <dxo-editing\r\n            mode=\"batch\"\r\n            [allowUpdating]=\"false\">\r\n          </dxo-editing>\r\n          <dxi-column [allowSorting]=\"false\"\r\n                      dataField=\"CharacteristicReference\"\r\n                      headerCellTemplate=\"titleHeaderTemplate\"\r\n                      [allowEditing]=\"false\"\r\n                      [width]=\"50\" caption=\"REF\"\r\n          ></dxi-column>\r\n          <dxi-column [allowSorting]=\"false\"\r\n                      dataField=\"CharacteristicDescription\"\r\n                      headerCellTemplate=\"titleHeaderTemplate\"\r\n                      [allowEditing]=\"false\"\r\n                      caption=\"ON A SUSTAINABLE FARM....\"\r\n                      cellTemplate=\"descriptionCellTemplate\">\r\n          </dxi-column>\r\n          <div  class=\"grid-slider-view\"\r\n            headerCellTemplate=\"titleHeaderTemplate\"\r\n            *dxTemplate=\"let data of 'descriptionCellTemplate' let index = index\">\r\n            <div class=\"characteristic-title\">{{data.data.CharacteristicDescription}}</div>\r\n            <div *ngIf=\"showCharacteristicGuidance === data.rowIndex\"\r\n              class=\"question-guidance\" [innerHTML]=\"data.data?.CharacteristicGuidance | replaceLineBreaks\">\r\n            </div>\r\n            <div *ngIf=\"data.data.IsCharacteristicGuidanceExists && showCharacteristicGuidance !== data.rowIndex\"\r\n              (click)=\"toShowCharacteristicGuidance(data)\">\r\n              <a class=\"guidance-show\">Refer to guidance</a>\r\n            </div>\r\n            <div *ngIf=\"showCharacteristicGuidance === data.rowIndex\" (click)=\"showCharacteristicGuidance = null\">\r\n              <a class=\"guidance-show\">Close guidance</a>\r\n            </div>\r\n          </div>\r\n          <dxi-column [allowSorting]=\"false\"\r\n                      dataField=\"Relevant\"\r\n                      width=\"100\"\r\n                      caption=\"RELEVANT\"\r\n                      headerCellTemplate=\"titleHeaderTemplate\"\r\n                      editCellTemplate=\"switcherCellTemplate\"\r\n                      [showEditorAlways]=\"true\">\r\n          </dxi-column>\r\n\r\n          <div *dxTemplate=\"let data of 'switcherCellTemplate'\"\r\n            [ngClass]=\"{'not-relevant': !data.data.IsRelevantCharacteristic}\">\r\n            <dx-switch (onValueChanged)=\"changeCharacteristicRelevant($event, data)\" #switch [value]=\"data.data.IsRelevantCharacteristic\"></dx-switch>\r\n          </div>\r\n          <dxi-column [allowSorting]=\"false\" dataField=\"AnswerChoise1\"\r\n                      caption=\"LEVEL OF MANAGEMENT COMMITMENT\"\r\n                      headerCellTemplate=\"titleHeaderTemplate1\"\r\n                      [showEditorAlways]=\"true\"\r\n                      editCellTemplate=\"sliderCellTemplateAnswer1\">\r\n          </dxi-column>\r\n\r\n          <div *dxTemplate=\"let data of 'sliderCellTemplateAnswer1'\">\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#unknown1{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisibleDontKnow1 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-dontknow-content\">\r\n                <h5>I DON'T KNOW</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#no1{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisibleNo1 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-yes-content\">\r\n                <h5>LOW</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#partially1{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisiblePartially1 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-partially-content\">\r\n                <h5>MEDIUM</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#high1{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisibleYes1 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-no-content\">\r\n                <h5>HIGH</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <div class=\"slider-scale\">\r\n              <span class=\"answer-alignment-dont-know\">Unanswered</span>\r\n              <span style=\"text-align: left;\"><span class=\"answer-alignment-dont-know\"\r\n                    id=\"unknown1{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault1(data.rowIndex, 1, data.data.UnknownAG1)\"\r\n                    (mouseleave)=\"toggleDefault1(null, 1)\"\r\n                    [ngClass]=\"{'dont-know-color': data.data.AnswerChoise1 === 0 && data.data.IsRelevantCharacteristic}\">I don't know</span></span>\r\n              <span style=\"text-align: center;\"><span class=\"answer-alignment-no\"\r\n                    id=\"no1{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault1(data.rowIndex, 2, data.data.NoAG1)\"\r\n                    (mouseleave)=\"toggleDefault1(null, 2)\"\r\n                    [ngClass]=\"{'low-color':data.data.AnswerChoise1 === 1 && data.data.IsRelevantCharacteristic}\">Low</span></span>\r\n              <span><span class=\"answer-alignment-partially\"\r\n                    id=\"partially1{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault1(data.rowIndex, 3, data.data.PartiallyAG1)\"\r\n                    (mouseleave)=\"toggleDefault1(null, 3)\"\r\n                    [ngClass]=\"{'medium-color': data.data.AnswerChoise1 === 2 && data.data.IsRelevantCharacteristic}\">Medium</span></span>\r\n              <span><span\r\n                id=\"high1{{data.rowIndex}}\"\r\n                (mouseenter)=\"toggleDefault1(data.rowIndex, 4, data.data.YesAG1)\"\r\n                (mouseleave)=\"toggleDefault1(null, 4)\"\r\n                [ngClass]=\"{'high-color': data.data.AnswerChoise1 === 3 && data.data.IsRelevantCharacteristic}\">High</span></span>\r\n            </div>\r\n            <dx-slider\r\n              #slider1\r\n              [min]=\"-1\"\r\n              [max]=\"3\"\r\n              [value]=\"data.data.AnswerChoise1 ? data.data.AnswerChoise1 : 0\"\r\n              [showRange]=\"true\"\r\n              (onValueChanged)=\"getAnswer($event, data)\" [disabled]=\"!data.data.IsRelevantCharacteristic\">\r\n            <!--  <dxo-tooltip #tooltip  *ngIf=\"slider1.value > -1\"\r\n                class=\"tooltip-style\"\r\n                [enabled]=\"true\"\r\n                [format]=\"format(slider1.value, data)\"\r\n                [height]=\"170\"\r\n                [width]=\"200\"\r\n                position=\"top\"></dxo-tooltip>-->\r\n            </dx-slider>\r\n            <p class=\"unanswered-label\" *ngIf=\"data.data.AnswerOid1 === 0\">UNANSWERED</p>\r\n          </div>\r\n\r\n          <dxi-column [allowSorting]=\"false\"\r\n            dataField=\"AnswerChoise2\"\r\n            headerCellTemplate=\"titleHeaderTemplate2\"\r\n            caption=\"LEVEL OF PRACTICAL  ACTIONS\"\r\n            [showEditorAlways]=\"true\"\r\n            editCellTemplate=\"sliderCellTemplateAnswer2\">\r\n          </dxi-column>\r\n          <div *dxTemplate=\"let info of 'titleHeaderTemplate' \" class=\"data-grid-header\">\r\n            <p class=\"data-grid-header\">{{info.column.caption}}</p>\r\n          </div>\r\n\r\n          <div *dxTemplate=\"let info of 'titleHeaderTemplate2' \" class=\"data-grid-header\">\r\n            <span class=\"data-grid-header\"\r\n               id=\"managementPopover2\"\r\n               (mouseenter)=\"togglePopover(2)\"\r\n               (mouseleave)=\"togglePopover(2)\"\r\n            >{{info.column.caption}}</span>\r\n          </div>\r\n          <div *dxTemplate=\"let info of 'titleHeaderTemplate1' \" class=\"data-grid-header\">\r\n            <span class=\"data-grid-header\"\r\n               id=\"managementPopover1\"\r\n               (mouseenter)=\"togglePopover(1)\"\r\n               (mouseleave)=\"togglePopover(1)\"\r\n            >{{info.column.caption}}</span>\r\n          </div>\r\n          <div *dxTemplate=\"let data of 'sliderCellTemplateAnswer2' let index = index\" [height]=\"70\">\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#unknown2{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisibleDontKnow2 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-dontknow-content\">\r\n                <h5>I DON'T KNOW</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#no2{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisibleNo2 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-yes-content\">\r\n                <h5>LOW</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#partially2{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisiblePartially2 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-partially-content\">\r\n                <h5>MEDIUM</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <dx-popover class=\"light-assess-popup-wrapper\"\r\n              target=\"#high2{{data.rowIndex}}\"\r\n              position=\"top\"\r\n              [width]=\"300\"\r\n              [visible]=\"isPopupVisibleYes2 === data.rowIndex\">\r\n              <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-no-content thesecond\">\r\n                <h5>HIGH</h5>\r\n                {{info}}\r\n              </div>\r\n              <dxo-animation>\r\n                <dxo-show\r\n                  type=\"pop\"\r\n                  [from]=\"{ scale: 0 }\"\r\n                  [to]=\"{ scale: 1 }\"></dxo-show>\r\n                <dxo-hide\r\n                  type=\"fade\"\r\n                  [from]=\"1\"\r\n                  [to]=\"0\"></dxo-hide>\r\n              </dxo-animation>\r\n            </dx-popover>\r\n            <div class=\"slider-scale\">\r\n              <span class=\"answer-alignment-dont-know\">Unanswered</span>\r\n              <span style=\"text-align: left;\"><span class=\"answer-alignment-dont-know\"\r\n                    id=\"unknown2{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault2(data.rowIndex, 1, data.data.UnknownAG2)\"\r\n                    (mouseleave)=\"toggleDefault2(null, 1)\"\r\n                    [ngClass]=\"{'dont-know-color': data.data.AnswerChoise2 === 0 && data.data.IsRelevantCharacteristic}\">I don't know</span></span>\r\n              <span style=\"text-align: center;\"><span class=\"answer-alignment-no\"\r\n                    id=\"no2{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault2(data.rowIndex, 2, data.data.NoAG2)\"\r\n                    (mouseleave)=\"toggleDefault2(null, 2)\"\r\n                    [ngClass]=\"{'low-color':data.data.AnswerChoise2 === 1 && data.data.IsRelevantCharacteristic}\">Low</span></span>\r\n              <span><span class=\"answer-alignment-partially\"\r\n                    id=\"partially2{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault2(data.rowIndex, 3, data.data.PartiallyAG2)\"\r\n                    (mouseleave)=\"toggleDefault2(null, 3)\"\r\n                    [ngClass]=\"{'medium-color': data.data.AnswerChoise2 === 2 && data.data.IsRelevantCharacteristic}\">Medium</span></span>\r\n              <span><span [ngClass]=\"{'high-color': data.data.AnswerChoise2 === 3 && data.data.IsRelevantCharacteristic}\"\r\n                    id=\"high2{{data.rowIndex}}\"\r\n                    (mouseenter)=\"toggleDefault2(data.rowIndex, 4, data.data.YesAG2)\"\r\n                    (mouseleave)=\"toggleDefault2(null, 4)\">High</span></span>\r\n            </div>\r\n            <dx-slider\r\n              #slider2\r\n              [min]=\"-1\"\r\n              [max]=\"3\"\r\n              [value]=\"data.data.AnswerChoise2 ? data.data.AnswerChoise2 : 0\"\r\n              [showRange]=\"true\"\r\n              (onValueChanged)=\"getAnswer($event, data)\"\r\n              [disabled]=\"!data.data.IsRelevantCharacteristic\"\r\n            >\r\n             <!-- <dxo-tooltip #tooltip  *ngIf=\"slider2.value > -1\"\r\n                class=\"tooltip-style\"\r\n                [enabled]=\"true\"\r\n                [format]=\"format(slider2.value, data)\"\r\n                [height]=\"170\"\r\n                [width]=\"200\"\r\n                position=\"top\"></dxo-tooltip>-->\r\n            </dx-slider>\r\n            <p class=\"unanswered-label\" *ngIf=\"data.data.AnswerOid2 === 0\" >UNANSWERED</p>\r\n          </div>\r\n          <dxi-column [width]=\"150\"\r\n                      [allowSorting]=\"false\"\r\n                      caption=\"STATUS\"\r\n                      headerCellTemplate=\"titleHeaderTemplate\"\r\n                      cellTemplate=\"statusCellTemplate\"></dxi-column>\r\n          <div class=\"status-wrapper\" *dxTemplate=\"let data of 'statusCellTemplate'\">\r\n           <bluenorth-characteristic-status [status]=\"data.data.Status\"></bluenorth-characteristic-status>\r\n          </div>\r\n        </dx-data-grid>\r\n      </div>\r\n    </div>\r\n\r\n    <dx-popup #dxPopup\r\n      [width]=\"500\"\r\n      [height]=\"150\"\r\n      [showTitle]=\"true\"\r\n      title=\"Would You Like to change Assessment Type?\"\r\n      [dragEnabled]=\"false\"\r\n      [closeOnOutsideClick]=\"false\"\r\n      [closeOnBackButton]=\"false\"\r\n      [showCloseButton]=\"false\"\r\n      [allowUpdating]=\"true\"\r\n      [(visible)]=\"isNotificationShow\"\r\n    >\r\n      <div *dxTemplate=\"let data of 'content'\">\r\n        <dx-button\r\n          class=\"change-assessment\"\r\n          [text]=\"buttonText\"\r\n          [width]=\"210\"\r\n          [height]=\"44\"\r\n          (onClick)=\"changeAssessmentType($event)\">\r\n        </dx-button>\r\n        <dx-button\r\n          class=\"favorites\"\r\n          [text]=\"buttonTextNo\"\r\n          [width]=\"210\"\r\n          [height]=\"44\"\r\n          (onClick)=\"redirectToCharts($event)\">\r\n        </dx-button>\r\n      </div>\r\n    </dx-popup>\r\n   </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.assessment-capture-light-container {\n  padding: 0 20px; }\n.assessment-capture-light-container .assessment-selector-container {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 100px 200px;\n        grid-template-columns: 100px 200px;\n    margin: 15px 0;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    font-size: 14px; }\n.assessment-capture-light-container .data-grid-container {\n    padding: 0 15px;\n    position: relative; }\n.assessment-capture-light-container .data-grid-container /deep/ .dx-datagrid-headers .dx-datagrid-table .dx-row > td {\n      width: 100%;\n      padding: 0 !important;\n      height: 60px;\n      background-color: #6BCDFA;\n      border: none;\n      margin-left: 5px !important; }\n.assessment-capture-light-container .data-grid-container /deep/ .dx-datagrid-headers .dx-datagrid-table .dx-row.dx-header-row > td {\n      height: 40px; }\n.assessment-capture-light-container /deep/ .dx-slider .dx-tooltip-wrapper .dx-overlay-content {\n    width: 220px !important;\n    height: 90px !important;\n    display: block; }\n.assessment-capture-light-container /deep/ .dx-tooltip-wrapper .dx-overlay-content .dx-popup-content {\n    white-space: normal;\n    height: 100% !important;\n    padding: 15px 10px 0 15px;\n    line-height: 1.3em;\n    text-align: left;\n    color: #fff;\n    display: block; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"0\"] .dx-overlay-content .dx-popup-content {\n    background-color: #B8EDFF; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"1\"] .dx-overlay-content .dx-popup-content {\n    background-color: #FD001A; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"2\"] .dx-overlay-content .dx-popup-content {\n    background-color: #FE962C; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content .dx-popup-content {\n    background-color: #6BC89F; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover .dx-overlay-content .dx-popover-arrow {\n    width: 15px;\n    height: 10px;\n    background-color: transparent; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover .dx-overlay-content .dx-popover-arrow:after {\n    border-width: 10px 7.5px 0 7.5px;\n    -webkit-transform: none;\n            transform: none;\n    background-color: transparent; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"0\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #B8EDFF transparent transparent transparent; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"1\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #FD001A transparent transparent transparent; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"2\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #FE962C transparent transparent transparent; }\n.assessment-capture-light-container /deep/ .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: #6BC89F transparent transparent transparent; }\n.assessment-capture-light-container /deep/ .dx-datagrid.dx-datagrid-borders .dx-datagrid-header-panel {\n    height: 0; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover .dx-overlay-content {\n    -webkit-transform: translateX(-110px) !important;\n            transform: translateX(-110px) !important;\n    top: 40px; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover[aria-valuenow=\"0\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: transparent transparent #B8EDFF transparent; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover[aria-valuenow=\"1\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: transparent transparent #FD001A transparent; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover[aria-valuenow=\"2\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: transparent transparent #FE962C transparent; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content .dx-popover-arrow:after {\n    border-color: transparent transparent #6BC89F transparent; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content {\n    left: -93px !important; }\n.assessment-capture-light-container /deep/ .dx-datagrid-table-fixed tr:first-child .dx-slider-tooltip-on-hover[aria-valuenow=\"3\"] .dx-overlay-content .dx-popover-arrow {\n    left: auto !important;\n    right: 0 !important; }\n.assessment-capture-light-container /deep/ .slider-scale {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr;\n        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;\n    font-size: 14px;\n    font-weight: 500;\n    color: #9898A5;\n    padding: 0 8px; }\n.assessment-capture-light-container /deep/ .slider-scale .answer-alignment-dont-know {\n      text-align: left; }\n.assessment-capture-light-container /deep/ .slider-scale .answer-alignment-no {\n      text-align: start; }\n.assessment-capture-light-container /deep/ .slider-scale .answer-alignment-partially {\n      text-align: center; }\n.data-grid-header {\n  margin-left: 5px;\n  color: #fff;\n  border: none;\n  background-color: #6BCDFA;\n  vertical-align: baseline; }\n.question-guidance {\n  font-size: 12px;\n  font-style: italic; }\n.characteristic-title {\n  margin-bottom: 15px;\n  color: #9898A5; }\n.data-grid-wrapper .dx-template-wrapper {\n  padding-top: 0; }\n.data-grid-wrapper .slider-scale {\n  font-size: 11px; }\n/deep/ dx-slider .dx-slider-handle {\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  background-color: #fff;\n  border: 3px solid #DCDCDC; }\n/deep/ dx-tabs .dx-tab {\n  color: #CBCBCB;\n  font-weight: bold;\n  font-size: 11px; }\n/deep/ dx-tabs .dx-tab.dx-tab-selected {\n  background-color: #fff;\n  color: #6BCDFD; }\n/deep/ dx-tabs .dx-badge {\n  background-color: silver; }\n/deep/ dx-tabs .dx-tabs-item-badge {\n  vertical-align: inherit;\n  margin-left: 5px; }\n/deep/ dx-tabs .dx-tab-selected .dx-badge {\n  background-color: #FD001A; }\n/deep/ dx-tabs .dx-badge {\n  display: none; }\n.grid-slider-view a {\n  font-size: 12px;\n  color: #6BCDFD;\n  text-decoration: underline;\n  cursor: pointer; }\n/deep/ .dx-tabs {\n  width: 100%;\n  border-radius: 50px;\n  margin-bottom: 15px; }\n/deep/ .dx-tabs .dx-tab:first-child {\n    border-top-left-radius: 50px;\n    border-bottom-left-radius: 50px; }\n/deep/ .dx-tabs .dx-tab:last-child {\n    border-top-right-radius: 50px;\n    border-bottom-right-radius: 50px; }\n/deep/ dx-data-grid .dx-toolbar-after {\n  top: 5px;\n  right: 5px; }\n/deep/ dx-data-grid .dx-button-content {\n  padding: 0 !important; }\n/deep/ dx-data-grid .dx-datagrid-header-panel .dx-toolbar {\n  margin-bottom: 0; }\n/deep/ dx-data-grid .dx-toolbar-text-auto-hide .dx-button .dx-icon {\n  width: 200px !important;\n  background-color: #6BCDFA; }\n/deep/ dx-button {\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 100%;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n/deep/ dx-button:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container {\n  background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container :hover {\n    background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-state-hover {\n  background: #D8D9DB; }\n/deep/ dx-slider .dx-slider-handle {\n  border-radius: 50%;\n  width: 20px;\n  height: 20px;\n  background-color: #fff;\n  border: 3px solid #DCDCDC; }\n/deep/ dx-slider .dx-state-hover.dx-slider-handle:not(.dx-state-active) {\n  background-color: transparent;\n  border: 3px solid #DCDCDC; }\n/deep/ dx-slider .dx-trackbar-range .dx-slider-range .dx-slider-range-visible {\n  background-color: #D8DBE3 !important; }\n/deep/ dx-slider .dx-widget .dx-slider-handle .dx-slider-tooltip-on-hover {\n  background-color: #D8DBE3 !important; }\n/deep/ dx-slider .dx-slider-range.dx-slider-range-visible {\n  border: none;\n  background: none; }\n/deep/ dx-slider .data-grid-wrapper dx-slider .dx-state-hover.dx-slider-handle:not(.dx-state-active) {\n  background-color: #fff !important; }\n/deep/ dx-slider .dx-state-hover {\n  background-color: #fff !important; }\n/deep/ dx-data-grid .dx-editor-cell {\n  padding: 5px !important; }\n/deep/ dx-data-grid .dx-datagrid-rowsview .dx-data-row .dx-cell-modified .dx-highlight-outline::after {\n  border: none; }\n/deep/ dx-switch .dx-switch-container {\n  background: #4AD768;\n  border-radius: 22px;\n  border: none;\n  height: 22px; }\n/deep/ dx-switch .dx-switch-container :hover {\n    background: #4AD768;\n    border-radius: 22px; }\n/deep/ dx-switch .dx-switch-handle {\n  width: 18px;\n  height: 18px;\n  margin-left: -18px; }\n/deep/ dx-switch .dx-switch-handle :hover {\n    background-color: #fff; }\n/deep/ dx-switch .dx-switch-off {\n  color: transparent; }\n/deep/ dx-switch .dx-switch-handle:before {\n  border-radius: 50%;\n  background-color: #fff !important; }\n/deep/ dx-switch .dx-state-hover {\n  background: #4AD768; }\n/deep/ dx-switch .dx-visibility-change-handler {\n  background-color: #fff; }\n/deep/ dx-switch .dx-switch-on {\n  color: transparent; }\n.dont-know-color {\n  color: #6BCDFA; }\n.low-color {\n  color: #FD001A; }\n.medium-color {\n  color: #FE962C; }\n.high-color {\n  color: #6BC89F; }\n.top-navigation {\n  display: -ms-grid;\n  display: grid;\n  grid-column: 1 / -1;\n  width: 65%;\n  -ms-grid-columns: auto auto auto auto auto;\n      grid-template-columns: auto auto auto auto auto;\n  font-size: 12px;\n  font-weight: bold;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer; }\n.top-navigation .nav-item {\n    padding: 10px;\n    border: 1px solid #d8d8d8;\n    border-right: none !important;\n    text-align: center; }\n.top-navigation .nav-item:first-child {\n      border-top-left-radius: 20px;\n      border-bottom-left-radius: 20px;\n      border-right: none !important; }\n.top-navigation .nav-item:last-child {\n      border-top-right-radius: 20px;\n      border-bottom-right-radius: 20px;\n      border: 1px solid #d8d8d8 !important; }\n.top-navigation .nav-item:not(:last-child) {\n      border-right: 1px solid #d8d8d8; }\n.top-navigation .top-navigation-active {\n    background-color: #fff;\n    color: #6BCDFD; }\n.unanswered-characteristic-label {\n  border-radius: 50%;\n  background-color: red;\n  color: #fff;\n  margin-right: 10px;\n  width: 20px;\n  height: 18px;\n  text-align: center;\n  line-height: 18px;\n  display: inline-block; }\n.answered-characteristic-label {\n  border-radius: 50%;\n  background-color: #4AD768;\n  color: #fff;\n  margin-right: 10px;\n  width: 20px;\n  height: 18px;\n  text-align: center;\n  line-height: 18px;\n  display: inline-block;\n  font-size: 15px;\n  vertical-align: middle; }\n.unanswered-label {\n  width: 100px;\n  height: 20px;\n  background-color: silver;\n  border-radius: 3px;\n  text-align: center;\n  color: #fff;\n  font-size: 12px;\n  line-height: 20px;\n  margin-left: 10px; }\n.status-wrapper {\n  text-align: left;\n  line-height: 50px; }\n.fullscreen-exit-icon {\n  display: none; }\n.fullscreen-btn {\n  position: absolute;\n  top: 0;\n  right: 12px;\n  cursor: pointer;\n  -webkit-transition: all .25s linear;\n  transition: all .25s linear;\n  color: #6BCDFA;\n  z-index: 10; }\n.fullscreen-btn:hover {\n    font-size: 30px; }\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentCaptureLightComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assessment_capture_light_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assessment_capture_full_assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_questions_service__ = __webpack_require__("./client/app/shared/services/questions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_models_unit_model__ = __webpack_require__("./client/app/shared/models/unit.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_models_characteristic_model__ = __webpack_require__("./client/app/shared/models/characteristic.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AssessmentCaptureLightComponent = (function () {
    function AssessmentCaptureLightComponent(assessmentCaptureLightService, unitService, assessmentCaptureFullService, userService, upperCasePipe, questionsService, router, changeDetector, assesmentStateService, registrationSettingsService, homeService, standardsService) {
        this.assessmentCaptureLightService = assessmentCaptureLightService;
        this.unitService = unitService;
        this.assessmentCaptureFullService = assessmentCaptureFullService;
        this.userService = userService;
        this.upperCasePipe = upperCasePipe;
        this.questionsService = questionsService;
        this.router = router;
        this.changeDetector = changeDetector;
        this.assesmentStateService = assesmentStateService;
        this.registrationSettingsService = registrationSettingsService;
        this.homeService = homeService;
        this.standardsService = standardsService;
        this.popoverHeaderVisible1 = false;
        this.popoverHeaderVisible2 = false;
        this.questionsArray = [];
        //public showGuidanceQuestion = false;
        this.showCharacteristicGuidance = false;
        this.dataForFilter = [{ oid: 1, type: 'Management Focus Area' }, { oid: 2, type: 'Principle' }];
        //public customLabels = ["I don't know", "Low", "Medium", "High"];
        this.filterSource = [];
        this.updating = false;
        this.firstNotAnsweredIndex = -1;
        this.isNotificationShow = false;
        this.buttonText = 'Change Assessment Type';
        this.buttonTextNo = 'Cancel';
        this.completeBy = 1;
        this.filter = this.dataForFilter[0];
        this.guidanses = [];
        this.loadingVisible = true;
        //private labelsForTabs: string[] = [];
        this.startLoad = false;
        this.info = '';
        this.showFullScreenTooltip = false;
        this.isCompleteByFilterVisible = true;
        this.CharacteristicStatus = __WEBPACK_IMPORTED_MODULE_14__shared_models_characteristic_model__["a" /* CharacteristicStatus */];
    }
    AssessmentCaptureLightComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.assesmentStateService.getDimentionOid().type && this.assesmentStateService.getDimentionOid().oid) {
            this.completeBy = this.assesmentStateService.getDimentionOid().type;
            console.log('this.assesmentStateService.getDimentionOid()', this.assesmentStateService.getDimentionOid());
        }
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
            .subscribe(function (unit) {
            console.log('this.userService.getCurrentUser().CurrentUnitId', _this.userService.getCurrentUser().CurrentUnitId);
            console.log('UNITINFO', __WEBPACK_IMPORTED_MODULE_9__shared_models_unit_model__["a" /* UnitInfo */]);
            _this.currentUnit = unit;
            _this.assesstentType = unit.AssessmentType;
            if (unit.AssessmentType === (null || -1)) {
                _this.currentUnit = unit;
                _this.currentUnit['AssessmentType'] = 1;
                _this.registrationSettingsService.addOrUpdateUnit(_this.currentUnit)
                    .subscribe(function (unit) {
                    console.log('updatedunit', unit);
                    console.log(' this.currentUnit[AssessmentType] = 1');
                    _this.startLoad = true;
                    _this.getFiltersForQuestions(_this.filter);
                });
                return;
            }
            if (unit.AssessmentType === 0) {
                _this.isNotificationShow = true;
                _this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
                    arg.stopPropagation();
                });
                console.log(' this.currentUnit[AssessmentType] = 0');
                return;
            }
            if (unit.AssessmentType === 1) {
                _this.startLoad = true;
                _this.getFiltersForQuestions(_this.filter);
            }
            console.log('unit', unit);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        this.changeDetector.detectChanges();
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (data) {
            console.log('this.userService.getCurrentUser().CurrentUnitId UNITSELECTOR', _this.userService.getCurrentUser().CurrentUnitId);
            console.log('UNITINFO UNITSELECTOR', __WEBPACK_IMPORTED_MODULE_9__shared_models_unit_model__["a" /* UnitInfo */]);
            _this.questionsArray = [];
            _this.filterSource = [];
            _this.unitService.getUnitById(_this.userService.getCurrentUser().CurrentUnitId)
                .subscribe(function (unit) {
                _this.currentUnit = unit;
                if (unit.AssessmentType === (null || -1)) {
                    _this.currentUnit = unit;
                    _this.currentUnit['AssessmentType'] = 1;
                    _this.registrationSettingsService.addOrUpdateUnit(_this.currentUnit)
                        .subscribe(function (unit) {
                        console.log('updatedunit UNITSELECTOR', unit);
                        _this.getFiltersForQuestions(_this.filter);
                    });
                }
                if (unit.AssessmentType === 0) {
                    _this.isNotificationShow = true;
                    _this.dxPopup.instance.registerKeyHandler("escape", function (arg) {
                        arg.stopPropagation();
                    });
                }
                else {
                    _this.getFiltersForQuestions(_this.filter);
                    console.log('this.currentUnit[AssessmentType] allready 0;');
                }
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            console.log('this.filter', _this.filter);
        });
        this.assessmentCaptureLightService.getLiteListGuidanses()
            .subscribe(function (guidances) {
            console.log(guidances);
            _this.guidanses = guidances;
        });
    };
    AssessmentCaptureLightComponent.prototype.format = function (value, data) {
        var customTooltips = [];
        if (data.columnIndex === 3) {
            customTooltips = [data.data.UnknownAG1, data.data.NoAG1, data.data.PartiallyAG1, data.data.YesAG1];
        }
        if (data.columnIndex === 4) {
            customTooltips = [data.data.UnknownAG2, data.data.NoAG2, data.data.PartiallyAG2, data.data.YesAG2];
        }
        var newValue = customTooltips[value];
        // if (!newValue) return value;
        return newValue;
    };
    AssessmentCaptureLightComponent.prototype.notAnswered = function (element, index, array) {
        if (element.UnAnsweredQuestionsCount > 0) {
            return index;
        }
    };
    AssessmentCaptureLightComponent.prototype.getPrincipleGroupsForTabs = function () {
        var _this = this;
        this.loadingVisible = true;
        this.questionsArray = [];
        this.filterSource = [];
        this.firstNotAnsweredIndex = -1;
        this.assessmentCaptureLightService.getLiteListPrincipleGroups()
            .subscribe(function (principleGroups) {
            if (principleGroups.length === 0) {
                _this.userService.showUserNotification("No Principle Groups Yet", "error");
                _this.loadingVisible = false;
                return;
            }
            console.log('this.assesmentStateService.getDimentionOid()', _this.assesmentStateService.getDimentionOid());
            _this.filterSource = [];
            console.log('principleGroups', principleGroups);
            _this.filterSource = [];
            for (var i = 0; i < principleGroups.length; i++) {
                _this.filterSource.push({
                    id: principleGroups[i]['OID'],
                    text: _this.upperCasePipe.transform(principleGroups[i].ShortTitle),
                    content: 'Management Focus Area',
                    badge: principleGroups[i].CharacteristicsCount
                });
            }
            if (_this.assesmentStateService.getDimentionOid().oid) {
                for (var i = 0; i < principleGroups.length; i++) {
                    if (principleGroups[i].OID === _this.assesmentStateService.getDimentionOid().oid) {
                        _this.firstNotAnsweredIndex = i;
                    }
                }
            }
            else {
                if (principleGroups.findIndex(_this.notAnswered) > -1) {
                    _this.firstNotAnsweredIndex = principleGroups.findIndex(_this.notAnswered);
                }
                else {
                    _this.firstNotAnsweredIndex = 0;
                }
            }
            console.log('this.firstNotAnsweredIndex', _this.firstNotAnsweredIndex);
            _this.assessmentCaptureLightService.getQuestionsListByPrincipleGroup(_this.filterSource[_this.firstNotAnsweredIndex].id)
                .debounceTime(500)
                .subscribe(function (questions) {
                _this.questionsArray = [];
                _this.questionsArray = questions;
                _this.loadingVisible = false;
                //this.dataGrid.instance.endCustomLoading();
                console.log('questions-with-dimention', questions);
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                _this.loadingVisible = false;
                console.log(error);
                //this.router.navigate([`assessment-current-status`]);
            });
            _this.changeDetector.detectChanges();
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error);
        });
    };
    AssessmentCaptureLightComponent.prototype.getPrincipleForTabs = function () {
        var _this = this;
        this.loadingVisible = true;
        this.firstNotAnsweredIndex = -1;
        this.questionsArray = [];
        this.filterSource = [];
        this.assessmentCaptureLightService.getPrinciples()
            .subscribe(function (principles) {
            console.log('principles', principles);
            if (principles.length === 0) {
                _this.userService.showUserNotification("No Principles Yet", "error");
                _this.loadingVisible = false;
                return;
            }
            _this.filterSource = [];
            for (var i = 0; i < principles.length; i++) {
                _this.filterSource.push({
                    id: principles[i]['OID'],
                    text: _this.upperCasePipe.transform(principles[i]['ShortTitle']),
                    content: 'Principle',
                    badge: principles[i].CharacteristicsCount
                });
            }
            console.log('principles', principles);
            console.log('principles.findIndex(this.notAnswered)', principles.findIndex(_this.notAnswered));
            console.log(' this.filterSource', _this.filterSource);
            console.log('this.apiTabs', _this.apiTabs);
            if (_this.assesmentStateService.getDimentionOid().oid) {
                for (var i = 0; i < principles.length; i++) {
                    if (principles[i].OID === _this.assesmentStateService.getDimentionOid().oid) {
                        _this.firstNotAnsweredIndex = i;
                    }
                }
            }
            else {
                if (principles.findIndex(_this.notAnswered) > -1) {
                    _this.firstNotAnsweredIndex = principles.findIndex(_this.notAnswered);
                }
                else {
                    _this.firstNotAnsweredIndex = 0;
                }
            }
            console.log('this.firstNotAnsweredIndex', _this.firstNotAnsweredIndex);
            _this.assessmentCaptureLightService.getQuestionsListByStandardAndPrinciple(_this.filterSource[_this.firstNotAnsweredIndex].id)
                .debounceTime(500)
                .subscribe(function (questions) {
                _this.questionsArray = questions;
                _this.loadingVisible = false;
                // this.dataGrid.instance.endCustomLoading();
                console.log('questionsWith principle', questions);
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                _this.loadingVisible = false;
                console.log(error);
            });
            _this.changeDetector.detectChanges();
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            console.log(error);
        });
    };
    AssessmentCaptureLightComponent.prototype.getFiltersForQuestions = function (filter) {
        if (this.startLoad) {
            this.filter = filter;
            this.questionsArray = [];
            this.filterSource = [];
            if (filter.oid === 1) {
                this.getPrincipleGroupsForTabs();
            }
            if (filter.oid === 2) {
                this.getPrincipleForTabs();
            }
        }
    };
    AssessmentCaptureLightComponent.prototype.setCurrentFilter = function (e) {
        console.log('SELECT', e.selectedItem);
        this.filter = e.selectedItem;
        this.getFiltersForQuestions(e.selectedItem);
    };
    AssessmentCaptureLightComponent.prototype.selectTab = function (e) {
        var _this = this;
        console.log(e);
        this.questionsArray = [];
        this.dataGrid.instance.beginCustomLoading('Loading..');
        this.firstNotAnsweredIndex = e.itemIndex;
        if (e.itemData.content === "Principle") {
            console.log(e);
            this.assessmentCaptureLightService.getQuestionsListByStandardAndPrinciple(e.itemData.id)
                .subscribe(function (questions) {
                _this.questionsArray = questions;
                _this.dataGrid.instance.endCustomLoading();
                console.log('questions', questions);
            }, function (error) {
                _this.dataGrid.instance.endCustomLoading();
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }
        if (e.itemData.content === "Management Focus Area") {
            this.assessmentCaptureLightService.getQuestionsListByPrincipleGroup(e.itemData.id)
                .subscribe(function (questions) {
                _this.questionsArray = [];
                _this.questionsArray = questions;
                _this.dataGrid.instance.endCustomLoading();
                console.log('questions', questions);
                _this.dataGrid.instance.endCustomLoading();
            }, function (error) {
                _this.dataGrid.instance.endCustomLoading();
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }
    };
    AssessmentCaptureLightComponent.prototype.onToolbarPreparing = function (e) {
        /* console.log('onToolbarPreparing', e.toolbarOptions)
         let indexRevertButton = e.toolbarOptions.items.indexOf(e.toolbarOptions.items.find(function (item) {
           return item.name == "revertButton";
         }));
         if (indexRevertButton != -1) {
           e.toolbarOptions.items.splice(indexRevertButton, 1);
         }
         let toolbarItems = e.toolbarOptions.items;
         // Modifies an existing item
         toolbarItems.forEach((item) => {
           if (item.name == "saveButton") {
             console.log(item);
           }
         })*/
    };
    AssessmentCaptureLightComponent.prototype.getAnswer = function (event, data) {
        var _this = this;
        var answer = [];
        var columnIndex;
        console.log('data', data);
        console.log('event', event);
        console.log('this.userService.getCurrentUser().Oid', this.userService.getCurrentUser().Oid);
        // this.dataGrid.instance.cellValue(data.rowIndex, data.columnIndex, event.value);
        for (var i = 0; i < this.questionsArray.length; i++) {
            if (i == data.rowIndex && data.columnIndex === 3) {
                data.data.AnswerChoise1 = event.value;
                answer.push({
                    "Unit": this.currentUnit.Oid,
                    "User": this.userService.getCurrentUser().Oid,
                    "AnswerText": this.questionsArray[i].AnswerText1,
                    "Choice": event.value,
                    "AssessmentType": this.currentUnit.AssessmentType,
                    "Question": this.questionsArray[i].QuestionOid1,
                    "OID": this.questionsArray[i].AnswerOid1,
                    "Characteristic": this.questionsArray[i].CharacteristicOid
                });
                columnIndex = 3;
            }
            if (i == data.rowIndex && data.columnIndex === 4) {
                data.data.AnswerChoise2 = event.value;
                answer.push({
                    "Unit": this.currentUnit.Oid,
                    "User": this.userService.getCurrentUser().Oid,
                    "AnswerText": this.questionsArray[i].AnswerText2,
                    "Choice": event.value,
                    "AssessmentType": this.currentUnit.AssessmentType,
                    "Question": this.questionsArray[i].QuestionOid2,
                    "OID": this.questionsArray[i].AnswerOid2,
                    "Characteristic": this.questionsArray[i].CharacteristicOid
                });
                columnIndex = 4;
            }
        }
        if (event.value > -1) {
            console.log(event.value);
            this.questionsService.addAnswersArray(answer)
                .debounceTime(1000)
                .subscribe(function (response) {
                _this.userService.showUserNotification("Answers was updated", 'success');
                console.log('response', response);
                if (data.data.AnswerOid1 === 0 && columnIndex === 3) {
                    data.data.AnswerOid1 = response.body[0].OID;
                    if (data.data.AnswerOid2 !== 0) {
                        _this.filterSource[_this.firstNotAnsweredIndex].badge = (+_this.filterSource[_this.firstNotAnsweredIndex].badge - 1).toString();
                    }
                }
                if (data.data.AnswerOid2 === 0 && columnIndex === 4) {
                    data.data.AnswerOid2 = response.body[0].OID;
                    if (data.data.AnswerOid1 !== 0) {
                        _this.filterSource[_this.firstNotAnsweredIndex].badge = (+_this.filterSource[_this.firstNotAnsweredIndex].badge - 1).toString();
                    }
                }
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }
        else {
            console.log('delete', event.value);
            console.log('answers', answer);
            this.questionsService.deleteAnswer(answer[0].OID)
                .subscribe(function (deletedAnswer) {
                console.log('DELETE answer', deletedAnswer);
                if (data.columnIndex === 3) {
                    data.data.AnswerOid1 = 0;
                    if (data.data.AnswerOid2 !== 0) {
                        _this.filterSource[_this.firstNotAnsweredIndex].badge = (+_this.filterSource[_this.firstNotAnsweredIndex].badge + 1).toString();
                    }
                }
                if (data.columnIndex === 4) {
                    data.data.AnswerOid2 = 0;
                    if (data.data.AnswerOid1 !== 0) {
                        _this.filterSource[_this.firstNotAnsweredIndex].badge = (+_this.filterSource[_this.firstNotAnsweredIndex].badge + 1).toString();
                    }
                }
                _this.userService.showUserNotification("Answer was updated", 'success');
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                console.log(error);
            });
        }
    };
    AssessmentCaptureLightComponent.prototype.onEditorPreparing = function (event) {
        console.log(event);
    };
    AssessmentCaptureLightComponent.prototype.updateTable = function (event) {
        if (this.updating && !event.component.hasEditData()) {
            console.log("onContentReady");
            this.updating = false;
        }
    };
    /*
    
      toShowGuidanceQuestion(data) {
        console.log('dataindex', data);
        this.showGuidanceQuestion = data.rowIndex;
      }
    */
    AssessmentCaptureLightComponent.prototype.toShowCharacteristicGuidance = function (data) {
        console.log('dataindex', data);
        this.showCharacteristicGuidance = data.rowIndex;
    };
    AssessmentCaptureLightComponent.prototype.changeCharacteristicRelevant = function (event, data) {
        console.log('relevant', event);
        console.log('data', data);
        if (!event.value) {
            this.assessmentCaptureFullService.addNonRelevantCharacteristic(data.data.CharacteristicOid)
                .subscribe(function (response) {
                console.log('addNonRelevantCharacteristic', response);
                data.data.IsRelevantCharacteristic = false;
            });
        }
        if (event.value) {
            this.assessmentCaptureFullService.removeNonRelevantCharacteristic(data.data.CharacteristicOid)
                .subscribe(function (response) {
                console.log('removeNonRelevantCharacteristic', response);
                data.data.IsRelevantCharacteristic = true;
            });
        }
    };
    AssessmentCaptureLightComponent.prototype.changeAssessmentType = function (event) {
        var _this = this;
        console.log(event);
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
            .subscribe(function (unit) {
            _this.currentUnit = unit;
            _this.currentUnit['AssessmentType'] = 1;
            _this.registrationSettingsService.addOrUpdateUnit(_this.currentUnit)
                .subscribe(function (unit) {
                console.log('updatedunit', unit);
                _this.userService.showUserNotification('Assessment Type was Updated', 'success');
                _this.isNotificationShow = false;
                _this.startLoad = true;
                _this.getFiltersForQuestions(_this.filter);
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        });
    };
    AssessmentCaptureLightComponent.prototype.redirectToCharts = function () {
        this.router.navigate(['assessment-current-status']);
    };
    AssessmentCaptureLightComponent.prototype.togglePopover = function (data) {
        if (data === 1) {
            this.popoverHeaderVisible1 = !this.popoverHeaderVisible1;
        }
        if (data === 2) {
            this.popoverHeaderVisible2 = !this.popoverHeaderVisible2;
        }
    };
    AssessmentCaptureLightComponent.prototype.toggleDefault1 = function (index, variant, info) {
        if (variant === 1) {
            this.isPopupVisibleDontKnow1 = index;
        }
        if (variant === 2) {
            this.isPopupVisibleNo1 = index;
        }
        if (variant === 3) {
            this.isPopupVisiblePartially1 = index;
        }
        if (variant === 4) {
            this.isPopupVisibleYes1 = index;
        }
        if (info) {
            this.info = info;
        }
    };
    AssessmentCaptureLightComponent.prototype.toggleDefault2 = function (index, variant, info) {
        if (variant === 1) {
            this.isPopupVisibleDontKnow2 = index;
        }
        if (variant === 2) {
            this.isPopupVisibleNo2 = index;
        }
        if (variant === 3) {
            this.isPopupVisiblePartially2 = index;
        }
        if (variant === 4) {
            this.isPopupVisibleYes2 = index;
        }
        if (info) {
            this.info = info;
        }
    };
    AssessmentCaptureLightComponent.prototype.toggleFullScreenToolTip = function () {
        this.showFullScreenTooltip = !this.showFullScreenTooltip;
    };
    AssessmentCaptureLightComponent.prototype.toggleFullScreenMode = function (mode) {
        this.isCompleteByFilterVisible = !this.isCompleteByFilterVisible;
        this.homeService.changeFullscreenMode(mode);
    };
    AssessmentCaptureLightComponent.prototype.ngOnDestroy = function () {
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("dataGrid"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_devextreme_angular__["DxDataGridComponent"])
    ], AssessmentCaptureLightComponent.prototype, "dataGrid", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("apiTabs"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], AssessmentCaptureLightComponent.prototype, "apiTabs", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("dxPopup"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_devextreme_angular__["DxPopupComponent"])
    ], AssessmentCaptureLightComponent.prototype, "dxPopup", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("DataGridWrapper"),
        __metadata("design:type", Object)
    ], AssessmentCaptureLightComponent.prototype, "dataGridWrapper", void 0);
    AssessmentCaptureLightComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-assessment-capture-light',
            template: __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.html"),
            styles: [__webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__assessment_capture_light_service__["a" /* AssessmentCaptureLightService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_5__assessment_capture_full_assessment_capture_full_service__["a" /* AssessmentCaptureFullService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["UpperCasePipe"],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_questions_service__["a" /* QuestionsService */],
            __WEBPACK_IMPORTED_MODULE_8__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_11__assessment_state_assessment_state_service__["a" /* AssessmentStateService */],
            __WEBPACK_IMPORTED_MODULE_10__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_13__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_12__standards_standards_service__["a" /* StandardsService */]])
    ], AssessmentCaptureLightComponent);
    return AssessmentCaptureLightComponent;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-capture-light/assessment-capture-light.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Tab */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentCaptureLightService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Tab = (function () {
    function Tab() {
    }
    return Tab;
}());

var AssessmentCaptureLightService = (function () {
    function AssessmentCaptureLightService(httpClient, userService, unitService) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.unitService = unitService;
    }
    AssessmentCaptureLightService.prototype.getDimensions = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Dimensions/GetLiteList");
    };
    AssessmentCaptureLightService.prototype.getPrinciples = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Principles/GetLiteList");
    };
    AssessmentCaptureLightService.prototype.getLiteListPrincipleGroups = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/PrincipleGroups/GetLiteList");
    };
    AssessmentCaptureLightService.prototype.getDimentionsByStandardIdFromUnit = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId)
                    .switchMap(function (unit) {
                    return _this.getDimensions();
                });
            }
        });
    };
    AssessmentCaptureLightService.prototype.getPrinciplesByStandardIdFromUnit = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId)
                    .switchMap(function (unit) {
                    return _this.getPrinciples();
                });
            }
        });
    };
    AssessmentCaptureLightService.prototype.getQuestionsListByStandardAndPrinciple = function (principleOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetLiteListByStandardAndPrinciple(" + principleOid + ")");
    };
    AssessmentCaptureLightService.prototype.getQuestionsListByStandardAndDimension = function (dimensionOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetLiteListByStandardAndDimension(" + dimensionOid + ")");
    };
    AssessmentCaptureLightService.prototype.getQuestionsListByPrincipleGroup = function (principleGroupOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetLiteListByStandardAndPrincipleGroup(" + principleGroupOid + ")");
    };
    AssessmentCaptureLightService.prototype.getCurrentUnitFromUser = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            _this.currentUserId = user.body['Oid'];
            if (user.body['CurrentUnitId']) {
                var unitId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(unitId);
            }
        });
    };
    AssessmentCaptureLightService.prototype.getLiteListGuidanses = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetLiteQuestionsGroupGuidances");
    };
    AssessmentCaptureLightService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__["a" /* UnitService */]])
    ], AssessmentCaptureLightService);
    return AssessmentCaptureLightService;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-current-status/assessment-current-status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"assesment-current-status-container\">\r\n  <div class=\"current-status-wrapper\">\r\n    <div class=\"assesment-current-status-annotation\">\r\n      Lorem Ipsum is simply dummy text of the printing and typesetting industry.\r\n      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,\r\n      when an unknown printer took a galley of type and scrambled it to make a type specimen book.\r\n      It has survived not only five centuries, but also the leap into electronic typesetting.\r\n      <h5> Choose an assessment you want to continue with.</h5>\r\n    </div>\r\n\r\n    <div class=\"assesment-type-container\">\r\n      <div class=\"assessment-type-header\">\r\n        <i class=\"material-icons\">pie_chart</i>\r\n        <h3>Lte ASSESSMENT</h3>\r\n      </div>\r\n      <div class=\"assessment-type-content\">\r\n        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\r\n          standard dummy text ever since the 1500s, whe</p>\r\n        <h5>What this Includes: </h5>\r\n        <ul>\r\n          <li>- Quick diagnosis of strengths and weaknesses</li>\r\n          <li>- Graphical reporting</li>\r\n          <li>- Performance reporting & priorotisation</li>\r\n          <li>- Improvement planner</li>\r\n        </ul>\r\n        <h5>Excludes</h5>\r\n        <ul>\r\n          <li>- Full Benchmarking of relevant standards</li>\r\n          <li>- Benchmarking of standards</li>\r\n          <li>- Integrated compliance reporting and management</li>\r\n        </ul>\r\n\r\n        <dx-button\r\n          text=\"CONTINUE\"\r\n          type=\"success\"\r\n          (onClick)=\"changeAssessmentType(1)\">\r\n        </dx-button>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"assesment-type-container\">\r\n      <div class=\"assessment-type-header full-assessment-header\">\r\n\r\n        <i class=\"material-icons\">storage</i>\r\n        <h3>FUll ASSESSMENT</h3>\r\n      </div>\r\n      <div class=\"assessment-type-content\">\r\n        <p>orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\r\n          standard dummy text ever since the 1500s, whe</p>\r\n        <h5>What this Includes: </h5>\r\n        <ul>\r\n          <li>- Quick diagnosis of strengths and weaknesses</li>\r\n          <li>- Graphical reporting</li>\r\n          <li>- Performance reporting & priorotisation</li>\r\n          <li>- Improvement planner</li>\r\n          <li>- Full Benchmarking of relevant standards.</li>\r\n          <li>- Benchmarking of standards.</li>\r\n          <li>- Integrated compliance and standards management.</li>\r\n          <li>- Integrated compliance reporting and management.</li>\r\n        </ul>\r\n        <dx-button\r\n          (onClick)=\"changeAssessmentType(0)\"\r\n          text=\"CONTINUE\"\r\n          type=\"success\">\r\n        </dx-button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-current-status/assessment-current-status.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.assesment-current-status-container {\n  background-color: #fff;\n  height: 100vh; }\n.assesment-current-status-container ul {\n    list-style: none;\n    font-size: 14px;\n    text-align: left;\n    margin-bottom: 15px; }\n.assesment-current-status-container .current-status-wrapper {\n    display: -ms-grid;\n    display: grid;\n    justify-items: center;\n    -ms-grid-columns: 1fr 1fr;\n        grid-template-columns: 1fr 1fr;\n    text-align: center;\n    padding: 15px; }\n.assesment-current-status-container .assesment-current-status-annotation {\n    grid-column: 1 / -1;\n    margin-bottom: 25px; }\n.assesment-current-status-container .assesment-type-container {\n    max-width: 420px;\n    border: 2px solid #F3F3F3; }\n.assesment-current-status-container .assessment-type-header {\n    display: -ms-grid;\n    display: grid;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    font-size: 30px;\n    font-weight: bold;\n    color: #fff;\n    height: 200px;\n    background-color: #B0DBFB; }\n.assesment-current-status-container i {\n    font-size: 90px; }\n.assesment-current-status-container .full-assessment-header {\n    background-color: #6BC871; }\n.assesment-current-status-container .assessment-type-content {\n    padding: 25px; }\n.assesment-current-status-container /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.assesment-current-status-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-current-status/assessment-current-status.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentCurrentStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AssessmentCurrentStatusComponent = (function () {
    function AssessmentCurrentStatusComponent(unitService, userService, registrationSettingsService, router) {
        this.unitService = unitService;
        this.userService = userService;
        this.registrationSettingsService = registrationSettingsService;
        this.router = router;
        this.hasAssessmentType = false;
    }
    AssessmentCurrentStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('this.userService.currentUnitId', this.userService.getCurrentUser().CurrentUnitId);
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
            .subscribe(function (unit) {
            _this.currentUnit = unit;
            if (_this.currentUnit.AssessmentType !== (null || -1)) {
                _this.router.navigate(['assessment-current-status']);
            }
            console.log('unit', unit);
        });
    };
    AssessmentCurrentStatusComponent.prototype.changeAssessmentType = function (assessmentType) {
        var _this = this;
        this.currentUnit['AssessmentType'] = assessmentType;
        console.log(this.currentUnit);
        this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
            .subscribe(function (unit) {
            console.log('updatedunit', unit);
            if (unit['AssessmentType'] === 1) {
                _this.router.navigate(['assessment-capture-light']);
            }
            if (unit['AssessmentType'] === 0) {
                _this.router.navigate(['assessment-capture-full']);
            }
        });
    };
    AssessmentCurrentStatusComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-assessment-current-status',
            template: __webpack_require__("./client/app/home/assessment/assessment-current-status/assessment-current-status.component.html"),
            styles: [__webpack_require__("./client/app/home/assessment/assessment-current-status/assessment-current-status.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["e" /* Router */]])
    ], AssessmentCurrentStatusComponent);
    return AssessmentCurrentStatusComponent;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-reporting/assessment-reporting.component.html":
/***/ (function(module, exports) {

module.exports = "<dx-load-panel\r\n  #loadPanel1\r\n  shadingColor=\"rgba(255,255,255,0.4)\"\r\n  [position]=\"{ of: '#reporting' }\"\r\n  [(visible)]=\"loadingVisible\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n>\r\n</dx-load-panel>\r\n<dx-load-panel\r\n  #loadPanel2\r\n  shadingColor=\"rgba(255,255,255,0.4)\"\r\n  [position]=\"{ of: '#ranked-res' }\"\r\n  [(visible)]=\"loadingVisibleRanked\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n>\r\n</dx-load-panel>\r\n<div class=\"top-navigation-wrapper\" [ngClass]=\"{'fixed' : isNavFixed}\" #navigation>\r\n  <div class=\"top-navigation\" *ngIf=\"dataSourseForDimensionSpider\">\r\n    <div class=\"nav-item\" pageScroll href=\"#strength\" (click)=\"isActive=1\"\r\n         [ngClass]=\"{'top-navigation-active' : isActive===1}\">\r\n      OVERVIEW\r\n    </div>\r\n    <div class=\"nav-item\" pageScroll href=\"#dimensions\" (click)=\"isActive=2\"\r\n         [ngClass]=\"{'top-navigation-active' : isActive===2}\">\r\n      DIMENSIONS\r\n    </div>\r\n    <div class=\"nav-item\" pageScroll href=\"#managementAreas\" (click)=\"isActive=3\"\r\n         [ngClass]=\"{'top-navigation-active' : isActive===3}\">\r\n      MANAGEMENT FOCUS AREAS\r\n    </div>\r\n    <div class=\"nav-item\" pageScroll href=\"#rankedResults\" (click)=\"isActive=4\"\r\n         [ngClass]=\"{'top-navigation-active' : isActive===4}\">\r\n      RANKED RESULTS\r\n    </div>\r\n  </div>\r\n  <dx-button text=\"PRINT PDF\" class='print-btn'>\r\n  </dx-button>\r\n</div>\r\n<div class=\"assessment-reporting-container\" id=\"reporting\">\r\n  <div class=\"chart-container\" >\r\n    <div class=\"container-header\">\r\n      <div class=\"anckor\" id=\"strength\"></div>\r\n      <p class=\"header-title\">STRENGTH OF DIMENSION</p>\r\n    </div>\r\n    <div class=\"chart-view-gauge\">\r\n      <dx-bar-gauge id=\"gauge1\" style=\"height: 400px\"\r\n                    [startValue]=\"0\"\r\n                    [endValue]=\"100\"\r\n                    [values]=\"dimensionsValues\"\r\n                    [palette]=\"['#7FD03E', '#D49290', '#6AB8D9']\"\r\n                    [backgroundColor]=\"'#DAECF7'\">\r\n        <dxo-label\r\n          [visible]=\"false\"\r\n        ></dxo-label>\r\n        <dxo-tooltip target=\"#gauge1\"\r\n                     [enabled]=\"true\" [zIndex]=\"10000\"\r\n                     [customizeTooltip]=\"customizeGauge1Tooltip\"\r\n        >\r\n          <dxo-format\r\n            type=\"fixedPoint\"\r\n            [precision]=\"1\"\r\n          ></dxo-format>\r\n        </dxo-tooltip>\r\n      </dx-bar-gauge>\r\n      <div class=\"legend-container\">\r\n        <div *ngFor=\"let dimension of dimentionsList let index = index\">\r\n          <div class=\"color\" [ngStyle]=\"{'background-color': dimensionsColor[index]}\"></div>\r\n          <span id=\"guidanseD{{index}}\" (mouseenter)=\"toggleDimPopup(index)\"\r\n                (mouseleave)=\"toggleDimPopup(null)\" class=\"legend \">{{dimension.ShortTitle}}</span>\r\n          <dx-popover target=\"#guidanseD{{index}}\"\r\n                      position=\"top\"\r\n                      [width]=\"600\"\r\n                      [visible]=\"isDemensionsPopupVisible === index\">\r\n            <div *dxTemplate=\"let data = model of 'content'\" [innerHTML]=\"dimension.GuidanceText | replaceLineBreaks\"></div>\r\n            <dxo-animation>\r\n              <dxo-show\r\n                type=\"pop\"\r\n                [from]=\"{ scale: 0 }\"\r\n                [to]=\"{ scale: 1 }\"></dxo-show>\r\n              <dxo-hide\r\n                type=\"fade\"\r\n                [from]=\"1\"\r\n                [to]=\"0\"></dxo-hide>\r\n            </dxo-animation>\r\n          </dx-popover>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"chart-container\">\r\n    <div class=\"container-header\">\r\n      <p class=\"header-title\">STRENGTH OF PRINCIPLE</p>\r\n    </div>\r\n    <div class=\"chart-view-gauge\">\r\n      <dx-bar-gauge #gauge id=\"gauge2\" style=\"height: 400px\"\r\n                    [startValue]=\"0\"\r\n                    [endValue]=\"100\"\r\n                    [palette]=\"principlesColor\"\r\n                    [values]=\"principlesValues\"\r\n                    [backgroundColor]=\"'#DAECF7'\">\r\n        <dxo-label\r\n          [visible]=\"false\"\r\n        ></dxo-label>\r\n        <dxo-tooltip target=\"#gauge2\"\r\n                     [enabled]=\"true\" [zIndex]=\"10000\"\r\n                     [customizeTooltip]=\"customizeGauge2Tooltip\">\r\n          <dxo-format\r\n            type=\"fixedPoint\"\r\n            [precision]=\"1\"\r\n          ></dxo-format>\r\n        </dxo-tooltip>\r\n      </dx-bar-gauge>\r\n      <div class=\"legend-container\">\r\n        <div *ngFor=\"let principle of principleList; let index = index\">\r\n          <div class=\"color\" [ngStyle]=\"{'background-color': principlesColor[index]}\"></div>\r\n          <span id=\"guidanse{{index}}\" (mouseenter)=\"togglePrinciplePopup(index)\"\r\n                (mouseleave)=\"togglePrinciplePopup(null)\" class=\"legend \">{{principle.ShortTitle}}</span>\r\n          <dx-popover target=\"#guidanse{{index}}\" style=\"height: auto\"\r\n                      position=\"top\"\r\n                      [width]=\"600\"\r\n                      [visible]=\"isPrinciplesPopupVisible === index\">\r\n            <div  *dxTemplate=\"let data = model of 'content'\" [innerHTML]=\"principle.GuidanceText | replaceLineBreaks\">\r\n\r\n            </div>\r\n            <dxo-animation>\r\n              <dxo-show\r\n                type=\"pop\"\r\n                [from]=\"{ scale: 0 }\"\r\n                [to]=\"{ scale: 1 }\"></dxo-show>\r\n              <dxo-hide\r\n                type=\"fade\"\r\n                [from]=\"1\"\r\n                [to]=\"0\"></dxo-hide>\r\n            </dxo-animation>\r\n          </dx-popover>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"assessment-tile-container1\" >\r\n  <div class=\"chart-container\" *ngFor=\"let source of dataSources let index = index\">\r\n    <div class=\"container-header\">\r\n      <div class=\"anckor\" id=\"dimensions\"></div>\r\n      <p class=\"header-title\">{{source.title}}</p>\r\n    </div>\r\n    <dx-polar-chart\r\n      [useSpiderWeb]=\"true\"\r\n      [dataSource]=\"source.data\"\r\n      [legend]=\"{ visible: false }\"\r\n      [valueAxis]=\"{max: 100, min: 0}\">\r\n      <dxi-series valueField=\"Value\" name=\"Value\"></dxi-series>\r\n      <dxo-argument-axis>\r\n        <dxo-label\r\n          [customizeText]=\"spiderText\">\r\n        </dxo-label>\r\n      </dxo-argument-axis>\r\n      <dxo-common-axis-settings [visible]=\"false\"></dxo-common-axis-settings>\r\n      <dxo-common-series-settings argumentField=\"Name\"\r\n                                  type=\"area\"\r\n                                  [area]=\"{color: colorsArr[index]}\"\r\n                                  [border]=\"{visible: true}\"\r\n                                  [point]=\"{visible: true}\">\r\n      </dxo-common-series-settings>\r\n      <dxo-tooltip [enabled]=\"true\" [customizeTooltip]=\"customizeSpiderTooltip\">\r\n        <dxo-format\r\n          type=\"fixedPoint\"\r\n        ></dxo-format>\r\n      </dxo-tooltip>\r\n    </dx-polar-chart>\r\n  </div>\r\n</div>\r\n\r\n<div style=\"min-height: 500px\">\r\n  <div class=\"container-header container-header-top\">\r\n    <p class=\"header-title\">MANAGEMENT AREAS</p>\r\n    <div class=\"anckor\" id=\"managementAreas\"></div>\r\n  </div>\r\n  <div class=\"assessment-tile-container2\">\r\n    <div class=\"chart-container\" *ngFor=\"let source of dataSourcesByPrinciplesGroup\">\r\n      <div class=\"container-header\">\r\n        <p class=\"header-title\">{{source.title}}</p>\r\n      </div>\r\n      <dx-polar-chart\r\n        [useSpiderWeb]=\"true\"\r\n        [dataSource]=\"source.data\"\r\n        [legend]=\"{ visible: false }\"\r\n        [valueAxis]=\"{max: 100, min: 0}\">\r\n        <dxi-series valueField=\"Value\" name=\"Value\"></dxi-series>\r\n        <dxo-argument-axis>\r\n          <dxo-label\r\n            [customizeText]=\"spiderText\">\r\n          </dxo-label>\r\n        </dxo-argument-axis>\r\n        <dxo-common-axis-settings [visible]=\"false\"></dxo-common-axis-settings>\r\n        <dxo-common-series-settings argumentField=\"Name\"\r\n                                    type=\"area\"\r\n                                    [area]=\"{color: colorsArr[0]}\"\r\n                                    [border]=\"{visible: true}\"\r\n                                    [point]=\"{visible: true}\"> >\r\n        </dxo-common-series-settings>\r\n        <dxo-tooltip [enabled]=\"true\" [customizeTooltip]=\"customizeSpiderTooltip\">\r\n          <dxo-format\r\n            type=\"fixedPoint\"\r\n          ></dxo-format>\r\n        </dxo-tooltip>\r\n      </dx-polar-chart>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div id=\"ranked-res\" class=\"chart-container\" *ngIf=\"characteristicsBarChartDataSource\">\r\n  <div class=\"container-header\">\r\n    <p class=\"header-title\">RANKED RESULTS</p>\r\n    <div class=\"anckor\" id=\"rankedResults\"></div>\r\n  </div>\r\n  <div class=\"chart-view\">\r\n    <div class=\"sort-container\">\r\n      <span>SORT BY</span>\r\n      <dx-select-box [dataSource]=\"['DIMENSION', 'LOW to HIGH', 'HIGH TO LOW']\"\r\n                     (onSelectionChanged)=\"getSortedValues($event)\">\r\n      </dx-select-box>\r\n    </div>\r\n    <dx-chart style=\"height: 700px; width: 80%\" [dataSource]=\"characteristicsBarChartDataSource\"\r\n              [rotated]=\"true\"\r\n              [customizePoint]=\"customizeSeriesByGroup1\"\r\n              [equalBarWidth]=\"false\"\r\n              [backgroundColor]=\"'#DAECF7'\"\r\n              [customizeLabel]=\"customizeCharacteristicBarChartLabel\"\r\n              [argumentAxis]=\"{placeholderSize: 400}\"\r\n              (onArgumentAxisClick)=\"tooltipShow($event)\"\r\n              [valueAxis]=\"{max: 100, min: 0, label:{customizeText: customizeValueLabel}}\"\r\n    >\r\n      <dxi-series></dxi-series>\r\n      <dxo-common-series-settings\r\n\r\n        argumentField=\"Name\"\r\n        type=\"bar\"\r\n        valueField=\"Value\">\r\n        <dxo-label\r\n          [visible]=\"true\"\r\n          [customizeText]=\"barChartText\"\r\n          [horizontalAlignment]=\"right\">\r\n        </dxo-label>\r\n      </dxo-common-series-settings>\r\n      <dxo-legend [visible]=\"false\"></dxo-legend>\r\n    </dx-chart>\r\n  </div>\r\n\r\n  <dx-popup #dxPopup\r\n            [width]=\"500\"\r\n            [height]=\"600\"\r\n            [showTitle]=\"true\"\r\n            title=\"{{guidanceTitle}}\"\r\n            [dragEnabled]=\"true\"\r\n            [closeOnOutsideClick]=\"true\"\r\n            [closeOnBackButton]=\"true\"\r\n            [showCloseButton]=\"true\"\r\n            [(visible)]=\"guidanceShow\"\r\n            [shading]=\"false\"\r\n            [resizeEnabled]=\"true\"\r\n  >\r\n    <div *dxTemplate=\"let data of 'content'\">\r\n      <p [innerHTML]=\"guidanceText | replaceLineBreaks\"></p>\r\n    </div>\r\n  </dx-popup>\r\n\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-reporting/assessment-reporting.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.assessment-reporting-container {\n  grid-gap: 15px;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr 1fr;\n      grid-template-columns: 1fr 1fr; }\n.chart-container, .statistics-container {\n  width: 100%;\n  background-color: #fff;\n  margin-bottom: 15px; }\n.chart-container {\n  position: relative; }\n.chart-container .anchor-block {\n    position: absolute;\n    top: -70px; }\n.chart-content {\n  width: 100%; }\n.container-header {\n  position: relative;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 15px;\n  height: 50px;\n  padding: 15px;\n  background-color: #C7EBFB;\n  color: #fff;\n  font-weight: bold; }\n.container-header-top {\n  background-color: #6ECDF7;\n  margin-bottom: 15px;\n  position: relative; }\n.container-header-top .anchor-block {\n    position: absolute;\n    top: -70px; }\n.header-label {\n  float: right;\n  margin: 0 !important;\n  font-size: 12px;\n  line-height: 20px; }\n.header-title {\n  float: left; }\n.chart-view {\n  padding: 15px;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr;\n      grid-template-columns: 1fr; }\n.chart-view-gauge {\n  padding: 15px;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr 250px;\n      grid-template-columns: 1fr 250px; }\n.sort-container {\n  grid-gap: 15px;\n  font-size: 14px;\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  justify-items: right;\n  -ms-grid-columns: 5fr auto;\n      grid-template-columns: 5fr auto; }\n.sort-container dx-select-box {\n    width: 200px; }\n.review-container {\n  display: -ms-grid;\n  display: grid;\n  position: relative;\n  justify-items: center;\n  text-align: center; }\n.assessment-tile-container1 {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: (minmax(360px, 1fr))[auto-fill];\n      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\n  grid-gap: 15px;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n.assessment-tile-container2 {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: (minmax(265px, 1fr))[auto-fill];\n      grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));\n  grid-gap: 15px;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n.top-navigation {\n  display: -ms-grid;\n  display: grid;\n  grid-column: 1 / -1;\n  width: 65%;\n  -ms-grid-columns: auto auto auto auto auto;\n      grid-template-columns: auto auto auto auto auto;\n  font-size: 12px;\n  font-weight: bold;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n.top-navigation .nav-item {\n    padding: 10px;\n    border: 1px solid #d8d8d8;\n    border-right: none !important;\n    text-align: center;\n    cursor: pointer; }\n.top-navigation .nav-item:first-child {\n      border-top-left-radius: 20px;\n      border-bottom-left-radius: 20px;\n      border-right: none !important; }\n.top-navigation .nav-item:last-child {\n      border-top-right-radius: 20px;\n      border-bottom-right-radius: 20px;\n      border: 1px solid #d8d8d8 !important; }\n.top-navigation .nav-item:not(:last-child) {\n      border-right: 1px solid #d8d8d8; }\n.top-navigation .top-navigation-active {\n    background-color: #fff;\n    color: #6BCDFD; }\n.top-navigation-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n.top-navigation-wrapper.fixed {\n    position: fixed;\n    top: 0;\n    max-width: 1697px;\n    width: 100%;\n    z-index: 999;\n    background-color: #F3F3F3;\n    padding: 10px 0; }\n.top-navigation-wrapper.fixed .top-navigation {\n      margin: 0; }\n.top-navigation {\n  margin-bottom: 15px;\n  cursor: auto;\n  position: relative; }\n.print-btn {\n  background-color: #6FCBFB;\n  width: 150px;\n  color: #fff;\n  -webkit-transition: all .15s linear;\n  transition: all .15s linear; }\n.print-btn:hover {\n    background-color: #CBCBCB; }\n.legend-container {\n  right: 15px;\n  top: 70px; }\n.legend-container .legend {\n    font-size: 12px;\n    color: #9898A5;\n    position: relative; }\n.legend-container .env:before {\n    content: '';\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #7FD03E;\n    margin-right: 5px; }\n.legend-container .social:before {\n    content: '';\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #D49290;\n    margin-right: 5px; }\n.legend-container .economic:before {\n    content: '';\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background-color: #6AB8D9;\n    margin-right: 5px; }\n.legend-container .color {\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    margin-right: 5px; }\n.anckor {\n  position: absolute;\n  top: -140px; }\n.anckor2 {\n  position: absolute;\n  top: -100px; }\n.anckor4 {\n  position: absolute;\n  top: -130px; }\n.anckor3 {\n  position: absolute;\n  top: -70px; }\n.anckor5 {\n  position: absolute;\n  top: -100px; }\n@media screen and (max-width: 1024px) {\n  .chart-view-gauge {\n    -ms-grid-columns: 1fr;\n        grid-template-columns: 1fr;\n    justify-items: center; } }\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-reporting/assessment-reporting.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentReportingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assessment_reporting_service__ = __webpack_require__("./client/app/home/assessment/assessment-reporting/assessment-reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assessment_capture_full_assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assessment_capture_light_assessment_capture_light_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_reporting_service__ = __webpack_require__("./client/app/shared/services/reporting.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AssessmentReportingComponent = (function () {
    function AssessmentReportingComponent(assessmentReportingService, userService, unitService, assessmentCaptureFullService, assessmentCaptureLightService, homeService, registrationSettingsService, reportingService, assessmentStateService) {
        var _this = this;
        this.assessmentReportingService = assessmentReportingService;
        this.userService = userService;
        this.unitService = unitService;
        this.assessmentCaptureFullService = assessmentCaptureFullService;
        this.assessmentCaptureLightService = assessmentCaptureLightService;
        this.homeService = homeService;
        this.registrationSettingsService = registrationSettingsService;
        this.reportingService = reportingService;
        this.assessmentStateService = assessmentStateService;
        this.dataSourseForDimensionSpider = [];
        this.dataSourseForPrincipleSpider = [];
        this.characteristicsBarChartDataSource = [];
        this.dimentionsList = [];
        this.principleGroupList = [];
        this.principleList = [];
        this.dataSources = [];
        this.dataSourcesByPrinciplesGroup = [];
        this.colors = [];
        this.dimensionsValues = [];
        this.principlesValues = [];
        this.loadingVisible = true;
        this.loadingVisibleRanked = false;
        this.isNavFixed = false;
        this.isDemensionsPopupVisible = -1;
        this.isPrinciplesPopupVisible = -1;
        this.colorsArr = ['#6AB8D9', '#D49290', '#7FD03E'];
        this.principlesColor = ['#b2e9ff', '#6fc9ed', '#6AB8D9', '#4185a0', '#FEC6CD', '#D49290', '#7FD03E', '#5a932c'];
        this.dimensionsColor = ['#6AB8D9', '#D49290', '#7FD03E',];
        this.guidanceShow = false;
        this.customizeSeriesByGroup1 = function (series) {
            for (var i = 0; i < _this.self.characteristicsBarChartDataSource.length; i++) {
                if (series.index == i && _this.self.characteristicsBarChartDataSource[i].Group.includes('Soc')) {
                    return { color: '#D49290' };
                }
                if (series.index == i && _this.self.characteristicsBarChartDataSource[i].Group.includes('Eco')) {
                    return { color: '#6AB8D9' };
                }
                if (series.index == i && _this.self.characteristicsBarChartDataSource[i].Group.includes('Env')) {
                    return { color: '#7FD03E' };
                }
            }
        };
        this.customizeCharacteristicBarChartLabel = function (arg) {
            return {
                backgroundColor: "none",
                font: { color: '#fff' },
                position: 'inside',
                alignment: 'left',
            };
        };
        this.customizePoint = function (arg) {
            console.log("CUSTOMIZE point", arg);
            for (var i = 0; i < _this.dimentionsList.length; i++) {
                if (arg.argument === _this.dimentionsList[i].ShortTitle) {
                    return { color: "" + _this.colorsArr[i] };
                }
            }
        };
        this.spiderText = function (arg) {
            return '';
        };
        this.self = this;
        this.customizeGauge1Tooltip = this.customizeGauge1Tooltip.bind(this);
        this.customizeGauge2Tooltip = this.customizeGauge2Tooltip.bind(this);
        this.customizeSeriesByGroup1 = this.customizeSeriesByGroup1.bind(this);
        this.customizeSpiderTooltip = this.customizeSpiderTooltip.bind(this);
        this.togglePrinciplePopup = this.togglePrinciplePopup.bind(this);
        this.toggleDimPopup = this.toggleDimPopup.bind(this);
        this.tooltipShow = this.tooltipShow.bind(this);
    }
    AssessmentReportingComponent.prototype.checkScroll = function () {
        var scrollPosition = window.pageYOffset;
        if (scrollPosition > 110) {
            this.isNavFixed = true;
        }
        else {
            this.isNavFixed = false;
        }
    };
    AssessmentReportingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (item) {
            console.log('SELECTORUNIT', item);
            _this.dimensionsValues = [];
            _this.principlesValues = [];
            _this.dataSources = [];
            _this.dataSourcesByPrinciplesGroup = [];
            _this.characteristicsBarChartDataSource = [];
            _this.loadingVisible = true;
            if (item.AssessmentType === (null || -1)) {
                item.AssessmentType = 0;
                _this.registrationSettingsService.addOrUpdateUnit(item)
                    .subscribe(function (unit) {
                    console.log('this.currentUnit[AssessmentType] = 0;', unit);
                    _this.loadData(item);
                });
            }
            else {
                _this.loadData(item);
                console.log('this.currentUnit[AssessmentType] allready 0;');
            }
        });
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId);
            }
        })
            .subscribe(function (unit) {
            console.log('UNIT', unit);
            _this.loadData(unit);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    AssessmentReportingComponent.prototype.loadData = function (unit) {
        var _this = this;
        this.assessmentReportingService.getDimensionSpiderData()
            .subscribe(function (data) {
            _this.dataSourseForDimensionSpider = data.reverse();
            _this.getValuesForDimensions(_this.dataSourseForDimensionSpider);
            console.log('dataSourseForDimensionSpider', _this.dataSourseForDimensionSpider);
            console.log('this.getValuesForDimensions(this.dataSourseForDimensionSpider);', _this.getValuesForDimensions(_this.dataSourseForDimensionSpider));
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        var dataSourseForPrincipleSpider$ = this.assessmentReportingService.getPrincipleSpiderData();
        var characteristicsBarChartDataSource$ = this.assessmentReportingService.getCharacteristicsBarChartData();
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin(dataSourseForPrincipleSpider$, characteristicsBarChartDataSource$)
            .subscribe(function (results) {
            _this.dataSourseForPrincipleSpider = results[0].reverse();
            var datasoursePrinciple = Object.assign([], _this.dataSourseForPrincipleSpider);
            console.log('datasoursePrinciple', datasoursePrinciple);
            console.log(' this.dataSourseForPrincipleSpider', _this.dataSourseForPrincipleSpider);
            _this.getValuesForPrinciples(datasoursePrinciple);
            _this.characteristicsBarChartDataSource = results[1];
            console.log('dataSourseForPrincipleSpider/Barchart', results);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        if (unit.AssessmentType === 0) {
            this.dimensionsObservable = this.reportingService.getAllDimensions();
            this.principleGroupObservable = this.assessmentStateService.getFullListByPrincipleGroups();
            this.principlesObservable = this.reportingService.getAllPrinciples();
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([this.dimensionsObservable, this.principleGroupObservable, this.principlesObservable])
                .subscribe(function (results) {
                _this.dimentionsList = results[0];
                _this.principleGroupList = results[1];
                _this.principleList = results[2];
                console.log(_this.principleList);
                console.log('DIMENSIONSFULL/PRINCIPLE', results);
                _this.getArrayOfCharacteristicsByDimension(_this.dimentionsList);
                _this.getArrayOfCharacteristicsByPrinciplesGroup(_this.principleGroupList);
                _this.loadingVisible = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                _this.loadingVisible = false;
            });
        }
        if (unit.AssessmentType === 1) {
            this.dimensionsObservable = this.reportingService.getAllDimensions();
            this.principleGroupObservable = this.assessmentStateService.getLiteListByPrincipleGroups();
            this.principlesObservable = this.reportingService.getAllPrinciples();
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin([this.dimensionsObservable, this.principleGroupObservable, this.principlesObservable])
                .subscribe(function (results) {
                _this.dimentionsList = results[0];
                _this.principleGroupList = results[1];
                _this.principleList = results[2];
                console.log('DIMENSIONSLITE', results);
                _this.getArrayOfCharacteristicsByDimension(_this.dimentionsList);
                _this.getArrayOfCharacteristicsByPrinciplesGroup(_this.principleGroupList);
                _this.loadingVisible = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
                _this.loadingVisible = false;
            });
        }
    };
    AssessmentReportingComponent.prototype.barChartTooltip = function (arg) {
        console.log(arg);
    };
    AssessmentReportingComponent.prototype.customizeSeriesByGroup2 = function (valueFromNameField) {
        if (valueFromNameField === "Social") {
            return { color: '#D49290' };
        }
        if (valueFromNameField === "Economic") {
            return { color: '#6AB8D9' };
        }
        if (valueFromNameField === "Environmental") {
            return { color: '#7FD03E' };
        }
    };
    AssessmentReportingComponent.prototype.tooltipShow = function (event) {
        console.log(event);
        var arr = this.self.characteristicsBarChartDataSource
            .filter(function (item) {
            return item.Name === event.argument;
        });
        console.log(arr);
        this.guidanceShow = true;
        this.guidanceText = arr[0].Guidance;
        this.guidanceTitle = arr[0].Name;
    };
    AssessmentReportingComponent.prototype.format = function (event) {
        console.log(event);
    };
    AssessmentReportingComponent.prototype.currentArg = function (event, index, array) {
        if (event.Name === event.argument) {
            return index;
        }
    };
    AssessmentReportingComponent.prototype.getRoundedValue = function (value) {
        var val;
        (value.toFixed(1) - value.toFixed() === 0) ? val = value.toFixed() : val = value.toFixed(1);
        return val;
    };
    AssessmentReportingComponent.prototype.customizeSpiderTooltip = function (arg) {
        //let value = arg.argumentText + ": " + this.getRoundedValue(arg.value) + "%"
        var value = arg.argumentText + ": " + Math.floor(arg.value) + "%";
        return {
            text: value
        };
    };
    AssessmentReportingComponent.prototype.customizeGauge1Tooltip = function (arg) {
        console.log('customizeGauge1Tooltip', arg);
        //let tooltip = this.self.dataSourseForDimensionSpider[arg.index].Name + ":  " + this.getRoundedValue(arg.value) + "%";
        var tooltip = this.self.dataSourseForDimensionSpider[arg.index].Name + ":  " + Math.floor(arg.value) + "%";
        return {
            text: tooltip
        };
    };
    AssessmentReportingComponent.prototype.customizeGauge2Tooltip = function (arg) {
        console.log(arg);
        // let tooltip = this.self.dataSourseForPrincipleSpider[arg.index].Name + ":  " + this.getRoundedValue(arg.value) + "%";
        var tooltip = this.self.dataSourseForPrincipleSpider[arg.index].Name + ":  " + Math.floor(arg.value) + "%";
        return {
            text: tooltip
        };
    };
    AssessmentReportingComponent.prototype.getValuesForDimensions = function (graphArr) {
        var dimArr = [];
        graphArr.map(function (item) {
            dimArr.push(item.Value);
        });
        this.dimensionsValues = dimArr;
    };
    AssessmentReportingComponent.prototype.getValuesForPrinciples = function (graphArr) {
        var dimArr = [];
        graphArr.map(function (item) {
            dimArr.push(item.Value);
        });
        this.principlesValues = dimArr;
    };
    AssessmentReportingComponent.prototype.getArrayOfCharacteristicsByDimension = function (dimensions) {
        var _this = this;
        var data = [];
        for (var i = 0; i < this.dimentionsList.length; i++) {
            data.push(this.assessmentReportingService.getCharacteristicSpiderByDimension(dimensions[i].OID));
        }
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin(data).subscribe(function (data) {
            for (var i = 0; i < _this.dimentionsList.length; i++) {
                _this.dataSources.push({ title: _this.dimentionsList[i].ShortTitle, data: data[i] });
            }
            console.log('this.dataSources', _this.dataSources);
        });
    };
    AssessmentReportingComponent.prototype.getArrayOfCharacteristicsByPrinciplesGroup = function (principleGroup) {
        var _this = this;
        var data = [];
        console.log('this.principleList', this.principleGroupList);
        for (var i = 0; i < this.principleGroupList.length; i++) {
            data.push(this.assessmentReportingService.getCharacteristicSpiderByPrincipleGroup(principleGroup[i].OID));
        }
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin(data).subscribe(function (data) {
            console.log("DATA", data);
            for (var i = 0; i < _this.principleGroupList.length; i++) {
                _this.dataSourcesByPrinciplesGroup.push({ title: _this.principleGroupList[i].ShortTitle, data: data[i] });
            }
            console.log('this.principleList', _this.principleList);
            console.log('this.dataSourcesByPrinciplesGroup', _this.dataSourcesByPrinciplesGroup);
        });
    };
    AssessmentReportingComponent.prototype.customColors = function (arg) {
        return ['#D49290', '#6AB8D9', '#7FD03E'];
        //console.log(arg)
    };
    AssessmentReportingComponent.prototype.compareNumbersLowToHigh = function (a, b) {
        return b.Value - a.Value;
    };
    AssessmentReportingComponent.prototype.compareNumbersHighToLow = function (a, b) {
        return a.Value - b.Value;
    };
    AssessmentReportingComponent.prototype.compareByDimension = function (a, b) {
        if (a.Name > b.Name) {
            return 1;
        }
        if (!(a.Name - b.Name)) {
            return -1;
        }
    };
    AssessmentReportingComponent.prototype.getSortedValues = function (event) {
        var _this = this;
        this.colors = [];
        console.log(event.selectedItem);
        if (event.selectedItem === 'LOW to HIGH') {
            console.log('LOW to HIGH', this.characteristicsBarChartDataSource.sort(this.compareNumbersLowToHigh));
            //console.log('sort', arr.sort(this.compareNumbersLowToHigh));
            this.characteristicsBarChartDataSource = this.characteristicsBarChartDataSource.sort(this.compareNumbersLowToHigh);
        }
        if (event.selectedItem === 'HIGH TO LOW') {
            // this.characteristicsBarChartDataSource = this.characteristicsBarChartDataSource.sort(this.compareNumbers);
            console.log('HIGH TO LOW', this.characteristicsBarChartDataSource.sort(this.compareNumbersHighToLow));
            //console.log('sort', arr.sort(this.compareNumbersHighToLow));
            this.characteristicsBarChartDataSource = this.characteristicsBarChartDataSource.sort(this.compareNumbersHighToLow);
        }
        if (event.selectedItem === 'DIMENSION') {
            this.loadingVisibleRanked = true;
            this.characteristicsBarChartDataSource = [];
            this.assessmentReportingService.getCharacteristicsBarChartGroupedByDimension()
                .subscribe(function (dataSource) {
                _this.characteristicsBarChartDataSource = dataSource;
                console.log('dataSourceBYDIMENSION', _this.characteristicsBarChartDataSource);
                _this.loadingVisibleRanked = false;
            });
        }
    };
    AssessmentReportingComponent.prototype.getRandomColorArray = function () {
        for (var i = 0; i < this.dimentionsList.length; i++) {
            this.colors.push(this.getRandomColor());
        }
    };
    AssessmentReportingComponent.prototype.barChartText = function (info) {
        return Math.floor(info.value) + "%";
    };
    AssessmentReportingComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        return color;
    };
    AssessmentReportingComponent.prototype.getSeriesColor = function (dataSource) {
        console.log('DATASOURSE', dataSource);
        dataSource.forEach(function (data) {
            if (data.Group === "Social") {
                return '#D49290';
            }
            if (data.Group === "Economic") {
                return '#6AB8D9';
            }
            if (data.Group === "Environmental") {
                return '#7FD03E';
            }
        });
    };
    AssessmentReportingComponent.prototype.customizeValueLabel = function (info) {
        return info.value + "%";
    };
    AssessmentReportingComponent.prototype.togglePrinciplePopup = function (index) {
        this.isPrinciplesPopupVisible = index;
    };
    AssessmentReportingComponent.prototype.toggleDimPopup = function (index) {
        this.isDemensionsPopupVisible = index;
    };
    AssessmentReportingComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('gauge'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_10_devextreme_angular__["DxBarGaugeComponent"])
    ], AssessmentReportingComponent.prototype, "gauge", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('navigation'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], AssessmentReportingComponent.prototype, "navigation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AssessmentReportingComponent.prototype, "checkScroll", null);
    AssessmentReportingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-assessment-reporting',
            template: __webpack_require__("./client/app/home/assessment/assessment-reporting/assessment-reporting.component.html"),
            styles: [__webpack_require__("./client/app/home/assessment/assessment-reporting/assessment-reporting.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__assessment_reporting_service__["a" /* AssessmentReportingService */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_4__assessment_capture_full_assessment_capture_full_service__["a" /* AssessmentCaptureFullService */],
            __WEBPACK_IMPORTED_MODULE_5__assessment_capture_light_assessment_capture_light_service__["a" /* AssessmentCaptureLightService */],
            __WEBPACK_IMPORTED_MODULE_8__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_9__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_11__shared_services_reporting_service__["a" /* ReportingService */],
            __WEBPACK_IMPORTED_MODULE_7__assessment_state_assessment_state_service__["a" /* AssessmentStateService */]])
    ], AssessmentReportingComponent);
    return AssessmentReportingComponent;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-reporting/assessment-reporting.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentReportingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AssessmentReportingService = (function () {
    function AssessmentReportingService(httpClient, userService, unitService) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.unitService = unitService;
    }
    AssessmentReportingService.prototype.getDimensionSpiderData = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetDimensionSpiderData");
    };
    AssessmentReportingService.prototype.getPrincipleSpiderData = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetPrincipleSpiderData");
    };
    AssessmentReportingService.prototype.getCharacteristicSpiderByDimension = function (dimensionId) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetCharacteristicSpiderByDimension(" + dimensionId + ")");
    };
    AssessmentReportingService.prototype.getCharacteristicSpiderByPrincipleGroup = function (principleGroupId) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetCharacteristicSpiderByPrincipleGroup(" + principleGroupId + ")");
    };
    AssessmentReportingService.prototype.getCharacteristicsBarChartData = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetCharacteristicsBarChartData");
    };
    AssessmentReportingService.prototype.getCharacteristicsBarChartGroupedByDimension = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetCharacteristicsBarChartGroupedByDimension");
    };
    AssessmentReportingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__["a" /* UnitService */]])
    ], AssessmentReportingService);
    return AssessmentReportingService;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-state/assessment-state.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"top-navigation\">\r\n  <div class=\"nav-item\"  [ngClass]=\"{'top-navigation-active' : isActive===1}\" (click)=\"isActive=1\" pageScroll href=\"#liteAssessment\">\r\n    LITE ASSESSMENT\r\n  </div>\r\n  <div class=\"nav-item\"  [ngClass]=\"{'top-navigation-active' : isActive===2}\" (click)=\"isActive=2\" pageScroll href=\"#fullAssessment\">\r\n    FULL ASSESSMENT\r\n  </div>\r\n</div>\r\n<dx-load-panel\r\n  #loadPanel1\r\n  shadingColor=\"rgba(255,255,255,0)\"\r\n  [position]=\"{ of: '#report-container1' }\"\r\n  [visible]=\"loadingVisible2 && loadingVisible1\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n></dx-load-panel>\r\n<dx-load-panel\r\n  #loadPanel2\r\n  shadingColor=\"rgba(255,255,255,0)\"\r\n  [position]=\"{ of: '#report-container2' }\"\r\n  [visible]=\"loadingVisible3\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n></dx-load-panel>\r\n<dx-load-panel\r\n  #loadPanel3\r\n  shadingColor=\"rgba(255,255,255,0)\"\r\n  [position]=\"{ of: '#report-container3' }\"\r\n  [visible]=\"loadingVisible5  && loadingVisible4\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n></dx-load-panel>\r\n<dx-load-panel\r\n  #loadPanel4\r\n  shadingColor=\"rgba(255,255,255,0)\"\r\n  [position]=\"{ of: '#report-container4' }\"\r\n  [visible]=\"loadingVisible6\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\"\r\n></dx-load-panel>\r\n<div class=\"assessment-state-container\">\r\n  <div class=\"chart-container\" id=\"report-container1\">\r\n     <div class=\"container-header\" id=\"liteAssessment\">\r\n      <p class=\"header-title\">LIGHT ASSESSMENT OVERALL PROGRESS</p>\r\n      <div [ngSwitch]=\"spaDatasetLite?.State\">\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #FD001A\" *ngSwitchCase=\"SpaDataSetState.NotStarted\">\r\n          Not Started</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6CC871\" *ngSwitchCase=\"SpaDataSetState.InProgress\">\r\n          In Progress</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6BCDFA\" *ngSwitchCase=\"SpaDataSetState.Completed\">\r\n          Completed</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"chart-view\">\r\n      <div class=\"review-container\">\r\n        <div class=\"review-container-top\">\r\n          <div class=\"pie-chart-legend\" [ngClass]=\"{'pie-chart-legend-empty' : spaDatasetLite.AnsweredPercentage === 0 }\" *ngIf=\"spaDatasetLite\">{{spaDatasetLite.AnsweredPercentage}}%</div>\r\n          <dx-pie-chart style=\"height: 200px; width: 200px;\"\r\n                        type=\"doughnut\"\r\n                        [innerRadius]=\"1\"\r\n                        title=\"\"\r\n                        [palette]=\"[ '#46C25F', '#F7F7F7']\"\r\n                        [legend]=\"{ visible: false }\"\r\n                        [dataSource]=\"spaDataSetLitePieChart\">\r\n            <dxi-series\r\n              argumentField=\"state\"\r\n              valueField=\"value\">\r\n              <dxo-label\r\n                [visible]=\"false\">\r\n                <dxo-connector [visible]=\"true\"></dxo-connector>\r\n              </dxo-label>\r\n            </dxi-series>\r\n            <dxo-export [enabled]=\"false\"></dxo-export>\r\n          </dx-pie-chart>\r\n        </div>\r\n        <div *ngIf=\"spaDatasetLite\">\r\n          <p class=\"pie-chart-grade\">\r\n            BLUE NORTH REVIEW\r\n          </p>\r\n          <p class=\"pie-chart-label\"  *ngIf=\"spaDatasetLite?.Grade !==''\">{{spaDatasetLite?.Grade}}</p>\r\n          <dx-button *ngIf=\"spaDatasetLite?.Grade === 'Not Reviewed'\"\r\n                     text=\"SUBMIT FOR REVIEW\"\r\n                     type=\"success\"\r\n                     (onClick)=\"updateGrade(1, 'Lite')\">\r\n          </dx-button>\r\n        </div>\r\n      </div>\r\n      <div class=\"chart-content\" *ngIf=\"spaDataSetByDimentionsBarChartLite\">\r\n        <dx-chart style=\"height: 300px; width: 400px;\"\r\n                  [dataSource]=\"spaDataSetByDimentionsBarChartLite\"\r\n                  (onSeriesClick)=\"dimentionsBar($event)\"\r\n                  [equalBarWidth]=\"true\"\r\n                  [barWidth]=\"5\"\r\n                  [valueAxis]=\"{max: 100, label: {customizeText: customizeValueLabel}}\"\r\n                  accesskey=\"OID\"\r\n                  [palette]=\"['#6AB8D9', '#D49290', '#7FD03E']\">\r\n          <dxo-tooltip\r\n            [enabled]=\"true\"\r\n            location=\"edge\"\r\n            [customizeTooltip]=\"customizeToolTip\"\r\n          ></dxo-tooltip>\r\n          <dxo-common-series-settings\r\n            argumentField=\"ShortTitle\"\r\n            type=\"bar\"\r\n            valueField=\"AnsweredPercentage\">\r\n          </dxo-common-series-settings>\r\n          <dxo-legend\r\n            [verticalAlignment]=\"bottom\"\r\n            [horizontalAlignment]=\"center\"\r\n            [markerSize]=\"10\"\r\n            [customizeText]=\"customizeTextLegendDimensionsLite\"\r\n          ></dxo-legend>\r\n          <dxo-value-axis>\r\n            <dxo-label\r\n              [customizeText]=\"customizeValueLabel\">\r\n            </dxo-label>\r\n          </dxo-value-axis>\r\n          <dxo-argument-axis>\r\n            <dxo-label\r\n              (click)=\"redirect($event)\"\r\n              [customizeText]=\"customizeTextLabel\"\r\n            >\r\n            </dxo-label>\r\n          </dxo-argument-axis>\r\n          <dxo-series-template nameField=\"ShortTitle\"></dxo-series-template>\r\n        </dx-chart>\r\n        <div class=\"dimensions-button-container\">\r\n          <dx-button *ngIf=\"!loadingVisible2\"\r\n                     text=\"UPDATE\"\r\n                     [routerLink]=\"['/assessment-capture-light']\"\r\n                     type=\"success\"\r\n          ></dx-button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"statistics-container\" id=\"report-container2\">\r\n    <div class=\"container-header\">\r\n      <p class=\"header-title\"> LIGHT ASSESSMENT DETAILED PROGRESS</p>\r\n      <div [ngSwitch]=\"spaDatasetLite?.State\">\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #FD001A\" *ngSwitchCase=\"SpaDataSetState.NotStarted\">\r\n          Not Started</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6CC871\" *ngSwitchCase=\"SpaDataSetState.InProgress\">\r\n          In Progress</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6BCDFA\" *ngSwitchCase=\"SpaDataSetState.Completed\">\r\n          Completed</p>\r\n      </div>\r\n    </div>\r\n    <dx-tabs class=\"tabs-switcher\" [dataSource]=\"dataForFilter\"\r\n             #apiTabsLite\r\n             (onItemClick)=\"selectLiteAssessmentDetailedProgress($event)\"\r\n             [selectedIndex]=\"0\"\r\n             keyExpr=\"id\"\r\n    ></dx-tabs>\r\n\r\n    <div class=\"detail-chart-container\" [ngClass]=\"{'focus-area' : isFocusAriaActive}\">\r\n      <dx-chart style=\"height: 400px; width: 100%;\"\r\n                [dataSource]=\"spaDataSetByPrinciplesOrQuestionGroupeBarChartLite\"\r\n                [rotated]=\"true\"\r\n                [equalBarWidth]=\"false\"\r\n                [palette]=\"['#558FCC', '#B7CCE1', '#6CCDFA', '#77DDF9']\"\r\n                [valueAxis]=\"{max: 100 ,label: {customizeText: customizeValueLabel}}\">\r\n        <dxo-legend [visible]=\"false\"></dxo-legend>\r\n\r\n        <dxo-common-series-settings\r\n          argumentField=\"ShortTitle\"\r\n          type=\"bar\"\r\n          valueField=\"AnsweredPercentage\">\r\n        </dxo-common-series-settings>\r\n        <dxo-value-axis>\r\n          <dxo-label\r\n            [customizeText]=\"customizeValueLabel\">\r\n          </dxo-label>\r\n        </dxo-value-axis>\r\n        <dxo-argument-axis\r\n          type=\"discrete\"\r\n        ></dxo-argument-axis>\r\n        <dxo-series-template nameField=\"ShortTitle\"></dxo-series-template>\r\n      </dx-chart>\r\n\r\n      <div class=\"button-container\">\r\n        <dx-button class=\"update-button\" *ngFor=\"let item of spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons\"\r\n                   text=\"UPDATE\"\r\n                   (onClick)=\"redirectToCurrentPrincipleOrPrincipleGroup(item, 'light',  apiTabsLite.selectedIndex + 1 )\"\r\n                   type=\"success\">\r\n        </dx-button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"chart-container\" id=\"report-container3\">\r\n    <div class=\"container-header\" id=\"fullAssessment\">\r\n      <p class=\"header-title\">FULL ASSESSMENT OVERALL PROGRESS</p>\r\n      <div [ngSwitch]=\"spaDatasetFull?.State\">\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #FD001A\" *ngSwitchCase=\"SpaDataSetState.NotStarted\">\r\n          Not Started</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6CC871\" *ngSwitchCase=\"SpaDataSetState.InProgress\">\r\n          In Progress</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6BCDFA\" *ngSwitchCase=\"SpaDataSetState.Completed\">\r\n          Completed</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"chart-view\">\r\n      <div class=\"review-container\">\r\n        <div class=\"review-container-top\">\r\n          <div class=\"pie-chart-legend\" [ngClass]=\"{'pie-chart-legend-empty' : spaDatasetFull.AnsweredPercentage === 0 }\" *ngIf=\"spaDatasetFull\">{{spaDatasetFull.AnsweredPercentage}}%</div>\r\n          <dx-pie-chart style=\"height: 200px; width: 200px;\"\r\n                        type=\"doughnut\"\r\n                        [innerRadius]=\"1\"\r\n                        title=\"\"\r\n                        [palette]=\"[ '#46C25F', '#F7F7F7']\"\r\n                        [legend]=\"{ visible: false }\"\r\n                        [dataSource]=\"spaDataSetFullPieChart\">\r\n            <dxi-series\r\n              argumentField=\"state\"\r\n              valueField=\"value\">\r\n              <dxo-label\r\n                [visible]=\"false\"\r\n              >\r\n                <dxo-connector [visible]=\"true\"></dxo-connector>\r\n              </dxo-label>\r\n            </dxi-series>\r\n            <dxo-export [enabled]=\"false\"></dxo-export>\r\n          </dx-pie-chart>\r\n        </div>\r\n        <div *ngIf=\"spaDatasetFull\">\r\n          <p class=\"pie-chart-grade\">\r\n            BLUE NORTH REVIEW\r\n          </p>\r\n          <p *ngIf=\"spaDatasetFull?.Grade !==''\" class=\"pie-chart-label\">{{spaDatasetFull?.Grade}}</p>\r\n          <dx-button *ngIf=\"spaDatasetFull?.Grade === 'Not Reviewed'\"\r\n                     text=\"SUBMIT FOR REVIEW\"\r\n                     (onClick)=\"updateGrade(0, 'Full')\"\r\n                     type=\"success\">\r\n          </dx-button>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"chart-content\">\r\n        <dx-chart style=\"height: 300px; width: 400px;\"\r\n                  [dataSource]=\"spaDataSetByDimentionsBarChartFull\"\r\n                  (onSeriesClick)=\"dimentionsBar($event)\"\r\n                  [equalBarWidth]=\"true\"\r\n                  [barWidth]=\"5\"\r\n                  [valueAxis]=\"{max: 100, label: {customizeText: customizeValueLabel}}\"\r\n                   accesskey=\"OID\"\r\n                  [palette]=\"['#6AB8D9', '#D49290', '#7FD03E']\">\r\n          <dxo-tooltip\r\n            [enabled]=\"true\"\r\n            location=\"edge\"\r\n            [customizeTooltip]=\"customizeToolTip\"\r\n          ></dxo-tooltip>\r\n          <dxo-common-series-settings\r\n            argumentField=\"ShortTitle\"\r\n            type=\"bar\"\r\n            valueField=\"AnsweredPercentage\">\r\n          </dxo-common-series-settings>\r\n          <dxo-label\r\n            displayMode=\"percent\"\r\n            [staggeringSpacing]=\"30\">\r\n          </dxo-label>\r\n          <dxo-legend\r\n            [markerSize]=\"10\"\r\n          ></dxo-legend>\r\n\r\n          <dxo-value-axis>\r\n            <dxo-label\r\n              [customizeText]=\"customizeValueLabel\">\r\n            </dxo-label>\r\n          </dxo-value-axis>\r\n          <dxo-argument-axis>\r\n            <dxo-label\r\n              (onClick)=\"redirect($event)\"\r\n              [customizeText]=\"customizeTextLabel\">\r\n            </dxo-label>\r\n          </dxo-argument-axis>\r\n          <dxo-series-template nameField=\"ShortTitle\"></dxo-series-template>\r\n        </dx-chart>\r\n        <div class=\"dimensions-button-container\">\r\n          <dx-button *ngIf=\"!loadingVisible5\"\r\n                     text=\"UPDATE\"\r\n                     [routerLink]=\"['/assessment-capture-full']\"\r\n                     type=\"success\"\r\n          ></dx-button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"statistics-container\" id=\"report-container4\">\r\n    <div class=\"container-header\">\r\n      <p class=\"header-title\">FULL ASSESSMENT DETAILED PROGRESS</p>\r\n      <div [ngSwitch]=\"spaDatasetFull?.State\">\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #FD001A\" *ngSwitchCase=\"SpaDataSetState.NotStarted\">\r\n          Not Started</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6CC871\" *ngSwitchCase=\"SpaDataSetState.InProgress\">\r\n          In Progress</p>\r\n        <p class=\"pie-chart-label header-label\" style=\"background: #6BCDFA\" *ngSwitchCase=\"SpaDataSetState.Completed\">\r\n          Completed</p>\r\n      </div>\r\n    </div>\r\n    <dx-tabs class=\"tabs-switcher\" [dataSource]=\"dataForFilter\"\r\n             #apiTabsFull\r\n             (onItemClick)=\"selectFullAssessmentDetailedProgress($event)\"\r\n             [selectedIndex]=\"0\"\r\n             keyExpr=\"id\"\r\n    ></dx-tabs>\r\n    <div class=\"detail-chart-container\" [ngClass]=\"{'focus-area' : isFocusAriaActive}\">\r\n      <dx-chart style=\"height: 400px; width: 100%;\"\r\n                [dataSource]=\"spaDataSetByPrinciplesOrQuestionGroupeBarChartFull\"\r\n                [rotated]=\"true\"\r\n                [equalBarWidth]=false\r\n                (onLegendClick)=\"onLegendClick($event)\"\r\n                [valueAxis]=\"{max: 100, label: {customizeText: customizeValueLabel}}\"\r\n                [palette]=\"['#558FCC', '#B7CCE1', '#6CCDFA', '#77DDF9']\">\r\n        <dxo-legend [visible]=\"false\"></dxo-legend>\r\n        <dxo-common-series-settings\r\n          argumentField=\"ShortTitle\"\r\n          type=\"bar\"\r\n          valueField=\"AnsweredPercentage\">\r\n        </dxo-common-series-settings>\r\n        <dxo-value-axis>\r\n          <dxo-label\r\n            [customizeText]=\"customizeValueLabel\">\r\n          </dxo-label>\r\n        </dxo-value-axis>\r\n        <dxo-series-template nameField=\"ShortTitle\"></dxo-series-template>\r\n      </dx-chart>\r\n      <div class=\"button-container\">\r\n        <dx-button class=\"update-button\" *ngFor=\"let item of spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons.reverse()\"\r\n                   text=\"UPDATE\"\r\n                   (onClick)=\"redirectToCurrentPrincipleOrPrincipleGroup(item, 'full', apiTabsFull.selectedIndex + 1)\"\r\n                   type=\"success\">\r\n        </dx-button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-state/assessment-state.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.tabs-wrapper .tabs-container {\n  grid-column: 1 / -1;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 1fr;\n      grid-template-columns: auto 1fr;\n  grid-gap: 20px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #666666;\n  font-size: 15px;\n  margin-bottom: 15px; }\n.tabs-wrapper .tabs-container:after {\n    display: block;\n    content: '';\n    height: 5px;\n    border-radius: 1px;\n    background: rgba(234, 224, 222, 0.2); }\n.assessment-state-container {\n  grid-gap: 15px;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 6fr 4fr;\n      grid-template-columns: 6fr 4fr;\n  margin-left: 25px;\n  grid-auto-rows: 500px; }\n.assessment-state-container /deep/ .update-button {\n    height: 20px;\n    margin-bottom: 27px;\n    color: #6BCDFD;\n    background-color: #fff;\n    border: 2px solid #6BCDFD;\n    width: 50px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.assessment-state-container /deep/ .update-button:hover {\n      color: #6BCDFD;\n      background-color: #e6e5e5;\n      border-color: #2fb9fc; }\n.assessment-state-container /deep/ .update-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD;\n      width: 50px;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.assessment-state-container /deep/ .update-button:hover:hover {\n        color: #fff;\n        background-color: #39bcfc;\n        border-color: #2fb9fc; }\n.assessment-state-container /deep/ .update-button .dx-button-content {\n      line-height: 13px;\n      padding: 0; }\n.assessment-state-container .focus-area /deep/ .update-button {\n    margin-bottom: 17px; }\n.assessment-state-container .chart-container, .assessment-state-container .statistics-container {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    background-color: #fff;\n    margin-bottom: 15px; }\n.assessment-state-container .anchor-block {\n    position: absolute;\n    top: -70px; }\n.assessment-state-container .statistics-container {\n    display: -ms-grid;\n    display: grid;\n    justify-items: center;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs {\n      max-width: 230px;\n      height: 30px; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-tab-text {\n        line-height: 10px; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-item {\n        background-color: #fff; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-item .dx-tab-content {\n          background-color: #fff; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-item.dx-state-hover {\n          background-color: #6BCDFD; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-item.dx-state-hover .dx-tab-content {\n            color: #fff;\n            background-color: #6BCDFD; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-tab-selected {\n        background-color: #6BCDFD; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-tab-selected .dx-tab-content {\n          color: #fff;\n          background-color: #6BCDFD; }\n.assessment-state-container .statistics-container /deep/ .dx-tabs .dx-tab-selected:after {\n          border-left: none;\n          border-right: none; }\n.assessment-state-container .container-header {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-size: 15px;\n    height: 50px;\n    padding: 15px;\n    background-color: #C7EBFB;\n    color: #fff;\n    font-weight: bold; }\n.assessment-state-container .header-label {\n    float: right;\n    margin: 0 !important;\n    font-size: 12px;\n    line-height: 20px; }\n.assessment-state-container .header-title {\n    float: left; }\n.assessment-state-container .review-container-top {\n    padding: 15px;\n    position: relative; }\n.assessment-state-container .top-navigation {\n    display: -ms-grid;\n    display: grid;\n    grid-column: 1 / -1;\n    width: 65%;\n    -ms-grid-columns: auto auto auto auto auto;\n        grid-template-columns: auto auto auto auto auto;\n    font-size: 12px;\n    font-weight: bold;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    cursor: pointer; }\n.assessment-state-container .top-navigation .nav-item {\n      padding: 10px;\n      border: 1px solid #d8d8d8;\n      border-right: none !important; }\n.assessment-state-container .top-navigation .nav-item:first-child {\n        border-top-left-radius: 20px;\n        border-bottom-left-radius: 20px;\n        border-right: none !important; }\n.assessment-state-container .top-navigation .nav-item:last-child {\n        border-top-right-radius: 20px;\n        border-bottom-right-radius: 20px;\n        border: 1px solid #d8d8d8 !important; }\n.assessment-state-container .top-navigation .nav-item:not(:last-child) {\n        border-right: 1px solid #d8d8d8; }\n.assessment-state-container .top-navigation .top-navigation-active {\n      background-color: #fff;\n      color: #6BCDFD; }\n.assessment-state-container .chart-view {\n    padding: 15px;\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 1fr 2fr;\n        grid-template-columns: 1fr 2fr;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    justify-items: center;\n    height: 100%; }\n.assessment-state-container /deep/ dx-button {\n    color: #6BCDFD;\n    background-color: #fff;\n    border: 2px solid #6BCDFD;\n    width: 130px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    margin: 0 auto;\n    font-size: 9px; }\n.assessment-state-container /deep/ dx-button:hover {\n      color: #6BCDFD;\n      background-color: #e6e5e5;\n      border-color: #2fb9fc; }\n.assessment-state-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD;\n      width: 130px;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.assessment-state-container /deep/ dx-button:hover:hover {\n        color: #fff;\n        background-color: #39bcfc;\n        border-color: #2fb9fc; }\n.assessment-state-container .review-container {\n    display: -ms-grid;\n    display: grid;\n    position: relative;\n    justify-items: center;\n    text-align: center; }\n.assessment-state-container .pie-chart-legend {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%);\n    color: #46C25F;\n    font-size: 30px; }\n.assessment-state-container .pie-chart-legend-empty {\n    color: #3182B9; }\n.assessment-state-container .pie-chart-label {\n    width: 100px;\n    height: 20px;\n    background-color: silver;\n    border-radius: 3px;\n    text-align: center;\n    color: #fff;\n    font-size: 12px;\n    line-height: 20px;\n    margin: 0 auto;\n    margin-top: 15px;\n    margin-bottom: 15px; }\n.assessment-state-container .pie-chart-grade {\n    font-size: 11px;\n    margin-bottom: 15px; }\n@media all and (max-width: 768px) {\n  .assessment-state-container {\n    -ms-grid-columns: none;\n        grid-template-columns: none;\n    margin-left: 0px; } }\n/deep/ dx-tabs {\n  border-radius: 50px;\n  margin-bottom: 15px; }\n/deep/ dx-tabs .dx-tab {\n    color: #CBCBCB;\n    font-weight: bold;\n    font-size: 11px;\n    width: 100px; }\n/deep/ dx-tabs .dx-tab.dx-tab-selected {\n    background-color: #fff;\n    color: #6BCDFD; }\n/deep/ dx-tabs .dx-badge {\n    background-color: silver; }\n/deep/ dx-tabs .dx-tabs-item-badge {\n    vertical-align: inherit;\n    margin-left: 5px; }\n/deep/ dx-tabs .dx-tab-selected .dx-badge {\n    background-color: #FD001A; }\n/deep/ dx-tabs .dx-tab:first-child {\n    border-top-left-radius: 50px;\n    border-bottom-left-radius: 50px; }\n/deep/ dx-tabs .dx-tab:last-child {\n    border-top-right-radius: 50px;\n    border-bottom-right-radius: 50px; }\n/deep/ dx-tabs .dx-tab:first-child {\n    border-top-left-radius: 50px;\n    border-bottom-left-radius: 50px; }\n/deep/ dx-tabs .dx-tab:last-child {\n    border-top-right-radius: 50px;\n    border-bottom-right-radius: 50px; }\n.chart-content {\n  text-align: center; }\n.chart-content /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 80px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    margin: 0 auto;\n    margin-right: 15px;\n    font-size: 9px; }\n.chart-content /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.chart-content /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD;\n      width: 80px;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.chart-content /deep/ dx-button:hover:hover {\n        color: #fff;\n        background-color: #39bcfc;\n        border-color: #2fb9fc; }\n@media screen and (min-width: 768px) {\n  .dashboard-container {\n    -ms-grid-columns: 2fr 1fr;\n        grid-template-columns: 2fr 1fr; } }\n.tabs-switcher {\n  margin: 0 auto; }\n/deep/ .dxc-legend {\n  font-size: 18px; }\n.detail-chart-container {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 100px;\n      grid-template-columns: auto 100px; }\n.detail-chart-container /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 80px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    margin: 0 auto;\n    margin-right: 15px;\n    font-size: 9px;\n    height: 30px;\n    display: block; }\n.detail-chart-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.detail-chart-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD;\n      width: 80px;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.detail-chart-container /deep/ dx-button:hover:hover {\n        color: #fff;\n        background-color: #39bcfc;\n        border-color: #2fb9fc; }\n.button-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin-top: 15px; }\n.dimensions-button-container {\n  width: 345px;\n  margin-top: 5px; }\n.dimensions-button-container dx-button {\n    width: 150px; }\n.top-navigation {\n  display: -ms-grid;\n  display: grid;\n  grid-column: 1 / -1;\n  width: 65%;\n  -ms-grid-columns: auto auto auto auto auto;\n      grid-template-columns: auto auto auto auto auto;\n  font-size: 12px;\n  font-weight: bold;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer;\n  margin-bottom: 30px;\n  margin-left: 20px; }\n.top-navigation .nav-item {\n    padding: 10px;\n    border: 1px solid #d8d8d8;\n    border-right: none !important; }\n.top-navigation .nav-item:first-child {\n      border-top-left-radius: 20px;\n      border-bottom-left-radius: 20px;\n      border-right: none !important; }\n.top-navigation .nav-item:last-child {\n      border-top-right-radius: 20px;\n      border-bottom-right-radius: 20px;\n      border: 1px solid #d8d8d8 !important; }\n.top-navigation .nav-item:not(:last-child) {\n      border-right: 1px solid #d8d8d8; }\n.top-navigation .top-navigation-active {\n    background-color: #fff;\n    color: #6BCDFD; }\n"

/***/ }),

/***/ "./client/app/home/assessment/assessment-state/assessment-state.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentStateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_models_spaDataSet_model__ = __webpack_require__("./client/app/shared/models/spaDataSet.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assessment_capture_light_assessment_capture_light_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assessment_capture_full_assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_reporting_service__ = __webpack_require__("./client/app/shared/services/reporting.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AssessmentStateComponent = (function () {
    function AssessmentStateComponent(userService, unitService, router, assessmentStateService, assessmentCaptureLightService, homeService, reportingService, assessmentCaptureFullService) {
        this.userService = userService;
        this.unitService = unitService;
        this.router = router;
        this.assessmentStateService = assessmentStateService;
        this.assessmentCaptureLightService = assessmentCaptureLightService;
        this.homeService = homeService;
        this.reportingService = reportingService;
        this.assessmentCaptureFullService = assessmentCaptureFullService;
        this.spaDataSetByDimentionsBarChartLite = [];
        this.spaDataSetByDimentionsBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = [];
        this.dataForFilter = [{ id: 1, text: 'By Focus Area' }, { id: 2, text: 'By Principle' }];
        this.spaDataSetLitePieChart = [];
        this.spaDataSetFullPieChart = [];
        this.loadingVisible1 = true;
        this.loadingVisible2 = true;
        this.loadingVisible3 = true;
        this.loadingVisible4 = true;
        this.loadingVisible5 = true;
        this.loadingVisible6 = true;
        this.isFocusAriaActive = true;
        this.SpaDataSetState = __WEBPACK_IMPORTED_MODULE_3__shared_models_spaDataSet_model__["a" /* SpaDataSetState */];
    }
    AssessmentStateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.homeService.getDataFromUnitSelector()
            .subscribe(function (item) {
            console.log('SELECTORUNIT', item);
            _this.spaDataSetByDimentionsBarChartLite = [];
            _this.spaDataSetByDimentionsBarChartFull = [];
            _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = [];
            _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = [];
            _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = [];
            _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = [];
            _this.spaDataSetLitePieChart = [];
            _this.spaDataSetFullPieChart = [];
            _this.spaDatasetLite = new __WEBPACK_IMPORTED_MODULE_3__shared_models_spaDataSet_model__["b" /* SpaDatasetForChart */]();
            _this.spaDatasetFull = new __WEBPACK_IMPORTED_MODULE_3__shared_models_spaDataSet_model__["b" /* SpaDatasetForChart */]();
            _this.loadingVisible1 = true;
            _this.loadingVisible2 = true;
            _this.loadingVisible3 = true;
            _this.loadingVisible4 = true;
            _this.loadingVisible5 = true;
            _this.loadingVisible6 = true;
            _this.loadData();
        });
        this.loadData();
    };
    AssessmentStateComponent.prototype.loadData = function () {
        var _this = this;
        this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
            .subscribe(function (unit) {
            _this.currentUnit = unit;
            console.log("this.currentUnit", _this.currentUnit);
            console.log('unit', _this.currentUnit.AssessmentType);
            if (_this.currentUnit.AssessmentType === (null || -1)) {
                _this.router.navigate(['assessment-current-status-init']);
            }
            _this.assessmentStateService.getSpaDataSetByAssessmentType(1)
                .subscribe(function (spaDataSet) {
                _this.spaDatasetLite = spaDataSet;
                console.log('this.spaDatasetLite', _this.spaDatasetLite);
                _this.spaDataSetLitePieChart.push({
                    state: 'Answered',
                    value: spaDataSet.AnsweredPercentage
                });
                _this.spaDataSetLitePieChart.push({
                    state: 'Not answered',
                    value: 100 - spaDataSet.AnsweredPercentage
                });
                console.log('this.spaDataSetLitePieChart', _this.spaDataSetLitePieChart);
                _this.loadingVisible1 = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            _this.assessmentStateService.getSpaDataSetByAssessmentType(0)
                .subscribe(function (spaDataSet) {
                _this.spaDatasetFull = spaDataSet;
                console.log('this.spaDatasetFull', _this.spaDatasetFull);
                _this.spaDataSetFullPieChart.push({
                    state: 'Answered',
                    value: spaDataSet.AnsweredPercentage
                });
                _this.spaDataSetFullPieChart.push({
                    state: 'Not answered',
                    value: 100 - spaDataSet.AnsweredPercentage
                });
                console.log('this.spaDataSetFullPieChart', _this.spaDataSetFullPieChart);
                _this.loadingVisible4 = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            _this.assessmentCaptureLightService.getDimentionsByStandardIdFromUnit()
                .subscribe(function (getDimensionsList) {
                console.log('getDimensionsListLite', getDimensionsList);
                _this.spaDataSetByDimentionsBarChartLite = getDimensionsList;
                _this.loadingVisible2 = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            _this.assessmentCaptureFullService.getFullListDimentionsOrPrinciplesFromCurrentUnit('Dimensions')
                .subscribe(function (getDimensionsList) {
                console.log('getDimensionsListFull', getDimensionsList);
                _this.spaDataSetByDimentionsBarChartFull = getDimensionsList;
                _this.loadingVisible5 = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            _this.reportingService.getAllPrincipleGroups()
                .subscribe(function (getLiteListByPrincipleGroups) {
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = getLiteListByPrincipleGroups;
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = Object.assign([], getLiteListByPrincipleGroups);
                console.log('getLiteListByPrincipleGroups', getLiteListByPrincipleGroups);
                console.log(' this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons', _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons);
                _this.loadingVisible3 = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            _this.assessmentCaptureFullService.getAllPrincipleGroupsFull()
                .subscribe(function (getFullListByPrincipleGroups) {
                console.log('getFullListByPrincipleGroups', getFullListByPrincipleGroups);
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = getFullListByPrincipleGroups;
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = Object.assign([], getFullListByPrincipleGroups);
                console.log('this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons', _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons);
                _this.loadingVisible6 = false;
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    AssessmentStateComponent.prototype.dimentionsBar = function (event) {
        console.log(event, 'EVENT');
    };
    AssessmentStateComponent.prototype.selectLiteAssessmentDetailedProgress = function (event) {
        var _this = this;
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = [];
        this.loadingVisible3 = true;
        if (event.itemIndex === 0) {
            this.isFocusAriaActive = true;
            this.assessmentStateService.getLiteListByPrincipleGroupsByStandardIdFromUnit()
                .subscribe(function (getLiteListByPrincipleGroups) {
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = getLiteListByPrincipleGroups;
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = Object.assign([], getLiteListByPrincipleGroups);
                console.log('getLiteListByPrincipleGroups', getLiteListByPrincipleGroups);
                _this.loadingVisible3 = false;
            });
        }
        if (event.itemIndex === 1) {
            this.isFocusAriaActive = false;
            this.assessmentCaptureLightService.getPrinciplesByStandardIdFromUnit()
                .subscribe(function (getPrincipleList) {
                console.log('getPrincipleList', getPrincipleList);
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = getPrincipleList;
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = Object.assign([], getPrincipleList);
                _this.loadingVisible3 = false;
            });
        }
        console.log('event', event);
    };
    AssessmentStateComponent.prototype.selectFullAssessmentDetailedProgress = function (event) {
        var _this = this;
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = [];
        this.loadingVisible6 = true;
        if (event.itemIndex === 0) {
            this.isFocusAriaActive = true;
            this.assessmentStateService.getFullListByPrincipleGroupsByStandardIdFromUnit()
                .subscribe(function (getFullListByPrincipleGroups) {
                console.log('getFullListByPrincipleGroups', getFullListByPrincipleGroups);
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = getFullListByPrincipleGroups;
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = Object.assign([], getFullListByPrincipleGroups);
                _this.loadingVisible6 = false;
            });
        }
        if (event.itemIndex === 1) {
            this.isFocusAriaActive = false;
            this.assessmentCaptureFullService.getFullListDimentionsOrPrinciplesFromCurrentUnit('Principles')
                .subscribe(function (getPrincipleList) {
                console.log('getPrincipleFullList', getPrincipleList);
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = getPrincipleList;
                _this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = Object.assign([], getPrincipleList);
                _this.loadingVisible6 = false;
            });
        }
    };
    AssessmentStateComponent.prototype.updateGrade = function (assessmentType, type) {
        var _this = this;
        console.log('assessmentType', assessmentType);
        this.assessmentStateService.updateGradeByAssessmentType(assessmentType)
            .subscribe(function (response) {
            console.log('updateGradeByAssessmentType', response);
            if (type === 'Lite') {
                _this.spaDatasetLite.Grade = 'Under Review';
                console.log('this.spaDatasetLite', _this.spaDatasetLite);
            }
            if (type === 'Full') {
                _this.spaDatasetFull.Grade = 'Under Review';
                console.log('this.spaDatasetFull', _this.spaDatasetFull);
            }
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    AssessmentStateComponent.prototype.customizeTextLegendDimensionsLite = function (legendInfo) {
        console.log('legendInfo', legendInfo);
        /*
            if(legendInfo.seriesName) {
              return `${this.spaDataSetByDimentionsBarChartLite[legendInfo.seriesIndex].AnsweredPercentage}%  ${legendInfo.seriesName}`
            }
            else {*/
        return legendInfo.seriesName;
    };
    AssessmentStateComponent.prototype.customizeTextLegendDimensionsFull = function (legendInfo) {
        console.log('legendInfo', legendInfo);
        if (legendInfo.seriesName) {
            return this.spaDataSetByDimentionsBarChartFull[legendInfo.seriesIndex].AnsweredPercentage + "%  " + legendInfo.seriesName;
        }
        else {
            return '0%';
        }
    };
    AssessmentStateComponent.prototype.customizeToolTip = function (arg) {
        console.log(arg);
        return {
            text: arg.valueText + "%"
        };
    };
    AssessmentStateComponent.prototype.customizeTextLabel = function (info) {
        return '';
    };
    AssessmentStateComponent.prototype.customizeValueLabel = function (info) {
        return info.value + "%";
    };
    AssessmentStateComponent.prototype.redirect = function (event) {
        console.log('event', 'hi');
    };
    AssessmentStateComponent.prototype.onLegendClick = function (event) {
        var series = event.target;
        console.log('onLegendClick($event)', series.getVisiblePoints());
    };
    AssessmentStateComponent.prototype.scrollToItem = function (e) {
        //this.router.navigate( ['/somepath' ], {fragment: 'test'});
    };
    AssessmentStateComponent.prototype.redirectToCurrentPrincipleOrPrincipleGroup = function (item, label, type) {
        console.log('ITEM', item);
        console.log('Type', type);
        if (label === 'light') {
            this.assessmentStateService.setDimensionOid(item.OID, type);
        }
        if (label === 'full') {
            this.homeService.preselectDataToFilter(type);
        }
        this.router.navigate(["assessment-capture-" + label]);
    };
    AssessmentStateComponent.prototype.ngOnDestroy = function () {
    };
    AssessmentStateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-assessment-state',
            template: __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.component.html"),
            styles: [__webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__assessment_state_service__["a" /* AssessmentStateService */],
            __WEBPACK_IMPORTED_MODULE_4__assessment_capture_light_assessment_capture_light_service__["a" /* AssessmentCaptureLightService */],
            __WEBPACK_IMPORTED_MODULE_8__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_9__shared_services_reporting_service__["a" /* ReportingService */],
            __WEBPACK_IMPORTED_MODULE_5__assessment_capture_full_assessment_capture_full_service__["a" /* AssessmentCaptureFullService */]])
    ], AssessmentStateComponent);
    return AssessmentStateComponent;
}());



/***/ }),

/***/ "./client/app/home/assessment/assessment-state/assessment-state.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AssessmentStateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AssessmentStateService = (function () {
    function AssessmentStateService(httpClient, userService, unitService) {
        this.httpClient = httpClient;
        this.userService = userService;
        this.unitService = unitService;
        this.selectorPrinsipleDimension = {};
    }
    AssessmentStateService.prototype.getSpaDataSetByAssessmentType = function (assessmentType) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/SPADataSets/GetByAssessmentType(" + assessmentType + ")");
    };
    AssessmentStateService.prototype.getPrinciplesListByAssessmentType = function (assessmentType) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/SPADataSets/GetPrinciplesListByAssessmentType(" + assessmentType + ")");
    };
    AssessmentStateService.prototype.getDimensionsListByAssessmentType = function (assessmentType) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/SPADataSets/GetDimensionsListByAssessmentType(" + assessmentType + ")");
    };
    AssessmentStateService.prototype.updateGradeByAssessmentType = function (assessmentType, body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/SPADataSets/UpdateGradeByAssessmentType(" + assessmentType + ")", body, { observe: 'response' });
    };
    AssessmentStateService.prototype.getFullListByPrincipleGroups = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/PrincipleGroups/GetFullList");
    };
    AssessmentStateService.prototype.getLiteListByPrincipleGroups = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/PrincipleGroups/GetLiteList");
    };
    AssessmentStateService.prototype.getLiteListByPrincipleGroupsByStandardIdFromUnit = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId)
                    .switchMap(function (unit) {
                    return _this.getLiteListByPrincipleGroups();
                });
            }
        });
    };
    AssessmentStateService.prototype.getFullListByPrincipleGroupsByStandardIdFromUnit = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId)
                    .switchMap(function (unit) {
                    return _this.getFullListByPrincipleGroups();
                });
            }
        });
    };
    AssessmentStateService.prototype.setDimensionOid = function (oid, type) {
        this.selectorPrinsipleDimension = {
            oid: oid,
            type: type
        };
    };
    AssessmentStateService.prototype.getDimentionOid = function () {
        return this.selectorPrinsipleDimension;
    };
    AssessmentStateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__["a" /* UnitService */]])
    ], AssessmentStateService);
    return AssessmentStateService;
}());



/***/ }),

/***/ "./client/app/home/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n  <div class=\"top-navigation-wrapper\" [ngClass]=\"{'fixed' : isNavFixed}\">\r\n  <div class=\"top-navigation\">\r\n    <div class=\"nav-item\" #navigation [ngClass]=\"{'top-navigation-active' : isActive===1}\" (click)=\"isActive=1\" pageScroll href=\"#myActions\">\r\n      MY ACTIONS\r\n    </div>\r\n    <div class=\"nav-item\" [ngClass]=\"{'top-navigation-active' : isActive===2}\" (click)=\"isActive=2\" pageScroll href=\"#strategicAssessment\">\r\n      STRATEGIC ASSESSMENTS\r\n    </div>\r\n    <div class=\"nav-item\" [ngClass]=\"{'top-navigation-active' : isActive===3}\" (click)=\"isActive=3\" pageScroll href=\"#performanceIndicators\">\r\n      PERFORMANCE INDICATORS\r\n    </div>\r\n    <div class=\"nav-item\" [ngClass]=\"{'top-navigation-active' : isActive===4}\" (click)=\"isActive=4\" pageScroll href=\"#standards\">\r\n      STANDARDS\r\n    </div>\r\n    <div class=\"nav-item\" [ngClass]=\"{'top-navigation-active' : isActive===5}\" (click)=\"isActive=5\" pageScroll href=\"#systemHealth\">\r\n      SYSTEM HEALTH\r\n    </div>\r\n  </div>\r\n</div>\r\n  <div class=\"dashboard-container\">\r\n    <div class=\"anckor\" id=\"myActions\"></div>\r\n  <div class=\"action-items-wrapper\" >\r\n    <div class=\"action-item-block\">\r\n      <span class=\"action-item-block-title\">due now</span>\r\n      <div class=\"action-inner-block due-now\">\r\n        <span class=\"action-quantity\">4</span>\r\n        <span>items</span>\r\n      </div>\r\n      <dx-button text=\"UPDATE\" class=\"update-btn\">\r\n      </dx-button>\r\n    </div>\r\n    <div class=\"action-item-block\">\r\n      <span class=\"action-item-block-title\">open</span>\r\n      <div class=\"action-inner-block open\">\r\n        <span class=\"action-quantity\">10</span>\r\n        <span>items</span>\r\n      </div>\r\n      <dx-button text=\"UPDATE\" class=\"update-btn\">\r\n      </dx-button>\r\n    </div>\r\n    <div class=\"action-item-block\">\r\n      <span class=\"action-item-block-title\">overdue</span>\r\n      <div class=\"action-inner-block overdue\">\r\n        <span class=\"action-quantity\">3</span>\r\n        <span>items</span>\r\n      </div>\r\n      <dx-button text=\"UPDATE\" class=\"update-btn\">\r\n      </dx-button>\r\n    </div>\r\n  </div>\r\n  <div class=\"active-categories-container\">\r\n    <div class=\"container-header\">active categories <span class=\"question-tooltip\">?</span></div>\r\n    <div class=\"active-categories-view\">\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">1.</span>\r\n        <span class=\"active-category-name\">Strategic Commitment and policy</span>\r\n        <span class=\"active-category-answer-number unnanswered\">2</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">2.</span>\r\n        <span class=\"active-category-name\">Strategic review and risk assessment</span>\r\n        <span class=\"active-category-answer-number\">0</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">3.</span>\r\n        <span class=\"active-category-name\">Operational plans</span>\r\n        <span class=\"active-category-answer-number unnanswered\">2</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">4.</span>\r\n        <span class=\"active-category-name\">Record keeping</span>\r\n        <span class=\"active-category-answer-number\">0</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">5.</span>\r\n        <span class=\"active-category-name\">Performance monitoring</span>\r\n        <span class=\"active-category-answer-number\">0</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">6.</span>\r\n        <span class=\"active-category-name\">Good management practices</span>\r\n        <span class=\"active-category-answer-number\">0</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"active-categories-list-item\">\r\n        <span class=\"list-number\">7.</span>\r\n        <span class=\"active-category-name\">Corrective actions</span>\r\n        <span class=\"active-category-answer-number unnanswered\">2</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"chart-container\">\r\n    <div class=\"container-header\" >TREND</div>\r\n\r\n    <div class=\"chart-view\">\r\n      <dx-chart\r\n        [palette]=\"['#D49290', '#7FD03E']\"\r\n        [dataSource]=\"countriesInfo\">\r\n        <dxi-series\r\n          *ngFor=\"let energy of energySources\"\r\n          [valueField]=\"energy.value\"\r\n          [name]=\"energy.name\">\r\n        </dxi-series>\r\n        <dxo-common-series-settings #seriesSettings\r\n                                    argumentField=\"country\"\r\n                                    [type]=\"types[0]\">\r\n        </dxo-common-series-settings>\r\n        <dxo-margin [bottom]=\"20\"></dxo-margin>\r\n        <dxo-argument-axis\r\n          [valueMarginsEnabled]=\"false\"\r\n          discreteAxisDivisionMode=\"crossLabels\">\r\n          <dxo-grid [visible]=\"false\"></dxo-grid>\r\n        </dxo-argument-axis>\r\n        <dxo-legend\r\n          verticalAlignment=\"bottom\"\r\n          horizontalAlignment=\"center\"\r\n          itemTextPosition=\"top\">\r\n        </dxo-legend>\r\n      <!--  <dxo-title\r\n          text=\"Energy Consumption in 2004\">\r\n          <dxo-subtitle text=\"(Millions of Tons, Oil Equivalent)\">\r\n          </dxo-subtitle>\r\n        </dxo-title>-->\r\n        <dxo-export [enabled]=\"false\"></dxo-export>\r\n        <dxo-tooltip\r\n          [enabled]=\"true\"\r\n          [customizeTooltip]=\"customizeTooltip\">\r\n        </dxo-tooltip>\r\n      </dx-chart>\r\n     <!-- <div class=\"options\">\r\n        <div class=\"caption\">Options</div>\r\n        <div class=\"option\">\r\n          <span>Series Type</span>\r\n          <dx-select-box\r\n            [dataSource]=\"types\"\r\n            [(value)]=\"seriesSettings.type\">\r\n          </dx-select-box>\r\n        </div>\r\n      </div>-->\r\n    </div>\r\n   </div>\r\n  <div class=\"statistics-container\">\r\n    <div class=\"container-header\">\r\n      MY COMPLETION RATING\r\n    </div>\r\n    <i class=\"fas fa-chart-area\"></i>\r\n    <div class=\"statistics-container-content\">\r\n      <div class=\"rating-circle\">20%</div>\r\n      <i class=\"material-icons\">arrow_downward</i>\r\n      <span>5%</span>\r\n      <!--  <img src=\"../../../assets/chart-areaspline.png\">-->\r\n    </div>\r\n   </div>\r\n\r\n  <div class=\"statistics-container\" >\r\n    <div class=\"anckor3\" id=\"strategicAssessment\"></div>\r\n    <div class=\"container-header\">\r\n      OVERALL PROGRESS\r\n      <span class=\"update-info\">Last Update: 20 September</span>\r\n    </div>\r\n    <div class=\"statistics-view\">\r\n      <div class=\"statistics-inner-wrapper in-progress\">\r\n       <!-- <dx-load-panel\r\n          shadingColor=\"rgba(0,0,0,0)\"\r\n          [position]=\"{ of: '#lite-pie-chart' }\"\r\n          [visible]=\"!spaDataSetLitePieChart.length\"\r\n          [showIndicator]=\"true\"\r\n          [showPane]=\"false\"\r\n          [shading]=\"false\"\r\n          [message]=\"\"\r\n          [closeOnOutsideClick]=\"false\">\r\n        </dx-load-panel>\r\n        <dx-load-panel\r\n          shadingColor=\"rgba(0,0,0,0)\"\r\n          [position]=\"{ of: '#full-pie-chart' }\"\r\n          [visible]=\"!spaDataSetFullPieChart.length\"\r\n          [showIndicator]=\"true\"\r\n          [showPane]=\"false\"\r\n          [shading]=\"false\"\r\n          [message]=\"\"\r\n          [closeOnOutsideClick]=\"false\">\r\n        </dx-load-panel>-->\r\n          <div class=\"review-container\" id=\"lite-pie-chart\">\r\n            <div class=\"review-container-top\">\r\n              <div class=\"pie-chart-legend\" [ngClass]=\"{'pie-chart-legend-empty' : spaDatasetLite.AnsweredPercentage === 0 }\" *ngIf=\"spaDatasetLite\">{{spaDatasetLite.AnsweredPercentage}}%</div>\r\n              <dx-pie-chart style=\"height: 150px; width: 150px;\"\r\n                            type=\"doughnut\"\r\n                            [innerRadius]=\"1\"\r\n                            title=\"\"\r\n                            [palette]=\"[ '#46C25F', '#F7F7F7']\"\r\n                            [legend]=\"{ visible: false }\"\r\n                            [dataSource]=\"spaDataSetLitePieChart\">\r\n                <dxi-series\r\n                  argumentField=\"state\"\r\n                  valueField=\"value\">\r\n                  <dxo-label\r\n                    [visible]=\"false\">\r\n                    <dxo-connector [visible]=\"true\"></dxo-connector>\r\n                  </dxo-label>\r\n                </dxi-series>\r\n                <dxo-export [enabled]=\"false\"></dxo-export>\r\n              </dx-pie-chart>\r\n            </div>\r\n\r\n          </div>\r\n\r\n        <span class=\"statistic-graph-title\">LIGHT ASSESSMENT</span>\r\n        <dx-button text=\"UPDATE\" class=\"update-btn\"></dx-button>\r\n      </div>\r\n      <div class=\"statistics-inner-wrapper\">\r\n\r\n          <div class=\"review-container\" id=\"full-pie-chart\">\r\n            <div class=\"review-container-top\">\r\n              <div class=\"pie-chart-legend\" [ngClass]=\"{'pie-chart-legend-empty' : spaDatasetFull.AnsweredPercentage === 0 }\" *ngIf=\"spaDatasetFull\">{{spaDatasetFull.AnsweredPercentage}}%</div>\r\n              <dx-pie-chart style=\"height: 150px; width: 150px;\"\r\n                            type=\"doughnut\"\r\n                            [innerRadius]=\"1\"\r\n                            title=\"\"\r\n                            [palette]=\"[ '#46C25F', '#F7F7F7']\"\r\n                            [legend]=\"{ visible: false }\"\r\n                            [dataSource]=\"spaDataSetFullPieChart\">\r\n                <dxi-series\r\n                  argumentField=\"state\"\r\n                  valueField=\"value\">\r\n                  <dxo-label\r\n                    [visible]=\"false\"\r\n                  >\r\n                    <dxo-connector [visible]=\"true\"></dxo-connector>\r\n                  </dxo-label>\r\n                </dxi-series>\r\n                <dxo-export [enabled]=\"false\"></dxo-export>\r\n              </dx-pie-chart>\r\n            </div>\r\n          </div>\r\n        <span class=\"statistic-graph-title\">FULL ASSESSMENT</span>\r\n        <dx-button text=\"START\" class=\"update-btn\"></dx-button>\r\n      </div>\r\n      <div class=\"top-items-wrapper\">\r\n        <span class=\"top-item-title\">TOP 3 STRENGTHS</span>\r\n        <ul>\r\n          <li>\r\n            <span class=\"top-item-number\">1.</span>\r\n            <span class=\"top-item-name\">Lorem Ipsum is simply dummy</span>\r\n            <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n              keyboard_arrow_right\r\n            </i>\r\n          </li>\r\n          <li>\r\n            <span class=\"top-item-number\">2.</span>\r\n            <span class=\"top-item-name\">Lorem Ipsum</span>\r\n            <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n              keyboard_arrow_right\r\n            </i>\r\n          </li>\r\n          <li>\r\n            <span class=\"top-item-number\">3.</span>\r\n            <span class=\"top-item-name\">Lorem Ipsum is simply dummy text</span>\r\n            <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n              keyboard_arrow_right\r\n            </i>\r\n          </li>\r\n        </ul>\r\n        <span class=\"top-item-title\">TOP 3 STRENGTHS</span>\r\n        <ul>\r\n          <li>\r\n            <span class=\"top-item-number\">1.</span>\r\n            <span class=\"top-item-name\">Lorem Ipsum is simply dummy</span>\r\n            <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n              keyboard_arrow_right\r\n            </i>\r\n          </li>\r\n          <li>\r\n            <span class=\"top-item-number\">2.</span>\r\n            <span class=\"top-item-name\">Lorem Ipsum</span>\r\n            <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n              keyboard_arrow_right\r\n            </i>\r\n          </li>\r\n          <li>\r\n            <span class=\"top-item-number\">3.</span>\r\n            <span class=\"top-item-name\">Lorem Ipsum is simply dummy text</span>\r\n            <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n              keyboard_arrow_right\r\n            </i>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n\r\n  </div>\r\n  </div>\r\n   <div class=\"validation-container\">\r\n    <div class=\"container-header\">\r\n      VALIDATION STATUS\r\n      <span class=\"update-info\">Last Update: 20 September</span>\r\n    </div>\r\n    <div class=\"validation-view\">\r\n      <div class=\"validation-title\">\r\n        BLUE NORTH RATING\r\n        <span class=\"question-tooltip\">?</span>\r\n      </div>\r\n        <div class=\"review-container\">\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n          <i class=\"material-icons review-mark\">\r\n          star\r\n          <span>3</span>\r\n          </i>\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n        </div>\r\n        <div class=\"validation-descr\">\r\n          <span><b>Description:</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</span>\r\n        </div>\r\n        <dx-button text=\"SUBMIT FOR REVIEW\" class=\"sbmt-review-btn\"></dx-button>\r\n    </div>\r\n  </div>\r\n  <div class=\"chart-container\"  id=\"performanceIndicators\">\r\n    <div class=\"container-header\">\r\n      DATA COLLECTION PROGRESS <span class=\"question-tooltip\">?</span></div>\r\n\r\n  <div class=\"chart-view\">\r\n    <div class=\"top-navigation\">\r\n      <div class=\"nav-item top-navigation-active\">\r\n        OVERALL\r\n      </div>\r\n      <div class=\"nav-item\">\r\n        FINANCIAL\r\n      </div>\r\n      <div class=\"nav-item\" >\r\n        INPUTS\r\n      </div>\r\n      <div class=\"nav-item\">\r\n        HR\r\n      </div>\r\n      <div class=\"nav-item\">\r\n        LAND USE\r\n      </div>\r\n    </div>\r\n    <div class=\"chart-view-inner\">\r\n      <dx-chart class=\"data-collection-chart\"\r\n        [palette]=\"['#558FCC', '#B7CCE1', '#6CCDFA', '#77DDF9']\"\r\n        [rotated]=\"true\"\r\n        id=\"chart\"\r\n        [dataSource]=\"sales\"\r\n        [equalBarWidth]=\"false\"\r\n        [valueAxis]=\"{max: 100, min: 0 , label:{customizeText: customizeValueLabel}}\"\r\n        [backgroundColor]=\"'#DAECF7'\"\r\n       >\r\n        <dxo-common-series-settings\r\n          argumentField=\"year\"\r\n          type=\"bar\"\r\n          valueField=\"sales\">\r\n        </dxo-common-series-settings>\r\n        <dxo-series-template nameField=\"year\"></dxo-series-template>\r\n        <dxo-legend [visible]=\"false\"></dxo-legend>\r\n      </dx-chart>\r\n      <div class=\"top-items-wrapper\">\r\n          <span class=\"top-item-title\">TOP 3 STRENGTHS</span>\r\n          <ul>\r\n            <li>\r\n              <span class=\"top-item-number\">1.</span>\r\n              <span class=\"top-item-name\">Lorem Ipsum is simply dummy</span>\r\n              <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n                keyboard_arrow_right\r\n              </i>\r\n            </li>\r\n            <li>\r\n              <span class=\"top-item-number\">2.</span>\r\n              <span class=\"top-item-name\">Lorem Ipsum</span>\r\n              <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n                keyboard_arrow_right\r\n              </i>\r\n            </li>\r\n            <li>\r\n              <span class=\"top-item-number\">3.</span>\r\n              <span class=\"top-item-name\">Lorem Ipsum is simply dummy text</span>\r\n              <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n                keyboard_arrow_right\r\n              </i>\r\n            </li>\r\n          </ul>\r\n          <span class=\"top-item-title\">TOP 3 STRENGTHS</span>\r\n          <ul>\r\n            <li>\r\n              <span class=\"top-item-number\">1.</span>\r\n              <span class=\"top-item-name\">Lorem Ipsum is simply dummy</span>\r\n              <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n                keyboard_arrow_right\r\n              </i>\r\n            </li>\r\n            <li>\r\n              <span class=\"top-item-number\">2.</span>\r\n              <span class=\"top-item-name\">Lorem Ipsum</span>\r\n              <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n                keyboard_arrow_right\r\n              </i>\r\n            </li>\r\n            <li>\r\n              <span class=\"top-item-number\">3.</span>\r\n              <span class=\"top-item-name\">Lorem Ipsum is simply dummy text</span>\r\n              <i _ngcontent-c2=\"\" class=\"material-icons\">\r\n                keyboard_arrow_right\r\n              </i>\r\n            </li>\r\n          </ul>\r\n          <dx-button text=\"UPDATE\" class=\"update-btn\"></dx-button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n  <div class=\"validation-container\" id=\"performanceIndicatorsReview\">\r\n    <div class=\"container-header\">\r\n      VALIDATION STATUS\r\n      <span class=\"update-info\">Last Update: 20 September</span>\r\n    </div>\r\n    <div class=\"validation-view\">\r\n      <div class=\"validation-title\">\r\n        BLUE NORTH RATING\r\n        <span class=\"question-tooltip\">?</span>\r\n      </div>\r\n        <div class=\"review-container\">\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n          <i class=\"material-icons review-mark\">\r\n          star\r\n          <span>4</span>\r\n          </i>\r\n          <i class=\"material-icons\">\r\n          star_border\r\n          </i>\r\n        </div>\r\n        <div class=\"validation-descr\">\r\n          <span><b>Description:</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</span>\r\n        </div>\r\n        <dx-button text=\"IS UP TO DATE\" class=\"sbmt-review-btn disable\"></dx-button>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"standards-overview\">\r\n  <div class=\"anckor4\" id=\"standards\"></div>\r\n  <div class=\"container-header\">\r\n    STANDARDS OVERVIEW\r\n  </div>\r\n  <div class=\"standards-overview-view\">\r\n    <div class=\"standards-overview-item\">\r\n      <span class=\"standards-overview-item-quantity\">2</span>\r\n      <div class=\"img-wrapper\"><img src=\"../../assets/standard-logo.png\" alt=\"\"></div>\r\n      <dx-button text=\"VIEW\" class=\"view-btn\"></dx-button>\r\n    </div>\r\n    <div class=\"standards-overview-item\">\r\n      <span class=\"standards-overview-item-quantity\">2</span>\r\n      <div class=\"img-wrapper\"><img src=\"../../assets/standard-logo-3.png\" alt=\"\"></div>\r\n      <dx-button text=\"VIEW\" class=\"view-btn\"></dx-button>\r\n    </div>\r\n    <div class=\"standards-overview-item\">\r\n      <span class=\"standards-overview-item-quantity\">2</span>\r\n      <div class=\"img-wrapper\"><img src=\"../../assets/standard-logo-2.png\" alt=\"\"></div>\r\n      <dx-button text=\"VIEW\" class=\"view-btn\"></dx-button>\r\n    </div>\r\n    <div class=\"standards-overview-item\">\r\n      <span class=\"standards-overview-item-quantity\">2</span>\r\n      <div class=\"img-wrapper\"><img src=\"\" alt=\"\"></div>\r\n      <dx-button text=\"VIEW\" class=\"view-btn\"></dx-button>\r\n    </div>\r\n    <div class=\"standards-overview-item\">\r\n      <span class=\"standards-overview-item-quantity\">2</span>\r\n      <div class=\"img-wrapper\"><img src=\"\" alt=\"\"></div>\r\n      <dx-button text=\"VIEW\" class=\"view-btn\"></dx-button>\r\n    </div>\r\n    <div class=\"standards-overview-item\">\r\n      <span class=\"standards-overview-item-quantity\">2</span>\r\n      <div class=\"img-wrapper\"><img src=\"\" alt=\"\"></div>\r\n      <dx-button text=\"VIEW\" class=\"view-btn\"></dx-button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"statistics-container container-status\" >\r\n  <div class=\"anckor5\" id=\"systemHealth\"></div>\r\n  <div class=\"container-header\">\r\n    STATUS\r\n  </div>\r\n  <div class=\"container-status-content\">\r\n    <div class=\"corner-block block-style\">\r\n      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\r\n      standard dummy text ever since the 1500s,\r\n      <i class=\"material-icons down-1\">\r\n        call_made\r\n      </i>\r\n    </div>\r\n    <div class=\"corner-block\">\r\n    </div>\r\n\r\n    <div class=\"corner-block block-style\">\r\n      <i class=\"material-icons down-2\">\r\n        call_received\r\n      </i>\r\n      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\r\n      standard dummy text ever since the 1500s,\r\n    </div>\r\n    <i class=\"material-icons\">\r\n      arrow_downward\r\n    </i>\r\n    <div class=\"big-square-block block-style\">\r\n\r\n      <div class=\"small-square-block block-style\">\r\n        Lorem Ipsum is simply dummy text of the printing and typesetting\r\n      </div>\r\n      <div class=\"small-square-block block-style\">\r\n        Lorem Ipsum is simply dummy text of the printing and typesetting\r\n      </div>\r\n      <div class=\"small-square-block block-style\">\r\n        Lorem Ipsum is simply dummy text of the printing and typesetting\r\n      </div>\r\n      <div class=\"small-square-block block-style\">\r\n        Lorem Ipsum is simply dummy text of the printing and typesetting\r\n      </div>\r\n    </div>\r\n    <div class=\"corner-block\">\r\n      <i class=\"material-icons\">\r\n        arrow_upward\r\n      </i>\r\n    </div>\r\n    <div class=\"corner-block block-style\">\r\n      <i class=\"material-icons up-1\">\r\n        call_received\r\n      </i>\r\n      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\r\n      standard dummy text ever since the 1500s,\r\n    </div>\r\n\r\n    <div class=\"corner-block\">\r\n    </div>\r\n    <div class=\"corner-block block-style\">\r\n      <i class=\"material-icons down-3\">\r\n        call_made\r\n      </i>\r\n      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\r\n      standard dummy text ever since the 1500s,\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/dashboard/dashboard.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.container-header {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 50px;\n  padding: 15px;\n  background-color: #C7EBFB;\n  color: #fff;\n  font-weight: bold;\n  text-transform: uppercase;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n.dashboard-container {\n  grid-gap: 20px;\n  grid-row-gap: 20px;\n  display: -ms-grid;\n  display: grid;\n  position: relative; }\n.dashboard-container .chart-container, .dashboard-container .statistics-container {\n    position: relative;\n    width: 100%;\n    background-color: #fff; }\n.dashboard-container dx-pie-chart {\n    padding-top: 15px; }\n.dashboard-container .chart-view {\n    padding: 15px; }\n.dashboard-container /deep/ .dx-dropdownlist-popup-wrapper.dx-popup-wrapper .dx-overlay-content {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    border: 1px solid #ddd;\n    border-radius: 0; }\n.dashboard-container /deep/ .dx-dropdownlist-popup-wrapper .dx-list {\n    min-height: 22px; }\n.dashboard-container /deep/ .dx-popup-content, .dashboard-container /deep/.dx-scrollable-wrapper, .dashboard-container /deep/.dx-scrollview-content {\n    min-height: 22px; }\n.dashboard-container /deep/ .dx-select-box, .dashboard-container /deep/.dx-texteditor-input {\n    border-radius: 0;\n    height: 22px; }\n.dashboard-container /deep/.dx-dropdownlist-popup-wrapper .dx-popup-content, .dashboard-container /deep/ .dx-dropdownlist-popup-wrapper .dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item-content {\n    padding: 0;\n    min-height: 22px;\n    background: #fff;\n    color: #989898;\n    font-size: 12px;\n    padding-left: 5px; }\n@media screen and (min-width: 768px) {\n  .dashboard-container {\n    -ms-grid-columns: 2fr 1fr;\n        grid-template-columns: 2fr 1fr; } }\n/*/deep/ #chart {\r\n    height: 440px;\r\n  }*/\n.action-items-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n.action-item-block {\n  padding: 15px 15px 20px;\n  width: 100%;\n  background-color: #fff;\n  max-width: 300px; }\n.action-item-block:not(:last-child) {\n    margin-right: 20px; }\n.action-item-block .update-btn {\n    margin-top: 20px;\n    color: #84CBFB;\n    background-color: transparent;\n    border: 2px solid #84CBFB;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    -webkit-transition: all .25s linear;\n    transition: all .25s linear; }\n.action-item-block .update-btn:hover {\n      color: #84CBFB;\n      background-color: transparent;\n      border-color: #49b2f9; }\n.action-item-block .update-btn:hover {\n      color: #fff;\n      background-color: #84CBFB;\n      border: 2px solid #84CBFB;\n      width: 100%;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.action-item-block .update-btn:hover:hover {\n        color: #fff;\n        background-color: #53b6f9;\n        border-color: #49b2f9; }\n.action-item-block-title {\n  font-size: 16px;\n  font-weight: 600;\n  color: #989898;\n  display: inline-block;\n  margin-bottom: 25px;\n  text-transform: uppercase; }\n.action-inner-block {\n  width: 100%;\n  height: 200px;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n.action-inner-block.due-now {\n    background-color: #6DCBFB; }\n.action-inner-block.open {\n    background-color: #6BCA70; }\n.action-inner-block.overdue {\n    background-color: #DA253D; }\nspan {\n  text-transform: uppercase;\n  color: #fff;\n  font-size: 17px;\n  font-weight: 700; }\n.action-quantity {\n  font-size: 51px;\n  line-height: 42px;\n  margin-bottom: 10px; }\n.active-categories-view {\n  padding: 15px 30px 14px 35px;\n  background-color: #fff; }\n.active-categories-list-item {\n  padding: 8px 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 25px 2fr 30px 20px;\n      grid-template-columns: 25px 2fr 30px 20px;\n  -webkit-transition: all .25s linear;\n  transition: all .25s linear; }\n.active-categories-list-item:not(:last-child) {\n    border-bottom: 1px solid #EEEEEE; }\n.active-categories-list-item:hover {\n    background-color: #F3F3F3; }\n.active-categories-list-item span {\n    color: #999999;\n    font-size: 12px;\n    font-weight: 700; }\n.active-categories-list-item .list-number {\n    margin-right: 15px;\n    padding-top: 5px; }\n.active-categories-list-item .active-category-name {\n    font-weight: 400;\n    padding-top: 5px;\n    text-transform: none; }\n.active-categories-list-item .active-category-answer-number {\n    width: 30px;\n    height: 20px;\n    text-align: center;\n    line-height: 20px;\n    color: #fff;\n    background-color: #D8D8D8;\n    border-radius: 10px; }\n.active-categories-list-item .active-category-answer-number.unnanswered {\n      background-color: #D65451; }\n.active-categories-list-item i {\n    line-height: 20px;\n    color: #D8D8D8;\n    font-size: 20px; }\n.statistics-view {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 30px 25px 20px 30px; }\n.statistics-inner-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n.statistics-inner-wrapper /deep/ dx-button {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.statistics-inner-wrapper /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.statistics-inner-wrapper.in-progress .statistic-graph-title {\n    color: #69ca6b; }\n.statistics-inner-wrapper.in-progress .review-container-top .pie-chart-legend {\n    color: #69ca6b;\n    font-weight: 700; }\n.statistics-inner-wrapper .review-container {\n    margin-top: 0; }\n.statistics-inner-wrapper .chart-view {\n    padding: 0; }\n.statistics-inner-wrapper .review-container-top {\n    position: relative; }\n.statistics-inner-wrapper .review-container-top /deep/ dx-pie-chart {\n      padding: 0; }\n.statistics-inner-wrapper .review-container-top .pie-chart-legend {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      font-size: 36px;\n      font-weight: 400;\n      color: #dbecf8; }\n.statistic-graph-title {\n  font-size: 12px;\n  font-weight: 700;\n  color: #999999;\n  display: inline-block;\n  margin: 20px 0 40px; }\n.top-items-wrapper {\n  max-width: 360px; }\n.top-items-wrapper li {\n    margin-left: 12px;\n    list-style: none;\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 25px 2fr 20px;\n        grid-template-columns: 25px 2fr 20px;\n    padding: 10px 0; }\n.top-items-wrapper li:not(:last-child) {\n      border-bottom: 1px solid #EEEEEE; }\n.top-items-wrapper li span {\n      font-size: 12px;\n      color: #999;\n      font-weight: 400; }\n.top-items-wrapper li span.top-item-number {\n        font-weight: 700; }\n.top-items-wrapper li i {\n      line-height: 13px; }\n.top-item-title {\n  font-size: 12px;\n  text-transform: uppercase;\n  font-weight: 700;\n  color: #666;\n  margin-bottom: 20px;\n  display: inline-block; }\n.top-item-title:not(:first-child) {\n    margin-top: 20px; }\n.question-tooltip {\n  font-size: 16px;\n  color: #E3F4FD;\n  font-weight: 400;\n  background-color: #798A93;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 20px;\n  cursor: pointer; }\n.update-info {\n  font-size: 12px;\n  text-transform: none;\n  font-weight: 700;\n  color: #fff; }\n.validation-view {\n  padding: 15px 30px 20px 35px;\n  background-color: #fff; }\n.validation-title {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 12px;\n  font-weight: 700;\n  color: #666; }\n.validation-title .question-tooltip {\n    margin-left: 10px; }\n.review-container {\n  margin-top: 65px;\n  padding: 0 30px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n.review-container i {\n    font-size: 30px;\n    line-height: 30px;\n    color: #DBE7F2; }\n.review-container i.review-mark {\n      color: #EFDC34;\n      font-size: 100px;\n      line-height: 100px;\n      position: relative; }\n.review-container i.review-mark span {\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        -webkit-transform: translate(-50%, -50%);\n                transform: translate(-50%, -50%);\n        color: #fff;\n        font-size: 27px;\n        font-weight: 400;\n        font-family: Arial, \"Helvetica Neue\", Helvetica, sans-serif; }\n.statistic-graph-title.in-progress {\n  color: #69ca6b; }\n.statistics-container-content {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 380px;\n  display: -ms-grid;\n  display: grid;\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAGjpJREFUeNrt3WmUXVWVB/C976tK3jvnVpFBBKGhFUEGBZpBoBEH6NBOUbAVtBsBR8ApCREJQ+gEJCRMoYLSC+hulWjbCrIcwBFFWNCAILNAEsAJFSFmoN495xapvLv7Q93EIlYqVfXevucN/99aflDCOWc/k39e3WFvIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACApuece7dz7kIRsaHPAgAFEpFJSZKscs6Jc+6PzrlTRCQKfS4AKIBz7pz8D//w/9znvT889NmG49AHAGg3SZLsyMwriah3hH8sIvKtKIrOMMb8PvRZ8ZUEoMGiKLqERv7DT0TEzHyciDzunFsoIuWQZ8U3AIAGcs4dRET30tj/cn1GRObHcbw8xHlVAiBJkuuZ+bhGrikiN8RxfHwxHwvA+IkIe+/vJqJDx/vvMvPPsyybE8fxI0WeGT8CADSIc+4kmsAffiIiETmSmR/03i+vVqvbF3VmBABAA4hIzMwX1blMJCInRlG0MkmSeSIySfvcCACABvDen0NEOzVouanMvCRN00ecc+/QPDcCAKBOaZruRkSnN3pdEdmTiL7vnPtOkiQ7apwdAQBQpyzLLiMizdt5B1trE42FEQAAdahWq0cR0Xs09xCRs5kZAQDQTESkFEXRFcrb3GOt/ZrW4ggAgAny3p9GRPspbiHMPIeZRWsDBADABKxfv34qES1U3ma5MeYXmhsgAAAmoLu7+wIiepniFgkRnaNdBwIAYJyq1eo+RHSq5h4icpG19k/atSAAAMYpiqKlRNStuMWvrbXaFxeHailiE4B24Zw7lojeqrkHM5/BzANF1IMAABgjEZkkIpdo7sHMtxpjvl1UTQgAgDFyzs1l5j0Ut6hlWdbwR4pHgwAAGIMkSXZg5rOVt7ka/QAAmhAzL6Gtt/lqhHW1Wm1h0XUhAAC2wTl3IBGdpLkHMy/o7e39S9G1IQAARiEiTETLSPfPyhOVSuXqEPUhAABG4Zw7gYiO0NxDRE5n5sEQ9SEAALZCRAwzL1Le5rtxHP84VI0IAICtyNt87aq4xYZSqXRmyBoRAAAj8N7vSgptvoZj5ivK5fKqkHUiAABGICJLicgobvHcwMDA4tB1IgAAtlCtVo8kovdq7iEiZ0+bNu2F0LUiAACGKajN14PW2utC10qEAAB4Ce/9KUS0v+IWEkXRbGbOQtdKhAAA2Cxv83WB5h7M/L+VSuWO0LVuggAAyHV1dS0g3TZfKTOrt/kaDwQAABFVq9W9mfmTytssqVQqvwtd63AIAAAqpM3XM8aYy0LX+Td1hz4AvNTq1at7nHP3Jkmi+vYZ/JVz7l1E9DbNPfI2Xz50rVtCADQZa+18Ino9M1/nvb81SRLNwRMdL2/zpf038/9VKpUbQtc6EgRAE0nTdDcRmb3pv4vIkcz8oPd+ebVa3T70+dqRc24OM79GcYuMiFSn+9QDAdBEsixbSkSTt/ifIxE5MYqild772SLSFfqc7aJarb68gKvy/2Wt/WXoWrcGAdAk8imzx4zyS6aKSF+apo8mSaLalrpTRFG0mIi2U9yiX0QWhK5z1M8g9AFg8+OnfWP8tXsx84+cczelafqq0GdvVc65A4joQ5p7MPP5cRz/OXSto0EANIF8yuy+4/zXZmZZ9pj3fsnq1at7QtfQSkSERUS7zddTlUrlqtC1bgsCILA6p8xWRGSeMeaJJElOyvvXwTY45/6Vmd+ovM1sZn4xdK3bggAIrLu7+3yq//HTnfPbhvd47w8NXVMzE5EKM1+kvM0t1tofhK51LBAAAVWr1b2J6LQGLnmIiNyV3zZ8eej6mpH3/iwi+nvFLTYWPd2nHgiAgJQeP9182zBJknkiMil0nc3Ce78LEZ2huYeIXNnT0/NY6FrHCgEQSAGPn05h5iXOuUedc+8IXW8zyLLsMtJt87V6cHDw86HrHA8EQAAFPX5KRET5U27fd87dkv/I0ZG8929g5uOUt5k/derU9aFrHQ8EQADOuVnKj5+OZEYURQ8nSbJszZo1mjPumo6IRCLSR0Sad0keMsb8d+haxwsBULD88dP5gbbvZuZZ5XJ5hXPuFBHpiP//vfcfI6KDNfeIomgOM9e01nfOHVP/KiOcW+8jgZFEUbSIdB8/HYtXENE13vtfeO8PD/2ZaMq/7ZyvuYeI3FCpVG7XWt97f5iI/JvG2giAAiVJ8g9E9OHQ5xjmYBG503u/PEmSHUMfRsPkyZMXEpFmbQOa032GPbWo8uMLAqBYfURUCn2ILbCInMjMTznnForI5PqXbA4DAwO7M/OnlLe5tFKp/FZrcefcyUR0iNb6CICCeO+PZ+Y3hz7HKCwRLfDe/8p7r321vBC1Wu1KItJ8DuKPxpiLtRYXkVh7OCkCoAAiUhERtd8oDba7iFyf3zZ8bejDTJRz7p1E9HbNPURkHjM7rfXTND2XiHbSrAEBUADv/RlE9MrQ5xinGVEUPZgkybK1a9eGvmg5LiLSzcyXK29zt7X261qL592h5ijXgADQ5r3fmYjmhT7HBHUz86zJkyc/nXcjarbrFyNyzs0SkT0Vt8iYWbXNV5ZllxNRWbEGIkIAFOFiGvr5upVNF5E+7/293vsjQh9mNAU9Z3GdMeZexRqOIqJjlWsgIgSAKs37t4EcKCJ35N2INN+om7Aoii4koila6zNzlYjO1Vp/PN2hGgEBoET7/m1gM7Msezy/baj+NXWs8ucsPqK5R5Zli6y1z2qtn6bpJ2j83aEmDAGgxDl3Einev20ChoZuG65qoiEmfaT7nMWvrbV9WouvX79+atFNRBEACvL7t9pdZ5rFLsOGmBT2N9eWvPfvL+A5i7mabb66u7svIN3hpH8DAaDAe38OKd+/bTb5EJMHnHPX9Pf3F/qbuIjnLJj5Vmvtd7XWr1ar+xDRqZo1jAQB0GB5q+6WaQnVYF1EdEqpVFpZ5G1D7/080m3zVcuybI5mDQUMJx1536I3bHdZll1KuvdvX8gvLm4IXesopuW3De9P01T1a3ne5utzyvVcHcfxo1qL56/6Bhn2ggBooGq1eiQRvVdzj3zYxJxSqfQ6EWnKgZPD7J9l2W2aQ0yyLLuEdNt8ravVamoX5vLuUJcqnn9UCIAGye/fXqG8zeZhE+Vy+ck4jo8XkRlEpPa3U4NsHmIiInGjFvXeH87M71c++3m9vb1rtBZ3zs1l5j2Ua9gqBECDeO8/TkT7K28zm5lf8tU/juOfGWMOpKELSKtDfw6jqIjIPO/9ikYMMSmozdfjxphrtBZPkmQHZj5b8fzbhABogHXr1k0hoguUt9nqsAlm3mitvXZwcHBPEbmSiDaG/kxGsTMzX+ec+3n+4M6EeO8/QkSv1zyoiJzOzGqfJTMvIaKg/RkRAA3Q3d29gIi2V9xisFarfWZbv2jKlCnr4jieXavV9iWipp5Mw8xvZub7JzLEJJ+FqB24347j+CdaizvnDiSi4A9QIQDq1N/fv5d21xkR+UJvb+/Ksf763t7eFdbad4rI0UT0ROjPaBQTGmJirf13GuprqGVDqVRSe4Mz//FHezjpmAQ/QKsrlUra928nPGwijuOfGmP2Z+Y5RPRCiM9njKYw85I0TR9xzo3axGNgYODVIrLNb0P1YOal5XL5Sa31nXMnEFFTvFWJAKhDkiRHk3LXGapz2AQzDxpjltVqtVfn1wfUWlfXK3+H/wfOuZsGBgZePdKvqdVqfUSk2bfwuTRNFyvWaLTbfI0HAmCCRKSLmbVv+z3cqGETvb29a+I4nk1DA0Tv0P+E6jKzVqs9seUQkyRJZhDRTM2NReSs6dOn92ut770/m4h21axhPBAAE5Sm6WeISLVnXpZlDR82Ya19II7jNxHRu4noN5rnr9OmISZP5ENMJhUQuA9Ya5drLZ4/tThXuYZxQQBMQH9//8tE5N+Vt/lWT0/PbVqLW2tvMsa8logWEJFXrqUeO9HQEJMnieh1ivsIM3+amTO1DUSWku5Ti+OGAJiAUqmk2nWGiAaiKNJ+vp2YObXWXsDMr2HmrxKRWo+7BlD92szM/2OMuVtr/byVmupj4hOBABinvFX2R5W3UR02sSVjzB+NMScR0aFEdFdR+zYRT8ptvkTki9SE3aEQAOOUP+/fpbiF6rCJ0Vhr7zPGHMHMxxPR70OcIZDFxhi1egt6THxCEADj4L1/LxEdrbmH9rCJbWFmMcbcYIzZh4aGag6EOktBnjHGLNVavKDHxCcMATBGIjJZRJYob3OP5rCJ8WBmZ61dOOz6QFti5rnMrHYRtIDHxOuCABgj7/1niWh3xS2EmWdrDpuYCGPMM8aYk7IsO5KIHg59nga7s1Kp3Ki1eBGPidcLATAGSZLsQPrTfVSHTdSrp6fnNmPMgSJyMhE9H/o8DZARkep0nwIeE68bAmAMmPkS0n1tMyHFq9AN/ByyOI6Xb9iwYU9mvpiI1DrkFuBaa+39Wos752aS/mPidUMAbINz7iAi+qDmHiKyyFr7p9C1jtXUqVPXG2POKpVK+7VAW7KRrM+yTO1BrvypxctCFzkWCIBR5K9t9pHu56Q6bEJTuVxelbclO5qIfhX6PGPFzOf39PSodU8qYDhpwyAARlHQa5ufZeaWvtWWv3a8qS3ZX0KfZzTMvGJTX0UNBQ0nbRgEwFYU8dpmPmziO6FrbVAtg9baazdu3NjUbclEZC4zD2qtH0XRIiLaLnSdYz5v6AM0qwJe26xlWdZ2A0S22267tcPakv0o9Hm2cLO19odaizvnDiCiD4cucjwQACMo6LXNq+M4fiR0rVrytmRvp6HXjp8OfR4i2lCr1c7Q3CDvUlzINKRGQQCMIMuyy0l/2MTC0HUWIX/teO+8LZlao41tYeZx9VUcL+/9B5j5TaHqmygEwBa8929g5vdp7sHMC3p7e5v6YlmD6x00xiwjor2I6Foqvi3Z8y+++OKFWovnw0m1HxNXgQAYpqBhE09UKpWrQ9cagrX2WWvtqUR0CBHdWeDWdfVV3JYChpOqQQAM473/KBEdrLlHPmxC7Sp0kiQnJUlyvfe+afrObcla+4C19o00dH3gt8rbPWSM+ZLW4t77vyMi1WsLmhAAuYKGTXwvjuMfay0uIjEzL2bm40TkCefcQhHRnFRcl01tyUTkLBp6HLrhoihqeF/F4fJp0FZrfW0IgJy1dgER7ai4xYZSqaTa5itN0/k01EOPaOgi5gLv/apGzOLTwsw+juOLmXmvRrclE5FvViqV27XOXtBwUlUIANo8bOLTmnswc1+5XF6lXMOcEf7RLo2YxadtU1syZj6MiBrRmy8tlUpnaZ23oOtF6hAAVMiwiecHBgYuUq5h6Wg1DJ/Fl7/e3JSMMfcaY96Qv3b85zqWukSzr2IRw0mL0PEBkCTJP5HysAkiOnvatGlqo7nyGt49hl8aiciJzLwin8WnGXoTxswSx/FyY8zuNLG2ZH8wxlyqdb6CrhcVoqMDIJ/u06e8zYPGmK80WQ1TmHmJc+5R7/1xyvVP2Ka2ZKVSad/xvHbMzGdq9lUsYDhpYTo6ANI0/SQpD5uIomi25rCJNE0/PdEamHkPEbneOXdLtVrV/BzqUi6Xn4rj+Pgsy44iom09Pn13pVL5htZZihhOWqSODYAXXnhhmvZ0HxH5RqVSUZvDl9fQiFdPZ0RR9KBz7pr+/v6XaX4m9ejp6fm5MeaAUdqSZUSk2lexgOtFherYAOjq6vo8EU1X3CItlUpnK9ewuIE1dBHRKaVSaaX3fraIaM4+mLBNbckGBwf3ytuSbRj2j79srb1Pa+8ihpMWrSMDoFqt7kNEpyhvc3GlUvmd1uL5LT2NCUXTRKQvTdNHkyR5m9qnU6cpU6asy9uS7UtE32fmKhGdp7VfQdOgC9eRARBF0TLSne7ze82r0Lk+Unz1VET2YuYfOuduTNN0N+VaJqxcLq+y1s5k5v2stc9q7ZOm6adI93pREB0XAM65Y4lohuYe+VVotWET3vv3M/ObNWsY5l+yLFuRJMmyNWvWaHZGrovmPf/8Wovat4uQOioARGSSiFyivM1dlUrlesUaKiJS9OzAbmaeVS6XVzjnThGRlmp6Ua+urq5FpHu9KJiOCgDn3OnMvIfiFupXoQO/evoKIrrGe39vPu667eXToD8W+hxaOiYAkiTZgZlVr8oT0Zestb/UWryJXj09UETucM7dlKbpK0MfRlOpVPoi6V4vCqpjAoCZF5Nit9b8KrTqcwV5q7JmevV0ZpZlj3nvl4hIHPowjea9f5+IvCX0OTR1RADk3VpP1twjy7ILNK9C563KmvGxXSMi87z3K5r5tePxEpFyAdeLgmv7ABARFpFlyrU+ba39gmINUV5DM//h2pmZr/Pe3+O9Pyz0YerlvT+DiF4V+hza2j4A0jT9ADO/UXmbOcysNijTe/9xIjpIuYZGOURE7spfO9ZssKLGe78z6U+DbgptHQD5LbPFytv81Fp7s9bi69evn0pEn1euodE4f+34qWZvS7YVS4io7a5pjKStA6CAW2Ybtaf7dHV1LSCi7TX3UGRpqC1ZU792PJz3/jAROSH0OYrStgFQxC0zEbmqp6dHbSputVrdm5k/qVlDQXYXkeu99z9LkmS/0IfZmmHXi5r5WktDtW0AFNCtdW2WZapfzaMoWkpE3Zp7FElEjmLmB733y6vVatN9q3HOnUxDMws6RlsGgPf+Hwvo1jq/t7d3jdbizrljiKhp38arQyQiJ0ZRtDJvSzYp9IGINrdUV50G3YzaLgAKumX2mDHmPxVrKOKdhdCmMvOSNE0fcc69M/Rh0jQ9l/7aUr1jtF0AeO8/RMrdWvPpPhu11nfOzWXm12jW0CxEZE8iujlvS7ZPiDOkabrbVlqqt722CoC8W6vaEMjcjXEc36K1eEHvLDSjGVEUPZQkybK1a9eqPbI9kvwR61a7VdkQbRUA1tr5pNut9UXNYRNERMx8CRE17Xv3yrqZedbkyZOfztuSqb92XK1WjyKiY0MXHkrbBED+NW628jaXl8vlp7QWd84dREQfVK6hFUwXkT7v/X1pmr5JaxMRKUVR1Be62JDaJgCyLBt1Mk4DPDcwMKDWiCN/ieYqaqP/TxrggCzLbs9fO274c/l5W/h9QxcZUlv8Zsu/xh2juYeInDl9+vR+rfWdcycR0aGaNbSwmZvakuXXeeq2fv36qSKyIHRhobV8ABT0Ne5+a+3XtBZfvXp1DzOrzg5sA5OYeZYxZlNbsrp+73Z3d2u3hW8JLR8A3vvTSPdrnDDzHM3pPtbajrwHPUE70VBbsl947w+fyAL57cZTQxfSDFo6API35RYqb/NVY8ydWouPMtYbRnewiNyZJMn13vtdx/MvRlF0BbVxm6/xaOkA6O7uPp+INEdZeWZuxOitrarValdQG42aKhgz83Ei8sRYXzv23r+HiP459MGbRcsGQLVa3ZuITlPeZpEx5hmtxfOx3u9SrqETGBp67XjVaG3JRGRSlmVFt1Rvai0bAAW8KfcbY8xSrcULGk3eaXZh5uvSNL01SZL9t/yHzrnPKreFbzktGQDOuXeR8ptyzPw5Zh7QWr+esd4wOhF5CzM/kLcl24Fo8yPWqk9xtqKWC4D8TbnLNPdg5tuMMTdqrV+tVrfXHk0OQ68dM/MK7/3pURRdSp37iPVWtdyVUOfcLOU35WpZls3RrCGKoguJaKrmHrDZFBFR+1Gu1bXUN4Bqtfpy7avyRHRtHMcPay2uONYbYNxaKgCiKFpEitN9iGhdrVbT/mreR4pjvQHGo2V+BIiiaF8RUb2Cy8wX9Pb2/kVrfe/98SJS1FhvgG1qmW8AIrIXKf7NycwrKpXKVYrnr3RAmy9oMS0TANpEZC4zD2qtH3isN8CIEABDbrbW/lBrce/9LtQcY70BXgIBQLShVqup/uFswrHeAESEACBmvrK3t3el1vr5WO/3ha4TYCSdHgDPDwwMqHURbpGx3tDBOj0Azp02bdoLWot770+h1hnrDR2okwPgIWPMl7UWb9Gx3tBhOjYAoiiaw8w1rfW7uroWkm6zEoC6dWQAiMg3K5XK7Vrr52O9PxG6ToBt6cQASLWn++Q959pmrDe0r04MgEsqlcpvtRbPx3q/NXSRAGPRaQHwB2PMpVqL581K1NYHaLSOCgBmPpOZndb66DkHraaTAuDuSqXyDa3F0XMOWlGnBECWT/cRrQ3Qcw5aUacEwFeMMfdqLe6cO0hETghdJMB4tX0AMHOViNT6CGKsN7Sytv9Nm2XZhdbaZ7XWd86dTBjrDS2q3QPgaWvtMq3F87Hei0IXCTBR7R4Ac5n5Ra3FrbXzCWO9oYW1bQAw863W2u9prZ+P9Z4duk6AerRrAKhP98FYb2gH7RoA/xHH8aNaiydJMoMw1hvaQDsGwLparXa+1uL5WO8rQhcJ0AjtGADn9fb2rtFaHGO9oZ20WwA8boy5Rmvx/v7+6SJyXugiARqlrQJARE5n5o1a65dKpYuIaFroOgEapZ0C4DtxHP9Ea3GM9YZ21C4BsKFUKp2pvEcfYaw3tJm2CABmXloul5/UWt97/wFmxlhvaDvtEADPpWm6WGvxfKz3ktBFAmho+QAQkbOmT5/er7W+9/4swlhvaFOtHgAPWGuXay2Osd7Q7lo5AISZZzNzprVBPtbbhC4UQEvLBgAzf90Yc6fW+t77IzDWG9pdV+gD1OF+7/1xWouLyHzCWG9ocy0bACKyNPQZAFpdy/4IAAD1QwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAdDAEAEAHQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIzi/wGj7L9oysY3NAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wNS0zMVQwODozNTo1MSswMDowMMsdRZgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDUtMzFUMDg6MzU6NTErMDA6MDC6QP0kAAAAKHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy90bXAvbWFnaWNrLUxtMlJDUDlu9/TfgwAAAABJRU5ErkJggg==\");\n  background-size: cover;\n  background-repeat: no-repeat;\n  -ms-grid-columns: 115px 20px 20px;\n      grid-template-columns: 115px 20px 20px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n.statistics-container-content .rating-circle {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100px;\n    height: 100px;\n    border-radius: 50%;\n    border: 5px solid #46C25F;\n    font-size: 30px;\n    font-weight: bold;\n    color: #46C25F;\n    justify-items: center;\n    display: -ms-grid;\n    display: grid;\n    background-color: #fff; }\n.statistics-container-content span {\n    color: red;\n    font-size: 24px; }\n.statistics-container-content .material-icons {\n    color: red; }\n.container-status {\n  position: relative;\n  grid-column: 1 / -1; }\n.container-status-content {\n  padding-top: 20px;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 410px 410px 410px;\n      grid-template-columns: 410px 410px 410px;\n  font-size: 14px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  justify-items: center;\n  background-color: #fff; }\n.container-status-content .material-icons {\n    color: #6BCDFD;\n    font-size: 80px; }\n.block-style {\n  border: 1px dashed silver;\n  border-radius: 5px; }\n.down-1 {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n  position: absolute;\n  bottom: -20px;\n  right: -20px; }\n.up-1 {\n  -webkit-transform: scale(-1);\n          transform: scale(-1);\n  position: absolute;\n  top: -20px;\n  right: -20px; }\n.down-2 {\n  -webkit-transform: scale(-1);\n          transform: scale(-1);\n  position: absolute;\n  bottom: -20px;\n  left: -20px; }\n.down-3 {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n  position: absolute;\n  top: -20px;\n  left: -20px; }\n.up-2 {\n  -webkit-transform: scale(-1);\n          transform: scale(-1);\n  position: absolute;\n  top: -20px;\n  left: -20px; }\n.corner-block {\n  position: relative;\n  width: 315px;\n  height: 170px;\n  padding: 50px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n.big-square-block {\n  position: relative;\n  width: 410px;\n  height: 330px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr 1fr;\n      grid-template-columns: 1fr 1fr;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  justify-items: center; }\n.small-square-block {\n  width: 170px;\n  height: 120px;\n  padding: 20px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n.validation-descr {\n  margin-top: 40px; }\n.validation-descr span {\n    font-size: 12px;\n    text-transform: none;\n    color: #999;\n    font-weight: 400; }\n.validation-descr span b {\n      font-weight: 700; }\n.sbmt-review-btn {\n  margin-top: 50px;\n  color: #69CDFD;\n  background-color: #fff;\n  border: 2px solid #69CDFD;\n  width: 100%;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.sbmt-review-btn:hover {\n    color: #69CDFD;\n    background-color: #e6e5e5;\n    border-color: #2db9fc; }\n.sbmt-review-btn:hover {\n    color: #fff;\n    background-color: #69CDFD;\n    border-color: #69CDFD; }\n.sbmt-review-btn.disable {\n    color: #EEEEEE;\n    background-color: #fff;\n    border: 2px solid #EEEEEE;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.sbmt-review-btn.disable:hover {\n      color: #EEEEEE;\n      background-color: #e6e5e5;\n      border-color: #cfcfcf; }\n#performanceIndicators .top-navigation {\n  margin-bottom: 30px; }\n#performanceIndicators .top-navigation .nav-item {\n    padding: 5px 10px;\n    font-size: 11px;\n    font-weight: 400; }\n#performanceIndicators .data-collection-chart {\n  max-width: 350px;\n  height: 250px; }\n#performanceIndicators .chart-view-inner {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n#performanceIndicators .chart-view-inner .update-btn {\n    margin-top: 20px;\n    color: #fff;\n    background-color: #69CDFD;\n    border: 2px solid #69CDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    max-width: 242px; }\n#performanceIndicators .chart-view-inner .update-btn:hover {\n      color: #fff;\n      background-color: #37bcfc;\n      border-color: #2db9fc; }\n#performanceIndicators .chart-view-inner .update-btn:hover {\n      color: #fff;\n      background-color: #CBCBCB;\n      border-color: #CBCBCB; }\n#performanceIndicatorsReview .review-container {\n  margin-top: 130px; }\n.standards-overview {\n  margin-top: 20px;\n  position: relative; }\n.standards-overview-view {\n  background-color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  padding: 30px 25px 45px; }\n.standards-overview-item {\n  padding: 4px;\n  border: 1px solid #D8D8D8;\n  max-width: 158px;\n  width: 100%;\n  border-radius: 8px;\n  clear: both;\n  text-align: center; }\n.standards-overview-item .standards-overview-item-quantity {\n    width: 29px;\n    height: 19px;\n    background-color: #D9534F;\n    border-radius: 10px;\n    float: right;\n    color: #fff;\n    text-align: center;\n    font-size: 12px;\n    font-weight: 700;\n    line-height: 19px;\n    margin-bottom: 20px; }\n.standards-overview-item .img-wrapper {\n    width: 100%;\n    text-align: center;\n    height: 71px;\n    overflow: hidden;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n.standards-overview-item .img-wrapper img {\n      display: block;\n      width: 100%;\n      max-width: 120px;\n      height: 100%; }\n.standards-overview-item .view-btn {\n    margin-top: 20px;\n    color: #69CDFD;\n    background-color: #fff;\n    border: 2px solid #69CDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.standards-overview-item .view-btn:hover {\n      color: #69CDFD;\n      background-color: #e6e5e5;\n      border-color: #2db9fc; }\n.standards-overview-item .view-btn:hover {\n      color: #fff;\n      background-color: #69CDFD;\n      border-color: #69CDFD; }\n.top-navigation-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n.top-navigation-wrapper.fixed {\n    position: fixed;\n    top: 0;\n    max-width: 1697px;\n    width: 100%;\n    z-index: 999;\n    background-color: #F3F3F3;\n    padding: 10px 0; }\n.top-navigation-wrapper.fixed .top-navigation {\n      margin: 0; }\n.top-navigation {\n  display: -ms-grid;\n  display: grid;\n  grid-column: 1 / -1;\n  width: 65%;\n  -ms-grid-columns: auto auto auto auto auto;\n      grid-template-columns: auto auto auto auto auto;\n  font-size: 12px;\n  font-weight: bold;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  cursor: pointer;\n  margin-bottom: 24px; }\n.top-navigation .nav-item {\n    padding: 10px;\n    border: 1px solid #d8d8d8;\n    border-right: none !important; }\n.top-navigation .nav-item:first-child {\n      border-top-left-radius: 20px;\n      border-bottom-left-radius: 20px;\n      border-right: none !important; }\n.top-navigation .nav-item:last-child {\n      border-top-right-radius: 20px;\n      border-bottom-right-radius: 20px;\n      border: 1px solid #d8d8d8 !important; }\n.top-navigation .nav-item:not(:last-child) {\n      border-right: 1px solid #d8d8d8; }\n.top-navigation .top-navigation-active {\n    background-color: #fff;\n    color: #6BCDFD; }\n.chart-wrapper {\n  position: relative; }\n.anckor {\n  position: absolute;\n  top: -100px; }\n.anckor2 {\n  position: absolute;\n  top: -100px; }\n.anckor4 {\n  position: absolute;\n  top: -130px; }\n.anckor3 {\n  position: absolute;\n  top: -70px; }\n.anckor5 {\n  position: absolute;\n  top: -100px; }\n"

/***/ }),

/***/ "./client/app/home/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_service__ = __webpack_require__("./client/app/home/dashboard/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__ = __webpack_require__("./client/app/shared/models/spaDataSet.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assessment_assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DashboardComponent = (function () {
    function DashboardComponent(dashboardService, homeService, titleService, router, activatedRoute, userService, assessmentStateService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.homeService = homeService;
        this.titleService = titleService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.assessmentStateService = assessmentStateService;
        this.types = ["line", "stackedline", "fullstackedline"];
        this.spaDataSetByDimentionsBarChartLite = [];
        this.spaDataSetByDimentionsBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLite = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartLiteButtons = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFull = [];
        this.spaDataSetByPrinciplesOrQuestionGroupeBarChartFullButtons = [];
        this.dataForFilter = [{ id: 1, text: 'By Focus Area' }, { id: 2, text: 'By Principle' }];
        this.spaDatasetLite = new __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__["b" /* SpaDatasetForChart */]();
        this.spaDatasetFull = new __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__["b" /* SpaDatasetForChart */]();
        this.spaDataSetLitePieChart = [];
        this.spaDataSetFullPieChart = [];
        this.loadingVisible1 = true;
        this.loadingVisible2 = true;
        this.loadingVisible3 = true;
        this.loadingVisible4 = true;
        this.loadingVisible5 = true;
        this.loadingVisible6 = true;
        this.isFocusAriaActive = true;
        this.isNavFixed = false;
        this.SpaDataSetState = __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__["a" /* SpaDataSetState */];
        this.pipe = new __WEBPACK_IMPORTED_MODULE_2__angular_common__["PercentPipe"]("en-US");
        this.customizeTooltipN = function (arg) {
            return {
                text: arg.valueText + " - " + _this.pipe.transform(arg.percent, "1.2-2")
            };
        };
        this.countriesInfo = dashboardService.getCountriesInfo();
        this.energySources = dashboardService.getEnergySources();
        this.sales = dashboardService.getSales();
        this.populationByRegions = dashboardService.getPopulationByRegions();
    }
    DashboardComponent.prototype.customizeText = function (arg) {
        return arg.valueText;
    };
    DashboardComponent.prototype.checkScroll = function () {
        var scrollPosition = window.pageYOffset;
        if (scrollPosition > 110) {
            this.isNavFixed = true;
        }
        else {
            this.isNavFixed = false;
        }
    };
    DashboardComponent.prototype.customizeTooltip = function (arg) {
        return {
            text: arg.valueText
        };
    };
    DashboardComponent.prototype.customizeText2 = function (arg) {
        return arg.valueText + ' %';
    };
    DashboardComponent.prototype.redirect = function (route, title) {
        this.homeService.title.next(title);
        this.router.navigate([route]);
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (item) {
            _this.spaDatasetLite = new __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__["b" /* SpaDatasetForChart */]();
            _this.spaDatasetFull = new __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__["b" /* SpaDatasetForChart */]();
            _this.spaDataSetLitePieChart = [];
            _this.spaDataSetFullPieChart = [];
            _this.loadData();
        });
        this.loadData();
    };
    DashboardComponent.prototype.getSpaDataSetByAssessmentType = function (type) {
        var _this = this;
        if (type === 1) {
            this.assessmentStateService.getSpaDataSetByAssessmentType(1)
                .subscribe(function (spaDataSet) {
                _this.spaDatasetLite = spaDataSet;
                console.log('this.spaDatasetLite', _this.spaDatasetLite);
                _this.spaDataSetLitePieChart.push({
                    state: 'Answered',
                    value: spaDataSet.AnsweredPercentage
                });
                _this.spaDataSetLitePieChart.push({
                    state: 'Not answered',
                    value: 100 - spaDataSet.AnsweredPercentage
                });
                console.log('this.spaDataSetLitePieChart', _this.spaDataSetLitePieChart);
                _this.loadingVisible1 = false;
            }, function (error) {
                console.log(error);
                _this.spaDataSetLitePieChart.push({
                    state: 'Answered',
                    value: 0
                });
                _this.spaDataSetLitePieChart.push({
                    state: 'Not answered',
                    value: 100
                });
                _this.spaDatasetLite.AnsweredPercentage = 0;
                //this.userService.showUserNotification(error.error.Message, 'error')
            });
        }
        if (type === 0) {
            this.assessmentStateService.getSpaDataSetByAssessmentType(0)
                .subscribe(function (spaDataSet) {
                _this.spaDatasetFull = spaDataSet;
                console.log('this.spaDatasetFull', _this.spaDatasetFull);
                _this.spaDataSetFullPieChart.push({
                    state: 'Answered',
                    value: spaDataSet.AnsweredPercentage
                });
                _this.spaDataSetFullPieChart.push({
                    state: 'Not answered',
                    value: 100 - spaDataSet.AnsweredPercentage
                });
                console.log('this.spaDataSetFullPieChart', _this.spaDataSetFullPieChart);
                _this.loadingVisible4 = false;
            }, function (error) {
                _this.spaDataSetFullPieChart.push({
                    state: 'Answered',
                    value: 0
                });
                _this.spaDataSetFullPieChart.push({
                    state: 'Not answered',
                    value: 100
                });
                _this.spaDatasetFull.AnsweredPercentage = 0;
                //this.userService.showUserNotification(error.error.Message, 'error')}
            });
        }
    };
    DashboardComponent.prototype.loadData = function () {
        this.getSpaDataSetByAssessmentType(1);
        this.getSpaDataSetByAssessmentType(0);
    };
    DashboardComponent.prototype.customizeValueLabel = function (info) {
        return info.value + "%";
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('navigation'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], DashboardComponent.prototype, "navigation", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DashboardComponent.prototype, "checkScroll", null);
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-dashboard',
            template: __webpack_require__("./client/app/home/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./client/app/home/dashboard/dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__dashboard_service__["a" /* DashboardService */],
            __WEBPACK_IMPORTED_MODULE_4__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["b" /* Title */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_8__assessment_assessment_state_assessment_state_service__["a" /* AssessmentStateService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./client/app/home/dashboard/dashboard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CountryInfo */
/* unused harmony export EnergyDescription */
/* unused harmony export Data */
/* unused harmony export PopulationByRegion */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CountryInfo = (function () {
    function CountryInfo() {
    }
    return CountryInfo;
}());

var EnergyDescription = (function () {
    function EnergyDescription() {
    }
    return EnergyDescription;
}());

var Data = (function () {
    function Data() {
    }
    return Data;
}());

var energySources = [
    { value: "hydro", name: "Open" },
    { value: "oil", name: "Overdue" },
];
var countriesInfo = [{
        country: "January",
        hydro: 59.8,
        oil: 137.6,
        gas: 582,
        coal: 564.3,
        nuclear: 187.9
    }, {
        country: "February",
        hydro: 74.2,
        oil: 337.6,
        gas: 35.1,
        coal: 956.9,
        nuclear: 11.3
    }, {
        country: "March",
        hydro: 40,
        oil: 528.5,
        gas: 361.8,
        coal: 105,
        nuclear: 32.4
    }, {
        country: "April",
        hydro: 22.6,
        oil: 241.5,
        gas: 64.9,
        coal: 120.8,
        nuclear: 64.8
    }, {
        country: "May",
        hydro: 19,
        oil: 819.3,
        gas: 28.9,
        coal: 204.8,
        nuclear: 3.8
    }, {
        country: "June",
        hydro: 6.1,
        oil: 923.6,
        gas: 77.3,
        coal: 85.7,
        nuclear: 37.8
    }];
var sales = [
    {
        year: "2012",
        sales: 50
    },
    {
        year: "2013",
        sales: 25
    },
    {
        year: "2014",
        sales: 95
    },
    {
        year: "2015",
        sales: 68
    },
    {
        year: "2016",
        sales: 72
    },
    {
        year: "2017",
        sales: 89
    }
];
/*let data: SpaDataSetByDimentionsBarChart[] = [{
  OID: 1,
   Title: "Monday",
   AnsweredQuestions: 3
}, {
  OID: 2,
 Title: "Tuesday",
 AnsweredQuestions: 2
}, {
 OID: 3,
 Title: "Wednesday",
 AnsweredQuestions: 3
}];*/
/*AnsweredPercentage:60
Grade: null
OID:43
State:1*/
var PopulationByRegion = (function () {
    function PopulationByRegion() {
    }
    return PopulationByRegion;
}());

var populationByRegions = [{
        state: 'answered', AnsweredPercentage: 60
    }, { state: 'unanswered', AnsweredPercentage: 10 }, { state: 'unanswered', AnsweredPercentage: 30 }];
var DashboardService = (function () {
    function DashboardService() {
    }
    DashboardService.prototype.getEnergySources = function () {
        return energySources;
    };
    DashboardService.prototype.getCountriesInfo = function () {
        return countriesInfo;
    };
    DashboardService.prototype.getSales = function () {
        return sales;
    };
    DashboardService.prototype.getPopulationByRegions = function () {
        return populationByRegions;
    };
    DashboardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], DashboardService);
    return DashboardService;
}());



/***/ }),

/***/ "./client/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\" [ngClass]=\"{'fullscreen' : isFullScreenOpen}\">\r\n  <aside class=\"sidebar\">\r\n    <div class=\"form\">\r\n      <div class=\"user-profile\">\r\n        <i class=\"material-icons\">account_circle</i>\r\n        <p>Welcome Back,</p>\r\n        <a class=\"user-profile-name to-profile\" (click)=\"goToUserProfile()\">{{currentUser?.PermissionPolicyUser?.UserName}}</a>\r\n        <p class=\"user-profile-name\">{{currentUser?.Person1?.FirstName}} {{currentUser?.Person1?.LastName}}</p>\r\n        <a *ngIf=\"routerState\" (click)=\"logout()\">Logout</a>\r\n      </div>\r\n      <dx-tree-view #DxTreeViewComponent\r\n                    id=\"simple-treeview\"\r\n                    dataStructure=\"plain\"\r\n                    displayExpr=\"text\"\r\n                    selectedExpr=\"isSelected\"\r\n                    [selectByClick]=\"true\"\r\n                    [items]=\"menuSidebar\"\r\n                    [animationEnabled]=\"true\"\r\n                    (onItemClick)=\"selectItem($event)\"\r\n                    itemTemplate=\"itemTemplate\">\r\n        <div *dxTemplate=\"let itemObj of 'itemTemplate'\" class=\"sidebar-customization\"\r\n             [ngClass]=\"{'parentode-style' : itemObj.icon,\r\n          'parent-selected': itemObj.parentRoute && itemObj.id === currentItem?.id.substring(0, 1)}\">\r\n          <i *ngIf=\"itemObj.icon && itemObj.icon !== 'heart-pulse'\" class=\"material-icons\">{{itemObj.icon}}</i>\r\n          <span *ngIf=\"itemObj.icon==='heart-pulse'\" class=\"simple-svg icon:mdi-heart-pulse icon-inline:false\"></span>\r\n          <span [ngClass]=\"{'item-style': itemObj.route === currentRoute}\">{{itemObj.text}}</span>\r\n        </div>\r\n      </dx-tree-view>\r\n    </div>\r\n    <div class=\"sidebar-logo\">\r\n      <img src=\"../../assets/Blue-North-Logo.png\" alt=\"Logo\" >\r\n    </div>\r\n  </aside>\r\n  <article class=\"content\">\r\n    <div class=\"main-page-header\">\r\n      <div class=\"left-content\">\r\n        <h1 class=\"main-page-title\">{{title}}</h1>\r\n        <div>\r\n        <h5 class=\"main-page-subtitle\">{{subTitle | uppercase}}</h5>\r\n        <div *ngIf=\"lastUpdate\" class=\"date-label\">LAST UPDATE: {{lastUpdate | date: 'dd MMMM yyy'}}</div>\r\n        </div>\r\n        <span *ngIf=\"currentUnitName && routerUrl === '/dashboard'\" class=\"main-page-description\">{{currentUnitName}}</span>\r\n      </div>\r\n      <div class=\"right-content\" [style.visibility]=\"routerUrl === '/assessment-capture-full' ? 'visible' : 'hidden'\">\r\n        <span>Complete by:</span>\r\n        <dx-select-box [dataSource]=\"dataForFilter\"\r\n                       valueExpr=\"oid\"\r\n                       displayExpr=\"title\"\r\n                       [value]=\"completeBy\"\r\n                       (onSelectionChanged)=\"setCurrentFilter($event)\"\r\n                       placeholder=\"\">\r\n        </dx-select-box>\r\n      </div>\r\n      <div class=\"right-content\" *ngIf=\"unitsList\">\r\n        <span>Please select business unit:</span>\r\n        <div class=\"dx-field-value\">\r\n          <dx-select-box [dataSource]=\"unitsList\"\r\n                         valueExpr=\"Oid\"\r\n                         displayExpr=\"UnitName\"\r\n                         placeholder=\"SELECT CURRENT UNIT\"\r\n                         [value]=\"currentUser.CurrentUnitId\"\r\n                         (onSelectionChanged)=\"setCurrentUnit($event)\">\r\n          </dx-select-box>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n    <div class=\"content-wrapper\">\r\n    <router-outlet></router-outlet>\r\n    </div>\r\n  </article>\r\n</div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./client/app/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n*, *:before, *:after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n.wrapper {\n  display: -ms-grid;\n  display: grid; }\n.wrapper.fullscreen {\n    display: block; }\n.wrapper.fullscreen /deep/ .fullscreen-icon {\n      display: none; }\n.wrapper.fullscreen /deep/ .fullscreen-exit-icon {\n      display: block; }\n.wrapper.fullscreen .sidebar, .wrapper.fullscreen .main-page-header {\n      display: none; }\n.wrapper.fullscreen /deep/ .data-grid-full-wrapper dx-data-grid > .dx-datagrid {\n      max-height: calc(100vh - 220px); }\n.wrapper.fullscreen /deep/ .assessment-capture-light-container .assessment-selector-container {\n      position: absolute;\n      top: -10000000px; }\n.wrapper.fullscreen /deep/ .assessment-capture-light-container .dx-datagrid-rowsview {\n      max-height: calc(100vh - 190px); }\n.wrapper .fullscreen-exit-icon {\n    display: none; }\n.header {\n  border-bottom: 2px solid #F3F3F3;\n  background-color: #fff; }\n.dx-widget {\n  color: #4F5261;\n  font-size: 12px;\n  font-weight: bold;\n  padding-left: 0 !important; }\n.dx-widget li {\n    padding-left: 0;\n    height: 100px;\n    vertical-align: middle;\n    width: 100%; }\n.dx-widget li :hover {\n      background-color: #2C86D3;\n      color: #fff; }\n.dx-widget .parentode-style {\n    padding: 15px; }\n.sidebar {\n  background-color: #262F44;\n  padding: 0 !important;\n  width: 100%; }\n.user-profile {\n  width: 100%;\n  height: 200px;\n  text-align: center;\n  background-color: #262F44; }\n.user-profile .material-icons {\n    margin-top: 20px;\n    font-size: 50px;\n    color: #54647D; }\n.user-profile .user-profile-name {\n    font-weight: bold;\n    margin-bottom: 15px; }\n.user-profile p, .user-profile a {\n    display: block;\n    font-size: 12px;\n    color: #fff; }\n.user-profile a {\n    color: #7798B1;\n    text-decoration: underline; }\n.main-page-header {\n  overflow: hidden; }\n/deep/ dx-select-box .dx-field-value {\n  float: none;\n  width: 100%;\n  margin: 15px; }\n.main-page-header {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 2fr 1fr 1fr;\n      grid-template-columns: 2fr 1fr 1fr;\n  background-color: #fff;\n  min-height: 80px;\n  padding: 15px;\n  font-size: 24px;\n  position: relative; }\n.main-page-header .main-page-title {\n    color: #3282B9;\n    font-size: 26px;\n    margin-bottom: 6px; }\n.main-page-header .main-page-subtitle {\n    font-size: 14px;\n    display: inline-block; }\n.main-page-header .main-page-description {\n    font-size: 14px; }\n.main-page-header .right-content {\n    font-size: 12px;\n    display: -ms-grid;\n    display: grid;\n    grid-gap: 5px;\n    -ms-grid-row-align: center;\n        align-self: center; }\n.main-page-header .right-content span {\n      -ms-flex-item-align: center;\n          -ms-grid-row-align: center;\n          align-self: center; }\n.main-page-header .right-content .dx-field-value {\n      width: 100%; }\n.main-page-header .right-content dx-select-box {\n      border-radius: 0;\n      height: 22px;\n      width: 250px; }\n@media screen and (min-width: 768px) {\n  /* no grid support? */\n  .sidebar {\n    width: 166px;\n    height: 100vh;\n    position: fixed;\n    overflow-y: auto;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  .content {\n    -ms-grid-column: 2;\n        grid-column-start: 2;\n    margin: 0px 20px 0 0;\n    overflow: hidden; }\n  .content-wrapper {\n    margin-left: 20px; }\n  .wrapper {\n    -ms-grid-columns: 166px 5fr;\n        grid-template-columns: 166px 5fr; }\n  .header, .footer {\n    grid-column: 1 / -1;\n    /* needed for the floated layout */\n    clear: both;\n    position: fixed;\n    width: 100%;\n    top: 0;\n    z-index: 1000; } }\n.wrapper > * {\n  margin-bottom: 10px; }\n/* We need to set the widths used on floated items back to auto, and remove the bottom margin as when we have grid we have gaps. */\n@supports ((display: -ms-grid) or (display: grid)) {\n  li .dx-treeview-node {\n    padding-left: 0 !important; } }\n/deep/ dx-tree-view {\n  /* .dx-item .dx-treeview-item {\r\n     background-color: #6CCDFA!important;\r\n     color: #fff;\r\n   }*/ }\n/deep/ dx-tree-view .dx-treeview-node {\n    padding-left: 0 !important;\n    text-align: center; }\n/deep/ dx-tree-view .dx-treeview-node .dx-treeview-node-container > ul {\n      margin: 0 auto;\n      text-align: left; }\n/deep/ dx-tree-view .dx-treeview-node .dx-treeview-toggle-item-visibility {\n      width: 100% !important;\n      height: 100% !important;\n      opacity: 0 !important; }\n/deep/ dx-tree-view .dx-treeview-node .dx-treeview .dx-treeview-item .dx-icon {\n      background-size: 40px 40px;\n      width: 40px;\n      height: 40px;\n      margin: 0 auto;\n      display: block; }\n/deep/ dx-tree-view .dx-treeview-node .dx-treeview-item .item-style {\n      color: #4F5261; }\n/deep/ dx-tree-view .dx-treeview-node .dx-treeview-item .parent-selected .item-style {\n      color: #fff; }\n/deep/ dx-tree-view .dx-treeview-node .dx-item .dx-treeview-item .dx-state-hover {\n      background-color: #fff !important; }\n/deep/ dx-tree-view .dx-item-content .dx-treeview-item-content {\n    display: -ms-grid;\n    display: grid;\n    justify-items: center; }\n/deep/ dx-tree-view .dx-state-focused > .dx-treeview-item {\n    background-color: #6CCDFA !important;\n    color: #fff; }\n/deep/ dx-tree-view .dx-state-selected > .dx-treeview-item {\n    background-color: #262f44 !important;\n    color: #fff !important; }\n/deep/ dx-tree-view .dx-state-hover > .dx-treeview-item {\n    background-color: #262f44 !important;\n    color: #fff !important; }\n.to-profile {\n  color: #fff !important;\n  margin-top: 15px;\n  cursor: pointer; }\n.sidebar-customization {\n  display: -ms-grid;\n  display: grid;\n  justify-items: center; }\n.sidebar-customization i {\n    font-size: 36px; }\n.sidebar-customization .simple-svg {\n    width: 42px;\n    height: 42px; }\n.parent-selected {\n  background-color: #6CCDFA;\n  margin: -5px;\n  color: #fff; }\n.item-style {\n  color: #fff; }\n.sidebar-logo {\n  margin-top: 40px;\n  margin-bottom: 10px;\n  text-align: center;\n  width: 100%; }\n.sidebar-logo img {\n    display: inline-block;\n    max-width: 120px;\n    width: 100%; }\n/deep/ .full-assess-popup-wrapper .dx-popup-content {\n  padding: 0;\n  overflow: visible; }\n/deep/ .full-assess-popup-wrapper .dx-popover-arrow {\n  display: none; }\n/deep/ .full-assess-popup-wrapper .dx-template-wrapper {\n  padding: 20px !important;\n  position: relative; }\n/deep/ .full-assess-popup-wrapper .dx-template-wrapper:after {\n  content: \"\";\n  border-width: 10px 7.5px 0 7.5px;\n  display: inline-block;\n  position: absolute;\n  bottom: -10px;\n  border-style: solid; }\n/deep/ .full-assess-popup-wrapper .popover-dontknow-content.dx-template-wrapper:after {\n  border-color: #6BCDFA transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .full-assess-popup-wrapper .popover-no-content.dx-template-wrapper:after {\n  border-color: #FD001A transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .full-assess-popup-wrapper .popover-partially-content.dx-template-wrapper:after {\n  border-color: #FE962C transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .full-assess-popup-wrapper .popover-yes-content.dx-template-wrapper:after {\n  border-color: #6BC89F transparent transparent transparent;\n  right: 20%; }\n.date-label {\n  display: inline-block;\n  background-color: #6CC871;\n  border-radius: 3px;\n  text-align: center;\n  color: #fff;\n  font-size: 11px;\n  padding: 3px 25px;\n  margin-left: 10px; }\n/deep/ .light-assess-popup-wrapper .dx-popup-content {\n  padding: 0;\n  overflow: visible; }\n/deep/ .light-assess-popup-wrapper.dx-popup-wrapper > .dx-overlay-content {\n  border: none; }\n/deep/ .light-assess-popup-wrapper .dx-popover-arrow {\n  display: none; }\n/deep/ .light-assess-popup-wrapper .dx-template-wrapper {\n  padding: 20px !important;\n  position: relative;\n  color: #fff; }\n/deep/ .light-assess-popup-wrapper .dx-template-wrapper:after {\n  content: \"\";\n  border-width: 10px 7.5px 0 7.5px;\n  display: inline-block;\n  position: absolute;\n  bottom: -10px;\n  border-style: solid; }\n/deep/ .light-assess-popup-wrapper .popover-dontknow-content.dx-template-wrapper:after {\n  border-color: #6BCDFA transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .light-assess-popup-wrapper .popover-no-content.dx-template-wrapper:after {\n  border-color: #6BC89F transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .light-assess-popup-wrapper .popover-no-content.dx-template-wrapper.thesecond:after {\n  border-color: #6BC89F transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: none;\n          transform: none; }\n/deep/ .light-assess-popup-wrapper .popover-partially-content.dx-template-wrapper:after {\n  border-color: #FE962C transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .light-assess-popup-wrapper .popover-yes-content.dx-template-wrapper:after {\n  border-color: #FD001A transparent transparent transparent;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n/deep/ .light-assess-popup-wrapper .popover-dontknow-content {\n  background-color: #6BCDFA; }\n/deep/ .light-assess-popup-wrapper .popover-no-content {\n  background-color: #6BC89F; }\n/deep/ .light-assess-popup-wrapper .popover-partially-content {\n  background-color: #FE962C; }\n/deep/ .light-assess-popup-wrapper .popover-yes-content {\n  background-color: #FD001A; }\n.sidebar /deep/ .dx-treeview .dx-treeview-item.dx-state-hover {\n  background-color: #fff; }\n.sidebar /deep/ .dx-scrollable-content > .dx-treeview-node-container > .dx-treeview-node:hover > .dx-treeview-item {\n  background-color: #fff; }\n/deep/ .dx-tabs-wrapper .dx-item.dx-tab .dx-tab-content span {\n  display: inline-block;\n  max-width: 140px;\n  white-space: pre-line;\n  vertical-align: middle; }\n"

/***/ }),

/***/ "./client/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__ = __webpack_require__("./client/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assessment_assessment_capture_full_assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assessment_assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomeComponent = (function () {
    function HomeComponent(homeService, router, route, authService, userService, unitService, assesmentStateService, assessmentCaptureFullService, titleService) {
        var _this = this;
        this.homeService = homeService;
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.userService = userService;
        this.unitService = unitService;
        this.assesmentStateService = assesmentStateService;
        this.assessmentCaptureFullService = assessmentCaptureFullService;
        this.titleService = titleService;
        this.userInfo = {};
        this.currentUnitName = '';
        this.currentRoute = '';
        this.routerState = false;
        this.completeBy = 1;
        this.routerUrl = '';
        this.isScrolled = false;
        this.isFullScreenOpen = false;
        this.showFullScreenTooltip = false;
        this.selected = "selected";
        this.dataForFilter = [{
                oid: 1,
                title: 'Management Focus Area',
                type: 'PrincipleGroups',
                selector: 'PrincipleGroup'
            }, {
                oid: 2,
                title: 'Principle',
                type: 'Principles',
                selector: 'Principle'
            }];
        this.isUnitSelectorInitialized = false;
        this.menuSidebar = homeService.getMenuItems();
        router.events.subscribe(function (val) {
            _this.routerUrl = val.url;
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot['_routerState'].url === '/user-profile') {
            this.routerState = true;
        }
        this.homeService.getDataFromUnitSelector()
            .subscribe(function (unit) {
            //this.loadData()
            return _this.unitService.getUnitById(unit.Oid)
                .pluck('AssessmentType')
                .subscribe(function (type) {
                console.log(type);
                if (type === -1) {
                    _this.menuSidebar = _this.homeService.getNewUnitSidebar();
                    console.log(_this.menuSidebar);
                }
                else {
                    _this.menuSidebar = _this.homeService.getMenuItems();
                }
            });
        });
        this.currentUser = this.route.snapshot.data['currentUser'];
        console.log('this.currentUser', this.currentUser);
        this.userService.setCurrentUser(this.currentUser);
        this.title = this.titleService.getTitle();
        this.homeService.getFullSceenMode().subscribe(function (fullscreenMode) {
            _this.isFullScreenOpen = fullscreenMode;
        });
        this.loadData();
        if (this.assesmentStateService.getDimentionOid().type && this.assesmentStateService.getDimentionOid().oid) {
            this.completeBy = this.assesmentStateService.getDimentionOid().type;
        }
        setTimeout(function (_) {
            console.log('this.treeView', _this.treeView);
            _this.treeView.items.forEach(function (item) {
                if (item.route === _this.router.url.substring(1)) {
                    _this.currentItem = item;
                    _this.treeView.instance.selectItem(_this.currentItem.id);
                    _this.treeView.instance.expandItem(_this.currentItem);
                    _this.currentItem.subtitle ? _this.subTitle = _this.currentItem.subtitle : '';
                }
                if (item.items) {
                    item.items.forEach(function (point) {
                        if (point.route === _this.router.url.substring(1)) {
                            _this.currentItem = item;
                            _this.subTitle = point.text;
                            _this.treeView.instance.expandItem(item);
                            _this.treeView.instance.selectItem(point);
                        }
                        else {
                            _this.treeView.instance.unselectItem(point);
                        }
                    });
                }
            });
        });
        this.homeService.getValueForFilter()
            .subscribe(function (value) {
            console.log("FILTER", value);
            _this.completeBy = value;
        });
    };
    HomeComponent.prototype.loadData = function () {
        var _this = this;
        this.userService.getUserInfo()
            .map(function (user) {
            return user.body;
        })
            .switchMap(function (userLight) {
            _this.lastUpdate = userLight['LastModified'];
            _this.organisationOid = userLight['OrganisationOid'];
            console.log(userLight);
            return _this.unitService.getUnitById(userLight.CurrentUnitId);
        })
            .pluck('AssessmentType')
            .subscribe(function (type) {
            console.log(type);
            if (type === -1) {
                _this.menuSidebar = _this.homeService.getNewUnitSidebar();
                console.log(_this.menuSidebar);
            }
            else {
                _this.menuSidebar = _this.homeService.getMenuItems();
            }
            _this.unitService.getUnitsLiteListForOrganisation(_this.organisationOid)
                .subscribe(function (units) {
                _this.unitsList = units;
                console.log('units', _this.unitsList);
            });
        });
    };
    HomeComponent.prototype.goToUserProfile = function () {
        this.router.navigate(['profile']);
        this.routerState = true;
    };
    HomeComponent.prototype.selectItem = function (e) {
        var _this = this;
        console.log('this.treeView.instance.getNodes();', this.treeView.instance.getNodes());
        console.log('selectedItem', e);
        this.treeView.instance.unselectAll();
        this.menuSidebar.forEach(function (item) {
            item.isSelected = false;
        });
        this.currentItem = e.itemData;
        // this.treeView.instance.selectItem(this.currentItem);
        this.routerState = false;
        if (this.currentItem.parentRoute && !this.currentItem.items) {
            this.treeView.instance.selectItem(this.currentItem);
            this.titleService.setTitle(this.currentItem.text);
            this.currentItem.subtitle ? this.subTitle = this.currentItem.subtitle : '';
        }
        if (!this.currentItem.parentRoute) {
            this.titleService.setTitle(this.menuSidebar[+this.currentItem.id.substring(0, 1) - 1].text);
            console.log('this.currentItem.id.substring(0, 1)].title', this.menuSidebar);
            this.subTitle = this.currentItem.text;
        }
        console.log('this.treeView.instance', this.treeView);
        if (this.currentItem.route) {
            if (this.currentItem.id === "2_1") {
                this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
                    .subscribe(function (unit) {
                    console.log('unit: UnitInfo', unit);
                    if (unit.AssessmentType === (null || -1)) {
                        _this.router.navigate(['assessment-current-status-init']);
                    }
                    else {
                        _this.router.navigate(['assessment-current-status']);
                    }
                });
            }
            else {
                this.router.navigate(["/" + this.currentItem.route]);
            }
            this.title = this.titleService.getTitle();
        }
        console.log('this.titleService.getTitle()', this.title);
    };
    HomeComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HomeComponent.prototype.setCurrentUnit = function (value) {
        var _this = this;
        var updateCurrentUnit = {
            Oid: this.currentUser.Oid,
            CurrentUnitId: value.selectedItem.Oid
        };
        console.log('CURRENT UNIT SELECTOR', value);
        this.userService.changeCurrentUnit(updateCurrentUnit)
            .subscribe(function (currentUnitId) {
            _this.currentUser.CurrentUnitId = currentUnitId;
            _this.currentUnitName = value.selectedItem.UnitName;
            if (!_this.isUnitSelectorInitialized) {
                _this.isUnitSelectorInitialized = true;
                return;
            }
            _this.homeService.setDataFromUnitSelector(value);
        });
    };
    HomeComponent.prototype.setCurrentFilter = function (event) {
        this.assessmentCaptureFullService.setDataFromCompleteByFilter(event.selectedItem);
        console.log(event.selectedItem);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('DxTreeViewComponent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_devextreme_angular__["DxTreeViewComponent"])
    ], HomeComponent.prototype, "treeView", void 0);
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'bluenorth-home',
            template: __webpack_require__("./client/app/home/home.component.html"),
            styles: [__webpack_require__("./client/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_9__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_8__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_6__assessment_assessment_state_assessment_state_service__["a" /* AssessmentStateService */],
            __WEBPACK_IMPORTED_MODULE_5__assessment_assessment_capture_full_assessment_capture_full_service__["a" /* AssessmentCaptureFullService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["b" /* Title */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./client/app/home/home.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MenuItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var MenuItem = (function () {
    function MenuItem() {
    }
    return MenuItem;
}());

var adminMenuSidebar = [
    {
        id: "1",
        text: "DASHBOARD",
        route: "dashboard",
        icon: "network_check",
        parentRoute: true,
        isSelected: false
    },
    {
        id: "2",
        text: "STRATEGIC ASSESSMENT",
        route: "assessment-current-status",
        icon: "pie_chart",
        parentRoute: true,
        isSelected: false,
        items: [
            {
                id: "2_1",
                text: "Current Status",
                route: "assessment-current-status",
                parentRoute: false
            },
            {
                id: "2_2",
                text: "Lite Assessment",
                route: "assessment-capture-light",
                parentRoute: false
            },
            {
                id: "2_3",
                text: "Full Assessment",
                route: "assessment-capture-full",
                parentRoute: false
            },
            {
                id: "2_4",
                text: "Reporting",
                route: "assessment-reporting",
                parentRoute: false
            }
        ]
    },
    {
        id: "3",
        text: "PERFORMANCE INDICATORS",
        route: "performance-indicators-current-status",
        icon: "search",
        parentRoute: true,
        isSelected: false,
        items: [
            {
                id: "3_1",
                text: "Current Status",
                route: "performance-indicators-current-status",
                parentRoute: false
            },
            {
                id: "3_2",
                text: "Capture",
                route: "performance-indicators-capture",
                parentRoute: false
            },
            {
                id: "3_3",
                text: "Reporting",
                route: "performance-indicators-reporting",
                parentRoute: false
            }
        ]
    },
    {
        id: "4",
        text: "MY ACTIONS",
        route: "",
        icon: "storage",
        parentRoute: true,
        isSelected: false,
        items: [
            {
                id: "4_1",
                text: "Current Status",
                route: "my-actions-current-status",
                parentRoute: false
            },
            {
                id: "4_2",
                text: "Prioritise",
                route: "my-actions-prioritise",
                parentRoute: false
            },
            {
                id: "4_3",
                text: "Capture Actions",
                route: "my-actions-capture",
                parentRoute: false
            },
            {
                id: "4_4",
                text: "Reporting",
                route: "my-actions-reporting",
                parentRoute: false
            }
        ]
    },
    {
        id: "5",
        text: "SYSTEM HEALTH",
        route: "",
        icon: "heart-pulse",
        parentRoute: true,
        isSelected: false
    },
    {
        id: "6",
        text: "STANDARDS",
        subtitle: "CURRENT STATUS",
        route: "standards-management",
        icon: "account_balance",
        parentRoute: true,
        isSelected: false
    }
];
var liteMenuSidebar = [
    {
        id: "1",
        text: "DASHBOARD",
        route: "dashboard",
        icon: "network_check",
        parentRoute: true,
        isSelected: false
    },
    {
        id: "2",
        text: "STRATEGIC ASSESSMENT",
        route: "assessment-current-status",
        icon: "pie_chart",
        parentRoute: true,
        isSelected: false,
        items: [
            {
                id: "2_1",
                text: "Current Status",
                route: "assessment-current-status",
                parentRoute: false
            },
            {
                id: "2_2",
                text: "Lite Assessment",
                route: "assessment-capture-light",
                parentRoute: false
            },
            {
                id: "2_3",
                text: "Full Assessment",
                route: "assessment-capture-full",
                parentRoute: false
            },
            {
                id: "2_4",
                text: "Reporting",
                route: "assessment-reporting",
                parentRoute: false
            }
        ]
    },
    {
        id: "3",
        text: "PERFORMANCE INDICATORS",
        route: "performance-indicators-current-status",
        icon: "search",
        parentRoute: true,
        isSelected: false,
        items: [
            {
                id: "3_1",
                text: "Current Status",
                route: "performance-indicators-current-status",
                parentRoute: false
            },
            {
                id: "3_2",
                text: "Capture",
                route: "performance-indicators-capture",
                parentRoute: false
            },
            {
                id: "3_3",
                text: "Reporting",
                route: "performance-indicators-reporting",
                parentRoute: false
            }
        ]
    },
    {
        id: "5",
        text: "SYSTEM HEALTH",
        route: "",
        icon: "heart-pulse",
        parentRoute: true,
        isSelected: false
    },
    {
        id: "6",
        text: "STANDARDS",
        subtitle: "CURRENT STATUS",
        route: "standards-management",
        icon: "account_balance",
        parentRoute: true,
        isSelected: false
    }
];
var HomeService = (function () {
    function HomeService() {
        this.unitSelector$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
        this.completeBy$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](1);
        this.fullScreenOpen$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.title = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["b" /* Subject */]();
    }
    HomeService.prototype.getMenuItems = function () {
        return adminMenuSidebar;
    };
    HomeService.prototype.getNewUnitSidebar = function () {
        return liteMenuSidebar;
    };
    HomeService.prototype.getDataFromUnitSelector = function () {
        return this.unitSelector$;
    };
    HomeService.prototype.setDataFromUnitSelector = function (data) {
        this.unitSelector$.next(data.selectedItem);
    };
    HomeService.prototype.preselectDataToFilter = function (value) {
        this.completeBy$.next(value);
    };
    HomeService.prototype.getValueForFilter = function () {
        return this.completeBy$;
    };
    HomeService.prototype.changeFullscreenMode = function (mode) {
        this.fullScreenOpen$.next(mode);
    };
    HomeService.prototype.getFullSceenMode = function () {
        return this.fullScreenOpen$;
    };
    HomeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], HomeService);
    return HomeService;
}());



/***/ }),

/***/ "./client/app/home/my-actions/capture/capture.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"characteristicsList.length\" class=\"actions-top-selector-container\">\r\n  <span>Select Characteristic:</span>\r\n  <dx-select-box [dataSource]=\"characteristicsList\" #characterisricSelectBox\r\n                 valueExpr=\"Oid\"\r\n                 displayExpr=\"Title\"\r\n                 (onSelectionChanged)=\"setCurrentCharacteristic($event)\"\r\n                 [value]=\"characteristicsList.length ? characteristicsList[0].Oid : ''\"\r\n                 placeholder=\"\">\r\n  </dx-select-box>\r\n</div>\r\n<div class=\"actions-wrapper\">\r\n  <div id=\"characteristic-info\"\r\n       class=\"characteristic-container\">\r\n    <div class=\"characteristic-info\">\r\n      <div class=\"characteristic-type-style\" *ngIf=\"currentCharacteristic\">\r\n        On a <span class=\"font-bold\">sustainable</span> {{currentCharacteristic?.OrganisationType1?.ShortTitle}}\r\n      </div>\r\n      <div class=\"characteristic-description\">{{currentCharacteristic?.Description}}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"actions-table-container\">\r\n    <div class=\"actions-selector-container\">\r\n       <div class=\"selector-wrapper\">\r\n        <span>Filter:</span>\r\n        <dx-select-box [dataSource]=\"['ALL', 'COMPLETE', 'INCOMPLETE']\" #completeSelectBox\r\n                       (onSelectionChanged)=\"setIsCompleted($event)\"\r\n                       [value]=\"'ALL'\"\r\n                       placeholder=\"\">\r\n        </dx-select-box>\r\n      </div>\r\n    </div>\r\n    <div class=\"actions-toolbar-container\">\r\n      <dx-data-grid #dataGrid\r\n                    id=\"gridContainer\"\r\n                    noDataText=\"\"\r\n                    [showColumnLines]=\"false\"\r\n                    [showBorders]=\"false\"\r\n                    [showRowLines]=\"false\"\r\n                    [rowAlternationEnabled]=\"true\"\r\n                    [hoverStateEnabled]=\"false\"\r\n                    [wordWrapEnabled]=\"true\"\r\n                    [dataSource]=characteristicCaptureList\r\n                    (onRowRemoving)=\"deleteRow($event)\"\r\n                    (onInitNewRow)=\"addNewRow($event)\"\r\n                    [scrolling]=\"true\">\r\n        <dxo-scrolling mode=\"standard\"></dxo-scrolling>\r\n        <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n        <dxo-editing\r\n          mode=\"cell\"\r\n          [allowUpdating]=\"true\"\r\n        >\r\n        </dxo-editing>\r\n        <div *dxTemplate=\"let info of 'titleHeaderTemplate' \">\r\n          <p class=\"data-grid-header\">{{info.column.caption}}</p>\r\n        </div>\r\n        <dxi-column dataField=\"QuestionOid\" [visible]=\"false\"></dxi-column>\r\n        <dxi-column [allowSorting]=\"true\"\r\n                    dataField=\"QuestionGroup\"\r\n                    headerCellTemplate=\"titleHeaderTemplate\"\r\n                    [allowEditing]=\"false\"\r\n                    caption=\"CATEGORY\"\r\n        ></dxi-column>\r\n        <dxi-column [allowSorting]=\"true\"\r\n                    dataField=\"ImprovementPlanQuestion\"\r\n                    headerCellTemplate=\"titleHeaderTemplate\"\r\n                    [allowEditing]=\"false\"\r\n                    cellTemplate=\"questionsTemplate\"\r\n                    caption=\"PROMPTING QUESTIONS\"\r\n        ></dxi-column>\r\n        <div *dxTemplate=\"let data of 'questionsTemplate'\">\r\n          <p>{{data.data.ImprovementPlanQuestion}}</p>\r\n          <div *ngIf=\"showGuidance === data.rowIndex\" class=\"question-guidance\"\r\n               [innerHTML]=\"data.data?.ImprovementPlanGuidance | replaceLineBreaks\"></div>\r\n          <div *ngIf=\"data.data.ImprovementPlanGuidance && showGuidance !== data.rowIndex\"\r\n               (click)=\"showGuidance = data.rowIndex\"><a class=\"guidance-show\">Refer to guidance</a></div>\r\n          <div *ngIf=\"data.data.ImprovementPlanGuidance && showGuidance === data.rowIndex\"\r\n               (click)=\"showGuidance = null\"><a\r\n            class=\"guidance-show\">Close guidance</a>\r\n          </div>\r\n        </div>\r\n\r\n        <dxi-column [allowSorting]=\"true\"\r\n                    dataField=\"IsDisabled\"\r\n                    headerCellTemplate=\"titleHeaderTemplate\"\r\n                    cellTemplate=\"isAnsweredTemplate\"\r\n                    [allowEditing]=\"false\"\r\n                    caption=\"ANSWER\"\r\n                    [width]=\"70\"\r\n        ></dxi-column>\r\n\r\n        <div *dxTemplate=\"let data of 'isAnsweredTemplate'\" class=\"template-view\" [style.visibility]=\"data.data.QuestionGroup  ? 'visible' : 'hidden'\"\r\n             [ngClass]=\"{'not-relevant': data.data.IsDisabled}\">\r\n          <dx-switch (onValueChanged)=\"updateRow($event, data, answerSwitcher, 'IsDisabled')\"\r\n                     [value]=\"!data.data.IsDisabled\"\r\n                     #answerSwitcher></dx-switch>\r\n        </div>\r\n\r\n        <dxi-column\r\n          dataField=\"Actions\"\r\n          headerCellTemplate=\"titleHeaderTemplate\"\r\n          [showEditorAlways]=\"true\"\r\n          editCellTemplate=\"actionsTemplate\"\r\n          [allowEditing]=\"true\"\r\n          caption=\"WHAT ACTIONS ?\"\r\n        ></dxi-column>\r\n        <div *dxTemplate=\"let data of 'actionsTemplate'\" [style.visibility]=\"!data.data.IsDisabled  ? 'visible' : 'hidden'\">\r\n          <dx-text-box #actionsText\r\n                       placeholder=\"Add Action\"\r\n                       [value]=\"data.data.Actions\"\r\n                       (onFocusOut)=\"updateRow($event, data, actionsText, 'Actions')\"\r\n          ></dx-text-box>\r\n        </div>\r\n        <dxi-column\r\n          dataField=\"Resposible\"\r\n          headerCellTemplate=\"titleHeaderTemplate\"\r\n          editCellTemplate=\"responsibleTemplate\"\r\n          [showEditorAlways]=\"true\"\r\n          [allowEditing]=\"true\"\r\n          caption=\"BY WHOM ?\"\r\n        ></dxi-column>\r\n        <div *dxTemplate=\"let data of 'responsibleTemplate'\" [style.visibility]=\"!data.data.IsDisabled  ? 'visible' : 'hidden'\">\r\n          <dx-text-box #responsible\r\n                       placeholder=\"Add Name\"\r\n                       [value]=\"data.data.Resposible\"\r\n                       (onFocusOut)=\"updateRow($event, data, responsible, 'Resposible')\"\r\n          ></dx-text-box>\r\n        </div>\r\n\r\n        <dxi-column [width]=\"160\"\r\n                    dataField=\"DueDate\"\r\n                    dataType=\"date\"\r\n                    headerCellTemplate=\"titleHeaderTemplate\"\r\n                    editCellTemplate=\"dueDateTemplate\"\r\n                    [showEditorAlways]=\"true\"\r\n                    [allowEditing]=\"true\"\r\n                    caption=\"BY WHEN ?\"\r\n        ></dxi-column>\r\n        <div *dxTemplate=\"let data of 'dueDateTemplate'\"\r\n             [ngClass]=\"{'date-color' : compareDates(data.data.DueDate)}\"\r\n             id='date'\r\n             [style.visibility]=\"!data.data.IsDisabled  ? 'visible' : 'hidden'\">\r\n          <dx-date-box\r\n                        #date\r\n                       (onValueChanged)=\"updateRow($event, data, date, 'DueDate')\"\r\n                       [value]=\"data.data.DueDate\"></dx-date-box>\r\n        </div>\r\n        <dxi-column [allowSorting]=\"true\"\r\n                    dataField=\"Result\"\r\n                    headerCellTemplate=\"titleHeaderTemplate\"\r\n                    editCellTemplate=\"resultTemplate\"\r\n                    [showEditorAlways]=\"true\"\r\n                    [allowEditing]=\"true\"\r\n                    caption=\"WHAT EVIDENCE ?\"\r\n\r\n        ></dxi-column>\r\n        <div *dxTemplate=\"let data of 'resultTemplate'\"\r\n             [style.visibility]=\"!data.data.IsDisabled  ? 'visible' : 'hidden'\">\r\n          <dx-text-box #evidence\r\n                      (onFocusOut)=\"updateRow($event, data, evidence, 'Result')\"\r\n                       placeholder=\"Add Evidence\"\r\n                       [value]=\"data.data.Result\"\r\n          ></dx-text-box>\r\n        </div>\r\n        <dxi-column [allowSorting]=\"true\"\r\n                    dataField=\"IsCompleted\"\r\n                    headerCellTemplate=\"titleHeaderTemplate\"\r\n                    cellTemplate=\"isCompletedTemplate\"\r\n                    [allowEditing]=\"false\"\r\n                    caption=\"COMPLETED\"\r\n        ></dxi-column>\r\n\r\n        <div *dxTemplate=\"let data of 'isCompletedTemplate'\" class=\"template-view\"\r\n             [style.visibility]=\"!data.data.IsDisabled  ? 'visible' : 'hidden'\"\r\n              [ngClass]=\"{'not-relevant': !data.data.IsCompleted}\">\r\n          <dx-switch (onValueChanged)=\"updateRow($event, data, switch, 'IsCompleted')\"\r\n                     #switch [value]=\"data.data.IsCompleted\"></dx-switch>\r\n          <div class=\"grid-edit\">\r\n            <dx-button [style.visibility]=\"data.data.QuestionGroup && data.data.ImprovementPlanItemOid && !data.data.IsDisabled ? 'visible' : 'hidden'\"\r\n                     text=\"ADD\"\r\n                     type=\"success\"\r\n                     (onClick)=\"addRowData($event, data)\">\r\n          </dx-button>\r\n          <dx-button [style.visibility]=\"(data.data.ImprovementPlanItemOid && !data.data.IsDisabled ||  !data.data.IsDisabled)? 'visible' : 'hidden'\" text=\"DELETE\"\r\n                     type=\"success\"\r\n                     [disabled]=\"isDeleteClicked === data.rowIndex\"\r\n                     (onClick)=\"deleteRow($event, data) \">\r\n          </dx-button>\r\n          </div>\r\n        </div>\r\n      </dx-data-grid>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./client/app/home/my-actions/capture/capture.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.actions-top-selector-container {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 120px 200px;\n      grid-template-columns: 120px 200px;\n  margin: 15px 0;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 12px; }\n.actions-selector-container {\n  /* display: grid;\r\n  grid-template-columns: 400px 400px;*/\n  margin: 15px 0; }\n.actions-selector-container .selector-wrapper {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 45px 200px;\n        grid-template-columns: 45px 200px;\n    font-size: 12px;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: end; }\n.grid-edit /deep/ dx-button {\n  color: #6BCDFD;\n  background-color: #fff;\n  border: 2px solid #6BCDFD;\n  width: auto;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n  height: 20px;\n  width: 50px;\n  font-size: 8px; }\n.grid-edit /deep/ dx-button:hover {\n    color: #6BCDFD;\n    background-color: #e6e5e5;\n    border-color: #2fb9fc; }\n.grid-edit /deep/ dx-button:hover {\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: auto;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    width: 50px; }\n.grid-edit /deep/ dx-button:hover:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.question-tooltip {\n  font-size: 16px;\n  color: #E3F4FD;\n  font-weight: 400;\n  background-color: #798A93;\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  border-radius: 50%;\n  text-align: center;\n  line-height: 20px;\n  cursor: pointer; }\n.actions-wrapper {\n  background-color: #fff;\n  padding: 20px; }\n.actions-wrapper /deep/ .dx-button-has-text .dx-button-content {\n    padding: 0 7px; }\n.actions-wrapper .characteristic-container {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    font-size: 12px;\n    color: #000; }\n.actions-wrapper .characteristic-container .characteristic-info {\n      position: relative;\n      border: 1px solid #DCDCDC;\n      grid-row: 1 / 3;\n      /* autoprefixer: off */\n      padding: 10px; }\n.actions-wrapper .characteristic-container .characteristic-relevant span {\n      font-size: 14px;\n      color: #989898;\n      margin-bottom: 15px;\n      display: inline-block; }\n.actions-wrapper .characteristic-container .characteristic-description {\n      font-size: 15px;\n      margin-bottom: 15px; }\n.actions-wrapper .characteristic-container .characteristic-info a {\n      font-size: 12px;\n      color: #6BCDFD;\n      text-decoration: underline;\n      cursor: pointer; }\n.actions-wrapper .characteristic-container .characteristic-type-style {\n      font-size: 22px;\n      margin: 0 0 15px;\n      color: #666; }\n.actions-wrapper .characteristic-container .characteristic-type-style .font-bold {\n        font-weight: bold; }\n.actions-wrapper .characteristic-container .characteristic-reference-container {\n      border: 1px solid #DCDCDC;\n      min-width: 36px;\n      text-align: center;\n      grid-row: 1 / 3;\n      padding-top: 10px;\n      font-size: 12px;\n      color: #666;\n      /* autoprefixer: off */ }\n.data-grid-header {\n  margin-left: 5px;\n  color: #fff;\n  border: none;\n  background-color: #6BCDFA;\n  vertical-align: baseline;\n  font-weight: 500;\n  font-size: 11px; }\n.guidance-show {\n  color: #6BCDFA;\n  text-decoration: underline;\n  font-size: 11px;\n  cursor: pointer; }\n.question-guidance {\n  font-size: 12px;\n  font-style: italic;\n  margin-top: 5px; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container {\n  background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container :hover {\n    background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-state-hover {\n  background: #D8D9DB; }\n::ng-deep dx-switch .dx-switch-container {\n  background: #4AD768;\n  border-radius: 22px;\n  border: none;\n  height: 22px; }\n::ng-deep dx-switch .dx-switch-container :hover {\n    background: #4AD768;\n    border-radius: 22px; }\n::ng-deep dx-switch .dx-switch-handle {\n  width: 18px;\n  height: 18px;\n  margin-left: -18px; }\n::ng-deep dx-switch .dx-switch-handle :hover {\n    background-color: #fff; }\n::ng-deep dx-switch .dx-switch-off {\n  color: transparent; }\n::ng-deep dx-switch .dx-switch-handle:before {\n  border-radius: 50%;\n  background-color: #fff !important; }\n::ng-deep dx-switch .dx-state-hover {\n  background: #4AD768; }\n::ng-deep dx-switch .dx-visibility-change-handler {\n  background-color: #fff; }\n::ng-deep dx-switch .dx-switch-on {\n  color: transparent; }\n.actions-table-container /deep/ .dx-header-row td {\n  background-color: #6BCDFA;\n  padding: 10px 0 10px 10px; }\n/deep/ .dx-datagrid-focus-overlay {\n  border-color: transparent; }\n.actions-table-container .actions-toolbar-container /deep/ .dx-texteditor-input {\n  color: #5d5d5d;\n  margin-left: 15px;\n  border: 1px solid silver;\n  border-radius: inherit;\n  width: 87%; }\n/deep/ .dx-placeholder {\n  margin-left: 15px;\n  color: #dfdfdf; }\n.date-color /deep/ dx-date-box .dx-texteditor-input {\n  background-color: red;\n  color: #fff !important; }\n/*\r\n\r\n:host /deep/ .date-color {\r\n  dx-date-box {\r\n    .dx-editor-cell .dx-texteditor .dx-texteditor-container .dx-texteditor-input {\r\n      background-color: red !important;\r\n    }\r\n  }\r\n}*/\n#gridContainer {\n  min-height: 400px;\n  height: calc(100vh - 375px);\n  overflow: auto; }\n.template-view {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 45px 2fr;\n      grid-template-columns: 45px 2fr; }\n@media screen and (max-width: 1396px) {\n  .grid-edit {\n    display: -ms-grid;\n    display: grid;\n    grid-gap: 5px; } }\n"

/***/ }),

/***/ "./client/app/home/my-actions/capture/capture.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsCaptureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__capture_service__ = __webpack_require__("./client/app/home/my-actions/capture/capture.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyActionsCaptureComponent = (function () {
    function MyActionsCaptureComponent(myActionsCaptureService, standardsService, userService, homeService) {
        this.myActionsCaptureService = myActionsCaptureService;
        this.standardsService = standardsService;
        this.userService = userService;
        this.homeService = homeService;
        this.characteristicsList = [];
        this.characteristicCaptureList = [];
    }
    MyActionsCaptureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function () {
            _this.characteristicsList = [];
            _this.currentCharacteristic = [];
            _this.characteristicCaptureList = [];
            _this.getCharacteristics();
        });
        this.getCharacteristics();
    };
    MyActionsCaptureComponent.prototype.getCharacteristics = function () {
        var _this = this;
        this.myActionsCaptureService.getCharacteristics()
            .subscribe(function (characteristicsList) {
            _this.characteristicsList = characteristicsList;
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    MyActionsCaptureComponent.prototype.setCurrentCharacteristic = function (event) {
        var _this = this;
        this.dataGrid.instance.beginCustomLoading('Loading..');
        console.log(event);
        var characteristicByOid$;
        var characteristicCaptureList$;
        this.currentCharacteristicOID = event.selectedItem.Oid;
        var select = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(event.selectedItem.Oid);
        this.characteristicCaptureList = [];
        characteristicByOid$ = select.switchMap(function (characteristicOid) {
            return _this.standardsService.getCharacteristicByOid(characteristicOid);
        });
        characteristicCaptureList$ = select.switchMap(function (characteristicOid) {
            return _this.myActionsCaptureService.getCharacteristicCaptureList(characteristicOid);
        });
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin([characteristicByOid$, characteristicCaptureList$])
            .subscribe(function (result) {
            _this.currentCharacteristic = result[0];
            _this.getByCompleteCharacteristicList(_this.completeFilter, result[1]);
            console.log(result);
        });
    };
    MyActionsCaptureComponent.prototype.setPeriod = function (event) {
        var _this = this;
        this.dateFilter = event.selectedItem;
        if (!this.currentCharacteristicOID)
            return;
        this.dateFilter = event.selectedItem;
        this.characteristicCaptureList = [];
        this.myActionsCaptureService.getCharacteristicCaptureListWithFilter(this.dateFilter, this.currentCharacteristicOID)
            .subscribe(function (characteristicCaptureList) {
            _this.getByCompleteCharacteristicList(_this.completeFilter, characteristicCaptureList);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            _this.dataGrid.instance.endCustomLoading();
        });
        console.log(event);
    };
    MyActionsCaptureComponent.prototype.setIsCompleted = function (event) {
        var _this = this;
        this.completeFilter = event.selectedItem;
        if (!this.currentCharacteristicOID)
            return;
        this.characteristicCaptureList = [];
        console.log(event);
        this.myActionsCaptureService.getCharacteristicCaptureList(this.currentCharacteristicOID)
            .subscribe(function (characteristicCaptureList) {
            _this.getByCompleteCharacteristicList(_this.completeFilter, characteristicCaptureList);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            _this.dataGrid.instance.endCustomLoading();
        });
    };
    MyActionsCaptureComponent.prototype.getByCompleteCharacteristicList = function (completeFilter, characteristicCaptureList) {
        if (this.completeFilter === 'ALL') {
            this.characteristicCaptureList = characteristicCaptureList;
        }
        if (this.completeFilter === 'COMPLETE') {
            this.characteristicCaptureList = characteristicCaptureList.filter(function (item) { return item.IsCompleted; });
        }
        if (this.completeFilter === 'INCOMPLETE') {
            this.characteristicCaptureList = characteristicCaptureList.filter(function (item) { return !item.IsCompleted; });
        }
        this.dataGrid.instance.endCustomLoading();
    };
    MyActionsCaptureComponent.prototype.changeIsCompleted = function (event, data) {
        console.log(event, data);
        data.data.IsCompleted = event.value;
    };
    MyActionsCaptureComponent.prototype.toggleGuidancePopup = function (index, guidance) {
        this.isPopupVisibleGuidance = index;
        this.guidance = guidance;
    };
    MyActionsCaptureComponent.prototype.deleteRow = function (event, data) {
        var _this = this;
        this.isDeleteClicked = data.rowIndex;
        console.log(data);
        console.log(event);
        this.myActionsCaptureService.deleteImprovementPlanItems(data.data.ImprovementPlanItemOid)
            .subscribe(function (response) {
            _this.myActionsCaptureService.getCharacteristicCaptureList(_this.currentCharacteristicOID)
                .subscribe(function (characteristicCaptureList) {
                _this.characteristicCaptureList = [];
                _this.getByCompleteCharacteristicList(_this.completeFilter, characteristicCaptureList);
                _this.isDeleteClicked = null;
            });
            console.log(response);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            _this.isDeleteClicked = null;
        });
    };
    MyActionsCaptureComponent.prototype.answerQuestion = function (event, data) {
        console.log(event);
        console.log(data);
        data.data.IsCompleted = event.data;
    };
    MyActionsCaptureComponent.prototype.addNewRow = function (event) {
        console.log(event);
        console.log(this.dataGrid.instance);
    };
    MyActionsCaptureComponent.prototype.updateData = function (event, data) {
        var _this = this;
        console.log(event);
        console.log(data);
        var rowUpdate = {};
        if (data.key.ImprovementPlanItemOid === 0) {
            rowUpdate = {
                QuestionOid: data.key.QuestionOid,
                CharacteristicOid: data.key.CharacteristicOid,
                Actions: data.key.Actions,
                Resposible: data.key.Resposible,
                DueDate: data.key.DueDate,
                Result: data.key.Result,
                IsCompleted: data.key.IsCompleted
            };
        }
        else {
            rowUpdate = {
                QuestionOid: data.key.QuestionOid,
                CharacteristicOid: data.key.CharacteristicOid,
                Actions: data.key.Actions,
                Resposible: data.key.Resposible,
                DueDate: data.key.DueDate,
                Result: data.key.Result,
                IsCompleted: data.key.IsCompleted,
                ImprovementPlanItemOid: data.key.ImprovementPlanItemOid
            };
        }
        console.log(rowUpdate);
        this.myActionsCaptureService.createOrUpdateRow(rowUpdate)
            .subscribe(function (rowData) {
            _this.userService.showUserNotification('Data Was Updated', 'success');
            _this.myActionsCaptureService.getCharacteristicCaptureListWithFilter(_this.dateFilter, _this.currentCharacteristicOID)
                .subscribe(function (characteristicCaptureList) {
                _this.characteristicCaptureList = [];
                _this.getByCompleteCharacteristicList(_this.completeFilter, characteristicCaptureList);
            });
            console.log(rowData);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    MyActionsCaptureComponent.prototype.rowToUpdate = function (rowItem) {
        return {
            QuestionOid: rowItem.QuestionOid,
            CharacteristicOid: rowItem.CharacteristicOid,
            Actions: rowItem.Actions,
            Resposible: rowItem.Resposible,
            DueDate: rowItem.DueDate,
            Result: rowItem.Result,
            IsCompleted: rowItem.IsCompleted,
            IsDisabled: rowItem.IsDisabled
        };
    };
    MyActionsCaptureComponent.prototype.updateRow = function (event, data, cellData, field) {
        var _this = this;
        field === 'IsDisabled' ? data.key[field] = !cellData.value : data.key[field] = cellData.value;
        if (field === 'IsDisabled') {
            if (data.key.QuestionGroup) {
                var disabledQuestionOid = data.key.QuestionOid;
                var disabledStatus = data.key.IsDisabled;
                for (var i = 0; i < this.characteristicCaptureList.length; i++) {
                    if (this.characteristicCaptureList[i].QuestionOid === disabledQuestionOid) {
                        var rowUpdate = {};
                        this.characteristicCaptureList[i].IsDisabled = disabledStatus;
                        rowUpdate = this.rowToUpdate(this.characteristicCaptureList[i]);
                        if (this.characteristicCaptureList[i].ImprovementPlanItemOid !== 0) {
                            rowUpdate['ImprovementPlanItemOid'] = this.characteristicCaptureList[i].ImprovementPlanItemOid;
                        }
                        console.log(rowUpdate);
                        this.myActionsCaptureService.createOrUpdateRow(rowUpdate)
                            .subscribe(function (rowData) {
                            _this.characteristicCaptureList[data.rowIndex].ImprovementPlanItemOid = rowData.body.ImprovementPlanItemOid;
                        }, function (error) {
                            _this.userService.showUserNotification(error.error.Message, 'error');
                        });
                    }
                }
            }
        }
        else {
            var rowUpdate = {};
            rowUpdate = this.rowToUpdate(data.key);
            if (data.key.ImprovementPlanItemOid !== 0) {
                rowUpdate['ImprovementPlanItemOid'] = data.key.ImprovementPlanItemOid;
            }
            console.log(rowUpdate);
            this.myActionsCaptureService.createOrUpdateRow(rowUpdate)
                .subscribe(function (rowData) {
                //this.userService.showUserNotification('Data Was Updated', 'success')
                _this.characteristicCaptureList[data.rowIndex].ImprovementPlanItemOid = rowData.body.ImprovementPlanItemOid;
                console.log(rowData);
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        }
    };
    MyActionsCaptureComponent.prototype.addRowData = function (event, data) {
        console.log('event', event);
        console.log('data', data);
        var newRow = {
            Actions: null,
            CharacteristicOid: data.data.CharacteristicOid,
            DueDate: new Date().toISOString(),
            ImprovementPlanGuidance: null,
            ImprovementPlanItemOid: 0,
            ImprovementPlanQuestion: null,
            IsCompleted: false,
            QuestionGroup: null,
            QuestionOid: data.data.QuestionOid,
            Resposible: null,
            Result: null,
            IsDisabled: false
        };
        this.characteristicCaptureList.splice(data.rowIndex + 1, 0, newRow);
        console.log('newRow', newRow);
        console.log('this.characteristicCaptureList', this.characteristicCaptureList);
    };
    MyActionsCaptureComponent.prototype.compareDates = function (date) {
        var dueDate = new Date(date).setHours(0, 0, 0, 0);
        var currentDate = new Date().setHours(0, 0, 0, 0);
        if (dueDate < currentDate) {
            return true;
        }
        else {
            return false;
        }
    };
    MyActionsCaptureComponent.prototype.ngOnDestroy = function () {
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", Object)
    ], MyActionsCaptureComponent.prototype, "dataGrid", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('characterisricSelectBox'),
        __metadata("design:type", Object)
    ], MyActionsCaptureComponent.prototype, "characterisricSelectBox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dateSelectBox'),
        __metadata("design:type", Object)
    ], MyActionsCaptureComponent.prototype, "dateSelectBox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('completeSelectBox'),
        __metadata("design:type", Object)
    ], MyActionsCaptureComponent.prototype, "completeSelectBox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('evidence'),
        __metadata("design:type", Object)
    ], MyActionsCaptureComponent.prototype, "evidence", void 0);
    MyActionsCaptureComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-my-actions-capture',
            template: __webpack_require__("./client/app/home/my-actions/capture/capture.component.html"),
            styles: [__webpack_require__("./client/app/home/my-actions/capture/capture.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__capture_service__["a" /* MyActionsCaptureService */],
            __WEBPACK_IMPORTED_MODULE_3__standards_standards_service__["a" /* StandardsService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__home_service__["a" /* HomeService */]])
    ], MyActionsCaptureComponent);
    return MyActionsCaptureComponent;
}());



/***/ }),

/***/ "./client/app/home/my-actions/capture/capture.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CharacteristicCaptureList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsCaptureService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CharacteristicCaptureList = (function () {
    function CharacteristicCaptureList() {
    }
    return CharacteristicCaptureList;
}());

var MyActionsCaptureService = (function () {
    function MyActionsCaptureService(httpClient) {
        this.httpClient = httpClient;
    }
    MyActionsCaptureService.prototype.getCharacteristicCaptureList = function (characteristicOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/GetCharacteristicCaptureList(" + characteristicOid + ")");
    };
    MyActionsCaptureService.prototype.getCharacteristics = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/GetCharacteristics");
    };
    MyActionsCaptureService.prototype.getCharacteristicCaptureListOverdue = function (characteristicOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/GetCharacteristicCaptureListOverdue(" + characteristicOid + ")");
    };
    MyActionsCaptureService.prototype.getCharacteristicCaptureListThisMonth = function (characteristicOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/GetCharacteristicCaptureListThisMonth(" + characteristicOid + ")");
    };
    MyActionsCaptureService.prototype.getCharacteristicCaptureListThisYear = function (characteristicOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/GetCharacteristicCaptureListThisYear(" + characteristicOid + ")");
    };
    MyActionsCaptureService.prototype.getCharacteristicCaptureListThisWeek = function (characteristicOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/GetCharacteristicCaptureListThisWeek(" + characteristicOid + ")");
    };
    MyActionsCaptureService.prototype.getCharacteristicCaptureListWithFilter = function (type, characteristicOid) {
        if (type === 'ALL') {
            return this.getCharacteristicCaptureList(characteristicOid);
        }
        if (type === 'OVERDUE') {
            return this.getCharacteristicCaptureListOverdue(characteristicOid);
        }
        if (type === 'THIS WEEK') {
            return this.getCharacteristicCaptureListThisWeek(characteristicOid);
        }
        if (type === 'THIS MONTH') {
            return this.getCharacteristicCaptureListThisMonth(characteristicOid);
        }
        if (type === 'THIS YEAR') {
            return this.getCharacteristicCaptureListThisYear(characteristicOid);
        }
    };
    MyActionsCaptureService.prototype.createOrUpdateRow = function (body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems/CreateOrUpdate", body, { observe: 'response' });
    };
    MyActionsCaptureService.prototype.deleteImprovementPlanItems = function (key) {
        return this.httpClient.delete(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/ImprovementPlanItems(" + key + ")");
    };
    MyActionsCaptureService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], MyActionsCaptureService);
    return MyActionsCaptureService;
}());



/***/ }),

/***/ "./client/app/home/my-actions/current-status/current-status.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  current-status works!\r\n</p>\r\n"

/***/ }),

/***/ "./client/app/home/my-actions/current-status/current-status.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/home/my-actions/current-status/current-status.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsCurrentStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MyActionsCurrentStatusComponent = (function () {
    function MyActionsCurrentStatusComponent() {
    }
    MyActionsCurrentStatusComponent.prototype.ngOnInit = function () {
    };
    MyActionsCurrentStatusComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-current-status',
            template: __webpack_require__("./client/app/home/my-actions/current-status/current-status.component.html"),
            styles: [__webpack_require__("./client/app/home/my-actions/current-status/current-status.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MyActionsCurrentStatusComponent);
    return MyActionsCurrentStatusComponent;
}());



/***/ }),

/***/ "./client/app/home/my-actions/prioritise/prioritise.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"prioritise-wrapper\">\r\n  <div class=\"prioritise-table-container\">\r\n  <div class=\"prioritise-toolbar-container\">\r\n    <div class=\"prioritise-selector-container\">\r\n      <span>Filter by:</span>\r\n      <dx-select-box [dataSource]=\"principleGroupsList\" #dxSelectBox\r\n                     valueExpr=\"OID\"\r\n                     displayExpr=\"ShortTitle\"\r\n                     [value]=\"principleGroupsList.length ? principleGroupsList[0].OID : ''\"\r\n                     (onSelectionChanged)=\"setCurrentPrinsiple($event)\"\r\n                     placeholder=\"\">\r\n      </dx-select-box>\r\n    </div>\r\n    <dx-button\r\n      text=\"RESET LAYOUT\"\r\n      type=\"success\"\r\n      [disabled]=\"dxSelectBox.value === 0\"\r\n      (onClick)=\"resetFilters()\"\r\n    >\r\n    </dx-button>\r\n  </div>\r\n<dx-data-grid #dataGrid\r\n              id=\"gridContainer\"\r\n              noDataText=\"\"\r\n              [showColumnLines]=\"false\"\r\n              [showBorders]=\"false\"\r\n              [showRowLines]=\"true\"\r\n              [hoverStateEnabled]=\"true\"\r\n              [wordWrapEnabled]=\"true\"\r\n              [dataSource]=priorCharacteristicsByPrincipleGroup\r\n              keyExpr=\"OID\"\r\n              [scrolling]=\"true\"\r\n>\r\n  <dxo-scrolling mode=\"standard\"></dxo-scrolling>\r\n  <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n  <dxo-editing\r\n    mode=\"batch\"\r\n    [allowUpdating]=\"false\">\r\n  </dxo-editing>\r\n  <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"Reference\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              cellTemplate=\"characteristicRefTemplate\"\r\n              [allowEditing]=\"false\"\r\n              [width]=\"50\" caption=\"REF\"\r\n\r\n  ></dxi-column>\r\n <!-- <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"Dimension\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              [allowEditing]=\"false\"\r\n              caption=\"DIMENSION\"\r\n  >\r\n  </dxi-column>-->\r\n  <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"Title\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              cellTemplate=\"characteristicTemplate\"\r\n              [allowEditing]=\"false\"\r\n              caption=\"CHARACTERISTIC\"\r\n  >\r\n  </dxi-column>\r\n  <div *dxTemplate=\"let data of 'characteristicTemplate'\" >\r\n    <p class=\"characteristic-style\">{{data.data.Title}}</p>\r\n  </div>\r\n  <div *dxTemplate=\"let data of 'characteristicRefTemplate'\" >\r\n    <p class=\"characteristic-style\">{{data.data.Reference}}</p>\r\n  </div>\r\n  <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"Risks\"\r\n              cellTemplate=\"riskCellTemplate\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              [allowEditing]=\"false\"\r\n              caption=\"RISK\"\r\n              [width]=\"250\"\r\n  >\r\n  </dxi-column>\r\n  <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"AssessmentScore\"\r\n              cellTemplate=\"assessmentScoreCellTemplate\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              [allowEditing]=\"false\"\r\n              caption=\"SELF ASSESS\"\r\n  >\r\n  </dxi-column>\r\n  <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"IndicatorScore\"\r\n              cellTemplate=\"indicatorScoreCellTemplate\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              [allowEditing]=\"false\"\r\n              caption=\"INDICATOR\"\r\n  >\r\n  </dxi-column>\r\n  <dxi-column [allowSorting]=\"true\"\r\n              dataField=\"IsPrior\"\r\n              cellTemplate=\"isPriorCellTemplate\"\r\n              headerCellTemplate=\"titleHeaderTemplate\"\r\n              [allowEditing]=\"false\"\r\n              caption=\"PRIORITISE\"\r\n              [width]=\"100\"\r\n  >\r\n  </dxi-column>\r\n  <div *dxTemplate=\"let info of 'titleHeaderTemplate' \" >\r\n    <p class=\"data-grid-header\">{{info.column.caption}}</p>\r\n  </div>\r\n  <div *dxTemplate=\"let data of 'riskCellTemplate'\" >\r\n    <span class=\"risk-column\" id=\"risk{{data.rowIndex}}\"\r\n          (mouseenter)=\"toggleRiskPopup(data.rowIndex, data.data.Risks)\"\r\n          (mouseleave)=\"toggleRiskPopup(null)\">{{data.data.Risks ? data.data.Risks.substring(0, 40)+'...' : ''}} </span>\r\n    <dx-popover class=\"light-assess-popup-wrapper\"\r\n                target=\"#risk{{data.rowIndex}}\"\r\n                position=\"top\"\r\n                [width]=\"400\"\r\n                [visible]=\"isPopupVisibleRisk === data.rowIndex\">\r\n      <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-risk-content\">\r\n        <span>{{riskStatement}}</span>\r\n      </div>\r\n      <dxo-animation>\r\n        <dxo-show\r\n          type=\"pop\"\r\n          [from]=\"{ scale: 0 }\"\r\n          [to]=\"{ scale: 1 }\"></dxo-show>\r\n        <dxo-hide\r\n          type=\"fade\"\r\n          [from]=\"1\"\r\n          [to]=\"0\"></dxo-hide>\r\n      </dxo-animation>\r\n    </dx-popover>\r\n  </div>\r\n  <div *dxTemplate=\"let data of 'characteristicTemplate'\">\r\n    <span id=\"char{{data.rowIndex}}\" (mouseenter)=\"toggleCharPopup(data.rowIndex, data.data.Statement, data.data.Title, data)\"\r\n          (mouseleave)=\"toggleCharPopup(null)\" class=\"characteristic-style\">{{data.data.Title}}</span>\r\n\r\n    <dx-popover class=\"light-assess-popup-wrapper\"\r\n                target=\"#char{{data.rowIndex}}\"\r\n                position=\"top\"\r\n                [width]=\"400\"\r\n                [visible]=\"isPopupVisibleChar === data.rowIndex\">\r\n      <div *dxTemplate=\"let data = model of 'content'\" class=\"popover-risk-content\">\r\n        <h3>{{charStatement.title | uppercase}}</h3>\r\n        <span>{{charStatement.statement}}</span>\r\n      </div>\r\n      <dxo-animation>\r\n        <dxo-show\r\n          type=\"pop\"\r\n          [from]=\"{ scale: 0 }\"\r\n          [to]=\"{ scale: 1 }\"></dxo-show>\r\n        <dxo-hide\r\n          type=\"fade\"\r\n          [from]=\"1\"\r\n          [to]=\"0\"></dxo-hide>\r\n      </dxo-animation>\r\n    </dx-popover>\r\n  </div>\r\n\r\n    <div *dxTemplate=\"let data of 'assessmentScoreCellTemplate'\" class=\"self-assess-col\">\r\n     <!-- <div class=\"assessment-score-item red\">\r\n        <dx-bullet *ngIf=\"data.data.AssessmentScore < 0\"\r\n                   [endScaleValue]=\"0\"\r\n                   [value]=\"data.data.AssessmentScore\"\r\n                   [color]=\"'#f00'\">\r\n        </dx-bullet>\r\n      </div>-->\r\n     <!-- <div class=\"assessment-score-item green\">-->\r\n        <dx-bullet\r\n                   [endScaleValue]=\"100\"\r\n                   [showZeroLevel]=\"false\"\r\n                   [value]=\"data.data.AssessmentScore\"\r\n                   [color]=\"'#2ab71b'\">\r\n        </dx-bullet>\r\n      <span>{{data.data.AssessmentScore}}%</span>\r\n   <!--   </div>-->\r\n    </div>\r\n  <div *dxTemplate=\"let data of 'indicatorScoreCellTemplate' \" class=\"assessment-score-wrapper\">\r\n    <div class=\"assessment-score-item red\">\r\n      <dx-bullet *ngIf=\"data.data.IndicatorScore < 0\"\r\n                 [endScaleValue]=\"0\"\r\n                 [value]=\"data.data.IndicatorScore\"\r\n                 [color]=\"'#f00'\">\r\n      </dx-bullet>\r\n    </div>\r\n\r\n    <div class=\"assessment-score-item green\">\r\n      <dx-bullet *ngIf=\"data.data.IndicatorScore > 0\"\r\n                 [endScaleValue]=\"100\"\r\n                 [showZeroLevel]=\"false\"\r\n                 [value]=\"data.data.IndicatorScore\"\r\n                 [color]=\"'#2ab71b'\">\r\n      </dx-bullet>\r\n    </div>\r\n  </div>\r\n  <div *dxTemplate=\"let data of 'isPriorCellTemplate' \" [ngClass]=\"{'not-relevant': !data.data.IsPrior}\">\r\n    <dx-switch (onValueChanged)=\"changeCharacteristicPrior($event, data)\"\r\n               #switch [value]=\"data.data.IsPrior\"></dx-switch>\r\n  </div>\r\n\r\n</dx-data-grid>\r\n\r\n</div>\r\n  <div class=\"prioritise-container\">\r\n    <div class=\"prioritise-container-header\">TOP PRIORITISES\r\n    </div>\r\n    <div class=\"active-categories-view\">\r\n      <div class=\"active-categories-list-item\" *ngFor=\"let characteristic of topPriorByPrincipleGroup; let index = index\" [ngStyle]=\"{'background-color': selectedCharacteristic?.OID === characteristic?.OID ? '#F3F3F3' : '#fff'}\" (click)=\"setClickableCharacteristic(characteristic, index)\">\r\n        <span>{{index+1}}</span><span class=\"active-category-name\">{{characteristic?.Title}}</span>\r\n        <i class=\"material-icons\">\r\n          keyboard_arrow_right\r\n        </i>\r\n      </div>\r\n      <div class=\"clickable-icons-wrapper\">\r\n        <i class=\"material-icons clickable-icon\" (click)=\"moveTop()\">\r\n          keyboard_arrow_up\r\n        </i>\r\n        <i class=\"material-icons clickable-icon\" (click)=\"moveDown()\">\r\n          keyboard_arrow_down\r\n        </i>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/my-actions/prioritise/prioritise.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.prioritise-toolbar-container {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 5fr 1fr;\n      grid-template-columns: 5fr 1fr;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline; }\n.prioritise-toolbar-container .prioritise-selector-container {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 100px 200px;\n        grid-template-columns: 100px 200px;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    font-size: 14px; }\n.prioritise-toolbar-container /deep/ dx-button {\n    color: #6BCDFD;\n    background-color: #fff;\n    border: 2px solid #6BCDFD;\n    width: 170px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    height: 40px;\n    margin-bottom: 10px;\n    float: right; }\n.prioritise-toolbar-container /deep/ dx-button:hover {\n      color: #6BCDFD;\n      background-color: #e6e5e5;\n      border-color: #2fb9fc; }\n.prioritise-toolbar-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD;\n      width: 170px;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.prioritise-toolbar-container /deep/ dx-button:hover:hover {\n        color: #fff;\n        background-color: #39bcfc;\n        border-color: #2fb9fc; }\n.characteristic-style {\n  color: #667892;\n  font-size: 12px;\n  overflow: hidden; }\n.prioritise-wrapper {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 3fr 1fr;\n      grid-template-columns: 3fr 1fr;\n  grid-gap: 20px;\n  margin-top: 35px; }\n.prioritise-wrapper .prioritise-table-container {\n    padding: 20px;\n    background-color: #fff;\n    margin-bottom: 15px; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid-rowsview {\n      border: none; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-header-row > td {\n      background-color: #6BCDFA;\n      position: relative; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-header-row > td[aria-label*=\"SELF ASSESS\"], .prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-header-row > td[aria-label*=\"INDICATOR\"], .prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-header-row > td[aria-label*=\"PRIORITISE\"] {\n      text-align: center !important;\n      border-left: 10px solid #fff; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-header-row > td[aria-label*=\"PRIORITISE\"] {\n      background-color: #6ACA70; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"PRIORITISE\"] .dx-template-wrapper {\n      text-align: right;\n      padding-right: 15px; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row > td {\n      padding: 8px 5px; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"SELF ASSESS\"], .prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"INDICATOR\"], .prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"PRIORITISE\"] {\n      border-left: 10px solid #fff;\n      padding: 8px 5px;\n      -webkit-box-shadow: inset 1px 0px 0px 0px #eeeeee, inset -2px 0 0 -1px #eee;\n              box-shadow: inset 1px 0px 0px 0px #eeeeee, inset -2px 0 0 -1px #eee; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"INDICATOR\"] {\n      position: relative; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"INDICATOR\"]:after {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 50%;\n        -webkit-transform: translateX(-50%);\n        transform: translateX(-50%);\n        background-color: #eee;\n        width: 1px;\n        height: 100%;\n        display: block; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"REF\"] {\n      -webkit-box-shadow: inset 1px 0px 0px 0px #eeeeee;\n              box-shadow: inset 1px 0px 0px 0px #eeeeee; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row.dx-row-lines > td[aria-label*=\"RISK\"] {\n      -webkit-box-shadow: inset -2px 0 0 -1px #eee;\n              box-shadow: inset -2px 0 0 -1px #eee; }\n.prioritise-wrapper .prioritise-table-container /deep/ .dx-datagrid .dx-row > td > .dx-template-wrapper {\n      text-align: left; }\n.prioritise-wrapper .prioritise-container-header {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    height: 50px;\n    padding: 15px;\n    background-color: #C7EBFB;\n    color: #fff;\n    font-weight: bold; }\n.prioritise-wrapper .risk-column {\n    font-size: 12px;\n    color: #666666;\n    /* width: 250px;\r\n   white-space: nowrap;\r\n   overflow: hidden;\r\n   text-overflow: ellipsis*/ }\n.prioritise-wrapper .data-grid-header {\n    color: #fff; }\n@media all and (max-width: 1390px) {\n  .prioritise-wrapper {\n    -ms-grid-columns: 100%;\n        grid-template-columns: 100%; } }\n#gridContainer {\n  min-height: 400px;\n  max-height: calc(100vh - 270px);\n  overflow: auto; }\n.prioritise-container {\n  background-color: #fff;\n  margin-bottom: 15px; }\n.active-categories-view {\n  padding: 15px 30px 14px 35px;\n  background-color: #fff;\n  position: relative; }\n.active-categories-list-item {\n  padding: 8px 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 20px 2fr 20px;\n      grid-template-columns: 20px 2fr 20px;\n  -webkit-transition: all .25s linear;\n  transition: all .25s linear;\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n  border-bottom: 1px solid #EEEEEE; }\n.active-categories-list-item:hover {\n    background-color: #F3F3F3; }\n.active-categories-list-item span {\n    color: #999999;\n    font-size: 12px;\n    font-weight: 700; }\n.active-categories-list-item .list-number {\n    margin-right: 15px;\n    padding-top: 5px; }\n.active-categories-list-item .active-category-name {\n    font-weight: 400;\n    padding-top: 5px;\n    text-transform: none; }\n.active-categories-list-item .active-category-answer-number {\n    width: 30px;\n    height: 20px;\n    text-align: center;\n    line-height: 20px;\n    color: #fff;\n    background-color: #D8D8D8;\n    border-radius: 10px; }\n.active-categories-list-item .active-category-answer-number.unnanswered {\n      background-color: #D65451; }\n.active-categories-list-item i {\n    line-height: 20px;\n    color: #D8D8D8;\n    font-size: 20px; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container {\n  background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-switch-container :hover {\n    background: #D8D9DB; }\n:host /deep/ .not-relevant dx-switch .dx-state-hover {\n  background: #D8D9DB; }\n::ng-deep dx-switch .dx-switch-container {\n  background: #4AD768;\n  border-radius: 22px;\n  border: none;\n  height: 22px; }\n::ng-deep dx-switch .dx-switch-container :hover {\n    background: #4AD768;\n    border-radius: 22px; }\n::ng-deep dx-switch .dx-switch-handle {\n  width: 18px;\n  height: 18px;\n  margin-left: -18px; }\n::ng-deep dx-switch .dx-switch-handle :hover {\n    background-color: #fff; }\n::ng-deep dx-switch .dx-switch-off {\n  color: transparent; }\n::ng-deep dx-switch .dx-switch-handle:before {\n  border-radius: 50%;\n  background-color: #fff !important; }\n::ng-deep dx-switch .dx-state-hover {\n  background: #4AD768; }\n::ng-deep dx-switch .dx-visibility-change-handler {\n  background-color: #fff; }\n::ng-deep dx-switch .dx-switch-on {\n  color: transparent; }\n.assessment-score-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start; }\n.assessment-score-wrapper .assessment-score-item:first-child {\n    border-right: 1px solid #eee; }\n.assessment-score-item {\n  width: 50%; }\n.assessment-score-item.red {\n    padding-right: 5px; }\n.assessment-score-item.green {\n    padding-left: 5px; }\n.self-assess-col {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 25px;\n      grid-template-columns: auto 25px;\n  font-size: 12px;\n  color: #666666; }\n.popover-risk-content {\n  background-color: #666666; }\n.popover-risk-content:after {\n    border-color: #666666 transparent transparent transparent; }\n.clickable-icons-wrapper {\n  position: absolute;\n  right: 0px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n.clickable-icons-wrapper .clickable-icon {\n    cursor: pointer;\n    display: block;\n    border: 2px solid #eee;\n    margin-bottom: 40px; }\n/deep/ .dx-datagrid .dx-column-indicators {\n  color: #fff;\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n"

/***/ }),

/***/ "./client/app/home/my-actions/prioritise/prioritise.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsPrioritiseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prioritise_service__ = __webpack_require__("./client/app/home/my-actions/prioritise/prioritise.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_reporting_service__ = __webpack_require__("./client/app/shared/services/reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyActionsPrioritiseComponent = (function () {
    function MyActionsPrioritiseComponent(prioritiseService, userService, reportingService, homeService, registrationSettingsService) {
        this.prioritiseService = prioritiseService;
        this.userService = userService;
        this.reportingService = reportingService;
        this.homeService = homeService;
        this.registrationSettingsService = registrationSettingsService;
        this.priorCharacteristicsByPrincipleGroup = [];
        this.topPriorByPrincipleGroup = [];
        this.principleGroupsList = [];
        this.selectedFilterItem = 0;
        this.isSelectedCharacteristic = false;
        this.charStatement = {};
        this.currentPrinsipleSelector = 0;
        this.customizeCharacteristicBarChartLabel = function (arg) {
            return {
                font: { color: '#fff' },
                position: 'inside',
                alignment: 'left',
            };
        };
    }
    MyActionsPrioritiseComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (item) {
            console.log('SELECTORUNIT', item);
            _this.loadData();
        });
        this.loadData();
    };
    MyActionsPrioritiseComponent.prototype.loadData = function () {
        var _this = this;
        setTimeout(function () {
            _this.dataGrid.instance.beginCustomLoading('Loading..');
        }, 0);
        this.prinsipleGroupList$ = this.reportingService.getAllPrincipleGroups()
            .subscribe(function (prinsipleGroupList) {
            prinsipleGroupList.unshift({
                OID: 0,
                ShortTitle: 'MANAGEMENT AREA'
            });
            _this.principleGroupsList = prinsipleGroupList;
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    MyActionsPrioritiseComponent.prototype.setCurrentPrinsiple = function (event) {
        var _this = this;
        this.priorCharacteristicsByPrincipleGroup = [];
        this.topPriorByPrincipleGroup = [];
        this.currentPrinsipleSelector = event.selectedItem.OID;
        this.topPriorByPrincipleGroup$ = this.prioritiseService.getTopPriorByPrincipleGroup(event.selectedItem.OID);
        this.priorCharacteristicsByPrincipleGroup$ = this.prioritiseService.getPriorCharacteristicsByPrincipleGroup(event.selectedItem.OID);
        __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].forkJoin([this.priorCharacteristicsByPrincipleGroup$, this.topPriorByPrincipleGroup$])
            .subscribe(function (result) {
            console.log('result', result);
            _this.priorCharacteristicsByPrincipleGroup = result[0];
            _this.topPriorByPrincipleGroup = result[1];
            console.log('this.priorCharacteristicsByPrincipleGroup', _this.priorCharacteristicsByPrincipleGroup);
            console.log('this.topPriorByPrincipleGroup', _this.topPriorByPrincipleGroup);
            _this.dataGrid.instance.endCustomLoading();
        });
        console.log(event);
    };
    MyActionsPrioritiseComponent.prototype.resetFilters = function () {
        console.log(this.selectedFilterItem);
        this.dxSelectBox.value = 0;
        console.log(this.selectedFilterItem);
    };
    MyActionsPrioritiseComponent.prototype.arrayMax = function (arr) {
        if (arr.length > 1) {
            return arr.reduce(function (p, v) {
                return (p.Order > v.Order ? p.Order : v.Order);
            });
        }
        if (arr.length === 1) {
            return arr[0].Order;
        }
    };
    MyActionsPrioritiseComponent.prototype.changeCharacteristicPrior = function (event, data) {
        var _this = this;
        console.log('relevant', event);
        console.log('data', data);
        if (!event.value) {
            this.prioritiseService.removePriorCharacteristic(data.data.OID)
                .subscribe(function (response) {
                console.log('removeprior', response);
                data.data.IsPrior = false;
                _this.topPriorByPrincipleGroup = _this.topPriorByPrincipleGroup.filter(function (item) { return item.OID !== data.data.OID; });
                console.log('this.topPriorByPrincipleGroup', _this.topPriorByPrincipleGroup);
            });
        }
        if (event.value) {
            this.prioritiseService.addPriorCharacteristic(data.data.OID)
                .subscribe(function (response) {
                console.log('addprior', response);
                console.log(_this.arrayMax(_this.topPriorByPrincipleGroup));
                data.data.IsPrior = true;
                _this.topPriorByPrincipleGroup = [];
                _this.prioritiseService.getTopPriorByPrincipleGroup(_this.currentPrinsipleSelector)
                    .subscribe(function (topPriorByPrincipleGroup) {
                    _this.topPriorByPrincipleGroup = topPriorByPrincipleGroup;
                });
                console.log('this.topPriorByPrincipleGroup', _this.topPriorByPrincipleGroup);
            });
        }
    };
    MyActionsPrioritiseComponent.prototype.setClickableCharacteristic = function (characteristic, index) {
        this.selectedCharacteristic = characteristic;
        this.isSelectedCharacteristic = true;
    };
    MyActionsPrioritiseComponent.prototype.moveTop = function () {
        if (this.isSelectedCharacteristic) {
            if (this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic) > 0) {
                var index = this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic);
                var current = this.topPriorByPrincipleGroup[index];
                var newOrder = this.topPriorByPrincipleGroup[index - 1].Order;
                this.topPriorByPrincipleGroup[index] = this.topPriorByPrincipleGroup[index - 1];
                this.topPriorByPrincipleGroup[index - 1] = current;
                this.selectedCharacteristic = this.topPriorByPrincipleGroup[index - 1];
                console.log(this.selectedCharacteristic);
                var order = {
                    OID: this.selectedCharacteristic.OID,
                    Order: newOrder
                };
                console.log(order);
                this.setPriorCharacteristicOrder$ = this.prioritiseService.setPriorCharacteristicOrder(order)
                    .subscribe(function (response) {
                    console.log(response);
                });
            }
        }
    };
    MyActionsPrioritiseComponent.prototype.moveDown = function () {
        if (this.isSelectedCharacteristic) {
            if (this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic) < this.topPriorByPrincipleGroup.length - 1) {
                var index = this.topPriorByPrincipleGroup.indexOf(this.selectedCharacteristic);
                var current = this.topPriorByPrincipleGroup[index];
                var newOrder = this.topPriorByPrincipleGroup[index + 1].Order;
                console.log(newOrder);
                this.topPriorByPrincipleGroup[index] = this.topPriorByPrincipleGroup[index + 1];
                this.topPriorByPrincipleGroup[index + 1] = current;
                this.selectedCharacteristic = this.topPriorByPrincipleGroup[index + 1];
                console.log(this.selectedCharacteristic);
                var order = {
                    OID: this.selectedCharacteristic.OID,
                    Order: newOrder
                };
                console.log(order);
                this.prioritiseService.setPriorCharacteristicOrder(order)
                    .subscribe(function (response) {
                    console.log(response);
                });
            }
        }
    };
    MyActionsPrioritiseComponent.prototype.toggleCharPopup = function (index, statement, title) {
        this.charStatement.statement = statement;
        this.charStatement.title = title;
        this.isPopupVisibleChar = index;
    };
    MyActionsPrioritiseComponent.prototype.toggleRiskPopup = function (index, statement) {
        this.riskStatement = statement;
        this.isPopupVisibleRisk = index;
    };
    MyActionsPrioritiseComponent.prototype.ngOnDestroy = function () {
        this.prinsipleGroupList$.unsubscribe();
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dxSelectBox'),
        __metadata("design:type", Object)
    ], MyActionsPrioritiseComponent.prototype, "dxSelectBox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", Object)
    ], MyActionsPrioritiseComponent.prototype, "dataGrid", void 0);
    MyActionsPrioritiseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-prioritise',
            template: __webpack_require__("./client/app/home/my-actions/prioritise/prioritise.component.html"),
            styles: [__webpack_require__("./client/app/home/my-actions/prioritise/prioritise.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__prioritise_service__["a" /* MyActionsPrioritiseService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_reporting_service__["a" /* ReportingService */],
            __WEBPACK_IMPORTED_MODULE_5__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_6__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */]])
    ], MyActionsPrioritiseComponent);
    return MyActionsPrioritiseComponent;
}());



/***/ }),

/***/ "./client/app/home/my-actions/prioritise/prioritise.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsPrioritiseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyActionsPrioritiseService = (function () {
    function MyActionsPrioritiseService(httpClient) {
        this.httpClient = httpClient;
    }
    MyActionsPrioritiseService.prototype.getPriorCharacteristicsByPrincipleGroup = function (principleGroupOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetPriorByPrincipleGroup(" + principleGroupOid + ")");
    };
    MyActionsPrioritiseService.prototype.addPriorCharacteristic = function (charOid, body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/AddPriorCharacteristic(" + charOid + ")", body, { observe: 'response' });
    };
    MyActionsPrioritiseService.prototype.removePriorCharacteristic = function (charOid, body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/RemovePriorCharacteristic(" + charOid + ")", body, { observe: 'response' });
    };
    MyActionsPrioritiseService.prototype.getTopPriorByPrincipleGroup = function (principleGroupOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetTopPriorByPrincipleGroup(" + principleGroupOid + ")");
    };
    MyActionsPrioritiseService.prototype.setPriorCharacteristicOrder = function (body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/SetPriorCharacteristicOrder", body, { observe: 'response' });
    };
    MyActionsPrioritiseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], MyActionsPrioritiseService);
    return MyActionsPrioritiseService;
}());



/***/ }),

/***/ "./client/app/home/my-actions/reporting/reporting.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"reports-container\">\r\n  <div class=\"reports-title\">IMPROVEMENT PROGRESS</div>\r\n  <div class=\"reports-top-header\">\r\n    <div class=\"reports-top-header-items medium\">\r\n      <span>Strategic Alignment</span>\r\n      <i class=\"material-icons\">arrow_forward_ios</i>\r\n    </div>\r\n    <div class=\"reports-top-header-items large\">\r\n      <span>Operational Capabilities</span>\r\n      <i class=\"material-icons\">arrow_forward_ios</i>\r\n    </div>\r\n    <div class=\"reports-top-header-items medium\">\r\n      <span>Implementation</span>\r\n      <i class=\"material-icons\">arrow_forward_ios</i>\r\n    </div>\r\n    <div class=\"reports-top-header-items small\">\r\n      <span>Result</span>\r\n    </div>\r\n  </div>\r\n  <dx-data-grid #dataGrid\r\n                id=\"gridContainer\"\r\n                noDataText=\"\"\r\n                [showColumnLines]=\"false\"\r\n                [showBorders]=\"false\"\r\n                [showRowLines]=\"false\"\r\n                [wordWrapEnabled]=\"true\"\r\n                (onInitialized)=\"onInitializedTable($event)\"\r\n                [dataSource]=improvementData\r\n                (onRowRemoving)=\"deleteRow($event)\"\r\n                (onInitNewRow)=\"addNewRow($event)\"\r\n                [scrolling]=\"true\"\r\n                [columns]=\"['CharacteristicRef', 'CharacteristicTitle', QuestionGroupStatuses]\">\r\n    <dxo-scrolling mode=\"standard\"></dxo-scrolling>\r\n    <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n\r\n    <div *dxTemplate=\"let info of 'titleHeaderTemplate' \">\r\n      <p class=\"data-grid-header \">{{info.column.caption}}</p>\r\n    </div>\r\n    <div *dxTemplate=\"let info of 'statusHeaderTemplate' \">\r\n      <p class=\"data-grid-header data-grid-header-rotated\">{{info.column.caption}}</p>\r\n    </div>\r\n\r\n    <dxi-column\r\n      [style]=\"{'font-size': '11px'}\"\r\n      [width]=\"50\"\r\n      dataField='CharacteristicRef'\r\n      caption=\"Ref\"\r\n      headerCellTemplate=\"titleHeaderTemplate\"\r\n      cellTemplate=\"characteristicRefTemplate\"\r\n    ></dxi-column>\r\n    <dxi-column\r\n      [style]=\"{'font-size': '11px'}\"\r\n      [width]=\"150\"\r\n      dataField='CharacteristicTitle'\r\n      caption=\"CHARACTERISTIC\"\r\n      headerCellTemplate=\"titleHeaderTemplate\"\r\n      cellTemplate=\"characteristicTemplate\"\r\n    ></dxi-column>\r\n    <div *dxTemplate=\"let data of 'characteristicTemplate'\">\r\n      <p class=\"characteristic-style\">{{data.data.CharacteristicTitle}}</p>\r\n    </div>\r\n    <div *dxTemplate=\"let data of 'characteristicRefTemplate'\">\r\n      <p class=\"characteristic-style\">{{data.data.CharacteristicRef}}</p>\r\n    </div>\r\n    <div [ngStyle]=\"{'background-color':getCellColor(data.data.QuestionGroupStatuses[data.columnIndex-2])}\"\r\n         *dxTemplate=\"let data of 'dataTemplate'\">\r\n\r\n      <div *ngIf=\"data.data.QuestionGroupStatuses[data.columnIndex-2]===QuestionGroupStatuses.NotStarted\" class=\"cell-style cell-style-na\">\r\n        <span>N/A</span>\r\n      </div>\r\n\r\n      <div *ngIf=\"data.data.QuestionGroupStatuses[data.columnIndex-2]===QuestionGroupStatuses.InProgress\" class=\"cell-style\">\r\n        <i class=\"material-icons\">clear</i>\r\n      </div>\r\n\r\n      <div *ngIf=\"data.data.QuestionGroupStatuses[data.columnIndex-2]===QuestionGroupStatuses.Completed\" class=\"cell-style\">\r\n        <i class=\"material-icons\">done</i>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"status-template\" [ngStyle]=\"{'color':getStatusCellColor(data.data.Status)}\"\r\n         *dxTemplate=\"let data of 'progressTemplate'\">\r\n      <span class=\"status-label status-label-not-in-action-plan\">{{data.data.Status}}%</span>\r\n    </div>\r\n    <div class=\"status-template progress-label\" [ngStyle]=\"{'background-color':getStatusCellColor(data.data.Status)}\"\r\n         *dxTemplate=\"let data of 'statusTemplate'\">\r\n      <span *ngIf=\"data.data.Status ===0\">NOT STARTED</span>\r\n      <span *ngIf=\"data.data.Status > 0 && data.data.Status < 100\">IN PROGRESS</span>\r\n      <span *ngIf=\"data.data.Status >= 100\">COMPLETED</span>\r\n    </div>\r\n    <div class=\"status-wrapper\" *dxTemplate=\"let data of 'statusCellTemplate'\">\r\n    </div>\r\n  </dx-data-grid>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/my-actions/reporting/reporting.component.scss":
/***/ (function(module, exports) {

module.exports = ".reports-container {\n  margin-top: 15px;\n  background-color: #fff;\n  padding: 15px; }\n  .reports-container .reports-title {\n    height: 50px;\n    border: 3px solid #EEEEEF;\n    color: #ccc;\n    font-weight: 700;\n    text-align: center;\n    vertical-align: middle;\n    line-height: 50px;\n    margin-bottom: 15px;\n    margin-left: 200px;\n    max-width: 100%; }\n  .reports-container .reports-top-header {\n    padding: 10px;\n    background-color: #6BCDFA;\n    color: #fff;\n    margin-left: 200px;\n    margin-right: 200px;\n    max-width: 1296px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .reports-container .reports-top-header .reports-top-header-items {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n  .reports-container .reports-top-header .reports-top-header-items.medium {\n        width: 25%; }\n  .reports-container .reports-top-header .reports-top-header-items.large {\n        width: 38%; }\n  .reports-container .reports-top-header .reports-top-header-items.small {\n        width: 12%; }\n  .reports-container .reports-top-header .reports-top-header-items span {\n        width: 90%;\n        text-align: center;\n        font-size: 12px;\n        font-weight: 700; }\n  .reports-container .cell-style {\n    color: #fff;\n    text-align: center;\n    padding: 10px; }\n  .reports-container .cell-style-na {\n      padding: 14px; }\n  .reports-container .characteristic-style {\n    color: #667892;\n    font-size: 11px; }\n  .reports-container .status-template {\n    text-align: center; }\n  .reports-container .data-grid-header {\n    margin-left: 5px;\n    color: #667892;\n    border: none;\n    background-color: transparent;\n    vertical-align: baseline;\n    font-size: 11px; }\n  .reports-container .data-grid-header-rotated {\n    -webkit-transform: rotate(-90deg);\n            transform: rotate(-90deg);\n    -webkit-transform-origin: bottom center;\n            transform-origin: bottom center;\n    padding-left: 15px; }\n  .reports-container .progress-label {\n    height: 20px;\n    padding: 2px;\n    background-color: silver;\n    border-radius: 3px;\n    text-align: center;\n    color: #fff;\n    font-size: 11px;\n    line-height: 20px;\n    margin-left: 10px; }\n  .reports-container /deep/ .dx-header-row td {\n    background-color: #F3F3F3;\n    padding: 10px 0 10px 10px;\n    border-right: 1px solid #eee;\n    border-left: 1px solid #eee; }\n  .reports-container /deep/ .dx-header-row td[aria-label*=\"Progress\"] {\n    overflow: visible !important;\n    background-color: #ffffff !important;\n    position: relative; }\n  .reports-container /deep/ .dx-header-row td[aria-label*=\"Progress\"]:after {\n      content: '';\n      height: 44px;\n      position: absolute;\n      width: 51px;\n      display: block;\n      top: -45px;\n      left: -1px;\n      border-right: 1px solid #eee;\n      border-left: 1px solid #eee;\n      border-top: 1px solid #eee; }\n  .reports-container /deep/ .dx-header-row td[aria-label*=\"Progress\"] .dx-datagrid-text-content {\n      overflow: visible !important; }\n  .reports-container /deep/ .dx-header-row td[aria-label*=\"Status\"] {\n    overflow: visible !important;\n    background-color: #ffffff !important;\n    position: relative; }\n  .reports-container /deep/ .dx-header-row td[aria-label*=\"Status\"]:after {\n      content: '';\n      height: 44px;\n      position: absolute;\n      width: 131px;\n      display: block;\n      top: -45px;\n      left: -1px;\n      border-right: 1px solid #eee;\n      border-left: 1px solid #eee;\n      border-top: 1px solid #eee; }\n  .reports-container /deep/ .dx-header-row td[aria-label*=\"Status\"] .dx-datagrid-text-content {\n      overflow: visible !important;\n      position: absolute;\n      top: -35px;\n      width: 100%;\n      left: 0;\n      text-align: center;\n      border-bottom: 1px solid #eee;\n      padding-bottom: 10px; }\n  /deep/ .dx-datagrid-scroll-container {\n  overflow: visible !important; }\n  /deep/ .dx-datagrid-rowsview td[aria-label*=\"Strategic\"], /deep/ .dx-datagrid-rowsview td[aria-label*=\"Operational\"], /deep/ .dx-datagrid-rowsview td[aria-label*=\"Performance\"], /deep/ .dx-datagrid-rowsview td[aria-label*=\"Management\"], /deep/ .dx-datagrid-rowsview td[aria-label*=\"Adoption\"], /deep/ .dx-datagrid-rowsview td[aria-label*=\"Corrective\"], /deep/ .dx-datagrid-rowsview td[aria-label*=\"Measured\"] {\n  padding: 1px; }\n  #gridContainer {\n  min-height: 400px;\n  max-height: calc(100vh - 270px); }\n"

/***/ }),

/***/ "./client/app/home/my-actions/reporting/reporting.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsReportingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reporting_service__ = __webpack_require__("./client/app/home/my-actions/reporting/reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyActionsReportingComponent = (function () {
    function MyActionsReportingComponent(homeService, myActionsReportingService) {
        this.homeService = homeService;
        this.myActionsReportingService = myActionsReportingService;
        this.improvementData = [];
        this.questionGroupTitles = [];
        this.QuestionGroupStatuses = __WEBPACK_IMPORTED_MODULE_1__reporting_service__["b" /* QuestionGroupStatuses */];
    }
    MyActionsReportingComponent.prototype.ngOnInit = function () {
        var _this = this;
        var questionGroupTitles = this.myActionsReportingService.getQuestionGroupsTitles()
            .subscribe(function (data) {
            console.log(data);
            _this.questionGroupTitles = data;
            for (var i = 0; i < _this.questionGroupTitles.length; i++) {
                _this.dataGrid.instance.addColumn({
                    dataField: _this.questionGroupTitles[i].Title,
                    dataType: "number",
                    cellTemplate: 'dataTemplate',
                    headerCellTemplate: "titleHeaderTemplate",
                });
            }
        });
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (item) {
            console.log('SELECTORUNIT', item);
            _this.questionGroupTitles = [];
            _this.improvementData = [];
            _this.dataGrid.instance.beginCustomLoading('Loading..');
            _this.loadData();
        });
        this.loadData();
    };
    MyActionsReportingComponent.prototype.loadData = function () {
        var _this = this;
        setTimeout(function () {
            _this.dataGrid.instance.beginCustomLoading('Loading..');
        }, 0);
        var improvementReportData = this.myActionsReportingService.getImprovementsReportData()
            .subscribe(function (result) {
            console.log('result', result);
            _this.improvementData = result;
            _this.dataGrid.instance.deleteColumn('Progress');
            _this.dataGrid.instance.deleteColumn('Status');
            console.log(_this.improvementData[0].QuestionGroupStatuses[0]);
            _this.dataGrid.instance.addColumn({
                dataField: "Progress",
                dataType: "number",
                cellTemplate: 'progressTemplate',
                headerCellTemplate: "statusHeaderTemplate",
                width: '50'
            });
            _this.dataGrid.instance.addColumn({
                dataField: "Status",
                dataType: "number",
                cellTemplate: 'statusTemplate',
                headerCellTemplate: "titleHeaderTemplate",
                width: '130'
            });
            _this.dataGrid.instance.endCustomLoading();
        });
    };
    MyActionsReportingComponent.prototype.onInitializedTable = function (event) {
        console.log('TABLE', event);
    };
    MyActionsReportingComponent.prototype.getCellColor = function (cellData) {
        switch (cellData) {
            case 0:
                // return '#DB253F';
                return '#989898';
            case 1:
                return '#FE962C';
            case 2:
                return '#6BC870';
        }
    };
    MyActionsReportingComponent.prototype.getStatusCellColor = function (cellData) {
        if (cellData === 0) {
            return '#DB253F';
        }
        if (cellData > 0 && cellData < 100) {
            return '#FE962C';
        }
        if (cellData >= 100) {
            return '#6BC870';
        }
    };
    MyActionsReportingComponent.prototype.ngOnDestroy = function () {
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", Object)
    ], MyActionsReportingComponent.prototype, "dataGrid", void 0);
    MyActionsReportingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-reporting',
            template: __webpack_require__("./client/app/home/my-actions/reporting/reporting.component.html"),
            styles: [__webpack_require__("./client/app/home/my-actions/reporting/reporting.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_1__reporting_service__["a" /* MyActionsReportingService */]])
    ], MyActionsReportingComponent);
    return MyActionsReportingComponent;
}());



/***/ }),

/***/ "./client/app/home/my-actions/reporting/reporting.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return QuestionGroupStatuses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyActionsReportingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QuestionGroupStatuses;
(function (QuestionGroupStatuses) {
    QuestionGroupStatuses[QuestionGroupStatuses["NotStarted"] = 0] = "NotStarted";
    QuestionGroupStatuses[QuestionGroupStatuses["InProgress"] = 1] = "InProgress";
    QuestionGroupStatuses[QuestionGroupStatuses["Completed"] = 2] = "Completed";
})(QuestionGroupStatuses || (QuestionGroupStatuses = {}));
var MyActionsReportingService = (function () {
    function MyActionsReportingService(httpClient) {
        this.httpClient = httpClient;
    }
    MyActionsReportingService.prototype.getImprovementsReportData = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetImprovementsData");
    };
    MyActionsReportingService.prototype.getQuestionGroupsTitles = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/QuestionGroups/GetLowest");
    };
    MyActionsReportingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], MyActionsReportingService);
    return MyActionsReportingService;
}());



/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"indicator-title-container\"><h5>SELECT DATE PERIOD</h5></div>\r\n<div class=\"left-content\">\r\n  <span class=\"title-for-selector\">\r\n     CHARACTERISTIC:\r\n  </span>\r\n  <div *ngIf=\"characteristicList\">\r\n    <dx-select-box [dataSource]=\"characteristicList\"\r\n                   valueExpr=\"OID\"\r\n                   displayExpr=\"Title\"\r\n                   [value]=\"characteristicList.length ? characteristicList[0].OID : ''\"\r\n                   placeholder=''\r\n                   (onSelectionChanged)=\"setCurrentCharacteristic($event)\">\r\n    </dx-select-box>\r\n  </div>\r\n  <span class=\"title-for-selector\">\r\n     DATA SET:\r\n  </span>\r\n  <div class=\"dx-field-value\">\r\n    <dx-tag-box #multySelector\r\n                (onSelectionChanged)=\"setCurrentDataSetList($event)\"\r\n                [editorOptions]=\"{placeholder: 'ADD TITLE'}\"\r\n                [items]=\"indicatorDataSetList\"\r\n                displayExpr=\"PeriodFrom\"\r\n                valueExpr=\"OID\">\r\n    </dx-tag-box>\r\n  </div>\r\n  <dx-button\r\n    [disabled]=\"!selectedDatasets.length\"\r\n    text=\"SUBMIT FOR REVIEW\"\r\n    [width]=\"200\"\r\n    [height]=\"36\"\r\n    (onClick)=\"isSubmitForReviewPopupVisible = true\">\r\n  </dx-button>\r\n</div>\r\n\r\n<div class=\"data-grid-wrapper\">\r\n  <div class=\"data-grid-container\">\r\n    <div class=\"data-grid-container-header\">{{selectedCharacteristic}}</div>\r\n    <dx-data-grid #dataTable\r\n                  id=\"gridContainer\"\r\n                  [dataSource]=\"testArray1\"\r\n                  noDataText=\"\"\r\n                  [showBorders]=\"true\"\r\n                  (onToolbarPreparing)=\"onToolbarPreparing($event)\"\r\n                  (onEditorPreparing)=\"onEditorPreparing($event)\"\r\n                  (onCellHoverChanged)=\"toggleDefault($event)\"\r\n                  (onRowUpdating)=\"addOrUpdateIndicatorValue($event)\"\r\n                  [hoverStateEnabled]=\"true\"\r\n                  (onSelectionChanged)=\"selectionChanged($event)\"\r\n                  (onRowClick)=\"showRowData($event)\"\r\n                  keyExpr=\"IndicatorOid\">\r\n      <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n      <dxo-editing\r\n        mode=\"batch\"\r\n        [allowUpdating]=\"true\">\r\n      </dxo-editing>\r\n      <dxi-column dataField=\"Title\"\r\n                  caption=\"Indicator\"\r\n                  [showEditorAlways]=\"true\"\r\n                  editCellTemplate=\"titleTemplate\"\r\n                  id=\"title\">\r\n        <div *dxTemplate=\"let templateTitle of 'titleTemplate'\"\r\n             class=\"indicator-title\">\r\n          <span>{{templateTitle.data.Title}}</span>\r\n          <i class=\"material-icons\" *ngIf=\"templateTitle.data.Markup\"\r\n             (click)=\"showGuidance(templateTitle)\"\r\n             id=\"{{templateTitle.data.Title}}\">help_outline</i>\r\n        </div>\r\n      </dxi-column>\r\n      <dxi-column *ngIf=\"selectedDatasets.length\"\r\n                  [calculateDisplayValue]=\"unitOfMeasureValue\"\r\n                  [showEditorAlways]=\"false\"\r\n                  dataField=\"UnitOfMeasurerOid\"\r\n                  caption=\"Unit Of Measure\"\r\n                  editCellTemplate=\"diffCellTemplate\">\r\n      </dxi-column>\r\n      <div *dxTemplate=\"let templateInfo of 'diffCellTemplate' let index = index\">\r\n        <dx-select-box #unitOMSelector\r\n                       [dataSource]=\"templateInfo.data.UnitsOfMeasure\"\r\n                       displayExpr=\"ShortTitle\"\r\n                       valueExpr=\"Oid\"\r\n                       [value]=\"templateInfo.data.UnitOfMeasurerOid ? templateInfo.data.UnitOfMeasurerOid : templateInfo.data.DefaultUOM\"\r\n                       (onValueChanged)=\"onUOMChanged($event, templateInfo)\"></dx-select-box>\r\n      </div>\r\n      <dxi-column\r\n        width=\"130\"\r\n        [showEditorAlways]=\"true\"\r\n        caption=\"Actions\"\r\n        dataField=\"IndicatorNotesCount\"\r\n        editCellTemplate=\"notesCellTemplate\">\r\n      </dxi-column>\r\n      <div *dxTemplate=\"let note of 'notesCellTemplate'\">\r\n        <div class=\"notes-button-container\">\r\n          <div *ngIf=\"note.data.IndicatorNotesCount\"\r\n               class=\"notes-button-label\"\r\n               (click)=\"toOpenNotes($event, note)\"\r\n               [ngClass]=\"{'notes-button-label-zero': !note.data.IndicatorNotesCount}\">{{note.data.IndicatorNotesCount}}\r\n          </div>\r\n          <div *ngIf=\"!note.data.IndicatorNotesCount\"\r\n               class=\"notes-button-label\"\r\n               [ngClass]=\"{'notes-button-label-zero': !note.data.IndicatorNotesCount}\">{{note.data.IndicatorNotesCount}}\r\n          </div>\r\n          <dx-button\r\n            [disabled]=\"selectedDatasets.length === 0\"\r\n            [ngClass]=\"{'zero-notes-style': !note.data.IndicatorNotesCount}\"\r\n            [text]=\"buttonTextNotes\"\r\n            [width]=\"114\"\r\n            [height]=\"32\"\r\n            (onClick)=\"toOpenNotes($event, note)\">\r\n          </dx-button>\r\n        </div>\r\n      </div>\r\n    </dx-data-grid>\r\n  </div>\r\n\r\n  <dx-popup class=\"popup\"\r\n            [width]=\"700\"\r\n            [height]=\"700\"\r\n            [showTitle]=\"true\"\r\n            title=\"NOTES & FEEDBACK RETURN ON INVESTMENT / FARM GATE\"\r\n            [dragEnabled]=\"false\"\r\n            [closeOnOutsideClick]=\"true\"\r\n            [allowUpdating]=\"true\"\r\n            [(visible)]=\"isNotesPopupVisible\">\r\n    <div *dxTemplate=\"let data of 'content'\"\r\n         class=\"popup\">\r\n      <dx-scroll-view>\r\n        <dx-accordion\r\n          [scrollByContent]=\"true\"\r\n          [scrollByThumb]=\"true\"\r\n          [dataSource]=\"notes\"\r\n          [multiple]=\"false\"\r\n          [animationDuration]=\"300\"\r\n          [selectedItems]=\"[notes[0]]\">\r\n          <div *dxTemplate=\"let itemData of 'title' let index = index\">\r\n            <p class=\"accordion-title\">DATA COLLECTION PERIOD: {{itemData.FullPeriod}}</p>\r\n          </div>\r\n          <div #templateContainer\r\n               *dxTemplate=\"let itemData of 'item'\"\r\n               class=\"template\">\r\n            <div #templateContainer\r\n                 class=\"chart-container\">\r\n              <div *ngFor=\"let key of itemData.Notes\"\r\n                   [ngClass]=\"{'message-container' : key.UserFullName !== currentUserFullName}\">\r\n              <span class=\"accordion-name\">\r\n                {{key.UserFullName}}\r\n              </span>\r\n                <div class=\"accordion-message\"\r\n                     [ngClass]=\"{'admin-message' : key.UserFullName !== currentUserFullName}\">\r\n                  {{key.Message}}\r\n                </div>\r\n                <span class=\"accordion-name accordion-date\">\r\n                {{key.Created | date: 'd MMMM y'}}\r\n              </span>\r\n              </div>\r\n            </div>\r\n            <div class=\"text-container\">\r\n              <dx-text-area\r\n                [height]=\"90\"\r\n                [(value)]=\"value\">\r\n              </dx-text-area>\r\n              <div class=\"button-container\"\r\n                   (click)=\"addMessage($event, itemData)\">\r\n                <i class=\"material-icons send-button\">send</i>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </dx-accordion>\r\n      </dx-scroll-view>\r\n    </div>\r\n  </dx-popup>\r\n\r\n  <dx-popup class=\"popup\"\r\n            [width]=\"700\"\r\n            [height]=\"200\"\r\n            [showTitle]=\"true\"\r\n            title=\"{{indicatorGuidance.Title}}\"\r\n            [dragEnabled]=\"false\"\r\n            [closeOnOutsideClick]=\"true\"\r\n            [allowUpdating]=\"true\"\r\n            [(visible)]=\"isIndicatorPopupVisible\">\r\n    <div *dxTemplate=\"let data of 'content'\" class=\"popup\">\r\n      <dx-scroll-view>\r\n        {{indicatorGuidance.Markup}}\r\n      </dx-scroll-view>\r\n    </div>\r\n  </dx-popup>\r\n\r\n  <dx-popup\r\n            [width]=\"600\"\r\n            [height]=\"200\"\r\n            [showTitle]=\"true\"\r\n            title=\"SUBMIT FOR REVIEW\"\r\n            [dragEnabled]=\"false\"\r\n            [closeOnOutsideClick]=\"true\"\r\n            [allowUpdating]=\"true\"\r\n            [(visible)]=\"isSubmitForReviewPopupVisible\">\r\n\r\n    <div *dxTemplate=\"let data of 'content'\">\r\n      <div *ngIf=\"selectedDatasets.length\"\r\n           class=\"datasets-submit-popup\">\r\n        <dx-tag-box #multySelectorForReview\r\n                    class=\"review-selector\"\r\n                    [editorOptions]=\"{placeholder: 'SELECT DATASETS'}\"\r\n                    [items]=\"selectedDatasets\"\r\n                    displayExpr=\"PeriodFrom\"\r\n                    valueExpr=\"OID\"\r\n                    (onSelectionChanged)=\"selectDatasetsForReview($event)\">\r\n        </dx-tag-box>\r\n        <dx-button\r\n          [disabled]=\"!selectedDatasetsForReview.length\"\r\n          text=\"SUBMIT FOR REVIEW SELECTED DATASETS\"\r\n          [width]=\"250\"\r\n          [height]=\"36\"\r\n          (onClick)=\"upateDatasetsGrade()\">\r\n        </dx-button>\r\n      </div>\r\n    </div>\r\n  </dx-popup>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.indicator-title-container h5 {\n  grid-column: 1 / -1;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 1fr;\n      grid-template-columns: auto 1fr;\n  grid-gap: 20px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #666666;\n  font-size: 15px;\n  margin: 24px 0; }\n.indicator-title-container h5:after {\n    display: block;\n    content: '';\n    height: 5px;\n    border-radius: 1px;\n    background: rgba(234, 224, 222, 0.2); }\n.title-for-selector {\n  font-size: 12px; }\n.left-content /deep/ dx-button {\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 200px;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n  font-size: 14px; }\n.left-content /deep/ dx-button:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\n.datasets-submit-popup {\n  display: -ms-grid;\n  display: grid;\n  justify-items: center;\n  -ms-grid-columns: 3fr 1fr;\n      grid-template-columns: 3fr 1fr; }\n.datasets-submit-popup dx-tag-box {\n    width: 100%;\n    margin-right: 15px; }\n.dx-template-wrapper /deep/ dx-button {\n  color: #6BCDFD;\n  background-color: #fff;\n  border: 2px solid #6BCDFD;\n  width: 70px;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n  font-size: 10px;\n  text-align: left; }\n.dx-template-wrapper /deep/ dx-button:hover {\n    color: #6BCDFD;\n    background-color: #e6e5e5;\n    border-color: #2fb9fc; }\n.dx-template-wrapper /deep/ dx-button:hover {\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 70px;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.dx-template-wrapper /deep/ dx-button:hover:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\n.dx-template-wrapper .zero-notes-style {\n  color: #9898A5;\n  background-color: #fff;\n  border: 2px solid #9898A5;\n  width: 70px;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.dx-template-wrapper .zero-notes-style:hover {\n    color: #9898A5;\n    background-color: #e6e5e5;\n    border-color: #777788; }\n.dx-template-wrapper .notes-button-label-zero {\n  background-color: #9898A5 !important;\n  border: none; }\n.indicator-title {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px; }\n.indicator-title i {\n    color: #c0c0c0;\n    font-size: 22px;\n    cursor: pointer; }\n.left-content {\n  width: 80%;\n  display: -ms-grid;\n  display: grid;\n  grid-gap: 15px;\n  -ms-grid-columns: auto auto auto 6fr auto;\n      grid-template-columns: auto auto auto 6fr auto;\n  -webkit-box-pack: left;\n      -ms-flex-pack: left;\n          justify-content: left;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 15px; }\n.left-content span {\n    /* margin-bottom: 15px;*/ }\n.left-content .dx-field-value {\n    width: 100%; }\n/deep/ dx-data-grid .dx-toolbar-after {\n  top: 5px;\n  right: 5px; }\n/deep/ dx-data-grid .dx-datagrid-rowsview .dx-data-row .dx-cell-modified .dx-highlight-outline::after {\n  border: none; }\n.chart-container {\n  height: 380px !important;\n  overflow: auto !important; }\n.text-container {\n  position: absolute;\n  bottom: 0;\n  width: 100%; }\n.accordion-title {\n  font-size: 14px;\n  color: #6BCDFD; }\n.accordion-message {\n  width: 90%;\n  background-color: rgba(243, 243, 243, 0.8);\n  padding: 10px;\n  margin: 10px; }\n.accordion-name {\n  font-size: 12px;\n  margin: 5px;\n  color: silver; }\n.accordion-date {\n  float: right;\n  margin-right: 50px;\n  margin-top: -10px; }\n.admin-message {\n  background-color: #6BCDFA;\n  width: 70%;\n  margin-left: 70px; }\n.text-container {\n  position: relative; }\n.text-container .button-container {\n    width: 40px;\n    height: 40px;\n    border-radius: 50%;\n    background-color: #5FB13F;\n    position: absolute;\n    right: 5px;\n    bottom: 30%;\n    cursor: pointer;\n    text-align: center;\n    padding-top: 12px; }\n.text-container .button-container .send-button {\n      font-size: 15px;\n      color: #fff; }\n.notes-button-container {\n  position: relative;\n  text-align: center; }\n.notes-button-container .notes-button-label {\n    position: absolute;\n    bottom: 26%;\n    right: 15%;\n    width: 25px;\n    height: 16px;\n    border-radius: 40px;\n    background-color: red;\n    color: #fff;\n    font-size: 12px;\n    text-align: center;\n    cursor: pointer; }\n"

/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorDataSetValueComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__indicator_data_set_value_service__ = __webpack_require__("./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var IndicatorDataSetValueComponent = (function () {
    function IndicatorDataSetValueComponent(standardsService, indicatorDataSetValueService, userService) {
        this.standardsService = standardsService;
        this.indicatorDataSetValueService = indicatorDataSetValueService;
        this.userService = userService;
        this.characteristicList = [];
        this.indicatorDataSetList = [];
        this.tooltipVisible = false;
        this.selectedDatasets = [];
        this.selectedDatasetsForReview = [];
        this.selectedCharacteristicOID = null;
        this.testArray1 = [];
        this.buttonTextNotes = 'NOTES';
        this.isNotesPopupVisible = false;
        this.notes = [];
        this.value = '';
        this.isIndicatorPopupVisible = false;
        this.isSubmitForReviewPopupVisible = false;
        this.indicatorGuidance = {};
    }
    IndicatorDataSetValueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserInfo()
            .subscribe(function (user) {
            _this.dataTable.instance.beginCustomLoading('Loading..');
            _this.currentUserFullName = user.body['FirstName'] + " " + user.body['LastName'];
        });
        this.standardsService.getCharacteristicsByStandard()
            .subscribe(function (characteristics) {
            _this.currentStandardId = _this.standardsService.currentStandardId;
            characteristics.map(function (characteristic) {
                _this.characteristicList.push({
                    OID: characteristic['OID'],
                    Title: characteristic['Title']
                });
                _this.selectedCharacteristic = _this.characteristicList[0].Title;
                _this.selectedCharacteristicOID = _this.characteristicList[0].OID;
            });
        });
        this.standardsService.getIndicatorDataSetListByStandardOidFromUnit()
            .subscribe(function (indicatorDataSetList) {
            console.log("indicatorDataSetList", indicatorDataSetList);
            indicatorDataSetList.map(function (indicator) {
                _this.indicatorDataSetList.push({
                    PeriodFrom: (indicator.PeriodFromMonth < 10 ? '0' + indicator.PeriodFromMonth : indicator.PeriodFromMonth) + "-" + indicator.PeriodFromYear + "/" + (indicator.PeriodToMonth < 10 ? '0' + indicator.PeriodToMonth : indicator.PeriodToMonth) + "-" + indicator.PeriodToYear,
                    OID: indicator.OID
                });
            });
            console.log('this.indicatorDataSetList', _this.indicatorDataSetList);
        });
    };
    IndicatorDataSetValueComponent.prototype.onToolbarPreparing = function (e) {
        console.log('onToolbarPreparing', e.toolbarOptions);
        var indexRevertButton = e.toolbarOptions.items.indexOf(e.toolbarOptions.items.find(function (item) {
            return item.name == "revertButton";
        }));
        if (indexRevertButton != -1) {
            e.toolbarOptions.items.splice(indexRevertButton, 1);
        }
    };
    IndicatorDataSetValueComponent.prototype.setCurrentCharacteristic = function (value) {
        var _this = this;
        console.log(" setCurrentCharacteristic", value);
        var dataSetOidArray = [];
        this.selectedDatasets = this.multySelector.selectedItems;
        this.selectedCharacteristic = value.selectedItem.Title;
        this.selectedCharacteristicOID = value.selectedItem.OID;
        for (var i = 0; i < this.selectedDatasets.length; i++) {
            this.dataTable.instance.deleteColumn(this.selectedDatasets[i].OID.toString());
        }
        this.selectedDatasets.map(function (item) {
            dataSetOidArray.push(item.OID);
        });
        var queryParams = {
            "characteristicOid": value.selectedItem.OID,
            "dataSetsOidList": dataSetOidArray
        };
        this.standardsService.getIndicatorsDataSetByCharacteristicAndDataSetList(queryParams)
            .subscribe(function (response) {
            if (response) {
                for (var i = 0; i < _this.selectedDatasets.length; i++) {
                    _this.dataTable.instance.addColumn({
                        caption: _this.selectedDatasets[i].PeriodFrom,
                        dataField: _this.selectedDatasets[i].OID.toString(),
                        dataType: "number"
                    });
                }
                _this.testArray1 = response;
                _this.dataTable.instance.endCustomLoading();
                console.log('getIndicatorsDataSetByCharacteristicAndDataSetList', response);
                console.log('8-this.testArray1', _this.testArray1);
                for (var i = 0; i < _this.testArray1.length; i++) {
                    for (var k = 0; k < _this.testArray1[i].IndicatorValue.length; k++) {
                        if (_this.testArray1[i].IndicatorValue[k].Value === null) {
                            _this.testArray1[i].IndicatorValue[k].DataSetOid = _this.selectedDatasets[k].OID;
                            _this.testArray1[i].IndicatorValue[k].Value = '';
                            console.log('this.testArray1[i].IndicatorValue[k].DataSetOid', _this.testArray1[i].IndicatorValue[k].DataSetOid);
                        }
                        _this.dataTable.instance.cellValue(i, _this.testArray1[i].IndicatorValue[k].DataSetOid.toString(), _this.testArray1[i].IndicatorValue[k].Value);
                        console.log('9-0', i, _this.testArray1[i].IndicatorValue[k].DataSetOid.toString(), _this.testArray1[i].IndicatorValue[k].Value);
                        console.log('9-this.dataTable', _this.dataTable);
                    }
                }
            }
        });
    };
    IndicatorDataSetValueComponent.prototype.onEditorPreparing = function (event) {
        if ((event.dataField == "Title" || event.dataField == "UnitOfMeasurerOid") && event.parentType == "dataRow") {
            event.editorOptions.disabled = !event.row.inserted;
        }
    };
    IndicatorDataSetValueComponent.prototype.addOrUpdateIndicatorValue = function (e) {
        var _this = this;
        var indicatorArray = [];
        var indicatorValue = {};
        var dataSetOidInTable = Object.keys(e.newData);
        console.log('dataSetOidInTable', dataSetOidInTable);
        for (var i = 0; i < this.testArray1.length; i++) {
            if (this.testArray1[i].IndicatorOid === e.key) {
                this.testArray1[i].IndicatorValue.forEach(function (item) {
                    for (var i_1 = 0; i_1 < dataSetOidInTable.length; i_1++) {
                        if (item.DataSetOid.toString() == dataSetOidInTable[i_1]) {
                            var valueOid = item.ValueOid === null ? item.ValueOid = 0 : item.ValueOid;
                            indicatorValue = {
                                "OID": valueOid,
                                "Value": e.newData[dataSetOidInTable[i_1]],
                                "Dataset": item.DataSetOid,
                                "Indicator": e.oldData.IndicatorOid,
                                "UnitOfMeasure": e.newData.UnitOfMeasurerOid ? e.newData.UnitOfMeasurerOid : e.oldData.UnitOfMeasurerOid
                            };
                            indicatorArray.push(indicatorValue);
                        }
                    }
                });
            }
        }
        console.log('indicatorArrayToUpdate', indicatorArray);
        if (indicatorArray.length) {
            this.standardsService.createOrUpdateIndicatorValue(indicatorArray)
                .subscribe(function (updateIndicatorValue) {
                _this.userService.showUserNotification("Values was updated", 'success');
                console.log('updateIndicatorValue', updateIndicatorValue);
                indicatorArray = [];
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        }
    };
    IndicatorDataSetValueComponent.prototype.toggleDefault = function (e) {
        /* if(e.eventType === 'mouseenter' || 'mouseleave') {
           this.tooltipVisible = e.rowIndex;
           this.titleContent = e.data.IndicatorOid
         }*/
        //this.tooltipVisible = !this.tooltipVisible;
        // console.log('TOOLTIP', e);
        //console.log('this.tooltipVisible', this.tooltipVisible);
    };
    IndicatorDataSetValueComponent.prototype.setCurrentDataSetList = function (event) {
        var _this = this;
        if (this.selectedCharacteristicOID) {
            var dataSetOidArray_1 = [];
            this.selectedDatasets = this.multySelector.selectedItems;
            this.selectedDatasets.map(function (item) {
                dataSetOidArray_1.push(item.OID);
            });
            var queryParams = {
                "characteristicOid": this.selectedCharacteristicOID,
                "dataSetsOidList": dataSetOidArray_1
            };
            this.standardsService.getIndicatorsDataSetByCharacteristicAndDataSetList(queryParams)
                .subscribe(function (response) {
                console.log('getIndicatorsDataSetByCharacteristicAndDataSetList', response);
                if (response) {
                    if (event.addedItems.length > 0) {
                        console.log('6-event.addedItems', event.addedItems);
                        console.log(' this.dataTable.instance', _this.dataTable.instance);
                        _this.dataTable.instance.addColumn({
                            caption: event.addedItems[0].PeriodFrom,
                            dataField: event.addedItems[0].OID.toString(),
                            dataType: "number"
                        });
                        _this.testArray1 = response;
                        for (var i = 0; i < _this.testArray1.length; i++) {
                            for (var k = 0; k < _this.testArray1[i].IndicatorValue.length; k++) {
                                if (_this.testArray1[i].IndicatorValue[k].Value === null) {
                                    _this.testArray1[i].IndicatorValue[k].DataSetOid = _this.selectedDatasets[k].OID;
                                    _this.testArray1[i].IndicatorValue[k].Value = '';
                                }
                                _this.dataTable.instance.cellValue(i, _this.testArray1[i].IndicatorValue[k].DataSetOid.toString(), _this.testArray1[i].IndicatorValue[k].Value);
                            }
                        }
                    }
                }
                if (event.removedItems.length > 0) {
                    console.log('10-event.removedItems', event.removedItems);
                    _this.dataTable.instance.deleteColumn(event.removedItems[0].OID.toString());
                    _this.testArray1 = response;
                    for (var i = 0; i < _this.testArray1.length; i++) {
                        for (var k = 0; k < _this.testArray1[i].IndicatorValue.length; k++) {
                            if (_this.testArray1[i].IndicatorValue[k].Value === null) {
                                _this.testArray1[i].IndicatorValue[k].DataSetOid = _this.selectedDatasets[k].OID;
                                _this.testArray1[i].IndicatorValue[k].Value = '';
                            }
                            _this.dataTable.instance.cellValue(i, _this.testArray1[i].IndicatorValue[k].DataSetOid.toString(), _this.testArray1[i].IndicatorValue[k].Value);
                        }
                    }
                }
            });
        }
    };
    IndicatorDataSetValueComponent.prototype.onUOMChanged = function (e, templateInfo) {
        templateInfo.setValue(e.value);
    };
    IndicatorDataSetValueComponent.prototype.unitOfMeasureValue = function (data) {
        var unit;
        var result;
        if (data.UnitsOfMeasure !== null) {
            for (var i = 0; i < data.UnitsOfMeasure.length; i++) {
                if (data.UnitOfMeasurerOid == data.UnitsOfMeasure[i].Oid) {
                    unit = data.UnitsOfMeasure[i].ShortTitle;
                }
            }
        }
        result = data.UnitOfMeasurerOid === null ? data.DefaultUOM : unit;
        return result;
    };
    IndicatorDataSetValueComponent.prototype.selectionChanged = function (event) {
        console.log('cell', event);
    };
    IndicatorDataSetValueComponent.prototype.toOpenNotes = function (event, data) {
        var _this = this;
        this.notes = [];
        this.isNotesPopupVisible = true;
        console.log('click', event);
        console.log('data', data);
        var dataSetOidArray = [];
        this.selectedDatasets.map(function (item) {
            dataSetOidArray.push(item.OID);
        });
        var paramsForNotes = {
            IndicatorOid: data.key,
            IndicatorDataSetOidList: dataSetOidArray
        };
        console.log(' paramsForNotes', paramsForNotes);
        this.standardsService.getIndicatorsNotes(paramsForNotes)
            .subscribe(function (notes) {
            _this.notes = notes;
            console.log('notes', _this.notes);
        });
    };
    IndicatorDataSetValueComponent.prototype.showRowData = function (event) {
        console.log('ROWDATA', event);
    };
    IndicatorDataSetValueComponent.prototype.addMessage = function (event, itemData) {
        var _this = this;
        if (this.value !== '') {
            console.log('event', event);
            console.log('value', this.value);
            console.log('data', itemData);
            var paramForAddNote = {
                Indicator: itemData.IndicatorOid,
                DataSet: itemData.IndicatorDataSetOid,
                Note: this.value
            };
            this.standardsService.addIndicatorsNotes(paramForAddNote)
                .subscribe(function () {
                _this.testArray1.forEach(function (indicator) {
                    if (indicator.IndicatorOid === itemData.IndicatorOid) {
                        indicator.IndicatorNotesCount++;
                    }
                });
                console.log('afterAddmessage', _this.testArray1);
                itemData.Notes.push({
                    Message: _this.value,
                    Created: new Date(),
                    UserFullName: _this.currentUserFullName
                });
                _this.value = '';
            });
        }
    };
    IndicatorDataSetValueComponent.prototype.showGuidance = function (templateTitle) {
        console.log('templateTitle', templateTitle);
        this.indicatorGuidance = templateTitle.data;
        this.isIndicatorPopupVisible = true;
    };
    IndicatorDataSetValueComponent.prototype.selectDatasetsForReview = function (event) {
        if (this.multySelectorForReview) {
            this.selectedDatasetsForReview = this.multySelectorForReview.selectedItems;
            console.log(' console.log(this.selectedDatasetsForReview)', this.selectedDatasetsForReview);
        }
    };
    IndicatorDataSetValueComponent.prototype.upateDatasetsGrade = function () {
        var _this = this;
        var dataSetOidArray = [];
        this.selectedDatasetsForReview.map(function (item) {
            dataSetOidArray.push(item.OID);
        });
        this.indicatorDataSetValueService.updateGradeToUnderReviewState(dataSetOidArray)
            .subscribe(function (response) {
            console.log('response', response);
            _this.userService.showUserNotification('Data Sets was submitted for review', 'success');
            var _loop_1 = function (i) {
                dataSetOidArray.forEach(function (oid) {
                    if (_this.selectedDatasets[i].OID === oid) {
                        _this.selectedDatasets.splice(i, 1);
                        console.log('this.multySelectorForReview.selectedItems', _this.multySelectorForReview.selectedItems);
                        _this.selectedDatasetsForReview = [];
                    }
                });
            };
            for (var i = 0; i < _this.selectedDatasets.length; i++) {
                _loop_1(i);
            }
            console.log('this.selectedDatasets', _this.selectedDatasets);
            _this.isSubmitForReviewPopupVisible = false;
            _this.selectedDatasets = [];
            _this.indicatorDataSetList = [];
            _this.multySelector.value = null;
            console.log('multySelector', _this.multySelector);
            _this.standardsService.getIndicatorDataSetListByStandardOidFromUnit()
                .subscribe(function (indicatorDataSetList) {
                console.log("indicatorDataSetList", indicatorDataSetList);
                indicatorDataSetList.map(function (indicator) {
                    _this.indicatorDataSetList.push({
                        PeriodFrom: (indicator.PeriodFromMonth < 10 ? '0' + indicator.PeriodFromMonth : indicator.PeriodFromMonth) + "-" + indicator.PeriodFromYear + "/" + (indicator.PeriodToMonth < 10 ? '0' + indicator.PeriodToMonth : indicator.PeriodToMonth) + "-" + indicator.PeriodToYear,
                        OID: indicator.OID
                    });
                });
                console.log(' this.indicatorDataSetList', _this.indicatorDataSetList);
            });
        });
        console.log('dataSetOidArray', dataSetOidArray);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataTable'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxDataGridComponent"])
    ], IndicatorDataSetValueComponent.prototype, "dataTable", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelector'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxTagBoxComponent"])
    ], IndicatorDataSetValueComponent.prototype, "multySelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelectorForReview'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxTagBoxComponent"])
    ], IndicatorDataSetValueComponent.prototype, "multySelectorForReview", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('unitOMSelector'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_devextreme_angular__["DxSelectBoxComponent"])
    ], IndicatorDataSetValueComponent.prototype, "unitOMSelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('templateContainer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], IndicatorDataSetValueComponent.prototype, "templateContainer", void 0);
    IndicatorDataSetValueComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-indicator-data-set-value',
            template: __webpack_require__("./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.html"),
            styles: [__webpack_require__("./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__standards_standards_service__["a" /* StandardsService */],
            __WEBPACK_IMPORTED_MODULE_2__indicator_data_set_value_service__["a" /* IndicatorDataSetValueService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */]])
    ], IndicatorDataSetValueComponent);
    return IndicatorDataSetValueComponent;
}());



/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set-value/indicator-data-set-value.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorDataSetValueService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndicatorDataSetValueService = (function () {
    function IndicatorDataSetValueService(httpClient) {
        this.httpClient = httpClient;
    }
    IndicatorDataSetValueService.prototype.updateGradeToUnderReviewState = function (params) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorDataSets/UpdateGradeToUnderReviewState", params, { observe: 'response' });
    };
    IndicatorDataSetValueService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], IndicatorDataSetValueService);
    return IndicatorDataSetValueService;
}());



/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"indicator-data-contaner\">\r\n  <dx-button (onClick)=\"showFormPopup()\"\r\n             text=\"ADD NEW DATA SET\"\r\n             type=\"success\">\r\n  </dx-button>\r\n  <div class=\"data-grid-wrapper\" id=\"grid-wrapper\">\r\n    <div class=\"data-grid-container\">\r\n      <div class=\"data-grid-container-header\">STATUS</div>\r\n      <dx-data-grid id=\"gridContainer\" #dxDataGridComponent\r\n                    [dataSource]=\"indicatorList\"\r\n                    [showBorders]=\"true\"\r\n                    noDataText=\"\"\r\n                    keyExpr=\"OID\">\r\n        <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n        <dxo-editing mode=\"form\">\r\n          <dxo-popup\r\n            [width]=\"700\"\r\n            [height]=\"345\"\r\n            [position]=\"{ my: 'top', at: 'top', of: 'window' }\">\r\n          </dxo-popup>\r\n        </dxo-editing>\r\n        <dxi-column [width]=\"80\"\r\n                    dataField=\"PeriodFrom\"\r\n                    caption=\"From\"\r\n                    [calculateCellValue]=\"calculatePeriodFrom\">\r\n          <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n        </dxi-column>\r\n        <dxi-column [width]=\"80\"\r\n                    caption=\"To\"\r\n                    [calculateCellValue]=\"calculatePeriodTo\">\r\n          <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n        </dxi-column>\r\n        <dxi-column [width]=\"80\"\r\n                    dataField=\"GradeShortTitle\"\r\n                    caption=\"Grading\">\r\n          <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n        </dxi-column>\r\n        <dxi-column dataField=\"Progress\" caption=\"Completed\" cellTemplate=\"progressBarTemplate\">\r\n        </dxi-column>\r\n        <div *dxTemplate=\"let d of 'progressBarTemplate'\">\r\n          <div style=\"font-size: 10px\">Progress {{d.data.Progress}}%</div>\r\n          <dx-progress-bar #progressBar\r\n                           id=\"progress-bar-status\"\r\n                           [showStatus]=\"false\"\r\n                           width=\"90%\"\r\n                           [min]=\"0\"\r\n                           [max]=\"100\"\r\n                           [value]=\"d.data.Progress\">\r\n          </dx-progress-bar>\r\n        </div>\r\n        <dxi-column [width]=\"100\" dataField=\"State\" caption=\"Status\" cellTemplate=\"stateTemplate\">\r\n          <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n        </dxi-column>\r\n        <div *dxTemplate=\"let status of 'stateTemplate'\">\r\n          <div [ngSwitch]=\"status.data.State\">\r\n            <p *ngSwitchCase=\"SpaDataSetState.NotStarted\">\r\n              Not Started</p>\r\n            <p *ngSwitchCase=\"SpaDataSetState.InProgress\">\r\n              In Progress</p>\r\n            <p *ngSwitchCase=\"SpaDataSetState.Completed\">\r\n              Completed</p>\r\n          </div>\r\n        </div>\r\n        <dxi-column dataField=\"Comment\" caption=\"Comment\">\r\n          <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n        </dxi-column>\r\n\r\n      </dx-data-grid>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--<dx-load-panel\r\n  #loadPanel\r\n  shadingColor=\"rgba(0,0,0,0.4)\"\r\n  [position]=\"{ of: '#grid-wrapper' }\"\r\n  [(visible)]=\"loadingVisible\"\r\n  [showIndicator]=\"true\"\r\n  [showPane]=\"true\"\r\n  [shading]=\"true\"\r\n  [closeOnOutsideClick]=\"false\">\r\n</dx-load-panel>-->\r\n<dx-popup #dxForm\r\n          [width]=\"600\"\r\n          [height]=\"400\"\r\n          [showTitle]=\"true\"\r\n          title=\"Add Data Set\"\r\n          [dragEnabled]=\"false\"\r\n          [closeOnOutsideClick]=\"true\"\r\n          [allowUpdating]=\"true\"\r\n          [(visible)]=\"isCreateDataSetPopupVisible\"\r\n>\r\n  <div *dxTemplate=\"let data of 'content'\">\r\n    <form class=\"indicator-set-form\" (submit)=\"onFormSubmitCreateDataSet($event)\">\r\n      <dx-form #createDataSetForm\r\n        [formData]=\"newDataSet\"\r\n        [readOnly]=\"false\"\r\n        [showColonAfterLabel]=\"true\"\r\n        [showValidationSummary]=\"true\"\r\n        validationGroup=\"addDataSet\"\r\n      >\r\n       <!-- <dxi-item dataField=\"Title\"\r\n                  [label]=\"{text: 'Standard'}\"\r\n                  [disabled]=\"true\">\r\n        </dxi-item>\r\n        <dxi-item dataField=\"Standard\"\r\n                  [visible]=\"false\"\r\n                  [value]=\"currentStandardId\"\r\n                  [disabled]=\"true\">\r\n        </dxi-item>-->\r\n        <dxi-item itemType=\"group\" caption=\"Period\" [colCount]=\"4\">\r\n          <dxi-item [label]=\"{text: 'From'}\">\r\n            <dx-select-box dataField=\"PeriodFromMonth\" #periodFromMonthSelector\r\n                           [items]=\"monthArray\"\r\n                           [value]=\"monthArray[0]\"\r\n                           (onValueChanged)=\"showChangesFromMonth($event)\"\r\n            ></dx-select-box>\r\n          </dxi-item>\r\n          <dxi-item>\r\n            <dx-select-box dataField=\"PeriodFromYear\" #periodFromYearSelector\r\n                           [items]=\"yearArray\"\r\n                           [(value)]=\"maxPeriodByUnitFrom ? maxPeriodByUnitFrom : yearArray[0]\"\r\n                           (onValueChanged)=\"showChangesFromYear($event)\"\r\n            ></dx-select-box>\r\n          </dxi-item>\r\n\r\n          <dxi-item [label]=\"{text: 'To'}\">\r\n            <dx-select-box dataField=\"PeriodToMonth\" #periodToMonthSelector\r\n                           [items]=\"monthArray\"\r\n                           [value]=\"monthArray[0]\"\r\n                           (onValueChanged)=\"showChangesToMonth($event)\"\r\n            ></dx-select-box>\r\n          </dxi-item>\r\n          <dxi-item>\r\n            <dx-select-box dataField=\"PeriodToYear\" #periodToYearSelector\r\n                           [items]=\"yearArray\"\r\n                           [value]=\"maxPeriodByUnitFrom ? maxPeriodByUnitFrom + 1: yearArray[1]\"\r\n                           (onValueChanged)=\"showChangesToYear($event)\"\r\n            ></dx-select-box>\r\n          </dxi-item>\r\n        </dxi-item>\r\n\r\n        <dxi-item dataField=\"Comment\"\r\n                  editorType=\"dxTextArea\"\r\n                  [editorOptions]=\"{placeholder: 'Add your comment'}\"\r\n                  [value]=\"\">\r\n        </dxi-item>\r\n\r\n      </dx-form>\r\n      <dx-button validationGroup=\"addDataSet\"\r\n                 [useSubmitBehavior]=\"true\"\r\n                 class=\"continue-btn\"\r\n                 text=\"SUBMIT\"\r\n                 type=\"success\">\r\n      </dx-button>\r\n    </form>\r\n  </div>\r\n</dx-popup>\r\n\r\n"

/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.indicator-data-contaner /deep/ dx-button, dx-popup /deep/ dx-button {\n  margin: 15px;\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 200px;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.indicator-data-contaner /deep/ dx-button:hover, dx-popup /deep/ dx-button:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\n.indicator-set-form /deep/ dx-form {\n  margin-bottom: 35px; }\n.indicator-set-form /deep/ dx-button {\n  margin-top: 15px;\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 100%;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.indicator-set-form /deep/ dx-button:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\ndx-load-indicator .indicator .dx-loadindicator .dx-widget {\n  display: block !important;\n  margin: 0 auto !important; }\n/deep/ #progress-bar-status {\n  display: inline-block; }\n/deep/ .complete .dx-progressbar-range {\n  background-color: green; }\n"

/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorDataSetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__standards_standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__ = __webpack_require__("./client/app/shared/models/spaDataSet.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var IndicatorDataSetComponent = (function () {
    function IndicatorDataSetComponent(standardsService, homeService, userService, router, route) {
        this.standardsService = standardsService;
        this.homeService = homeService;
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.indicatorList = [];
        this.isCreateDataSetPopupVisible = false;
        this.loadingVisible = false;
        this.yearArray = [];
        this.monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.SpaDataSetState = __WEBPACK_IMPORTED_MODULE_6__shared_models_spaDataSet_model__["a" /* SpaDataSetState */];
        this.newDataSet = this.standardsService.getNewDataSet();
    }
    IndicatorDataSetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.generateYearsArray();
        this.userService.getUserInfo()
            .subscribe(function (userLight) {
            _this.loadingVisible = true;
            _this.dataGrid.instance.beginCustomLoading('Loading..');
            console.log('userLight', userLight);
            _this.currentUnitId = userLight.body['CurrentUnitId'];
            console.log('currentUnitId', userLight.body);
            _this.standardsService.getMaxPeriodByUnit(_this.currentUnitId)
                .subscribe(function (period) {
                _this.maxPeriodByUnitFrom = period;
                console.log('this.maxPeriodByUnitFrom', _this.maxPeriodByUnitFrom);
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
            _this.standardsService.getIndicatorDataSetListByStandardOidFromUnit()
                .subscribe(function (indicatorList) {
                _this.indicatorList = indicatorList;
                console.log('indicatorList', indicatorList);
                _this.loadingVisible = false;
                _this.dataGrid.instance.endCustomLoading();
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        /*this.standardsService.getStandardByOidFromUnit()
          .subscribe(standard => {
              this.newDataSet.Title = standard['Title'];
              this.currentStandardId = standard['OID'];
              console.log('standard', standard);
            },
            error => {
              this.userService.showUserNotification(error.error.Message, 'error');
            });*/
    };
    IndicatorDataSetComponent.prototype.showFormPopup = function () {
        this.isCreateDataSetPopupVisible = true;
        console.log('form', this.dxForm);
    };
    IndicatorDataSetComponent.prototype.dateFormatting = function (date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        return month + '-' + day + '-' + year;
    };
    IndicatorDataSetComponent.prototype.generateYearsArray = function () {
        var date = new Date();
        var year = date.getFullYear();
        var yearArray = [];
        for (var i = 2000; i <= year; i++) {
            yearArray.push(i);
        }
        this.yearArray = yearArray;
    };
    IndicatorDataSetComponent.prototype.onFormSubmitCreateDataSet = function (e) {
        var _this = this;
        console.log('onFormSubmitCreateDataSet', e);
        this.newDataSet.Unit = this.currentUnitId;
        this.newDataSet.PeriodFromMonth = this.periodFromMonthSelector.value;
        this.newDataSet.PeriodFromYear = this.periodFromYearSelector.value;
        this.newDataSet.PeriodToMonth = this.periodToMonthSelector.value;
        this.newDataSet.PeriodToYear = this.periodToYearSelector.value;
        console.log('this.newDataSet', this.newDataSet);
        this.standardsService.addNewIndicatorDataSet(this.newDataSet)
            .subscribe(function (dataset) {
            _this.indicatorList.push(dataset);
            console.log('dataset', dataset);
            _this.userService.showUserNotification('DATA SET WAS CREATED', 'success');
            _this.createDataSetForm.instance.resetValues();
            _this.isCreateDataSetPopupVisible = false;
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        e.preventDefault();
    };
    IndicatorDataSetComponent.prototype.redirectToIndicatorValues = function (e) {
        console.log('CurrentDataSet', e);
        this.router.navigate(["standards-management/" + e.data.Standard + "/" + e.data.OID]);
    };
    IndicatorDataSetComponent.prototype.showChangesFromYear = function (e) {
        console.log("PeriodFromYear", this.periodFromYearSelector.selectedItem);
        console.log("PeriodFrom", this.periodFromYearSelector.value);
        if (this.periodFromYearSelector.selectedItem === this.yearArray[this.yearArray.length - 1]) {
            this.periodFromYearSelector.value = this.yearArray[this.yearArray.length - 2];
            this.periodToYearSelector.value = this.yearArray[this.yearArray.length - 1];
        }
        this.periodToYearSelector.value = this.periodFromYearSelector.selectedItem + 1;
    };
    IndicatorDataSetComponent.prototype.showChangesToYear = function (e) {
        console.log("PeriodTo", this.periodToYearSelector.selectedItem);
        console.log("PeriodTo", this.periodToYearSelector.value);
        if (this.periodToYearSelector.selectedItem === this.yearArray[0]) {
            this.periodToYearSelector.value = this.yearArray[1];
            this.periodFromYearSelector.value = this.yearArray[0];
        }
        if (this.periodToYearSelector.selectedItem <= this.periodFromYearSelector.value) {
            this.periodFromYearSelector.value = this.periodToYearSelector.selectedItem - 1;
        }
    };
    IndicatorDataSetComponent.prototype.showChangesFromMonth = function (event) {
        console.log('showChangesFromMonth1', event);
        console.log('showChangesFromMonth2', this.periodFromMonthSelector.selectedItem);
    };
    IndicatorDataSetComponent.prototype.showChangesToMonth = function (event) {
        console.log('showChangesToMonth1', this.periodToMonthSelector.value);
    };
    IndicatorDataSetComponent.prototype.calculatePeriodFrom = function (data) {
        return [data.PeriodFromMonth < 10 ? '0' + data.PeriodFromMonth : data.PeriodFromMonth, data.PeriodFromYear].join("-");
    };
    IndicatorDataSetComponent.prototype.calculatePeriodTo = function (data) {
        return [data.PeriodToMonth < 10 ? '0' + data.PeriodToMonth : data.PeriodToMonth, data.PeriodToYear].join("-");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("progressBar"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], IndicatorDataSetComponent.prototype, "progressBar", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("periodFromYearSelector"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxSelectBoxComponent"])
    ], IndicatorDataSetComponent.prototype, "periodFromYearSelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("periodToYearSelector"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxSelectBoxComponent"])
    ], IndicatorDataSetComponent.prototype, "periodToYearSelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("periodToMonthSelector"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxSelectBoxComponent"])
    ], IndicatorDataSetComponent.prototype, "periodToMonthSelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("periodFromMonthSelector"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxSelectBoxComponent"])
    ], IndicatorDataSetComponent.prototype, "periodFromMonthSelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("dxForm"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxFormComponent"])
    ], IndicatorDataSetComponent.prototype, "dxForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("createDataSetForm"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxFormComponent"])
    ], IndicatorDataSetComponent.prototype, "createDataSetForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("dxDataGridComponent"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_devextreme_angular__["DxDataGridComponent"])
    ], IndicatorDataSetComponent.prototype, "dataGrid", void 0);
    IndicatorDataSetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-indicator-data-set',
            template: __webpack_require__("./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.html"),
            styles: [__webpack_require__("./client/app/home/performance-indicators/indicator-data-set/indicator-data-set.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__standards_standards_service__["a" /* StandardsService */],
            __WEBPACK_IMPORTED_MODULE_2__home_service__["a" /* HomeService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
    ], IndicatorDataSetComponent);
    return IndicatorDataSetComponent;
}());



/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"reporting-title-container\"><h5>FILTER BY</h5></div>\r\n<div class=\"left-content\">\r\n  <span class=\"title-for-selector\">\r\n    Select:\r\n  </span>\r\n    <dx-select-box [dataSource]=\"dimentionsList\"\r\n                   valueExpr=\"OID\"\r\n                   displayExpr=\"ShortTitle\"\r\n                   placeholder='DIMENSION'\r\n                   (onSelectionChanged)=\"changeFilter($event, 'dimension')\">\r\n    </dx-select-box>\r\n    <dx-select-box [dataSource]=\"principleList\"\r\n                   valueExpr=\"OID\"\r\n                   displayExpr=\"ShortTitle\"\r\n                   [value]=\"\"\r\n                   placeholder='PRINCIPLE'\r\n                   (onSelectionChanged)=\"changeFilter($event, 'principle')\">\r\n    </dx-select-box>\r\n    <dx-select-box [dataSource]=\"principleGroups\"\r\n                   valueExpr=\"OID\"\r\n                   displayExpr=\"ShortTitle\"\r\n                   [value]=\"\"\r\n                   placeholder='MANAGEMENT AREA'\r\n                   (onSelectionChanged)=\"changeFilter($event, 'management-area')\">\r\n    </dx-select-box>\r\n </div>\r\n\r\n<div class=\"data-grid-wrapper\">\r\n\r\n  <div class=\"sort-container\">\r\n    <span>Sort by</span>\r\n    <dx-select-box [dataSource]=\"['STRENGTHENING', 'WEAKENING']\"\r\n                   (onSelectionChanged)=\"getSortedValues($event)\">\r\n    </dx-select-box>\r\n  </div>\r\n  <div class=\"data-grid-container\">\r\n    <dx-data-grid #dataGrid\r\n                  id=\"gridContainer\"\r\n                  [dataSource]=\"reportingDataSource\"\r\n                  noDataText=\"\"\r\n                  [showRowLines]=\"true\">\r\n      <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n      <dxi-column dataField=\"PrincipleGroup\"\r\n                  headerCellTemplate=\"titleHeaderTemplate\"\r\n                  caption=\"MANAGEMENT AREA\">\r\n      </dxi-column>\r\n      <dxi-column dataField=\"Characteristic\"\r\n                  headerCellTemplate=\"titleHeaderTemplate\"\r\n                  caption=\"CHARACTERISTIC\">\r\n      </dxi-column>\r\n      <dxi-column dataField=\"MeasuredBy\"\r\n                  headerCellTemplate=\"titleHeaderTemplate\"\r\n                  caption=\"MEASURED BY\">\r\n      </dxi-column>\r\n      <dxi-column dataField=\"Formula\"\r\n                  headerCellTemplate=\"titleHeaderTemplate\"\r\n                  caption=\"FORMULA\">\r\n      </dxi-column>\r\n      <dxi-column caption=\"TREND\"\r\n                  headerCellTemplate=\"titleHeaderTemplate\"\r\n                  cellTemplate=\"chartCellTemplate\">\r\n      </dxi-column>\r\n      <div *dxTemplate=\"let d of 'chartCellTemplate'\">\r\n        <div class=\"chart-cell\">\r\n          <dx-sparkline\r\n            [dataSource]=\"d.data.Trend\"\r\n            type=\"area\"\r\n            [lineWidth]=\"3\"\r\n            [showMinMax]=\"true\"\r\n            minColor=\"#f00\"\r\n            maxColor=\"#2ab71b\"\r\n            margin=\"15\"\r\n            [pointSize]=\"6\">\r\n           <!-- <dxo-size [width]=\"140\" [height]=\"30\"></dxo-size>-->\r\n            <dxo-tooltip [enabled]=\"false\"></dxo-tooltip>\r\n          </dx-sparkline>\r\n        </div>\r\n      </div>\r\n      <dxi-column caption=\"SCORE\"\r\n                  cellTemplate=\"scoreCellTemplate\"\r\n                  headerCellTemplate=\"scoreHeaderTemplate\">\r\n      </dxi-column>\r\n      <div *dxTemplate=\"let d of 'scoreCellTemplate'\">\r\n        <div class=\"chart-bar-cell\" style=\"height: 100px;\">\r\n          <div class=\"cell-item\">{{d.data.Score}}%</div>\r\n          <div class=\"cell-item\">\r\n          <dx-bullet *ngIf=\"d.data.Score < 0\"\r\n            [endScaleValue]=\"0\"\r\n            [value]=\"d.data.Score\"\r\n            [color]=\"'#f00'\">\r\n          </dx-bullet>\r\n          </div>\r\n          <div class=\"cell-item\">\r\n          <dx-bullet *ngIf=\"d.data.Score > 0\"\r\n            [endScaleValue]=\"35\"\r\n            [showZeroLevel]=\"true\"\r\n            [value]=\"d.data.Score\"\r\n            [color]=\"'#2ab71b'\">\r\n          </dx-bullet>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *dxTemplate=\"let info of 'titleHeaderTemplate'\" class=\"data-grid-header\">\r\n        <p class=\"data-grid-header\">{{info.column.caption}}</p>\r\n      </div>\r\n      <div *dxTemplate=\"let info of 'scoreHeaderTemplate'\" class=\"data-grid-score-header\">\r\n        <p class=\"score-header\">{{info.column.caption}}</p>\r\n        <div>%</div>\r\n        <div>WEAK</div>\r\n        <div>STRONG</div>\r\n      </div>\r\n    </dx-data-grid>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.scss":
/***/ (function(module, exports) {

module.exports = ".data-grid-wrapper {\n  background-color: #fff;\n  padding: 15px; }\n\n.chart-bar-cell {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto auto auto;\n      grid-template-columns: auto auto auto;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n.chart-cell {\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 100px; }\n\n.data-grid-header {\n  margin-left: 5px;\n  color: #fff; }\n\n.data-grid-score-header {\n  display: -ms-grid;\n  display: grid;\n  height: 30px;\n  padding-left: 5px;\n  position: relative;\n  -ms-grid-columns: auto auto auto;\n      grid-template-columns: auto auto auto;\n  color: #fff;\n  background-color: #628BC1; }\n\n.score-header {\n  position: absolute;\n  top: -30px; }\n\n.data-grid-container /deep/ .dx-datagrid-headers .dx-datagrid-table .dx-row > td {\n  width: 100%;\n  padding: 0 !important;\n  height: 30px;\n  background-color: #6BCDFA;\n  border: none;\n  margin-left: 5px !important; }\n\n.sort-container {\n  grid-gap: 15px;\n  font-size: 12px;\n  display: -ms-grid;\n  display: grid;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -ms-grid-columns: 100px 200px;\n      grid-template-columns: 100px 200px; }\n\n.sort-container dx-select-box {\n    width: 200px; }\n\n.reporting-title-container h5 {\n  grid-column: 1 / -1;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: auto 1fr;\n      grid-template-columns: auto 1fr;\n  grid-gap: 20px;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #666666;\n  font-size: 15px;\n  margin: 24px 0; }\n\n.reporting-title-container h5:after {\n    display: block;\n    content: '';\n    height: 5px;\n    border-radius: 1px;\n    background: rgba(234, 224, 222, 0.2); }\n\n.title-for-selector {\n  font-size: 12px; }\n\n.left-content {\n  width: 80%;\n  display: -ms-grid;\n  display: grid;\n  grid-gap: 15px;\n  -ms-grid-columns: auto auto auto auto;\n      grid-template-columns: auto auto auto auto;\n  -webkit-box-pack: left;\n      -ms-flex-pack: left;\n          justify-content: left;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-bottom: 15px; }\n\n.left-content span {\n    /* margin-bottom: 15px;*/ }\n\n.left-content .dx-field-value {\n    width: 100%; }\n"

/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorReportingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__indicator_reporting_service__ = __webpack_require__("./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assessment_assessment_capture_full_assessment_capture_full_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-full/assessment-capture-full.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assessment_assessment_capture_light_assessment_capture_light_service__ = __webpack_require__("./client/app/home/assessment/assessment-capture-light/assessment-capture-light.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assessment_assessment_state_assessment_state_service__ = __webpack_require__("./client/app/home/assessment/assessment-state/assessment-state.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var IndicatorReportingComponent = (function () {
    function IndicatorReportingComponent(indicatorReportingService, userService, unitService, assessmentCaptureFullService, assessmentCaptureLightService, assessmentStateService) {
        this.indicatorReportingService = indicatorReportingService;
        this.userService = userService;
        this.unitService = unitService;
        this.assessmentCaptureFullService = assessmentCaptureFullService;
        this.assessmentCaptureLightService = assessmentCaptureLightService;
        this.assessmentStateService = assessmentStateService;
        this.reportingDataSource = [];
        this.dimentionsList = [];
        this.principleList = [];
        this.principleGroups = [];
        this.queryParams = {};
    }
    IndicatorReportingComponent.prototype.ngOnInit = function () {
        var _this = this;
        var assessmentType;
        var fullListDimentions;
        var fullListPrinciples;
        var fullListPrinciplesGroups;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId);
            }
        })
            .subscribe(function (unit) {
            console.log('unit', unit);
            assessmentType = unit.AssessmentType;
            if (assessmentType === 0) {
                fullListDimentions = _this.assessmentCaptureFullService.getGetFullListDimentions();
                fullListPrinciples = _this.assessmentCaptureFullService.getGetFullListPrinciples();
                fullListPrinciplesGroups = _this.assessmentStateService.getFullListByPrincipleGroups();
            }
            if (assessmentType === 1) {
                fullListDimentions = _this.assessmentCaptureLightService.getDimensions();
                fullListPrinciples = _this.assessmentCaptureLightService.getPrinciples();
                fullListPrinciplesGroups = _this.assessmentStateService.getFullListByPrincipleGroups();
            }
            __WEBPACK_IMPORTED_MODULE_8_rxjs_Observable__["Observable"].forkJoin(fullListDimentions, fullListPrinciples, fullListPrinciplesGroups)
                .subscribe(function (results) {
                var allArr = [{ OID: 0, ShortTitle: 'ALL' }];
                _this.dimentionsList = results[0].concat(allArr);
                _this.principleList = results[1].concat(allArr);
                _this.principleGroups = results[2].concat(allArr);
                console.log('results', results);
            });
            setTimeout(function () {
                _this.dataGrid.instance.beginCustomLoading('Loading..');
            }, 0);
            _this.indicatorReportingService.getIndicatrsData({})
                .subscribe(function (data) {
                _this.reportingDataSource = data;
                _this.dataGrid.instance.endCustomLoading();
                console.log('data', data);
            });
        });
    };
    IndicatorReportingComponent.prototype.changeFilter = function (event, type) {
        var _this = this;
        this.dataGrid.instance.beginCustomLoading('Loading..');
        if (type === 'dimension') {
            console.log('this.queryParams', event, type);
            if (event.selectedItem.OID === 0) {
                delete this.queryParams.DimensionOid;
            }
            else {
                this.queryParams.DimensionOid = event.selectedItem.OID;
            }
        }
        if (type === 'principle') {
            if (event.selectedItem.OID === 0) {
                delete this.queryParams.PrincipleOid;
            }
            else {
                this.queryParams.PrincipleOid = event.selectedItem.OID;
            }
        }
        if (type === 'management-area') {
            if (event.selectedItem.OID === 0) {
                delete this.queryParams.PrincipleGroupOid;
            }
            else {
                this.queryParams.PrincipleGroupOid = event.selectedItem.OID;
            }
        }
        console.log('queryParams', this.queryParams);
        this.indicatorReportingService.getIndicatrsData(this.queryParams)
            .subscribe(function (data) {
            _this.reportingDataSource = data;
            _this.dataGrid.instance.endCustomLoading();
            console.log('data', data);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
            _this.dataGrid.instance.endCustomLoading();
        });
    };
    IndicatorReportingComponent.prototype.getSortedValues = function (event) {
        console.log(event.selectedItem);
        if (event.selectedItem === 'WEAKENING') {
            this.reportingDataSource = this.reportingDataSource.sort(this.compareNumbersHighToLow);
        }
        if (event.selectedItem === 'STRENGTHENING') {
            this.reportingDataSource = this.reportingDataSource.sort(this.compareNumbersLowToHigh);
        }
    };
    IndicatorReportingComponent.prototype.compareNumbersHighToLow = function (a, b) {
        return b.Score - a.Score;
    };
    IndicatorReportingComponent.prototype.compareNumbersLowToHigh = function (a, b) {
        return a.Score - b.Score;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxDataGridComponent"])
    ], IndicatorReportingComponent.prototype, "dataGrid", void 0);
    IndicatorReportingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-indicator-reporting',
            template: __webpack_require__("./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.html"),
            styles: [__webpack_require__("./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__indicator_reporting_service__["a" /* IndicatorReportingService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_5__assessment_assessment_capture_full_assessment_capture_full_service__["a" /* AssessmentCaptureFullService */],
            __WEBPACK_IMPORTED_MODULE_6__assessment_assessment_capture_light_assessment_capture_light_service__["a" /* AssessmentCaptureLightService */],
            __WEBPACK_IMPORTED_MODULE_7__assessment_assessment_state_assessment_state_service__["a" /* AssessmentStateService */]])
    ], IndicatorReportingComponent);
    return IndicatorReportingComponent;
}());



/***/ }),

/***/ "./client/app/home/performance-indicators/indicator-reporting/indicator-reporting.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IndicatorReportingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndicatorReportingService = (function () {
    function IndicatorReportingService(httpClient) {
        this.httpClient = httpClient;
    }
    IndicatorReportingService.prototype.getIndicatrsData = function (params) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Reports/GetIndicatorsData", params);
    };
    IndicatorReportingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], IndicatorReportingService);
    return IndicatorReportingService;
}());



/***/ }),

/***/ "./client/app/home/standards/standards.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"data-grid-wrapper standarts-wrapper\">\r\n  <div class=\"data-grid-container\">\r\n    <div class=\"data-grid-container-header\">STANDARDS</div>\r\n    <dx-data-grid #dataGrid\r\n      id=\"gridContainer\"\r\n      [dataSource]=\"standardsByUnit\"\r\n      [showBorders]=\"false\"\r\n      [showColumnLines]=\"false\"\r\n      [showRowLines]=\"true\"\r\n      [hoverStateEnabled]=\"false\"\r\n      [sorting]=\"false\"\r\n      noDataText=\"\"\r\n      keyExpr=\"Oid\">\r\n      <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n      <dxo-editing\r\n        mode=\"form\">\r\n        <dxo-popup\r\n          [width]=\"700\"\r\n          [height]=\"345\"\r\n          [position]=\"{ my: 'top', at: 'top', of: 'window' }\">\r\n        </dxo-popup>\r\n      </dxo-editing>\r\n      <dxi-column dataField=\"Title\" [width]=\"200\" caption=\"Standards Name\"  headerCellTemplate=\"titleHeaderTemplate\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column dataField=\"Reference\" [width]=\"100\" caption=\"Reference\"  headerCellTemplate=\"titleHeaderTemplate\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column dataField=\"Description\" caption=\"Control point description\"  headerCellTemplate=\"titleHeaderTemplate\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column [width]=\"180\"  headerCellTemplate=\"titleHeaderTemplate\"\r\n                  [allowSorting]=\"false\"\r\n                  caption=\"STATUS\"\r\n                  dataField=\"Status\"\r\n                  cellTemplate=\"statusCellTemplate\"></dxi-column>\r\n      <div class=\"status-wrapper\" *dxTemplate=\"let data of 'statusCellTemplate'\">\r\n        <span [ngClass]=\"{'status-label-not-in-action-plan' : data.data.Status==='NOT IN ACTION PLAN',\r\n               'status-label-in-action-plan' : data.data.Status==='IN ACTION PLAN'}\"\r\n              class=\"status-label status-label-not-in-action-plan\">{{data.data.Status}}</span>\r\n      </div>\r\n      <div *dxTemplate=\"let info of 'titleHeaderTemplate' \" class=\"data-grid-header\">\r\n        <p class=\"data-grid-header\">{{info.column.caption}}</p>\r\n      </div>\r\n    </dx-data-grid>\r\n</div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/home/standards/standards.component.scss":
/***/ (function(module, exports) {

module.exports = ".standarts-wrapper {\n  margin-top: 24px;\n  margin-right: 50px; }\n  .standarts-wrapper .dx-widget {\n    padding: 20px 30px; }\n  .standarts-wrapper /deep/ .data-grid-header {\n    font-weight: 700;\n    color: #666;\n    font-size: 12px;\n    margin-bottom: 10px; }\n  .standarts-wrapper .data-grid-container-header {\n    padding: 15px 25px; }\n  .standarts-wrapper /deep/ .dx-datagrid .dx-row > td {\n    padding: 20px 20px 15px 0;\n    font-weight: 400;\n    color: #999;\n    font-size: 12px;\n    word-break: break-all;\n    white-space: normal;\n    overflow: visible; }\n  .standarts-wrapper /deep/ .dx-datagrid-headers {\n    border-bottom: none; }\n  .status-wrapper {\n  text-align: left; }\n  .status-wrapper .status-label {\n    height: 20px;\n    padding: 5px 10px;\n    background-color: silver;\n    border-radius: 3px;\n    text-align: center;\n    color: #fff;\n    font-size: 11px;\n    line-height: 20px;\n    font-weight: 700; }\n  .status-wrapper .status-label-in-action-plan {\n      background-color: #6CC871; }\n  .status-wrapper .status-label-not-in-action-plan {\n      background-color: #FD001A; }\n"

/***/ }),

/***/ "./client/app/home/standards/standards.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandardsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__standards_service__ = __webpack_require__("./client/app/home/standards/standards.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_models_unit_model__ = __webpack_require__("./client/app/shared/models/unit.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_service__ = __webpack_require__("./client/app/home/home.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var StandardsComponent = (function () {
    function StandardsComponent(standardsService, userService, router, unitService, registrationSettingsService, homeService) {
        this.standardsService = standardsService;
        this.userService = userService;
        this.router = router;
        this.unitService = unitService;
        this.registrationSettingsService = registrationSettingsService;
        this.homeService = homeService;
        this.standardsByUnit = [];
    }
    StandardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataFromUnitSelectorSubscription$ = this.homeService.getDataFromUnitSelector()
            .subscribe(function (data) {
            console.log('this.userService.getCurrentUser().CurrentUnitId UNITSELECTOR', _this.userService.getCurrentUser().CurrentUnitId);
            console.log('UNITINFO UNITSELECTOR', __WEBPACK_IMPORTED_MODULE_4__shared_models_unit_model__["a" /* UnitInfo */]);
            _this.loadData();
        });
        this.loadData();
    };
    StandardsComponent.prototype.loadData = function () {
        var _this = this;
        this.standardsByUnit = [];
        setTimeout(function () {
            _this.dataGrid.instance.beginCustomLoading('Loading..');
        }, 0);
        this.standardsService.getStandardsByCurrentUnit()
            .subscribe(function (standards) {
            _this.standardsByUnit = standards;
            _this.dataGrid.instance.endCustomLoading();
            if (!_this.standardsByUnit.length) {
                _this.userService.showUserNotification("You don't have STANDARDS yet", 'error');
            }
            console.log(standards);
            _this.dataGrid.instance.endCustomLoading();
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    StandardsComponent.prototype.redirectToCurrentStandard = function (event) {
        console.log('STANDARD OID', event.data.OID);
        console.log('this.currentUnitId', this.currentUnitId);
        this.router.navigate(["standards-management/" + event.data.OID + "/performance-indicators"]);
        this.homeService.title.next('PERFORMANCE INDICATORS');
    };
    StandardsComponent.prototype.ngOnDestroy = function () {
        this.dataFromUnitSelectorSubscription$.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_devextreme_angular__["DxDataGridComponent"])
    ], StandardsComponent.prototype, "dataGrid", void 0);
    StandardsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-standards',
            template: __webpack_require__("./client/app/home/standards/standards.component.html"),
            styles: [__webpack_require__("./client/app/home/standards/standards.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__standards_service__["a" /* StandardsService */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_8__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_6__home_service__["a" /* HomeService */]])
    ], StandardsComponent);
    return StandardsComponent;
}());



/***/ }),

/***/ "./client/app/home/standards/standards.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandardsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var newDataSet = {
    'Unit': '',
    'PeriodFromYear': '',
    'PeriodToYear': '',
    'PeriodFromMonth': '',
    'PeriodToMonth': ''
};
var StandardsService = (function () {
    function StandardsService(httpClient, unitService, userService) {
        this.httpClient = httpClient;
        this.unitService = unitService;
        this.userService = userService;
    }
    StandardsService.prototype.getStandardsList = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards");
    };
    StandardsService.prototype.getStandardByOid = function (Oid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards(" + Oid + ")");
    };
    StandardsService.prototype.getStandardByCommodity = function (commodityOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards/ByCommodity?key=" + commodityOid);
    };
    StandardsService.prototype.getIndicatorDataSetList = function (unitOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorDataSets/GetListByUnitAndStandard(" + unitOid + ")");
    };
    StandardsService.prototype.addNewIndicatorDataSet = function (newDataSet) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorDataSets/CreateOrUpdate", newDataSet);
    };
    StandardsService.prototype.getMaxPeriodByUnit = function (unitId) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorDataSets/GetMaxPeriodByUnit(" + unitId + ")");
    };
    StandardsService.prototype.getNewDataSet = function () {
        return newDataSet;
    };
    StandardsService.prototype.getCharacteristicsByStandard = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetByCurrentFramework");
    };
    StandardsService.prototype.getCharacteristicByOid = function (characteristicOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics(" + characteristicOid + ")");
    };
    StandardsService.prototype.getCharacteristicByDimension = function (dimensionOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetByCurrentFrameworkAndDimension(" + dimensionOid + ")");
    };
    /* getCharacteristicByPrinciple(principleOid) {
       return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAndPrinciple(${principleOid})`)
     }*/
    StandardsService.prototype.getCharacteristicByPrinciple = function (principleOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetByCurFrameworkAndPrinciple(" + principleOid + ")");
    };
    /* getCharacteristicByPrincipleGroup(principleGroupOid) {
       return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAndPrincipleGroup(${principleGroupOid})`)
     } */
    StandardsService.prototype.getCharacteristicByPrincipleGroup = function (principleGroupOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetByCurFrameworkAndPrincipleGroup(" + principleGroupOid + ")");
    };
    /* getCharacteristicByGroupOrPrinciple(oid, selectedItem) {
       return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAnd${selectedItem}(${oid})`)
     } */
    StandardsService.prototype.getCharacteristicByGroupOrPrinciple = function (oid, selectedItem) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Characteristics/GetByCurFrameworkAnd" + selectedItem + "(" + oid + ")");
    };
    StandardsService.prototype.getIndicatorsByCharacteristicAndDataset = function (characteristicOid, dataSetOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Indicators/ByCharacteristicAndDataset(" + characteristicOid + ", " + dataSetOid + ")");
    };
    StandardsService.prototype.updateIndicatorValue = function (value) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorValues/UpdateValue", value);
    };
    StandardsService.prototype.createOrUpdateIndicatorValue = function (value) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorValues/CreateOrUpdate", value);
    };
    StandardsService.prototype.getIndicatorsDataSetByCharacteristicAndDataSetList = function (parametrs) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Indicators/ByCharacteristicAndDatasetList", parametrs);
    };
    StandardsService.prototype.getStandardByCommodityIdFromUnit = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.unitService.getUnitById(userId)
                    .switchMap(function (unit) {
                    return _this.getStandardByCommodity(unit.UnitCommodityId);
                });
            }
            else {
                return _this.getStandardsList();
            }
        });
    };
    /*getCharacteristicByStandardOidFromUnit() {
      return this.userService.getUserInfo()
        .switchMap(user => {
          if (user.body['CurrentUnitId']) {
            let userId = user.body['CurrentUnitId'];
            return this.unitService.getUnitById(userId)
              .switchMap((unit: UnitInfo) => {
                this.currentStandardId = unit.CurrentStandardId;
                return this.getCharacteristicsByStandard()
              })
          }
        })
    }*/
    StandardsService.prototype.getIndicatorDataSetListByStandardOidFromUnit = function () {
        var _this = this;
        return this.userService.getUserInfo()
            .switchMap(function (user) {
            if (user.body['CurrentUnitId']) {
                var userId = user.body['CurrentUnitId'];
                return _this.getIndicatorDataSetList(user.body['CurrentUnitId']);
            }
        });
    };
    /* getStandardByOidFromUnit() {
       return this.userService.getUserInfo()
         .switchMap(user => {
           if (user.body['CurrentUnitId']) {
             let userId = user.body['CurrentUnitId'];
             return this.unitService.getUnitById(userId)
               .switchMap((unit: UnitInfo) => {
                 return this.getStandardByOid(unit.CurrentStandardId);
               })
           }
         });
     }
   */
    StandardsService.prototype.getIndicatorsNotes = function (body) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorNotes/GetListByIndicatorAndDataSet", body);
    };
    StandardsService.prototype.addIndicatorsNotes = function (note) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/IndicatorNotes/CreateOrUpdate", note, { observe: 'response' });
    };
    StandardsService.prototype.getStandardsByCurrentUnit = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards/GetStatusesByCurrentUnit");
    };
    StandardsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */]])
    ], StandardsService);
    return StandardsService;
}());



/***/ }),

/***/ "./client/app/shared/characteristic-status/characteristic-status.component.html":
/***/ (function(module, exports) {

module.exports = "<container-element [ngSwitch]=\"status\">\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.OFF_THE_RADAR\">\r\n    <span class=\"status-label status-label-status-0\">OFF THE RADAR</span>\r\n  </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.DABBLING\">\r\n    <span class=\"status-label status-label-status-1\">DABBLING</span>\r\n  </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.GOOD_FORTUNE\">\r\n    <span class=\"status-label status-label-status-2\">GOOD FORTUNE</span>\r\n  </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.MAKING_REPARATIONS\">\r\n    <span class=\"status-label status-label-status-3\">MAKING REPARATIONS</span>\r\n  </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.TENTATIVE_ENGAGEMENT\">\r\n    <span class=\"status-label status-label-status-4\">TENTATIVE ENGAGEMENT</span>\r\n  </ng-container>\r\n   <ng-container *ngSwitchCase=\"CharacteristicStatus.OVER_STRETCHED\">\r\n     <span class=\"status-label status-label-status-5\">OVER STRETCHED</span>\r\n   </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.READY_TO_START\">\r\n     <span class=\"status-label status-label-status-6\">READY TO START</span>\r\n   </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.WELL_UNDERWAY\">\r\n     <span class=\"status-label status-label-status-7\">WELL UNDERWAY</span>\r\n   </ng-container>\r\n  <ng-container *ngSwitchCase=\"CharacteristicStatus.FULFILLED\">\r\n     <span class=\"status-label status-label-status-8\">FULFILLED</span>\r\n   </ng-container>\r\n</container-element>\r\n\r\n"

/***/ }),

/***/ "./client/app/shared/characteristic-status/characteristic-status.component.scss":
/***/ (function(module, exports) {

module.exports = ".status-label {\n  height: 20px;\n  padding: 5px;\n  background-color: silver;\n  border-radius: 3px;\n  text-align: center;\n  color: #fff;\n  font-size: 11px;\n  line-height: 20px;\n  margin-left: 10px; }\n  .status-label-status-0 {\n    background-color: #F55D62; }\n  .status-label-status-1 {\n    background-color: #F8876B; }\n  .status-label-status-2 {\n    background-color: #FBB475; }\n  .status-label-status-3 {\n    background-color: #FFE681; }\n  .status-label-status-4 {\n    background-color: #DBDD7F; }\n  .status-label-status-5 {\n    background-color: #B8D37C; }\n  .status-label-status-6 {\n    background-color: #98C779; }\n  .status-label-status-7 {\n    background-color: #79BD76; }\n  .status-label-status-8 {\n    background-color: #5BB474; }\n"

/***/ }),

/***/ "./client/app/shared/characteristic-status/characteristic-status.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharacteristicStatusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_characteristic_model__ = __webpack_require__("./client/app/shared/models/characteristic.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CharacteristicStatusComponent = (function () {
    function CharacteristicStatusComponent() {
        this.CharacteristicStatus = __WEBPACK_IMPORTED_MODULE_1__models_characteristic_model__["a" /* CharacteristicStatus */];
    }
    CharacteristicStatusComponent.prototype.ngOnInit = function () {
        console.log('STATUS', this.status);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CharacteristicStatusComponent.prototype, "status", void 0);
    CharacteristicStatusComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-characteristic-status',
            template: __webpack_require__("./client/app/shared/characteristic-status/characteristic-status.component.html"),
            styles: [__webpack_require__("./client/app/shared/characteristic-status/characteristic-status.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CharacteristicStatusComponent);
    return CharacteristicStatusComponent;
}());



/***/ }),

/***/ "./client/app/shared/element-width.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementWidthDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ElementWidthDirective = (function () {
    function ElementWidthDirective(_element) {
        this._element = _element;
        this.reportedWidth = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ElementWidthDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this._reportWidth(); }, 0);
    };
    ElementWidthDirective.prototype.onWindowResize = function () {
        this._reportWidth();
    };
    ElementWidthDirective.prototype._reportWidth = function () {
        this.reportedWidth.emit(this._element.nativeElement.offsetWidth);
        console.log(this._element.nativeElement.offsetWidth);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('actual-width'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ElementWidthDirective.prototype, "reportedWidth", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', []),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ElementWidthDirective.prototype, "onWindowResize", null);
    ElementWidthDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[bluenorthElementWidth]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ElementWidthDirective);
    return ElementWidthDirective;
}());



/***/ }),

/***/ "./client/app/shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"header\">\r\n  <div class=\"logo\">\r\n  <img src=\"../../assets/Logo.png\"/>\r\n  </div>\r\n  <!--  <a (click)=\"logout()\">Logout</a>-->\r\n</header>\r\n"

/***/ }),

/***/ "./client/app/shared/header/header.component.scss":
/***/ (function(module, exports) {

module.exports = ".header {\n  position: fixed;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr 5fr;\n      grid-template-columns: 1fr 5fr;\n  justify-items: start;\n  width: 100%;\n  z-index: 10000; }\n  .header .logo {\n    margin-left: 10px; }\n"

/***/ }),

/***/ "./client/app/shared/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-header',
            template: __webpack_require__("./client/app/shared/header/header.component.html"),
            styles: [__webpack_require__("./client/app/shared/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./client/app/shared/models/characteristic.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharacteristicStatus; });
var CharacteristicStatus;
(function (CharacteristicStatus) {
    CharacteristicStatus[CharacteristicStatus["OFF_THE_RADAR"] = 0] = "OFF_THE_RADAR";
    CharacteristicStatus[CharacteristicStatus["DABBLING"] = 1] = "DABBLING";
    CharacteristicStatus[CharacteristicStatus["GOOD_FORTUNE"] = 2] = "GOOD_FORTUNE";
    CharacteristicStatus[CharacteristicStatus["MAKING_REPARATIONS"] = 3] = "MAKING_REPARATIONS";
    CharacteristicStatus[CharacteristicStatus["TENTATIVE_ENGAGEMENT"] = 4] = "TENTATIVE_ENGAGEMENT";
    CharacteristicStatus[CharacteristicStatus["OVER_STRETCHED"] = 5] = "OVER_STRETCHED";
    CharacteristicStatus[CharacteristicStatus["READY_TO_START"] = 6] = "READY_TO_START";
    CharacteristicStatus[CharacteristicStatus["WELL_UNDERWAY"] = 7] = "WELL_UNDERWAY";
    CharacteristicStatus[CharacteristicStatus["FULFILLED"] = 8] = "FULFILLED";
})(CharacteristicStatus || (CharacteristicStatus = {}));


/***/ }),

/***/ "./client/app/shared/models/form-validation.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormValidation; });
var FormValidation = (function () {
    function FormValidation() {
        this.passwordComparison = function (form) {
            return form.instance.option('formData').Password;
        };
        this.passwordUpdateCompartionOld = function (form) {
            return form.instance.option('formData').OldPassword;
        };
    }
    FormValidation.prototype.getPhoneRules = function () {
        var phoneRules = { X: /[02-9]/ };
        return phoneRules;
    };
    FormValidation.prototype.getPhonePattern = function () {
        var phonePattern = /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/;
        return phonePattern;
    };
    FormValidation.prototype.getCityPattern = function () {
        var cityPattern = '^[^0-9]+$';
        return cityPattern;
    };
    FormValidation.prototype.getNamePattern = function () {
        var namePattern = /^[^0-9]+$/;
        return namePattern;
    };
    FormValidation.prototype.getEmailPattern = function () {
        var emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailPattern;
    };
    return FormValidation;
}());



/***/ }),

/***/ "./client/app/shared/models/spaDataSet.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SpaDatasetForChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpaDataSetState; });
var SpaDatasetForChart = (function () {
    function SpaDatasetForChart() {
    }
    return SpaDatasetForChart;
}());

var SpaDataSetState;
(function (SpaDataSetState) {
    SpaDataSetState[SpaDataSetState["NotStarted"] = 0] = "NotStarted";
    SpaDataSetState[SpaDataSetState["InProgress"] = 1] = "InProgress";
    SpaDataSetState[SpaDataSetState["Completed"] = 2] = "Completed";
})(SpaDataSetState || (SpaDataSetState = {}));


/***/ }),

/***/ "./client/app/shared/models/unit.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UnitList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnitInfo; });
/* unused harmony export UnitType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UnitStructure; });
var UnitList = (function () {
    function UnitList() {
    }
    return UnitList;
}());

var UnitInfo = (function () {
    function UnitInfo() {
    }
    return UnitInfo;
}());

var UnitType = (function () {
    function UnitType() {
    }
    return UnitType;
}());

var UnitStructure;
(function (UnitStructure) {
    UnitStructure[UnitStructure["Independent"] = 0] = "Independent";
    UnitStructure[UnitStructure["Cooperative"] = 1] = "Cooperative";
})(UnitStructure || (UnitStructure = {}));


/***/ }),

/***/ "./client/app/shared/replace-line-breaks.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReplaceLineBreaksPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ReplaceLineBreaksPipe = (function () {
    function ReplaceLineBreaksPipe() {
    }
    ReplaceLineBreaksPipe.prototype.transform = function (value) {
        return value.replace(/\n/g, '<br/>');
    };
    ReplaceLineBreaksPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'replaceLineBreaks'
        })
    ], ReplaceLineBreaksPipe);
    return ReplaceLineBreaksPipe;
}());



/***/ }),

/***/ "./client/app/shared/services/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./client/app/shared/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    /* checkLogin(url: string): boolean {
       if (this.authService.isLoggedIn) {
         return true;
       }
   
       // Store the attempted URL for redirecting
       this.authService.redirectUrl = url;
   
       // Navigate to the login page with extras
       this.router.navigate(['/login']);
       return false;
     }*/
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());

/*
*  if (this.authenticationService.hasToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/login').then(() => {
        // ...
      });
      return false;
    }*/


/***/ }),

/***/ "./client/app/shared/services/auth-resolver.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthResolverService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthResolverService = (function () {
    function AuthResolverService(userService) {
        this.userService = userService;
    }
    AuthResolverService.prototype.resolve = function (route, state) {
        return this.userService.loadCurrentUser();
    };
    AuthResolverService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]])
    ], AuthResolverService);
    return AuthResolverService;
}());



/***/ }),

/***/ "./client/app/shared/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_delay__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/delay.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__local_storage_service__ = __webpack_require__("./client/app/shared/services/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var loginInfo = {
    'grant_type': 'password',
    'username': '',
    'password': ''
};
var AuthService = (function () {
    function AuthService(httpClient, localStorageService, router) {
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.router = router;
    }
    AuthService.prototype.login = function (loginInfo) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_7__environments_environment__["a" /* environment */].apiUrl + "/api/Token", loginInfo, { observe: 'response' });
    };
    AuthService.prototype.logout = function () {
        this.localStorageService.remove('access_token');
        this.localStorageService.remove('token_expires');
        this.localStorageService.remove('current_user');
        this.router.navigate(['login']);
    };
    AuthService.prototype.getToken = function () {
        if (localStorage.getItem('access_token')) {
            return localStorage.getItem('access_token');
        }
    };
    AuthService.prototype.isAuthenticated = function () {
        var today = Date.parse(new Date().toDateString());
        var expiresToken = Date.parse(this.localStorageService.get('token_expires'));
        var expirationToken = (expiresToken > today) ? true : false;
        return !!this.getToken() && expirationToken;
    };
    AuthService.prototype.getLoginInfo = function () {
        return loginInfo;
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6__local_storage_service__["a" /* LocalStorageService */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["e" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./client/app/shared/services/commodity.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommodityService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommodityService = (function () {
    function CommodityService(httpClient) {
        this.httpClient = httpClient;
    }
    CommodityService.prototype.getCommodities = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Commodities", { observe: 'body' });
    };
    CommodityService.prototype.addCommodity = function (newCommodity) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Commodities/CreateOrUpdate", newCommodity);
    };
    CommodityService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], CommodityService);
    return CommodityService;
}());



/***/ }),

/***/ "./client/app/shared/services/local-storage.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LocalStorageService = (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.get = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    LocalStorageService.prototype.set = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
    LocalStorageService.prototype.remove = function (key) {
        localStorage.removeItem(key);
    };
    LocalStorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LocalStorageService);
    return LocalStorageService;
}());



/***/ }),

/***/ "./client/app/shared/services/questions.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QuestionsService = (function () {
    function QuestionsService(httpClient) {
        this.httpClient = httpClient;
    }
    QuestionsService.prototype.getQuestionsByGroup = function (group) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Questions/GetByGroup(" + group + ")");
    };
    QuestionsService.prototype.addAnswersArray = function (answers) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Answers/CreateOrUpdate", answers, { observe: 'response' });
    };
    QuestionsService.prototype.deleteAnswer = function (oid) {
        return this.httpClient.delete(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Answers(" + oid + ")", { observe: 'response' });
    };
    QuestionsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], QuestionsService);
    return QuestionsService;
}());



/***/ }),

/***/ "./client/app/shared/services/reporting.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReportingService = (function () {
    function ReportingService(httpClient) {
        this.httpClient = httpClient;
    }
    ReportingService.prototype.getAllDimensions = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiUrl + "/api/Dimensions");
    };
    ReportingService.prototype.getAllPrinciples = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiUrl + "/api/Principles");
    };
    ReportingService.prototype.getAllPrincipleGroups = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_1__environments_environment__["a" /* environment */].apiUrl + "/api/PrincipleGroups/GetLiteStatusList");
    };
    ReportingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["b" /* HttpClient */]])
    ], ReportingService);
    return ReportingService;
}());



/***/ }),

/***/ "./client/app/shared/services/token.Interseptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__("./client/app/shared/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenInterceptor = (function () {
    function TokenInterceptor(injector) {
        var _this = this;
        this.injector = injector;
        setTimeout(function () {
            _this.authService = _this.injector.get(__WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]);
        });
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var token = JSON.parse(localStorage.getItem('access_token'));
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
        return next.handle(request);
    };
    TokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./client/app/shared/services/unit-item.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnitItemService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_profile_user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UnitItemService = (function () {
    function UnitItemService(route, userProfileService) {
        this.route = route;
        this.userProfileService = userProfileService;
    }
    UnitItemService.prototype.getCurrentUnitId = function () {
        return this.route.params.mergeMap(function (params) {
            var currentUnitId = params['unitId'].toString();
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(currentUnitId);
        });
    };
    UnitItemService.prototype.resolve = function (route, state) {
        return this.userProfileService.getCurrentUnitId();
    };
    UnitItemService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__user_profile_user_profile_service__["a" /* UserProfileService */]])
    ], UnitItemService);
    return UnitItemService;
}());



/***/ }),

/***/ "./client/app/shared/services/unit.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnitService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UnitService = (function () {
    function UnitService(httpClient) {
        this.httpClient = httpClient;
    }
    UnitService.prototype.getOrganisationByOid = function (organisationOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Organisations?key=" + organisationOid);
    };
    UnitService.prototype.getUnitsListForOrganisation = function (organisationId) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Units/ByOrganisation?key=" + organisationId);
    };
    UnitService.prototype.getUnitsLiteListForOrganisation = function (organisationId) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Units/ByOrganisationLite?key=" + organisationId);
    };
    UnitService.prototype.getUnitById = function (id) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Units?key=" + id);
    };
    UnitService.prototype.deleteUnitById = function (id) {
        return this.httpClient.delete(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Units?key=" + id);
    };
    UnitService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], UnitService);
    return UnitService;
}());



/***/ }),

/***/ "./client/app/shared/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__local_storage_service__ = __webpack_require__("./client/app/shared/services/local-storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify__ = __webpack_require__("./node_modules/devextreme/ui/notify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(httpClient, localStorageService) {
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.isOrganisationNull = true;
        this.currentUnitIdAsSubject = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["b" /* Subject */]();
        this.disabledAnswerVariantText = '';
    }
    UserService.prototype.loadCurrentUser = function () {
        var _this = this;
        var currentUser = this.localStorageService.get('current_user');
        console.log('this.localStorageService.get("current_user")', currentUser);
        if (currentUser) {
            return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Users/GetByNameFull?name=" + currentUser, { observe: 'response' })
                .map(function (response) {
                console.log('getUser', response);
                _this.disabledAnswerVariantText = response.body['DisabledAnswerVariantText'];
                _this.currentUser = response.body;
                console.log('currentUser', _this.currentUser);
                return _this.currentUser;
            });
        }
    };
    UserService.prototype.updateCurrentUser = function (updatedProfile) {
        var currentUser = this.localStorageService.get('current_user');
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Users", updatedProfile, { observe: 'response' });
    };
    UserService.prototype.changeCurrentUnit = function (currentUnit) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Users", currentUnit, { observe: 'response' })
            .map(function (response) {
            var currentUnitId = response.body.CurrentUnitId;
            return currentUnitId;
        });
    };
    UserService.prototype.getUserRole = function () {
        var _this = this;
        var currentUser = this.localStorageService.get('current_user');
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Users/GetByName?name=" + currentUser, { observe: 'response' })
            .map(function (response) {
            console.log("user", response);
            _this.setCurrentUser(_this.currentUser);
            response.body['OrganisationOid'] == '' ? _this.isOrganisationNull = true : _this.isOrganisationNull = false;
            _this.currentUnitId = response.body['CurrentUnitId'];
            console.log('this.currentUnitId', _this.currentUnitId);
            return response.body['Roles'][0];
        });
    };
    UserService.prototype.getUserInfo = function () {
        var currentUser = this.localStorageService.get('current_user');
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Users/GetByName?name=" + currentUser, { observe: 'response' });
    };
    UserService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    UserService.prototype.setCurrentUser = function (user) {
        this.currentUser = user;
    };
    UserService.prototype.getCountriesList = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl + "/api/Countries", { observe: 'response' })
            .map(function (response) { return response.body; });
    };
    UserService.prototype.showUserNotification = function (message, type) {
        return __WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify___default()({
            message: "" + message,
            closeOnClick: true,
            closeOnOutsideClick: true,
            width: '500',
            font: '16',
            position: {
                my: 'center top',
                at: 'center top'
            }
        }, type, 1000);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__local_storage_service__["a" /* LocalStorageService */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./client/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_devextreme_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__ = __webpack_require__("./node_modules/ng-recaptcha/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_recaptcha_forms__ = __webpack_require__("./node_modules/ng-recaptcha/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng_recaptcha_forms___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng_recaptcha_forms__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_page_scroll__ = __webpack_require__("./node_modules/ng2-page-scroll/ng2-page-scroll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_token_Interseptor__ = __webpack_require__("./client/app/shared/services/token.Interseptor.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DevExtremeModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxResponsiveBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxCheckBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxSelectBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxNumberBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxButtonModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxFormModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxTagBoxModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxDataGridModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxTemplateModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxTooltipModule"],
                __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__["RecaptchaModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5_ng_recaptcha_forms__["RecaptchaFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_8_ng2_page_scroll__["a" /* Ng2PageScrollModule */],
                __WEBPACK_IMPORTED_MODULE_9__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: "AIzaSyBkoVvbeNw1T22g7V95635zS16NQo5dYNs",
                    libraries: ["places"]
                })
            ],
            declarations: [],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_10__services_token_Interseptor__["a" /* TokenInterceptor */],
                    multi: true,
                }
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DevExtremeModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxResponsiveBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxCheckBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxSelectBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxNumberBoxModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxButtonModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxFormModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxTagBoxModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxDataGridModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxTemplateModule"],
                __WEBPACK_IMPORTED_MODULE_2_devextreme_angular__["DxTooltipModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_9__agm_core__["a" /* AgmCoreModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__["RecaptchaModule"],
                __WEBPACK_IMPORTED_MODULE_5_ng_recaptcha_forms__["RecaptchaFormsModule"],
                __WEBPACK_IMPORTED_MODULE_8_ng2_page_scroll__["a" /* Ng2PageScrollModule */],
            ],
            entryComponents: [],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NO_ERRORS_SCHEMA"]]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-profile-business-unit-container\">\r\n  <form (submit)=\"onFormSubmitUpdateUnit($event)\">\r\n  <dx-form\r\n    labelLocation=\"right\"\r\n    (onFieldDataChanged)=\"onFieldDataChanged($event)\"\r\n    [(formData)]=\"unitInfo\"\r\n    [readOnly]=\"false\"\r\n    [showColonAfterLabel]=\"true\"\r\n    [showValidationSummary]=\"true\"\r\n    validationGroup=\"businessUnit\"\r\n  >\r\n    <dxi-item dataField=\"UnitName\"\r\n              [editorOptions]=\"{ placeholder: 'BUSINESS UNIT NAME  ( eg Farm Name, Packhouse name, etc) '}\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Business Unit Name is required\"\r\n      >\r\n      </dxi-validation-rule>\r\n    </dxi-item>\r\n\r\n    <dxi-item dataField=\"UnitTypeId\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"unitTypeBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Type of business is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>\r\n\r\n    <dxi-item *ngIf=\"unitStructureBoxOptions\" dataField=\"UnitStructure\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"unitStructureBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Unit Structure is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>\r\n\r\n    <dxi-item dataField=\"ResponsibleName\"\r\n              [editorOptions]=\"{ placeholder: 'NAME OF PERSON RESPONSIBLE FOR THIS UNIT '}\">\r\n    </dxi-item>\r\n    <dxi-item dataField=\"ResponsibleSurname\"\r\n              [editorOptions]=\"{ placeholder: 'LAST NAME OF PERSON RESPONSIBLE FOR THIS UNIT '}\">\r\n    </dxi-item>\r\n    <dxi-item dataField=\"ResponsibleEmail\"\r\n              [editorOptions]=\"{ placeholder: 'EMAIL OF PERSON RESPONSIBLE FOR THIS UNIT '}\">\r\n\r\n      <dxi-validation-rule\r\n        type=\"pattern\"\r\n        [pattern]=\"emailPattern\"\r\n        message=\"Enter valid Email\"\r\n      >\r\n      </dxi-validation-rule>\r\n    </dxi-item>\r\n\r\n   <!-- <dxi-item *ngIf=\"countryBoxOptions\" dataField=\"UnitCountryId\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"countryBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Country is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>-->\r\n\r\n    <dxi-item\r\n      [template]=\"'countryTemplate'\">\r\n    </dxi-item>\r\n    <div *dxTemplate=\"let data of 'countryTemplate'\">\r\n      <dx-select-box #countrySelector\r\n                     [items]=\"countriesInfo\"\r\n                     displayExpr=\"Name\"\r\n                     placeholder=\"SELECT COUNTRY\"\r\n                     valueExpr=\"Oid\"\r\n                     [value]=\"unitInfo.UnitCountryId\"\r\n                     (onSelectionChanged)=\"getCountryValueForUnit($event)\">\r\n        <dx-validator validationGroup=\"businessUnit\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Country is required\">\r\n          </dxi-validation-rule>\r\n        </dx-validator>\r\n      </dx-select-box>\r\n    </div>\r\n\r\n\r\n\r\n    <dxi-item itemType=\"group\" caption=\"Cellphone number\">\r\n    <dxi-item dataField=\"ResponsibleMobile\"\r\n              [editorOptions]=\"{\r\n                    placeholder: 'TELEPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-9999',\r\n                    useMaskedValue: true\r\n                }\">\r\n    </dxi-item>\r\n\r\n\r\n    </dxi-item>\r\n    <dxi-item itemType=\"group\" caption=\"Phone number\">\r\n    <dxi-item dataField=\"ResponsiblePhone\"\r\n              [editorOptions]=\"{\r\n                    placeholder: 'CELLPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-9999',\r\n                    useMaskedValue: true\r\n               }\">\r\n    </dxi-item>\r\n    </dxi-item>\r\n\r\n    <dxi-item  dataField=\"UnitCommodityId\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"commoditiesBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Commodity is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>\r\n\r\n    <dxi-item dataField=\"FrameworkId\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"frameworkBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Framework is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>\r\n\r\n    <dxi-item\r\n      [template]=\"'standardTemplate'\">\r\n    </dxi-item>\r\n\r\n    <div *dxTemplate=\"let data of 'standardTemplate'\">\r\n      <dx-tag-box #multySelector\r\n                  [dataSource]=\"standardsInfo\"\r\n                  [value]=\"unitInfo.Standards\"\r\n                  displayExpr=\"Title\"\r\n                  valueExpr=\"OID\"\r\n                  placeholder=\"SELECT STANDARDS\"\r\n                  [disabled]=\"!ifFrameworkSelected\"\r\n                   >\r\n      </dx-tag-box>\r\n    </div>\r\n    <dxi-item\r\n      [template]=\"'supplierTemplate'\">\r\n    </dxi-item>\r\n    <div *dxTemplate=\"let data of 'supplierTemplate'\">\r\n      <dx-tag-box #multySelectorSupplier\r\n                  [items]=\"supplierInfo\"\r\n                  [value]=\"unitInfo.Suppliers\"\r\n                  displayExpr=\"Title\"\r\n                  placeholder=\"SELECT SUPPLIER\"\r\n                  valueExpr=\"OID\">\r\n        <dx-validator validationGroup=\"businessUnit\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Supplier is required\">\r\n          </dxi-validation-rule>\r\n        </dx-validator>\r\n      </dx-tag-box>\r\n    </div>\r\n    <dxi-item\r\n      [template]=\"'retailerTemplate'\">\r\n    </dxi-item>\r\n    <div *dxTemplate=\"let data of 'retailerTemplate'\">\r\n      <dx-tag-box #multySelectorRetailer\r\n                  [items]=\"retailerInfo\"\r\n                  displayExpr=\"Title\"\r\n                  [value]=\"unitInfo.Retailers\"\r\n                  placeholder=\"ADD RETAILER\"\r\n                  valueExpr=\"OID\">\r\n        <dx-validator validationGroup=\"businessUnit\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Retailer is required\">\r\n          </dxi-validation-rule>\r\n        </dx-validator>\r\n      </dx-tag-box>\r\n    </div>\r\n   <!-- <dxi-item *ngIf=\"supplierBoxOptions\" dataField=\"UnitSupplierId\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"supplierBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Supplier is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>-->\r\n  <!--  <dxi-item  dataField=\"UnitRetailerId\"\r\n              editorType=\"dxSelectBox\"\r\n              [editorOptions]=\"retailerBoxOptions\">\r\n      <dxi-validation-rule\r\n        type=\"required\"\r\n        message=\"Retailer is required\">\r\n      </dxi-validation-rule>\r\n    </dxi-item>-->\r\n  </dx-form>\r\n\r\n    <dx-validation-group *ngIf=\"isUnitCreate\" validationGroup=\"businessUnit\">\r\n     <!-- <div class=\"questions-container\" *ngFor=\"let question of questionsWithAnswers let index = index\">\r\n        <div >{{question.question}}</div>\r\n        <div>\r\n          <dx-number-box\r\n            [(value)]=\"question.answer\"\r\n            [showSpinButtons]=\"true\"\r\n            [min]=\"0\"\r\n          >\r\n            &lt;!&ndash; <dx-validator>\r\n               <dxi-validation-rule type=\"required\" message=\"Answer is required\"></dxi-validation-rule>\r\n             </dx-validator>&ndash;&gt;\r\n          </dx-number-box>\r\n        </div>\r\n      </div>-->\r\n      <dx-validation-summary></dx-validation-summary>\r\n    </dx-validation-group>\r\n\r\n  <h5 class=\"map-title\">BUSINESS UNIT LOCATION</h5>\r\n  <div class=\"dx-textbox dx-texteditor dx-widget dx-texteditor-masked map-container\">\r\n    <div class=\"dx-texteditor-container\">\r\n      <input placeholder=\"Add Address of Your Organisation\" autocorrect=\"off\" name=\"search\" autocapitalize=\"off\" spellcheck=\"off\" type=\"text\"\r\n             class=\"search-location\"  #search ngformControl=\"searchControl\">\r\n    </div>\r\n  </div>\r\n  <agm-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\r\n    <agm-marker [latitude]=\"latitude\" [longitude]=\"longitude\"\r\n                [markerDraggable]=\"true\"\r\n                (dragEnd)=\"markerDragEnd($event)\"></agm-marker>\r\n\r\n  </agm-map>\r\n\r\n  <br/>\r\n  <dx-button *ngIf=\"isUnitCreate\"\r\n    validationGroup=\"businessUnit\"\r\n    [useSubmitBehavior]=\"true\"\r\n    class=\"continue-btn\"\r\n    text= \"CREATE UNIT\"\r\n    type=\"success\">\r\n  </dx-button>\r\n  <dx-button *ngIf=\"!isUnitCreate\"\r\n    validationGroup=\"businessUnit\"\r\n    [useSubmitBehavior]=\"true\"\r\n    class=\"continue-btn\"\r\n    text= \"UPDATE UNIT\"\r\n    type=\"success\">\r\n  </dx-button>\r\n</form>\r\n\r\n\r\n</div>\r\n<dx-popup\r\n  [width]=\"600\"\r\n  [height]=\"300\"\r\n  [showTitle]=\"true\"\r\n  title=\"Add new Commodity\"\r\n  [dragEnabled]=\"false\"\r\n  [closeOnOutsideClick]=\"true\"\r\n  [(visible)]=\"isCommodityPopupVisible\"\r\n>\r\n\r\n  <div *dxTemplate=\"let data of 'content'\">\r\n    <form class=\"commodity-create-form\" (submit)=\"onFormSubmitCreateCommodity($event)\">\r\n      <dx-form\r\n        [formData]=\"newCommodity\"\r\n        [readOnly]=\"false\"\r\n        [showColonAfterLabel]=\"true\"\r\n        [showValidationSummary]=\"true\"\r\n        validationGroup=\"addCommodity\"\r\n      >\r\n        <dxi-item dataField=\"Title\"\r\n                  [editorOptions]=\"{placeholder: 'ADD TITLE'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Title is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n        <dxi-item dataField=\"Reference\"\r\n                  [editorOptions]=\"{placeholder: 'ADD REFERENCE'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Reference is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n      </dx-form>\r\n      <dx-button validationGroup=\"addCommodity\"\r\n                 [useSubmitBehavior]=\"true\"\r\n                 class=\"continue-btn\"\r\n                 text=\"Add Commodity\"\r\n                 type=\"success\">\r\n      </dx-button>\r\n    </form>\r\n  </div>\r\n</dx-popup>\r\n\r\n<dx-popup\r\n  [width]=\"600\"\r\n  [height]=\"300\"\r\n  [showTitle]=\"true\"\r\n  title=\"Add new Supplier\"\r\n  [dragEnabled]=\"false\"\r\n  [closeOnOutsideClick]=\"true\"\r\n  [(visible)]=\"isSupplierPopupVisible\"\r\n>\r\n\r\n  <div *dxTemplate=\"let data of 'content'\">\r\n    <form class=\"commodity-create-form supplier-edit-form\" (submit)=\"onFormSubmitCreateSupplier($event)\">\r\n      <dx-form\r\n        [formData]=\"newSupplier\"\r\n        [readOnly]=\"false\"\r\n        [showColonAfterLabel]=\"true\"\r\n        [showValidationSummary]=\"true\"\r\n        validationGroup=\"addSupplier\"\r\n      >\r\n        <dxi-item dataField=\"Title\"\r\n                  [editorOptions]=\"{placeholder: 'ADD TITLE'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Title is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n        <dxi-item dataField=\"ShortTitle\"\r\n                  [editorOptions]=\"{placeholder: 'ADD SHORT TITLE'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Short title is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n        <dxi-item dataField=\"Description\"\r\n                  editorType=\"dxTextArea\"\r\n                  [editorOptions]=\"{placeholder: 'ADD DESCRIPTION'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Description is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n      </dx-form>\r\n      <dx-button validationGroup=\"addSupplier\"\r\n                 [useSubmitBehavior]=\"true\"\r\n                 class=\"continue-btn\"\r\n                 text=\"Add Supplier\"\r\n                 type=\"success\">\r\n      </dx-button>\r\n    </form>\r\n  </div>\r\n</dx-popup>\r\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.user-profile-business-unit-container {\n  min-width: 300px;\n  padding: 15px 50px;\n  background-color: #fff;\n  margin-top: 70px; }\n.user-profile-business-unit-container /deep/ .dx-texteditor-input {\n    min-height: 30px;\n    padding: 0 9px;\n    line-height: 30px; }\n.user-profile-business-unit-container /deep/ dx-select-box {\n    min-height: 30px; }\n.user-profile-business-unit-container /deep/ dx-select-box input {\n      font-size: 1em; }\n.user-profile-business-unit-container .dx-list-item-content {\n    font-size: 1em; }\n.user-profile-business-unit-container /deep/ .dx-texteditor {\n    border-radius: 0; }\n.user-profile-business-unit-container /deep/ dx-select-box[placeholder=\"SELECT COUNTRY\"] {\n    margin-right: 20px;\n    position: relative; }\n.user-profile-business-unit-container /deep/ dx-select-box[placeholder=\"SELECT COUNTRY\"]:after {\n    content: \" *\";\n    position: absolute;\n    right: -20px;\n    top: 5px;\n    color: #ea4444;\n    display: inline-block; }\n.user-profile-business-unit-container .link-style {\n    float: right;\n    padding-right: 25px;\n    font-size: 12px;\n    color: #000;\n    font-style: italic;\n    cursor: pointer; }\n.user-profile-business-unit-container .link-style:hover {\n      color: #0000EE; }\n.user-profile-business-unit-container .link-style a {\n      color: #000;\n      text-decoration: underline; }\n.user-profile-business-unit-container .link-style a:hover {\n        color: #0000EE; }\n.user-profile-business-unit-container /deep/ dx-tag-box[placeholder=\"SELECT SUPPLIER\"], .user-profile-business-unit-container /deep/ dx-tag-box[placeholder=\"ADD RETAILER\"], .user-profile-business-unit-container /deep/ dx-tag-box[placeholder=\"SELECT STANDARDS\"] {\n    margin-right: 20px;\n    position: relative; }\n.user-profile-business-unit-container /deep/ dx-tag-box[placeholder=\"SELECT SUPPLIER\"]:after, .user-profile-business-unit-container /deep/ dx-tag-box[placeholder=\"ADD RETAILER\"]:after {\n    content: \" *\";\n    position: absolute;\n    right: -20px;\n    top: 5px;\n    color: #ea4444;\n    display: inline-block; }\n.user-profile-business-unit-container /deep/ .agm-map-container-inner {\n    margin-right: 20px; }\n.user-profile-business-unit-container /deep/ form {\n    min-width: 300px;\n    background-color: #fff; }\n.user-profile-business-unit-container /deep/ form .dx-form-group-with-caption > .dx-form-group-content {\n      border-top: none;\n      padding-top: 0;\n      margin-top: 0; }\n.user-profile-business-unit-container /deep/ form .dx-form-group-caption {\n      color: #9898A5;\n      font-size: 16px; }\n.user-profile-business-unit-container .registration-mandatory {\n    float: left;\n    margin-bottom: 15px;\n    font-size: 14px; }\n.user-profile-business-unit-container /deep/ dx-button {\n    margin-top: 15px;\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    max-width: 1040px; }\n.user-profile-business-unit-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.user-profile-business-unit-container .dx-item {\n    margin-bottom: 15px; }\n.user-profile-business-unit-container .rc-anchor .rc-anchor-normal .rc-anchor-light {\n    margin-top: 15px; }\n.user-profile-business-unit-container .registration-terms-conditions {\n    font-size: 12px;\n    margin-bottom: 15px; }\n.user-profile-business-unit-container .search-location {\n    width: 100%;\n    border: 0 none;\n    line-height: 30px; }\n.user-profile-business-unit-container .map-container {\n    margin-bottom: 15px;\n    margin-right: 20px; }\n.user-profile-business-unit-container .map-title {\n    font-size: 14px;\n    margin: 15px; }\n.user-profile-business-unit-container agm-map {\n    height: 300px; }\n.commodity-create-form /deep/ dx-form {\n  margin-bottom: 35px; }\n.commodity-create-form /deep/ dx-button {\n  margin-top: 15px;\n  color: #fff;\n  background-color: #6BCDFD;\n  border: 2px solid #6BCDFD;\n  width: 100%;\n  border-radius: 7px;\n  font-weight: bold;\n  /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.commodity-create-form /deep/ dx-button:hover {\n    color: #fff;\n    background-color: #39bcfc;\n    border-color: #2fb9fc; }\n.supplier-edit-form /deep/ dx-form {\n  margin-bottom: 0; }\n@media screen and (min-width: 768px) {\n  .user-profile-business-unit-container {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 2fr 1fr;\n        grid-template-columns: 2fr 1fr; } }\n.questions-container {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 4fr 1fr;\n      grid-template-columns: 4fr 1fr;\n  margin: 15px;\n  font-size: 13px; }\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileBusinessUnitItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_models_unit_model__ = __webpack_require__("./client/app/shared/models/unit.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_models_form_validation_model__ = __webpack_require__("./client/app/shared/models/form-validation.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_commodity_service__ = __webpack_require__("./client/app/shared/services/commodity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_questions_service__ = __webpack_require__("./client/app/shared/services/questions.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__ = __webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__user_profile_business_unit_item_service__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_devextreme_angular__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var UserProfileBusinessUnitItemComponent = (function () {
    function UserProfileBusinessUnitItemComponent(route, router, userProfileService, registrationSettingsService, userService, commodityService, unitService, mapsAPILoader, questionsService, userProfileBusinessUnitItemService, changeDetector, ngZone) {
        this.route = route;
        this.router = router;
        this.userProfileService = userProfileService;
        this.registrationSettingsService = registrationSettingsService;
        this.userService = userService;
        this.commodityService = commodityService;
        this.unitService = unitService;
        this.mapsAPILoader = mapsAPILoader;
        this.questionsService = questionsService;
        this.userProfileBusinessUnitItemService = userProfileBusinessUnitItemService;
        this.changeDetector = changeDetector;
        this.ngZone = ngZone;
        this.isCommodityPopupVisible = false;
        this.isSupplierPopupVisible = false;
        this.unitAddress = 'HI';
        this.standardsOidArray = [];
        this.ifFrameworkSelected = false;
        this.phoneCode = '';
        this.isUnitCreate = false;
        this.bussinesUnitInfo = [];
        this.businessUnitStructure = [];
        this.unitInfo = {};
        this.countriesInfo = [];
        this.commodityInfo = [];
        this.supplierInfo = [];
        this.frameworkInfo = [];
        this.standardsInfo = [];
        this.retailerInfo = [];
        this.currentStandards = [];
        this.questions = [];
        this.questionsWithAnswers = [];
        this.answersToPost = [];
        this.self = this;
        this.formValidation = new __WEBPACK_IMPORTED_MODULE_6__shared_models_form_validation_model__["a" /* FormValidation */]();
        this.phonePattern = this.formValidation.getPhonePattern();
        this.phoneRules = this.formValidation.getPhoneRules();
        this.emailPattern = this.formValidation.getEmailPattern();
        this.newCommodity = this.userProfileService.getNewCommodity();
        this.newSupplier = this.userProfileService.getNewSupplier();
        this.getAddressFromCordinates = this.getAddressFromCordinates.bind(this);
        this.markerDragEnd = this.markerDragEnd.bind(this);
        this.unitAddress = this.self.unitAddress;
    }
    UserProfileBusinessUnitItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentStandards = [];
        this.standardsOidArray = [];
        this.getCurrentUnitId()
            .subscribe(function (unitId) {
            if (unitId !== "new-unit") {
                _this.unitService.getUnitById(unitId)
                    .subscribe(function (unit) {
                    _this.unitInfo = unit;
                    console.log('this.unitInfo GET', _this.unitInfo);
                    _this.getAddressFromCordinates(_this.unitInfo.LocationLattitude, _this.unitInfo.LocationLongtitude);
                    console.log('this.unitInfo', _this.unitInfo, _this.unitAddress);
                    _this.setupGoogleMap();
                    // console.log('this.searchControl', this.searchControl, this.unitAddress);
                    _this.userProfileBusinessUnitItemService.getStandardsByUnitId(unitId.toString())
                        .subscribe(function (standards) {
                        console.log('getStandardsByUnitID', standards);
                        _this.currentStandards = standards;
                    });
                });
            }
            else {
                _this.isUnitCreate = true;
                _this.setupGoogleMap();
                _this.latitude = 39.8282;
                _this.longitude = -98.5795;
                _this.userService.getUserInfo()
                    .subscribe(function (userLight) {
                    _this.userId = userLight.body['Oid'];
                    console.log('userLight', userLight.body);
                    if (userLight.body['OrganisationOid'] !== '') {
                        _this.organisationOid = userLight.body['OrganisationOid'];
                        _this.unitInfo.OrganisationId = _this.organisationOid;
                    }
                });
            }
        });
        this.commodityService.getCommodities()
            .subscribe(function (response) {
            console.log('commodities', response);
            _this.commodityInfo = response;
            var commodityValue = _this.isUnitCreate ? (_this.commodityInfo.length === 1 ? _this.commodityInfo[0].OID : "") : _this.unitInfo.UnitCommodityId;
            _this.commoditiesBoxOptions = {
                dataSource: _this.commodityInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                value: commodityValue,
                placeholder: "SELECT PRIMARY COMMODITY"
            };
        }, function (error) {
            console.log("commodities", error),
                _this.userService.showUserNotification(error.error.Message, 'error');
        });
        this.businessUnitStructure = [{ Name: 'Independent', Oid: __WEBPACK_IMPORTED_MODULE_4__shared_models_unit_model__["b" /* UnitStructure */].Independent }, {
                Name: 'Cooperative',
                Oid: __WEBPACK_IMPORTED_MODULE_4__shared_models_unit_model__["b" /* UnitStructure */].Cooperative
            }];
        var businessUnitStructureValue = this.isUnitCreate ? (this.businessUnitStructure.length === 1 ? this.businessUnitStructure[0].Oid : "") : this.unitInfo.UnitStructure;
        this.unitStructureBoxOptions = {
            dataSource: this.businessUnitStructure,
            displayExpr: 'Name',
            valueExpr: 'Oid',
            placeholder: "ADD BUSINESS UNIT STRUCTURE",
            value: businessUnitStructureValue,
        };
        this.registrationSettingsService.getUnitType()
            .subscribe(function (response) {
            _this.bussinesUnitInfo = response['value'];
            var unitTypeValue = _this.isUnitCreate ? (_this.bussinesUnitInfo.length === 1 ? _this.bussinesUnitInfo[0].OID : "") : _this.unitInfo.UnitTypeId;
            _this.unitTypeBoxOptions = {
                dataSource: _this.bussinesUnitInfo,
                displayExpr: 'Name',
                valueExpr: 'OID',
                value: unitTypeValue,
                placeholder: "ADD TYPE OF BUSINESS UNIT"
            };
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        this.userService.getCountriesList()
            .subscribe(function (item) {
            _this.countriesInfo = item;
            console.log('this.countriesInfo', _this.countriesInfo);
            var countriesValue = _this.isUnitCreate ? (_this.countriesInfo.length === 1 ? _this.countriesInfo[0].Oid : "") : _this.unitInfo.UnitCountryId;
            _this.countryBoxOptions = {
                dataSource: _this.countriesInfo,
                displayExpr: 'Name',
                valueExpr: 'Oid',
                value: countriesValue,
                placeholder: "SELECT COUNTRY"
            };
        });
        this.registrationSettingsService.getSuppliers()
            .subscribe(function (response) {
            console.log('suppliers', response);
            _this.supplierInfo = response;
            /* let suppliersValue = this.isUnitCreate ? (this.supplierInfo.length === 1 ? this.supplierInfo[0].OID : "") : this.unitInfo.UnitSupplierId;
             this.supplierBoxOptions = {
               dataSource: this.supplierInfo,
               displayExpr: 'Title',
               valueExpr: 'OID',
               value: suppliersValue,
               placeholder: "SELECT SUPPLIER"
             };*/
        });
        this.registrationSettingsService.getRetailers()
            .subscribe(function (response) {
            _this.retailerInfo = response;
        });
        this.questionsService.getQuestionsByGroup('scale')
            .subscribe(function (questions) {
            console.log('questions', questions);
            _this.questions = questions;
            _this.questions.map(function (question) {
                var questionItem = {
                    questionId: question.OID,
                    question: question.Title,
                    answer: null
                };
                _this.questionsWithAnswers.push(questionItem);
            });
            console.log('this.questionsWithAnswers', _this.questionsWithAnswers);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
    };
    UserProfileBusinessUnitItemComponent.prototype.getCountryValueForUnit = function (value) {
        this.unitInfo.UnitCountryId = value.selectedItem.Oid;
        this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
    };
    UserProfileBusinessUnitItemComponent.prototype.getCurrentUnitId = function () {
        var _this = this;
        return this.route.params.mergeMap(function (params) {
            _this.currentUnitId = params['unitId'].toString();
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(_this.currentUnitId);
        });
    };
    UserProfileBusinessUnitItemComponent.prototype.onCommodityChanged = function (e) {
        console.log(e);
    };
    UserProfileBusinessUnitItemComponent.prototype.setupGoogleMap = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = this.unitInfo.LocationLattitude;
        this.longitude = this.unitInfo.LocationLongtitude;
        //create search FormControl
        //this.searchControl = new FormControl();
        //set current position
        this.setCurrentPosition();
        console.log('this.searchElementRef.nativeElement');
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            console.log(autocomplete);
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    UserProfileBusinessUnitItemComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
                console.log(_this.latitude);
                console.log(_this.longitude);
            });
        }
    };
    UserProfileBusinessUnitItemComponent.prototype.onFormSubmitUpdateUnit = function (e) {
        var _this = this;
        var counter = 0;
        if (this.isUnitCreate) {
            console.log("this.unitInfo", this.unitInfo);
            console.log("this.userService.getCurrentUser().userId,", this.userService.getCurrentUser().userId);
            /* this.questionsWithAnswers.forEach(question => {
               if (question.answer === null) {
                 this.userService.showUserNotification('You need to answer all questions', 'info');
                 return;
               } else {
                 counter++;
               }
             });*/
        }
        this.unitInfo.LocationLattitude = this.latitude;
        this.unitInfo.LocationLongtitude = this.longitude;
        this.unitInfo.Suppliers = this.multySelectorSupplier.value;
        this.unitInfo.Retailers = this.multySelectorRetailer.value;
        this.unitInfo.Standards = this.multySelector.value;
        console.log('this.multySelectorRetailer', this.multySelectorRetailer);
        console.log('this.multySelectorSupplier', this.multySelectorSupplier);
        if (!this.isUnitCreate) {
            var isStandardUpdated = false;
            console.log('this.unitInfo to update', this.unitInfo);
            console.log('this.standardsOidArray', this.standardsOidArray);
            this.registrationSettingsService.addOrUpdateUnit(this.unitInfo)
                .subscribe(function (unitUpdate) {
                var message = !_this.isUnitCreate ? "UNIT " + _this.unitInfo.UnitName.toUpperCase() + " WAS UPDATED" : "UNIT " + _this.unitInfo.UnitName.toUpperCase() + " WAS CREATED";
                _this.userService.showUserNotification(message, 'success');
                console.log("unitUpdate/create", unitUpdate);
                _this.router.navigate(["profile/business-unit"]);
            }, function (error) {
                _this.userService.showUserNotification("" + error.error.Message, 'error');
            });
            console.log('isStandardUpdated', isStandardUpdated);
        }
        /* if (this.isUnitCreate && counter === this.questionsWithAnswers.length) {*/
        if (this.isUnitCreate) {
            this.registrationSettingsService.addOrUpdateUnit(this.unitInfo)
                .subscribe(function (unitUpdate) {
                var isStandardUpdated = false;
                console.log('this.questionsWithAnswers', _this.questionsWithAnswers);
                /* this.questionsWithAnswers.map(answer => {
                   this.answersToPost.push({
                     Unit: unitUpdate['Oid'],
                     User: this.userId,
                     AnswerText: answer.answer,
                     Question: answer.questionId
                   });
                 });*/
                console.log('this.answersToPost', _this.answersToPost);
                /* this.questionsService.addAnswersArray(this.answersToPost)
                   .subscribe(answers => {
                     this.questionsWithAnswers = [];
                     console.log('answers', answers);*/
                // if (answers.status === 200) {
                var message = !_this.isUnitCreate ? "UNIT " + _this.unitInfo.UnitName.toUpperCase() + " WAS UPDATED" : "UNIT " + _this.unitInfo.UnitName.toUpperCase() + " WAS CREATED";
                _this.userService.showUserNotification(message, 'success');
                console.log("unitUpdate/create", unitUpdate);
                _this.router.navigate(["profile/business-unit"]);
                // }
            }, function (error) {
                _this.userService.showUserNotification("" + error.error.Message, 'error');
            });
        }
        //   });
        //  }
        e.preventDefault();
    };
    UserProfileBusinessUnitItemComponent.prototype.getAddressFromCordinates = function (lat, lng) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({
            'location': latlng
        }, (function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    _this.unitAddress = results[1].formatted_address;
                    _this.searchElementRef.nativeElement.value = _this.unitAddress;
                    console.log('ADDRES', _this.unitAddress);
                    if (_this.unitAddress) {
                        // this.searchElementRef = new FormControl({value: this.unitAddress});
                        // console.log('this.searchElementRef', this.searchElementRef.value);
                        console.log('this.searchElementRef', _this.searchElementRef);
                    }
                }
                else {
                    console.log('no results');
                }
            }
            else {
                console.error('Geocoder failed due to: ' + status);
            }
        }));
    };
    UserProfileBusinessUnitItemComponent.prototype.onFormSubmitCreateCommodity = function (e) {
        var _this = this;
        console.log('newCommodity', this.newCommodity);
        this.commodityService.addCommodity(this.newCommodity)
            .subscribe(function (commodity) {
            delete commodity['@odata.context'];
            _this.commodityInfo.push(commodity);
            _this.commoditiesBoxOptions = {
                dataSource: _this.commodityInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                value: commodity['OID'],
                placeholder: "SELECT PRIMARY COMMODITY"
            };
            console.log('commodity', commodity);
            console.log('this.commodityInfo', _this.commodityInfo);
            _this.userService.showUserNotification("COMMODITY " + _this.newCommodity.Title.toUpperCase() + " WAS CREATED", 'success');
            _this.isCommodityPopupVisible = false;
        }, function (error) {
            _this.userService.showUserNotification("" + error.error.Message, 'error');
        });
        e.preventDefault();
    };
    UserProfileBusinessUnitItemComponent.prototype.onFormSubmitCreateSupplier = function (e) {
        var _this = this;
        console.log('this.newSupplier', this.newSupplier);
        this.registrationSettingsService.addSupplier(this.newSupplier)
            .subscribe(function (supplier) {
            _this.supplierInfo.push(supplier);
            _this.supplierBoxOptions = {
                dataSource: _this.supplierInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                value: supplier['OID'],
                placeholder: "SELECT SUPPLIER"
            };
            _this.userService.showUserNotification("SUPPLIER " + _this.newSupplier.Title.toUpperCase() + " WAS CREATED", 'success');
            _this.isSupplierPopupVisible = false;
            console.log('NEWsupplier', supplier);
        }, function (error) {
            _this.userService.showUserNotification("" + error.error.Message, 'error');
        });
        e.preventDefault();
    };
    UserProfileBusinessUnitItemComponent.prototype.onFieldDataChanged = function (event) {
        var _this = this;
        console.log('field', event);
        if (event.dataField === "UnitCommodityId" && event.value) {
            this.userProfileBusinessUnitItemService.getFrameworksByCommodity(event.value)
                .subscribe(function (frameworks) {
                _this.frameworkInfo = frameworks;
                console.log('farmeworks', frameworks);
                if (_this.frameworkInfo.length) {
                    _this.frameworkBoxOptions = {
                        items: _this.frameworkInfo,
                        displayExpr: 'Title',
                        valueExpr: 'OID',
                        placeholder: "SELECT PRIMARY FRAMEWORK",
                        disabled: false,
                    };
                }
            }, function (error) {
                _this.userService.showUserNotification(error.error.Message, 'error');
            });
        }
        if (event.dataField === "UnitCommodityId" && !event.value) {
            this.frameworkBoxOptions = {
                items: this.frameworkInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                placeholder: "SELECT PRIMARY FRAMEWORK",
                disabled: true
            };
        }
        if (event.dataField === "FrameworkId" && event.value) {
            this.userProfileBusinessUnitItemService.getStandardsByFramework(event.value)
                .subscribe(function (standards) {
                console.log('this.standardsInfo', standards);
                _this.standardsInfo = standards;
                _this.ifFrameworkSelected = true;
            });
        }
    };
    UserProfileBusinessUnitItemComponent.prototype.markerDragEnd = function (event) {
        console.log('MARKER', event);
        this.getAddressFromCordinates(event.coords.lat, event.coords.lng);
        this.latitude = event.coords.lat;
        this.longitude = event.coords.lng;
    };
    UserProfileBusinessUnitItemComponent.prototype.setStandards = function (event) {
        console.log('changeStandards', event.value);
        this.standardsOidArray = [];
        if (this.multySelector) {
            console.log(this.multySelector);
            this.standardsOidArray = this.multySelector.selectedItems.map(function (item) {
                return item.OID;
            });
        }
        console.log(this.standardsOidArray);
    };
    /* setSupplier(event) {
       console.log('supplier', this.multySelectorSupplier.values);
     }
   
     setRetailer(event) {
       console.log('retailer', this.multySelectorRetailer.values)
     }
   */
    UserProfileBusinessUnitItemComponent.prototype.ngAfterViewChecked = function () {
        this.changeDetector.detectChanges();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], UserProfileBusinessUnitItemComponent.prototype, "searchElementRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelector'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_14_devextreme_angular__["DxTagBoxComponent"])
    ], UserProfileBusinessUnitItemComponent.prototype, "multySelector", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelectorSupplier'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_14_devextreme_angular__["DxTagBoxComponent"])
    ], UserProfileBusinessUnitItemComponent.prototype, "multySelectorSupplier", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('multySelectorRetailer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_14_devextreme_angular__["DxTagBoxComponent"])
    ], UserProfileBusinessUnitItemComponent.prototype, "multySelectorRetailer", void 0);
    UserProfileBusinessUnitItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-user-profile-business-unit-item',
            template: __webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.html"),
            styles: [__webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__user_profile_service__["a" /* UserProfileService */],
            __WEBPACK_IMPORTED_MODULE_5__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_10__shared_services_commodity_service__["a" /* CommodityService */],
            __WEBPACK_IMPORTED_MODULE_9__shared_services_unit_service__["a" /* UnitService */],
            __WEBPACK_IMPORTED_MODULE_8__agm_core__["b" /* MapsAPILoader */],
            __WEBPACK_IMPORTED_MODULE_11__shared_services_questions_service__["a" /* QuestionsService */],
            __WEBPACK_IMPORTED_MODULE_13__user_profile_business_unit_item_service__["a" /* UserProfileBusinessUnitItemService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], UserProfileBusinessUnitItemComponent);
    return UserProfileBusinessUnitItemComponent;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileBusinessUnitItemService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("./client/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserProfileBusinessUnitItemService = (function () {
    function UserProfileBusinessUnitItemService(httpClient) {
        this.httpClient = httpClient;
    }
    UserProfileBusinessUnitItemService.prototype.getFrameworksByCommodity = function (commodityOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Frameworks/GetByCommodity(" + commodityOid + ")");
    };
    UserProfileBusinessUnitItemService.prototype.getStandardsByFramework = function (frameworkOid) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards/ByFramework(" + frameworkOid + ")");
    };
    UserProfileBusinessUnitItemService.prototype.getStandardsByCurrentUnit = function () {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards/ByCurrentUnit");
    };
    UserProfileBusinessUnitItemService.prototype.updateCurrentUnitSetStandards = function (standardsOids) {
        return this.httpClient.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards/UpdateCurrentUnitSet", standardsOids);
    };
    UserProfileBusinessUnitItemService.prototype.getStandardsByUnitId = function (unitId) {
        return this.httpClient.get(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].apiUrl + "/api/Standards/ByUnit(" + unitId + ")");
    };
    UserProfileBusinessUnitItemService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], UserProfileBusinessUnitItemService);
    return UserProfileBusinessUnitItemService;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"units-container\">\r\n  <div class=\"units-title\">\r\n    <h1>UNITS MANAGEMENT</h1>\r\n    <span>Click on Unit To Edit</span>\r\n  </div>\r\n  <div  class=\"align-button\">\r\n    <dx-button\r\n     (onClick)=\"addNewUnit()\"\r\n      text=\"ADD UNIT\"\r\n      type=\"success\">\r\n    </dx-button>\r\n    <dx-data-grid #dataGrid\r\n      id=\"gridContainer\"\r\n      [dataSource]=\"unitsList\"\r\n      [showBorders]=\"true\"\r\n      (onRowClick)=\"redirectToCurrentUnit($event)\"\r\n      (onRowUpdated)=\"editUnit($event)\"\r\n      (onRowRemoving)=\"removeUnit($event)\"\r\n      (onInitNewRow)=\"addNewUnit()\"\r\n      [hoverStateEnabled]=\"true\"\r\n      noDataText=\"\"\r\n      keyExpr=\"Oid\">\r\n    <dxo-paging [enabled]=\"false\"></dxo-paging>\r\n    <dxo-editing\r\n        mode=\"row\"\r\n        [allowAdding]=\"true\"\r\n        [allowDeleting]=\"true\">\r\n        <dxo-popup\r\n            [width]=\"700\"\r\n            [height]=\"345\"\r\n            [position]=\"{ my: 'top', at: 'top', of: 'window' }\">\r\n        </dxo-popup>\r\n      </dxo-editing>\r\n      <!-- <dxi-column dataField=\"id\"></dxi-column>-->\r\n      <dxi-column  [width]=\"180\"\r\n                   [fixed]=\"true\" dataField=\"UnitName\" caption=\"Unit Name\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column dataField=\"ResponsibleName\" caption=\"Name\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column dataField=\"ResponsibleSurname\" caption=\"Surname\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column dataField=\"ResponsiblePhone\" caption=\"Phone\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n      <dxi-column dataField=\"ResponsibleEmail\" caption=\"Email\">\r\n        <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n       <dxi-column\r\n        dataField=\"UnitCountryId\"\r\n        caption=\"Country\"\r\n        >\r\n        <dxo-lookup\r\n          [dataSource]=\"countriesInfo\"\r\n          displayExpr=\"Name\"\r\n          valueExpr=\"Oid\">\r\n        </dxo-lookup>\r\n         <dxi-validation-rule type=\"required\"></dxi-validation-rule>\r\n      </dxi-column>\r\n     <!-- <dxi-column\r\n        dataField=\"UnitTypeId\"\r\n        caption=\"Type of business\"\r\n      >\r\n        <dxo-lookup\r\n          [dataSource]=\"businessUnitInfo\"\r\n          displayExpr=\"Name\"\r\n          valueExpr=\"OID\">\r\n        </dxo-lookup>\r\n      </dxi-column>-->\r\n\r\n      <dxi-column\r\n        dataField=\"UnitStructure\"\r\n        caption=\"Unit Structure\"\r\n      >\r\n        <dxo-lookup\r\n          [dataSource]=\"businessUnitStructure\"\r\n          displayExpr=\"Name\"\r\n          valueExpr=\"Oid\">\r\n        </dxo-lookup>\r\n      </dxi-column>\r\n\r\n     <!-- <dxi-column\r\n        dataField=\"UnitCommodityId\"\r\n        caption=\"Commodity\"\r\n      >\r\n        <dxo-lookup\r\n          [dataSource]=\"commodityInfo\"\r\n          displayExpr=\"Title\"\r\n          valueExpr=\"OID\">\r\n        </dxo-lookup>\r\n      </dxi-column>-->\r\n     <!-- <dxi-column\r\n        dataField=\"UnitSupplierId\"\r\n        caption=\"Supplier\"\r\n      >\r\n        <dxo-lookup\r\n          [dataSource]=\"supplierInfo\"\r\n          displayExpr=\"Title\"\r\n          valueExpr=\"OID\">\r\n        </dxo-lookup>\r\n      </dxi-column>-->\r\n    </dx-data-grid>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.units-container {\n  background-color: #fff;\n  padding: 15px;\n  height: calc(100vh - 138px); }\n.units-container .units-title {\n    height: 70px;\n    background-color: #fff; }\n.units-container .units-title span {\n      font-size: 12px; }\n.units-container .units-title h1 {\n      font-size: 24px; }\n.units-container /deep/ dx-data-grid .dx-toolbar-items-container {\n    display: none !important; }\n.units-container /deep/ dx-data-grid .dx-state-hover {\n    cursor: pointer; }\n.units-container .align-button {\n    text-align: right; }\n.units-container /deep/ dx-button {\n    margin: 15px;\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 150px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.units-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileBusinessUnitComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_commodity_service__ = __webpack_require__("./client/app/shared/services/commodity.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_devextreme_ui_notify__ = __webpack_require__("./node_modules/devextreme/ui/notify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_devextreme_ui_notify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_devextreme_ui_notify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_devextreme_angular__ = __webpack_require__("./node_modules/devextreme-angular/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_devextreme_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_devextreme_angular__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UserProfileBusinessUnitComponent = (function () {
    function UserProfileBusinessUnitComponent(router, userProfileService, commodityService, registrationSettingsService, userService, unitService) {
        this.router = router;
        this.userProfileService = userProfileService;
        this.commodityService = commodityService;
        this.registrationSettingsService = registrationSettingsService;
        this.userService = userService;
        this.unitService = unitService;
        this.businessUnitInfo = [];
        this.businessUnitStructure = [];
        this.itemIndex = 0;
        this.unitInfo = {};
        this.countriesInfo = [];
        this.commodityInfo = [];
        this.supplierInfo = [];
    }
    UserProfileBusinessUnitComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.dataGrid.instance.beginCustomLoading('Loading..');
        }, 0);
        this.userService.getUserInfo()
            .subscribe(function (userLight) {
            if (userLight.body['OrganisationOid'] !== '') {
                _this.organisationOid = userLight.body['OrganisationOid'];
                //this.unitInfo.OrganisationId = this.organisationOid;
            }
            _this.unitService.getUnitsListForOrganisation(_this.organisationOid)
                .subscribe(function (units) {
                _this.unitsList = units;
                _this.dataGrid.instance.endCustomLoading();
                console.log('units', _this.unitsList);
            });
        });
        this.commodityService.getCommodities()
            .subscribe(function (response) {
            _this.commodityInfo = response['value'];
        });
        this.businessUnitStructure = [{ Name: 'Independent', Oid: 0 }, { Name: 'Cooperative', Oid: 1 }];
        this.registrationSettingsService.getUnitType()
            .subscribe(function (response) {
            _this.businessUnitInfo = response['value'];
        });
        this.userService.getCountriesList()
            .subscribe(function (item) {
            console.log('country', item);
            _this.countriesInfo = item;
        });
        this.registrationSettingsService.getSuppliers()
            .subscribe(function (response) {
            _this.supplierInfo = response['value'];
        });
    };
    UserProfileBusinessUnitComponent.prototype.redirectToCurrentUnit = function (event) {
        console.log('event.data', event.data);
        this.router.navigate(["profile/business-unit/" + event.data.Oid]);
    };
    UserProfileBusinessUnitComponent.prototype.editUnit = function (e) {
        this.router.navigate(["profile/business-unit/" + e.key]);
        console.log(e.key, e);
        e.preventDefault();
    };
    UserProfileBusinessUnitComponent.prototype.removeUnit = function (e) {
        var _this = this;
        console.log(e.key);
        this.unitService.deleteUnitById(e.key)
            .subscribe(function (unit) {
            console.log('unit', unit);
        }, function (error) {
            e.cancel = true;
            __WEBPACK_IMPORTED_MODULE_7_devextreme_ui_notify___default()({
                message: error.error.Message,
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                font: '16',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'error', 100000);
            console.log("error", error.error.Message, e);
            _this.unitsList.push(e.data);
        });
    };
    UserProfileBusinessUnitComponent.prototype.addNewUnit = function () {
        console.log('hi');
        this.router.navigate(["profile/business-unit/new-unit"]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('dataGrid'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_devextreme_angular__["DxDataGridComponent"])
    ], UserProfileBusinessUnitComponent.prototype, "dataGrid", void 0);
    UserProfileBusinessUnitComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-user-profile-business-unit',
            template: __webpack_require__("./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.html"),
            styles: [__webpack_require__("./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__user_profile_service__["a" /* UserProfileService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_commodity_service__["a" /* CommodityService */],
            __WEBPACK_IMPORTED_MODULE_2__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_unit_service__["a" /* UnitService */]])
    ], UserProfileBusinessUnitComponent);
    return UserProfileBusinessUnitComponent;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-info/user-profile-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-profile-container\">\r\n  <form (submit)=\"onFormSubmitProfilrUpdate($event)\">\r\n    <dx-form id=\"form\"\r\n             [formData]=\"userInfo\"\r\n             [readOnly]=\"false\"\r\n             [showColonAfterLabel]=\"true\"\r\n             [showValidationSummary]=\"true\"\r\n             validationGroup=\"customerData\">\r\n\r\n     <!-- <dxi-item dataField=\"UserName\"\r\n                [editorOptions]=\"{ placeholder: 'LOGIN', disabled: true}\">\r\n      </dxi-item>-->\r\n      <dxi-item dataField=\"FirstName\"\r\n                [editorOptions]=\"{ placeholder: 'NAME'}\">\r\n      </dxi-item>\r\n      <dxi-item dataField=\"LastName\"\r\n                [editorOptions]=\"{ placeholder: 'LAST NAME'}\">\r\n      </dxi-item>\r\n      <dxi-item dataField=\"Email\"\r\n                [editorOptions]=\"{ placeholder: 'EMAIL', disabled: true}\">\r\n        <dxi-validation-rule\r\n          type=\"pattern\"\r\n          [pattern]=\"emailPattern\"\r\n          message=\"Enter valid Email\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n\r\n      <dxi-item dataField=\"Country\">\r\n        <dx-select-box [dataSource]=\"countriesInfo\"\r\n                       [value]=\"userInfo.Country\"\r\n                       valueExpr=\"Oid\"\r\n                       displayExpr=\"Name\"\r\n                       placeholder=\"SELECT COUNTRY\"\r\n                       (onSelectionChanged)=\"getCountryValueForUser($event)\">\r\n        </dx-select-box>\r\n      </dxi-item>\r\n\r\n      <dxi-item dataField=\"MobileNumber\"\r\n                [editorOptions]=\"{\r\n                    placeholder: 'TELEPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-9999',\r\n                    useMaskedValue: true,\r\n                    maskInvalidMessage: 'The phone must have a correct phone format',\r\n                    disabled: phoneCode === ''\r\n                }\">\r\n      </dxi-item>\r\n      <dxi-item dataField=\"TelephoneNumber\"\r\n                [editorOptions]=\"{\r\n                      placeholder: 'CELLPHONE NUMBER',\r\n                      mask: phoneCode+'(999)999-9999',\r\n                      useMaskedValue: true,\r\n                      maskInvalidMessage: 'The phone must have a correct phone format',\r\n                      disabled: phoneCode === ''\r\n                  }\">\r\n      </dxi-item>\r\n\r\n      <dxi-item\r\n        editorType=\"dxTextBox\"\r\n        [editorOptions]=\"{ placeholder: 'OLD PASSWORD', mode: 'password' }\">\r\n        <dxo-label\r\n          text=\"Old Password\">\r\n        </dxo-label>\r\n      </dxi-item>\r\n      <dxi-item dataField=\"NewPassword\"\r\n                [editorOptions]=\"{ placeholder: 'PASSWORD' , mode: 'password'}\"\r\n      >\r\n      </dxi-item>\r\n      </dx-form>\r\n\r\n    <br />\r\n    <dx-button\r\n      text=\"UPDATE\"\r\n      type=\"success\"\r\n      validationGroup=\"customerData\"\r\n      [useSubmitBehavior]=\"true\">\r\n    </dx-button>\r\n  </form>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-info/user-profile-info.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.user-profile-container {\n  height: calc(100vh - 138px);\n  min-width: 300px;\n  padding: 15px 50px;\n  background-color: #fff; }\n.user-profile-container /deep/ dx-button {\n    margin-top: 15px;\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.user-profile-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.user-profile-container /deep/ .dx-texteditor-input {\n    min-height: 30px;\n    padding: 0 9px;\n    line-height: 30px; }\n.user-profile-container /deep/ dx-select-box {\n    min-height: 30px; }\n.user-profile-container /deep/ dx-select-box input {\n      font-size: 1em; }\n.user-profile-container .dx-list-item-content {\n    font-size: 1em; }\n.user-profile-container /deep/ .dx-texteditor {\n    border-radius: 0; }\nform {\n  min-width: 300px;\n  margin-bottom: 30px;\n  background-color: #fff; }\n.registration-mandatory {\n  float: left;\n  margin-bottom: 15px;\n  font-size: 14px; }\n.dx-item {\n  margin-bottom: 15px; }\n.rc-anchor .rc-anchor-normal .rc-anchor-light {\n  margin-top: 15px; }\n.registration-terms-conditions {\n  font-size: 12px;\n  margin-bottom: 15px; }\n.user-profile-header {\n  background-color: #ffffff;\n  padding: 15px 15px 0;\n  margin-bottom: 5px; }\n.user-profile-header .user-profile-title, .user-profile-header .material-icons {\n    color: #3282B9 !important; }\n.user-profile-header span {\n    font-size: 12px; }\n@media screen and (min-width: 768px) {\n  .user-profile-container {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 2fr 1fr;\n        grid-template-columns: 2fr 1fr; } }\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-info/user-profile-info.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__ = __webpack_require__("./client/app/shared/models/form-validation.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify__ = __webpack_require__("./node_modules/devextreme/ui/notify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserProfileInfoComponent = (function () {
    function UserProfileInfoComponent(route, userProfileService, userService) {
        var _this = this;
        this.route = route;
        this.userProfileService = userProfileService;
        this.userService = userService;
        this.countriesInfo = [];
        this.phoneCode = '';
        this.passwordUpdateOld = function () {
            if (_this.userInfo.NewPassword !== '') {
                return _this.currentUser.PermissionPolicyUser.StoredPassword;
            }
        };
        this.formValidation = new __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__["a" /* FormValidation */]();
        this.namePattern = this.formValidation.getNamePattern();
        this.emailPattern = __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__["a" /* FormValidation */].prototype.getEmailPattern();
        this.phoneRules = __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__["a" /* FormValidation */].prototype.getPhoneRules();
        this.phonePattern = __WEBPACK_IMPORTED_MODULE_3__shared_models_form_validation_model__["a" /* FormValidation */].prototype.getPhonePattern();
    }
    UserProfileInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInfo = this.userProfileService.getUser();
        console.log(' this.userInfo', this.userInfo);
        this.userService.getCountriesList()
            .subscribe(function (item) {
            console.log('countries', item);
            _this.countriesInfo = item;
            /*  item['value'].map(item => {
                this.countries.push(item.Name);
              })*/
        });
        this.currentUser = this.userService.getCurrentUser();
        console.log('user to profile', this.currentUser);
        this.prepareDataToForm();
    };
    UserProfileInfoComponent.prototype.prepareDataToForm = function () {
        this.userInfo.UserName = this.currentUser.PermissionPolicyUser.UserName;
        this.userInfo.FirstName = this.currentUser.Person1.FirstName;
        this.userInfo.LastName = this.currentUser.Person1.LastName;
        this.userInfo.Email = this.currentUser.Person1.Email;
        this.userInfo.OldPassword = this.currentUser.PermissionPolicyUser.StoredPassword;
        this.userInfo.Country = this.currentUser.Person1.Party.Address.Country;
        if (this.currentUser.Person1.Party.PhoneNumbers[0].Number) {
            this.userInfo.MobileNumber = this.currentUser.Person1.Party.PhoneNumbers[0].Number;
        }
        else {
            this.userInfo.MobileNumber = '';
        }
        if (this.currentUser.Person1.Party.PhoneNumbers[1].Number) {
            this.userInfo.TelephoneNumber = this.currentUser.Person1.Party.PhoneNumbers[1].Number;
        }
        else {
            this.userInfo.TelephoneNumber = '';
        }
        //this.oldPassword = this.currentUser.PermissionPolicyUser.StoredPassword;
    };
    UserProfileInfoComponent.prototype.getCountryValueForUser = function (value) {
        this.selectedCountry = value.selectedItem.Oid;
        this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
    };
    UserProfileInfoComponent.prototype.prepareUserDataForUpdate = function () {
        console.log(this.userInfo);
        this.currentUser.Person1.Party.Address.Country = this.selectedCountry;
        this.currentUser.PermissionPolicyUser.UserName = this.userInfo.UserName;
        this.currentUser.Person1.FirstName = this.userInfo.FirstName;
        this.currentUser.Person1.LastName = this.userInfo.LastName;
        this.currentUser.Person1.Email = this.userInfo.Email;
        this.currentUser.Person1.Party.PhoneNumbers[0].Number = this.userInfo.MobileNumber;
        this.currentUser.Person1.Party.PhoneNumbers[1].Number = this.userInfo.TelephoneNumber;
        if (this.userInfo.NewPassword !== '') {
            this.currentUser.PermissionPolicyUser.StoredPassword = this.userInfo.NewPassword;
        }
    };
    UserProfileInfoComponent.prototype.onFormSubmitProfilrUpdate = function (e) {
        console.log('this.userInfo', this.userInfo);
        this.prepareUserDataForUpdate();
        console.log(this.currentUser);
        this.userService.updateCurrentUser(this.currentUser)
            .subscribe(function (response) {
            console.log('updateUserResp', response);
            __WEBPACK_IMPORTED_MODULE_5_devextreme_ui_notify___default()({
                message: 'Profile was updated',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'success', 3000);
        });
        e.preventDefault();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectBox'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], UserProfileInfoComponent.prototype, "selectBox", void 0);
    UserProfileInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-user-profile-info',
            template: __webpack_require__("./client/app/user-profile/user-profile-info/user-profile-info.component.html"),
            styles: [__webpack_require__("./client/app/user-profile/user-profile-info/user-profile-info.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__user_profile_service__["a" /* UserProfileService */],
            __WEBPACK_IMPORTED_MODULE_2__shared_services_user_service__["a" /* UserService */]])
    ], UserProfileInfoComponent);
    return UserProfileInfoComponent;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-info/user-profile-info.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileInfoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserProfileInfoService = (function () {
    function UserProfileInfoService(httpClient) {
        this.httpClient = httpClient;
    }
    UserProfileInfoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], UserProfileInfoService);
    return UserProfileInfoService;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"user-profile-organisation-container\">\r\n  <form (submit)=\"onFormSubmitUpdateOrganisation($event)\" dx-group-column-count=\"2\">\r\n    <span class=\"registration-mandatory\">All fields marked * are mandatory.</span>\r\n    <dx-form id=\"form\"\r\n             labelLocation=\"right\"\r\n             [formData]=\"setupOrganisation\"\r\n             [readOnly]=\"false\"\r\n             [showColonAfterLabel]=\"true\"\r\n             [showValidationSummary]=\"true\"\r\n             validationGroup=\"setupOrganisation\"\r\n    >\r\n      <dxi-item dataField=\"organisationName\"\r\n                [editorOptions]=\"{ placeholder: 'ORGANISATION NAME' }\">\r\n        <dxi-validation-rule\r\n          type=\"required\"\r\n          message=\"Organisation name is required\">\r\n        </dxi-validation-rule>\r\n      </dxi-item>\r\n      <dxi-item itemType=\"group\" class=\"address\" caption=\"ADDRESS\">\r\n        <dxi-item dataField=\"organisationStreet\"\r\n                  [editorOptions]=\"{ placeholder: 'STREET'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Street is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n        <dxi-item dataField=\"organisationCity\"\r\n                  [editorOptions]=\"{ placeholder: 'CITY'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"City is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n        <dxi-item dataField=\"stateProvince\"\r\n                  [editorOptions]=\"{ placeholder: 'STATE PROVINCE'}\">\r\n          <dxi-validation-rule\r\n            type=\"required\"\r\n            message=\"Province is required\"\r\n          >\r\n          </dxi-validation-rule>\r\n        </dxi-item>\r\n\r\n        <dxi-item dataField=\"Country\">\r\n          <dx-select-box [dataSource]=\"countriesInfo\"\r\n                         [value]=\"this.setupOrganisation.country\"\r\n                         valueExpr=\"Oid\"\r\n                         displayExpr=\"Name\"\r\n                         placeholder=\"SELECT COUNTRY\"\r\n                         (onSelectionChanged)=\"getCountryValueForOrganisation($event)\">\r\n          </dx-select-box>\r\n        </dxi-item>\r\n        </dxi-item>\r\n      <dxi-item dataField=\"phoneNumber\"\r\n                [editorOptions]=\"{\r\n                    placeholder: 'TELEPHONE NUMBER',\r\n                    mask: phoneCode+'(999)999-9999',\r\n                    useMaskedValue: true,\r\n                    disabled: phoneCode === ''\r\n                }\">\r\n      </dxi-item>\r\n    </dx-form>\r\n    <br/>\r\n    <dx-button\r\n      text=\"UPDATE ORGANISATION\"\r\n      type=\"success\"\r\n      validationGroup=\"setupOrganisation\"\r\n      [useSubmitBehavior]=\"true\">\r\n    </dx-button>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\nbluenorth-user-profile {\n  background-color: #fff; }\n.user-profile-organisation-container {\n  height: calc(100vh - 138px);\n  padding: 15px 50px;\n  background-color: #fff; }\n.user-profile-organisation-container /deep/ .dx-texteditor-input {\n    min-height: 30px;\n    padding: 0 9px;\n    line-height: 30px; }\n.user-profile-organisation-container /deep/ dx-select-box {\n    min-height: 30px; }\n.user-profile-organisation-container /deep/ dx-select-box input {\n      font-size: 1em; }\n.user-profile-organisation-container .dx-list-item-content {\n    font-size: 1em; }\n.user-profile-organisation-container /deep/ .dx-texteditor {\n    border-radius: 0; }\n.user-profile-organisation-container form {\n    min-width: 300px;\n    margin-bottom: 30px;\n    background-color: #fff; }\n.user-profile-organisation-container .registration-mandatory {\n    float: left;\n    margin-bottom: 15px;\n    font-size: 14px; }\n.user-profile-organisation-container /deep/ dx-button {\n    margin-top: 15px;\n    color: #fff;\n    background-color: #6BCDFD;\n    border: 2px solid #6BCDFD;\n    width: 100%;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.user-profile-organisation-container /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #39bcfc;\n      border-color: #2fb9fc; }\n.user-profile-organisation-container .dx-item {\n    margin-bottom: 15px; }\n.user-profile-organisation-container .rc-anchor .rc-anchor-normal .rc-anchor-light {\n    margin-top: 15px; }\n.user-profile-organisation-container .registration-terms-conditions {\n    font-size: 12px;\n    margin-bottom: 15px; }\n.user-profile-header {\n  background-color: #ffffff;\n  padding: 15px;\n  margin-bottom: 5px; }\n.user-profile-header .user-profile-title, .user-profile-header .material-icons {\n    color: #3282B9 !important; }\n.user-profile-header span {\n    font-size: 12px; }\n@media screen and (min-width: 768px) {\n  .user-profile-organisation-container {\n    display: -ms-grid;\n    display: grid;\n    -ms-grid-columns: 2fr 1fr;\n        grid-template-columns: 2fr 1fr; } }\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileOrganisationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models_form_validation_model__ = __webpack_require__("./client/app/shared/models/form-validation.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentification_registration_settings_registration_settings_service__ = __webpack_require__("./client/app/authentification/registration-settings/registration-settings.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify__ = __webpack_require__("./node_modules/devextreme/ui/notify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_unit_service__ = __webpack_require__("./client/app/shared/services/unit.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserProfileOrganisationComponent = (function () {
    function UserProfileOrganisationComponent(registrationSettingsService, userService, userProfileService, unitService) {
        this.registrationSettingsService = registrationSettingsService;
        this.userService = userService;
        this.userProfileService = userProfileService;
        this.unitService = unitService;
        this.countriesInfo = [];
        this.phoneCode = '';
        this.setupOrganisation = this.registrationSettingsService.getSetupOrganisation();
        this.organisation = this.registrationSettingsService.getOrganisation();
        this.formValidation = new __WEBPACK_IMPORTED_MODULE_1__shared_models_form_validation_model__["a" /* FormValidation */]();
        this.phonePattern = this.formValidation.getPhonePattern();
        this.phoneRules = this.formValidation.getPhoneRules();
        this.emailPattern = this.formValidation.getEmailPattern();
    }
    UserProfileOrganisationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getCountriesList()
            .subscribe(function (item) {
            _this.countriesInfo = item;
            console.log('this.countriesInfo', _this.countriesInfo);
            var value;
            _this.userService.getUserInfo()
                .map(function (user) {
                user = user.body['OrganisationOid'];
                return user;
            })
                .subscribe(function (organisationOid) {
                _this.organisationOID = organisationOid;
                console.log("OrganisationOid", _this.organisationOID);
                _this.unitService.getOrganisationByOid(organisationOid)
                    .subscribe(function (organisation) {
                    _this.organisationWithUnits = organisation;
                    console.log('organisation', organisation['Organization']);
                    _this.prepareDataToOrganisationForm();
                    _this.countryBoxOptions = {
                        dataSource: _this.countriesInfo,
                        displayExpr: 'Name',
                        valueExpr: 'Oid',
                        value: _this.setupOrganisation.country,
                        placeholder: "SELECT COUNTRY"
                    };
                }, function (error) {
                    _this.userService.showUserNotification(error.error.Message, 'error');
                });
            });
        });
    };
    UserProfileOrganisationComponent.prototype.getCountryValueForOrganisation = function (value) {
        this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
    };
    UserProfileOrganisationComponent.prototype.prepareDataToOrganisationForm = function () {
        this.setupOrganisation.organisationName = this.organisationWithUnits.Organization.Name;
        this.setupOrganisation.organisationStreet = this.organisationWithUnits.Organization.Party.Address.Street;
        this.setupOrganisation.organisationCity = this.organisationWithUnits.Organization.Party.Address.City;
        this.setupOrganisation.stateProvince = this.organisationWithUnits.Organization.Party.Address.StateProvince;
        this.setupOrganisation.country = this.organisationWithUnits.Organization.Party.Address.Country;
        this.setupOrganisation.phoneNumber = this.organisationWithUnits.Organization.Party.PhoneNumbers[0].Number;
    };
    UserProfileOrganisationComponent.prototype.onFormSubmitUpdateOrganisation = function (e) {
        var _this = this;
        this.organisation.Oid = this.organisationOID;
        this.organisation.Organization.Name = this.setupOrganisation.organisationName;
        this.organisation.Organization.Party.Address.Street = this.setupOrganisation.organisationStreet;
        this.organisation.Organization.Party.Address.City = this.setupOrganisation.organisationCity;
        this.organisation.Organization.Party.Address.StateProvince = this.setupOrganisation.stateProvince;
        this.organisation.Organization.Party.Address.Country = this.setupOrganisation.country;
        this.organisation.Organization.Party.PhoneNumbers[0].Number = this.setupOrganisation.phoneNumber;
        this.registrationSettingsService.addOrUpdateOrganisation(this.organisation)
            .subscribe(function (organisation) {
            console.log('organisationresp', organisation);
            __WEBPACK_IMPORTED_MODULE_3_devextreme_ui_notify___default()({
                message: "ORGANISATION " + _this.organisation.Organization.Name.toUpperCase() + " WAS SUCCESSFULLY UPDATED.",
                closeOnClick: true,
                closeOnOutsideClick: true,
                width: '500',
                font: '16',
                position: {
                    my: 'center top',
                    at: 'center top'
                }
            }, 'success', 100000);
        }, function (error) {
            _this.userService.showUserNotification(error.error.Message, 'error');
        });
        e.preventDefault();
    };
    UserProfileOrganisationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-user-profile-organisation',
            template: __webpack_require__("./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.html"),
            styles: [__webpack_require__("./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__authentification_registration_settings_registration_settings_service__["a" /* RegistrationSettingsService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5__user_profile_service__["a" /* UserProfileService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_unit_service__["a" /* UnitService */]])
    ], UserProfileOrganisationComponent);
    return UserProfileOrganisationComponent;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-organisation/user-profile-organisation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileOrganisationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserProfileOrganisationService = (function () {
    function UserProfileOrganisationService() {
    }
    UserProfileOrganisationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UserProfileOrganisationService);
    return UserProfileOrganisationService;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\r\n  user-profile-subscription works!\r\n</p>\r\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileSubscriptionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserProfileSubscriptionComponent = (function () {
    function UserProfileSubscriptionComponent() {
    }
    UserProfileSubscriptionComponent.prototype.ngOnInit = function () {
    };
    UserProfileSubscriptionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-user-profile-subscription',
            template: __webpack_require__("./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.html"),
            styles: [__webpack_require__("./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileSubscriptionComponent);
    return UserProfileSubscriptionComponent;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile-subscription/user-profile-subscription.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileSubscriptionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserProfileSubscriptionService = (function () {
    function UserProfileSubscriptionService() {
    }
    UserProfileSubscriptionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UserProfileSubscriptionService);
    return UserProfileSubscriptionService;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n<!--<bluenorth-header class=\"header\"></bluenorth-header>-->\r\n  <aside class=\"sidebar user-profile-sidebar\">\r\n\r\n    <div class=\"form\">\r\n      <div class=\"user-profile\">\r\n        <i class=\"material-icons\">account_circle</i>\r\n        <p>Welcome Back,</p>\r\n        <p class=\"user-profile-name user-name\">{{currentUser?.PermissionPolicyUser.UserName}}</p>\r\n        <p class=\"user-profile-name\">{{currentUser?.Person1.FirstName}} {{currentUser?.Person1.LastName}}</p>\r\n        <a (click)=\"logout()\">Sign Out</a>\r\n      </div>\r\n      <ul class=\"profile-navigation\">\r\n        <li class=\"profile-navigation-item\" [ngClass]=\"{'active': isActive === 'info'}\"\r\n            (click)=\"getTitle('info', 'MY PROFILE')\">\r\n          My Profile\r\n          <i *ngIf=\"isActive === 'info'\" class=\"material-icons\">keyboard_arrow_right</i>\r\n        </li>\r\n        <li class=\"profile-navigation-item\" [ngClass]=\"{'active': isActive === 'organisation'}\"\r\n            (click)=\"getTitle('organisation', 'MY ORGANISATION')\" routerLinkActive=\"active\">\r\n          My Organisation\r\n          <i *ngIf=\"isActive === 'organisation'\" class=\"material-icons\">keyboard_arrow_right</i>\r\n        </li>\r\n        <li class=\"profile-navigation-item\" [ngClass]=\"{'active': isActive === 'business-unit'}\"\r\n            (click)=\"getTitle('business-unit', 'MY BUSINESS UNIT')\" routerLinkActive=\"active\">\r\n          My Business Unit\r\n          <i *ngIf=\"isActive === 'business-unit'\" class=\"material-icons\">keyboard_arrow_right</i>\r\n        </li>\r\n\r\n      <!--  <li class=\"profile-navigation-item\" [ngClass]=\"{'active': isActive ==='subscription'}\"\r\n            (click)=\"getTitle('subscription', 'MANAGE SUBSCRIPTION')\" routerLinkActive=\"active\">\r\n          Manage Subscription\r\n          <i *ngIf=\"isActive === 'subscription'\" class=\"material-icons\">keyboard_arrow_right</i>\r\n        </li>-->\r\n      </ul>\r\n    </div>\r\n\r\n  </aside>\r\n  <article class=\"content\">\r\n    <div class=\"user-profile-header\">\r\n      <h3 class=\"user-profile-title\">{{title}}</h3>\r\n      <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</span>\r\n      <dx-button\r\n        text=\"DASHBOARD\"\r\n        type=\"success\"\r\n        [routerLink]=\"['/dashboard']\">\r\n      </dx-button>\r\n    </div>\r\n    <router-outlet></router-outlet>\r\n  </article>\r\n  <!--<footer class=\"footer\">My footer</footer>-->\r\n</div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile.component.scss":
/***/ (function(module, exports) {

module.exports = "/*FONT STYLE*/\n/*BACKGROUND-COLOR*/\n/*buttons-color*/\n/*MAIN-HOVER-COLOR*/\n/*Title-color*/\n/*Main-text-color*/\n.user-profile-header {\n  overflow: hidden;\n  position: fixed;\n  width: calc(100% - 242px);\n  z-index: 1; }\n.user-profile-header /deep/ dx-button {\n    color: #6BCDFD;\n    background-color: #fff;\n    border: 2px solid #6BCDFD;\n    width: 150px;\n    border-radius: 7px;\n    font-weight: bold;\n    /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/\n    height: 40px;\n    margin-bottom: 10px;\n    float: right; }\n.user-profile-header /deep/ dx-button:hover {\n      color: #6BCDFD;\n      background-color: #e6e5e5;\n      border-color: #2fb9fc; }\n.user-profile-header /deep/ dx-button:hover {\n      color: #fff;\n      background-color: #6BCDFD;\n      border: 2px solid #6BCDFD;\n      width: 150px;\n      border-radius: 7px;\n      font-weight: bold;\n      /*&:focus,\r\n  &.focus {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 25%);\r\n  }\r\n  &:hover {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    color: $color;\r\n    background-color: darken($background, 10%);\r\n    border-color: darken($border, 12%);\r\n\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      color: $color;\r\n      background-color: darken($background, 17%);\r\n      border-color: darken($border, 25%);\r\n    }\r\n  }\r\n  &:active,\r\n  &.active,\r\n  .open > &.dropdown-toggle {\r\n    background-image: none;\r\n  }\r\n  &.disabled,\r\n  &[disabled],\r\n  fieldset[disabled] & {\r\n    &:hover,\r\n    &:focus,\r\n    &.focus {\r\n      background-color: $background;\r\n      border-color: $border;\r\n    }*/ }\n.user-profile-header /deep/ dx-button:hover:hover {\n        color: #fff;\n        background-color: #39bcfc;\n        border-color: #2fb9fc; }\n@media screen and (max-width: 768px) {\n  .registration-container {\n    margin-left: 0 !important;\n    margin-right: 0 !important; }\n  .registration-container form {\n    padding: 20px; } }\n.wrapper {\n  margin: 0 20px;\n  display: -ms-grid;\n  display: grid;\n  grid-gap: 15px; }\n.user-profile {\n  width: 100%;\n  height: 200px;\n  text-align: center;\n  background-color: #262F44; }\n.user-profile a {\n    cursor: pointer; }\n.user-profile .user-name {\n    margin-top: 15px; }\n.user-profile .material-icons {\n    margin-top: 20px;\n    font-size: 50px;\n    color: #54647D; }\n.user-profile .user-profile-name {\n    font-weight: bold;\n    margin-bottom: 15px; }\n.user-profile p, .user-profile a {\n    display: block;\n    font-size: 12px;\n    color: #fff; }\n.user-profile a {\n    color: #7798B1;\n    text-decoration: underline; }\n.sidebar {\n  width: 200px;\n  background-color: #F3F3F3;\n  padding: 0 !important; }\n.user-profile-sidebar {\n  background-color: #262F44; }\n.user-profile-sidebar /deep/ dx-tree-view .dx-treeview-node {\n    padding-left: 0 !important;\n    background-color: #f9f9f9;\n    text-align: left;\n    color: #D8CFCB;\n    padding-left: 15px;\n    border-top: 1px solid #D8CFCB; }\n.user-profile-sidebar /deep/ dx-tree-view .dx-treeview-node .dx-treeview .dx-treeview-item .dx-icon {\n      background-size: 40px 40px;\n      width: 40px;\n      height: 40px;\n      margin: 0 auto;\n      display: block; }\n.user-profile-sidebar /deep/ dx-tree-view .dx-treeview-node .dx-treeview-node-is-leaf {\n      background-color: #f9f9f9; }\n.user-profile-sidebar /deep/ dx-tree-view .dx-treeview-node .dx-treeview-node-is-leaf .dx-state-focused {\n        background-color: #ffffff !important; }\n.user-profile-sidebar .profile-navigation {\n    list-style-type: none;\n    color: #D4CBCB;\n    font-size: 12px;\n    font-weight: bold;\n    padding-left: 0;\n    cursor: pointer; }\n.user-profile-sidebar .profile-navigation .profile-navigation-item {\n      line-height: 35px;\n      padding-left: 15px;\n      background-color: #262F44;\n      font-size: 12px;\n      border-top: 1px solid #D8CFCB;\n      color: #fff;\n      -webkit-transition: all .25s linear;\n      transition: all .25s linear; }\n.user-profile-sidebar .profile-navigation .profile-navigation-item:hover {\n        color: #000;\n        background-color: #fff; }\n.user-profile-sidebar .profile-navigation .profile-navigation-item.active {\n        color: #000;\n        background-color: #fff; }\n.user-profile-sidebar .profile-navigation .profile-navigation-item i {\n        float: right;\n        line-height: 35px;\n        color: #C6C6CB; }\n.user-profile-header {\n  background-color: #ffffff;\n  padding: 15px 15px 0;\n  margin-bottom: 5px; }\n.user-profile-header .user-profile-title, .user-profile-header .material-icons {\n    color: #3282B9 !important; }\n.user-profile-header span {\n    font-size: 12px; }\n@media screen and (min-width: 768px) {\n  /* no grid support? */\n  .sidebar {\n    float: left;\n    position: fixed;\n    width: 200px !important;\n    min-height: 100vh; }\n  .content {\n    -ms-grid-column: 2;\n        grid-column-start: 2;\n    float: right;\n    width: 79.7872%; }\n  .wrapper {\n    margin: 0 auto;\n    -ms-grid-columns: 200px auto;\n        grid-template-columns: 200px auto; }\n  .header, .footer {\n    grid-column: 1 / -1;\n    /* needed for the floated layout */\n    clear: both;\n    position: fixed;\n    z-index: 1000; } }\n/*\r\n.wrapper > * {\r\n  !*background-color: #444;\r\n   color: #fff;*!\r\n  !* font-size: 150%;\r\n   !* needed for the floated layout*!\r\n  margin-bottom: 10px;\r\n}*/\n/* We need to set the widths used on floated items back to auto, and remove the bottom margin as when we have grid we have gaps. */\n@supports ((display: -ms-grid) or (display: grid)) {\n  .wrapper > * {\n    width: auto;\n    margin: 0; }\n  li .dx-treeview-node {\n    padding-left: 0 !important; } }\n/deep/ .user-profile-organisation-container, /deep/ .user-profile-container, /deep/ .units-container {\n  margin-top: 83px; }\n"

/***/ }),

/***/ "./client/app/user-profile/user-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__("./client/app/shared/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__ = __webpack_require__("./client/app/shared/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_mergeMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserProfileComponent = (function () {
    function UserProfileComponent(userProfileService, router, authService, userService, route, titleService) {
        this.userProfileService = userProfileService;
        this.router = router;
        this.authService = authService;
        this.userService = userService;
        this.route = route;
        this.titleService = titleService;
        this.isActive = '';
        this.menuSidebar = this.userProfileService.getMenuItems();
        this.currentItem = this.menuSidebar[0];
    }
    UserProfileComponent.prototype.screen = function (width) {
        return (width < 1000) ? 'sm' : 'lg';
    };
    UserProfileComponent.prototype.ngOnInit = function () {
        this.title = this.titleService.getTitle();
        if (this.route.snapshot['_routerState'].url.length === 8) {
            this.isActive = 'info';
        }
        else {
            this.isActive = this.route.snapshot['_routerState'].url.substring(9);
        }
        this.currentUser = this.route.snapshot.data['currentUser'];
        console.log('this.currentUser', this.currentUser);
        this.userService.setCurrentUser(this.currentUser);
    };
    UserProfileComponent.prototype.selectItem = function (e) {
        this.currentItem = e.itemData;
        this.title = this.titleService.getTitle();
    };
    UserProfileComponent.prototype.getTitle = function (route, title) {
        this.router.navigate(["/profile/" + route]);
        this.titleService.setTitle(title);
        this.title = this.titleService.getTitle();
        this.isActive = route;
    };
    UserProfileComponent.prototype.ngOnChanges = function () {
    };
    UserProfileComponent.prototype.logout = function () {
        this.authService.logout();
    };
    UserProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bluenorth-user-profile',
            template: __webpack_require__("./client/app/user-profile/user-profile.component.html"),
            styles: [__webpack_require__("./client/app/user-profile/user-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__user_profile_service__["a" /* UserProfileService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["e" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["b" /* Title */]])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileModule", function() { return UserProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_profile_routing_module__ = __webpack_require__("./client/app/user-profile/user-profile.routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_profile_component__ = __webpack_require__("./client/app/user-profile/user-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_profile_info_user_profile_info_component__ = __webpack_require__("./client/app/user-profile/user-profile-info/user-profile-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_profile_organisation_user_profile_organisation_component__ = __webpack_require__("./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_profile_business_unit_user_profile_business_unit_component__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_profile_subscription_user_profile_subscription_component__ = __webpack_require__("./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_profile_business_unit_item_user_profile_business_unit_item_component__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_profile_service__ = __webpack_require__("./client/app/user-profile/user-profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_profile_info_user_profile_info_service__ = __webpack_require__("./client/app/user-profile/user-profile-info/user-profile-info.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__user_profile_organisation_user_profile_organisation_service__ = __webpack_require__("./client/app/user-profile/user-profile-organisation/user-profile-organisation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__user_profile_business_unit_item_user_profile_business_unit_item_service__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__user_profile_subscription_user_profile_subscription_service__ = __webpack_require__("./client/app/user-profile/user-profile-subscription/user-profile-subscription.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__ = __webpack_require__("./client/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var UserProfileModule = (function () {
    function UserProfileModule() {
    }
    UserProfileModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__user_profile_routing_module__["a" /* ProfileRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_14__shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__user_profile_component__["a" /* UserProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_4__user_profile_info_user_profile_info_component__["a" /* UserProfileInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_5__user_profile_organisation_user_profile_organisation_component__["a" /* UserProfileOrganisationComponent */],
                __WEBPACK_IMPORTED_MODULE_6__user_profile_business_unit_user_profile_business_unit_component__["a" /* UserProfileBusinessUnitComponent */],
                __WEBPACK_IMPORTED_MODULE_7__user_profile_subscription_user_profile_subscription_component__["a" /* UserProfileSubscriptionComponent */],
                __WEBPACK_IMPORTED_MODULE_8__user_profile_business_unit_item_user_profile_business_unit_item_component__["a" /* UserProfileBusinessUnitItemComponent */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__user_profile_service__["a" /* UserProfileService */],
                __WEBPACK_IMPORTED_MODULE_10__user_profile_info_user_profile_info_service__["a" /* UserProfileInfoService */],
                __WEBPACK_IMPORTED_MODULE_11__user_profile_organisation_user_profile_organisation_service__["a" /* UserProfileOrganisationService */],
                __WEBPACK_IMPORTED_MODULE_12__user_profile_business_unit_item_user_profile_business_unit_item_service__["a" /* UserProfileBusinessUnitItemService */],
                __WEBPACK_IMPORTED_MODULE_13__user_profile_subscription_user_profile_subscription_service__["a" /* UserProfileSubscriptionService */],
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]],
        })
    ], UserProfileModule);
    return UserProfileModule;
}());



/***/ }),

/***/ "./client/app/user-profile/user-profile.routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export profileRoutes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_profile_subscription_user_profile_subscription_component__ = __webpack_require__("./client/app/user-profile/user-profile-subscription/user-profile-subscription.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_profile_business_unit_item_user_profile_business_unit_item_component__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit-item/user-profile-business-unit-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_profile_business_unit_user_profile_business_unit_component__ = __webpack_require__("./client/app/user-profile/user-profile-business-unit/user-profile-business-unit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_profile_organisation_user_profile_organisation_component__ = __webpack_require__("./client/app/user-profile/user-profile-organisation/user-profile-organisation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_profile_info_user_profile_info_component__ = __webpack_require__("./client/app/user-profile/user-profile-info/user-profile-info.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_profile_component__ = __webpack_require__("./client/app/user-profile/user-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var profileRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_6__user_profile_component__["a" /* UserProfileComponent */],
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_5__user_profile_info_user_profile_info_component__["a" /* UserProfileInfoComponent */],
                data: { title: 'MY PROFILE' }
            },
            {
                path: 'info',
                component: __WEBPACK_IMPORTED_MODULE_5__user_profile_info_user_profile_info_component__["a" /* UserProfileInfoComponent */],
                data: { title: 'MY PROFILE' }
            },
            {
                path: 'organisation',
                component: __WEBPACK_IMPORTED_MODULE_4__user_profile_organisation_user_profile_organisation_component__["a" /* UserProfileOrganisationComponent */],
                data: { title: 'MY ORGANISATION' }
            },
            {
                path: 'business-unit',
                component: __WEBPACK_IMPORTED_MODULE_3__user_profile_business_unit_user_profile_business_unit_component__["a" /* UserProfileBusinessUnitComponent */],
                data: { title: 'MY BUSINESS UNIT' }
            },
            {
                path: 'business-unit/:unitId',
                component: __WEBPACK_IMPORTED_MODULE_2__user_profile_business_unit_item_user_profile_business_unit_item_component__["a" /* UserProfileBusinessUnitItemComponent */],
            },
            {
                path: 'business-unit/new-unit',
                component: __WEBPACK_IMPORTED_MODULE_2__user_profile_business_unit_item_user_profile_business_unit_item_component__["a" /* UserProfileBusinessUnitItemComponent */]
            },
            {
                path: 'subscription',
                component: __WEBPACK_IMPORTED_MODULE_1__user_profile_subscription_user_profile_subscription_component__["a" /* UserProfileSubscriptionComponent */],
                data: { title: 'MANAGE SUBSCRIPTION' }
            }
        ]
    },
];
var ProfileRoutingModule = (function () {
    function ProfileRoutingModule() {
    }
    ProfileRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_7__angular_router__["f" /* RouterModule */].forChild(profileRoutes)],
            exports: [__WEBPACK_IMPORTED_MODULE_7__angular_router__["f" /* RouterModule */]]
        })
    ], ProfileRoutingModule);
    return ProfileRoutingModule;
}());

;


/***/ }),

/***/ "./client/app/user-profile/user-profile.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MenuItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var userInfo = {
    'UserName': '',
    'FirstName': '',
    'LastName': '',
    'Email': '',
    'Country': '',
    'TelephoneNumber': '',
    'MobileNumber': '',
    'OldPassword': '',
    'NewPassword': ''
};
var newCommodity = {
    'Title': '',
    'Reference': ''
};
var newSupplier = {
    'Title': '',
    'ShortTitle': '',
    'Description': ''
};
var MenuItem = (function () {
    function MenuItem() {
    }
    return MenuItem;
}());

var profileMenuSidebar = [
    { id: "1",
        text: "My Profile",
        route: "info",
        icon: "chevronright"
    },
    { id: "2",
        text: "My Organisation",
        route: "organisation",
        icon: "chevronright"
    },
    { id: "3",
        text: "My Business Unit",
        route: "business-unit",
        icon: "chevronright"
    },
    { id: "4",
        text: "Manage Subscription",
        route: "subscription",
        icon: "chevronright"
    }
];
var UserProfileService = (function () {
    function UserProfileService(route) {
        this.route = route;
    }
    UserProfileService.prototype.getUser = function () {
        return userInfo;
    };
    UserProfileService.prototype.getMenuItems = function () {
        return profileMenuSidebar;
    };
    UserProfileService.prototype.getNewCommodity = function () {
        return newCommodity;
    };
    UserProfileService.prototype.getNewSupplier = function () {
        return newSupplier;
    };
    UserProfileService.prototype.getCurrentUnitId = function () {
        return this.route.params.mergeMap(function (params) {
            var currentUnitId = params['unitId'];
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(currentUnitId);
        });
    };
    UserProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]])
    ], UserProfileService);
    return UserProfileService;
}());



/***/ }),

/***/ "./client/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    //apiUrl: 'http://bluenorthclienttest.azurewebsites.net',
    //apiUrl: 'http://bluenorthwebapi.azurewebsites.net',
    apiUrl: 'http://localhost:58170',
    adminUrl: 'http://bluenorthweb.azurewebsites.net'
};


/***/ }),

/***/ "./client/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./client/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./client/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./client/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map