import { Injectable } from '@angular/core';
import {Clients} from './clients.model'
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44309/CreateCustomer'
  formData:Clients =new Clients();
  putClient(){
      return this.http.put(this.baseURL,this.formData);
  }
}
