import { FC, memo } from 'react';

import { CartItemContainer, ItemDetails } from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
    cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <span className="price">
                    {quantity} X ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
});

export default CartItem;
