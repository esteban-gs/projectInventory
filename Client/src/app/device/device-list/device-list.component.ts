import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DeviceService } from './../../shared/device.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceForList } from '../../_interface/device-for-list';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';
import { ActionsService } from '../actions.service';

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
  private dialogConfig;

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
    'update',
    'delete'
  ];
  public dataSource = new MatTableDataSource<DeviceForList>();

  expandedElement: DeviceForList | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private repoService: DeviceService,
    private errorService: ErrorHandlerService,
    private router: Router,
    private actionsServ: ActionsService
  ) { }

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () => {
    this.repoService.getData('api/devices?recordsPerPage=50&page=1')
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
    const url = `/device/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {

  }

  public delete = (id: string) => {
    this.actionsServ.delete(id, this.dialogConfig);
  }


}
