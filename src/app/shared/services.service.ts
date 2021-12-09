import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Services} from './services.model'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44309/CreateService'
  formData:Services =new Services();
  putService(){
      return this.http.put(this.baseURL,this.formData);
}
}