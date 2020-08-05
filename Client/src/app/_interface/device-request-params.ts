import { SortDirection } from '@angular/material';

export class DeviceRequestParams {
    // Pagination
    pageIndex = 1;
    recordsPerPage = 10;
    searchString: string = null;
    categoryId: string = null;
    makerId: string = null;
    sortDirection: SortDirection = 'asc';
    sortColumn: string = null;

    get sortString(): string {
        if (this.sortColumn && this.sortDirection !== '') {
            return `${this.sortColumn}${this.sortDirection[0].toUpperCase()}${this.sortDirection.substr(1)}`;
        } else {
            return null;
        }
    }
}
