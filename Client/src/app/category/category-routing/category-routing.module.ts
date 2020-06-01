import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';


const routes: Routes = [
  { path: 'categories', component: CategoryListComponent },
  { path: 'details/:id', component: CategoryDetailsComponent }
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
export class CategoryRoutingModule { }
