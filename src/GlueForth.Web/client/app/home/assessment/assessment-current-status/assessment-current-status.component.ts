import { Component, OnInit } from '@angular/core';
import { UnitService } from "../../../shared/services/unit.service";
import { UserService } from "../../../shared/services/user.service";
import { RegistrationSettingsService } from "../../../authentification/registration-settings/registration-settings.service";
import { Router } from "@angular/router";
import { UnitInfo } from "../../../shared/models/unit.model";
import {HomeService} from "../../home.service";

@Component({
  selector: 'bluenorth-assessment-current-status',
  templateUrl: './assessment-current-status.component.html',
  styleUrls: ['./assessment-current-status.component.scss']
})
export class AssessmentCurrentStatusComponent implements OnInit {

  public currentUnit: UnitInfo;


  constructor(
    private unitService: UnitService,
    private userService: UserService,
    private registrationSettingsService: RegistrationSettingsService,
    private homeService: HomeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.unitService.getUnitById(this.userService.getCurrentUser().CurrentUnitId)
      .subscribe((unit: UnitInfo) => {
        this.currentUnit = unit;
        if (this.currentUnit.AssessmentType !== (null || -1)) {
          this.router.navigate(['assessment-current-status'])
        }
      })
  }

  changeAssessmentType(assessmentType) {
    this.currentUnit['AssessmentType'] = assessmentType;
    this.registrationSettingsService.addOrUpdateUnit(this.currentUnit)
      .subscribe(unit => {
        this.homeService.isAssessmentTypeExists.next(true);
        if (unit['AssessmentType'] === 1) {

          this.router.navigate(['assessment-capture-light']);
        }
        if (unit['AssessmentType'] === 0) {
          this.router.navigate(['assessment-capture-full']);
        }

      })
  }
}
