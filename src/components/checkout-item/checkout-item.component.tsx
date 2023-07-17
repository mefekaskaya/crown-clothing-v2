import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearItemFromCart, addItemToCart, removeCartItem } from '../../store/cart/cart.action';
import { CartItem } from '../../store/cart/cart.types';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
    CheckoutItemContainer,
    ImageContainer,
    BaseSpan,
    Quantiy,
    Arrow,
    Value,
    RemoveButton
} from './checkout-item.style';
type CheckoutItemProps = {
    checkoutItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ checkoutItem }) => {
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
};

export default memo(CheckoutItem);
