import { Component, OnInit } from '@angular/core';
import { DeviceBreakpointObserverService } from '../../shared/device-breakpoint-observer.service';

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
  navItems: Nav[] = [
    { link: `/`, page: `Home`, tooltipPos: `right`, icon: `home` },
    { link: `/device/devices`, page: `Devices`, tooltipPos: `right`, icon: `laptop_mac` },
    { link: `/category/categories`, page: `Categories`, tooltipPos: `right`, icon: `device_hub` },
    { link: `/maker/makers`, page: `Makers`, tooltipPos: `right`, icon: `home_work` },
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
}
