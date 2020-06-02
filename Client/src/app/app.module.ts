import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceModule } from './device/device.module';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { MainNavComponent } from './navigation/main-nav/main-nav.component';
import { DeviceBreakpointObserverService } from './shared/device-breakpoint-observer.service';
import { MakerModule } from './maker/maker.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    DeviceModule,
    CategoryModule,
    MakerModule
  ],
  providers: [DeviceBreakpointObserverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
