import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from 'src/app/user.actions'
import { User } from 'src/app/Model/User';
import { Carton } from './Model/Carton';

interface AppState{
 // isLogged:boolean,
  //userName:string, 
  user:User
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  export class AppComponent {
    title = 'ServiceFinderApp';
    user$ : Observable<User>;
    //userName$ : Observable<string>;
    logged_out_user: User

  constructor(private store: Store<AppState>){
  localStorage.removeItem("jwt");
  console.log('app.component constructor');
  this.user$ = this.store.select('user')
  //this.userName$ = this.store.select('userName')
  //this.logged_user = {isLogged : true, userName : 'Heniek'}
  //this.store.dispatch(new UserActions.isLogged(this.logged_user));
  //this.asdfd = false;
  }
  logout(){
    this.logged_out_user = {isLogged : false, userName : 'Guest', isProvider : false}
    this.store.dispatch(new UserActions.logout(this.logged_out_user))
    localStorage.removeItem("jwt");
    }
  }