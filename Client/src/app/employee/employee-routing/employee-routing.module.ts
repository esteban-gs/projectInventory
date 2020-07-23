import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';

const routes: Routes = [
  { path: 'list', component: EmployeeListComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'create', component: EmployeeCreateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
