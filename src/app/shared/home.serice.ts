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
  readonly baseURL = 'https://localhost:44309/GetProviders'
  readonly getProvidersURL = 'https://localhost:44309/GetProviderServices'
 getProviders(){
      return this.http.get(this.baseURL,{headers:this.reqHeaders});
}
getProviderServices(providerId:string ){
  let queryParams = new HttpParams();
  queryParams = queryParams.append("ProviderId",providerId);
  return this.http.get(this.getProvidersURL,{headers:this.reqHeaders, params:queryParams});
}
}