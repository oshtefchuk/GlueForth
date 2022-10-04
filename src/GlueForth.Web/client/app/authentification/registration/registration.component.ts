import {AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DxCheckBoxComponent, DxFormComponent, DxSelectBoxComponent, DxValidatorComponent} from 'devextreme-angular';
import { RegistrationService, RegistrationInfo } from './registration.service';
import { FormValidation } from '../../shared/models/form-validation.model';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import ValidationEngine from "devextreme/ui/validation_engine";


@Component({
  selector: 'bluenorth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild(DxFormComponent) form: DxFormComponent;
  FormValidation: typeof FormValidation = FormValidation;

  @ViewChild('dxForm')
  public dxForm: DxFormComponent;

  @ViewChild(' dxValidator')
  public  dxValidator:  DxValidatorComponent;

  @ViewChild('countrySelector')
  public countrySelector: DxSelectBoxComponent;

  password = '';
  passwordOptions: any = {
    mode: 'password',
    value: this.password
  };
  passwordPattern: string = '^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$';
  registrationInfo: RegistrationInfo;
  countries: string[];
  namePattern: any;
  phonePattern: any;
  cellPhonePattern: any;
  phoneRules: any;
  emailPattern: any;
  subscriptionType: string[];
  formValidation: FormValidation;
  captchaResponse: string = null;
  tooltipVisible = false;
  termsTooltipVisible = false;
  checkBoxValue = false;
  public countriesInfo: any[] = [];
  public phoneCode = " ";
  public countriesList$: any;
  constructor(private registrationService: RegistrationService,
              private userService: UserService,
              private changeDetector: ChangeDetectorRef,
              private router: Router ) {
    this.registrationInfo = registrationService.getRegistrationInfo();
    this.subscriptionType = this.registrationService.getSubscriptionType();
    this.formValidation = new FormValidation();
    this.namePattern = this.formValidation.getNamePattern();
    this.emailPattern = this.formValidation.getEmailPattern();
    this.phoneRules = this.formValidation.getPhoneRules();
    this.phonePattern = this.formValidation.getPhonePattern();
    this.cellPhonePattern = this.formValidation.getCellPhonePattern();
  }

  ngOnInit() {
    this.countriesList$ = this.userService.getCountriesList()
      .subscribe( (countriesList: any[]) => {
        this.countriesInfo = countriesList;

      },(error1 => console.log(error1)),
        () => {
          if (this.registrationInfo.CountryId) {
            let selectedCountry = this.countriesInfo.filter(country => {
              return country.Oid === this.registrationInfo.CountryId;
            });

            this.phoneCode = selectedCountry[0].PhoneCode ? selectedCountry[0].PhoneCode : "";

            //escape 0
            if (this.phoneCode.indexOf('0') !== -1) {
              this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('0')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('0'))].join('');
            }
            //escape 9
            if (this.phoneCode.indexOf('9') !== -1) {
              this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('9')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('9'))].join('');
            }
          }
        });
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  countrySelectorChange(event) {
    if (event.value !== event.previousValue) {
      this.registrationInfo.CountryId = event.value;
      this.registrationInfo.Mobile = '';
      this.registrationInfo.Phone = '';
      let selectedCountry = this.countriesInfo.filter(country => {
        return country.Oid === event.value;
      });
      this.phoneCode = selectedCountry[0].PhoneCode ? selectedCountry[0].PhoneCode : "";
      this.registrationInfo.Mobile = this.phoneCode;
      this.registrationInfo.Phone = this.phoneCode;

      //escape 0
      if (this.phoneCode.indexOf('0') !== -1) {
        this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('0')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('0'))].join('');
      }
      //escape 9
      if (this.phoneCode.indexOf('9') !== -1) {
        this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('9')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('9'))].join('');
      }
    }

  }

  passwordComparison = () => {
    return this.form.instance.option("formData").Password;
  };

  getTermsConds(event) {
    this.checkBoxValue = event;
    if (this.checkBoxValue) {
      this.termsTooltipVisible = false;
    }
  }


  onFormSubmit(e) {
    this.termsTooltipVisible = false;
    if (!this.checkBoxValue) {
      this.termsTooltipVisible = true;
      return;
    }
    this.registrationInfo.UserName = this.registrationInfo.Email;
    this.registrationInfo.CountryId = this.countrySelector.selectedItem.Oid;
    if(this.registrationInfo.Phone.length <= 4) {
      this.registrationInfo.Phone = ''
    }


    this.registrationService.userRegister(this.registrationInfo)
      .subscribe(
        response => {

          this.dxForm.instance.resetValues();
          ValidationEngine.resetGroup('customerData');
          this.userService.showUserNotification(
            "Registration submitted. Check your mailbox plz for e-mail confirmation link to finish registration.",
            'success'
          , 5000);
          this.router.navigate(['login']);
        },
        error => {
          if(this.registrationInfo.Phone === '') {
            this.registrationInfo.Phone = this.phoneCode
          }

          this.dxForm.instance.option("formData").Email = null;
          this.userService.showUserNotification(error.error.Message, 'error', 3000)
        }
      );
    e.preventDefault();
  };

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  toggleDefault() {
    this.tooltipVisible = !this.tooltipVisible;
  }

  ngOnDestroy() {
    this.countriesList$.unsubscribe();
  }
}


