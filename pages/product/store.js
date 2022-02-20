import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext()
const initialState = {
    cart: {
        cartItems: Cookies.get('cartItems') 
        ? JSON.parse(Cookies.get('cartItems')) 
        : [],
    },
}

function reducer(state, action){
    switch (action.type){
        case 'CART_ADD_ITEM':{
            const newItem = action.payload
            const existItem = state.cart.cartItems.find(
                (product) => product.name === newItem.name
            )
            const cartItems = existItem 
                ? state.cart.cartItems.map((product) => 
                    product.name === existItem.name ? newItem : product
                  )
                : [...state.cart.cartItems, newItem]
            Cookies.set('cartItems', JSON.stringify(cartItems))    
            return {...state, cart: {...state.cart, cartItems}}
        }
        default:
            return state
    }
    
}