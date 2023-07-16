import { CART_ACTIONS } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id
                ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1
                  }
                : cartItem;
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItem = (cartItemToRemove, cartItems) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => {
            return cartItem.id !== cartItemToRemove.id;
        });
    }

    return cartItems.map((cartItem) => {
        return cartItem.id !== cartItemToRemove.id
            ? cartItem
            : { ...cartItemToRemove, quantity: cartItemToRemove.quantity - 1 };
    });
};

const clearItem = (cartItemToClear, cartItems) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const addItemToCart = (productToAdd, cartItems) => ({
    payload: addCartItem(cartItems, productToAdd),
    type: CART_ACTIONS.SET_CART_ITEMS
});

export const removeCartItem = (cartItemToRemove, cartItems) => ({
    payload: removeItem(cartItemToRemove, cartItems),
    type: CART_ACTIONS.SET_CART_ITEMS
});

export const clearItemFromCart = (cartItemToClear, cartItems) => ({
    payload: clearItem(cartItemToClear, cartItems),
    type: CART_ACTIONS.SET_CART_ITEMS
});

export const toggleIsCartOpen = () => {
    return {
        type: CART_ACTIONS.TOGGLE_IS_CART_OPEN
    };
};
