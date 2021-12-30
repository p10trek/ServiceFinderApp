import { Injectable } from '@angular/core';
import {Register} from './register.model'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../Model/User';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
   reqHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    
  });
  user$ : Observable<User>;
  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44309/CreateProvider'
  formData:Register =new Register();
  putProvider(){
      return this.http.put(this.baseURL,this.formData,{headers:this.reqHeaders});
  }
}
