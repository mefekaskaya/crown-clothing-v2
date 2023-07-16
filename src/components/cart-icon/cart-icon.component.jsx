import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, totalQuantity } = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    };
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
