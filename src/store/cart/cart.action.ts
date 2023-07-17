import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../category/category.types';
import { CartItem, CART_ACTIONS } from './cart.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeItem = (cartItemToRemove: CartItem, cartItems: CartItem[]): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if (existingCartItem?.quantity === 1) {
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

const clearItem = (cartItemToClear: CartItem, cartItems: CartItem[]) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

type SetCartItems = ActionWithPayload<CART_ACTIONS.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTIONS.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (productToAdd: CategoryItem, cartItems: CartItem[]) => {
    return setCartItems(addCartItem(cartItems, productToAdd));
};

export const removeCartItem = (cartItemToRemove: CartItem, cartItems: CartItem[]) => {
    return setCartItems(removeItem(cartItemToRemove, cartItems));
};

export const clearItemFromCart = (cartItemToClear: CartItem, cartItems: CartItem[]) => {
    return setCartItems(clearItem(cartItemToClear, cartItems));
};

type ToggleIsCartOpen = Action<CART_ACTIONS.TOGGLE_IS_CART_OPEN>;

export const toggleIsCartOpen = withMatcher(
    (): ToggleIsCartOpen => createAction(CART_ACTIONS.TOGGLE_IS_CART_OPEN)
);
