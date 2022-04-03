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
  selector: 'app-passwordReset-forms',
  templateUrl: './passwordReset-forms.component.html',
  styles: [
  ]
})
export class passwordResetFormsComponent implements OnInit {
CodeVerifydata : any;
invalidLogin: boolean;
isNotSended:boolean = true;
isSended:boolean = false;
user$ : Observable<User>;
isProvider : boolean
userName : string;
logged_user : User;
providerId : string;
invalidCode : boolean;

  constructor(private router: Router, public service:LoginService, private store: Store<AppState>) {
  this.user$ = store.select('user');
    //this.userName$ = store.select('userName');
  }
  ngOnInit(): void {
    
  }
  passwordReset(form: NgForm) {
      this.userName = form.value.userName;
      this.service.sendCode(form.value.userName).subscribe(
      response => {
        this.isNotSended = false;
        this.isSended = true;
    }, err => {
      console.log('Error while sending sms')
    });
  }
  verifyCode(form: NgForm){
    this.CodeVerifydata=
        {
          userName: this.userName,
          password: form.value.password,
          SmsCode: form.value.smsCode
        }
    this.service.verifyCode(this.CodeVerifydata).subscribe(
      response=>
      {
        if(response)
        {
          console.log('Password changed')
          this.invalidCode = false;
          this.router.navigate(['/home']);
        }
        else
        {
          this.invalidCode = true;
        }

      }, err => {
        console.log('Error while code checking')
        this.invalidCode = true;
      });
  
    }
  
}
