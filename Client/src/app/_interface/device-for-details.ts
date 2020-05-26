export interface DeviceForDetails {

    id: number;
    name: string;
    description: string;
    purchased: Date;
    value: number;
    productId: string;
    category: string;
    maker: string;
    employeeDevicesList: EmployeeDevicesList[];
}

export interface EmployeeDevicesList {
    employeeId: number;
    employee: string;
    checkOutDate: Date;
    checkInDate: Date;
}




