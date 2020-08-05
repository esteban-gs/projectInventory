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
import { DeviceRequestParams } from 'src/app/_interface/device-request-params';

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
  requestParams = new DeviceRequestParams();

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
    this.devHttpServ.getDevices(this.requestParams).pipe(
      map((data: ApiResponseModel) => {
        this.dataSource = data as ApiResponseModel;
      })
    ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    this.requestParams.pageIndex = event.pageIndex + 1;
    this.requestParams.recordsPerPage = event.pageSize;

    const noSearchAndNoSort = this.requestParams.searchString == null && this.requestParams.sortColumn == null;
    const hasSearchAndNoSort = this.requestParams.searchString != null && this.requestParams.sortColumn == null;
    const noSearchAndHasSort = this.requestParams.searchString == null && this.requestParams.sortColumn != null;
    const hasSearchAndHasSort = this.requestParams.searchString != null && this.requestParams.sortColumn != null;

    if (noSearchAndNoSort) {
      this.devHttpServ.getDevices(this.requestParams).pipe(
        map((data: ApiResponseModel) => this.dataSource = data)
      ).subscribe();
    } else {

      if (hasSearchAndNoSort) {
        this.search();
      }

      if (noSearchAndHasSort || hasSearchAndHasSort) {
        this.sortData(this.requestParams.sortDirection, this.requestParams.sortColumn);
      }
    }
  }

  search() {
    if (this.requestParams.searchString === '') {
      this.requestParams.searchString = null;
    }
    this.devHttpServ.getDevices(this.requestParams).pipe(
      map((data: ApiResponseModel) => {
        this.dataSource = data as ApiResponseModel;
      })
    ).subscribe();
  }

  sortData(direction: SortDirection, activeColumn: string) {
    this.requestParams.sortDirection = direction;
    this.requestParams.sortColumn = activeColumn;

    this.devHttpServ.getDevices(this.requestParams).pipe(
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
