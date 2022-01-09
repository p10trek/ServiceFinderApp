import * as CartActions from './cart.actions';
import { createReducer, on } from '@ngrx/store';
import { ADD_TO_CART,DEL_FROM_CART,RESET_CART } from './cart.actions';
import { Carton } from './Model/Carton';
import { EMPTY } from 'rxjs';
import { createIsExtensionOrMonitorPresent } from '@ngrx/store-devtools/src/instrument';
export type Action = CartActions.All;

const defaultCartState: Carton={
    cartItem : []
}

export function cartReducer(state : Carton = defaultCartState, action){
    console.log(action.type, state)
    switch(action.type){
        case ADD_TO_CART:
            console.log('Adding item to cart')
            return  {
                ...state,
                cartItem : [...state.cartItem, action.payload]
              };
        case DEL_FROM_CART:
            console.log('Remove item from cart')
            return{
                ...state,
                cartItem : state.cartItem.filter(item => {
                    return item !== action.payload // return all the items not matching the action.id
                  })
            };
        case RESET_CART:
             console.log('Cart was emptied')
             return{
             ...state,
                cartItem : defaultCartState.cartItem
             };
        default:
            console.log('default cart action state returned')
            return state;
            }
}


 

