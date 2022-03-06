import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Daum, ServicesList } from 'src/app/shared/servicesList.model';
import { ServicesServiceList } from 'src/app/shared/servicesList.service';

@Component({
  selector: 'app-servicesList-forms',
  templateUrl: './servicesList-forms.component.html',
  styles: [
  ]
})
export class ServicesListFormsComponent implements OnInit {

  constructor(public service:ServicesServiceList) { }
  servicesList:Daum[]
  ngOnInit(): void {
    this.service.getServices().subscribe(
      res=>{
        this.servicesList = (<any>res).data
       console.log((<any>res).message)
      },
    err=>{console.log(err);});
  }
  onSubmit(form:NgForm){
    this.service.getServices().subscribe(
      res=>{
        this.servicesList = (<any>res).data
       console.log((<any>res).message)
      },
    err=>{console.log(err);});
}}



