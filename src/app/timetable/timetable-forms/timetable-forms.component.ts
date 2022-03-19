import { Component, OnInit, Inject, LOCALE_ID, HostListener, ViewChild } from '@angular/core';
import { Observable, Subject, throwIfEmpty } from 'rxjs';
import { OrdersService } from 'src/app/shared/orders.service';
import { Datum, FreeTermsBetween, FreeTermsView, Order, Orders, orders,MoveOrderResponse,moResp } from 'src/app/shared/orders.model';
import {
    endOfDay,
    addMonths
} from 'date-fns';
import {
    DAYS_IN_WEEK,
    SchedulerViewDay,
    SchedulerViewHour,
    SchedulerViewHourSegment,
    CalendarSchedulerEvent,
    CalendarSchedulerEventAction,
    CalendarSchedulerEventStatus,
    startOfPeriod,
    endOfPeriod,
    addPeriod,
    subPeriod,
    SchedulerDateFormatter,
    SchedulerEventTimesChangedEvent,
    CalendarSchedulerViewComponent
} from 'angular-calendar-scheduler';
import {
    CalendarView,
    CalendarDateFormatter,
    DateAdapter
} from 'angular-calendar';
import { Store } from '@ngrx/store';

import * as CartActions from 'src/app/cart.actions'
import { User } from 'src/app/Model/User';

import { AppService } from 'src/app/timetable/timetable-forms/app.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem, Carton } from 'src/app/Model/Carton';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

interface CartState{
    cart:Carton
  }
interface AppState{
    user:User
}
@Component({
  selector: 'app-timetable-forms',
  templateUrl: './timetable-forms.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [{
        provide: CalendarDateFormatter,
        useClass: SchedulerDateFormatter
    }]
})

export class TimetableFormsComponent implements OnInit {
     title: string = 'Angular Calendar Scheduler Demo';
    @ViewChild('content')  content: any;
     CalendarView = CalendarView;

     view: CalendarView = CalendarView.Week;
     viewDate: Date = new Date();
     viewDays: number = 3;
     refresh: Subject<void> = new Subject();
     locale: string = 'en';
     hourSegments: number= 4;
     weekStartsOn: number = 1;
     startsWithToday: boolean = true;
     activeDayIsOpen: boolean = true;
     excludeDays: number[] = []; // [0];
     dayStartHour: number = 6;
     dayEndHour: number = 22;
     moveOrderResp: moResp;
     minDate: Date = new Date();
     maxDate: Date = endOfDay(addMonths(new Date(), 1));
     dayModifier: Function;
     hourModifier: Function;
     segmentModifier: Function;
     eventModifier: Function;
     prevBtnDisabled: boolean = false;
     nextBtnDisabled: boolean = false;
     freeTerms : FreeTermsBetween[]
     actions: CalendarSchedulerEventAction[] = [
        {
            when: 'enabled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">cancel</i></span>',
            title: 'Delete',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Delete\' on event ' + event.id);
                this.service.deleteOrder(event.id).subscribe(
                    res=>
                        {
                            console.log((<any>res).message);
                        })    
            }

        },
        {
            when: 'cancelled',
            label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
            title: 'Restore',
            onClick: (event: CalendarSchedulerEvent): void => {
                console.log('Pressed action \'Restore\' on event ' + event.id);
            }
        }
    ];
     cart$ : Observable<Carton>;
     user$ : Observable<User>;
     events: CalendarSchedulerEvent[];
     serviceIdToMove : string;
    @ViewChild(CalendarSchedulerViewComponent)  calendarScheduler: CalendarSchedulerViewComponent;
     datepipe: any;

    constructor(@Inject(LOCALE_ID) locale: string,private store: Store<CartState>, private Userstore:Store<AppState>, public service:OrdersService,private appService: AppService, private dateAdapter: DateAdapter, private modalService: NgbModal) {
        //this.store.dispatch(new CartActions.resetCart())
        this.freeTerms = []
        this.locale = locale;
        this.cart$ = this.store.select('cart');
        this.user$ = this.Userstore.select('user');
        var providerID = '';
        this.cart$.subscribe(r=> providerID = r.provider);
        var isProvider = false;
        this.user$.subscribe(u=>isProvider = u.isProvider);
        var cartItems : CartItem[] = [];
        this.cart$.subscribe(r=> cartItems = r.cartItems);
        var servDuration = 0
        if(cartItems.length > 0)
        {servDuration = cartItems.map(o=>o.duration).reduce((a,c)=>a+c);}
        if(<boolean>isProvider==false)
        { 
            this.service.getFreeTerms(providerID,servDuration)
            .subscribe(
             res=>
                {
                    console.log('Loading free terms for user');
                    console.log((<any>res).message)
                    this.freeTerms = (<any>res).data.freeTermsBetween;
                    console.log(this.freeTerms);
                    this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
                        segment.isDisabled = !this.isDateForSegmentValid(segment.date,this.freeTerms);
                    }).bind(this);
                    console.log('Loading free terms for user complete');
                    this.eventModifier = ((event: CalendarSchedulerEvent): void => {
                        event.isDisabled = !this.isDateValid(event.start);
                    }).bind(this);
            
                    //this.dateOrViewChanged();
                    this.changeDate(new Date());
                });
  

        }
        else
        {

            this.eventModifier = ((event: CalendarSchedulerEvent): void => {
            event.isDisabled = !this.isDateValid(event.start);
            }).bind(this);
            this.changeDate(new Date());

        }
        // this.dayModifier = ((day: SchedulerViewDay): void => {
        //     day.cssClass = this.isDateValid(day.date) ? '' : 'cal-disabled';
        // }).bind(this);

        // this.hourModifier = ((hour: SchedulerViewHour): void => {
        //     hour.cssClass = this.isDateValid(hour.date) ? '' : 'cal-disabled';
        // }).bind(this);

        // this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
        //     segment.isDisabled = !this.isDateValid(segment.date);
        // }).bind(this);

        
    }
    ngOnInit(): void {
        this.appService.getEvents(this.actions)
            .then((events: CalendarSchedulerEvent[]) => this.events = events);
    }
    refreshScheduler():void
    {
        this.calendarScheduler.setViewDays('Today')
    }

     viewDaysOptionChanged(viewDays: string): void {
        console.log('viewDaysOptionChanged', viewDays);
        this.calendarScheduler.setViewDays(viewDays);
    }

     changeDate(date: Date): void {
        console.log('changeDate', date);
        this.viewDate = date;
        this.dateOrViewChanged();
    }

     changeView(view: CalendarView): void {
        console.log('changeView', view);
        this.view = view;
        this.dateOrViewChanged();
    }

     dateOrViewChanged(): void {
        if (this.startsWithToday) {
            this.prevBtnDisabled = !this.isDateValid(subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
            this.nextBtnDisabled = !this.isDateValid(addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
        } else {
            this.prevBtnDisabled = !this.isDateValid(endOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
            this.nextBtnDisabled = !this.isDateValid(startOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
        }

        if (this.viewDate < this.minDate) {
            this.changeDate(this.minDate);
        } else if (this.viewDate > this.maxDate) {
            this.changeDate(this.maxDate);
        }
    }

    private isDateValid(date: Date): boolean {
        return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
        ///tutaj ogarnac dostepne day
    }

    private isDateForSegmentValid (date:Date, freeTerms:FreeTermsBetween[]) : boolean {
   
        if(date <= this.minDate)
            return false;
        var result = false;
        let formattedDate = (moment(date)).format('YYYY-MM-DD HH:mm:ss')
        let fDate = new Date(formattedDate);
        for (let term of freeTerms){
            let freeTermStart = (moment(term.freeTermStart)).format('YYYY-MM-DD HH:mm:ss')
            let tsDate = new Date(freeTermStart);
            console.log('Start odczytu wolnych terminow '+fDate+ ' porownanie do '+tsDate);
            if(date>tsDate){
                
                console.log('Znaleziono wolny termin');
                let freeTermEnd = (moment(term.freeTermEnd)).format('YYYY-MM-DD HH:mm:ss')
                let teDate = new Date(freeTermEnd);
                if(date<teDate)
                {
                    result = true
                    break;
                }
            }
            result = false;
        };
        return result;
    }
    
    serviceTime: string;
    SaveChanges(e){
        console.log(this.serviceTime)
        let tempDate = new Date(this.serviceTime);
        let strDate = (moment(tempDate)).format('YYYY-MM-DD HH:mm:ss')
        var moveOrder = this.service.moveOrder(this.serviceIdToMove,strDate)
        moveOrder.subscribe(
            res=>
              {
                console.log((<any>res).message)
                if((<any>res).success==true)
                {
                    this.moveOrderResp = (<any>res).data
                    var sendSms = this.service.sendSms(this.moveOrderResp.clientName,'Your service in'+ this.moveOrderResp.provName +'was moved to a new date: '+strDate);
                    sendSms.subscribe(
                        resp=>
                        {
                          console.log((<any>resp).message)
                        }, err => {
                          console.log(err);
                        });
                }
              }, err => {
                console.log(err);
              });;
        document.getElementById("CloseCalendar")!.click();
        
            moveOrder.toPromise().then(x=> new Promise(resolve => setTimeout(() => resolve(this.appService.getEvents(this.actions)
            .then((events: CalendarSchedulerEvent[]) => this.events = events)), 1)));
        

    }
                  

     viewDaysChanged(viewDays: number): void {
        console.log('viewDaysChanged', viewDays);
        this.viewDays = viewDays;
    }

     dayHeaderClicked(day: SchedulerViewDay): void {
        console.log('dayHeaderClicked Day', day);
    }

     hourClicked(hour: SchedulerViewHour): void {
        console.log('hourClicked Hour', hour);
    }

     segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
        console.log("Hello segment!!!");
        var durationSum = 0;
        var UTCoffset = 1;
        var providerId = '';
        this.cart$ = this.store.select('cart');
        this.cart$.subscribe(r=>providerId = r.provider)
        var items : CartItem[] = [];
        this.cart$.subscribe(r=>items = r.cartItems)
        
        for(let item of items)
        {//todo:pobierac czas z item po dodaniu
            
            let formattedDate = (moment(segment.date)).format('YYYY-MM-DD HH:mm:ss')
            
            let startDate = new Date(formattedDate);
            let tempStartDate = new Date(formattedDate);
            tempStartDate.setHours(startDate.getHours()+durationSum+UTCoffset);
            let endDate = new Date(formattedDate)
            endDate.setHours(startDate.getHours()+durationSum+item.duration+UTCoffset);
            
            let order = new Order;
            order.providerId = providerId;
            order.startDate = tempStartDate;
            order.endDate = endDate
            order.serviceId = item.cartItem;
            this.service.putOrder(order) 
            .subscribe(
                res=>
                  {
                      console.log('Service succesfully added');
                      console.log((<any>res).message)
                  });
            durationSum += item.duration;
        }

        this.store.dispatch(new CartActions.resetCart())
        document.getElementById("closeModalButton2")!.click();
        document.getElementById("closeModalButton1")!.click();
        this.cart$ = this.store.select('cart');
        var cartItems : CartItem[] = [];
        this.cart$.subscribe(r=> cartItems = r.cartItems);
        console.log('zawartosc koszyka powinna byc pusta')
        console.log(cartItems)
        // console.log('zdarzenie zacznie sie:'+ segment.date);
        // console.log('segmentClicked Action', action);
        // console.log('segmentClicked Segment', segment);
    }

     eventClicked(action: string, event: CalendarSchedulerEvent): void {
        console.log('eventClicked Action', action);
        console.log('eventClicked Event', event);
        this.modalService.open(this.content);
        this.serviceIdToMove = event.id;
    }

     eventTimesChanged({ event, newStart, newEnd, type }: SchedulerEventTimesChangedEvent): void {
        console.log('eventTimesChanged Type', type);
        console.log('eventTimesChanged Event', event);
        console.log('eventTimesChanged New Times', newStart, newEnd);
        const ev: CalendarSchedulerEvent = <CalendarSchedulerEvent>this.events.find(e => e.id === event.id);
        ev.start = newStart;
        ev.end = newEnd;
        this.refresh.next();
    }
}
