import * as UserActions from './user.actions';
import { User } from './Model/User';
import { createReducer, on } from '@ngrx/store';
import { IS_LOGGED, LOGOUT } from './user.actions';
export type Action = UserActions.All;

const defaultState: User={
    isLogged: false,
    userName: 'Guest',
    isProvider: false
}

export function userReducer(state: User = defaultState, action){
    console.log(action.type, state)
    switch(action.type){
        case IS_LOGGED:
            console.log("User " + state.userName + ' login as ' + action.payload.userName)
            return  {
                ...state,
                userName : action.payload.userName,
                isLogged : action.payload.isLogged,
                isProvider : action.payload.isProvider
              };
        case LOGOUT:
            console.log("User " + state.userName + 'logout')
              return{
                  ...state,
                  userName : action.payload.userName,
                  isLogged : action.payload.isLogged,
                  isProvider : action.payload.isProvider
              };
            default:
                console.log('default user action state returned')
                   return state;
            }
}


 

