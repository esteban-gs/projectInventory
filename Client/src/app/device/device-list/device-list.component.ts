import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DeviceService } from './../../shared/device.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModel } from './../../_interface/device-model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'id',
    'name',
    // 'description',
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
  public dataSource = new MatTableDataSource<DeviceModel>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private repoService: DeviceService) { }

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () => {
    this.repoService.getData('api/devices')
      .subscribe(res => {
        this.dataSource.data = res as DeviceModel[];
        console.log(this.dataSource.data);
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }


}
