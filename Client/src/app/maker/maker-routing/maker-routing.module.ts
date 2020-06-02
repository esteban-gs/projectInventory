import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MakerListComponent } from '../maker-list/maker-list.component';
import { MakerCreateComponent } from '../maker-create/maker-create.component';

const routes: Routes = [
  { path: 'makers', component: MakerListComponent },
  { path: 'create', component: MakerCreateComponent }
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
