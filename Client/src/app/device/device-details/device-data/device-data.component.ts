import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceForDetails } from '../../../_interface/device-for-details';
import { Router } from '@angular/router';
import { ActionsService } from '../../actions.service';
import { DeviceService } from '../../../shared/device.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location, CurrencyPipe } from '@angular/common';
import { DeviceForCreate } from '../../../_interface/device-for-create';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../../shared/error-handler.service';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {
  private dialogConfig;
  public deviceForm: FormGroup;
  maxDate: Date;

  @Input() public device: DeviceForDetails;
  @Output() selectEmitt = new EventEmitter();
  displayedColumns: string[] = ['employeeId', 'employee', 'checkOutDate', 'checkInDate'];

  constructor(
    private router: Router,
    private actionsServ: ActionsService,
    private repoService: DeviceService,
    private location: Location,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) { }

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
  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

  public toggleEdit = () => {
    this.deviceForm.enable();
  }

  public redirectToList = () => {
    const url = `/device/devices`;
    this.router.navigate([url]);
  }

  public delete = (id: string) => {
    this.actionsServ.delete(id, this.dialogConfig);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.deviceForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.deviceForm.reset();
    this.createForm();
    this.deviceForm.disable();
    const url = `/device/details/${this.device.id}`;
    this.router.navigate([url]);
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
