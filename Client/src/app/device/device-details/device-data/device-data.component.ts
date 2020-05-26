import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceForDetails } from '../../../_interface/device-for-details';
import { Router } from '@angular/router';
import { ActionsService } from '../../actions.service';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {
  private dialogConfig;

  @Input() public device: DeviceForDetails;
  @Output() selectEmitt = new EventEmitter();
  displayedColumns: string[] = ['employeeId', 'employee', 'checkOutDate', 'checkInDate'];

  constructor(
    private router: Router,
    private actionsServ: ActionsService
  ) { }

  ngOnInit() {
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

  public redirectToEdit = (id: string) => {
    const url = `/device/edit/${id}`;
    this.router.navigate([url]);
  }

  public redirectToList = () => {
    const url = `/device/devices`;
    this.router.navigate([url]);
  }

  public delete = (id: string) => {
    this.actionsServ.delete(id, this.dialogConfig);
  }


}
