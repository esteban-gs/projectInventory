import { Component, OnInit } from '@angular/core';
import { EmployeeForCreate } from 'src/app/_interface/employee-for-create';
import { HttpService } from 'src/app/shared/http.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { EmployeeForList } from 'src/app/_interface/employee-for-list';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public employeeForDetails: EmployeeForList;
  edited = false;
  apiEndpoint = `api/employees/`;

  constructor(
    private repository: HttpService,
    private activeRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.getEntityDetails();
  }

  private getEntityDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
    const apiUrl = `${this.apiEndpoint}${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.employeeForDetails = res as EmployeeForList;
        // console.log(this.deviceForDetails);
      },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }

  public onEditedEntity(edited: boolean) {
    edited ? this.getEntityDetails() : console.log('Not Eited') ;
  }

}
