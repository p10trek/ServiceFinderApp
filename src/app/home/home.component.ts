import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Carton,CartItem } from '../Model/Carton';
import { GetProvidersView,Datum, Daum} from '../shared/home.model';
import { HomeService } from '../shared/home.serice';
import * as CartActions from 'src/app/cart.actions'
import { DOCUMENT } from '@angular/common';
interface CartState{
  // isLogged:boolean,
   //userName:string, 

   cart:Carton
 }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild('timeTable') timeTable: any;
  latitude = 51.1915270197085;
  longitude = 15.2995830197085;
  remButton: HTMLElement;
  constructor(@Inject(DOCUMENT) document,private store: Store<CartState>,private router: Router, private jwtHelper: JwtHelperService,config: NgbModalConfig, private modalService: NgbModal,public service:HomeService) {     
  config.backdrop = 'static';
  config.keyboard = false;
  this.cart$ = this.store.select('cart')
}

getProvidersView : Datum[]
getProviderServices : Daum[]
cartItem : CartItem;
map : google.maps.Map;
choosedMarker : string;
isChecked:boolean;
cart$ : Observable<Carton>
  public onMapReady(e) {
    this.map = e;
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
  ngOnInit(){
    (this.service.getProviders()).subscribe(
      res=>{
        this.getProvidersView =(<any>res).data;
        console.log((<any>res).message)
        this.getProvidersView.forEach(provider=>{
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(provider.lat, provider.lng),
            map: this.map,
            title: provider.name
          });
            marker.addListener("click", () => {
            (
              this.service.getProviderServices(provider.id)).subscribe(res=>{
              this.getProviderServices = (<any>res).data
              this.store.dispatch(new CartActions.setProvider(provider.id))
              console.log((<any>res).Messaage)
            })
            this.modalService.open(this.content);
            console.log('Marker klikniety');
            console.log(provider.name);
          }); 
        });
      },
    err=>{console.log(err);});

  }
  openTimeTable(e){
      console.log('otwieram termianrz!!!:');
      this.modalService.open(this.timeTable, { size: 'lg', backdrop: 'static' });
      
  }

  closeModals(e){
    //todo backup
  }

  addToCart(e,itemId:string,duration:number){
    this.cartItem.cartItem = itemId;
    this.cartItem.duration = duration;
    if(e.target.checked)
    this.store.dispatch(new CartActions.addToCart(this.cartItem))
    else
    this.store.dispatch(new CartActions.delFromCart(this.cartItem))
  }  
}
