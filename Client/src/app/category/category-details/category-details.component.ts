import { Component, OnInit } from '@angular/core';
import { DeleteService } from 'src/app/shared/delete.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryForList } from 'src/app/_interface/category-for-list';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  public categoryForDetails: CategoryForList;
  constructor(
    private actionsServ: DeleteService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private repo: HttpService
  ) { }

  ngOnInit() {
    this.getCategoryDetails();

  }

  private getCategoryDetails = () => {
    const id = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/categories/${id}`;
    console.log(apiUrl);
    this.repo.getData(apiUrl)
      .subscribe(res => {
        this.categoryForDetails = res as CategoryForList;
        console.log(`cat from component: ${JSON.stringify(this.categoryForDetails)}`);
      });
  }

}
