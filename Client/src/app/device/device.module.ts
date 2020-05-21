import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing/device-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [DeviceListComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class DeviceModule { }
