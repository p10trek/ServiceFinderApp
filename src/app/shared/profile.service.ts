import { Injectable } from '@angular/core';
import {Register} from './register.model'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { Profile } from './profile.model';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   reqHeaders = new HttpHeaders({
    'accept': 'text/plain',
    'Authorization': `Bearer ${localStorage.getItem("jwt")}` 
  });
  user$ : Observable<User>;
  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44309/GetProfile'
  formData:Profile =new Profile();
  getProfile(){
      return this.http.get(this.baseURL,{headers:this.reqHeaders});
  }
}
