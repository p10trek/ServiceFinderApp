import { Injectable } from '@angular/core';
import {Provider} from './provider.model'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../Model/User';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
   reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    
  });
  user$ : Observable<User>;
  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44309/CreateProvider'
  formData:Provider =new Provider();
  putProvider(){
      return this.http.put(this.baseURL,this.formData,{headers:this.reqHeaders});
  }
}
