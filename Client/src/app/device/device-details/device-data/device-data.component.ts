import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceForDetails } from '../../../_interface/device-for-details';
import { Router } from '@angular/router';
import { ActionsService } from '../../actions.service';
import { DeviceService } from '../../device.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DeviceForCreate } from '../../../_interface/device-for-create';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditingStatusComponent } from 'src/app/shared/snackbars/editing-status/editing-status.component';


@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {
  // Reusable mat-dialog configs
  private dialogConfig;

  // Form
  public deviceForm: FormGroup;
  maxDate: Date;

  // Confirm Dialog
  confirmDelete: boolean;

  @Input() public device: DeviceForDetails;
  @Output() editedDeviceEmitt = new EventEmitter<boolean>();

  // Mat table columns
  displayedColumns: string[] = ['employeeId', 'employee', 'checkOutDate', 'checkInDate'];

  constructor(
    private router: Router,
    private actionsServ: ActionsService,
    private repoService: DeviceService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private snackBar: MatSnackBar
  ) { }

  public createForm() {
    this.deviceForm = new FormGroup({
      name: new FormControl(this.device.name, [Validators.required, Validators.maxLength(365)]),
      description: new FormControl(this.device.description, [Validators.maxLength(500)]),
      purchased: new FormControl(this.device.purchased, [Validators.required]),
      value: new FormControl(this.device.value, [Validators.required]),
      productId: new FormControl(this.device.productId, [Validators.required, Validators.maxLength(20)]),
      categoryId: new FormControl(1),
      makerId: new FormControl(1),
      // Not handling creating devices with employeeDevices assigned. Will handle on edit
      employeesIds: new FormControl([]),
    });
  }

  // Calls method in parent item to get device data again and pass it to child
  public onChange = (edited: boolean) => {
    this.editedDeviceEmitt.emit(edited);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(EditingStatusComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  public setToEditMode = () => {
    this.deviceForm.enable();
    this.openSnackBar();
  }

  public setToViewMode = () => {
    this.deviceForm.disable();
    this.dismissSnackBar();
  }

  public redirectToDetails = () => {
    const url = `/device/details/${this.device.id}`;
    this.router.navigate([url]);
  }

  public delete = (id: string) => {
    this.actionsServ.delete(id, this.dialogConfig);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.deviceForm.controls[controlName].hasError(errorName);
  }

  dismissSnackBar() {
    this.snackBar.dismiss();
  }

  public onCancel = () => {
    this.deviceForm.reset();
    this.createForm();
    this.deviceForm.disable();
    this.dismissSnackBar();
  }

  public editDevice = (deviceFormValue) => {
    // clear editing status
    this.dismissSnackBar();

    if (this.deviceForm.valid) {
      this.executeDeviceUpdate(deviceFormValue);
    }
  }

  confirmDialog(): void {
    const message = `Are you sure you want to permanently delete record: ${this.device.id}`;
    this.dialogConfig.data = new ConfirmDialogModel('Delete Record', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);

    dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.confirmDelete = dialogResult;
        if (this.confirmDelete) {
          this.delete(`${this.device.id}`);
        }
      });
  }

  // employees should be assigned after creation
  private executeDeviceUpdate = (deviceFormValue) => {
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

    const apiUrl = `api/devices/${this.device.id}`;
    this.repoService.update(apiUrl, device)
      .subscribe(res => {
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
        dialogRef.afterClosed()
          .subscribe(result => {
            this.onChange(true);
            this.setToViewMode();
          });
      },
        (error => {
          this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error);
        })
      );
  }

  ngOnInit() {
    this.createForm();
    this.deviceForm.disable();
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

}
