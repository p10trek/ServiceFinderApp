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
import { User } from 'src/app/Model/User';
import { createIsExtensionOrMonitorPresent } from '@ngrx/store-devtools/src/instrument';
interface CartState{
  // isLogged:boolean,
   //userName:string, 

   cart:Carton
 }
 interface AppState{
  user:User
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
  constructor(@Inject(DOCUMENT) document,private store: Store<CartState>, private Userstore:Store<AppState>,private router: Router, private jwtHelper: JwtHelperService,config: NgbModalConfig, private modalService: NgbModal,public service:HomeService) { 
  config.backdrop = 'static';
  config.keyboard = false;
  this.cart$ = this.store.select('cart')
  this.user$ = this.Userstore.select('user');
}

getProvidersView : Datum[]
getProviderServices : Daum[]
map : google.maps.Map;
choosedMarker : string;
isChecked:boolean;
cart$ : Observable<Carton>
user$ : Observable<User>;
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
        var isProvider;
        this.user$.subscribe(u=>isProvider = u.isProvider);
        if(isProvider==true)
        {
          var providerId;
          this.user$.subscribe(u=>providerId = u.providerID)
          this.getProvidersView = this.getProvidersView.filter(t=>t.id==providerId)
        }
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
            this.modalService.open(this.content,{ size: 'lg', backdrop: 'static' });
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

  closeModal1(e){
    this.foo2();
    document.getElementById('closeModalButton1')!.click();
  }
  closeModal2(e){
    this.foo2();
    document.getElementById('closeModalButton1')!.click();
    document.getElementById('closeModalButton2')!.click();
    //todo backup
  }
foo2(){
  console.log('Zamykam modal');
  this.store.dispatch(new CartActions.resetCart());
}
  addToCart(e,itemId:string,duration:number){
    const cartItem : CartItem = {
       cartItem : itemId,
       duration : duration,
    };
    if(e.target.checked)
    this.store.dispatch(new CartActions.addToCart(cartItem))
    else
    this.store.dispatch(new CartActions.delFromCart(cartItem))
  }  
}
