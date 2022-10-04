import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/internal/operators";
import {Observable} from "rxjs/Rx";

export class PrimaryDataField {
  Name: string;
  PrimaryDataFieldOid: number;
  ProductionAreas: ProductionArea[];
  Color: number;
  isShownAreas?: boolean;
}

export class ProductionArea {
  OID: number;
  DataSetOid: number;
  PrimaryDataFieldOid: number;
  Name: string;
  DrawingData: string;
  Size: number;
}

export class MapDataFieldsCategory {
  OID: number;
  ShortTitle: string;
  Title: string;
  PrimaryDataFields: PrimaryDataField[];
}

@Injectable()
export class AreaMappingService {

  constructor(private httpClient: HttpClient) { }

  getIndicatorsDatasetForCurrentUser() {
    return this.httpClient.get(`${environment.apiUrl}/api/IndicatorDataSets/GetCurrentUserList`);
  }

  getAreaInformation(oid: number) {
    return this.httpClient.get(`${environment.apiUrl}/api/Indicators/GetMapPrimaryDataFields(${oid})`);
  }

  saveProductionArea(ProductionArea) {
    return this.httpClient.post(`${environment.apiUrl}/api/ProductionAreas/CreateOrUpdate`, ProductionArea).map(response => response);
  }

  deleteProductionArea(oid:number) {
    return this.httpClient.delete(`${environment.apiUrl}//api/ProductionAreas(${oid})`).map(response => response);
  }

  getMapDataFieldsCategories() {
    return this.httpClient.get(`${environment.apiUrl}/api/Indicators/GetMapDataFieldsCategories`);
  }

  getCategoryMapPrimaryDataFields(dataSetOid:number, categoryOid:number) {
    return this.httpClient.get(`${environment.apiUrl}/api/Indicators/GetCategoryMapPrimaryDataFields?dataSetOid=${dataSetOid}&categoryOid=${categoryOid}`)
  }

  сopyMapDataValues(dataSetFromOid, dataSetToOid) {
    return this.httpClient.post(
      `${environment.apiUrl}/api/Indicators/CopyMapDataValues?dataSetFromOid=${dataSetFromOid}&dataSetToOid=${dataSetToOid}`, {});
  }

  isDataSetHaveMapData(oid) {
    return this.httpClient.get(`${environment.apiUrl}/api/IndicatorDataSets/IsDataSetHaveMapData(${oid})`);
  }

}
