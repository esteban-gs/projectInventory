import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceForList } from '../../_interface/device-for-list';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';
import { DeleteService } from '../../shared/delete.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DeviceForDetails } from 'src/app/_interface/device-for-details';
import { HttpService } from 'src/app/shared/http.service';

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
  listEndpoint = `device/devices/`;
  rootEndpoint = `device/`;
  detailsEndpoint = `device/details/`;

  // dialog cofigs
  private dialogConfig;
  confirmDelete: boolean;

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
  public dataSource = new MatTableDataSource<DeviceForList>();

  expandedElement: DeviceForList | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private errorService: ErrorHandlerService,
    private router: Router,
    private actionsServ: DeleteService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private repoServ: HttpService
  ) { }

  ngOnInit() {
    this.getDevices();

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

  public getDevices = () => {
    this.repoServ.getData(`${this.apiEndpoint}?recordsPerPage=50&page=1`)
      .subscribe(res => {
        this.dataSource.data = res as DeviceForList[];
      },
        (error) => {
          this.errorService.handleError(error);
        });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
