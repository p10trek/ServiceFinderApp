import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/register.service';
@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  styles: [
  ]
})

export class RegisterFormsComponent implements OnInit {
isChecked : boolean = false
isAlertVisible: boolean = false;
  constructor(private router: Router,public service:RegisterService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.putProvider().subscribe(
      res=>{

        if((<any>res).success){
          this.isAlertVisible = false;
          this.router.navigate(['/login']);
        }
        else{
          this.isAlertVisible = true;
        }

        form.resetForm();
      },
    err=>{console.log(err);});
   
  }
  
  checking(e){
    if(this.isChecked){
      this.isChecked=false;
    }
    else{
      this.isChecked=true;
    }
  }
  saveProfile(e){
    this.router.navigate(['/login']);
  }

}
