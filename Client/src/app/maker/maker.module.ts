import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakerListComponent } from './maker-list/maker-list.component';
import { MakerRoutingModule } from './maker-routing/maker-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MakerCreateComponent } from './maker-create/maker-create.component';
import { MakerDetailsComponent } from './maker-details/maker-details.component';
import { MakerDataComponent } from './maker-details/maker-data/maker-data.component';



@NgModule({
  declarations: [MakerListComponent, MakerCreateComponent, MakerDetailsComponent, MakerDataComponent],
  imports: [
    CommonModule,
    MakerRoutingModule,
    SharedModule
  ]
})
export class MakerModule { }
