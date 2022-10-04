import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IndicatorDataSet} from "../../shared/models/indicatorDataSet.model";
import {UnitService} from "../../shared/services/unit.service";
import {UserService} from "../../shared/services/user.service";
import {UnitInfo} from "../../shared/models/unit.model";
import {switchMap} from "rxjs/internal/operators";


const newDataSet: IndicatorDataSet = {
  'Unit': '',
  'PeriodFromYear': '',
  'PeriodToYear': '',
  'PeriodFromMonth': '',
  'PeriodToMonth': ''

};

@Injectable()
export class StandardsService {

  public currentStandardId: number;

  constructor(private httpClient: HttpClient,
              private unitService: UnitService,
              private userService: UserService) {
  }

  getStandardsList() {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards/ByCurrentUnit`)
  }

  getStandardByOid(Oid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards(${Oid})`)
  }

  getStandardByCommodity(commodityOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards/ByCommodity?key=${commodityOid}`);
  }



  getNewDataSet() {
    return newDataSet;
  }

  getCharacteristicsByCurrentFramework() {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFramework`);
  }

  getCharacteristicByOid(characteristicOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics(${characteristicOid})`)
  }

  getCharacteristicByDimension(dimensionOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAndDimension(${dimensionOid})`)
  }

  /* getCharacteristicByPrinciple(principleOid) {
     return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAndPrinciple(${principleOid})`)
   }*/
  getCharacteristicByPrinciple(principleOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurFrameworkAndPrinciple(${principleOid})`)
  }

  /* getCharacteristicByPrincipleGroup(principleGroupOid) {
     return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAndPrincipleGroup(${principleGroupOid})`)
   } */
  getCharacteristicByPrincipleGroup(principleGroupOid) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurFrameworkAndPrincipleGroup(${principleGroupOid})`)
  }

  /* getCharacteristicByGroupOrPrinciple(oid, selectedItem) {
     return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurrentFrameworkAnd${selectedItem}(${oid})`)
   } */
  getCharacteristicByGroupOrPrinciple(oid, selectedItem) {
    return this.httpClient.get(`${environment.apiUrl}/api/Characteristics/GetByCurFrameworkAnd${selectedItem}(${oid})`)
  }

  getStandardByCommodityIdFromUnit() {
    return this.userService.getUserInfo().pipe(
      switchMap(user => {
        if (user.body['CurrentUnitId']) {
          let userId = user.body['CurrentUnitId'];
          return this.unitService.getUnitById(userId).pipe(
            switchMap((unit: UnitInfo) => {
              return this.getStandardByCommodity(unit.UnitCommodityId)
            })
          )
        } else {
          return this.getStandardsList()
        }
      })
    )
  }

  /*getCharacteristicByStandardOidFromUnit() {
    return this.userService.getUserInfo()
      .switchMap(user => {
        if (user.body['CurrentUnitId']) {
          let userId = user.body['CurrentUnitId'];
          return this.unitService.getUnitById(userId)
            .switchMap((unit: UnitInfo) => {
              this.currentStandardId = unit.CurrentStandardId;
              return this.getCharacteristicsByStandard()
            })
        }
      })
  }*/

 /* getIndicatorDataSetListByStandardOidFromUnit() {
    return this.userService.getUserInfo().pipe(
      switchMap(user => {
        if (user.body['CurrentUnitId']) {
          let userId = user.body['CurrentUnitId'];
          return this.getIndicatorDataSetList(user.body['CurrentUnitId'])
        }
      })
    )
  }*/


  /* getStandardByOidFromUnit() {
     return this.userService.getUserInfo()
       .switchMap(user => {
         if (user.body['CurrentUnitId']) {
           let userId = user.body['CurrentUnitId'];
           return this.unitService.getUnitById(userId)
             .switchMap((unit: UnitInfo) => {
               return this.getStandardByOid(unit.CurrentStandardId);
             })
         }
       });
   }
 */
  getIndicatorsNotes(body) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataFieldNotes/GetListByDataFieldAndDataSet `, body)
  }

  addIndicatorsNotes(note) {
    return this.httpClient.post(`${environment.apiUrl}/api/PrimaryDataFieldNotes/CreateOrUpdate`, note, {observe: 'response'});
  }

  getStandardsByCurrentUnit() {
    return this.httpClient.get(`${environment.apiUrl}/api/Standards/GetStatusesByCurrentUnit`)
  }

  getCurrentUnitAllStatuses(id, body) {
    if (id === 0) {
      return this.httpClient.post(`${environment.apiUrl}/api/Standards/GetCurrentUnitStatuses`, body);
    }
    if (id === 1) {
      return this.httpClient.post(`${environment.apiUrl}/api/Standards/GetCurrentUnitAllStatuses`, body);
    }
  }

  getCurrentUnitStatuses(filters) {
    return this.httpClient.post(`${environment.apiUrl}/api/Standards/GetCurrentUnitStatuses`, filters)
  }

  getQuestionGroupsTitles() {
    return this.httpClient.get(`${environment.apiUrl}/api/QuestionGroups/GetLowest`)
  }
}
