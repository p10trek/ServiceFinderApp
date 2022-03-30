import { Component, OnInit, Provider } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { Profile, ProfileData } from 'src/app/shared/profile.model';
import { ProfileService } from 'src/app/shared/profile.service';
import { Register } from 'src/app/shared/register.model';
@Component({
  selector: 'app-profile-forms',
  templateUrl: './profile-forms.component.html',
  styles: [
  ]
})
export class ProfileFormsComponent implements OnInit {

  profileData : any
  constructor(public service:ProfileService) { }
  profile$:Observable<ProfileData>
  
  ngOnInit(): void {
    this.service.getProfile().subscribe(
      res=>{
        console.log((<any>res).data);
        //console.log('here');
        this.profile$ = of((<any>res).data);
        console.log('user name is: ',(<any>res).data.name);
        this.profileData =
        {
          Name : (<any>res).data.name,
          City :  (<any>res).data.city,
          Description :  (<any>res).data.description,
          Email :  (<any>res).data.email,
          Logo :  (<any>res).data.logo,
          Number : (<any>res).data.number,
          Phone : (<any>res).data.phone,
          PostalCode : (<any>res).data.postalCode,
          Street : (<any>res).data.street,
        }
      },   
       err=>{console.log(err);});
    }
  SaveProfile(form:NgForm){
    console.log('form sending');
    this.service.editProfile(this.profileData).subscribe(response=>
      {
        console.log((<any>response).data);
        console.log('sended');
      })
    
  }
}
