import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MakerForList } from 'src/app/_interface/maker-for-list';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/shared/delete.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-maker-list',
  templateUrl: './maker-list.component.html',
  styleUrls: ['./maker-list.component.scss']
})
export class MakerListComponent implements OnInit, AfterViewInit {
  // endpoints
  apiEndpoint = `api/makers/`;
  listEndpoint = `maker/makers/`;
  detailsEndpoint = `maker/details/`;

  // dialog cofigs
  private dialogConfig;
  confirmDelete: boolean;

  public displayedColumns = ['id', 'name', 'details', 'delete'];
  public dataSource = new MatTableDataSource<MakerForList>();

  @ViewChild(MatSort, null) sort: MatSort;
  constructor(
    private repoServ: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private actionsServ: DeleteService,
  ) { }

  ngOnInit() {
    this.getMakers();

    // set up the reusable dialog configs
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getMakers = () => {
    this.repoServ.getData(`${this.apiEndpoint}`)
      .subscribe(res => {
        this.dataSource.data = res as MakerForList[];
      });
  }

  public redirectToDetails = (id: string) => {
    const url = `${this.detailsEndpoint}${id}`;
    console.log(url);
    console.log(this.router.url);
    this.router.navigate([url]);
  }

  // confirm deletion, delete
  confirmDialog(id: string): any {
    const message = `Are you sure you want to permanently delete record: ${id}`;
    this.dialogConfig.data = new ConfirmDialogModel('Delete Record', message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, this.dialogConfig);

    dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.confirmDelete = dialogResult;
        if (this.confirmDelete) {
          this.delete(`${id}`);

          // removes deletem item from table list
          const makerId = Number(id);
          const deletableIndex = this.dataSource.data.findIndex(i => i.id === makerId);
          this.dataSource.data.splice(deletableIndex, 1);

          // force new array values into itself ???
          this.dataSource.data = this.dataSource.data.slice(0);
        }
      });
  }

  public delete = (id: string) => {
    this.actionsServ
      .delete(id, this.dialogConfig, `${this.apiEndpoint}${id}`, `${this.listEndpoint}`);
  }

}
