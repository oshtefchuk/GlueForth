import { Component, OnInit } from '@angular/core';
import { StandardsService } from '../standards.service';


@Component({
  selector: 'bluenorth-standards-reporting',
  templateUrl: './standards-reporting.component.html',
  styleUrls: ['./standards-reporting.component.scss']
})
export class StandardsReportingComponent implements OnInit {

  standardsList;

  constructor(private standardsService: StandardsService ) { }

  ngOnInit() {
    this.standardsService.getStandardsList().subscribe((resp: any[]) => {

      this.standardsList = resp.filter(standard => {return standard.LogoImage});
    });
  }

}
