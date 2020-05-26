import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceForDetails, EmployeeDevicesList } from '../../../_interface/device-for-details';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {
  @Input() public device: DeviceForDetails;
  @Output() selectEmitt = new EventEmitter();
  displayedColumns: string[] = ['employeeId', 'employee', 'checkOutDate', 'checkInDate'];

  constructor() {

  }

  ngOnInit() {
  }

  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

}
