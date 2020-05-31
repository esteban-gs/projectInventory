import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CategoryForList } from 'src/app/_interface/category-for-list';
import { CategoryHttpServiceService } from '../category-http-service.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  public displayedColumns = ['id', 'name', 'details', 'delete' ];
  public dataSource = new MatTableDataSource<CategoryForList>();

  constructor(
    private categoryHttpServ: CategoryHttpServiceService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories = () => {
    this.categoryHttpServ.getData('api/categories')
      .subscribe(res => {
        this.dataSource.data = res as CategoryForList[];
      });
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
