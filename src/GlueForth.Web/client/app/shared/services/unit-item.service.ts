import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserProfileService} from "../../user-profile/user-profile.service";
import {Observable, of} from "rxjs/index";
import {mergeMap} from "rxjs/internal/operators";

@Injectable()
export class UnitItemService {

  constructor(private route: ActivatedRoute,
              private userProfileService: UserProfileService
              ) {
  }


  public getCurrentUnitId(): Observable<string> {
    return this.route.params.pipe(
      mergeMap(params => {
      let currentUnitId = params['unitId'].toString();
      return of(currentUnitId);
    })
    )
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.userProfileService.getCurrentUnitId();
  }
}
