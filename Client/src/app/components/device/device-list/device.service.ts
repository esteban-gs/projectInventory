import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponseModel } from 'src/app/_interface/device-for-list';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeviceRequestParams } from 'src/app/_interface/device-request-params';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient) { }
  style = 'font-size: 20px; font-weight: bold';

  public getDevices(deviceReq: DeviceRequestParams):
    Observable<ApiResponseModel> {
    let params = new HttpParams()
      .append('page', deviceReq.pageIndex.toString())
      .append('recordsPerPage', deviceReq.recordsPerPage.toString());

    if (deviceReq.sortString != null) { params = params.append('sort', deviceReq.sortString); }
    if (deviceReq.categoryId != null) { params = params.append('categoryId', deviceReq.categoryId); }
    if (deviceReq.makerId != null) { params = params.append('makerId', deviceReq.makerId); }
    if (deviceReq.searchString != null) { params = params.append('search', deviceReq.searchString); }

    this.header('RequestParams');
    console.table(deviceReq);
    console.log(`${params}`);

    return this.http.get<ApiResponseModel>(`${environment.appUrl}/api/devices`, { params }).pipe(
      map((data: ApiResponseModel) => data),
      tap((data: ApiResponseModel) => {
        this.header('Payload');
        console.table(data.data);
        this.footer('Payload');
        //////////////////////
        this.header('Metadata');
        console.table({ count: data.count, recordsPerPage: data.recordsPerPage, page: data.page });
        this.footer('Metadata');
      }),
      catchError(error => throwError(error))
    );
  }

  header(header: string): void {
    console.log(`%cv----${header}----v`, this.style);
  }

  footer(footer: string): void {
    console.log(`%c^----${footer}----^`, this.style);
  }
}
