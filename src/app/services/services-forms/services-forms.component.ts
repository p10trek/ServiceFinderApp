import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-services-forms',
  templateUrl: './services-forms.component.html',
  styles: [
  ]
})
export class ServicesFormsComponent implements OnInit {

  constructor(private router: Router,public service:ServicesService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.putService().subscribe(
      res=>{
       console.log((<any>res).Message)
       form.resetForm();
       this.router.navigate(['/servicesList']);
       
      },
    err=>{console.log(err);});

}}



