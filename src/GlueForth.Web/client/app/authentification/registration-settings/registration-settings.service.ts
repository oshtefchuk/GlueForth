import { Injectable } from '@angular/core';
import { SetupOrganisation } from '../../shared/models/setup-organisation.model';
import { MyBusinessUnit } from '../../shared/models/my-business-unit.model';
import { HttpClient } from "@angular/common/http";

import { UnitInfo, UnitStructure, UnitType } from "../../shared/models/unit.model";
import { Organisation } from "../../shared/models/organisation.model";
import { environment } from "../../../environments/environment";


const setupOrganisation: SetupOrganisation = {
  'organisationName': '',
  'organisationStreet': '',
  'organisationCity': '',
  'stateProvince': '',
  'country': '',
  'phoneNumber': ''

};


export class Tab {
  id: number;
  text: string;
  icon: string;
  content: string;
}


/*let tabs: Tab[] = [
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
];*/
let tabs: Tab[] = [
  {
    id: 0,
    text: "SET UP ORGANISATION",
    icon: "add",
    content: "User tab content"
  },
  {
    id: 1,
    text: "THANK YOU",
    icon: "thanks",
    content: "Thanks tab content"
  }
];

const businessUnitType: string[] = [
  "FARMING OPERATION",
  "PROCESSING UNIT"
];

const myBusinessUnit: MyBusinessUnit = {
  'businessUnitType': '',
  'businessUnitName': '',
  'businessUnitStructure': ''
}

const unitInfo: UnitInfo = {
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

}

const organisation: Organisation = {
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

const countriesLocation: any[] = [
  {
    Name : 'Australia',
    center: {
      lat: -25.274399,
      lng: 133.775131,
    },
    zoom: 4
  },
  {
    Name : 'Belize',
    center: {
      lat: 17.189877,
      lng: -88.497650,
    },
    zoom: 7
  },
  {
    Name : 'France',
    center: {
      lat: 46.227638,
      lng: 2.213749,
    },
    zoom: 6
  },
  {
    Name : 'Honduras',
    center: {
      lat: 15.199999,
      lng: -86.241905,
    },
    zoom: 6
  },
  {
    Name : 'Kenya',
    center: {
      lat: -0.023559,
      lng: 37.906193,
    },
    zoom: 6
  },
  {
    Name : 'Malawi',
    center: {
      lat: -13.254308,
      lng: 34.301525,
    },
    zoom: 6
  },
  {
    Name : 'Nicaragua',
    center: {
      lat: 12.865416,
      lng: -85.207230,
    },
    zoom: 6
  },
  {
    Name : 'Rwanda',
    center: {
      lat: -1.940278,
      lng: 29.873888,
    },
    zoom: 6
  },
  {
    Name : 'South Africa',
    center: {
      lat: -30.559483,
      lng: 22.937506,
    },
    zoom: 6
  },
  {
    Name : 'Thailand',
    center: {
      lat: 15.870032,
      lng: 100.992538,
    },
    zoom: 6
  },
  {
    Name : 'United States',
    center: {
      lat: 37.090240,
      lng: -95.712891,
    },
    zoom: 4
  },
];

@Injectable()
export class RegistrationSettingsService {

  constructor(private httpClient: HttpClient) {
  }

  getTabs(): Tab[] {
    return tabs;
  }

  getCountriesLocation() : any[] {
    return countriesLocation;
  }

  getSetupOrganisation() {
    return setupOrganisation;
  }

  getUnitType() {
    return this.httpClient.get(`${environment.apiUrl}/api/UnitTypes`, { observe: 'body' });
  }

  getSuppliers() {
    return this.httpClient.get(`${environment.apiUrl}/api/Suppliers`, { observe: 'body' });
  }

  getRetailers() {
    return this.httpClient.get(`${environment.apiUrl}/api/Retailers`, { observe: 'body' });
  }

  getUnitInfo() {
    return unitInfo;
  }

  getOrganisation() {
    return organisation;
  }

  getUsers(organisationOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetByOrganisation?organisationOid=${organisationOid}`)
  }

  addOrUpdateUnit(unitInfo) {
    return this.httpClient.post(`${environment.apiUrl}/api/Units/CreateOrUpdate`, unitInfo);
  }

  addOrUpdateOrganisation(organisation) {
    return this.httpClient.post(`${environment.apiUrl}/api/Organisations`, organisation);
  }

  addSupplier(supplier) {
    return this.httpClient.post(`${environment.apiUrl}/api/Suppliers/CreateOrUpdate`, supplier);
  }
}
