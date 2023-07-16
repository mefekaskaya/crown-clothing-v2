import { createSelector } from 'reselect';

const cartReducer = (state) => {
    return state.cart;
};

export const selectCartItems = createSelector([cartReducer], (cart) => {
    return cart.cartItems;
});

export const selectTotalQuantity = createSelector([selectCartItems], (cartItems) => {
    return cartItems.reduce((totalQuantity, cartItem) => {
        return totalQuantity + cartItem.quantity;
    }, 0);
});

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => {
    return cartItems.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
    }, 0);
});

export const selectIsCartOpen = createSelector([cartReducer], (cart) => {
    return cart.isCartOpen;
});
