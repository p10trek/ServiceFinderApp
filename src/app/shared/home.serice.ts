import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { GetProvidersView } from './home.model';
import {Store} from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as UserActions from 'src/app/user.actions'
import { User } from 'src/app/Model/User';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  reqHeaders = new HttpHeaders({
    'accept': 'text/plain',
   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
 });
  constructor(private http: HttpClient) {

   }
  readonly baseURL = 'https://20.23.253.113/api/GetProviders'
  readonly getProvidersURL = 'https://20.23.253.113/api/GetProviderServices'
 getProviders(){
      return this.http.get(this.baseURL,{headers:this.reqHeaders});
}
getProviderServices(providerId:string ){
  let queryParams = new HttpParams();
  queryParams = queryParams.append("ProviderId",providerId);
  return this.http.get(this.getProvidersURL,{headers:this.reqHeaders, params:queryParams});
}
}