import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device.service';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { DeviceForDetails } from 'src/app/_interface/device-for-details';

@Component({
  selector: 'app-owner-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  public deviceForDetails: DeviceForDetails;
  edited = false;

  constructor(
    private repository: DeviceService,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.getDeviceDetails();
  }

  private getDeviceDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/devices/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.deviceForDetails = res as DeviceForDetails;
        // console.log(this.deviceForDetails);
      },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }

  public onEditedDevice(edited: boolean) {
    edited ? this.getDeviceDetails() : console.log('Not Eited') ;
  }
}
