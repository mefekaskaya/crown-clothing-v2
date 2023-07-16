import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { CartItems, CartDropdownContainer, EmptyMessage } from './cart-dropdown.style';

export default function CartDropdown() {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const navigateToCheckout = () => {
        navigate('checkout');
    };
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                        // item id allows react to properly map these key values
                    ))
                ) : (
                    <EmptyMessage>Your Cart is Empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}
