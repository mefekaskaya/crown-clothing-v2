import { createContext, useState, useEffect } from 'react';
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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeCartItem = (cartItemToRemove) => {
        setCartItems(removeItem(cartItemToRemove, cartItems));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearItem(cartItemToClear, cartItems));
    };

    useEffect(() => {
        setTotalQuantity(calculateTotalQuantity(cartItems));
        setTotalPrice(cartTotal(cartItems));
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
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
