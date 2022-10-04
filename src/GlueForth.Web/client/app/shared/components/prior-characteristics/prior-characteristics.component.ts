import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bluenorth-prior-characteristics',
  templateUrl: './prior-characteristics.component.html',
  styleUrls: ['./prior-characteristics.component.scss']
})
export class PriorCharacteristicsComponent implements OnInit {

  @Input() public topPriorByPrincipleGroup: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
