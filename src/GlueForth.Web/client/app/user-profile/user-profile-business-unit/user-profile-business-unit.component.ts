import {Component, OnInit, ViewChild} from '@angular/core';
import { UserProfileService } from "../user-profile.service";
import { UnitInfo, UnitType } from "../../shared/models/unit.model";
import { RegistrationSettingsService } from "../../authentification/registration-settings/registration-settings.service";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { UnitService } from "../../shared/services/unit.service";
import {CommodityService} from "../../shared/services/commodity.service";
import notify from "devextreme/ui/notify";
import {DxDataGridComponent} from "devextreme-angular";
import {AssignUserUserToUnit, User} from "../../shared/models/user.model";
import {FormValidation} from "../../shared/models/form-validation.model";
import {switchMap, tap} from 'rxjs/internal/operators';
import {forkJoin} from "rxjs/index";

@Component({
  selector: 'bluenorth-user-profile-business-unit',
  templateUrl: './user-profile-business-unit.component.html',
  styleUrls: ['./user-profile-business-unit.component.scss']
})
export class UserProfileBusinessUnitComponent implements OnInit {

  @ViewChild('dataGrid')
  public dataGrid: DxDataGridComponent;

  public unitsList: UnitInfo[];

  public isShowAssignUserPopup: boolean = false;

  public assignUserData: AssignUserUserToUnit;

  public formValidation: FormValidation;
  public emailPattern: any;

  public unitsCountLimit: number = 0;
  businessUnitInfo: UnitType[] = [];
  businessUnitStructure: any[] = [];
  organisationOid: string;

  itemIndex: number = 0;
  unitInfo: UnitInfo = {};
  countriesInfo: any[] = [];
  commodityInfo: any[] = [];
  supplierInfo: any[] = [];
  assignedUsers = [];
  isShowConfirmationDeletePopup = false;
  unitToDelete: UnitInfo;
  userToDelete;
  confirmMessage: string;
  itemForRemove: string;
  loadIndicatorVisible = false;
  buttonText = "ADD USER";

  constructor(private router: Router,
              private userProfileService: UserProfileService,
              private commodityService: CommodityService,
              private registrationSettingsService: RegistrationSettingsService,
              private userService: UserService,
              private unitService: UnitService
              ) {
    this.formValidation = new FormValidation();
    this.emailPattern = this.formValidation.getEmailPattern();
  }

  ngOnInit() {
    setTimeout( () => {
      this.dataGrid.instance.beginCustomLoading('Loading..')
    }, 0);
    this.userService.getUserInfo().pipe(
      tap( userLight => {
        if (userLight.body['OrganisationOid'] !== '') {
          this.organisationOid = userLight.body['OrganisationOid'];
        }
        if (userLight.body['UnitsCountLimit']) {
          this.unitsCountLimit = userLight.body['UnitsCountLimit'];
        }
      }),
        switchMap( () => {
          return this.unitService.getUnitsListByUser()
        } )).subscribe((units: UnitInfo[]) => {
            this.unitsList = units;
            this.dataGrid.instance.endCustomLoading();
          });

    //const commodities = this.commodityService.getCommodities();
    const unitType = this.registrationSettingsService.getUnitType();
    const countries = this.userService.getCountriesList();
    //const suppliers = this.registrationSettingsService.getSuppliers();
    forkJoin([unitType, countries])
      .subscribe(([unitType, countries,]): any => {
        this.businessUnitInfo = unitType['value'];
        this.countriesInfo = countries as any;
      });
    this.businessUnitStructure = [{Name: 'Independent', Oid: 0}, {Name: 'Cooperative', Oid: 1}];
  }

  redirectToCurrentUnit(event) {
    this.router.navigate([`profile/business-unit/${event.data.Oid}`])
  }

  editUnit(e){
    this.router.navigate([`profile/business-unit/${e.key}`]);
    e.preventDefault();
  }

  removeUnit(e) {
    this.unitService.deleteUnitById(e.key)
      .subscribe(unit => {
          this.unitsList = this.unitsList.filter(data => data.Oid !== e.key);
          this.isShowConfirmationDeletePopup = false;
        },
        error => {
          this.userService.showUserNotification(
            "You cannot delete this Unit, because data has already been entered against it.",
            'error', 10000);
          console.log("error", error.error.Message, e);
          this.isShowConfirmationDeletePopup = false;
        })
  }

  addNewUnit() {
    this.router.navigate([`profile/business-unit/new-unit`])
  }

  confirmDelete(){
    if(this.itemForRemove==='user') {
      this.unassignCurrentUnit(this.userToDelete)
    }
    if(this.itemForRemove==='unit') {
      this.removeUnit(this.unitToDelete)
    }
  }

  showAssignUserPopup(unit) {
    this.unitService.getAssignedUsersToUnit(unit.data.Oid)
      .subscribe((usersList: any) => {
        this.assignedUsers = usersList;
        this.assignUserData = new AssignUserUserToUnit();
        this.assignUserData.CurrentUnitId = unit.data.Oid;
        this.isShowAssignUserPopup = true;
      });
  }

  onUnUssignUnitClick(userOid) {
    this.userToDelete = userOid;
    this.itemForRemove = 'user';
    this.isShowConfirmationDeletePopup = true;
    this.confirmMessage = 'Are you sure you want to remove user from the Business Unit?';
  }

  unassignCurrentUnit(userOid) {
    this.unitService.unassignCurrentUnit(userOid, this.assignUserData.CurrentUnitId)
      .subscribe(() => {
          this.assignedUsers = this.assignedUsers.filter(item => item.Oid !== userOid);
          this.isShowConfirmationDeletePopup = false;
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
  }

  onFormSubmitAssingUser(event) {
    this.buttonText = "ADD USER..";
    this.loadIndicatorVisible = true;
    this.unitService.assingUserToUnit(this.assignUserData).subscribe(resp => {
      this.userService.showUserNotification(resp, 'success', 10000);
      this.buttonText = "ADD USER";
    }, error1 => this.userService.showUserNotification(error1.error.Message, 'error', ),
      () => {
      this.assignUserData = null;
      this.isShowAssignUserPopup = false;
      this.loadIndicatorVisible = false;
      });
  }

  selectAsAdmin(user, event) {
    if (event) {
      this.unitService.addAdminRightToAssignedUser(user.Oid, this.assignUserData.CurrentUnitId)
        .subscribe(data => {
          user.IsUserAdmin = true;
        })
    }
  }

  deleteUnit(unit) {
    this.itemForRemove = 'unit';
    this.isShowConfirmationDeletePopup = true;
    this.confirmMessage = 'Are you sure you want to delete this business unit?';
    this.unitToDelete = unit;
  }

  cancelDelete() {
    this.isShowConfirmationDeletePopup = false;
  }

  getHeight(){
    return this.assignedUsers.length && this.assignedUsers.length < 9 ? this.assignedUsers.length * 55 + 350 : 700;
  }
}
