import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { OrdersService } from 'src/app/shared/orders.service';
import {
    CalendarSchedulerEvent,
    CalendarSchedulerEventStatus,
    CalendarSchedulerEventAction
} from 'angular-calendar-scheduler';
import { Datum, FreeTermsBetween, FreeTermsView, orders } from 'src/app/shared/orders.model';
import {
    addDays,
    startOfHour,
    addHours,
    subHours,
    setHours,
    subMinutes,
    addMinutes,
    startOfDay,
    setMinutes
} from 'date-fns';
import { Store } from '@ngrx/store';
import { Carton } from "src/app/Model/Carton";
import { Observable } from "rxjs";
import * as CartActions from 'src/app/cart.actions'
import { User } from 'src/app/Model/User';
import { Data } from "@angular/router";
interface CartState{
    cart:Carton
  }
interface AppState{
    user:User
}
@Injectable()

export class AppService {
     http: HttpClient;
     orders: Datum[];
     freeTerms : FreeTermsBetween[]
     freeTermsFrom : Data;
     events : any = [ ];
     user$ : Observable<User>;
    constructor(  public service:OrdersService,private store: Store<CartState>, private Userstore:Store<AppState>) {
        this.cart$ = this.store.select('cart');
        this.user$ = this.Userstore.select('user');
    }
    
    cart$ : Observable<Carton>
    getEvents(actions: CalendarSchedulerEventAction[] ): Promise<CalendarSchedulerEvent[]> 
    {
        //this.store.dispatch(new CartActions.resetCart())
        this.events= []
        var providerID = ''
        var duration = 0
        this.user$.subscribe(r=> providerID = r.providerID);
        this.cart$.subscribe(r=> duration = r.cartItems.reduce((s,c)=>s+c.duration,0))
        var isProvider = false;
        this.user$.subscribe(u=>isProvider = u.isProvider)
        if(<boolean>isProvider==true)
        {
            var test = this.service.getProviderOrders(providerID);
            test.subscribe(
            res=>
                { 
                    console.log('Loading Orders for provider');
                    console.log((<any>res).message)
                    this.orders = (<any>res).data;
                    
                    for (var order of this.orders){
                        this.events.push(   <CalendarSchedulerEvent>{
                            id: order.id,
                            start: new Date(order.start),
                            end:  new Date(order.end),
                            title: order.title,
                            actions:actions,
                            isClickable: true
                        });
                    }
                    console.log('Wczytano: '+this.orders.length)
                });
                return test.toPromise().then(x=> new Promise(resolve => setTimeout(() => resolve(this.events), 1)));
                
        }
        // else{
        //     this.service.getFreeTerms(providerID,duration)
        //     .subscribe(
        //         res=>
        //             {
        //                 console.log('Loading free terms for user');
        //                 console.log((<any>res).message)
        //                 this.freeTerms = (<any>res).data.freeTermsBetween;
                        
        //                 for (var order of this.freeTerms){
        //                     this.events.push(<CalendarSchedulerEvent>{
        //                         start: new Date(order.freeTermStart),
        //                         end:  new Date(order.freeTermEnd),
        //                         actions:actions,
        //                         isClickable: true,
        //                         color: { primary: '#669900', secondary: '#669911' },
        //                     });
        //                 }
        //                 const currentDate = new Date();
        //                 currentDate.setMonth(currentDate.getMonth()+1)
        //                 currentDate.toISOString().slice(0,10);
        //                 this.events.push(<CalendarSchedulerEvent>{
        //                     start: new Date((<any>res).data.freeTermFrom),
        //                     end:  new Date(currentDate.toISOString().slice(0,10)),
        //                     actions:actions,
        //                     isClickable: true,
        //                     color: { primary: '#669900', secondary: '#669911' },
        //                 });
        //             });
        // }
   
        return new Promise(resolve => setTimeout(() => resolve(this.events), 1));    
    }
        // [
        //     <CalendarSchedulerEvent>{
        //         id: '1',
        //         start: addDays(startOfHour(new Date()), 1),
        //         end: addDays(addHours(startOfHour(new Date()), 1), 1),
        //         title: 'Event 1',
        //         content: 'IMPORTANT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'danger' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false,
        //         draggable: true,
        //         resizable: {
        //             beforeStart: true,
        //             afterEnd: true
        //         }
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '12',
        //         start: subHours(addDays(startOfHour(new Date()), 1), 1),
        //         end: subHours(addDays(addHours(startOfHour(new Date()), 1), 1), 1),
        //         title: 'Event 12',
        //         content: 'IMPORTANT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'danger' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false,
        //         draggable: true,
        //         resizable: {
        //             beforeStart: true,
        //             afterEnd: true
        //         }
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '2',
        //         start: addDays(startOfHour(new Date()), 2),
        //         end: subMinutes(addDays(addHours(startOfHour(new Date()), 2), 2), 15),
        //         title: 'Event 2',
        //         content: 'LESS IMPORTANT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'warning' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '22',
        //         start: subHours(addDays(startOfHour(new Date()), 2), 1),
        //         end: subHours(addDays(addHours(startOfHour(new Date()), 1), 2), 1),
        //         title: 'Event 22',
        //         content: 'LESS IMPORTANT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'warning' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '3',
        //         start: addDays(startOfHour(new Date()), 3),
        //         end: addDays(addHours(startOfHour(new Date()), 3), 3),
        //         title: 'Event 3',
        //         content: 'NOT IMPORTANT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '32',
        //         start: subHours(addDays(startOfHour(new Date()), 3), 1),
        //         end: subHours(addDays(addHours(startOfHour(new Date()), 1), 3), 1),
        //         title: 'Event 32',
        //         content: 'NOT IMPORTANT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '4',
        //         start: startOfHour(addHours(new Date(), 2)),
        //         end: addHours(startOfHour(addHours(new Date(), 2)), 2),
        //         title: 'Event 4',
        //         content: 'TODAY EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '5',
        //         start: addDays(startOfHour(setHours(new Date(), 6)), 2),
        //         end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
        //         title: 'Event 5',
        //         content: 'EARLY EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '51',
        //         start: addDays(startOfHour(setHours(new Date(), 6)), 2),
        //         end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
        //         title: 'Event 51',
        //         content: 'EARLY EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '52',
        //         start: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 1),
        //         end: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 2),
        //         title: 'Event 52',
        //         content: 'EARLY EVENT WITH LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG LONG DESCRIPTION',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '53',
        //         start: addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 2),
        //         end: addMinutes(addHours(addDays(startOfHour(setHours(new Date(), 6)), 2), 2), 30),
        //         title: 'Event 53',
        //         content: 'EARLY EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '6',
        //         start: startOfHour(setHours(new Date(), 22)),
        //         end: addHours(startOfHour(setHours(new Date(), 22)), 10),
        //         title: 'Event 6',
        //         content: 'TWO DAYS EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '7',
        //         start: addDays(startOfHour(setHours(new Date(), 14)), 4),
        //         end: addDays(addDays(startOfHour(setHours(new Date(), 14)), 4), 2),
        //         title: 'Event 7',
        //         content: 'THREE DAYS EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '8',
        //         start: startOfHour(addHours(new Date(), 2)),
        //         end: addHours(startOfHour(addHours(new Date(), 2)), 3),
        //         title: 'Event 8',
        //         content: 'CONCURRENT EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '91',
        //         start: setMinutes(setHours(addDays(startOfHour(new Date()), 3), 10), 30),
        //         end: addMinutes(addHours(setMinutes(setHours(addDays(startOfHour(new Date()), 3), 10), 30), 1), 45),
        //         title: 'Event 91',
        //         content: 'TRIPLE EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '92',
        //         start: setMinutes(setHours(addDays(startOfHour(new Date()), 3), 10), 30),
        //         end: addHours(setMinutes(setHours(addDays(startOfHour(new Date()), 3), 10), 30), 1),
        //         title: 'Event 92',
        //         content: 'TRIPLE EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '93',
        //         start: setMinutes(setHours(addDays(startOfHour(new Date()), 3), 11), 30),
        //         end: addHours(setMinutes(setHours(addDays(startOfHour(new Date()), 3), 11), 30), 1),
        //         title: 'Event 93',
        //         content: 'TRIPLE EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '101',
        //         start: setMinutes(setHours(addDays(startOfHour(new Date()), 2), 10), 30),
        //         end: addHours(setMinutes(setHours(addDays(startOfHour(new Date()), 2), 10), 30), 1),
        //         title: 'Event 101',
        //         content: 'DOUBLE EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     },
        //     <CalendarSchedulerEvent>{
        //         id: '102',
        //         start: setMinutes(setHours(addDays(startOfHour(new Date()), 2), 11), 30),
        //         end: addHours(setMinutes(setHours(addDays(startOfHour(new Date()), 2), 11), 30), 1),
        //         title: 'Event 102',
        //         content: 'DOUBLE EVENT',
        //         color: { primary: '#E0E0E0', secondary: '#EEEEEE' },
        //         actions: actions,
        //         status: 'ok' as CalendarSchedulerEventStatus,
        //         isClickable: true,
        //         isDisabled: false
        //     }
        // ];

       // return new Promise(resolve => setTimeout(() => resolve(events), 3000));
        
    //}

}