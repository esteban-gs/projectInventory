import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceBreakpointObserverService {
  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) { }

  public isHandSet(): Observable<boolean> {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    return this.isHandset$;
  }
}
