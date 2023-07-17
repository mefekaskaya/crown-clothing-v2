import { AnyAction } from 'redux'

import { toggleIsCartOpen, setCartItems } from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
};

export const cartReducer = (state = INITIAL_STATE, action:  AnyAction):CartState => {
    if(toggleIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: !state.isCartOpen
        }
    }
    if(setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        }
    }
    return state;
};
 