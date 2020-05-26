import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/shared/device.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Location } from '@angular/common';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private dialogConfig;
  constructor(
    private router: Router,
    private repoService: DeviceService,
    private dialog: MatDialog,
    private location: Location,
    private errorService: ErrorHandlerService
  ) { }
  public redirectToList = () => {
    const url = `/device/devices`;
    this.router.navigate([url]);
  }

  public delete = (id: string, dialogConf: any) => {

    const apiUrl = `api/devices/${id}`;
    this.repoService.delete(apiUrl)
      .subscribe(res => {
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
        dialogRef.afterClosed()
          .subscribe(result => {
            this.redirectToList();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      );
  }

}
