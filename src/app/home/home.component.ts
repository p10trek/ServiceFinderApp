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

  i : number = 0;
  public onMapReady(e) {
    var mark = []
    this.map = e;
    const markers = [
      {
        position: new google.maps.LatLng(40.73061, 73.935242),
        map: this.map,
        title: "Marker 1"
      },
      {
        position: new google.maps.LatLng(32.06485, 34.763226),
        map: this.map,
        title: "Marker 2"
      }
    ];
    markers.forEach(markerInfo => {
      var marker = new google.maps.Marker({
        position: markerInfo.position,
        map: markerInfo.map,
        title: markerInfo.title,
      });
      marker.addListener("click", () => {
        this.modalService.open(this.content);
        console.log('Marker klikniety');
        console.log(markerInfo.title);
      });
  });}

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
const myLatlng =[ { lat: 58.1915270197080, lng: 15.2995830197045, title: 'jeden' },{ lat: 57.1915270197080, lng: 15.2995830197045,title: 'dwa'  },{ lat: 57.1915270197080, lng: 19.2995830197045,title: 'trzy'  }];
