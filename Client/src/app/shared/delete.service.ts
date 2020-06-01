import { Component, OnInit, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Location } from '@angular/common';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private dialogConfig;
  constructor(
    private router: Router,
    private httpServ: HttpService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) { }
  public redirectToList = (listEndpoint: string) => {
    this.router.navigate([listEndpoint]);
  }

  /***
   * Reusable delete action handles confirm dialog and delete success dialog
   */
  public delete = (
    id: string,
    dialogConf: any,
    endpoint: string,
    redirectEndpoint: string
  ) => {
    this.httpServ.delete(endpoint)
      .subscribe(res => {
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
        dialogRef.afterClosed()
          .subscribe(result => {
            this.redirectToList(redirectEndpoint);
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      );
  }
}
