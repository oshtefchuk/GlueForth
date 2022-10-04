import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from "../../shared/models/user.model";
import { UserProfileService } from "../user-profile.service";
import { UserService } from "../../shared/services/user.service";
import { FormValidation } from "../../shared/models/form-validation.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'bluenorth-user-profile-info',
  templateUrl: './user-profile-info.component.html',
  styleUrls: ['./user-profile-info.component.scss']
})
export class UserProfileInfoComponent implements OnInit {

  @ViewChild('selectBox') public selectBox: ElementRef;

  public userInfo: User;
  public countriesInfo: any[] = [];

  public selectedCountry: string;
  public currentUser;
  public oldPassword;
  public formValidation: FormValidation;
  public namePattern: any;
  public phonePattern: any;
  public phoneRules: any;
  public emailPattern: any;
  public phoneCode: string = '';
  public initSelector = false;
  public termsTooltipVisible;
  public isTermsAccepted = false;
  cellPhonePattern: any;
  constructor(private route: ActivatedRoute,
              private userProfileService: UserProfileService,
              private userService: UserService,
              ) {
    this.formValidation = new FormValidation();
    this.namePattern = this.formValidation.getNamePattern();
    this.emailPattern = FormValidation.prototype.getEmailPattern();
    this.phoneRules = FormValidation.prototype.getPhoneRules();
    this.phonePattern = FormValidation.prototype.getPhonePattern();
    this.cellPhonePattern = this.formValidation.getCellPhonePattern();
  }

  passwordUpdateOld = () => {
    if (this.userInfo.NewPassword !== '') {
      return this.currentUser.PermissionPolicyUser.StoredPassword;
    }

  };

  ngOnInit() {
    this.userInfo = this.userProfileService.getUser();

    this.userService.getCountriesList()
      .subscribe((item: any[]) => {
        this.countriesInfo = item;
      });
    this.currentUser = this.userService.getCurrentUser();
    if(this.currentUser.AcceptedTermsConditions) {
      this.isTermsAccepted = true;
    }
    this.prepareDataToForm();
  }

  prepareDataToForm() {
    this.userInfo.UserName = this.currentUser.PermissionPolicyUser.UserName;
    this.userInfo.FirstName = this.currentUser.Person1.FirstName;
    this.userInfo.LastName = this.currentUser.Person1.LastName;
    this.userInfo.Email = this.currentUser.Person1.Email;
    this.userInfo.OldPassword = this.currentUser.PermissionPolicyUser.StoredPassword;
    this.userInfo.Country = this.currentUser.Person1.Party.Address.Country;

    if (this.currentUser.Person1.Party.PhoneNumbers[0] && this.currentUser.Person1.Party.PhoneNumbers[0].Number) {
      this.userInfo.MobileNumber = this.currentUser.Person1.Party.PhoneNumbers[0].Number
    } else {
      this.userInfo.MobileNumber = '';
    }
    if (this.currentUser.Person1.Party.PhoneNumbers[1] && this.currentUser.Person1.Party.PhoneNumbers[1].Number) {
      this.userInfo.TelephoneNumber = this.currentUser.Person1.Party.PhoneNumbers[1].Number
    } else {
      this.userInfo.TelephoneNumber = '';
    }
    //this.oldPassword = this.currentUser.PermissionPolicyUser.StoredPassword;
  }

  getCountryValueForUser(value) {
    if(this.initSelector){
      this.selectedCountry = value.selectedItem.Oid;

      this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";
      this.userInfo.MobileNumber = this.phoneCode;
      this.userInfo.TelephoneNumber = this.phoneCode;
    /*  //escape 0
      if (this.phoneCode.indexOf('0') !== -1) {
        this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('0')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('0'))].join('');
      }
      //escape 9
      if (this.phoneCode.indexOf('9') !== -1) {
        this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('9')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('9'))].join('');
      }
      console.log(value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "");*/
    } else {
      this.selectedCountry = value.selectedItem.Oid;
      this.phoneCode = this.userInfo.MobileNumber.split(')')[0] + ')';
      this.initSelector = true;
    }
    if (value.previousValue && value.value != value.previousValue) {
      this.userInfo.MobileNumber = this.phoneCode;
      this.userInfo.TelephoneNumber = this.phoneCode;
    }
  }

  prepareUserDataForUpdate() {
    if(this.userInfo.MobileNumber.length <= 6 ) {

      this.userInfo.MobileNumber = '';
    }
    if(this.userInfo.TelephoneNumber.length <= 6 ) {

      this.userInfo.TelephoneNumber = '';
    }

    this.currentUser.Person1.Party.Address.Country = this.selectedCountry;
    this.currentUser.PermissionPolicyUser.UserName = this.userInfo.UserName;
    this.currentUser.Person1.FirstName = this.userInfo.FirstName;
    this.currentUser.Person1.LastName = this.userInfo.LastName;
    this.currentUser.Person1.Email = this.userInfo.Email;
    if (this.currentUser.Person1.Party.PhoneNumbers.length === 0) {
      this.currentUser.Person1.Party.PhoneNumbers.push(this.userInfo.MobileNumber);
      this.currentUser.Person1.Party.PhoneNumbers.push(this.userInfo.TelephoneNumber);
    } else {
      this.currentUser.Person1.Party.PhoneNumbers[0].Number = this.userInfo.MobileNumber;
      this.currentUser.Person1.Party.PhoneNumbers[1].Number = this.userInfo.TelephoneNumber;
    }
    if (this.userInfo.NewPassword !== '') {
      this.currentUser.PermissionPolicyUser.StoredPassword = this.userInfo.NewPassword;
    }
  }

  onFormSubmitProfilrUpdate(e) {
   this.prepareUserDataForUpdate();

    this.termsTooltipVisible = false;
    if (!this.currentUser.AcceptedTermsConditions) {
      this.termsTooltipVisible = true;
      return;
    }

    this.userService.updateCurrentUser(this.currentUser)
      .subscribe((response: any) => {
        if(response.body.AcceptedTermsConditions) {
          this.isTermsAccepted = true;
        }
       this.userService.showUserNotification('Profile was updated', 'success', 3000);
       },
        error => {
        this.userService.showUserNotification(error.error.Message, 'error');
        });
    e.preventDefault();
  }

  getTermsConds(event) {
    this.currentUser.AcceptedTermsConditions = event;
    if (this.currentUser.AcceptedTermsConditions) {
      this.termsTooltipVisible = false;
    }
  }
}
