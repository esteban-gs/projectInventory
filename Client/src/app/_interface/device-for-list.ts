export interface DeviceForList {
    id: number;
    name: string;
    description: string;
    purchased: Date;
    value: number;
    productId: string;
    category: string;
    maker: string;
    employeesAssigned: number;
}

export interface ApiResponseModel {
    page: number;
    recordsPerPage: number;
    count: number;
    data: DeviceForList[];
}
