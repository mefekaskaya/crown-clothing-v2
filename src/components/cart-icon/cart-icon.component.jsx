import { useSelector, useDispatch } from 'react-redux';

import { toggleIsCartOpen } from 'src/store/cart/cart.action';
import { selectTotalQuantity } from 'src/store/cart/cart-selector';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector(selectTotalQuantity);

    const changeIsCartOpen = () => {
        dispatch(toggleIsCartOpen());
    };
    return (
        <CartIconContainer onClick={changeIsCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
