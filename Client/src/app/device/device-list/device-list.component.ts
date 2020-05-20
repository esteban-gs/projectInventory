import { Component, OnInit } from '@angular/core';
import { DeviceService } from './../../shared/device.service';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceModel } from './../../_interface/device-model';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
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

  constructor(private repoService: DeviceService) { }

  ngOnInit() {
    this.getAllOwners();
  }
  public getAllOwners = () => {
    this.repoService.getData('api/devices')
      .subscribe(res => {
        this.dataSource.data = res as DeviceModel[];
        console.log(this.dataSource.data);
      });
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }


}
