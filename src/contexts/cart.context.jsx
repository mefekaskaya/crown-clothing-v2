import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

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

const calculateTotalQuantity = (cartItems) => {
    return cartItems.reduce((totalQuantity, cartItem) => {
        return totalQuantity + cartItem.quantity;
    }, 0);
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

const cartTotal = (cartItems) => {
    return cartItems.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
    }, 0);
};

export const CART_ACTIONS = {
    TOGGLE_IS_CART_OPEN: 'TOGGLE_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
    SET_TOTAL_QUANTITY: 'SET_TOTAL_QUANTITY'
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantity: 0
};

const cartReducer = (state, action) => {
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
        case CART_ACTIONS.SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: payload
            };
        case CART_ACTIONS.SET_TOTAL_QUANTITY:
            return {
                ...state,
                totalQuantity: payload
            };
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItem: () => {},
    totalQuantity: 0,
    removeItem: () => {},
    clearItem: () => {},
    cartTotal: () => {}
});

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, totalPrice, totalQuantity }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
    );

    const setDispatch = (payload, type) => {
        dispatch({ type, payload });
    };

    const addItemToCart = (productToAdd) => {
        setDispatch(addCartItem(cartItems, productToAdd), CART_ACTIONS.SET_CART_ITEMS);
    };

    const removeCartItem = (cartItemToRemove) => {
        setDispatch(removeItem(cartItemToRemove, cartItems), CART_ACTIONS.SET_CART_ITEMS);
    };

    const clearItemFromCart = (cartItemToClear) => {
        setDispatch(clearItem(cartItemToClear, cartItems), CART_ACTIONS.SET_CART_ITEMS);
    };

    useEffect(() => {
        setDispatch(calculateTotalQuantity(cartItems), CART_ACTIONS.SET_TOTAL_QUANTITY);
        setDispatch(cartTotal(cartItems), CART_ACTIONS.SET_TOTAL_PRICE);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setDispatch,
        cartItems,
        addItemToCart,
        totalQuantity,
        removeCartItem,
        clearItemFromCart,
        totalPrice
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
    children: PropTypes.node
};
