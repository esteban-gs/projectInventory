import { Component, OnInit } from '@angular/core';
import { MakerForList } from 'src/app/_interface/maker-for-list';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/http.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-maker-details',
  templateUrl: './maker-details.component.html',
  styleUrls: ['./maker-details.component.scss']
})
export class MakerDetailsComponent implements OnInit {
  public makerForDetails: MakerForList;
  edited = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private repo: HttpService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.getMakerDetails();
  }

  private getMakerDetails = () => {
    const id = this.activeRoute.snapshot.params.id;
    const apiUrl = `api/makers/${id}`;
    console.log(apiUrl);
    this.repo.getData(apiUrl)
      .subscribe(res => {
        this.makerForDetails = res as MakerForList;
        console.log(`cat from component: ${JSON.stringify(this.makerForDetails)}`);
      },
        (error) => {
          console.log(JSON.stringify(error));
          this.errorHandler.handleError(error);
        });
  }

  public onEditedMaker(edited: boolean) {
    edited ? this.getMakerDetails() : console.log('Not Eited');
  }

}
