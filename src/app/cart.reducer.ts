import * as CartActions from './cart.actions';
import { createReducer, on } from '@ngrx/store';
import { ADD_TO_CART,DEL_FROM_CART,RESET_CART,SET_CART_PROVIDER } from './cart.actions';
import { CartItem, Carton } from './Model/Carton';
import { EMPTY } from 'rxjs';
import { createIsExtensionOrMonitorPresent } from '@ngrx/store-devtools/src/instrument';
export type Action = CartActions.All;

const defaultCartState: Carton={
    cartItems :  [],
    provider : ''
}

export function cartReducer(state : Carton = defaultCartState, action){
    console.log(action.type, state)
    switch(action.type){
        case ADD_TO_CART:
            console.log('Adding item to cart')
            return  {
                ...state,
                cartItems : [...state.cartItems, action.payload]
              };
        case DEL_FROM_CART:
            console.log('Remove item from cart')
            return{
                ...state,
                cartItems : state.cartItems.filter(item => {
                    return item.cartItem !== action.payload.cartItem // return all the items not matching the action.id
                  })
            };
        case SET_CART_PROVIDER:
                console.log('Provider was set')
                return{
                    ...state,
                    provider : action.payload 
                }; 
        case RESET_CART:
             console.log('Cart was emptied')
             return{
                ...state = defaultCartState,
                //cartItem : defaultCartState.cartItems
             };
        default:
            console.log('default cart action state returned')
            return state;
            }
}


 

