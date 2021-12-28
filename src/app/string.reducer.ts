import * as StringActions from './string.actions';
import { createReducer, on } from '@ngrx/store';
import { SET_NAME } from './string.actions';
export type Action = StringActions.All

const userNameDefault: string = 'Guest';
const newState = (state:string, newData:string) => {
    console.log('New state was set')
    return Object.assign({userNameDefault},state,newData)
}
    export function StringReducer(state: string = userNameDefault, action){
        console.log(action.type, state)
        switch(action.type){
            case SET_NAME:
                console.log(state+ "user Reducer was set");
                return state = action.payload
            default:
                return state;
        }}