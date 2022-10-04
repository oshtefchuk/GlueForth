import {Component, Input, OnInit} from '@angular/core';
import {CharacteristicStatus} from "../../models/characteristic.model";

@Component({
  selector: 'bluenorth-characteristic-status',
  templateUrl: './characteristic-status.component.html',
  styleUrls: ['./characteristic-status.component.scss']
})
export class CharacteristicStatusComponent implements OnInit {

  CharacteristicStatus: typeof CharacteristicStatus = CharacteristicStatus;

  @Input() public status;

  constructor() { }

  ngOnInit() {

  }

}
