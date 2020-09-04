import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/shared/http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeForCreate } from 'src/app/_interface/employee-for-create';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
  // Endpoints
  apiEndpoint = `api/employees/`;
  listEndpoint = `employee/employees/`;
  detailsEndpoint = `employee/details/`;

  // form
  public employeeForm: FormGroup;
  maxDate: Date;
  ssnRegExp: RegExp = /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;

  // success dialog
  private dialogConfig;

constructor(
  private repoService: HttpService,
  private location: Location,
  private router: Router,
  private dialog: MatDialog,
  private errorService: ErrorHandlerService,
) { }

ngOnInit() {
  this.employeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(365)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(365)]),
    socialSecurityNumber: new FormControl('', [Validators.pattern(this.ssnRegExp), Validators.required, Validators.maxLength(11)]),
    badgeNumber: new FormControl('', [Validators.maxLength(15)]),
    hireDate: new FormControl(new Date(), [Validators.required]),
  });

  // reusable dialog configs
  this.dialogConfig = {
    height: 'auto',
    width: 'auto',
    disableClose: true,
    data: {}
  };

  // form
  this.maxDate = new Date();
}

  public hasError = (controlName: string, errorName: string) => {
  return this.employeeForm.controls[controlName].hasError(errorName);
}

  public onCancel = () => {
  this.location.back();
}

  public createRecord = (employeeFormValue) => {
  if (this.employeeForm.valid) {
    this.executeCreation(employeeFormValue);
  }
}

  private executeCreation = (employeeFormValue) => {
  const employee: EmployeeForCreate = { ...employeeFormValue };

  this.repoService.create(`${this.apiEndpoint}`, employee)
    .subscribe(res => {
      // catch the created at route info
      const obj: any = res;
      console.log(JSON.stringify(obj));
      const newEmployee = obj.id;

      // show created confirmation
      const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

      // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
      dialogRef.afterClosed()
        .subscribe(result => {
          const url = `${this.detailsEndpoint}${newEmployee}`;
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
