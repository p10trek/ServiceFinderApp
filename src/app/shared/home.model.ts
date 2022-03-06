export class Datum {
     id: string;
     email: string;
     phone: string;
     name: string;
     description: string;
     city: string;
     street: string;
     number: string;
     postalCode: string;
     lat: number;
     lng: number;
}

export class GetProvidersView {
     data: Datum[];
     success: boolean;
     message: string;
}

export class GetProviderServices {
     data: Daum[]
     success: boolean
     message: string
}
  
export class Daum {
     id: string
     serviceName: string
     providerId: string
     price: number
     duration : number
     description: string
     isPriced: boolean
}