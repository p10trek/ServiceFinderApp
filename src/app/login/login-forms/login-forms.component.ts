import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store} from '@ngrx/store'
import { LoginService } from 'src/app/shared/login.service';
import * as StringActions from 'src/app/string.actions';
import { Observable } from 'rxjs';
import { User } from 'src/app/Model/User';
import * as UserActions from 'src/app/user.actions'

interface AppState{
 // isLogged:boolean,
  //userName:string, 
  user:User
}

@Component({
  selector: 'app-login-forms',
  templateUrl: './login-forms.component.html',
  styles: [
  ]
})
export class LoginFormsComponent implements OnInit {
invalidLogin: boolean;
user$ : Observable<User>;
isProvider : boolean
userName : string;
logged_user : User;
  constructor(private router: Router, public service:LoginService, private store: Store<AppState>) {
  this.user$ = store.select('user');
    //this.userName$ = store.select('userName');
  }
  ngOnInit(): void {
    
  }
  login(form: NgForm) {
      this.service.postLogin().subscribe(response => {
      const token = (<any>response).token;
      console.log(token);
      this.userName = (<any>response).login;
      this.isProvider =(<any>response).isProvider;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
      this.logged_user = {isLogged : true, userName : this.userName, isProvider : this.isProvider}
      //this.store.dispatch(new StringActions.setName(this.userName));
      this.store.dispatch(new UserActions.isLogged(this.logged_user));
      //this.user$ = this.store.select('loggedUser')
      //this.store.dispatch(new UserActions.userName(userName));
    }, err => {
      this.invalidLogin = true;
    });
  }
}
