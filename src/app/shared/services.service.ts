import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Services} from './services.model'
import {Store} from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as UserActions from 'src/app/user.actions'
import { User } from 'src/app/Model/User';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  reqHeaders = new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${localStorage.getItem("jwt")}`
   
 });
  constructor(private http: HttpClient) {

   }
  readonly baseURL = 'https://localhost:44309/CreateService'
  formData:Services =new Services();
  putService(){
      return this.http.put(this.baseURL,this.formData,{headers:this.reqHeaders});
}
}