import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material UI
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatPaginatorModule } from '@angular/material/paginator';


// simplify imports and exports
const materialImportsExportsArray = [
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatInputModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialImportsExportsArray
  ],
  exports: [
    materialImportsExportsArray
  ],
})
export class MaterialModule { }