import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { CategoryForCreate } from 'src/app/_interface/category-for-create';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  // Endpoints
  apiEndpoint = `api/categories/`;
  listEndpoint = `category/categories/`;
  detailsEndpoint = `category/details/`;

  // form
  public categoryForm: FormGroup;

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
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
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
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createRecord = (categoryFormValue) => {
    if (this.categoryForm.valid) {
      this.executeCreation(categoryFormValue);
    }
  }

  private executeCreation = (categoryFormValue) => {
    const category: CategoryForCreate = { ...categoryFormValue };

    this.repoService.create(`${this.apiEndpoint}`, category)
      .subscribe(res => {
        // catch the created at route info
        const obj: any = res;
        console.log(JSON.stringify(obj));
        const newCategory = obj.id;

        // show created confirmation
        const dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // subscribing on the [mat-dialog-close] attribute as soon as dialog button is clicked
        dialogRef.afterClosed()
          .subscribe(result => {
            const url = `${this.detailsEndpoint}${newCategory}`;
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
