import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {UserProfileService} from "../user-profile.service";
import {UnitInfo, UnitStructure, UnitType} from "../../shared/models/unit.model";
import {RegistrationSettingsService} from "../../authentification/registration-settings/registration-settings.service";
import {FormValidation} from "../../shared/models/form-validation.model";
import {UserService} from "../../shared/services/user.service";
import {FormControl} from "@angular/forms";
import {} from 'googlemaps';
import {UnitService} from "../../shared/services/unit.service";
import {Commodity} from "../../shared/models/commodity.model";
import {CommodityService} from "../../shared/services/commodity.service";
import {Supplier} from "../../shared/models/supplier.model";
import 'rxjs/Rx';
import {AnswerToPost} from "../../shared/models/question.model";
import {FormSelector, UserProfileBusinessUnitItemService} from "./user-profile-business-unit-item.service";
import {DxTagBoxComponent} from "devextreme-angular";
import {Observable, of} from "rxjs/index";
import {mergeMap} from "rxjs/internal/operators";
import MapTypeId = google.maps.MapTypeId;
import InfoWindow = google.maps.InfoWindow;
import DrawingManager = google.maps.drawing.DrawingManager;
import LatLng = google.maps.LatLng;

@Component({
  selector: 'bluenorth-user-profile-business-unit-item',
  templateUrl: './user-profile-business-unit-item.component.html',
  styleUrls: ['./user-profile-business-unit-item.component.scss']
})
export class UserProfileBusinessUnitItemComponent implements OnInit, AfterViewChecked {

  @ViewChild('gmap') gmap: ElementRef;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('multySelector')
  public multySelector: DxTagBoxComponent;

  @ViewChild('multySelectorSupplier')
  public multySelectorSupplier: DxTagBoxComponent;

  @ViewChild('multySelectorRetailer')
  public multySelectorRetailer: DxTagBoxComponent;

  public googleMap :  google.maps.Map;
  public drawingManager: DrawingManager;
  public infowindow: InfoWindow = new google.maps.InfoWindow();

  public currentUnitId: string;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public isCommodityPopupVisible = false;
  public isSupplierPopupVisible = false;
  public unitAddress: string = 'HI';
  public userId;
  public standardsOidArray = [];
  public ifFrameworkSelected = false;
  public phoneCode: string = '';
  public tooltipVisible = false;
  public isPopoverVisible = false;
  private countriesLocation: any[];
  targetId = null;
  currertPopup;
  organisationOid;
  isUnitCreate = false;
  formValidation: FormValidation;
  phonePattern: any;
  emailPattern: any;
  phoneRules: any;
  bussinesUnitInfo: UnitType[] = [];

  businessUnitStructure: any[] = [];
  unitInfo: UnitInfo = {};
  newCommodity: Commodity;
  newSupplier: Supplier;
  countriesInfo: any[] = [];
  assessmentTypesInfo: any[] = [];
  commodityInfo: any[] = [];
  supplierInfo: any[] = [];
  frameworkInfo: any[] = [];
  standardsInfo: any[] = [];
  retailerInfo: any[] = [];
  currentStandards: any[] = [];
  isNoLocation = false;
  public isShowValidationMapMessage: boolean = false;

  public secondaryCommodityInfo: any[] = [];
  public commodityInfoBackend: any[] = [];

//  public countryBoxOptions: FormSelector;
//  public unitTypeBoxOptions: FormSelector;
  public assessmentTypes: FormSelector;
  public unitStructureBoxOptions: FormSelector;
  public supplierBoxOptions: FormSelector;

  public frameworkBoxOptions: {
    items: any[],
    displayExpr: 'Title',
    valueExpr: 'OID',
    placeholder: "SELECT PRIMARY FRAMEWORK",
    value?: any,
    disabled: boolean;
  };
  public answersToPost: AnswerToPost[] = [];

  private initSelector = false;
  cellPhonePattern: any;
  self = this;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userProfileService: UserProfileService,
              private registrationSettingsService: RegistrationSettingsService,
              private userService: UserService,
              private commodityService: CommodityService,
              private unitService: UnitService,
              private userProfileBusinessUnitItemService: UserProfileBusinessUnitItemService,
              private changeDetector: ChangeDetectorRef) {
    this.formValidation = new FormValidation();
    this.phonePattern = this.formValidation.getPhonePattern();
    this.phoneRules = this.formValidation.getPhoneRules();
    this.emailPattern = this.formValidation.getEmailPattern();
    this.newCommodity = this.userProfileService.getNewCommodity();
    this.newSupplier = this.userProfileService.getNewSupplier();
    this.unitAddress = this.self.unitAddress;
    this.cellPhonePattern = this.formValidation.getCellPhonePattern();
  }

  ngOnInit() {
    this.currentStandards = [];
    this.standardsOidArray = [];

    this.assessmentTypesInfo = [
      {
        Name: 'Full Assessment',
        Oid: 0
      },
      {
        Name: 'Lite Assessment',
        Oid: 1
      }];
    this.assessmentTypes = {
      dataSource: this.assessmentTypesInfo,
      displayExpr: 'Name',
      valueExpr: 'Oid',
      value: null,
      placeholder: 'SELECT ASSESSMENT TYPE'
    };

    this.getCurrentUnitId()
      .subscribe((unitId: string) => {
        if (unitId !== "new-unit") {
          this.unitService.getUnitById(unitId)
            .subscribe((unit: any) => {
              this.unitInfo = unit;
              let assessmentValue = this.unitInfo.AssessmentType;
              this.assessmentTypes = {
                dataSource: this.assessmentTypesInfo,
                displayExpr: 'Name',
                valueExpr: 'Oid',
                value: assessmentValue,
                placeholder: 'SELECT ASSESSMENT TYPE'
              };
              this.userProfileBusinessUnitItemService.getStandardsByUnitId(unitId.toString())
                .subscribe((standards: any) => {
                  this.currentStandards = standards;
                })
            }
            , error1 => console.log(error1),
              () => this.initMap())
        } else {
          this.isUnitCreate = true;
          this.initSelector = true;
          /*this.setupGoogleMap();*/
          this.countriesLocation = this.registrationSettingsService.getCountriesLocation();
          this.latitude = 39.8282;
          this.longitude = -98.5795;
          this.userService.getUserInfo()
            .subscribe(userLight => {
              this.userId = userLight.body['Oid'];
              console.log('userLight', userLight.body);
              if (userLight.body['OrganisationOid'] !== '') {
                this.organisationOid = userLight.body['OrganisationOid'];
                this.unitInfo.OrganisationId = this.organisationOid;
              }
            });
          this.initMap();
        }
      });

    // this.commodityService.getCommodities()
    //   .subscribe((response: any) => {
    //       response.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
    //       console.log('commodities', response);
    //       this.commodityInfo = response;
    //       this.secondaryCommodityInfo = response;
    //       this.commodityInfoBackend = response;
    //     },
    //     error => {
    //         this.userService.showUserNotification(error.error.Message, 'error');
    //     });

    this.businessUnitStructure = [{Name: 'Independent Production Unit', Oid: UnitStructure.Independent}, {
      Name: 'Small Producer Organisation / Cooperative',
      Oid: UnitStructure.Cooperative
    }];
    let businessUnitStructureValue = this.isUnitCreate ? (this.businessUnitStructure.length === 1 ? this.businessUnitStructure[0].Oid : "") : this.unitInfo.UnitStructure;
    this.unitStructureBoxOptions = {
      dataSource: this.businessUnitStructure,
      displayExpr: 'Name',
      valueExpr: 'Oid',
      placeholder: "SELECT BUSINESS UNIT STRUCTURE",
      value: this.unitInfo.UnitStructure,
    };

    this.registrationSettingsService.getUnitType()
      .subscribe((response) => {
          this.bussinesUnitInfo = response['value'];
          let unitTypeValue = this.isUnitCreate ? (this.bussinesUnitInfo.length === 1 ? this.bussinesUnitInfo[0].OID : "") : this.unitInfo.UnitTypeId;
          // console.log("unitTypeValue--->",unitTypeValue);
          // this.unitTypeBoxOptions = {
          //   dataSource: this.bussinesUnitInfo,
          //   displayExpr: 'Name',
          //   valueExpr: 'OID',
          //   value: this.unitInfo.UnitTypeId,
          //   placeholder: "SELECT TYPE OF BUSINESS UNIT"
          // };
        }
        , error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    this.userService.getCountriesList()
      .subscribe((item: any[]) => {
        this.countriesInfo = item;
        console.log('this.countriesInfo', this.countriesInfo);
        let countriesValue = this.isUnitCreate ? (this.countriesInfo.length === 1 ? this.countriesInfo[0].Oid : "") : this.unitInfo.UnitCountryId;

      /*  this.countriesInfo.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
        this.countryBoxOptions = {
          dataSource: this.countriesInfo,
          displayExpr: 'Name',
          valueExpr: 'Oid',
          value: countriesValue,
          placeholder: "SELECT COUNTRY"
        };*/

      });

    this.registrationSettingsService.getSuppliers()
      .subscribe((response: any[]) => {
        console.log('suppliers', response);
        this.supplierInfo = response;
        this.supplierInfo.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
      });

    this.registrationSettingsService.getRetailers()
      .subscribe((response: any[]) => {
        this.retailerInfo = response;
        this.retailerInfo.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
      });
  }

  getCountryValueForUnit(value) {
    console.log(value);
    if (value.previousValue !== undefined) {
      this.unitInfo.ResponsiblePhone = '';
      this.unitInfo.ResponsibleMobile = '';

    }

    let selectedCountry = this.countriesInfo.filter(country => {
      return country.Oid === value.value;
    });
    this.phoneCode = selectedCountry[0].PhoneCode ? selectedCountry[0].PhoneCode : "";

    this.unitInfo.UnitCountryId = value.value;
    if (value.previousValue && value.value != value.previousValue) {
      this.unitInfo.ResponsibleMobile = this.phoneCode;
      this.unitInfo.ResponsiblePhone = this.phoneCode;
    }

    if (this.isUnitCreate) {
      console.log(selectedCountry[0].Name);
      let ind =this.countriesLocation.findIndex(obj => {
        return obj.Name === selectedCountry[0].Name;
      });
      if (ind !== -1) {
        this.googleMap.setCenter(this.countriesLocation[ind].center);
        this.googleMap.setZoom(this.countriesLocation[ind].zoom);
      }
      this.unitInfo.ResponsibleMobile = this.phoneCode;
      this.unitInfo.ResponsiblePhone = this.phoneCode;
    }

    //escape 0
    if (this.phoneCode.indexOf('0') !== -1) {
      this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('0')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('0'))].join('');
    }
    //escape 9
    if (this.phoneCode.indexOf('9') !== -1) {
      this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('9')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('9'))].join('');
    }

    /*this.unitInfo.UnitCountryId = value.selectedItem.Oid;
    this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";*/
  }


  onSecondaryCommoditiesValueChanged(event) {
    let commodities = this.commodityInfoBackend;
    event.value.forEach(val => {
      commodities = commodities.filter(function( obj ) {
        return obj.OID !== val;
      });
    });
    this.commodityInfo = commodities;
    this.unitInfo.Commodities = event.value;
  }

  private getCurrentUnitId(): Observable<string> {
    return this.route.params.pipe(
      mergeMap(params => {
      this.currentUnitId = params['unitId'].toString();
      return of(this.currentUnitId);
    })
    )
  }

  onFormSubmitUpdateUnit(e) {

    if ((this.latitude && this.longitude) && (this.latitude !== 39.8282 && this.longitude !== -98.5795)) {
      this.unitInfo.LocationLattitude = this.latitude;
      this.unitInfo.LocationLongtitude = this.longitude;
      this.isShowValidationMapMessage = false;
    }
    if (!this.unitInfo.LocationLattitude && !this.unitInfo.LocationLongtitude) {
      this.isShowValidationMapMessage = true;
      return
    } else {
    this.unitInfo.Suppliers = this.multySelectorSupplier.value;
    this.unitInfo.Retailers = this.multySelectorRetailer.value;
    this.unitInfo.Standards = this.multySelector.value;

    if(this.unitInfo.ResponsibleMobile.length <= 6 ) {
      this.unitInfo.ResponsibleMobile = '';
    }
    if(this.unitInfo.ResponsiblePhone.length <= 6 ) {
      this.unitInfo.ResponsiblePhone = '';
    }

    if (!this.isUnitCreate) {
      let isStandardUpdated = false;
      this.registrationSettingsService.addOrUpdateUnit(this.unitInfo)
        .subscribe(unitUpdate => {
            let message = !this.isUnitCreate ? `UNIT ${this.unitInfo.UnitName.toUpperCase()} WAS UPDATED` : `UNIT ${this.unitInfo.UnitName.toUpperCase()} WAS CREATED`;
            this.userService.showUserNotification(message, 'success');
            console.log("unitUpdate/create", unitUpdate);
              this.router.navigate([`profile/business-unit`]);

          },
          error => {
            this.userService.showUserNotification(`${error.error.Message}`, 'error');
          });

      console.log('isStandardUpdated', isStandardUpdated)
    }
    if (this.isUnitCreate) {
      this.registrationSettingsService.addOrUpdateUnit(this.unitInfo)
        .subscribe(unitUpdate => {
            let message = !this.isUnitCreate ? `UNIT ${this.unitInfo.UnitName.toUpperCase()} WAS UPDATED` : `UNIT ${this.unitInfo.UnitName.toUpperCase()} WAS CREATED`;
            this.userService.showUserNotification(message, 'success');
            this.router.navigate([`profile/business-unit`])
          },
          error => {
            this.userService.showUserNotification(`${error.error.Message}`, 'error');
          });
    }
    e.preventDefault();
    }
  }

  onUnitTypeChanged(event) {
    if (event.value) {
         this.secondaryCommodityInfo = this.commodityInfoBackend.filter(function( obj ) {
            return obj.OID !== event.value;
          });
      this.unitInfo.UnitTypeId = event.value;
      this.commodityService.getCommoditiesByUnitType(event.value)
      .subscribe((response: any) => {
          response.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
          console.log('commodities', response);
           this.commodityInfo = response;
          this.secondaryCommodityInfo = response;
          this.commodityInfoBackend = response;
        },
        error => {
            this.userService.showUserNotification(error.error.Message, 'error');
        });
    }
  }

 onCommodityChanged(event) {
   this.unitInfo.UnitCommodityId = event.value;
   if (event.value) {
     this.userProfileBusinessUnitItemService.getFrameworksByCommodity(event.value)
       .subscribe((frameworks: any) => {
           this.frameworkInfo = frameworks;
           console.log('farmeworks', frameworks);
           if (this.frameworkInfo.length) {
             this.frameworkBoxOptions = {
               items: this.frameworkInfo,
               displayExpr: 'Title',
               valueExpr: 'OID',
               placeholder: "SELECT PRIMARY FRAMEWORK",
               disabled: false,
             };
           }
           this.secondaryCommodityInfo = this.commodityInfoBackend.filter(function( obj ) {
             return obj.OID !== event.value;
           });
         },
         error => {
           this.userService.showUserNotification(error.error.Message, 'error')
         })
   }
   if (!event.value) {
     this.frameworkBoxOptions = {
       items: this.frameworkInfo,
       displayExpr: 'Title',
       valueExpr: 'OID',
       placeholder: "SELECT PRIMARY FRAMEWORK",
       disabled: true
     };
   }
 }

  onFieldDataChanged(event) {
    if (event.dataField === "FrameworkId" && event.value) {
      this.userProfileBusinessUnitItemService.getStandardsByFramework(event.value)
        .subscribe((standards: any) => {
          console.log('this.standardsInfo', standards);
          this.standardsInfo = standards;
          this.ifFrameworkSelected = true;
        })
    }
    if (event.dataField === "assessmentTypesInfo") {
      console.log(event.value);
      if (event.value === 1) {
        console.log(event.value);
        this.unitInfo.AssessmentType = 1;
        this.assessmentTypes.value = 1;
      }
      if (event.value === 0) {
        console.log(event.value);
        this.unitInfo.AssessmentType = 0;
        this.assessmentTypes.value = 0;
      }
    }
  }

  setStandards(event) {
    console.log('changeStandards', event.value)
    this.standardsOidArray = [];
    if (this.multySelector) {
      console.log(this.multySelector)
      this.standardsOidArray = this.multySelector.selectedItems.map(item => {
        return item.OID;
      });
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  initMap() {
    let markers = [];
    this.googleMap = new google.maps.Map(document.getElementById('googleMap'), {
      mapTypeId: MapTypeId.HYBRID,
      center: {
        lat: 53.0,
        lng: 0.0
      },
      zoom: 1
    });
    if (this.unitInfo.LocationLattitude) {
      let defaultLocMarker = new LatLng(this.unitInfo.LocationLattitude, this.unitInfo.LocationLongtitude);
      let defMarker = new google.maps.Marker({
        position: defaultLocMarker,
        map: this.googleMap,
        title: 'Your place'
      });
      markers.push(defMarker);
      this.googleMap.setCenter(defaultLocMarker);
      this.googleMap.setZoom(12);
    }
    let map = this.googleMap;
    let input = <HTMLInputElement>document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);
    this.googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    this.googleMap.addListener('bounds_changed', function() {
      searchBox.setBounds(this.getBounds());
    });
    let self = this;
    this.googleMap.addListener('click', function(event) {
      console.log(event.latLng.lat());
      let latLng = new LatLng(event.latLng.lat(), event.latLng.lng());
      console.log(latLng);

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Your place'
      });
      markers.push(marker);
      self.latitude = latLng.lat();
      self.longitude = latLng.lng();
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }


      // For each place, get the icon, name and location.
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
          console.log(bounds);
        } else {
          bounds.extend(place.geometry.location);
          console.log(bounds);
        }
      });
      console.log(bounds);
      map.fitBounds(bounds);
    });
  }

  getAssessmentTypeForUnit(event) {
    if (event.value === 1) {
      console.log(event.value);
      this.unitInfo.AssessmentType = 1;
      this.assessmentTypes.value = 1;
    }
    if (event.value === 0) {
      console.log(event.value);
      this.unitInfo.AssessmentType = 0;
      this.assessmentTypes.value = 0;
    }
  }

  toggleDefault() {
    this.tooltipVisible = !this.tooltipVisible;
  }

  showPopover(event, turgetId) {
    event.preventDefault();
    this.targetId = turgetId;
    for (let i = 1; i < turgetId.length; i++) {
      if (turgetId.charAt(i) === turgetId.charAt(i).toUpperCase()) {
        this.currertPopup = turgetId.substring(0, i);
      }
    }
    if(!this.currertPopup) {
      this.currertPopup = turgetId;
    }
    this.isPopoverVisible = true;
  }

  hidePopover() {
    this.targetId = null;
    this.isPopoverVisible = false;
    this.currertPopup = '';
  }
}
