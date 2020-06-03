import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDataComponent } from './employee-details/employee-data/employee-data.component';



@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailsComponent, EmployeeDataComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
