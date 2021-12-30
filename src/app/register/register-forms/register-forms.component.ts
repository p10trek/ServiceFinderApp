import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/shared/register.service';
@Component({
  selector: 'app-register-forms',
  templateUrl: './register-forms.component.html',
  styles: [
  ]
})
export class RegisterFormsComponent implements OnInit {

  constructor(public service:RegisterService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.putProvider().subscribe(
      res=>{

      },
    err=>{console.log(err);});
  }

}
