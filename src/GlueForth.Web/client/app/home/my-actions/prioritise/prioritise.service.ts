import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

export interface PriorCharacteristic {
  OID: number;
  Reference: string;
  Risks: string;
  Statement: string;
  AssessmentScore: number;
  IndicatorScore: number;
  IsPrior: boolean;
  IsDisabled: boolean;

}

export interface TopPriorCharacteristic {
  OID: number;
  Title: string;
  Order: number;
}

export interface characteristicOrder {
  OID: number;
  Order: number;
}

@Injectable()
export class MyActionsPrioritiseService {

  constructor(private httpClient: HttpClient) { }

  getPriorCharacteristicsByPrincipleGroup(principleGroupOid: number){
   return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetPriorByPrincipleGroup(${principleGroupOid})`)
  }
  addPriorCharacteristic(charOid, body?){
  return this.httpClient.post(`${environment.apiUrl}/api/Characteristics/AddPriorCharacteristic(${charOid})`, body, {observe: 'response'})
  }
  removePriorCharacteristic(charOid: number, body?){
  return this.httpClient.post(`${environment.apiUrl}/api/Characteristics/RemovePriorCharacteristic(${charOid})`, body, {observe: 'response'})
  }

  getTopPriorByPrincipleGroup(principleGroupOid : number) {
   return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetTopPriorByPrincipleGroup(${principleGroupOid})`)
  }

  setPriorCharacteristicOrder(body: characteristicOrder) {
    return this.httpClient.post(`${environment.apiUrl}/api/Characteristics/SetPriorCharacteristicOrder`,  body, {observe: 'response'})
  }
  getPriorByPrincipleAndGroup(body: any)  {
    return this.httpClient.post<Array<PriorCharacteristic>>(`${environment.apiUrl}/api/Characteristics/GetPriorByPrincipleAndGroup`,  body, {observe: 'response'})
  }
}

