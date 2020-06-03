import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeForList } from 'src/app/_interface/employee-for-list';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/shared/delete.service';
import { HttpService } from 'src/app/shared/http.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { EditingStatusComponent } from 'src/app/shared/snackbars/editing-status/editing-status.component';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EmployeeForCreate } from 'src/app/_interface/employee-for-create';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit {
  // Reusable mat-dialog configs
  private dialogConfig;

  // Form
  public employeeForm: FormGroup;
  maxDate: Date;
  apiEndpoint = `api/employees/`;
  listEndpoint = `employee/employees`;

  // Confirm Dialog
  confirmDelete: boolean;

  @Input() public employee: EmployeeForList;
  @Output() editedEmployeeEmitt = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private deleteServ: DeleteService,
    private repoService: HttpService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private snackBar: MatSnackBar
  ) { }

  public createForm() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employee.firstName, [Validators.required, Validators.maxLength(365)]),
      lastName: new FormControl(this.employee.lastName, [Validators.required, Validators.maxLength(365)]),
      socialSecurityNumber: new FormControl(this.employee.socialSecurityNumber, [Validators.required, Validators.maxLength(11)]),
      badgeNumber: new FormControl(this.employee.badgeNumber, [Validators.maxLength(15)]),
      hireDate: new FormControl(this.employee.hireDate, [Validators.required]),
    });
  }

  // Calls method in parent item to get device data again and pass it to child
  public onChange = (edited: boolean) => {
    this.editedEmployeeEmitt.emit(edited);
  }

  openSnackBar() {
    this.snackBar.openFromComponent(EditingStatusComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  dismissSnackBar() {
    this.snackBar.dismiss();
  }

  public setToEditMode = () => {
    this.employeeForm.enable();
    this.openSnackBar();
  }

  public setToViewMode = () => {
    this.employeeForm.disable();
    this.dismissSnackBar();
  }

  public onCancel = () => {
    this.employeeForm.reset();
    this.createForm();
    this.employeeForm.disable();
    this.dismissSnackBar();
  }

  public delete = (id: string) => {
    this.deleteServ
      .delete(id, this.dialogConfig, `${this.apiEndpoint}${id}`, `${this.listEndpoint}`);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }

  public editEmployee = (employeeFormValue) => {
    // clear editing status
    this.dismissSnackBar();

    if (this.employeeForm.valid) {
      this.executeEmployeeUpdate(employeeFormValue);
    }
  }

  // confirm delete, delete
  confirmDialog(): void {
    const message = `Are you sure you want to permanently delete record: ${this.employee.id}`;
    this.dialogConfig.data = new ConfirmDialogModel('Delete Record', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);

    dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.confirmDelete = dialogResult;
        if (this.confirmDelete) {
          this.delete(`${this.employee.id}`);
        }
      });
  }

  private executeEmployeeUpdate = (employeeFormValue) => {
    const employee: EmployeeForCreate = { ...employeeFormValue };

    const apiUrl = `${this.apiEndpoint}${this.employee.id}`;
    this.repoService.update(apiUrl, employee)
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
    this.employeeForm.disable();
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

}
