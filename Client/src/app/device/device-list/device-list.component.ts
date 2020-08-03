import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceForList, ApiResponseModel } from '../../_interface/device-for-list';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';
import { DeleteService } from '../../shared/delete.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DeviceForDetails } from 'src/app/_interface/device-for-details';
import { HttpService } from 'src/app/shared/http.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError, tap } from 'rxjs/operators';
import { DeviceService } from './device.service';
import { JsonPipe } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeviceListComponent implements OnInit, AfterViewInit {
  // endpoints
  apiEndpoint = `api/devices/`;
  listEndpoint = `devices/list/`;
  rootEndpoint = `devices/`;
  detailsEndpoint = `devices/details/`;

  // dialog cofigs
  private dialogConfig;
  confirmDelete: boolean;

  // Pagination
  resultsLength = 0;
  pageIndex = 1;
  recordsPerPage = 10;
  searchString: string = null;
  sortDirection: SortDirection;
  sortColumn: string = null;

  public displayedColumns = [
    'id',
    'name',
    'purchased',
    'value',
    'productId',
    'category',
    'maker',
    'employeesAssigned',
    'details',
    'delete'
  ];

  // table obj
  dataSource: ApiResponseModel;
  pageEvent: PageEvent;

  expandedElement: DeviceForList | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private errorService: ErrorHandlerService,
    private router: Router,
    private actionsServ: DeleteService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private repoServ: HttpService,
    private devHttpServ: DeviceService
  ) { }

  ngOnInit() {
    // set up the reusable dialog configs
    this.dialogConfig = {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      data: {}
    };

    this.initDataSource();
  }

  ngAfterViewInit(): void {
  }

  initDataSource() {
    this.devHttpServ.getDevices(1, 10, null, null, null, null).pipe(
      map((data: ApiResponseModel) => {
        this.dataSource = data as ApiResponseModel;
        console.log(this.dataSource);
      })
    ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex + 1;
    const size = event.pageSize;
    console.log(this.searchString);

    if (this.searchString == null && this.sortColumn == null) {
      this.devHttpServ.getDevices(page, size).pipe(
        map((data: ApiResponseModel) => this.dataSource = data)
      ).subscribe();
    } else {

      if (this.searchString != null && this.sortColumn == null) {
        this.search(this.searchString, page, size);
      }

      if (this.searchString == null && this.sortColumn != null) {
        this.sortData(this.sortDirection, this.sortColumn, page, size);
      }

      if (this.searchString != null && this.sortColumn != null) {
        this.sortData(this.sortDirection, this.sortColumn, page, size, this.searchString);
      }
    }

  }

  search(searchString: string, page: number, size: number) {
    this.devHttpServ.getDevices(page || 1, size || 10, null, null, null, searchString || null).pipe(
      map((data: ApiResponseModel) => {
        this.dataSource = data as ApiResponseModel;
        console.log(this.dataSource);
      })
    ).subscribe();
  }

  sortData(direction: SortDirection, activeColumn: string, page: number, size: number, searchString: string = null) {
    this.sortDirection = direction;
    this.sortColumn = activeColumn;

    if (!this.sortColumn || this.sortDirection === '') {
      return;
    }
    const sortParam = `${this.sortColumn}${this.sortDirection[0].toUpperCase()}${this.sortDirection.substr(1)}`;
    console.log(sortParam);
    this.devHttpServ.getDevices(page || 1, size || 10, sortParam || null, null, null, searchString || null).pipe(
      map((data: ApiResponseModel) => {
        this.dataSource = data as ApiResponseModel;
      })
    ).subscribe();
  }

  public redirectToDetails = (id: string) => {
    const url = `${this.detailsEndpoint}${id}`;
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
          const deviceId = Number(id);
          const deletableIndex = this.dataSource.data.findIndex(i => i.id === deviceId);
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
