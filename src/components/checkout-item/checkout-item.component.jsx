import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { clearItemFromCart, addItemToCart, removeCartItem } from '../../store/cart/cart.action';
import { selectCartItems } from 'src/store/cart/cart-selector';

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
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { imageUrl, name, quantity, price } = checkoutItem;

    const clearItem = () => dispatch(clearItemFromCart(checkoutItem, cartItems));
    const increaseQuantity = () => dispatch(addItemToCart(checkoutItem, cartItems));
    const decreaseQuantity = () => dispatch(removeCartItem(checkoutItem, cartItems));

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
            <BaseSpan>{price}</BaseSpan>
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
