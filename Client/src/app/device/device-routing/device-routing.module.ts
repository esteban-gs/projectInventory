import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceListComponent } from '../device-list/device-list.component';
import { Routes, RouterModule } from '@angular/router';
import { DeviceDetailsComponent } from '../device-details/device-details.component';
import { DeviceCreateComponent } from '../device-create/device-create.component';

const routes: Routes = [
  { path: 'devices', component: DeviceListComponent },
  { path: 'details/:id', component: DeviceDetailsComponent },
  { path: 'create', component: DeviceCreateComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class DeviceRoutingModule { }
