import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-services-forms',
  templateUrl: './services-forms.component.html',
  styles: [
  ]
})
export class ServicesFormsComponent implements OnInit {

  constructor(public service:ServicesService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.putService().subscribe(
      res=>{

      },
    err=>{console.log(err);});

}}
