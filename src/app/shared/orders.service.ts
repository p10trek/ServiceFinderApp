import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  reqHeaders = new HttpHeaders({
    'accept': 'text/json',
 });

  constructor(private http : HttpClient) {}
  readonly baseURL = 'https://localhost:44309/GetProviderOrders'

  getProviderOrders(providerId:string){
      let queryParams = new HttpParams();
      queryParams = queryParams.append("providerId",providerId);
      return this.http.get(this.baseURL,{headers:this.reqHeaders, params:queryParams});
  }
}
