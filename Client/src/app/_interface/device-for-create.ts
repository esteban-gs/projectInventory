export interface DeviceForCreate {
    name: string;
    description: string;
    purchased: Date;
    value: number;
    productId: string;
    categoryId: number;
    makerId: number;
    employeesIds: number[];
}
