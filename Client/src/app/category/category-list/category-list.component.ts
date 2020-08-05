import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { CategoryForList } from 'src/app/_interface/category-for-list';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { DeleteService } from 'src/app/shared/delete.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, AfterViewInit {
  // endpoints
  apiEndpoint = `api/categories/`;
  listEndpoint = `categories/list/`;
  detailsEndpoint = `categories/details/`;

  // dialog cofigs
  private dialogConfig;
  confirmDelete: boolean;

  public displayedColumns = ['id', 'name', 'details', 'delete'];
  public dataSource = new MatTableDataSource<CategoryForList>();

  @ViewChild(MatSort, null) sort: MatSort;

  constructor(
    private repoServ: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private actionsServ: DeleteService,
  ) { }

  ngOnInit() {
    this.getCategories();

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

  public getCategories = () => {
    this.repoServ.getData(`${this.apiEndpoint}`)
      .subscribe(res => {
        this.dataSource.data = res as CategoryForList[];
        console.table(this.dataSource.data);
      });
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
          const categoryId = Number(id);
          const deletableIndex = this.dataSource.data.findIndex(i => i.id === categoryId);
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
