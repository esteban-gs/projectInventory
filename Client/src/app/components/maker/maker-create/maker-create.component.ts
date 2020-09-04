import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { MakerForCreate } from 'src/app/_interface/maker-for-create';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-maker-create',
  templateUrl: './maker-create.component.html',
  styleUrls: ['./maker-create.component.scss']
})
export class MakerCreateComponent implements OnInit {
  // Endpoints
  apiEndpoint = `api/makers/`;
  listEndpoint = `maker/maker/`;
  detailsEndpoint = `maker/details/`;

  // form
  public makerForm: FormGroup;

  // success dialog
  private dialogConfig;

  constructor(
    private repoService: HttpService,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.makerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(365)]),
    });

    // reusable dialog configs
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.makerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createRecord = (makerFormValue) => {
    if (this.makerForm.valid) {
      this.executeCreation(makerFormValue);
    }
  }

  private executeCreation = (categoryFormValue) => {
    const maker: MakerForCreate = { ...categoryFormValue };

    this.repoService.create(`${this.apiEndpoint}`, maker)
      .subscribe(res => {
        // catch the created at route info
        const obj: any = res;
        console.log(JSON.stringify(obj));
        const newMaker = obj.id;

        // show created confirmation
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
        dialogRef.afterClosed()
          .subscribe(result => {
            const url = `${this.detailsEndpoint}${newMaker}`;
            this.router.navigate([url]);
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      );
  }

}
