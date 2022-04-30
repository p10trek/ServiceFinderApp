import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ServicesList } from './servicesList.model';
import {Store} from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as UserActions from 'src/app/user.actions'
import { User } from 'src/app/Model/User';


@Injectable({
  providedIn: 'root'
})
export class ServicesServiceList {

  constructor(private http: HttpClient) {

   }
  readonly baseURL = 'https://20.23.253.113/api/GetServices'
  readonly deleteURL = 'https://20.23.253.113/api/DeleteService?Id='

  getServices(){
      return this.http.get(this.baseURL,{headers:new HttpHeaders({
        'accept': 'text/plain',
       'Authorization': `Bearer ${localStorage.getItem("jwt")}`
       
     })});
}
deleteServices(serviceId){
  return this.http.delete(this.deleteURL + serviceId,{headers:new HttpHeaders({
    'accept': 'text/plain',
   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
   
 })});
}
}