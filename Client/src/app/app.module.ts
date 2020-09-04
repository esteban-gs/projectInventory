import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DeviceModule } from './components/device/device.module';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './components/category/category.module';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { DeviceBreakpointObserverService } from './shared/device-breakpoint-observer.service';
import { MakerModule } from './components/maker/maker.module';
import { EmployeeModule } from './components/employee/employee.module';
import { LayoutModule } from '@angular/cdk/layout';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MainNavComponent,
    LogInComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    DeviceModule,
    CategoryModule,
    MakerModule,
    EmployeeModule,
    LayoutModule
  ],
  providers: [DeviceBreakpointObserverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
