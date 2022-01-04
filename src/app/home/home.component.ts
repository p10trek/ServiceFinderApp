import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('content') content: any;
  latitude = 51.1915270197085;
  longitude = 15.2995830197085;
  constructor(private router: Router, private jwtHelper: JwtHelperService,config: NgbModalConfig, private modalService: NgbModal) {     
  config.backdrop = 'static';
  config.keyboard = false;
}
  map : google.maps.Map
  marker : google.maps.Marker
  public onMapReady(e) {
    this.map = e;
    this.marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      title: "Click to zoom",
    });

  this.marker.addListener("click", () => {
    console.log('dziala');
    this.modalService.open(this.content);

  });
}

  isUserAuthenticated(){
    const token: string = localStorage.getItem("jwt")!;
    if(token){
      return true;
    }
    else{
      return false;
    }
  }
  logOut(){
    localStorage.removeItem("jwt")
  }
  ngOnInit(): void {
  }
}
const myLatlng = { lat: 51.1915270197080, lng: 15.2995830197045 };
