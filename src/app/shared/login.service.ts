import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoged: boolean;
  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://localhost:44309/api/auth/login'
  readonly sendSmsURL = 'https://localhost:44309/SendCodeSms?userName='
  readonly VerifySmsURL = 'https://localhost:44309/CodeVerify'
  formData:Login =new Login();
  postLogin(){
    const credentials = JSON.stringify(this.formData);
    return this.http.post(this.baseURL, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  this.isLoged = true;
  }
  sendCode(user:string){
    return this.http.get(this.sendSmsURL+user);
  }
  verifyCode(data:Login){
    const jsonData = JSON.stringify(data);
    return this.http.post(this.VerifySmsURL,jsonData,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
}
