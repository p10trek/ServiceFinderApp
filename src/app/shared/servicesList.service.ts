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
  reqHeaders = new HttpHeaders({
    'accept': 'text/plain',
   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
   
 });
  constructor(private http: HttpClient) {

   }
  readonly baseURL = 'https://localhost:44309/GetServices'

  getServices(){
      return this.http.get(this.baseURL,{headers:this.reqHeaders});
}
}