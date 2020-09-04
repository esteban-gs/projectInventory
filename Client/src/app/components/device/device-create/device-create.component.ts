import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DeviceForCreate } from '../../../_interface/device-for-create';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.scss']
})
export class DeviceCreateComponent implements OnInit {
  public deviceForm: FormGroup;
  private dialogConfig;
  maxDate: Date;

  constructor(
    private repoService: HttpService,
    private location: Location,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) {
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.deviceForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(365)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      purchased: new FormControl(new Date(), [Validators.required]),
      value: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      categoryId: new FormControl(1),
      makerId: new FormControl(1),
      // Not handling creating devices with employeeDevices assigned. Will handle on edit
      employeesIds: new FormControl([]),
    });

    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.deviceForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createDevice = (deviceFormValue) => {
    if (this.deviceForm.valid) {
      this.executeOwnerCreation(deviceFormValue);
    }
  }

  // employees should be assigned after creation
  private executeOwnerCreation = (deviceFormValue) => {
    const device: DeviceForCreate = {
      name: deviceFormValue.name,
      description: deviceFormValue.description,
      purchased: deviceFormValue.purchased,
      value: deviceFormValue.value,
      productId: deviceFormValue.productId,
      categoryId: deviceFormValue.categoryId,
      makerId: deviceFormValue.makerId,
      employeesIds: []
    };

    const apiUrl = 'api/devices';
    this.repoService.create(apiUrl, device)
      .subscribe(res => {
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      );
  }
}
