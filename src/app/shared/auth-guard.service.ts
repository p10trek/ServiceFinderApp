import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private jwtHelper: JwtHelperService) 
  { }
  isActive: boolean;
  canActivate(){
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      this.isActive = true;
      return true;
    }
    this.router.navigate(["login"]);
    this.isActive = false;
    return false;
  }
}
