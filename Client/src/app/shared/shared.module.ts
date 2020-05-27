import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { EditingStatusComponent } from './snackbars/editing-status/editing-status.component';

@NgModule({
  declarations: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    EditingStatusComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    EditingStatusComponent
  ]
})
export class SharedModule { }
