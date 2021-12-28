import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { ProvidersComponent } from './providers/providers.component';
import { ServicesListComponent } from './servicesList/servicesList.component';
import { ServicesListFormsComponent } from './servicesList/servicesList-forms/servicesList-forms.component';
import { ProviderFormsComponent } from './providers/provider-forms/provider-forms.component';
import { RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientsFormsComponent } from './clients/clients-forms/clients-forms.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersFormsComponent } from './orders/orders-forms/orders-forms.component';
import { ServicesComponent } from './services/services.component';
import { ServicesFormsComponent } from './services/services-forms/services-forms.component';
import { LoginComponent } from './login/login.component';
import { LoginFormsComponent } from './login/login-forms/login-forms.component';
import {JwtModule} from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HomeFormComponent } from './home/home-form/home-form.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { MenuComponent } from './menu/menu.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import {StoreModule} from '@ngrx/store';
import { User } from 'src/app/Model/User';
import { simpleReducer } from './simple.reducer';
import { StringReducer } from './string.reducer';
import { userReducer } from './user.reducer';
import { ServicesServiceList } from './shared/servicesList.service';
export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    ProvidersComponent,
    ProviderFormsComponent,
    ClientsComponent,
    ClientsFormsComponent,
    OrdersComponent,
    OrdersFormsComponent,
    ServicesComponent,
    ServicesFormsComponent,
    ServicesListComponent,
    ServicesListFormsComponent,
    LoginComponent,
    LoginFormsComponent,
    HomeComponent,
    HomeFormComponent,
    MenuComponent,
    MenuFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({userName:StringReducer,user:userReducer}
    ),
    RouterModule.forRoot([
      {path: 'providers', component: ProvidersComponent, canActivate:[AuthGuardService]},
      {path: 'clients', component: ClientsComponent},
      {path: 'services', component: ServicesComponent},
      {path: 'login', component: LoginComponent},
      {path: 'servicesList', component: ServicesListComponent},
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains:["localhost:5001"],
        disallowedRoutes:[]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


