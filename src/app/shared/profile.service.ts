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
  readonly GetProviderURL = 'https://localhost:44309/GetProfile'
  readonly EditProviderURL = 'https://localhost:44309/EditProvider'
  formData:Profile =new Profile();

  getProfile(){
      return this.http.get(this.GetProviderURL,{headers:this.reqHeaders});
  }
  editProfile(profileData : Profile){
      const params = JSON.stringify(profileData);
      return this.http.post(this.EditProviderURL, params, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
});}}
