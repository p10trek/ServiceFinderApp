import { Injectable } from '@angular/core';
import { Register } from './register.model'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { Profile } from './profile.model';
import { Store } from '@ngrx/store';
interface AppState {
  // isLogged:boolean,
  //userName:string, 
  user: User
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  user$: Observable<User>;
  constructor(private http: HttpClient, private store: Store<AppState>) { }
  readonly GetProviderURL = 'https://20.23.253.113/api/GetProfile'
  readonly EditProviderURL = 'https://20.23.253.113/api/EditProvider'
  readonly EditUserURL = 'https://20.23.253.113/api/EditUser'
  formData: Profile = new Profile();

  getProfile() {
    return this.http.get(this.GetProviderURL, {
      headers: new HttpHeaders({
        'accept': 'text/plain',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      })
    });
  }
  editProfile(profileData: Profile) {
    this.user$ = this.store.select('user')
    const params = JSON.stringify(profileData);
    var isProvider = false;
    this.user$.subscribe(u => isProvider = u.isProvider);
    if (isProvider == false) {
      return this.http.post(this.EditUserURL, params, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        })
      }
      );
    }
    else {
      return this.http.post(this.EditProviderURL, params, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        })
      }
      );
    }
  }
}
