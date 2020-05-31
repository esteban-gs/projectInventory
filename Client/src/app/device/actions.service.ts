import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Location } from '@angular/common';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { DeviceForList } from '../_interface/device-for-list';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private dialogConfig;
  constructor(
    private router: Router,
    private httpServ: HttpService,
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
    this.httpServ.delete(apiUrl)
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


  public getDevices = (dataSource: any): any => {
    this.httpServ.getData('api/devices?recordsPerPage=50&page=1')
      .subscribe(res => {
        dataSource.data = res as DeviceForList[];
      },
        (error) => {
          this.errorService.handleError(error);
        });
  }

}
