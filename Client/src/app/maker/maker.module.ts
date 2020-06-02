import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakerListComponent } from './maker-list/maker-list.component';
import { MakerRoutingModule } from './maker-routing/maker-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MakerCreateComponent } from './maker-create/maker-create.component';



@NgModule({
  declarations: [MakerListComponent, MakerCreateComponent],
  imports: [
    CommonModule,
    MakerRoutingModule,
    SharedModule
  ]
})
export class MakerModule { }
