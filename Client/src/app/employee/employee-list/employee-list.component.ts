import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeForList } from 'src/app/_interface/employee-for-list';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpService } from 'src/app/shared/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/shared/delete.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  // endpoints
  apiEndpoint = `api/employees/`;
  apiEntityListEndpoint = `api/employees/?recordsPerPage=50&page=1`;
  listEndpoint = `employees/list/`;
  detailsEndpoint = `employees/details/`;

  // dialog cofigs
  private dialogConfig;
  confirmDelete: boolean;

  public displayedColumns = ['id', 'firstName', 'lastName', 'socialSecurityNumber', 'badgeNumber', 'hireDate', 'details', 'delete'];
  public dataSource = new MatTableDataSource<EmployeeForList>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private repoServ: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private actionsServ: DeleteService,
  ) { }

  ngOnInit() {
    this.getEmployees();

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
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getEmployees = () => {
    this.repoServ.getData(`${this.apiEntityListEndpoint}`)
      .subscribe(res => {
        this.dataSource.data = res as EmployeeForList[];
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
