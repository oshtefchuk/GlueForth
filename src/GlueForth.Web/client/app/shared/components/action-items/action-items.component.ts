import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bluenorth-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.scss']
})
export class ActionItemsComponent implements OnInit {

  @Input() public actionItemBlock: string;
  @Input() public reportingCounts: number[] = [];

  constructor() { }

  ngOnInit() {
  }

}
