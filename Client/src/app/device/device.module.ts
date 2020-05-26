import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceRoutingModule } from './device-routing/device-routing.module';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceDataComponent } from './device-details/device-data/device-data.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DeviceListComponent, DeviceDetailsComponent, DeviceDataComponent, DeviceCreateComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DeviceModule { }
