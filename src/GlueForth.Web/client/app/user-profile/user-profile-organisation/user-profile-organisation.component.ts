import {Component, OnInit} from '@angular/core';
import {Organisation} from "../../shared/models/organisation.model";
import {SetupOrganisation} from "../../shared/models/setup-organisation.model";
import {FormValidation} from "../../shared/models/form-validation.model";
import {RegistrationSettingsService} from "../../authentification/registration-settings/registration-settings.service";
import {UserService} from "../../shared/services/user.service";
import {UserProfileService} from "../user-profile.service";
import {UnitService} from "../../shared/services/unit.service";
import {switchMap} from "rxjs/internal/operators";
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'bluenorth-user-profile-organisation',
  templateUrl: './user-profile-organisation.component.html',
  styleUrls: ['./user-profile-organisation.component.scss']
})
export class UserProfileOrganisationComponent implements OnInit {

  orgSubscription: Subscription;
  organisation: Organisation;
  organisationWithUnits: any;
  organisationOID;
  countriesInfo: any[] = [];
  setupOrganisation: SetupOrganisation;
  formValidation: FormValidation;
  phonePattern: any;
  emailPattern: any;
  phoneRules: any;
  countryBoxOptions: {
    dataSource: any[],
    displayExpr: 'Name',
    valueExpr: 'Oid',
    placeholder: "SELECT COUNTRY",
    value: string

  };
  public phoneCode: string = '';
  public initSelector = false;
  constructor(private registrationSettingsService: RegistrationSettingsService,
              private userService: UserService,
              private userProfileService: UserProfileService,
              private unitService: UnitService) {
    this.setupOrganisation = this.registrationSettingsService.getSetupOrganisation();
    this.organisation = this.registrationSettingsService.getOrganisation();
    this.formValidation = new FormValidation();
    this.phonePattern = this.formValidation.getPhonePattern();
    this.phoneRules = this.formValidation.getPhoneRules();
    this.emailPattern = this.formValidation.getEmailPattern();
  }

  ngOnInit() {
   this.orgSubscription = this.userService.getCountriesList().pipe(
      switchMap((item: any[]) => {
        this.countriesInfo = item;
        return this.userService.getUserInfo()
      }),
      switchMap(user => {
        this.organisationOID = user.body['OrganisationOid'];
        return this.unitService.getOrganisationByOid(this.organisationOID)
      })
    ).subscribe(organisation => {
        this.organisationWithUnits = organisation;
        this.prepareDataToOrganisationForm();

        this.countryBoxOptions = {
          dataSource: this.countriesInfo,
          displayExpr: 'Name',
          valueExpr: 'Oid',
          value: this.setupOrganisation.country,
          placeholder: "SELECT COUNTRY"
        };
      },
      error => {
        this.userService.showUserNotification(error.error.Message, 'error');
      });
  }

  getCountryValueForOrganisation(value) {
    if(this.initSelector){
      //this.setupOrganisation.phoneNumber = '';
      this.setupOrganisation.country = value.selectedItem.Oid;
      this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
      this.setupOrganisation.phoneNumber = this.phoneCode;

      //escape 0
      if (this.phoneCode.indexOf('0') !== -1) {
        this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('0')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('0'))].join('');
      }
      //escape 9
      if (this.phoneCode.indexOf('9') !== -1) {
        this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('9')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('9'))].join('');
      }
    } else {
      this.phoneCode = this.setupOrganisation.phoneNumber.split(')')[0]+ ')';
      this.initSelector = true;
    }
   }
  prepareDataToOrganisationForm() {
    this.setupOrganisation.organisationName = this.organisationWithUnits.Organization.Name;
    this.setupOrganisation.organisationStreet = this.organisationWithUnits.Organization.Party.Address.Street;
    this.setupOrganisation.organisationCity = this.organisationWithUnits.Organization.Party.Address.City;
    this.setupOrganisation.stateProvince = this.organisationWithUnits.Organization.Party.Address.StateProvince;
    this.setupOrganisation.country = this.organisationWithUnits.Organization.Party.Address.Country;
    this.setupOrganisation.phoneNumber = this.organisationWithUnits.Organization.Party.PhoneNumbers[0].Number;
  }

  onFormSubmitUpdateOrganisation(e) {
    this.organisation.Oid = this.organisationOID;
    this.organisation.Organization.Name = this.setupOrganisation.organisationName;
    this.organisation.Organization.Party.Address.Street = this.setupOrganisation.organisationStreet;
    this.organisation.Organization.Party.Address.City = this.setupOrganisation.organisationCity;
    this.organisation.Organization.Party.Address.StateProvince = this.setupOrganisation.stateProvince;
    this.organisation.Organization.Party.Address.Country = this.setupOrganisation.country;
    this.organisation.Organization.Party.PhoneNumbers[0].Number = this.setupOrganisation.phoneNumber;

    this.registrationSettingsService.addOrUpdateOrganisation(this.organisation)
      .subscribe(organisation => {
       this.userService.showUserNotification( `ORGANISATION ${this.organisation.Organization.Name.toUpperCase()} WAS SUCCESSFULLY UPDATED.`, 'success');
      }, error => {
      this.userService.showUserNotification(error.error.Message, 'error');
      });
    e.preventDefault();
  }

  onDestroy() {
    if(this.orgSubscription) {
      this.orgSubscription.unsubscribe()
    }
  }
}
