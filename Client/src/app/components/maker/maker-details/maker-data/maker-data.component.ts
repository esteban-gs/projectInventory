import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MakerForList } from 'src/app/_interface/maker-for-list';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteService } from 'src/app/shared/delete.service';
import { HttpService } from 'src/app/shared/http.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { EditingStatusComponent } from 'src/app/shared/snackbars/editing-status/editing-status.component';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-maker-data',
  templateUrl: './maker-data.component.html',
  styleUrls: ['./maker-data.component.scss']
})
export class MakerDataComponent implements OnInit {
  // Reusable mat-dialog configs
  private dialogConfig;

  // Form
  public makerForm: FormGroup;
  apiEndpoint = `api/makers/`;
  listEndpoint = `maker/makers`;

  // Confirm Dialog
  confirmDelete: boolean;

  @Input() public maker: MakerForList;
  @Output() editedMakerEmit = new EventEmitter<boolean>();

  constructor(
    private snackBar: MatSnackBar,
    private deleteServ: DeleteService,
    private repoService: HttpService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
  ) { }

  public createForm() {
    this.makerForm = new FormGroup({
      name: new FormControl(this.maker.name, [Validators.required, Validators.maxLength(365)])
    });
  }

  // Calls method in parent item to get device data again and pass it to child
  public onChange = (edited: boolean) => {
    this.editedMakerEmit.emit(edited);
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
    this.makerForm.enable();
    this.openSnackBar();
  }

  public setToViewMode = () => {
    this.makerForm.disable();
    this.dismissSnackBar();
  }

  public onCancel = () => {
    this.makerForm.reset();
    this.createForm();
    this.makerForm.disable();
    this.dismissSnackBar();
  }

  public delete = (id: string) => {
    this.deleteServ
      .delete(id, this.dialogConfig, `${this.apiEndpoint}${id}`, `${this.listEndpoint}`);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.makerForm.controls[controlName].hasError(errorName);
  }

  public editMaker = (makerFormValue) => {
    // clear editing status
    this.dismissSnackBar();

    if (this.makerForm.valid) {
      this.executeMakerUpdate(makerFormValue);
    }
  }

  // employees should be assigned after creation
  private executeMakerUpdate = (makerFormValue) => {
    const maker: MakerForList = { ...makerFormValue };

    const apiUrl = `${this.apiEndpoint}${this.maker.id}`;
    this.repoService.update(apiUrl, maker)
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
    const message = `Are you sure you want to permanently delete record: ${this.maker.id}`;
    this.dialogConfig.data = new ConfirmDialogModel('Delete Record', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);

    dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.confirmDelete = dialogResult;
        if (this.confirmDelete) {
          this.delete(`${this.maker.id}`);
        }
      });
  }



  ngOnInit() {
    this.createForm();
    this.makerForm.disable();
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

}
