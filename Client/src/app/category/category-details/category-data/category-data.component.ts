import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryForList } from 'src/app/_interface/category-for-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EditingStatusComponent } from 'src/app/shared/snackbars/editing-status/editing-status.component';
import { DeleteService } from 'src/app/shared/delete.service';
import { HttpService } from 'src/app/shared/http.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-category-data',
  templateUrl: './category-data.component.html',
  styleUrls: ['./category-data.component.scss']
})
export class CategoryDataComponent implements OnInit {
  // Reusable mat-dialog configs
  private dialogConfig;

  // Form
  public categoryForm: FormGroup;
  apiEndpoint = `api/categories/`;
  listEndpoint = `category/categories`;

  // Confirm Dialog
  confirmDelete: boolean;

  @Input() public category: CategoryForList;
  @Output() editedCategoryEmit = new EventEmitter<boolean>();

  constructor(
    private snackBar: MatSnackBar,
    private deleteServ: DeleteService,
    private repoService: HttpService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
  ) { }

  public createForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category.name, [Validators.required, Validators.maxLength(250)])
    });
  }

  // Calls method in parent item to get device data again and pass it to child
  public onChange = (edited: boolean) => {
    this.editedCategoryEmit.emit(edited);
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
    this.categoryForm.enable();
    this.openSnackBar();
  }

  public setToViewMode = () => {
    this.categoryForm.disable();
    this.dismissSnackBar();
  }

  public onCancel = () => {
    this.categoryForm.reset();
    this.createForm();
    this.categoryForm.disable();
    this.dismissSnackBar();
  }


  public delete = (id: string) => {
    this.deleteServ
      .delete(id, this.dialogConfig, `${this.apiEndpoint}${id}`, `${this.listEndpoint}`);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  public editCategory = (categoryFormValue) => {
    // clear editing status
    this.dismissSnackBar();

    if (this.categoryForm.valid) {
      this.executeCategoryUpdate(categoryFormValue);
    }
  }

  // employees should be assigned after creation
  private executeCategoryUpdate = (categoryFormValue) => {
    const category: CategoryForList = { ...categoryFormValue };

    const apiUrl = `${this.apiEndpoint}${this.category.id}`;
    this.repoService.update(apiUrl, category)
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

  // confirm delete, delete
  confirmDialog(): void {
    const message = `Are you sure you want to permanently delete record: ${this.category.id}`;
    this.dialogConfig.data = new ConfirmDialogModel('Delete Record', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);

    dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.confirmDelete = dialogResult;
        if (this.confirmDelete) {
          this.delete(`${this.category.id}`);
        }
      });
  }


  ngOnInit() {
    this.createForm();
    this.categoryForm.disable();
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

}
