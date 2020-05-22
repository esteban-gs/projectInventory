import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceForDetails } from '../../../_interface/device-for-details';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {
  panelOpenState = false;

  @Input() public device: DeviceForDetails;
  public selectOptions = [{ name: 'Show', value: 'show' }, { name: `Don't Show`, value: '' }];
  @Output() selectEmitt = new EventEmitter();
  constructor() {
   }

  ngOnInit() {
  }

  public onChange = (event) => {
    this.selectEmitt.emit(event.value);

  }

  public toggleExpansion(){
    this.panelOpenState = !this.panelOpenState;
  }
}
