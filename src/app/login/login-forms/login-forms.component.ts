import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/shared/login.service';
interface AppState{
  isLogged: boolean;
}
@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styles: [
  ]
})
export class LoginFormsComponent implements OnInit {
invalidLogin: boolean;
  constructor(private router: Router, public service:LoginService) { }
  ngOnInit(): void {
  }
  login(form: NgForm) {
    this.service.postLogin().subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);

      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
