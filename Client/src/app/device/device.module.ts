import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing/device-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceDataComponent } from './device-details/device-data/device-data.component';



@NgModule({
  declarations: [DeviceListComponent, DeviceDetailsComponent, DeviceDataComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class DeviceModule { }
