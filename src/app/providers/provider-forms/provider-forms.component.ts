import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProviderService } from 'src/app/shared/provider.service';
@Component({
  selector: 'app-provider-forms',
  templateUrl: './provider-forms.component.html',
  styles: [
  ]
})
export class ProviderFormsComponent implements OnInit {

  constructor(public service:ProviderService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.putProvider().subscribe(
      res=>{

      },
    err=>{console.log(err);});
  }

}
