import React, { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutHeader from '../../components/checkout-header/checkout-header.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, Total } from './checkout.style.js';

export default function Checkout() {
    const { cartItems, totalPrice } = useContext(CartContext);
    return (
        <CheckoutContainer>
            <CheckoutHeader />
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            ))}
            <Total>Total: ${totalPrice}</Total>
        </CheckoutContainer>
    );
}
