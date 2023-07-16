import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { CartContext } from '../../contexts/cart.context';

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantiy,
    Arrow,
    Value,
    RemoveButton
} from './checkout-item.style.js';
export default function CheckoutItem({ checkoutItem }) {
    const { imageUrl, name, quantity, price } = checkoutItem;

    const { clearItemFromCart, addItemToCart, removeCartItem } = useContext(CartContext);

    const clearItem = () => clearItemFromCart(checkoutItem);
    const increaseQuantity = () => addItemToCart(checkoutItem);
    const decreaseQuantity = () => removeCartItem(checkoutItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantiy>
                <Arrow onClick={decreaseQuantity}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={increaseQuantity}>&#10095;</Arrow>
            </Quantiy>
            <span className="price">{price}</span>
            <RemoveButton onClick={clearItem}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

CheckoutItem.propTypes = {
    checkoutItem: PropTypes.object.isRequired,
    removeItem: PropTypes.func,
    decreaseQuantity: PropTypes.func,
    increaseQuantity: PropTypes.func
};
