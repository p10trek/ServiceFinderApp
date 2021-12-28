import { Action, createAction } from "@ngrx/store";
import { User } from "./Model/User";
import { Observable } from "rxjs";
//import { User } from 'src/app/user';
export const SET_NAME = '[userName] setString';

export class setName implements Action{
    readonly type = SET_NAME;
    constructor(public payload : string){
            console.log("Payload string: "+payload);
        }
}

export type All
=setName