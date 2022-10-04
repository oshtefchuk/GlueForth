import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Popup} from "../../../shared/models/popup";

export class MapSetting {
  key: string;
  name: string;
}

let mapTypes: MapSetting[] = [{
  key: "roadmap",
  name: "Default Map"
}, {
  key: "satellite",
  name: "Photographic Map"
}, {
  key: "hybrid",
  name: "Hybrid Map"
}];

let mapProviders: MapSetting[] = [{
  key: "google",
  name: "Google Dynamic Map"
}, {
  key: "googleStatic",
  name: "Google Static Map"
}, {
  key: "bing",
  name: "Bing Map"
}];


@Injectable()
export class IndicatorDataSetValueService {

  constructor(private httpClient: HttpClient) { }

  updateGradeToUnderReviewState(params){
    return this.httpClient.post(`${environment.apiUrl}/api/IndicatorDataSets/UpdateGradeToUnderReviewState`, params, {observe: 'response'} )
  }

  getIndicatorsByCharacteristicAndDataset(characteristicOid, dataSetOid,) {
    return this.httpClient.get(`${environment.apiUrl}/api/Indicators/ByCharacteristicAndDataset(${characteristicOid}, ${dataSetOid})`)
  }

  updateIndicatorValue(value) {
    return this.httpClient.post(`${environment.apiUrl}/api/IndicatorValues/UpdateValue`, value);
  }

  createOrUpdateIndicatorValue(value) {
    return this.httpClient.post(`${environment.apiUrl}/api/IndicatorValues/CreateOrUpdate`, value);
  }

  createOrUpdateDataFieldUserEditMode(value) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataFieldUserEditMode/CreateOrUpdate`, value);
  }

  createOrUpdatePrimaryDataValue(value) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataValues/CreateOrUpdate`, value);
  }

  createOrUpdateCommodityPrimaryDataFieldValue(value) {
    return this.httpClient.post(`${environment.apiUrl}/api/CommodityPDValue/CreateOrUpdate`, value);
  }

  getIndicatorsDataSetByCharacteristicAndDataSetList(parametrs) {
    return this.httpClient.post(`${environment.apiUrl}/api/Indicators/ByCharacteristicAndDatasetList`, parametrs);
  }

  getIndicatorsByPrincipleGroupAndDataset(parametrs) {
    return this.httpClient.post(`${environment.apiUrl}/api/Indicators/ByCategoryAndDatasetList`, parametrs, {observe: 'response'})
  }

  getIndicatorDataSetList() {
    return this.httpClient.get(`${environment.apiUrl}/api/IndicatorDataSets/GetCurrentUserList`)
  }

  addNewIndicatorDataSet(newDataSet) {
    return this.httpClient.post(`${environment.apiUrl}/api/IndicatorDataSets/CreateOrUpdate`, newDataSet)
  }

  getMaxPeriodByUnit(unitId) {
    return this.httpClient.get(`${environment.apiUrl}/api/IndicatorDataSets/GetMaxPeriodByUnit(${unitId})`);
  }
  deleteDataset(dataSetOid) {
    return this.httpClient.delete(`${environment.apiUrl}/api/IndicatorDataSets(${dataSetOid})`);
  }
  getMapTypes(): MapSetting[] {
    return mapTypes;
  }
  getMapProviders(): MapSetting[] {
    return mapProviders;
  }

  deletePrimaryDataFieldNote(noteOid) {
    return this.httpClient.delete(`${environment.apiUrl}/api/PrimaryDataFieldNotes/DeletePrimaryDataFieldNote/${noteOid}`);
  }

  getPrimaryDataMonthValues(primaryDataValuesOid) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataMonthValues/GetByPrimaryDataValueOid`, primaryDataValuesOid)
  }

  getPrimaryDataMonthValuesByCommodity(primaryDataValueOid, commodityOid) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataMonthValues/GetByCommodityPrimaryDataValueOid?primaryDataValueOid=${primaryDataValueOid}&commodityOid=${commodityOid}`, {})
  }

  createOrUpdatePrimaryDataMonthValues(value) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataMonthValues/CreateOrUpdate`, value);
  }



  get confirmPopup() {
    return {
      width: '400',
      height: '150',
      showTitle: true,
      title: 'Confirmation',
      dragEnabled: false,
      closeOnOutsideClick: true,
      closeOnBackButton: true,
      showCloseButton: true,
      isVisible: true,
      shading: false,
      resizeEnabled: true,
      template: 'content'
    }
  }

  get monthModePopup(): Popup {
    return {
      width: '370',
      height: '700',
      showTitle: true,
      title: '',
      dragEnabled: false,
      closeOnOutsideClick: true,
      closeOnBackButton: true,
      showCloseButton: true,
      isVisible: true,
      shading: true,
      resizeEnabled: true,
      template: 'content'
    }
  }

  get editDataSet(): Popup {
    return {
      width: '600',
      height: '300',
      showTitle: true,
      title: 'Edit Data Set',
      dragEnabled: false,
      closeOnOutsideClick: true,
      closeOnBackButton: true,
      showCloseButton: true,
      isVisible: true,
      shading: true,
      resizeEnabled: true,
      template: 'content'
    }
  }

  getMonthByNumber(number) {
    switch (number) {
      case 1 : return 'January';
      case 2 : return 'February';
      case 3 : return 'March';
      case 4 : return 'April';
      case 5 : return 'May';
      case 6 : return 'June';
      case 7 : return 'July';
      case 8 : return 'August';
      case 9 : return 'September';
      case 10 : return 'October';
      case 11 : return 'November';
      case 12 : return 'December';
      default: return 'Total';
    }
  }
}
