import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Orders, orders } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
   reqHeaders = new HttpHeaders({
    'accept': 'text/json',
 });

  constructor(private http : HttpClient) {}
  readonly getProvURL = 'https://20.23.253.113/api/GetProviderOrders'
  readonly getFreeTermsURL = 'https://20.23.253.113/api/GetFreeTerms'
  readonly putOrderURL = 'https://20.23.253.113/api/CreateOrder'
  readonly deleteOrderURL = 'https://20.23.253.113/api/DeleteOrder'
  readonly MoveOrderURL = 'https://20.23.253.113/api/MoveOrder'

  getProviderOrders(providerId:string){
      let queryParams = new HttpParams();
      queryParams = queryParams.append("providerId",providerId);
      return this.http.get(this.getProvURL,{headers:this.reqHeaders, params:queryParams});
  }

    getFreeTerms(providerId:string,servDuration:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("providerId",providerId);
    queryParams = queryParams.append("serviceDuration",servDuration);
    const t =  this.http.get(this.getFreeTermsURL,{headers:this.reqHeaders, params:queryParams});
    return t
  }

  putOrder(order:Order){
    var result =  this.http.put(this.putOrderURL,order,{headers:new HttpHeaders({
      'accept': 'text/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    })})
    return result;
  }
  deleteOrder(orderId:string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("OrderId",orderId);
    return this.http.delete(this.deleteOrderURL,{headers:this.reqHeaders, params: queryParams})
  }
  moveOrder(orderId:string, newDate : string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("orderId",orderId);
    queryParams = queryParams.append("newDate",newDate);

    return this.http.get(this.MoveOrderURL,{headers:this.reqHeaders, params: queryParams})
  }
  sendSms(userName:string,message:string){
    var url = "https://20.23.253.113/api/SendSms?userName=" + userName + "&message=" + message
    return this.http.get(url)
  }
}
