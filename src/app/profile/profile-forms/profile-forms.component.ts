import { Component, OnInit, Provider } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/shared/profile.service';
import { Register } from 'src/app/shared/register.model';
@Component({
  selector: 'app-profile-forms',
  templateUrl: './profile-forms.component.html',
  styles: [
  ]
})
export class ProfileFormsComponent implements OnInit {
provider:Register
  constructor(public service:ProfileService) { }

  ngOnInit(): void {
    this.service.getProfile().subscribe(
      res=>{
        //console.log((<any>res).data);
        console.log('here');
        //this.provider = (<any>res).data;
      },   
       err=>{console.log(err);});
    }
  onSubmit(form:NgForm){
  }
}
