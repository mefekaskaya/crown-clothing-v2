import React, { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutHeader from '../../components/checkout-header/checkout-header.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

export default function Checkout() {
    const { cartItems, cartTotal } = useContext(CartContext);
    return (
        <div className="checkout-container">
            <CheckoutHeader />
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            ))}
            <span className="total">Total: ${cartTotal}</span>
        </div>
    );
}
