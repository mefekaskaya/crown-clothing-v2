import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.style.scss';

export default function CheckoutItem({ checkoutItem }) {
    const { imageUrl, name, quantity, price } = checkoutItem;

    const { clearItemFromCart, addItemToCart, removeCartItem } = useContext(CartContext);

    const clearItem = () => clearItemFromCart(checkoutItem);
    const increaseQuantity = () => addItemToCart(checkoutItem);
    const decreaseQuantity = () => removeCartItem(checkoutItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={decreaseQuantity}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={increaseQuantity}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div onClick={clearItem} className="remove-button">
                &#10005;
            </div>
        </div>
    );
}

CheckoutItem.propTypes = {
    checkoutItem: PropTypes.object.isRequired,
    removeItem: PropTypes.func,
    decreaseQuantity: PropTypes.func,
    increaseQuantity: PropTypes.func
};
