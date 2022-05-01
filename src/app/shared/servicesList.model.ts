export class ServicesList{
    data: Daum[]
    success: boolean
    message: string
  }
  
  export class Daum {
    id : string
    serviceName: string
    price: number
    description: string
    serviceType: string
    duration : number
  }
  