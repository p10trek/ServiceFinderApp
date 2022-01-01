export class Profile {
    Login:string='';
    Password:string='';
    OldPassword:string='';
    Name:string='';
    Email:string='';
    Phone:string='';
    Description:string='';
    Logo:string='';
    City:string='';
    Street:string='';
    Number:string='';
    PostalCode:string='';
    IsProvider:boolean=false;
}
export class Service {
    id: string;
    serviceName: string;
    userId: string;
    price: number;
    description: string;
    serviceTypeId: string;
    orders: any[];
}

export class ServiceNavigation {
    id: string;
    typeName: string;
    orders: any[];
}

export class Status {
    id: string;
    status: string;
    orders: any[];
}

export class Order {
    id: string;
    customerId: string;
    providerId: string;
    serviceId: string;
    customerComment: string;
    providerComment: string;
    rate: number;
    startDate: Date;
    endDate: Date;
    statusId: string;
    service: Service;
    serviceNavigation: ServiceNavigation;
    status: Status;
}

export class User {
    id: string;
    login: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    isProvider: boolean;
    orders: Order[];
    providers: any[];
}

export class Service2 {
    id: string;
    serviceName: string;
    userId: string;
    price: number;
    description: string;
    serviceTypeId: string;
    orders: any[];
}

export class ServiceNavigation2 {
    id: string;
    typeName: string;
    orders: any[];
}

export class Status2 {
    id: string;
    status: string;
    orders: any[];
}

export class Order2 {
    id: string;
    customerId: string;
    providerId: string;
    serviceId: string;
    customerComment: string;
    providerComment: string;
    rate: number;
    startDate: Date;
    endDate: Date;
    statusId: string;
    service: Service2;
    serviceNavigation: ServiceNavigation2;
    status: Status2;
}

export class ProfileData {
    id: string;
    email: string;
    phone: string;
    name: string;
    description: string;
    logo: string;
    city: string;
    street: string;
    number: string;
    postalCode: string;
    userId: string;
    user: User;
    orders: Order2[];
}


