import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';


const routes: Routes = [
  { path: 'list', component: CategoryListComponent },
  { path: 'details/:id', component: CategoryDetailsComponent },
  { path: 'create', component: CategoryCreateComponent }
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
