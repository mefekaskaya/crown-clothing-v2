import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector';

import { CartItems, CartDropdownContainer, EmptyMessage } from './cart-dropdown.style';

export default function CartDropdown() {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const navigateToCheckout = () => {
        navigate('checkout');
    };
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your Cart is Empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}
