import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing/category-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryDataComponent } from './category-details/category-data/category-data.component';
import { CategoryCreateComponent } from './category-create/category-create.component';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDetailsComponent,
    CategoryDataComponent,
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
  ]
})
export class CategoryModule { }
