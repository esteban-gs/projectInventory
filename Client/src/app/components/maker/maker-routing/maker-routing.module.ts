import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MakerListComponent } from '../maker-list/maker-list.component';
import { MakerCreateComponent } from '../maker-create/maker-create.component';
import { MakerDetailsComponent } from '../maker-details/maker-details.component';

const routes: Routes = [
  { path: 'list', component: MakerListComponent },
  { path: 'create', component: MakerCreateComponent },
  { path: 'details/:id', component: MakerDetailsComponent }
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
export class MakerRoutingModule { }
