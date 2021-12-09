import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';


interface AppState{
  isLogged:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ServiceFinderApp';
  isLogged$: Observable<boolean>
constructor(private store: Store<AppState>){
  //this.isLogged$= this.store.select('isLogged')
}
}
