import { Action, createAction } from "@ngrx/store";
import { Carton } from "./Model/Carton";
export const ADD_TO_CART = '[home] addToCart';
export const DEL_FROM_CART = '[home] delFromCart';
export const RESET_CART = '[home] resetCart';
export const SET_CART_PROVIDER = '[home] setProvider';
export class addToCart implements Action{
    readonly type = ADD_TO_CART;
    constructor(public payload:string){
        console.log("Adding to cart started");     
    }
}
export class delFromCart implements Action{
    readonly type = DEL_FROM_CART;
    constructor(public payload:string){
        console.log("Deleting from cart started");
    }
}
export class setProvider implements Action{
    readonly type = SET_CART_PROVIDER;
    constructor(public payload:string){
        console.log("Settin provider");
    }
}
export class resetCart implements Action{
    readonly type = RESET_CART;
    constructor(){
        console.log("Deleting cart started");
    }
}


export type All
=addToCart
|delFromCart
|setProvider
|resetCart
