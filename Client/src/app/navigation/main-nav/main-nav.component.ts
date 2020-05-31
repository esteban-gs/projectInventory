import { Component, OnInit } from '@angular/core';
import { DeviceBreakpointObserverService } from '../../shared/device-breakpoint-observer.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  appTitle: string;
  isHs: any;

  constructor(
    private deviceBreakpointService: DeviceBreakpointObserverService,
    ) {
  }

  ngOnInit() {
    this.deviceBreakpointService.isHandSet().subscribe(
      x => {
        this.isHs = x;
      },
      err => console.log(err)
    );
  }
}
