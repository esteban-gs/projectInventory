import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponseModel } from '../../_interface/device-for-list';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient) { }

  public getDevices(
    page = 0,
    recordsPerPage = 10,
    sort = 'idDesc',
    categoryId = null,
    makerId = null,
    search = null):
    Observable<ApiResponseModel> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('recordsPerPage', recordsPerPage.toString());

    if (sort != null) { params = params.append('sort', sort.toString()); }
    if (categoryId != null) { params = params.append('categoryId', categoryId.toString()); }
    if (makerId != null) { params = params.append('makerId', makerId.toString()); }
    if (search != null) { params = params.append('search', search.toString()); }

    return this.http.get<ApiResponseModel>(`${environment.appUrl}/api/devices`, { params }).pipe(
      map((data: ApiResponseModel) => data),
      catchError(error => throwError(error))
    );
  }
}
