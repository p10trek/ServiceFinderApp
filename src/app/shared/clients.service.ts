import { Injectable } from '@angular/core';
import {Clients} from './clients.model'
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://20.23.253.113/api/CreateCustomer'
  formData:Clients =new Clients();
  putClient(){
      return this.http.put(this.baseURL,this.formData);
  }
}
