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
  readonly getProvURL = 'https://localhost:44309/GetProviderOrders'
  readonly getFreeTermsURL = 'https://localhost:44309/GetFreeTerms'

  getProviderOrders(providerId:string){
      let queryParams = new HttpParams();
      queryParams = queryParams.append("providerId",providerId);
      return this.http.get(this.getProvURL,{headers:this.reqHeaders, params:queryParams});
  }

  getFreeTerms(providerId:string,servDuration:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("providerId",providerId);
    queryParams = queryParams.append("serviceDuration",servDuration);
    return this.http.get(this.getFreeTermsURL,{headers:this.reqHeaders, params:queryParams});
  }
}
