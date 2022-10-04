import { AfterViewChecked, ChangeDetectorRef, Component  } from '@angular/core';
import {ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';

import notify from "devextreme/ui/notify";
import ValidationEngine from 'devextreme/ui/validation_engine';

import {FormValidation} from '../../shared/models/form-validation.model';
import {Organisation} from "../../shared/models/organisation.model";
import {RegistrationSettingsService, Tab} from './registration-settings.service';
import {SetupOrganisation} from '../../shared/models/setup-organisation.model';
import {UserService} from "../../shared/services/user.service";
import {UnitInfo, UnitStructure, UnitType} from "../../shared/models/unit.model";
import {CommodityService} from "../../shared/services/commodity.service";
import {Commodity} from "../../shared/models/commodity.model";
import {UserProfileService} from "../../user-profile/user-profile.service";
import {Supplier} from "../../shared/models/supplier.model";
import {QuestionsService} from "../../shared/services/questions.service";
import {AnswerToPost, QuestionsWithAnswers} from "../../shared/models/question.model";
import {UserProfileBusinessUnitItemService} from "../../user-profile/user-profile-business-unit-item/user-profile-business-unit-item.service";
import {DxFormComponent, DxSelectBoxComponent, DxTagBoxComponent} from "devextreme-angular";
import {forkJoin} from "rxjs/observable/forkJoin";
import {RegistrationInfo, RegistrationService} from "../registration/registration.service";
import InfoWindow = google.maps.InfoWindow;
import DrawingManager = google.maps.drawing.DrawingManager;
import MapTypeId = google.maps.MapTypeId;
import LatLng = google.maps.LatLng;
import MapOptions = google.maps.MapOptions;
import {RouterConfigLoader} from "@angular/router/src/router_config_loader";
import {Router} from "@angular/router";






@Component({
  selector: 'bluenorth-registration-settings',
  templateUrl: './registration-settings.component.html',
  styleUrls: ['./registration-settings.component.scss']
})
export class RegistrationSettingsComponent implements OnInit, AfterViewChecked {

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('gmap') gmap: ElementRef;

  @ViewChild("apiTabs")
  public apiTabs: ElementRef;

  @ViewChild("organisationForm")
  public organisationForm: DxFormComponent;

  @ViewChild("unitForm")
  public unitForm: DxFormComponent;

  @ViewChild('multySelector')
  public multySelector: DxTagBoxComponent;


  @ViewChild('multySelectorSecondaryCommodity')
  public multySelectorSecondaryCommodity: DxTagBoxComponent;

  @ViewChild('multySelectorSupplier')
  public multySelectorSupplier: DxTagBoxComponent;

  @ViewChild('multySelectorRetailer')
  public multySelectorRetailer: DxTagBoxComponent;

  @ViewChild(DxFormComponent) Regform: DxFormComponent;
  FormValidation: typeof FormValidation = FormValidation;

  @ViewChild('countrySelector')
  public countrySelector: DxSelectBoxComponent;

  @ViewChild('dxForm')
  public dxForm: DxFormComponent;

  public googleMap :  google.maps.Map;
  public drawingManager: DrawingManager;
  public infowindow: InfoWindow = new google.maps.InfoWindow();
  public searchPlaceInput : any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public standardsInfo: any[] = [];
  public ifFrameworkSelected = false;
  public standardsOidArray = [];
  public newCommodity: Commodity;
  public changeTabIndicator;
  public organisation: Organisation;
  public organisationOid;
  public setupOrganisation: SetupOrganisation;
  public formValidation: FormValidation;
  public phonePattern: any;
  public emailPattern: any;
  public phoneRules: any;
  public bussinesUnitInfo: UnitType[] = [];
  public businessUnitStructure: any[] = [];
  public tabs: Tab[];
  public tabContent: string;
  public itemIndex: number = 0;
  public unitInfo: UnitInfo = {};
  public countriesInfo: any[] = [];
  public commodityInfo: any[] = [];
  public secondaryCommodityInfo: any[] = [];
  public commodityInfoBackend: any[] = [];
  public supplierInfo: any[] = [];
  public retailerInfo: any[] = [];
  public frameworkInfo: any[] = [];
  public newSupplier: Supplier;
  public isCommodityPopupVisible = false;
  public isSupplierPopupVisible = false;
  public phoneCode: string = '';
  public usersInfo: any;
  public isAddUserPopupVisible: boolean = false;
  public isShowValidationMapMessage: boolean = false;
  public tooltipVisible: boolean = false;
  public markers: any[];

  private countriesLocation: any[];
  password = '';
  passwordOptions: any = {
    mode: 'password',
    value: this.password
  };

  public registrationInfo: RegistrationInfo;
  public countryBoxOptions: {
    dataSource: any[],
    displayExpr: 'Name',
    valueExpr: 'Oid',
    placeholder: "SELECT COUNTRY",
    value: string
  };
  public unitTypeBoxOptions: {
    dataSource: any[],
    displayExpr: 'Name',
    valueExpr: 'OID',
    placeholder: "ADD TYPE OF BUSINESS UNIT",
    value?: any
  };
  public commoditiesBoxOptions: {
    dataSource: any[],
    displayExpr: 'Title',
    valueExpr: 'OID',
    placeholder: "SELECT PRIMARY COMMODITY",
    value?: any
  };
  public frameworkBoxOptions: {
    items: any[],
    displayExpr: 'Title',
    valueExpr: 'OID',
    placeholder: "SELECT PRIMARY FRAMEWORK",
    value?: any,
    disabled: boolean;
  };

  public assessmentTypes: {
    dataSource: any[],
    valueExpr: 'Oid',
    displayExpr: 'Name',
    placeholder: "SELECT ASSESSMENT TYPE",
    value: any,
  };

  public unitStructureBoxOptions: {
    dataSource: any[],
    displayExpr: 'Name',
    valueExpr: 'Oid',
    placeholder: "ADD BUSINESS UNIT STRUCTURE",
    value?: any
  };
  public supplierBoxOptions: {
    dataSource: any[],
    displayExpr: 'Title',
    valueExpr: 'OID',
    placeholder: "SELECT SUPPLIER",
    value: any
  };

  public questionsWithAnswers: any[] = [];
  public questions: any[] = [];
  public answersToPost: AnswerToPost[] = [];
  public userId: string;

  assessmentTypesInfo: any[] = [];

  constructor(private registrationSettingsService: RegistrationSettingsService,
              private userService: UserService,
              private registrationService: RegistrationService,
              private commodityService: CommodityService,
              private userProfileService: UserProfileService,
              private questionsService: QuestionsService,
              private userProfileBusinessUnitItemService: UserProfileBusinessUnitItemService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private ngZone: NgZone) {

    this.tabs = registrationSettingsService.getTabs();
    this.tabContent = this.tabs[0].content;
    this.countriesLocation = this.registrationSettingsService.getCountriesLocation();
    this.setupOrganisation = this.registrationSettingsService.getSetupOrganisation();
    this.organisation = this.registrationSettingsService.getOrganisation();
    this.formValidation = new FormValidation();
    this.phonePattern = this.formValidation.getPhonePattern();
    this.phoneRules = this.formValidation.getPhoneRules();
    this.emailPattern = this.formValidation.getEmailPattern();
    this.newCommodity = this.userProfileService.getNewCommodity();
    this.newSupplier = this.userProfileService.getNewSupplier();
    this.registrationInfo = registrationService.getRegistrationInfo();
  }

  ngOnInit() {
    this.formInit();
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

  }

  formInit() {
    this.isShowValidationMapMessage = false;
    let commodities$ = this.commodityService.getCommodities();
    this.unitInfo.Commodities = [];
    this.unitInfo.AssessmentType = null;
    this.businessUnitStructure = [
      {Name: 'Independent Production Unit', Oid: UnitStructure.Independent},
      {Name: 'Small Producer Organisation / Cooperative', Oid: UnitStructure.Cooperative}
      ];

    this.unitStructureBoxOptions = {
      dataSource: this.businessUnitStructure,
      displayExpr: 'Name',
      valueExpr: 'Oid',
      placeholder: 'ADD BUSINESS UNIT STRUCTURE'
    };

    let unitType$ = this.registrationSettingsService.getUnitType()

    let countriesList$ = this.userService.getCountriesList()

    let suppliers$ = this.registrationSettingsService.getSuppliers()

    let retailers$ = this.registrationSettingsService.getRetailers()

    forkJoin([commodities$, unitType$, countriesList$, suppliers$, retailers$])
      .subscribe((result: any) => {
          this.commodityInfo = result[0];
          this.secondaryCommodityInfo = result[0];
          this.commodityInfoBackend = result[0];
          this.commoditiesBoxOptions = {
            dataSource: this.commodityInfo,
            displayExpr: 'Title',
            valueExpr: 'OID',
            placeholder: "SELECT PRIMARY COMMODITY"
          };

          this.bussinesUnitInfo = result[1]['value'];
          this.unitTypeBoxOptions = {
            dataSource: this.bussinesUnitInfo,
            displayExpr: 'Name',
            valueExpr: 'OID',
            placeholder: "ADD TYPE OF BUSINESS UNIT"
          };

          this.countriesInfo = result[2];
          let countriesValue: string;
          if (this.countriesInfo && this.countriesInfo.length === 1) {
            countriesValue = this.countriesInfo[0].Oid;
          }
          this.countryBoxOptions = {
            dataSource: this.countriesInfo,
            displayExpr: 'Name',
            valueExpr: 'Oid',
            value: countriesValue,
            placeholder: "SELECT COUNTRY"
          };

          this.supplierInfo = result[3];
          this.supplierInfo.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
          let value: any;
          if (this.supplierInfo.length === 1) {
            value = this.supplierInfo[0].OID;
          }
          this.supplierBoxOptions = {
            dataSource: this.supplierInfo,
            displayExpr: 'Title',
            valueExpr: 'OID',
            value: value,
            placeholder: "SELECT SUPPLIER"
          };
          this.retailerInfo = result[4];
          this.retailerInfo.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });

    this.apiTabs['disabled'] = false;
    this.userService.getUserInfo()
      .subscribe(userLight => {
          this.userId = userLight.body['Oid'];
          if (userLight.body['OrganisationOid'] !== '') {
            this.organisationOid = userLight.body['OrganisationOid'];
            this.apiTabs['selectedIndex'] = 1;
            this.itemIndex = 1;

            setTimeout( () => {
              this.initMap();
            }, 1000);
          }
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        },
        () => {
          if (this.organisationOid) {
            this.registrationSettingsService.getUsers(this.organisationOid).subscribe(users => {

              this.usersInfo = users;
            });
          }
        });

  }

  public getAddressFromCordinates(lat, lng) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'location': latlng
      },((results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
          this.searchElementRef.nativeElement.value =  results[1].formatted_address;
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      }})
    );
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  markerDragEnd(event) {
    this.getAddressFromCordinates(event.coords.lat, event.coords.lng)
    this.latitude = event.coords.lat;
    this.longitude =  event.coords.lng;
  }


  getCountryValueForOrganisation(value) {
    this.setupOrganisation.country = value.selectedItem.Oid;
    this.phoneCode = value.selectedItem.PhoneCode ? value.selectedItem.PhoneCode : "";

    //escape 0
    if (this.phoneCode.indexOf('0') !== -1) {
      this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('0')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('0'))].join('');
    }
    //escape 9
    if (this.phoneCode.indexOf('9') !== -1) {
      this.phoneCode = [this.phoneCode.slice(0, this.phoneCode.indexOf('9')), '\\', this.phoneCode.slice(this.phoneCode.indexOf('9'))].join('');
    }
  }
  getCountryValueForUnit(value, selector) {
    if (value.value != value.previousValue) {
      let selectedCountry = this.countriesInfo.filter(country => {
        return country.Oid === value.value;
      });

      let ind =this.countriesLocation.findIndex(obj => {
        return obj.Name === selectedCountry[0].Name;
      });
      if (ind !== -1) {
        this.googleMap.setCenter(this.countriesLocation[ind].center);
        this.googleMap.setZoom(this.countriesLocation[ind].zoom);
      }
      this.unitInfo.ResponsibleMobile = '';
      this.unitInfo.ResponsiblePhone = '';
      this.unitInfo.UnitCountryId = value.value;
      this.phoneCode = selectedCountry[0].PhoneCode ? selectedCountry[0].PhoneCode : "";
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

  selectTab(e) {
    this.tabContent = this.tabs[e.itemIndex].content;
    this.itemIndex = e.itemIndex;
  }

  onFormSubmitCreateOrganisation(e) {
    this.organisation.Organization.Name = this.setupOrganisation.organisationName;
    this.organisation.Organization.Party.Address.Street = this.setupOrganisation.organisationStreet;
    this.organisation.Organization.Party.Address.City = this.setupOrganisation.organisationCity;
    this.organisation.Organization.Party.Address.StateProvince = this.setupOrganisation.stateProvince;
    this.organisation.Organization.Party.Address.Country = this.setupOrganisation.country;
    this.organisation.Organization.Party.PhoneNumbers[0].Number = this.setupOrganisation.phoneNumber;

    this.registrationSettingsService.addOrUpdateOrganisation(this.organisation)
      .subscribe(organisation => {
          notify({
            message: `ORGANISATION "${this.organisation.Organization.Name.toUpperCase()}" WAS CREATED.`,
            closeOnClick: true,
            closeOnOutsideClick: true,
            width: '500',
            font: '16',
            position: {
              my: 'center top',
              at: 'center top'
            }
          }, 'success', 10000);

          this.organisationOid = organisation;
          this.itemIndex = 1;
          this.apiTabs['selectedIndex'] = 1;
          this.organisationForm.instance.resetValues();
          this.phoneCode = '';
          this.setupOrganisation = new SetupOrganisation();
          this.formInit();
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    e.preventDefault();
  }

  onFormSubmitAddUnit(e) {
    let counter = 0;
    let isQuestionsAnswered = false;

    if ((this.latitude && this.longitude) && (this.latitude !== 39.8282 && this.longitude !== -98.5795)) {
      this.unitInfo.LocationLattitude = this.latitude;
      this.unitInfo.LocationLongtitude = this.longitude;
    }
    if (!this.unitInfo.LocationLattitude && !this.unitInfo.LocationLongtitude) {
      this.isShowValidationMapMessage = true;
    } else {
      this.unitInfo.LocationLattitude = this.latitude;
      this.unitInfo.LocationLongtitude = this.longitude;
      this.unitInfo.Suppliers = this.multySelectorSupplier.value;
      this.unitInfo.Retailers = this.multySelectorRetailer.value;
      this.unitInfo.Standards = this.multySelector.value;
      this.unitInfo.OrganisationId = this.organisationOid;
      this.registrationSettingsService.addOrUpdateUnit(this.unitInfo)
        .subscribe(newUnit => {
            this.userService.showUserNotification(`UNIT ${this.unitInfo.UnitName} WAS CREATED`, 'success');

            if (!this.changeTabIndicator) {
              this.formInit();
              // Clear out the old markers.
              this.clearAllMapMarkers();
            }

            if (this.changeTabIndicator) {
              this.apiTabs['selectedIndex'] = 2;
              this.itemIndex = 2;
            }


            this.unitInfo.Standards = [];
            //console.log(this.unitForm.instance.getEditor('ResponsibleMobile').mask);
            this.unitForm.instance.resetValues();
            ValidationEngine.resetGroup('businessUnit');
          },
          error => {
            notify({
              message: `ERROR: ${error.error.Message}`,
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
      e.preventDefault();
    }
  }

  backToBusinessUnit() {
    this.formInit();
    this.apiTabs['selectedIndex'] = 1;
    this.itemIndex = 1;
  }

  onFormSubmitCreateCommodity(e) {
    this.commodityService.addCommodity(this.newCommodity)
      .subscribe(commodity => {
          delete commodity['@odata.context'];

          this.unitInfo.Commodities.push(commodity);
         notify({
            message: `COMMODITY "${this.newCommodity.Title.toUpperCase()}" WAS CREATED`,
            closeOnClick: true,
            closeOnOutsideClick: true,
            width: '500',
            font: '16',
            position: {
              my: 'center top',
              at: 'center top'
            }
          }, 'success', 100000);
          this.isCommodityPopupVisible = false;
        },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    e.preventDefault();
  }

  onFormSubmitCreateSupplier(e) {
    this.registrationSettingsService.addSupplier(this.newSupplier)
      .subscribe(supplier => {
          this.supplierInfo.push(supplier);
          this.supplierBoxOptions = {
            dataSource: this.supplierInfo,
            displayExpr: 'Title',
            valueExpr: 'OID',
            value: supplier['OID'],
            placeholder: "SELECT SUPPLIER"
          };
          notify({
            message: `SUPPLIER "${this.newSupplier.Title.toUpperCase()}" WAS CREATED`,
            closeOnClick: true,
            closeOnOutsideClick: true,
            width: '500',
            font: '16',
            position: {
              my: 'center top',
              at: 'center top'
            }
          }, 'success', 10000);
          this.isSupplierPopupVisible = false;
         },
        error => {
          this.userService.showUserNotification(error.error.Message, 'error');
        });
    e.preventDefault();
  }

  onSecondaryCommoditiesValueChanged(event) {
    let commodities = this.commodityInfoBackend;
    event.value.forEach(val => {
      commodities = commodities.filter(function( obj ) {
        return obj.OID !== val;
      });
    });
    this.commodityInfo = commodities;
    this.commoditiesBoxOptions = {
      dataSource: this.commodityInfo,
      displayExpr: 'Title',
      valueExpr: 'OID',
      placeholder: "SELECT PRIMARY COMMODITY"
    };
    this.unitInfo.Commodities = event.value;
  }

  getAssessmentTypeForUnit(event) {
    if (event.value === 1) {
      this.unitInfo.AssessmentType = 1;
      this.assessmentTypes.value = 1;
    }
    if (event.value === 0) {
      this.unitInfo.AssessmentType = 0;
      this.assessmentTypes.value = 0;
    }
  }

  onFieldDataChanged(event) {
    if (event.dataField === "UnitCommodityId" && event.value) {
      this.userProfileBusinessUnitItemService.getFrameworksByCommodity(event.value)
        .subscribe((frameworks: any) => {
            this.frameworkInfo = frameworks;
            if (this.frameworkInfo.length) {
              this.frameworkBoxOptions = {
                items: this.frameworkInfo,
                displayExpr: 'Title',
                valueExpr: 'OID',
                placeholder: "SELECT PRIMARY FRAMEWORK",
                disabled: false
              };
            }
          },
          error => {
            this.userService.showUserNotification(error.error.Message, 'error')
          })
      this.secondaryCommodityInfo = this.commodityInfoBackend.filter(function( obj ) {
        return obj.OID !== event.value;
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
        .subscribe((standards: any) => {
          this.standardsInfo = standards;
        })
      this.ifFrameworkSelected = true;
    }
  }

  setStandards(event) {
    this.standardsOidArray = [];
    if (this.multySelector) {
      this.standardsOidArray = this.multySelector.selectedItems.map(item => {
        return item.OID;
      });
    }
  }

  selectUser(event, userSelector) {

  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }


  passwordComparison = () => {
    return this.dxForm.instance.option("formData").Password;
  };

  countrySelectorChange(event) {
    this.registrationInfo.CountryId = event.selectedItem.Oid;
    this.phoneCode = event.selectedItem.PhoneCode ? event.selectedItem.PhoneCode : "";
  }

  onFormSubmit(e) {
    this.registrationInfo.UserName = this.registrationInfo.Email;
    this.registrationInfo.CountryId = this.countrySelector.selectedItem.Oid;
    this.registrationInfo.OrganisationOid = this.organisationOid;
    this.registrationService.userRegister(this.registrationInfo)
      .subscribe(
        response => {

          this.dxForm.instance.resetValues();
          ValidationEngine.resetGroup('customerData');
          this.userService.showUserNotification(
            `Registration succeeded. We sent you activation link via ${this.registrationInfo.Email}. Plz check your mailbox and follow the insctructions`,
            'success'
          );
          let user = {
            Oid: response.body['Oid'],
            UserName: response.body['Person1'].Email,
            Name: response.body['Person1'].FirstName + ' ' + response.body['Person1'].LastName
          };

          this.usersInfo.push(user);

          this.isAddUserPopupVisible = false;
        },
        error => {
          this.dxForm.instance.option("formData").Email = null;
          this.userService.showUserNotification(error.error.Message, 'error', 3000)
        }
      );
    e.preventDefault();
  };

  searchPlacesInput() {
    if (!<HTMLInputElement>document.getElementById('pac-input')) {
      setTimeout(this.searchPlacesInput(), 500);
    } else {
      return <HTMLInputElement>document.getElementById('pac-input');
    }
  }

  initMap() {

    this.googleMap = new google.maps.Map(document.getElementById('googleMap'), {
      mapTypeId: MapTypeId.HYBRID,
      center: {
        lat: 53.0,
        lng: 0.0,
      },
      zoom: 1
    });
    this.markers = [];
    let map = this.googleMap;

    if (!this.searchPlaceInput) {
      this.searchPlaceInput = this.searchPlacesInput();
    }
    let searchBox = new google.maps.places.SearchBox(this.searchPlaceInput);
    this.googleMap.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchPlaceInput);

    // Bias the SearchBox results towards current map's viewport.
    this.googleMap.addListener('bounds_changed', function() {
      searchBox.setBounds(this.getBounds());
    });
    let self = this;
    this.googleMap.addListener('click', function(event) {
      let latLng = new LatLng(event.latLng.lat(), event.latLng.lng());
      self.clearAllMapMarkers();

      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: 'Your place'
      });
      self.markers.push(marker);
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
          return;
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);

        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

  }

  clearAllMapMarkers() {
    // Clear out the old markers.
          this.markers.forEach(function(marker) {
            marker.setMap(null);
          });
      this.markers = [];
  }

  toggleDefault() {
    this.tooltipVisible = !this.tooltipVisible;
  }
}

