import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bluenorth-standards-overview',
  templateUrl: './standards-overview.component.html',
  styleUrls: ['./standards-overview.component.scss']
})

export class StandardsOverviewComponent implements OnInit {
  @HostBinding('class.standards-overview-item')

  @Input() logo;

  constructor() { }

  ngOnInit() {
  }

}
