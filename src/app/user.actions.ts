import { Action, createAction } from "@ngrx/store";
import { User } from "./Model/User";
//import { Observable } from "rxjs";
//import { User } from 'src/app/user';
export const IS_LOGGED = '[app-component] isLogged';
export const LOGOUT = '[app-component] logout';


export class isLogged implements Action{
    readonly type = IS_LOGGED;
    constructor(public payload:User){
        console.log("action login started");     
    }
}
export class logout implements Action{
    readonly type = LOGOUT;
    constructor(public payload:User){
        console.log("action logout started");
    }
}

export type All
=isLogged
|logout
