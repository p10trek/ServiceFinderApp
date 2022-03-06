export class Datum {
     id: string;
     start: Date;
     end: Date;
     title: string;
     content: string;
     color: string;
}
export class orders {
     data: Datum[];
     success: boolean;
     message: string;
}
export class FreeTermsBetween {
     freeTermStart: Date;
     freeTermEnd: Date;
}

export class FreeTerms {
     freeTermsBetween: FreeTermsBetween[];
     freeTermFrom: Date;
}
export class FreeTermsView {
     data: FreeTerms;
     success: boolean;
     message: string;
}
export class Orders{
     orders:Order[];
}
export class Order  {

     customerId: string;
    providerId: string;
    serviceId: string;
     customerComment: string;
     providerComment: string;
    startDate: Date;
    endDate: Date;

}
