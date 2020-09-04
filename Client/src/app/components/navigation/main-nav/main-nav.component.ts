import { Component, OnInit } from '@angular/core';
import { DeviceBreakpointObserverService } from '../../../shared/device-breakpoint-observer.service';


class Nav {
  link: string;
  page: string;
  tooltipPos: string;
  icon: string;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {
  appTitle: string;
  isHs: any;
  isExpanded = true;
  navItems: Nav[] = [
    { link: `/home`, page: `Home`, tooltipPos: `right`, icon: `home` },
    { link: `/devices/list`, page: `Devices`, tooltipPos: `right`, icon: `laptop_mac` },
    { link: `/categories/list`, page: `Categories`, tooltipPos: `right`, icon: `device_hub` },
    { link: `/makers/list`, page: `Makers`, tooltipPos: `right`, icon: `home_work` },
    { link: `/employees/list`, page: `Employees`, tooltipPos: `right`, icon: `person` },
  ];

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

  expand() {
    this.isExpanded = true;
  }

  contract() {
    this.isExpanded = false;
  }
}
