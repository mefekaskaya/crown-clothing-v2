import { CART_ACTIONS } from './cart.types';

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0
};

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTIONS.TOGGLE_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            };
        case CART_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            };

        default:
            return state;
    }
};
