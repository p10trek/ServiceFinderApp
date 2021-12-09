import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ClientsService } from 'src/app/shared/clients.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-clients-forms',
  templateUrl: './clients-forms.component.html',
  styles: [
  ]
})
export class ClientsFormsComponent implements OnInit {

  constructor(public service:ClientsService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.service.putClient().subscribe(
      res=>{

      },
    err=>{console.log(err);});
  }

}
