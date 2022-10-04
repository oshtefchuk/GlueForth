import { Injectable } from '@angular/core';
import {SpaDataSetByDimentionsBarChart} from "../../shared/models/spaDataSet.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export class CountryInfo {
  country: string;
  hydro: number;
  oil: number;
  gas: number;
  coal: number;
  nuclear: number;
}

export class EnergyDescription {
  value: string;
  name: string;
}

export class Data {
  day: string;
  oranges: number;
}

let energySources: EnergyDescription[] = [
  { value: "hydro", name: "Open" },
  { value: "oil", name: "Overdue" },

];

let countriesInfo: CountryInfo[]  = [{
  country: "January",
  hydro: 59.8,
  oil: 137.6,
  gas: 582,
  coal: 564.3,
  nuclear: 187.9
}, {
  country: "February",
  hydro: 74.2,
  oil: 337.6,
  gas: 35.1,
  coal: 956.9,
  nuclear: 11.3
}, {
  country: "March",
  hydro: 40,
  oil: 528.5,
  gas: 361.8,
  coal: 105,
  nuclear: 32.4
}, {
  country: "April",
  hydro: 22.6,
  oil: 241.5,
  gas: 64.9,
  coal: 120.8,
  nuclear: 64.8
}, {
  country: "May",
  hydro: 19,
  oil: 819.3,
  gas: 28.9,
  coal: 204.8,
  nuclear: 3.8
}, {
  country: "June",
  hydro: 6.1,
  oil: 923.6,
  gas: 77.3,
  coal: 85.7,
  nuclear: 37.8
}];

export class PopulationByRegion {
  state: string;
  AnsweredPercentage: number;
}

let populationByRegions: PopulationByRegion[] = [{ /* state: 'Company1',
  val: 4119626293
}, {
  state: 'Company2',
  val: 1012956064
}];*/


state: 'answered', AnsweredPercentage: 60}, {state: 'unanswered', AnsweredPercentage: 10}, {state: 'unanswered', AnsweredPercentage: 30}];
@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getEnergySources(): EnergyDescription[] {
    return energySources;
  }
  getCountriesInfo(): any {
    /*return countriesInfo;*/
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetImprovementPlanTrend`);
  }

  getPopulationByRegions(): PopulationByRegion[] {
    return populationByRegions;
  }

  getIndicatorsDataSetsOverAllProgress() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetIndicatorDataSetsProgress`)
  }
  getIndicatorsDataSetProgressByCategoryOid(categoryOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetIndicatorDataSetsProgress?categoryOid=${categoryOid}`)
  }
 /* getData(): SpaDataSetByDimentionsBarChart[] {
    return data;
  }*/
  getImprovementPlanOverdueProgress() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetImprovementPlanOverdueProgress`);
  }

  getImprovementPlanOpenProgress() {
    return this.httpClient.get(`${environment.apiUrl}/api/Reports/GetImprovementPlanOpenProgress`);
  }

  getAssessmentLastModifiedDate() {
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetAssessmentLastModified`);
  }

  getIndicatorsLastModifiedDate() {
    return this.httpClient.get(`${environment.apiUrl}/api/Users/GetIndicatorsLastModified`);
  }


}
