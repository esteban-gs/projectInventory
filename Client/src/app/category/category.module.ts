import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing/category-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryDetailsComponent } from './category-details/category-details.component';



@NgModule({
  declarations: [CategoryListComponent, CategoryDetailsComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
  ]
})
export class CategoryModule { }
