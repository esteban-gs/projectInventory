import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakerListComponent } from './maker-list/maker-list.component';
import { MakerRoutingModule } from './maker-routing/maker-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [MakerListComponent],
  imports: [
    CommonModule,
    MakerRoutingModule,
    SharedModule
  ]
})
export class MakerModule { }
