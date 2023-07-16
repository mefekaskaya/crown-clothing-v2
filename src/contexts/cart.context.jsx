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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItem: () => {},
    totalQuantity: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    useEffect(() => {
        setTotalQuantity(calculateTotalQuantity(cartItems));
    }, [cartItems]);
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        totalQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
    children: PropTypes.node
};
